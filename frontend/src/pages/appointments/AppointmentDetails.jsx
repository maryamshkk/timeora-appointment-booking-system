import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    CalendarDays,
    Clock3,
    UserRound,
    Phone,
    Mail,
    FileText,
    CheckCircle2,
    MoreVertical,
    ChevronRight,
    X,
    RefreshCw,
    Receipt,
    Loader2,
    AlertCircle,
    Check,
} from "lucide-react";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import {
    useAppointment,
    useAcceptAppointment,
    useRejectAppointment,
    useCancelAppointment,
} from "../../hooks/company/useAppointments";

function formatDate(dateString) {
    if (!dateString) return "";
    const date = new Date(`${dateString}T00:00:00`);
    return date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

function formatTime(timeString) {
    if (!timeString) return "";
    const [hour, minute] = timeString.split(":");
    const hourNumber = Number(hour);
    const period = hourNumber >= 12 ? "PM" : "AM";
    const displayHour = hourNumber % 12 || 12;
    return `${String(displayHour).padStart(2, "0")}:${minute} ${period}`;
}

function statusLabel(status) {
    if (!status) return "";
    return status.charAt(0).toUpperCase() + status.slice(1);
}

function AppointmentDetails() {
    const { appointmentId } = useParams();
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [showMoreMenu, setShowMoreMenu] = useState(false);

    const {
        data: response,
        isLoading,
        isError,
        error,
    } = useAppointment(appointmentId);

    const acceptMutation = useAcceptAppointment();
    const rejectMutation = useRejectAppointment();
    const cancelMutation = useCancelAppointment();

    const appointment = response?.data;

    function handleCancel() {
        const confirmed = window.confirm(
            "Are you sure you want to cancel this appointment?"
        );

        if (!confirmed) return;

        cancelMutation.mutate(appointmentId);
    }

    function handleAccept() {
        acceptMutation.mutate(appointmentId);
    }

    function handleReject() {
        rejectMutation.mutate(appointmentId);
    }

    function handleReschedule() {
        navigate(`/company/appointments/${appointmentId}/reschedule`);
    }

    function handleCreateReceipt() {
        navigate(`/company/appointments/${appointmentId}/payment`);
    }

    const statusClasses = {
        Accepted: "border-green-600/30 bg-green-50 text-green-700",
        Confirmed: "border-green-600/30 bg-green-50 text-green-700",
        Pending: "border-gold bg-gold/20 text-navy",
        Cancelled: "border-red-600/30 bg-red-50 text-red-700",
        Rejected: "border-red-600/30 bg-red-50 text-red-700",
        Completed: "border-green-600/30 bg-green-50 text-green-700",
    };

    const statusClass =
        statusClasses[statusLabel(appointment?.status)] ||
        "border-gray/30 bg-gray/10 text-slate";

    const customerName = appointment?.customer?.name || "—";
    const customerEmail = appointment?.customer?.email || "—";
    const customerPhone = appointment?.customer?.phone || "—";
    const customerInitials = customerName
        .split(" ")
        .map((name) => name.charAt(0))
        .join("")
        .slice(0, 2)
        .toUpperCase();

    const staffName = appointment?.staff
        ? `${appointment.staff.first_name || ""} ${
              appointment.staff.last_name || ""
          }`.trim()
        : "—";

    const serviceName = appointment?.service?.name || "—";
    const serviceDuration = appointment?.service?.duration || 0;

    const payment = appointment?.payment || null;
    const isPending = appointment?.status === "pending";
    const isCancellable =
        appointment &&
        !["cancelled", "rejected", "completed"].includes(appointment.status);

    if (isLoading) {
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

                <div className="flex flex-1 items-center justify-center">
                    <div className="flex items-center gap-3 text-navy">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span className="font-serif text-sm">
                            Loading appointment...
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    if (isError || !appointment) {
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

                <div className="flex flex-1 items-center justify-center px-6">
                    <div className="flex max-w-md items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                        <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
                        <p className="text-sm text-red-700">
                            {error?.response?.data?.message ||
                                error?.message ||
                                "Appointment not found."}
                        </p>
                    </div>
                </div>
            </div>
        );
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
                    showHelp
                    showProfileDropdown
                    searchPlaceholder="Search..."
                />

                <main className="flex-1 bg-beige p-3 md:p-6 lg:px-8 lg:py-6">
                    <div className="mb-4 flex items-center gap-2 text-sm md:mb-5">
                        <Link
                            to="/company/appointments"
                            className="text-slate transition hover:text-navy"
                        >
                            Appointments
                        </Link>

                        <ChevronRight className="h-4 w-4 text-gray" />

                        <span className="font-bold text-navy">
                            Appointment Details
                        </span>
                    </div>

                    <div className="mb-4 flex flex-col gap-3 md:mb-6 md:gap-4 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <h1 className="font-serif text-2xl text-navy sm:text-3xl md:text-4xl lg:text-5xl">
                                Appointment Details
                            </h1>

                            <p className="mt-1 text-sm text-slate md:mt-2">
                                Appointment #{appointment.id}
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 md:gap-3">
                            {isPending && (
                                <>
                                    <button
                                        type="button"
                                        onClick={handleReject}
                                        disabled={rejectMutation.isPending}
                                        className="flex items-center justify-center gap-2 rounded-lg border border-red-500/40 bg-white px-3 py-2.5 text-sm font-bold text-red-600 transition hover:bg-red-50 disabled:opacity-50 md:px-4"
                                    >
                                        <X className="h-4 w-4" />
                                        {rejectMutation.isPending ? "Rejecting..." : "Reject"}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleAccept}
                                        disabled={acceptMutation.isPending}
                                        className="flex items-center justify-center gap-2 rounded-lg border border-green-600/40 bg-white px-3 py-2.5 text-sm font-bold text-green-700 transition hover:bg-green-50 disabled:opacity-50 md:px-4"
                                    >
                                        <Check className="h-4 w-4" />
                                        {acceptMutation.isPending ? "Accepting..." : "Accept"}
                                    </button>
                                </>
                            )}

                            {isCancellable && (
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    disabled={cancelMutation.isPending}
                                    className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-gray/30 bg-white px-3 py-2.5 text-sm font-bold text-slate transition hover:border-red-500/30 hover:text-red-600 disabled:opacity-50 sm:flex-none md:px-4"
                                >
                                    <X className="h-4 w-4" />
                                    {cancelMutation.isPending ? "Cancelling..." : "Cancel"}
                                </button>
                            )}

                            <button
                                type="button"
                                onClick={handleReschedule}
                                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-navy px-3 py-2.5 text-sm font-bold text-white transition hover:bg-gold hover:text-navy sm:flex-none md:px-4"
                            >
                                <RefreshCw className="h-4 w-4" />
                                Reschedule
                            </button>

                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowMoreMenu((previous) => !previous)
                                    }
                                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray/30 bg-white text-slate transition hover:bg-gray/10 hover:text-navy"
                                    aria-label="More options"
                                >
                                    <MoreVertical className="h-5 w-5" />
                                </button>

                                {showMoreMenu && (
                                    <div className="absolute right-0 top-full z-20 mt-2 w-44 rounded-lg border border-gray/20 bg-white p-2 shadow-lg">
                                        <button
                                            type="button"
                                            className="w-full rounded-md px-3 py-2 text-left text-sm text-slate hover:bg-beige"
                                        >
                                            Edit Appointment
                                        </button>

                                        <button
                                            type="button"
                                            className="w-full rounded-md px-3 py-2 text-left text-sm text-slate hover:bg-beige"
                                        >
                                            Send Reminder
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-3">
                        <div className="space-y-4 md:space-y-6 lg:col-span-2">
                            <div className="rounded-xl border border-gray/20 bg-white p-4 shadow-sm md:p-7">
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                    <h2 className="font-serif text-xl text-navy md:text-2xl">
                                        Appointment Summary
                                    </h2>

                                    <span
                                        className={`w-fit rounded-full border px-3 py-1 text-xs font-bold ${statusClass}`}
                                    >
                                        {statusLabel(appointment.status)}
                                    </span>
                                </div>

                                <div className="my-4 border-t border-gray/20 md:my-6" />

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
                                    <div className="flex items-start gap-3">
                                        <CalendarDays className="mt-0.5 h-5 w-5 text-slate" />
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                                Date & Time
                                            </p>
                                            <p className="mt-1 font-serif text-lg text-navy">
                                                {formatDate(appointment.appointment_date)}
                                            </p>
                                            <p className="text-sm text-slate">
                                                {formatTime(appointment.start_time)} -{" "}
                                                {formatTime(appointment.end_time)}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Clock3 className="mt-0.5 h-5 w-5 text-slate" />
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                                Duration
                                            </p>
                                            <p className="mt-1 font-serif text-lg text-navy">
                                                {serviceDuration
                                                    ? `${serviceDuration} minutes`
                                                    : "—"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <FileText className="mt-0.5 h-5 w-5 text-slate" />
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                                Service
                                            </p>
                                            <p className="mt-1 font-serif text-lg text-navy">
                                                {serviceName}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <UserRound className="mt-0.5 h-5 w-5 text-slate" />
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                                Staff
                                            </p>
                                            <p className="mt-1 font-serif text-lg text-navy">
                                                {staffName}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-xl border border-gray/20 bg-white p-4 shadow-sm md:p-7">
                                <div className="flex items-center justify-between">
                                    <h2 className="font-serif text-xl text-navy md:text-2xl">
                                        Customer Information
                                    </h2>
                                </div>

                                <div className="my-4 border-t border-gray/20 md:my-6" />

                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center md:gap-5">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-navy text-lg font-bold text-gold md:h-16 md:w-16">
                                        {customerInitials}
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="font-serif text-lg text-navy md:text-xl">
                                            {customerName}
                                        </h3>

                                        <div className="mt-2 flex flex-col gap-2 text-sm text-slate sm:flex-row sm:gap-5">
                                            {customerPhone !== "—" && (
                                                <span className="flex items-center gap-2">
                                                    <Phone className="h-4 w-4 flex-shrink-0" />
                                                    {customerPhone}
                                                </span>
                                            )}

                                            <span className="flex items-center gap-2">
                                                <Mail className="h-4 w-4 flex-shrink-0" />
                                                <span className="break-all">
                                                    {customerEmail}
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-xl border border-gray/20 bg-white p-4 shadow-sm md:p-7">
                                <h2 className="font-serif text-xl text-navy md:text-2xl">
                                    Notes
                                </h2>

                                <div className="my-4 border-t border-gray/20 md:my-6" />

                                <div className="rounded-lg border border-dashed border-gray/50 bg-beige/40 p-4">
                                    <p className="text-sm italic leading-6 text-slate">
                                        {appointment.notes ||
                                            "No notes have been added for this appointment."}
                                    </p>
                                </div>
                            </div>

                            <div className="rounded-xl border border-gray/20 bg-white p-4 shadow-sm md:p-7">
                                <h2 className="font-serif text-xl text-navy md:text-2xl">
                                    Timeline
                                </h2>

                                <div className="my-4 border-t border-gray/20 md:my-6" />

                                <div className="relative ml-2">
                                    <div className="absolute left-[5px] top-2 h-[calc(100%-20px)] w-px bg-gray/30" />

                                    <div className="space-y-5 md:space-y-7">
                                        <div className="relative flex gap-4 md:gap-5">
                                            <div className="relative z-10 mt-1 h-3 w-3 flex-shrink-0 rounded-full border-2 border-navy bg-white" />
                                            <div>
                                                <p className="font-bold text-navy">
                                                    Appointment Created
                                                </p>
                                                <p className="mt-1 text-sm text-slate">
                                                    {appointment.created_at
                                                        ? new Date(
                                                              appointment.created_at
                                                          ).toLocaleString()
                                                        : "—"}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="relative flex gap-4 md:gap-5">
                                            <div className="relative z-10 mt-1 h-3 w-3 flex-shrink-0 rounded-full border-2 border-navy bg-navy" />
                                            <div>
                                                <p className="font-bold text-navy">
                                                    Last Updated
                                                </p>
                                                <p className="mt-1 text-sm text-slate">
                                                    {appointment.updated_at
                                                        ? new Date(
                                                              appointment.updated_at
                                                          ).toLocaleString()
                                                        : "—"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-4 md:space-y-6">
                            <div className="rounded-xl border border-gray/20 bg-white p-4 shadow-sm md:p-7">
                                <h2 className="font-serif text-xl text-navy md:text-2xl">
                                    Payment Information
                                </h2>

                                <div className="my-4 border-t border-gray/20 md:my-6" />

                                <div className="space-y-4">
                                    <div className="flex justify-between gap-4">
                                        <span className="text-sm text-slate">Method</span>
                                        <span className="text-right text-sm font-bold text-navy">
                                            {payment?.method || "Not set"}
                                        </span>
                                    </div>

                                    <div className="flex justify-between gap-4">
                                        <span className="text-sm text-slate">Status</span>
                                        <span
                                            className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                                                payment?.status === "paid"
                                                    ? "bg-green-50 text-green-700"
                                                    : "bg-gold/20 text-navy"
                                            }`}
                                        >
                                            {payment?.status
                                                ? statusLabel(payment.status)
                                                : "Pending"}
                                        </span>
                                    </div>

                                    <div className="flex justify-between gap-4">
                                        <span className="text-sm text-slate">Amount</span>
                                        <span className="font-serif text-lg text-navy">
                                            {payment?.amount
                                                ? `Rs. ${Number(
                                                      payment.amount
                                                  ).toLocaleString()}`
                                                : "Rs. 0"}
                                        </span>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleCreateReceipt}
                                        className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg bg-navy px-4 py-3 text-sm font-bold text-white transition hover:bg-gold hover:text-navy"
                                    >
                                        <Receipt className="h-4 w-4" />
                                        Create Receipt
                                    </button>
                                </div>
                            </div>

                            <div className="rounded-xl border border-gray/20 bg-white p-4 shadow-sm md:p-7">
                                <h2 className="font-serif text-xl text-navy md:text-2xl">
                                    Details
                                </h2>

                                <div className="my-4 border-t border-gray/20 md:my-6" />

                                <div className="space-y-4">
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                            Appointment ID
                                        </p>
                                        <p className="mt-1 text-sm font-bold text-navy">
                                            #{appointment.id}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                            Created
                                        </p>
                                        <p className="mt-1 text-sm text-slate">
                                            {appointment.created_at
                                                ? new Date(
                                                      appointment.created_at
                                                  ).toLocaleString()
                                                : "—"}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                            Updated
                                        </p>
                                        <p className="mt-1 text-sm text-slate">
                                            {appointment.updated_at
                                                ? new Date(
                                                      appointment.updated_at
                                                  ).toLocaleString()
                                                : "—"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default AppointmentDetails;