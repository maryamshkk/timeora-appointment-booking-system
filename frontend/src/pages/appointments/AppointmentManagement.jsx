import React, { useMemo, useState } from "react";
import {
    Calendar,
    ChevronLeft,
    ChevronRight,
    CheckCircle2,
    List,
    MoreHorizontal,
    Plus,
    Search,
    SlidersHorizontal,
    Loader2,
    AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import StatCard from "../../components/dashboard/StatCard";
import CalendarScheduleView from "../../components/dashboard/CalendarScheduleView";
import {
    useAppointments,
    useCancelAppointment,
} from "../../hooks/company/useAppointments";

function statusLabel(status) {
    if (!status) return "";
    return status.charAt(0).toUpperCase() + status.slice(1);
}

function mapAppointment(appointment) {
    return {
        id: appointment.id,
        date: appointment.appointment_date,
        time: `${appointment.start_time?.slice(0, 5) || ""} - ${
            appointment.end_time?.slice(0, 5) || ""
        }`,
        customer: appointment.customer?.name || "Unknown",
        service: appointment.service?.name || "Service",
        staff: appointment.staff
            ? `${appointment.staff.first_name || ""} ${
                  appointment.staff.last_name || ""
              }`.trim()
            : "Unassigned",
        status: statusLabel(appointment.status),
        payment: appointment.payment
            ? {
                  type: appointment.payment.status === "paid" ? "paid" : "method",
                  value: appointment.payment.method || "",
              }
            : { type: "none" },
    };
}

function AppointmentManagement() {
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [viewMode, setViewMode] = useState("list");

    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [showFilters, setShowFilters] = useState(false);

    const [statusFilter, setStatusFilter] = useState("all");
    const [staffFilter, setStaffFilter] = useState("all");
    const [serviceFilter, setServiceFilter] = useState("all");
    const [paymentFilter, setPaymentFilter] = useState("all");
    const [bookingDate, setBookingDate] = useState("");

    const [openActionId, setOpenActionId] = useState(null);

    const {
        data: appointmentsResponse,
        isLoading,
        isError,
        error,
    } = useAppointments();

    const cancelMutation = useCancelAppointment();

    const bookings = useMemo(() => {
        const raw = appointmentsResponse?.data || [];
        return raw.map(mapAppointment);
    }, [appointmentsResponse]);

    const staffOptions = useMemo(() => {
        const set = new Set();
        bookings.forEach((b) => b.staff && set.add(b.staff));
        return Array.from(set);
    }, [bookings]);

    const serviceOptions = useMemo(() => {
        const set = new Set();
        bookings.forEach((b) => b.service && set.add(b.service));
        return Array.from(set);
    }, [bookings]);

    const filteredBookings = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();

        return bookings.filter((booking) => {
            const matchesSearch =
                !query ||
                [
                    booking.customer,
                    booking.service,
                    booking.staff,
                    booking.status,
                    booking.payment?.value,
                ]
                    .filter(Boolean)
                    .some((value) => value.toLowerCase().includes(query));

            const matchesDate =
                !bookingDate || booking.date === bookingDate;

            const matchesStatus =
                statusFilter === "all" || booking.status === statusFilter;

            const matchesStaff =
                staffFilter === "all" || booking.staff === staffFilter;

            const matchesService =
                serviceFilter === "all" || booking.service === serviceFilter;

            const matchesPayment =
                paymentFilter === "all" ||
                booking.payment?.type === paymentFilter;

            return (
                matchesSearch &&
                matchesDate &&
                matchesStatus &&
                matchesStaff &&
                matchesService &&
                matchesPayment
            );
        });
    }, [
        bookings,
        searchQuery,
        bookingDate,
        statusFilter,
        staffFilter,
        serviceFilter,
        paymentFilter,
    ]);

    const itemsPerPage = 10;

    const totalPages = Math.max(
        1,
        Math.ceil(filteredBookings.length / itemsPerPage)
    );

    const startIndex = (currentPage - 1) * itemsPerPage;

    const paginatedBookings = filteredBookings.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    const activeFilterCount =
        (bookingDate ? 1 : 0) +
        (statusFilter !== "all" ? 1 : 0) +
        (staffFilter !== "all" ? 1 : 0) +
        (serviceFilter !== "all" ? 1 : 0) +
        (paymentFilter !== "all" ? 1 : 0);

    const statusCounts = useMemo(() => {
        const counts = { today: 0, upcoming: 0, completed: 0, cancelled: 0 };
        const todayIso = new Date().toISOString().slice(0, 10);

        bookings.forEach((b) => {
            if (b.date === todayIso) counts.today += 1;
            if (b.status === "Pending" || b.status === "Accepted") {
                counts.upcoming += 1;
            }
            if (b.status === "Completed") counts.completed += 1;
            if (b.status === "Cancelled") counts.cancelled += 1;
        });

        return counts;
    }, [bookings]);

    function getStatusAccent(status) {
        if (status === "Accepted" || status === "Confirmed") return "bg-navy";
        if (status === "Completed") return "bg-gray";
        if (status === "Cancelled" || status === "Rejected") return "bg-red-400";
        if (status === "Pending") return "bg-gold";
        return "bg-gray";
    }

    function getStatusStyle(status) {
        if (status === "Accepted" || status === "Confirmed")
            return "bg-navy/10 text-navy";
        if (status === "Completed") return "bg-gray/15 text-slate";
        if (status === "Cancelled" || status === "Rejected")
            return "bg-red-50 text-red-600";
        if (status === "Pending") return "bg-gold/20 text-amber-700";
        return "bg-gray/15 text-slate";
    }

    function clearFilters() {
        setStatusFilter("all");
        setStaffFilter("all");
        setServiceFilter("all");
        setPaymentFilter("all");
        setBookingDate("");
        setSearchQuery("");
        setCurrentPage(1);
    }

    function handleToday() {
        const iso = new Date().toISOString().slice(0, 10);
        setBookingDate(iso);
        setCurrentPage(1);
    }

    function goToDetails(bookingId) {
        navigate(`/company/appointments/${bookingId}`);
    }

    function goToReschedule(bookingId) {
        navigate(`/company/appointments/${bookingId}/reschedule`);
    }

    function handleCancelBooking(booking) {
        const confirmed = window.confirm(
            `Cancel appointment for ${booking.customer}?`
        );

        if (!confirmed) return;

        cancelMutation.mutate(booking.id, {
            onSuccess: () => setOpenActionId(null),
        });
    }

    return (
        <div className="flex min-h-screen bg-beige">
            <div className="hidden lg:block lg:flex-shrink-0">
                <Sidebar
                    companyName="Shifa Clinic"
                    activeItem="Appointments"
                    ctaLabel="Book Appointment"
                    ctaPath="/company/appointments/new"
                />
            </div>

            {sidebarOpen && (
                <>
                    <button
                        type="button"
                        onClick={() => setSidebarOpen(false)}
                        className="fixed inset-0 z-30 bg-navy/50 lg:hidden"
                        aria-label="Close menu"
                    />

                    <div className="fixed left-0 top-0 z-40 h-screen w-64 overflow-y-auto lg:hidden">
                        <Sidebar
                            companyName="Shifa Clinic"
                            activeItem="Appointments"
                            ctaLabel="Book Appointment"
                            ctaPath="/company/appointments/new"
                        />
                    </div>
                </>
            )}

            <div className="flex min-w-0 flex-1 flex-col">
                <Topbar
                    onMenuClick={() => setSidebarOpen(true)}
                    showBell
                    hasNotification
                    profileInfo={{ name: "Company Profile" }}
                    searchPlaceholder="Search..."
                />

                <main className="flex-1 bg-beige px-3 py-4 sm:px-4 sm:py-5 md:px-6 lg:px-8 lg:py-6">
                    <div className="mb-4 flex flex-col gap-3 sm:mb-6 md:flex-row md:items-start md:justify-between">
                        <div>
                            <h1 className="font-serif text-2xl text-navy sm:text-3xl lg:text-4xl">
                                Appointment Management
                            </h1>

                            <p className="mt-1 text-xs text-slate sm:mt-1.5 sm:text-sm">
                                View and manage appointments across your company.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => navigate("/company/appointments/new")}
                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-navy px-4 py-2.5 text-sm font-bold text-white transition hover:bg-gold hover:text-navy sm:w-auto sm:px-5 sm:py-3"
                        >
                            <Plus className="h-4 w-4" />
                            Create Appointment
                        </button>
                    </div>

                    <div className="mb-4 grid grid-cols-2 gap-3 sm:gap-4 md:mb-6 lg:grid-cols-4">
                        <StatCard value={statusCounts.today} label="Today" accentColor="bg-navy" />
                        <StatCard value={statusCounts.upcoming} label="Upcoming" accentColor="bg-gold" />
                        <StatCard value={statusCounts.completed} label="Completed" accentColor="bg-gray" />
                        <StatCard value={statusCounts.cancelled} label="Cancelled" accentColor="bg-red-400" />
                    </div>

                    <div className="mb-4 flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center md:justify-between">
                        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
                            <div className="flex w-full overflow-hidden rounded-lg border border-gray/30 bg-white sm:w-auto">
                                <button
                                    type="button"
                                    onClick={() => setViewMode("list")}
                                    className={`flex flex-1 items-center justify-center gap-2 px-3 py-2.5 text-xs font-bold transition sm:flex-none sm:px-4 sm:text-sm ${
                                        viewMode === "list"
                                            ? "bg-beige text-navy"
                                            : "text-slate hover:bg-beige/50"
                                    }`}
                                >
                                    <List className="h-4 w-4" />
                                    List
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setViewMode("calendar")}
                                    className={`flex flex-1 items-center justify-center gap-2 px-3 py-2.5 text-xs font-bold transition sm:flex-none sm:px-4 sm:text-sm ${
                                        viewMode === "calendar"
                                            ? "bg-beige text-navy"
                                            : "text-slate hover:bg-beige/50"
                                    }`}
                                >
                                    <Calendar className="h-4 w-4" />
                                    Calendar
                                </button>
                            </div>

                            <div className="flex w-full items-center gap-2 sm:w-auto">
                                <div className="relative flex-1 sm:flex-none">
                                    <Calendar className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />

                                    <input
                                        type="date"
                                        value={bookingDate}
                                        onChange={(event) => {
                                            setBookingDate(event.target.value);
                                            setCurrentPage(1);
                                        }}
                                        className="h-[42px] w-full rounded-lg border border-gray/30 bg-white pl-9 pr-8 text-xs font-bold text-navy outline-none transition hover:border-navy focus:border-navy sm:w-auto sm:pr-3 sm:text-sm"
                                    />

                                    {bookingDate && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setBookingDate("");
                                                setCurrentPage(1);
                                            }}
                                            className="absolute right-2 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full text-slate transition hover:bg-beige hover:text-navy"
                                            aria-label="Clear date"
                                        >
                                            ×
                                        </button>
                                    )}
                                </div>

                                <button
                                    type="button"
                                    onClick={handleToday}
                                    className="h-[42px] flex-shrink-0 rounded-lg border border-gray/30 bg-white px-3 text-xs font-bold text-navy transition hover:border-navy"
                                >
                                    Today
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
                            <div className="relative w-full sm:w-auto sm:min-w-[220px]">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />

                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(event) => {
                                        setSearchQuery(event.target.value);
                                        setCurrentPage(1);
                                    }}
                                    placeholder="Search bookings..."
                                    className="w-full rounded-lg border border-gray/30 bg-white py-2.5 pl-9 pr-4 text-sm text-navy outline-none transition focus:border-navy"
                                />
                            </div>

                            <button
                                type="button"
                                onClick={() => setShowFilters((current) => !current)}
                                className={`flex w-full items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-bold transition sm:w-auto ${
                                    showFilters || activeFilterCount > 0
                                        ? "border-navy bg-navy text-white"
                                        : "border-gray/30 bg-white text-navy hover:border-navy"
                                }`}
                            >
                                <SlidersHorizontal className="h-4 w-4" />
                                Filters

                                {activeFilterCount > 0 && (
                                    <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-gold px-1.5 text-[11px] font-bold text-navy">
                                        {activeFilterCount}
                                    </span>
                                )}
                            </button>
                        </div>
                    </div>

                    {showFilters && (
                        <div className="mb-4 rounded-xl border border-gray/20 bg-beige/30 p-3 sm:p-4">
                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
                                <div>
                                    <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate">
                                        Status
                                    </label>

                                    <select
                                        value={statusFilter}
                                        onChange={(event) => {
                                            setStatusFilter(event.target.value);
                                            setCurrentPage(1);
                                        }}
                                        className="h-10 w-full rounded-lg border border-gray/30 bg-white px-3 text-sm text-navy outline-none focus:border-navy"
                                    >
                                        <option value="all">All Statuses</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Accepted">Accepted</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Cancelled">Cancelled</option>
                                        <option value="Rejected">Rejected</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate">
                                        Staff
                                    </label>

                                    <select
                                        value={staffFilter}
                                        onChange={(event) => {
                                            setStaffFilter(event.target.value);
                                            setCurrentPage(1);
                                        }}
                                        className="h-10 w-full rounded-lg border border-gray/30 bg-white px-3 text-sm text-navy outline-none focus:border-navy"
                                    >
                                        <option value="all">All Staff</option>
                                        {staffOptions.map((staff) => (
                                            <option key={staff} value={staff}>
                                                {staff}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate">
                                        Service
                                    </label>

                                    <select
                                        value={serviceFilter}
                                        onChange={(event) => {
                                            setServiceFilter(event.target.value);
                                            setCurrentPage(1);
                                        }}
                                        className="h-10 w-full rounded-lg border border-gray/30 bg-white px-3 text-sm text-navy outline-none focus:border-navy"
                                    >
                                        <option value="all">All Services</option>
                                        {serviceOptions.map((service) => (
                                            <option key={service} value={service}>
                                                {service}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-slate">
                                        Payment
                                    </label>

                                    <select
                                        value={paymentFilter}
                                        onChange={(event) => {
                                            setPaymentFilter(event.target.value);
                                            setCurrentPage(1);
                                        }}
                                        className="h-10 w-full rounded-lg border border-gray/30 bg-white px-3 text-sm text-navy outline-none focus:border-navy"
                                    >
                                        <option value="all">All Payments</option>
                                        <option value="paid">Paid</option>
                                        <option value="method">Cash on Reception</option>
                                        <option value="none">Unpaid</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mt-3 flex justify-end sm:mt-4">
                                <button
                                    type="button"
                                    onClick={clearFilters}
                                    className="text-xs font-bold text-navy hover:underline"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        </div>
                    )}

                    {viewMode === "list" ? (
                        <div className="overflow-hidden rounded-xl border border-gray/20 bg-white shadow-sm">
                            {isLoading && (
                                <div className="flex items-center justify-center gap-3 py-16">
                                    <Loader2 className="h-5 w-5 animate-spin text-navy" />
                                    <span className="text-sm text-slate">
                                        Loading appointments...
                                    </span>
                                </div>
                            )}

                            {isError && !isLoading && (
                                <div className="flex items-start gap-3 px-5 py-6">
                                    <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
                                    <p className="text-sm text-red-700">
                                        {error?.response?.data?.message ||
                                            error?.message ||
                                            "Failed to load appointments."}
                                    </p>
                                </div>
                            )}

                            {!isLoading && !isError && (
                                <>
                                    <div className="overflow-x-auto">
                                        <div className="min-w-[1050px]">
                                            <div className="grid grid-cols-[8px_140px_1.3fr_1fr_1.2fr_120px_1.2fr_60px] items-center gap-4 border-b border-gray/20 bg-beige/40 px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate sm:px-5 sm:py-3.5">
                                                <span></span>
                                                <span>Time</span>
                                                <span>Customer</span>
                                                <span>Service</span>
                                                <span>Staff</span>
                                                <span>Status</span>
                                                <span>Payment</span>
                                                <span>Actions</span>
                                            </div>

                                            {paginatedBookings.length > 0 ? (
                                                paginatedBookings.map((booking, index) => (
                                                    <div
                                                        key={booking.id}
                                                        onClick={() => goToDetails(booking.id)}
                                                        className={`relative grid cursor-pointer grid-cols-[8px_140px_1.3fr_1fr_1.2fr_120px_1.2fr_60px] items-center gap-4 px-4 py-4 transition hover:bg-beige/20 sm:px-5 ${
                                                            index !== paginatedBookings.length - 1
                                                                ? "border-b border-gray/10"
                                                                : ""
                                                        }`}
                                                    >
                                                        <span
                                                            className={`absolute bottom-2 left-0 top-2 w-1 rounded-full ${getStatusAccent(
                                                                booking.status
                                                            )}`}
                                                        />

                                                        <span></span>

                                                        <span
                                                            className={`text-sm font-bold ${
                                                                booking.status === "Cancelled"
                                                                    ? "text-gray line-through"
                                                                    : "text-navy"
                                                            }`}
                                                        >
                                                            {booking.time}
                                                        </span>

                                                        <span className="text-sm font-bold text-navy">
                                                            {booking.customer}
                                                        </span>

                                                        <span
                                                            className={`text-sm ${
                                                                booking.status === "Cancelled"
                                                                    ? "text-gray line-through"
                                                                    : "text-navy"
                                                            }`}
                                                        >
                                                            {booking.service}
                                                        </span>

                                                        <span className="text-sm text-navy">
                                                            {booking.staff}
                                                        </span>

                                                        <span
                                                            className={`w-fit whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-bold ${getStatusStyle(
                                                                booking.status
                                                            )}`}
                                                        >
                                                            {booking.status}
                                                        </span>

                                                        <div>
                                                            {booking.payment.type === "paid" && (
                                                                <span className="flex items-center gap-1.5 text-sm font-bold text-navy">
                                                                    <CheckCircle2 className="h-3.5 w-3.5 text-navy" />
                                                                    Paid
                                                                </span>
                                                            )}

                                                            {booking.payment.type === "method" && (
                                                                <span className="text-sm text-slate">
                                                                    {booking.payment.value}
                                                                </span>
                                                            )}

                                                            {booking.payment.type === "none" && (
                                                                <span className="text-sm text-gray">—</span>
                                                            )}
                                                        </div>

                                                        <div className="relative flex justify-end">
                                                            <button
                                                                type="button"
                                                                onClick={(event) => {
                                                                    event.stopPropagation();
                                                                    setOpenActionId(
                                                                        openActionId === booking.id
                                                                            ? null
                                                                            : booking.id
                                                                    );
                                                                }}
                                                                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate transition hover:bg-beige hover:text-navy"
                                                                aria-label="More actions"
                                                            >
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </button>

                                                            {openActionId === booking.id && (
                                                                <div
                                                                    onClick={(event) => event.stopPropagation()}
                                                                    className="absolute right-0 top-9 z-30 w-44 rounded-lg border border-gray/20 bg-white py-1 shadow-lg"
                                                                >
                                                                    <button
                                                                        type="button"
                                                                        onClick={(event) => {
                                                                            event.stopPropagation();
                                                                            setOpenActionId(null);
                                                                            goToDetails(booking.id);
                                                                        }}
                                                                        className="w-full px-4 py-2.5 text-left text-sm text-navy hover:bg-beige"
                                                                    >
                                                                        View Details
                                                                    </button>

                                                                    <button
                                                                        type="button"
                                                                        onClick={(event) => {
                                                                            event.stopPropagation();
                                                                            setOpenActionId(null);
                                                                            goToReschedule(booking.id);
                                                                        }}
                                                                        className="w-full px-4 py-2.5 text-left text-sm text-navy hover:bg-beige"
                                                                    >
                                                                        Edit / Reschedule
                                                                    </button>

                                                                    {booking.status !== "Cancelled" &&
                                                                        booking.status !== "Completed" &&
                                                                        booking.status !== "Rejected" && (
                                                                            <button
                                                                                type="button"
                                                                                onClick={(event) => {
                                                                                    event.stopPropagation();
                                                                                    handleCancelBooking(booking);
                                                                                }}
                                                                                className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50"
                                                                            >
                                                                                Cancel Appointment
                                                                            </button>
                                                                        )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="px-5 py-12 text-center">
                                                    <p className="text-sm text-slate">
                                                        No bookings found.
                                                    </p>

                                                    {activeFilterCount > 0 && (
                                                        <button
                                                            type="button"
                                                            onClick={clearFilters}
                                                            className="mt-3 text-xs font-bold text-navy hover:underline"
                                                        >
                                                            Clear filters
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-center gap-3 border-t border-gray/20 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                                        <p className="text-xs text-slate sm:text-sm">
                                            {filteredBookings.length === 0
                                                ? "0 bookings"
                                                : `${startIndex + 1}-${Math.min(
                                                      startIndex + itemsPerPage,
                                                      filteredBookings.length
                                                  )} of ${filteredBookings.length}`}
                                        </p>

                                        <div className="flex items-center gap-2">
                                            <button
                                                type="button"
                                                disabled={currentPage === 1}
                                                onClick={() =>
                                                    setCurrentPage((page) =>
                                                        Math.max(1, page - 1)
                                                    )
                                                }
                                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray/30 text-slate transition hover:bg-beige disabled:cursor-not-allowed disabled:opacity-40"
                                                aria-label="Previous page"
                                            >
                                                <ChevronLeft className="h-4 w-4" />
                                            </button>

                                            <span className="text-xs font-bold text-navy sm:text-sm">
                                                {currentPage} / {totalPages}
                                            </span>

                                            <button
                                                type="button"
                                                disabled={currentPage === totalPages}
                                                onClick={() =>
                                                    setCurrentPage((page) => page + 1)
                                                }
                                                className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray/30 text-slate transition hover:bg-beige disabled:cursor-not-allowed disabled:opacity-40"
                                                aria-label="Next page"
                                            >
                                                <ChevronRight className="h-4 w-4" />
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    ) : (
                        <CalendarScheduleView
                            onViewDetails={(appointment) =>
                                navigate(`/company/appointments/${appointment.id}`)
                            }
                            onCreateAppointment={() =>
                                navigate("/company/appointments/new")
                            }
                        />
                    )}
                </main>
            </div>
        </div>
    );
}

export default AppointmentManagement;