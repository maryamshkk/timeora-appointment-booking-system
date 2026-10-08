<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Notifications\TimeoraNotification;
use App\Notifications\NotificationType;
use App\Models\User;
use App\Models\Appointment;
use App\Models\Company;
use App\Models\Staff;
use App\Models\Service;
use App\Models\StaffAvailability;
use App\Models\BlockedTime;
use App\Models\BusinessWorkingHour;

class AppointmentController extends Controller
{
    /**
     * Get upcoming appointments.
     */
    public function upcoming(Request $request)
    {
        $user = $request->user();

        // ✅ FIX: $limit was undefined in original code
        $limit = $request->query('limit');

        $appointments = Appointment::with([
            'customer:id,name,email,phone',
            'staff:id,first_name,last_name',
            'service:id,name,duration',
        ])
            ->where('company_id', $user->company_id)
            ->where(function ($query) {
                $query->where('appointment_date', '>', now()->toDateString())
                    ->orWhere(function ($query) {
                        $query->where('appointment_date', now()->toDateString())
                            ->where('start_time', '>', now()->format('H:i:s'));
                    });
            })
            ->whereNotIn('status', ['cancelled', 'rejected'])
            ->orderBy('appointment_date', 'asc')
            ->orderBy('start_time', 'asc')
            ->when($limit, fn ($q) => $q->limit((int) $limit))
            ->get();

        return response()->json([
            'success' => true,
            'appointments' => $appointments,
        ]);
    }

    /**
     * Get all appointments.
     */
    public function index(Request $request)
    {
        $user = $request->user();

        $appointments = Appointment::with([
            'customer:id,name,email,phone',
            'staff:id,first_name,last_name',
            'service:id,name,duration',
        ])
            ->where('company_id', $user->company_id)
            ->latest('appointment_date')
            ->latest('start_time')
            ->get();

        return response()->json([
            'success' => true,
            'message' => 'Company appointments retrieved successfully.',
            'data' => $appointments,
        ]);
    }

