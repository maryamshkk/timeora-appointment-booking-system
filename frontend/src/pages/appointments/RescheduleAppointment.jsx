import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    ChevronRight,
    ChevronLeft,
    CalendarDays,
    Clock3,
    UserRound,
    Loader2,
    AlertCircle,
} from "lucide-react";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import {
    useAppointment,
    useRescheduleAppointment,
} from "../../hooks/company/useAppointments";

function statusLabel(status) {
    if (!status) return "";
    return status.charAt(0).toUpperCase() + status.slice(1);
}

function formatTime(timeString) {
    if (!timeString) return "";
    const [hour, minute] = timeString.split(":");
    const hourNumber = Number(hour);
    const period = hourNumber >= 12 ? "PM" : "AM";
    const displayHour = hourNumber % 12 || 12;
    return `${String(displayHour).padStart(2, "0")}:${minute} ${period}`;
}

function RescheduleAppointment() {
    const { appointmentId } = useParams();
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    const [selectedSlot, setSelectedSlot] = useState("");
    const [localError, setLocalError] = useState("");

    const {
        data: response,
        isLoading,
        isError,
        error,
    } = useAppointment(appointmentId);

    const rescheduleMutation = useRescheduleAppointment();

    const appointment = response?.data;

    const originalDate = appointment?.appointment_date || "";
    const originalTime = appointment?.start_time?.slice(0, 5) || "";

    const isRescheduleValid =
        selectedDate &&
        selectedSlot &&
        (selectedDate !== originalDate || selectedSlot !== originalTime);

    function generateHourlySlots(startHour, endHour) {
        const slots = [];

        for (let hour = startHour; hour < endHour; hour++) {
            const start = new Date(2026, 0, 1, hour, 0);
            const end = new Date(2026, 0, 1, hour + 1, 0);

            const startTime = start.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
            });

            const endTime = end.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
            });

            const value = `${String(hour).padStart(2, "0")}:00`;

            slots.push({
                value,
                label: `${startTime} – ${endTime}`,
                unavailable: value === originalTime,
            });
        }

        return slots;
    }

    function formatSlotTime(slotValue) {
        if (!slotValue) return "";

        const [hour] = slotValue.split(":");
        const hourNumber = Number(hour);

        const start = new Date(2026, 0, 1, hourNumber, 0);
        const end = new Date(2026, 0, 1, hourNumber + 1, 0);

        return `${start.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
        })} – ${end.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
        })}`;
    }

    function handleConfirm() {
        setLocalError("");

        if (!isRescheduleValid) {
            setLocalError("Please select a new date and time.");
            return;
        }

        rescheduleMutation.mutate(
            {
                id: appointmentId,
                appointmentDate: selectedDate,
                startTime: selectedSlot,
            },
            {
                onSuccess: () => {
                    navigate(`/company/appointments/${appointmentId}`);
                },
                onError: (err) => {
                    setLocalError(
                        err?.response?.data?.message ||
                            "Failed to reschedule appointment."
                    );
                },
            }
        );
    }

    function handleCancel() {
        navigate(`/company/appointments/${appointmentId}`);
    }

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
                        <span className="font-serif text-sm">Loading...</span>
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

    const customerName = appointment.customer?.name || "—";
    const staffName = appointment.staff
        ? `${appointment.staff.first_name || ""} ${
              appointment.staff.last_name || ""
          }`.trim()
        : "—";
    const serviceName = appointment.service?.name || "—";

    const apiErrorMessage =
        rescheduleMutation.error?.response?.data?.message ||
        rescheduleMutation.error?.message ||
        "";

    const displayError = localError || apiErrorMessage;

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

                <main className="flex-1 bg-beige px-3 py-4 sm:px-4 sm:py-5 md:px-6 lg:px-8 lg:py-6">
                    <div className="mb-4 flex items-center gap-2 text-sm">
                        <Link
                            to="/company/appointments"
                            className="text-slate transition hover:text-navy"
                        >
                            Appointments
                        </Link>

                        <ChevronRight className="h-4 w-4 text-gray" />

                        <Link
                            to={`/company/appointments/${appointmentId}`}
                            className="text-slate transition hover:text-navy"
                        >
                            Appointment Details
                        </Link>

                        <ChevronRight className="h-4 w-4 text-gray" />

                        <span className="font-bold text-navy">Reschedule</span>
                    </div>

                    <div className="mb-6">
                        <h1 className="font-serif text-2xl text-navy sm:text-3xl lg:text-4xl">
                            Reschedule Appointment
                        </h1>

                        <p className="mt-1 text-sm text-slate">
                            Choose a new date and time for this appointment.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                        <div className="space-y-5 lg:col-span-2">
                            <div className="rounded-xl border border-gray/20 bg-white p-6 shadow-sm">
                                <div className="mb-6 flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                            Current Appointment
                                        </p>

                                        <h2 className="mt-1 font-serif text-xl text-navy">
                                            Appointment Details
                                        </h2>
                                    </div>

                                    <span className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700">
                                        {statusLabel(appointment.status)}
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                    <div>
                                        <div className="mb-2 flex items-center gap-2">
                                            <UserRound className="h-4 w-4 text-gold" />

                                            <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                                Customer
                                            </p>
                                        </div>

                                        <p className="font-serif text-base text-navy">
                                            {customerName}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate">
                                            Service
                                        </p>

                                        <p className="font-serif text-base text-navy">
                                            {serviceName}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate">
                                            Staff
                                        </p>

                                        <p className="font-serif text-base text-navy">
                                            {staffName}
                                        </p>
                                    </div>

                                    <div>
                                        <div className="mb-2 flex items-center gap-2">
                                            <CalendarDays className="h-4 w-4 text-gold" />

                                            <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                                Date & Time
                                            </p>
                                        </div>

                                        <p className="font-serif text-base text-navy">
                                            {appointment.appointment_date}
                                        </p>

                                        <div className="mt-1 flex items-center gap-1.5 text-sm text-slate">
                                            <Clock3 className="h-3.5 w-3.5" />

                                            <span>
                                                {formatTime(appointment.start_time)} –{" "}
                                                {formatTime(appointment.end_time)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-xl border border-gray/20 bg-white p-6 shadow-sm">
                                <div className="mb-6">
                                    <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                        Select New Date
                                    </p>

                                    <h2 className="mt-1 font-serif text-xl text-navy">
                                        Choose an available date
                                    </h2>
                                </div>

                                <div className="mb-4">
                                    <label className="mb-2 block text-xs font-bold uppercase tracking-wide text-navy">
                                        Date
                                    </label>

                                    <input
                                        type="date"
                                        value={selectedDate}
                                        min={new Date().toISOString().slice(0, 10)}
                                        onChange={(event) => {
                                            setSelectedDate(event.target.value);
                                            setSelectedSlot("");
                                        }}
                                        className="w-full rounded-lg border border-gray/30 bg-white px-4 py-3 text-sm text-navy outline-none focus:border-navy focus:ring-2 focus:ring-gold"
                                    />
                                </div>

                                <div className="mt-6 border-t border-gray/20 pt-6">
                                    <div className="mb-4 flex items-center justify-between">
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                                Available Slots
                                            </p>

                                            <p className="mt-1 font-serif text-base text-navy">
                                                1 Hour
                                            </p>
                                        </div>

                                        <Clock3 className="h-5 w-5 text-gold" />
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                                        {generateHourlySlots(9, 17).map((slot) => {
                                            const isSelected = selectedSlot === slot.value;

                                            return (
                                                <button
                                                    key={slot.value}
                                                    type="button"
                                                    disabled={slot.unavailable}
                                                    onClick={() => setSelectedSlot(slot.value)}
                                                    className={`rounded-lg border px-3 py-3 text-sm font-bold transition ${
                                                        slot.unavailable
                                                            ? "cursor-not-allowed border-gray/20 bg-gray/10 text-gray line-through"
                                                            : isSelected
                                                            ? "border-navy bg-navy text-white"
                                                            : "border-gray/30 bg-white text-navy hover:border-navy hover:bg-beige"
                                                    }`}
                                                >
                                                    {slot.label}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="self-start lg:sticky lg:top-6">
                            <div className="rounded-xl border border-gray/20 bg-white p-6 shadow-sm">
                                <div className="mb-6">
                                    <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                        Reschedule Summary
                                    </p>

                                    <h2 className="mt-1 font-serif text-xl text-navy">
                                        Review Changes
                                    </h2>
                                </div>

                                <div className="rounded-lg bg-beige p-4">
                                    <p className="text-[11px] font-bold uppercase tracking-wide text-slate">
                                        Current
                                    </p>

                                    <p className="mt-2 font-serif text-base text-navy">
                                        {appointment.appointment_date}
                                    </p>

                                    <p className="mt-1 text-sm text-slate">
                                        {formatTime(appointment.start_time)} –{" "}
                                        {formatTime(appointment.end_time)}
                                    </p>
                                </div>

                                <div className="flex justify-center py-3">
                                    <ChevronRight className="h-4 w-4 rotate-90 text-gray" />
                                </div>

                                <div className="rounded-lg border border-gray/30 p-4">
                                    <p className="text-[11px] font-bold uppercase tracking-wide text-slate">
                                        New
                                    </p>

                                    {selectedDate && selectedSlot ? (
                                        <>
                                            <p className="mt-2 font-serif text-base text-navy">
                                                {selectedDate}
                                            </p>

                                            <p className="mt-1 text-sm text-slate">
                                                {formatSlotTime(selectedSlot)}
                                            </p>
                                        </>
                                    ) : (
                                        <p className="mt-2 font-serif text-xl text-gray">
                                            —
                                        </p>
                                    )}
                                </div>

                                {displayError && (
                                    <div className="mt-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2">
                                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                                        <p className="text-xs text-red-700">
                                            {displayError}
                                        </p>
                                    </div>
                                )}

                                <div className="mt-6 flex flex-col gap-3">
                                    <button
                                        type="button"
                                        disabled={!isRescheduleValid || rescheduleMutation.isPending}
                                        onClick={handleConfirm}
                                        className="w-full rounded-lg bg-navy px-4 py-3 text-sm font-bold text-white transition hover:bg-gold hover:text-navy disabled:cursor-not-allowed disabled:bg-gray/30 disabled:text-slate"
                                    >
                                        {rescheduleMutation.isPending
                                            ? "Rescheduling..."
                                            : "Confirm Reschedule"}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="w-full rounded-lg border border-gray/30 px-4 py-3 text-sm font-bold text-slate transition hover:border-navy hover:text-navy"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default RescheduleAppointment;