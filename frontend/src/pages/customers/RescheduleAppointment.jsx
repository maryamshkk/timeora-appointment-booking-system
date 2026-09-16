import React, { useMemo, useState } from "react";
import {
    ArrowDown,
    Calendar,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    Stethoscope,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

import CustomerSidebar from "../../components/customer/CustomerSidebar";
import CustomerTopbar from "../../components/customer/CustomerTopbar";

function RescheduleAppointment() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [appointment] = useState({
        id: "apt-1",
        companyName: "Shifa Clinic",
        service: { name: "Consultation" },
        staffName: "Dr. Sara Ahmed",
        currentDate: "Fri, 21 Aug 2026",
        currentTime: "04:00 PM",
    });

    // TODO: Replace local appointment state with a real fetch using the route id.

    const [visibleMonth, setVisibleMonth] = useState({
        year: 2026,
        month: 7, // August, 0-indexed
    });

    const [selectedDate, setSelectedDate] = useState(null);

    const [availableSlotsByDate] = useState({
        // Default slots — reused for any date that doesn't have a specific override.
        // TODO: Fetch real availability per date + staff from the API.
        default: [
            { time: "09:00 AM", available: true },
            { time: "09:30 AM", available: true },
            { time: "10:00 AM", available: true },
            { time: "11:00 AM", available: true },
            { time: "01:00 PM", available: true },
            { time: "02:00 PM", available: true },
            { time: "02:30 PM", available: true },
            { time: "03:30 PM", available: true },
            { time: "04:00 PM", available: false },
        ],

        // Date-specific override (optional) — Aug 24 has a different list.
        "2026-08-24": [
            { time: "09:00 AM", available: true },
            { time: "10:00 AM", available: true },
            { time: "11:00 AM", available: true },
            { time: "01:00 PM", available: true },
            { time: "02:30 PM", available: true },
            { time: "04:00 PM", available: false },
        ],
    });

    const [selectedTime, setSelectedTime] = useState(null);

    // ─────────────── Calendar helpers ───────────────

    const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

    const monthName = new Date(
        visibleMonth.year,
        visibleMonth.month,
        1
    ).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    });

    const calendarDays = useMemo(() => {
        const firstDay = new Date(
            visibleMonth.year,
            visibleMonth.month,
            1
        );

        const lastDay = new Date(
            visibleMonth.year,
            visibleMonth.month + 1,
            0
        );

        const previousMonthLastDay = new Date(
            visibleMonth.year,
            visibleMonth.month,
            0
        ).getDate();

        const days = [];

        // Leading days from previous month
        for (let i = firstDay.getDay() - 1; i >= 0; i--) {
            days.push({
                date: new Date(
                    visibleMonth.year,
                    visibleMonth.month - 1,
                    previousMonthLastDay - i
                ),
                isCurrentMonth: false,
            });
        }

        // Current month
        for (let day = 1; day <= lastDay.getDate(); day++) {
            days.push({
                date: new Date(
                    visibleMonth.year,
                    visibleMonth.month,
                    day
                ),
                isCurrentMonth: true,
            });
        }

        // Trailing days
        const remaining = 42 - days.length;
        for (let day = 1; day <= remaining; day++) {
            days.push({
                date: new Date(
                    visibleMonth.year,
                    visibleMonth.month + 1,
                    day
                ),
                isCurrentMonth: false,
            });
        }

        return days;
    }, [visibleMonth]);

    const dateKey = selectedDate
        ? `${selectedDate.getFullYear()}-${String(
              selectedDate.getMonth() + 1
          ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(
              2,
              "0"
          )}`
        : null;

    // Look up specific override first, then fall back to the default list.
    const availableSlots = dateKey
        ? availableSlotsByDate[dateKey] ||
          availableSlotsByDate.default ||
          []
        : [];

    // ─────────────── Handlers ───────────────

    function goToPreviousMonth() {
        setVisibleMonth((current) => {
            if (current.month === 0) {
                return { year: current.year - 1, month: 11 };
            }
            return { ...current, month: current.month - 1 };
        });
    }

    function goToNextMonth() {
        setVisibleMonth((current) => {
            if (current.month === 11) {
                return { year: current.year + 1, month: 0 };
            }
            return { ...current, month: current.month + 1 };
        });
    }

    function handleSelectDate(date) {
        if (!isDateSelectable(date)) {
            return;
        }

        setSelectedDate(date);
        setSelectedTime(null);
    }

    function handleSelectTime(time) {
        const slot = availableSlots.find((item) => item.time === time);
        if (!slot || !slot.available) {
            return;
        }

        setSelectedTime(time);
    }

    function handleConfirmReschedule() {
        if (!selectedDate || !selectedTime) {
            return;
        }

        // TODO: axios PATCH /api/appointments/:id/reschedule with
        // { date: selectedDate.toISOString(), time: selectedTime }.
        // On success, navigate back to the appointment's details page.
        navigate(`/customer/appointments/${id}`);
    }

    function handleCancel() {
        // TODO: Discard any selection and navigate back.
        navigate(`/customer/appointments/${id}`);
    }

    // ─────────────── Utilities ───────────────

    function isSameDate(a, b) {
        return (
            a.getFullYear() === b.getFullYear() &&
            a.getMonth() === b.getMonth() &&
            a.getDate() === b.getDate()
        );
    }

    function isDateInPast(date) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const target = new Date(date);
        target.setHours(0, 0, 0, 0);

        return target < today;
    }

    function isDateSelectable(date) {
        return (
            date.getMonth() === visibleMonth.month &&
            date.getFullYear() === visibleMonth.year &&
            !isDateInPast(date)
        );
    }

    function formatSelectedDate(date) {
        if (!date) {
            return "Select a date";
        }

        return date.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
        });
    }

    function formatShortDate(date) {
        if (!date) {
            return "";
        }

        return date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
        });
    }

    return (
        <div className="min-h-screen bg-beige flex">

            {/* Sidebar */}
            <CustomerSidebar activeItem="My Appointments" />

            {/* Main Area */}
            <div className="flex-1 min-w-0">

                <CustomerTopbar />

                <main className="px-8 py-6">

                    {/* Breadcrumb */}
                    <div className="flex items-center flex-wrap gap-1.5 mb-2">

                        <Link
                            to="/customer/appointments"
                            className="text-xs font-bold uppercase tracking-wide text-slate hover:text-navy transition"
                        >
                            My Appointments
                        </Link>

                        <ChevronRight className="w-3 h-3 text-gray flex-shrink-0" />

                        <Link
                            to={`/customer/appointments/${id}/detail`}
                            className="text-xs font-bold uppercase tracking-wide text-slate hover:text-navy transition"
                        >
                            Appointment Details
                        </Link>

                        <ChevronRight className="w-3 h-3 text-gray flex-shrink-0" />

                        <span className="text-xs font-bold uppercase tracking-wide text-navy">
                            Reschedule Appointment
                        </span>

                    </div>

                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="font-serif text-5xl text-navy mb-1.5">
                            Reschedule Appointment
                        </h1>

                        <p className="text-sm text-slate">
                            Choose a new date and time for your appointment.
                        </p>
                    </div>

                    {/* Context Bar */}
                    <div className="bg-beige/60 rounded-xl p-6 flex justify-between items-center flex-wrap gap-4 mb-6">

                        <div className="flex items-center gap-4">

                            <div className="w-11 h-11 bg-navy rounded-lg flex items-center justify-center flex-shrink-0">
                                <Stethoscope className="w-[18px] h-[18px] text-white" />
                            </div>

                            <div className="min-w-0">
                                <p className="font-serif text-2xl text-navy">
                                    {appointment.companyName}
                                </p>

                                <p className="text-sm text-slate mt-0.5">
                                    {appointment.service.name} ·{" "}
                                    {appointment.staffName}
                                </p>
                            </div>

                        </div>

                        <div className="text-right">
                            <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                Current Schedule
                            </p>

                            <p className="text-base font-bold text-navy mt-0.5">
                                {appointment.currentDate},{" "}
                                {appointment.currentTime}
                            </p>
                        </div>

                    </div>

                    {/* Main Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">

                        {/* Left Column */}
                        <div className="flex flex-col gap-6">

                            {/* Card — Choose a New Date */}
                            <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-7">

                                {/* Header */}
                                <div className="flex justify-between items-center gap-4 mb-5 flex-wrap">

                                    <h2 className="font-serif text-2xl text-navy">
                                        Choose a New Date
                                    </h2>

                                    <div className="flex items-center gap-3">

                                        <button
                                            type="button"
                                            onClick={goToPreviousMonth}
                                            className="w-8 h-8 rounded-full flex items-center justify-center text-slate hover:bg-beige/40 hover:text-navy transition"
                                            aria-label="Previous month"
                                        >
                                            <ChevronLeft className="w-4 h-4" />
                                        </button>

                                        <span className="text-sm font-bold uppercase tracking-wide text-navy whitespace-nowrap">
                                            {monthName}
                                        </span>

                                        <button
                                            type="button"
                                            onClick={goToNextMonth}
                                            className="w-8 h-8 rounded-full flex items-center justify-center text-slate hover:bg-beige/40 hover:text-navy transition"
                                            aria-label="Next month"
                                        >
                                            <ChevronRight className="w-4 h-4" />
                                        </button>

                                    </div>

                                </div>

                                {/* Weekdays */}
                                <div className="grid grid-cols-7 text-center text-xs font-bold uppercase tracking-wide text-slate mb-3">
                                    {weekdays.map((day) => (
                                        <span key={day}>{day}</span>
                                    ))}
                                </div>

                                {/* Dates */}
                                <div className="grid grid-cols-7 gap-1 text-center">

                                    {calendarDays.map((cell, index) => {
                                        const date = cell.date;

                                        const isSelected =
                                            selectedDate &&
                                            isSameDate(date, selectedDate);

                                        const isSelectable =
                                            isDateSelectable(date);

                                        // The appointment's current date — mock check.
                                        // TODO: derive from appointment.currentDate once it's a real Date.
                                        const isCurrentBooking =
                                            date.getFullYear() === 2026 &&
                                            date.getMonth() === 7 &&
                                            date.getDate() === 21;

                                        return (
                                            <button
                                                type="button"
                                                key={`${date.getTime()}-${index}`}
                                                disabled={!isSelectable}
                                                onClick={() =>
                                                    handleSelectDate(date)
                                                }
                                                className={`
                                                    relative
                                                    w-10
                                                    h-10
                                                    mx-auto
                                                    flex
                                                    items-center
                                                    justify-center
                                                    rounded-lg
                                                    text-sm
                                                    transition
                                                    ${
                                                        isSelected
                                                            ? "bg-navy text-white font-bold"
                                                            : isSelectable
                                                            ? "text-navy hover:bg-beige/40 cursor-pointer"
                                                            : "text-gray/30 cursor-default"
                                                    }
                                                    ${
                                                        isCurrentBooking &&
                                                        !isSelected
                                                            ? "border border-dashed border-gray/40 bg-gray/5"
                                                            : ""
                                                    }
                                                `}
                                            >
                                                {date.getDate()}

                                                {isCurrentBooking &&
                                                    !isSelected && (
                                                        <span className="absolute bottom-1 w-1 h-1 rounded-full bg-slate" />
                                                    )}

                                            </button>
                                        );
                                    })}

                                </div>

                            </div>

                            {/* Card — Available Times */}
                            <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-7">

                                {/* Header */}
                                <div className="flex justify-between items-center gap-4 mb-5 flex-wrap">

                                    <h2 className="font-serif text-2xl text-navy">
                                        Available Times
                                    </h2>

                                    <p className="text-sm text-slate">
                                        {formatSelectedDate(selectedDate)}
                                    </p>

                                </div>

                                {/* Slots */}
                                {availableSlots.length > 0 ? (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">

                                        {availableSlots.map((slot) => {
                                            const isSelected =
                                                selectedTime === slot.time;

                                            return (
                                                <button
                                                    type="button"
                                                    key={slot.time}
                                                    disabled={!slot.available}
                                                    onClick={() =>
                                                        handleSelectTime(
                                                            slot.time
                                                        )
                                                    }
                                                    className={`
                                                        py-3
                                                        px-4
                                                        rounded-lg
                                                        text-sm
                                                        font-bold
                                                        text-center
                                                        transition
                                                        ${
                                                            !slot.available
                                                                ? "text-gray/40 border border-gray/20 cursor-not-allowed"
                                                                : isSelected
                                                                ? "border-2 border-navy bg-white text-navy flex items-center justify-center gap-2"
                                                                : "border border-gray text-navy hover:border-navy cursor-pointer"
                                                        }
                                                    `}
                                                >
                                                    {isSelected && (
                                                        <CheckCircle2 className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                                                    )}

                                                    {slot.time}

                                                </button>
                                            );
                                        })}

                                    </div>
                                ) : (
                                    <div className="py-10 text-center">
                                        <Calendar className="w-7 h-7 text-gray mx-auto mb-3" />

                                        <p className="text-sm text-slate">
                                            {selectedDate
                                                ? "No available slots for this date."
                                                : "Select a date to see available times."}
                                        </p>
                                    </div>
                                )}

                            </div>

                        </div>

                        {/* Right Column */}
                        <aside>
                            <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6 lg:sticky lg:top-6">

                                <h2 className="font-serif text-2xl text-navy">
                                    Review Your Changes
                                </h2>

                                <div className="border-b border-gray/20 my-5"></div>

                                {/* Current */}
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-gray" />

                                    <span className="text-xs font-bold uppercase tracking-wide text-slate">
                                        Current
                                    </span>
                                </div>

                                <p className="text-sm text-slate line-through mb-3">
                                    {appointment.currentDate},{" "}
                                    {appointment.currentTime}
                                </p>

                                {/* Arrow */}
                                <div className="flex justify-center mb-3">
                                    <ArrowDown className="w-4 h-4 text-gray" />
                                </div>

                                {/* New */}
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-gold" />

                                    <span className="text-xs font-bold uppercase tracking-wide text-navy">
                                        New
                                    </span>
                                </div>

                                {selectedDate && selectedTime ? (
                                    <p className="text-base font-bold text-navy">
                                        {formatShortDate(selectedDate)},{" "}
                                        {selectedTime}
                                    </p>
                                ) : (
                                    <p className="text-sm text-gray italic">
                                        Select a new time
                                    </p>
                                )}

                                <div className="border-b border-gray/20 my-4"></div>

                                {/* Confirm */}
                                <button
                                    type="button"
                                    onClick={handleConfirmReschedule}
                                    disabled={
                                        !selectedDate || !selectedTime
                                    }
                                    className="
                                        w-full
                                        bg-navy
                                        text-white
                                        uppercase
                                        tracking-wide
                                        font-bold
                                        text-sm
                                        py-3.5
                                        rounded-lg
                                        hover:bg-gold
                                        hover:text-navy
                                        transition
                                        disabled:opacity-40
                                        disabled:cursor-not-allowed
                                    "
                                >
                                    Confirm Reschedule
                                </button>

                                {/* Cancel */}
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="
                                        block
                                        mx-auto
                                        mt-3
                                        text-sm
                                        font-bold
                                        text-slate
                                        hover:text-navy
                                        transition
                                        cursor-pointer
                                    "
                                >
                                    Cancel
                                </button>

                            </div>
                        </aside>

                    </div>

                </main>

            </div>

        </div>
    );
}

export default RescheduleAppointment;