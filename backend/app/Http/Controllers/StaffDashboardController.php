<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use App\Models\StaffAvailability;
use Illuminate\Http\Request;

class StaffDashboardController extends Controller
{
    private function formatAppointment(Appointment $a): array
    {
        return [
            'id'               => $a->id,
            'appointment_date' => $a->appointment_date instanceof \DateTimeInterface
                                    ? $a->appointment_date->format('Y-m-d')
                                    : (string) $a->appointment_date,
            'start_time'       => (string) $a->start_time,
            'end_time'         => (string) $a->end_time,
            'status'           => $a->status,
            'created_at'       => optional($a->created_at)->toDateTimeString(),
            'customer'         => $a->customer
                                    ? ['id' => $a->customer->id, 'name' => $a->customer->name]
                                    : null,
            'service'          => $a->service
                                    ? ['id' => $a->service->id, 'name' => $a->service->name, 'duration' => $a->service->duration]
                                    : null,
        ];
    }

    private function baseQuery(int $staffId)
    {
        return Appointment::select(
                'id', 'staff_id', 'customer_id', 'service_id',
                'appointment_date', 'start_time', 'end_time', 'status', 'created_at'
            )
            ->with(['customer:id,name', 'service:id,name,duration'])
            ->where('staff_id', $staffId);
    }

    public function index(Request $request)
    {
        $staff = $request->user();

        if (!$staff) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized. No user resolved.',
                'data'    => null,
                'errors'  => null,
            ], 401);
        }

        $staffId = $staff->id;

        $availability = StaffAvailability::where('staff_id', $staffId)
            ->where('day_of_week', now()->dayOfWeekIso)
            ->first();

        $todayAvailability = $availability ? [
            'is_working'  => (bool) $availability->is_working,
            'start_time'  => $availability->start_time,
            'end_time'    => $availability->end_time,
            'break_start' => $availability->break_start,
            'break_end'   => $availability->break_end,
        ] : null;

        $todayAppointments = $this->baseQuery($staffId)
            ->whereDate('appointment_date', today())
            ->orderBy('start_time')
            ->get()
            ->map(fn ($a) => $this->formatAppointment($a))
            ->values();

        $upcomingAppointments = $this->baseQuery($staffId)
            ->where(function ($query) {
                $query->whereDate('appointment_date', '>', today())
                    ->orWhere(function ($q) {
                        $q->whereDate('appointment_date', today())
                          ->where('start_time', '>=', now()->format('H:i:s'));
                    });
            })
            ->whereIn('status', ['pending', 'accepted'])
            ->orderBy('appointment_date')
            ->orderBy('start_time')
            ->limit(5)
            ->get()
            ->map(fn ($a) => $this->formatAppointment($a))
            ->values();

        $recentActivity = $this->baseQuery($staffId)
            ->latest('created_at')
            ->limit(5)
            ->get()
            ->map(fn ($a) => $this->formatAppointment($a))
            ->values();

        $counts = Appointment::where('staff_id', $staffId)
            ->selectRaw("
                COUNT(*) as total,
                SUM(status = 'pending') as pending,
                SUM(status = 'completed') as completed,
                SUM(status = 'cancelled') as cancelled
            ")
            ->first();

        return response()->json([
            'success' => true,
            'data' => [
                'statistics' => [
                    'today_appointments'     => $todayAppointments,
                    'pending_appointments'   => (int) $counts->pending,
                    'completed_appointments' => (int) $counts->completed,
                    'cancelled_appointments' => (int) $counts->cancelled,
                    'total_appointments'     => (int) $counts->total,
                ],
                'upcoming_appointments' => $upcomingAppointments,
                'recent_activity'       => $recentActivity,
                'today_availability'    => $todayAvailability,
            ],
        ]);
    }
}