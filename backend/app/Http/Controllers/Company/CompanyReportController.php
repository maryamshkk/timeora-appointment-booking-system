<?php

namespace App\Http\Controllers\Company;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\Appointment;
use App\Models\Customer;
use App\Models\Staff;
use App\Models\Service;
use App\Models\Payment;
use App\Models\Receipt;


class CompanyReportController extends Controller
{
    /**
     * Company Reports Overview
     */
    public function overview(Request $request)
    {
        $companyId = Auth::user()->company_id;

        $request->validate([
            'from' => ['nullable', 'date'],
            'to' => ['nullable', 'date', 'after_or_equal:from'],
        ]);

        $appointmentsQuery = Appointment::where('company_id', $companyId);

        if ($request->filled('from')) {
            $appointmentsQuery->whereDate('appointment_date', '>=', $request->from);
        }

        if ($request->filled('to')) {
            $appointmentsQuery->whereDate('appointment_date', '<=', $request->to);
        }

        $totalAppointments = (clone $appointmentsQuery)->count();

        $completed = (clone $appointmentsQuery)->where('status', 'completed')->count();
        $pending = (clone $appointmentsQuery)->where('status', 'pending')->count();
        $accepted = (clone $appointmentsQuery)->where('status', 'accepted')->count();

        $upcoming = (clone $appointmentsQuery)
            ->whereDate('appointment_date', '>=', now()->toDateString())
            ->whereIn('status', ['pending', 'accepted'])
            ->count();

        $cancelled = (clone $appointmentsQuery)->where('status', 'cancelled')->count();
        $rejected = (clone $appointmentsQuery)->where('status', 'rejected')->count();
        $rescheduled = (clone $appointmentsQuery)->where('status', 'rescheduled')->count();

        $totalCustomers = Appointment::where('company_id', $companyId)
            ->distinct('customer_id')
            ->count('customer_id');

        $totalStaff = Staff::where('company_id', $companyId)->count();
        $totalServices = Service::where('company_id', $companyId)->count();

        return response()->json([
            'success' => true,
            'message' => 'Company reports overview fetched successfully.',
            'data' => [
                'appointments' => [
                    'total' => $totalAppointments,
                    'completed' => $completed,
                    'pending' => $pending,
                    'accepted' => $accepted,
                    'upcoming' => $upcoming,
                    'cancelled' => $cancelled,
                    'rejected' => $rejected,
                    'rescheduled' => $rescheduled,
                ],
                'customers' => ['total' => $totalCustomers],
                'staff' => ['total' => $totalStaff],
                'services' => ['total' => $totalServices],
                'filters' => [
                    'from' => $request->from,
                    'to' => $request->to,
                ],
            ],
        ]);
    }