    /**
     * Get single appointment.
     */
    public function show(Request $request, $id)
    {
        $user = $request->user();

        $appointment = Appointment::with([
            'customer:id,name,email,phone',
            'staff:id,first_name,last_name',
            'service:id,name,duration',
            'payment',
        ])
            ->where('company_id', $user->company_id)
            ->find($id);

        if (!$appointment) {
            return response()->json([
                'success' => false,
                'message' => 'Appointment not found.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Appointment retrieved successfully.',
            'data' => $appointment,
        ]);
    }

    /**
     * Accept appointment.
     */
    public function accept(Request $request, $id)
    {
        $user = $request->user();

        $appointment = Appointment::where('company_id', $user->company_id)
            ->find($id);

        if (!$appointment) {
            return response()->json([
                'success' => false,
                'message' => 'Appointment not found.',
            ], 404);
        }

        if ($appointment->status !== 'pending') {
            return response()->json([
                'success' => false,
                'message' => 'Only pending appointments can be accepted.',
            ], 422);
        }

        $appointment->update(['status' => 'accepted']);

        $appointment->load([
            'company:id,name',
            'staff:id,first_name,last_name',
            'service:id,name',
            'payment',
        ]);

        $customer = User::find($appointment->customer_id);

        $payload = $this->buildNotificationPayload($appointment, $customer);

        if ($customer) {
            $customer->notify(
                new TimeoraNotification(
                    NotificationType::BOOKING_ACCEPTED,
                    'Appointment Accepted',
                    'Your appointment has been accepted by the company.',
                    $payload
                )
            );
        }

        if ($appointment->staff) {
            $appointment->staff->notify(
                new TimeoraNotification(
                    NotificationType::BOOKING_ACCEPTED,
                    'Appointment Accepted',
                    'An appointment assigned to you has been accepted by the company.',
                    $payload
                )
            );
        }

        return response()->json([
            'success' => true,
            'message' => 'Appointment accepted successfully.',
            'data' => $appointment,
        ]);
    }

    /**
     * Reject appointment.
     */
    public function reject(Request $request, $id)
    {
        $user = $request->user();

        $appointment = Appointment::where('company_id', $user->company_id)
            ->find($id);

        if (!$appointment) {
            return response()->json([
                'success' => false,
                'message' => 'Appointment not found.',
            ], 404);
        }

        if ($appointment->status !== 'pending') {
            return response()->json([
                'success' => false,
                'message' => 'Only pending appointments can be rejected.',
            ], 422);
        }

        $appointment->update(['status' => 'rejected']);

        $appointment->load([
            'company:id,name',
            'staff:id,first_name,last_name',
            'service:id,name',
            'payment',
        ]);

        $customer = User::find($appointment->customer_id);
        $payload = $this->buildNotificationPayload($appointment, $customer);

        if ($customer) {
            $customer->notify(
                new TimeoraNotification(
                    NotificationType::BOOKING_REJECTED,
                    'Appointment Rejected',
                    'Unfortunately, your appointment has been rejected by the company.',
                    $payload
                )
            );
        }

        if ($appointment->staff) {
            $appointment->staff->notify(
                new TimeoraNotification(
                    NotificationType::BOOKING_REJECTED,
                    'Appointment Rejected',
                    'An appointment assigned to you has been rejected by the company.',
                    $payload
                )
            );
        }

        return response()->json([
            'success' => true,
            'message' => 'Appointment rejected successfully.',
            'data' => $appointment,
        ]);
    }

    /**
     * Cancel appointment.
     */
    public function cancel(Request $request, $id)
    {
        $user = $request->user();

        $appointment = Appointment::where('company_id', $user->company_id)
            ->find($id);

        if (!$appointment) {
            return response()->json([
                'success' => false,
                'message' => 'Appointment not found.',
            ], 404);
        }

        // ✅ FIX: strict in_array
        if (in_array($appointment->status, ['cancelled', 'rejected', 'completed'], true)) {
            return response()->json([
                'success' => false,
                'message' => 'This appointment cannot be cancelled.',
            ], 422);
        }

        $appointment->update(['status' => 'cancelled']);

        $appointment->load([
            'company:id,name',
            'staff:id,first_name,last_name',
            'service:id,name',
            'payment',
        ]);

        $customer = User::find($appointment->customer_id);
        $payload = $this->buildNotificationPayload($appointment, $customer);

        if ($customer) {
            $customer->notify(
                new TimeoraNotification(
                    NotificationType::BOOKING_CANCELLED,
                    'Appointment Cancelled',
                    'Your appointment has been cancelled by the company.',
                    $payload
                )
            );
        }

        if ($appointment->staff) {
            $appointment->staff->notify(
                new TimeoraNotification(
                    NotificationType::BOOKING_CANCELLED,
                    'Appointment Cancelled',
                    'An appointment assigned to you has been cancelled by the company.',
                    $payload
                )
            );
        }

        return response()->json([
            'success' => true,
            'message' => 'Appointment cancelled successfully.',
            'data' => $appointment,
        ]);
    }

    /**
     * Reschedule appointment.
     */
    public function reschedule(Request $request, $id)
    {
        $validated = $request->validate([
            'appointment_date' => 'required|date',
            'start_time' => 'required|date_format:H:i',
        ]);

        $user = $request->user();

        $appointment = Appointment::where('company_id', $user->company_id)
            ->find($id);

        if (!$appointment) {
            return response()->json([
                'success' => false,
                'message' => 'Appointment not found.',
            ], 404);
        }

        if (in_array($appointment->status, ['cancelled', 'rejected', 'completed'], true)) {
            return response()->json([
                'success' => false,
                'message' => 'This appointment cannot be rescheduled.',
            ], 422);
        }

        $staff = Staff::find($appointment->staff_id);
        $service = Service::find($appointment->service_id);
        $company = Company::find($appointment->company_id);

        if (!$staff || !$service || !$company) {
            return response()->json([
                'success' => false,
                'message' => 'Related staff, service, or company not found.',
            ], 422);
        }

        $startTime = Carbon::createFromFormat('H:i', $validated['start_time']);
        $endTime = $startTime->copy()->addMinutes($service->duration);

        $appointmentDateTime = Carbon::createFromFormat(
            'Y-m-d H:i',
            $validated['appointment_date'] . ' ' . $validated['start_time']
        );

        if ($appointmentDateTime->isPast()) {
            return response()->json([
                'success' => false,
                'message' => 'You cannot reschedule to a past slot.',
            ], 422);
        }

        $dayOfWeek = Carbon::parse($validated['appointment_date'])->dayOfWeekIso;

        $availability = StaffAvailability::where('staff_id', $staff->id)
            ->where('day_of_week', $dayOfWeek)
            ->first();

        if (!$availability || !$availability->is_working) {
            return response()->json([
                'success' => false,
                'message' => 'Staff is not available on this day.',
            ], 422);
        }

        $businessHours = BusinessWorkingHour::where('company_id', $company->id)
            ->where('day_of_week', $dayOfWeek)
            ->first();

        if (!$businessHours) {
            return response()->json([
                'success' => false,
                'message' => 'Company is closed on this day.',
            ], 422);
        }

        $commonStart = max($businessHours->opening_time, $availability->start_time);
        $commonEnd = min($businessHours->closing_time, $availability->end_time);

        if (
            $validated['start_time'] < $commonStart ||
            $endTime->format('H:i:s') > $commonEnd
        ) {
            return response()->json([
                'success' => false,
                'message' => 'Selected slot is outside working hours.',
            ], 422);
        }

        if (
            $availability->break_start &&
            $availability->break_end &&
            $validated['start_time'] < $availability->break_end &&
            $endTime->format('H:i:s') > $availability->break_start
        ) {
            return response()->json([
                'success' => false,
                'message' => 'Selected slot overlaps staff break time.',
            ], 422);
        }

        $blockedTimes = BlockedTime::where('staff_id', $staff->id)
            ->whereDate('blocked_date', $validated['appointment_date'])
            ->get();

        foreach ($blockedTimes as $blocked) {
            if (
                $validated['start_time'] < $blocked->end_time &&
                $endTime->format('H:i:s') > $blocked->start_time
            ) {
                return response()->json([
                    'success' => false,
                    'message' => 'Selected slot is blocked.',
                ], 422);
            }
        }

        $conflict = Appointment::where('staff_id', $staff->id)
            ->where('appointment_date', $validated['appointment_date'])
            ->whereIn('status', ['pending', 'accepted'])
            ->where('id', '!=', $appointment->id)
            ->where(function ($query) use ($validated, $endTime) {
                $query->where('start_time', '<', $endTime->format('H:i:s'))
                    ->where('end_time', '>', $validated['start_time']);
            })
            ->exists();

        if ($conflict) {
            return response()->json([
                'success' => false,
                'message' => 'Selected slot is already booked.',
            ], 409);
        }

        $appointment->update([
            'appointment_date' => $validated['appointment_date'],
            'start_time' => $validated['start_time'],
            'end_time' => $endTime->format('H:i:s'),
            'status' => 'pending',
        ]);

        $appointment->load([
            'customer:id,name,email,phone',
            'company:id,name',
            'staff:id,first_name,last_name',
            'service:id,name',
            'payment',
        ]);

        // ✅ FIX: $customer was undefined in original code
        $customer = $appointment->customer;
        $payload = $this->buildNotificationPayload($appointment, $customer);

        if ($appointment->staff) {
            $appointment->staff->notify(
                new TimeoraNotification(
                    NotificationType::BOOKING_RESCHEDULED,
                    'Appointment Rescheduled',
                    'An appointment assigned to you has been rescheduled.',
                    $payload
                )
            );
        }

        if ($customer) {
            $customer->notify(
                new TimeoraNotification(
                    NotificationType::BOOKING_RESCHEDULED,
                    'Appointment Rescheduled',
                    'Your appointment has been rescheduled.',
                    $payload
                )
            );
        }

        return response()->json([
            'success' => true,
            'message' => 'Appointment rescheduled successfully.',
            'data' => $appointment,
        ]);
    }

    /**
     * Calendar API.
     */
    public function calendar(Request $request)
    {
        $validated = $request->validate([
            'start' => 'required|date',
            'end' => 'required|date|after_or_equal:start',
        ]);

        $user = $request->user();

        $appointments = Appointment::with([
            'customer:id,name,email',
            'staff:id,first_name,last_name',
            'service:id,name,duration',
        ])
            ->where('company_id', $user->company_id)
            ->whereBetween('appointment_date', [
                $validated['start'],
                $validated['end'],
            ])
            ->orderBy('appointment_date')
            ->orderBy('start_time')
            ->get();

        return response()->json([
            'success' => true,
            'message' => 'Company calendar retrieved successfully.',
            'data' => $appointments,
        ]);
    }

    /**
     * Build a scalar-only notification payload.
     * ✅ CRITICAL: Never pass models inside — causes circular serialization.
     */
    private function buildNotificationPayload(Appointment $appointment, ?User $customer): array
    {
        return [
            'appointment_id' => $appointment->id,
            'customer_name' => $customer?->name,
            'company_name' => $appointment->company?->name,
            'staff_name' => $appointment->staff
                ? trim($appointment->staff->first_name . ' ' . $appointment->staff->last_name)
                : null,
            'service_name' => $appointment->service?->name,
            'appointment_date' => (string) $appointment->appointment_date,
            'start_time' => (string) $appointment->start_time,
            'end_time' => (string) $appointment->end_time,
            'amount' => $appointment->payment?->amount,
            'payment_method' => $appointment->payment?->method,
            'payment_status' => $appointment->payment?->status,
            'status' => $appointment->status,
        ];
    }
}