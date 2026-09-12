import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    ChevronRight,
    ChevronLeft,
    CalendarDays,
    Clock3,
    Save,
    UserRound,
    X,
} from "lucide-react";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";

const mockAppointmentData = {
    appointmentId: "APT-00942",
    customer: "Ayesha Khan",
    service: "Consultation",
    staff: "Dr. Sara Ahmed",
    date: "25 Aug 2026",
    startTime: "10:00 AM",
    endTime: "11:00 AM",
    status: "Confirmed",
    payment: "Cash on Reception",
};

function RescheduleAppointment() {
    const { appointmentId } = useParams();
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [appointmentData, setAppointmentData] = useState(
        mockAppointmentData
    );

    const [visibleMonth, setVisibleMonth] = useState(
        new Date(2026, 7, 1)
    );

    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedSlot, setSelectedSlot] = useState(null);

    const originalDate = new Date(2026, 7, 25);
    const originalSlot = "10:00";

    const isRescheduleValid =
        selectedDate &&
        selectedSlot &&
        (formatDateKey(selectedDate) !== formatDateKey(originalDate) ||
            selectedSlot !== originalSlot);

    // TODO: axios GET /api/company/appointments/:appointmentId

    function formatDateKey(date) {
        return `${date.getFullYear()}-${String(
            date.getMonth() + 1
        ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    }

    function formatDateLabel(date) {
        return date.toLocaleDateString("en-US", {
            weekday: "short",
            day: "numeric",
            month: "short",
        });
    }

    function getDateStrip() {
        const dates = [];
        const daysInMonth = new Date(
            visibleMonth.getFullYear(),
            visibleMonth.getMonth() + 1,
            0
        ).getDate();

        for (let day = 1; day <= Math.min(daysInMonth, 5); day++) {
            dates.push(
                new Date(
                    visibleMonth.getFullYear(),
                    visibleMonth.getMonth(),
                    day
                )
            );
        }

        return dates;
    }

    function generateHourlySlots(startHour, endHour, unavailableSlots = []) {
        const slots = [];

        for (let hour = startHour; hour < endHour; hour++) {
            const start = new Date(2026, 7, 25, hour, 0);
            const end = new Date(2026, 7, 25, hour + 1, 0);

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
                unavailable: unavailableSlots.includes(value),
            });
        }

        return slots;
    }

    function formatSlotTime(slotValue) {
        if (!slotValue) {
            return "";
        }

        const [hour] = slotValue.split(":");
        const hourNumber = Number(hour);

        const start = new Date(2026, 7, 25, hourNumber, 0);
        const end = new Date(2026, 7, 25, hourNumber + 1, 0);

        return `${start.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
        })} – ${end.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
        })}`;
    }

    function handlePrevMonth() {
        setVisibleMonth(
            new Date(
                visibleMonth.getFullYear(),
                visibleMonth.getMonth() - 1,
                1
            )
        );
        setSelectedDate(null);
        setSelectedSlot(null);
    }

    function handleNextMonth() {
        setVisibleMonth(
            new Date(
                visibleMonth.getFullYear(),
                visibleMonth.getMonth() + 1,
                1
            )
        );
        setSelectedDate(null);
        setSelectedSlot(null);
    }

    function handleToday() {
        const today = new Date();

        setVisibleMonth(
            new Date(today.getFullYear(), today.getMonth(), 1)
        );

        setSelectedDate(today);
        setSelectedSlot(null);
    }

    function handleDateSelect(date) {
        setSelectedDate(date);
        setSelectedSlot(null);
    }

    function handleConfirm() {
        if (!isRescheduleValid) {
            return;
        }

        const newDate = formatDateKey(selectedDate);
        const newSlot = selectedSlot;

        // TODO: axios PATCH /api/company/appointments/:id/reschedule
        // await api.patch(`/company/appointments/${appointmentId}/reschedule`, {
        //     newDate,
        //     newSlot,
        // });

        navigate(`/company/appointments/${appointmentId}`);
    }

    function handleCancel() {
        navigate(`/company/appointments/${appointmentId}`);
    }

    return (
        <div className="flex min-h-screen bg-beige">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block lg:flex-shrink-0">
                <Sidebar
                    companyName="Shifa Clinic"
                    activeItem="Appointments"
                    ctaLabel="Book Appointment"
                    ctaPath="/company/appointments/new"
                />
            </div>

            {/* Mobile Sidebar — overlay */}
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
                    {/* Breadcrumb */}
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

                        <span className="font-bold text-navy">
                            Reschedule
                        </span>
                    </div>

                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="font-serif text-2xl text-navy sm:text-3xl lg:text-4xl">
                            Reschedule Appointment
                        </h1>

                        <p className="mt-1 text-sm text-slate">
                            Choose a new date and time for this appointment.
                        </p>
                    </div>

                    {/* Main Grid */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

                        {/* LEFT COLUMN */}
                        <div className="space-y-5 lg:col-span-2">

                            {/* Card A — Current Appointment */}
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
                                        {appointmentData.status}
                                    </span>
                                </div>

                                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                                    {/* Customer */}
                                    <div>
                                        <div className="mb-2 flex items-center gap-2">
                                            <UserRound className="h-4 w-4 text-gold" />

                                            <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                                Customer
                                            </p>
                                        </div>

                                        <p className="font-serif text-base text-navy">
                                            {appointmentData.customer}
                                        </p>
                                    </div>

                                    {/* Service */}
                                    <div>
                                        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate">
                                            Service
                                        </p>

                                        <p className="font-serif text-base text-navy">
                                            {appointmentData.service}
                                        </p>
                                    </div>

                                    {/* Staff */}
                                    <div>
                                        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate">
                                            Staff
                                        </p>

                                        <p className="font-serif text-base text-navy">
                                            {appointmentData.staff}
                                        </p>
                                    </div>

                                    {/* Date & Time */}
                                    <div>
                                        <div className="mb-2 flex items-center gap-2">
                                            <CalendarDays className="h-4 w-4 text-gold" />

                                            <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                                Date & Time
                                            </p>
                                        </div>

                                        <p className="font-serif text-base text-navy">
                                            {appointmentData.date}
                                        </p>

                                        <div className="mt-1 flex items-center gap-1.5 text-sm text-slate">
                                            <Clock3 className="h-3.5 w-3.5" />

                                            <span>
                                                {appointmentData.startTime} – {appointmentData.endTime}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Payment */}
                                    <div>
                                        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate">
                                            Payment
                                        </p>

                                        <p className="text-sm font-bold text-navy">
                                            {appointmentData.payment}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Card B — Select New Date + Slots */}
                            <div className="rounded-xl border border-gray/20 bg-white p-6 shadow-sm">
                                {/* Header */}
                                <div className="mb-6">
                                    <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                        Select New Date
                                    </p>

                                    <h2 className="mt-1 font-serif text-xl text-navy">
                                        Choose an available date
                                    </h2>
                                </div>

                                {/* Month Navigator */}
                                <div className="flex items-center justify-between border-b border-gray/20 pb-5">
                                    <button
                                        type="button"
                                        onClick={handlePrevMonth}
                                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray/30 text-slate transition hover:border-navy hover:text-navy"
                                        aria-label="Previous month"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </button>

                                    <div className="text-center">
                                        <p className="font-serif text-lg font-bold uppercase tracking-wide text-navy">
                                            {visibleMonth.toLocaleDateString("en-US", {
                                                month: "long",
                                                year: "numeric",
                                            })}
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleNextMonth}
                                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray/30 text-slate transition hover:border-navy hover:text-navy"
                                        aria-label="Next month"
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </button>
                                </div>

                                {/* Today */}
                                <div className="flex justify-end py-4">
                                    <button
                                        type="button"
                                        onClick={handleToday}
                                        className="text-xs font-bold uppercase tracking-wide text-navy hover:text-gold"
                                    >
                                        Today
                                    </button>
                                </div>

                                {/* Date Strip */}
                                <div className="flex gap-3 overflow-x-auto pb-2">
                                    {getDateStrip().map(function (date) {
                                        const dateKey = formatDateKey(date);
                                        const originalDateKey = formatDateKey(originalDate);
                                        const isCurrentDate = dateKey === originalDateKey;

                                        const isSelected =
                                            selectedDate &&
                                            formatDateKey(selectedDate) === dateKey;

                                        return (
                                            <button
                                                key={dateKey}
                                                type="button"
                                                onClick={function () {
                                                    handleDateSelect(date);
                                                }}
                                                className={`
                                                    min-w-[100px]
                                                    rounded-xl
                                                    border
                                                    px-4
                                                    py-4
                                                    text-center
                                                    transition
                                                    ${
                                                        isSelected
                                                            ? "border-navy bg-navy text-white"
                                                            : isCurrentDate
                                                            ? "border-gray/40 bg-beige text-slate"
                                                            : "border-gray/30 bg-white text-navy hover:border-navy"
                                                    }
                                                `}
                                            >
                                                <p className="text-xs font-bold uppercase tracking-wide opacity-70">
                                                    {date.toLocaleDateString("en-US", {
                                                        weekday: "short",
                                                    })}
                                                </p>

                                                <p className="mt-1 font-serif text-xl">
                                                    {date.getDate()}
                                                </p>

                                                <p className="mt-1 text-xs">
                                                    {date.toLocaleDateString("en-US", {
                                                        month: "short",
                                                    })}
                                                </p>

                                                {isCurrentDate && (
                                                    <p className="mt-2 text-[10px] font-bold uppercase tracking-wide">
                                                        Current
                                                    </p>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Selected Date */}
                                {selectedDate && (
                                    <div className="mt-5 flex items-center gap-2 rounded-lg bg-beige px-4 py-3">
                                        <CalendarDays className="h-4 w-4 text-gold" />

                                        <p className="text-sm text-slate">
                                            Selected:
                                            <span className="ml-1 font-bold text-navy">
                                                {formatDateLabel(selectedDate)}
                                            </span>
                                        </p>
                                    </div>
                                )}

                                {/* Available Slots */}
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
                                        {generateHourlySlots(
                                            9,
                                            17,
                                            ["10:00"]
                                        ).map(function (slot) {
                                            const isSelected = selectedSlot === slot.value;

                                            return (
                                                <button
                                                    key={slot.value}
                                                    type="button"
                                                    disabled={slot.unavailable}
                                                    onClick={function () {
                                                        setSelectedSlot(slot.value);
                                                    }}
                                                    className={`
                                                        rounded-lg
                                                        border
                                                        px-3
                                                        py-3
                                                        text-sm
                                                        font-bold
                                                        transition
                                                        ${
                                                            slot.unavailable
                                                                ? "cursor-not-allowed border-gray/20 bg-gray/10 text-gray line-through"
                                                                : isSelected
                                                                ? "border-navy bg-navy text-white"
                                                                : "border-gray/30 bg-white text-navy hover:border-navy hover:bg-beige"
                                                        }
                                                    `}
                                                >
                                                    {slot.label}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT COLUMN — Sticky Summary */}
                        <div className="self-start lg:sticky lg:top-6">
                            <div className="rounded-xl border border-gray/20 bg-white p-6 shadow-sm">
                                {/* Header */}
                                <div className="mb-6">
                                    <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                        Reschedule Summary
                                    </p>

                                    <h2 className="mt-1 font-serif text-xl text-navy">
                                        Review Changes
                                    </h2>
                                </div>

                                {/* Current */}
                                <div className="rounded-lg bg-beige p-4">
                                    <p className="text-[11px] font-bold uppercase tracking-wide text-slate">
                                        Current
                                    </p>

                                    <p className="mt-2 font-serif text-base text-navy">
                                        {appointmentData.date}
                                    </p>

                                    <p className="mt-1 text-sm text-slate">
                                        {appointmentData.startTime} – {appointmentData.endTime}
                                    </p>
                                </div>

                                {/* Arrow */}
                                <div className="flex justify-center py-3">
                                    <ChevronRight className="h-4 w-4 rotate-90 text-gray" />
                                </div>

                                {/* New */}
                                <div className="rounded-lg border border-gray/30 p-4">
                                    <p className="text-[11px] font-bold uppercase tracking-wide text-slate">
                                        New
                                    </p>

                                    {selectedDate && selectedSlot ? (
                                        <>
                                            <p className="mt-2 font-serif text-base text-navy">
                                                {selectedDate.toLocaleDateString("en-US", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric",
                                                })}
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

                                {/* Appointment Details */}
                                <div className="my-6 border-t border-gray/20 pt-5">
                                    <div className="mb-4">
                                        <p className="text-[11px] font-bold uppercase tracking-wide text-slate">
                                            Service
                                        </p>

                                        <p className="mt-1 text-sm font-bold text-navy">
                                            Consultation (1 hr)
                                        </p>
                                    </div>

                                    <div className="mb-4">
                                        <p className="text-[11px] font-bold uppercase tracking-wide text-slate">
                                            Staff
                                        </p>

                                        <p className="mt-1 text-sm font-bold text-navy">
                                            Dr. Sara Ahmed
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-[11px] font-bold uppercase tracking-wide text-slate">
                                            Payment
                                        </p>

                                        <p className="mt-1 text-sm font-bold text-navy">
                                            Cash on Reception
                                        </p>
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex flex-col gap-3">
                                    <button
                                        type="button"
                                        disabled={!isRescheduleValid}
                                        onClick={handleConfirm}
                                        className="
                                            w-full
                                            rounded-lg
                                            bg-navy
                                            px-4
                                            py-3
                                            text-sm
                                            font-bold
                                            text-white
                                            transition
                                            hover:bg-gold
                                            hover:text-navy
                                            disabled:cursor-not-allowed
                                            disabled:bg-gray/30
                                            disabled:text-slate
                                        "
                                    >
                                        Confirm Reschedule
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="
                                            w-full
                                            rounded-lg
                                            border
                                            border-gray/30
                                            px-4
                                            py-3
                                            text-sm
                                            font-bold
                                            text-slate
                                            transition
                                            hover:border-navy
                                            hover:text-navy
                                        "
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