    // Booking analytics
    public function bookings(Request $request)
    {
        $companyId = Auth::user()->company_id;

        $request->validate([
            'from' => 'nullable|date',
            'to' => 'nullable|date|after_or_equal:from',
        ]);

        $query = Appointment::where('company_id', $companyId);

        if ($request->filled('from')) {
            $query->whereDate('appointment_date', '>=', $request->from);
        }

        if ($request->filled('to')) {
            $query->whereDate('appointment_date', '<=', $request->to);
        }

        $bookings = (clone $query)
            ->selectRaw('
                DATE(appointment_date) as date,
                COUNT(*) as total,
                SUM(CASE WHEN status = "completed" THEN 1 ELSE 0 END) as completed,
                SUM(CASE WHEN status = "cancelled" THEN 1 ELSE 0 END) as cancelled,
                SUM(CASE WHEN status = "pending" THEN 1 ELSE 0 END) as pending
            ')
            ->groupByRaw('DATE(appointment_date)')
            ->orderBy('date')
            ->get();

        $statusBreakdown = (clone $query)
            ->select('status')
            ->selectRaw('COUNT(*) as total')
            ->groupBy('status')
            ->pluck('total', 'status');

        $cancellationCount = (clone $query)
            ->where('status', 'cancelled')
            ->count();

        return response()->json([
            'success' => true,
            'data' => [
                'daily_trends' => $bookings,
                'status_breakdown' => $statusBreakdown,
                'cancellation_count' => $cancellationCount,
            ],
        ]);
    }

    // Customer analytics
    public function customers(Request $request)
    {
        $companyId = Auth::user()->company_id;

        $request->validate([
            'from' => 'nullable|date',
            'to' => 'nullable|date|after_or_equal:from',
        ]);

        $appointmentsQuery = Appointment::where('company_id', $companyId);

        if ($request->filled('from')) {
            $appointmentsQuery->whereDate('appointment_date', '>=', $request->from);
        }

        if ($request->filled('to')) {
            $appointmentsQuery->whereDate('appointment_date', '<=', $request->to);
        }

        $totalCustomers = Appointment::where('company_id', $companyId)
            ->distinct('customer_id')
            ->count('customer_id');

        $customersWithAppointments = (clone $appointmentsQuery)
            ->whereNotNull('customer_id')
            ->distinct('customer_id')
            ->count('customer_id');

        $topCustomers = (clone $appointmentsQuery)
            ->select('customer_id')
            ->selectRaw('COUNT(*) as appointment_count')
            ->whereNotNull('customer_id')
            ->groupBy('customer_id')
            ->orderByDesc('appointment_count')
            ->with('customer')
            ->get();

        return response()->json([
            'success' => true,
            'data' => [
                'total_customers' => $totalCustomers,
                'customers_with_appointments' => $customersWithAppointments,
                'top_customers' => $topCustomers,
            ],
        ]);
    }

    // Staff analytics
    public function staff(Request $request)
    {
        $companyId = Auth::user()->company_id;

        $request->validate([
            'from' => 'nullable|date',
            'to' => 'nullable|date|after_or_equal:from',
        ]);

        $staff = Staff::where('company_id', $companyId)
            ->withCount([
                'appointments as total_appointments' => function ($q) use ($request) {
                    if ($request->filled('from')) {
                        $q->whereDate('appointment_date', '>=', $request->from);
                    }
                    if ($request->filled('to')) {
                        $q->whereDate('appointment_date', '<=', $request->to);
                    }
                },
                'appointments as completed_appointments' => function ($q) use ($request) {
                    $q->where('status', 'completed');
                    if ($request->filled('from')) {
                        $q->whereDate('appointment_date', '>=', $request->from);
                    }
                    if ($request->filled('to')) {
                        $q->whereDate('appointment_date', '<=', $request->to);
                    }
                },
                'appointments as cancelled_appointments' => function ($q) use ($request) {
                    $q->where('status', 'cancelled');
                    if ($request->filled('from')) {
                        $q->whereDate('appointment_date', '>=', $request->from);
                    }
                    if ($request->filled('to')) {
                        $q->whereDate('appointment_date', '<=', $request->to);
                    }
                },
                'appointments as rejected_appointments' => function ($q) use ($request) {
                    $q->where('status', 'rejected');
                    if ($request->filled('from')) {
                        $q->whereDate('appointment_date', '>=', $request->from);
                    }
                    if ($request->filled('to')) {
                        $q->whereDate('appointment_date', '<=', $request->to);
                    }
                },
                'appointments as pending_appointments' => function ($q) use ($request) {
                    $q->where('status', 'pending');
                    if ($request->filled('from')) {
                        $q->whereDate('appointment_date', '>=', $request->from);
                    }
                    if ($request->filled('to')) {
                        $q->whereDate('appointment_date', '<=', $request->to);
                    }
                },
            ])
            ->get();

        $staff->each(function ($member) {
            $member->completion_rate = $member->total_appointments > 0
                ? round(($member->completed_appointments / $member->total_appointments) * 100, 2)
                : 0;
        });

        return response()->json([
            'success' => true,
            'data' => $staff,
        ]);
    }

    // Payments analytics
    public function payments(Request $request)
    {
        $companyId = Auth::user()->company_id;

        $request->validate([
            'from' => 'nullable|date',
            'to' => 'nullable|date|after_or_equal:from',
        ]);

        $query = Payment::whereHas('appointment', function ($q) use ($companyId, $request) {
            $q->where('company_id', $companyId);

            if ($request->filled('from')) {
                $q->whereDate('appointment_date', '>=', $request->from);
            }

            if ($request->filled('to')) {
                $q->whereDate('appointment_date', '<=', $request->to);
            }
        });

        $totalPayments = (clone $query)->count();
        $paidAppointments = (clone $query)->where('status', 'paid')->count();
        $unpaidAppointments = (clone $query)->where('status', 'unpaid')->count();

        $statusBreakdown = (clone $query)
            ->select('status')
            ->selectRaw('COUNT(*) as total')
            ->groupBy('status')
            ->pluck('total', 'status');

        $receiptCount = Receipt::whereHas('appointment', function ($q) use ($companyId, $request) {
            $q->where('company_id', $companyId);

            if ($request->filled('from')) {
                $q->whereDate('appointment_date', '>=', $request->from);
            }

            if ($request->filled('to')) {
                $q->whereDate('appointment_date', '<=', $request->to);
            }
        })->count();

        return response()->json([
            'success' => true,
            'data' => [
                'total_payments' => $totalPayments,
                'paid_appointments' => $paidAppointments,
                'unpaid_appointments' => $unpaidAppointments,
                'status_breakdown' => $statusBreakdown,
                'receipt_count' => $receiptCount,
            ],
        ]);
    }

    /**
     * Appointment Report — list + summary
     */
    public function appointments(Request $request)
    {
        $companyId = Auth::user()->company_id;

        $request->validate([
            'from' => ['nullable', 'date'],
            'to' => ['nullable', 'date', 'after_or_equal:from'],
            'staff_id' => ['nullable', 'integer'],
            'service_id' => ['nullable', 'integer'],
            'status' => ['nullable', 'string'],
            'per_page' => ['nullable', 'integer', 'min:1', 'max:100'],
            'page' => ['nullable', 'integer', 'min:1'],
        ]);

        $baseQuery = Appointment::where('company_id', $companyId);

        if ($request->filled('from')) {
            $baseQuery->whereDate('appointment_date', '>=', $request->from);
        }

        if ($request->filled('to')) {
            $baseQuery->whereDate('appointment_date', '<=', $request->to);
        }

        if ($request->filled('staff_id')) {
            $baseQuery->where('staff_id', $request->staff_id);
        }

        if ($request->filled('service_id')) {
            $baseQuery->where('service_id', $request->service_id);
        }

        if ($request->filled('status')) {
            $baseQuery->where('status', $request->status);
        }

        $summary = [
            'total' => (clone $baseQuery)->count(),
            'completed' => (clone $baseQuery)->where('status', 'completed')->count(),
            'pending' => (clone $baseQuery)->where('status', 'pending')->count(),
            'accepted' => (clone $baseQuery)->where('status', 'accepted')->count(),
            'cancelled' => (clone $baseQuery)->where('status', 'cancelled')->count(),
            'rejected' => (clone $baseQuery)->where('status', 'rejected')->count(),
            'rescheduled' => (clone $baseQuery)->where('status', 'rescheduled')->count(),
        ];

        $perPage = $request->input('per_page', 15);

        $appointments = (clone $baseQuery)
            ->with([
                'customer:id,name,email,phone',
                'staff:id,first_name,last_name',
                'service:id,name,duration_minutes,price',
            ])
            ->orderByDesc('appointment_date')
            ->orderByDesc('start_time')
            ->paginate($perPage);

        return response()->json([
            'success' => true,
            'message' => 'Appointment report fetched successfully.',
            'data' => [
                'summary' => $summary,
                'appointments' => $appointments->items(),
                'pagination' => [
                    'current_page' => $appointments->currentPage(),
                    'per_page' => $appointments->perPage(),
                    'total' => $appointments->total(),
                    'last_page' => $appointments->lastPage(),
                ],
            ],
        ]);
    }

    /**
     * Service Report — analytics + list
     */
    public function services(Request $request)
    {
        $companyId = Auth::user()->company_id;

        $request->validate([
            'from' => ['nullable', 'date'],
            'to' => ['nullable', 'date', 'after_or_equal:from'],
            'service_id' => ['nullable', 'integer'],
        ]);

        $appointmentQuery = Appointment::where('company_id', $companyId);

        if ($request->filled('from')) {
            $appointmentQuery->whereDate('appointment_date', '>=', $request->from);
        }

        if ($request->filled('to')) {
            $appointmentQuery->whereDate('appointment_date', '<=', $request->to);
        }

        $totalServices = Service::where('company_id', $companyId)->count();
        $totalBookings = (clone $appointmentQuery)->count();
        $completed = (clone $appointmentQuery)->where('status', 'completed')->count();
        $cancelled = (clone $appointmentQuery)->where('status', 'cancelled')->count();
        $rejected = (clone $appointmentQuery)->where('status', 'rejected')->count();

        $summary = [
            'total_services' => $totalServices,
            'total_bookings' => $totalBookings,
            'completed' => $completed,
            'cancelled' => $cancelled,
            'rejected' => $rejected,
        ];

        $serviceStats = (clone $appointmentQuery)
            ->select('service_id')
            ->selectRaw('COUNT(*) as bookings')
            ->selectRaw('SUM(CASE WHEN status = "completed" THEN 1 ELSE 0 END) as completed')
            ->selectRaw('SUM(CASE WHEN status = "cancelled" THEN 1 ELSE 0 END) as cancelled')
            ->selectRaw('SUM(CASE WHEN status = "rejected" THEN 1 ELSE 0 END) as rejected')
            ->selectRaw('SUM(CASE WHEN status = "pending" THEN 1 ELSE 0 END) as pending')
            ->whereNotNull('service_id')
            ->groupBy('service_id')
            ->orderByDesc('bookings')
            ->get();

        $serviceIds = $serviceStats->pluck('service_id')->unique()->filter()->values();

        $services = Service::whereIn('id', $serviceIds)
            ->get()
            ->keyBy('id');

        $rows = $serviceStats->map(function ($row) use ($services) {
            $service = $services->get($row->service_id);

            $bookings = (int) $row->bookings;
            $completed = (int) $row->completed;

            return [
                'service_id' => $row->service_id,
                'name' => $service?->name ?? 'Unknown',
                'duration_minutes' => $service?->duration_minutes ?? null,
                'price' => $service?->price ?? null,
                'bookings' => $bookings,
                'completed' => $completed,
                'cancelled' => (int) $row->cancelled,
                'rejected' => (int) $row->rejected,
                'pending' => (int) $row->pending,
                'completion_rate' => $bookings > 0
                    ? round(($completed / $bookings) * 100, 2)
                    : 0,
            ];
        })->values();

        if ($request->filled('service_id')) {
            $rows = $rows
                ->where('service_id', (int) $request->service_id)
                ->values();
        }

        return response()->json([
            'success' => true,
            'message' => 'Service report fetched successfully.',
            'data' => [
                'summary' => $summary,
                'services' => $rows,
            ],
        ]);
    }
}