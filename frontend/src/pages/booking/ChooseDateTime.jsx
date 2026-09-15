import React, { useMemo, useState } from "react";
import {
    ArrowLeft,
    ArrowRight,
    Building2,
    Calendar,
    ChevronLeft,
    ChevronRight,
    Clock,
    Stethoscope,
    User,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import CustomerSidebar from "../../components/customer/CustomerSidebar";
import CustomerTopbar from "../../components/customer/CustomerTopbar";
import BookingBreadcrumbStepper from "../../components/booking/BookingBreadcrumbStepper";
import BookingContextBar from "../../components/booking/BookingContextBar";

function ChooseDateTime() {
    const navigate = useNavigate();
    const location = useLocation();

    const bookingState = location.state || {};

    const [selectedCompany] = useState(
        bookingState.company || {
            name: "Shifa Clinic",
        }
    );

    const [selectedService] = useState(
        bookingState.service || {
            name: "Consultation",
            durationMinutes: 30,
            price: 2500,
        }
    );

    const [selectedStaff] = useState(
        bookingState.staff || {
            name: "Dr. Sara Ahmed",
        }
    );

    const [visibleMonth, setVisibleMonth] = useState({
        year: 2026,
        month: 7,
    });

    const [selectedDate, setSelectedDate] = useState(
        new Date(2026, 7, 21)
    );

    const [availableSlotsByDate] = useState({
        "2026-08-21": [
            "09:00 AM",
            "09:30 AM",
            "10:00 AM",
            "10:30 AM",
            "11:30 AM",
            "02:00 PM",
            "03:30 PM",
            "04:00 PM",
        ],
    });

    const [selectedTime, setSelectedTime] = useState(null);

    const weekdays = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

    const monthName = new Date(
        visibleMonth.year,
        visibleMonth.month,
        1
    ).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    });

    const dateKey = selectedDate
        ? `${selectedDate.getFullYear()}-${String(
              selectedDate.getMonth() + 1
          ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(
              2,
              "0"
          )}`
        : null;

    const availableSlots = dateKey
        ? availableSlotsByDate[dateKey] || []
        : [];

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

        // Current month days
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
        const remainingDays = 42 - days.length;

        for (let day = 1; day <= remainingDays; day++) {
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

    function goToPreviousMonth() {
        setVisibleMonth((current) => {
            if (current.month === 0) {
                return {
                    year: current.year - 1,
                    month: 11,
                };
            }

            return {
                ...current,
                month: current.month - 1,
            };
        });
    }

    function goToNextMonth() {
        setVisibleMonth((current) => {
            if (current.month === 11) {
                return {
                    year: current.year + 1,
                    month: 0,
                };
            }

            return {
                ...current,
                month: current.month + 1,
            };
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
        setSelectedTime(time);
    }

    function handleContinue() {
        navigate("/customer/booking/summary", {
            state: {
                company: selectedCompany,
                service: selectedService,
                staff: selectedStaff,
                date: selectedDate,
                time: selectedTime,
            },
        });
    }

    function handleBackToStaff() {
        navigate("/customer/booking/staff", {
            state: {
                company: selectedCompany,
                service: selectedService,
                staff: selectedStaff,
            },
        });
    }

    function isSameDate(firstDate, secondDate) {
        return (
            firstDate.getFullYear() === secondDate.getFullYear() &&
            firstDate.getMonth() === secondDate.getMonth() &&
            firstDate.getDate() === secondDate.getDate()
        );
    }

    function isDateInPast(date) {
        const today = new Date();

        today.setHours(0, 0, 0, 0);

        const comparisonDate = new Date(date);
        comparisonDate.setHours(0, 0, 0, 0);

        return comparisonDate < today;
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
            return "Not selected yet";
        }

        return date.toLocaleDateString("en-US", {
            weekday: "long",
            month: "short",
            day: "numeric",
        });
    }

    return (
        <div className="min-h-screen bg-beige flex">

            {/* Sidebar */}
            <CustomerSidebar activeItem="Browse Companies" />

            <div className="flex-1 min-w-0">

                {/* Topbar */}
                <CustomerTopbar />

                {/* Main Content */}
                <main className="px-8 py-6">

                    {/* Stepper */}
                    <BookingBreadcrumbStepper
                        currentStep="date-time"
                        companyName={selectedCompany.name}
                    />

                    {/* Back */}
                    <button
                        type="button"
                        onClick={handleBackToStaff}
                        className="
                            flex
                            items-center
                            gap-2
                            text-sm
                            font-bold
                            text-slate
                            hover:text-navy
                            transition
                            mb-4
                        "
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        Back to Staff
                    </button>

                    {/* Booking Context */}
                    <BookingContextBar
                        items={[
                            {
                                icon: Building2,
                                label: selectedCompany.name,
                            },
                            {
                                icon: Stethoscope,
                                label: selectedService.name,
                            },
                            {
                                icon: User,
                                label: selectedStaff.name,
                            },
                            {
                                icon: Clock,
                                label: `${selectedService.durationMinutes} minutes`,
                            },
                        ]}
                    />

                    {/* Header */}
                    <div className="mb-6">

                        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-navy mb-1.5">
                            Choose a Date & Time
                        </h1>

                        <p className="text-sm text-slate">
                            Select an available time for your{" "}
                            {selectedService.name.toLowerCase()} with{" "}
                            {selectedStaff.name}.
                        </p>

                    </div>

                    {/* Main Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">

                        {/* Calendar + Time Slots */}
                        <div className="bg-white rounded-xl border border-gray/20 shadow-sm overflow-hidden">

                            <div className="grid grid-cols-1 md:grid-cols-2">

                                {/* Calendar */}
                                <div className="p-6 md:border-r border-gray/20">

                                    {/* Month Navigation */}
                                    <div className="flex items-center justify-between mb-5">

                                        <button
                                            type="button"
                                            onClick={goToPreviousMonth}
                                            className="
                                                w-8
                                                h-8
                                                rounded-full
                                                flex
                                                items-center
                                                justify-center
                                                text-slate
                                                hover:bg-beige/40
                                                hover:text-navy
                                                transition
                                            "
                                        >
                                            <ChevronLeft className="w-4 h-4" />
                                        </button>

                                        <h2 className="font-serif text-lg font-bold uppercase tracking-wide text-navy">
                                            {monthName}
                                        </h2>

                                        <button
                                            type="button"
                                            onClick={goToNextMonth}
                                            className="
                                                w-8
                                                h-8
                                                rounded-full
                                                flex
                                                items-center
                                                justify-center
                                                text-slate
                                                hover:bg-beige/40
                                                hover:text-navy
                                                transition
                                            "
                                        >
                                            <ChevronRight className="w-4 h-4" />
                                        </button>

                                    </div>

                                    {/* Weekdays */}
                                    <div className="grid grid-cols-7 text-center text-xs font-bold text-slate mb-2">
                                        {weekdays.map((day) => (
                                            <span key={day}>
                                                {day}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Dates */}
                                    <div className="grid grid-cols-7 gap-1 text-center">

                                        {calendarDays.map((calendarDay, index) => {
                                            const date = calendarDay.date;

                                            const isSelected =
                                                selectedDate &&
                                                isSameDate(
                                                    date,
                                                    selectedDate
                                                );

                                            const isToday = isSameDate(
                                                date,
                                                new Date()
                                            );

                                            const isPast =
                                                isDateInPast(date);

                                            const isDisabled =
                                                !calendarDay.isCurrentMonth ||
                                                isPast;

                                            return (
                                                <button
                                                    type="button"
                                                    key={`${date.getTime()}-${index}`}
                                                    disabled={isDisabled}
                                                    onClick={() =>
                                                        handleSelectDate(date)
                                                    }
                                                    className={`
                                                        w-9
                                                        h-9
                                                        rounded-full
                                                        flex
                                                        items-center
                                                        justify-center
                                                        text-sm
                                                        mx-auto
                                                        transition
                                                        ${
                                                            !calendarDay.isCurrentMonth
                                                                ? "text-gray/30 cursor-default"
                                                                : isPast
                                                                ? "text-gray/30 cursor-default"
                                                                : isSelected
                                                                ? "bg-navy text-white font-bold"
                                                                : isToday
                                                                ? "text-navy ring-1 ring-gray/30 hover:bg-beige/40 cursor-pointer"
                                                                : "text-navy hover:bg-beige/40 cursor-pointer"
                                                        }
                                                    `}
                                                >
                                                    {date.getDate()}
                                                </button>
                                            );
                                        })}

                                    </div>

                                </div>

                                {/* Time Slots */}
                                <div className="p-6">

                                    <div className="flex justify-between items-start mb-5">

                                        <div>
                                            <h2 className="font-serif text-2xl text-navy">
                                                {formatSelectedDate(
                                                    selectedDate
                                                )}
                                            </h2>
                                        </div>

                                        <p className="text-xs text-slate text-right">
                                            {availableSlots.length} slots
                                            <br />
                                            available
                                        </p>

                                    </div>

                                    {availableSlots.length > 0 ? (
                                        <div className="grid grid-cols-2 gap-3">

                                            {availableSlots.map((time) => {
                                                const isSelected =
                                                    selectedTime === time;

                                                return (
                                                    <button
                                                        type="button"
                                                        key={time}
                                                        onClick={() =>
                                                            handleSelectTime(
                                                                time
                                                            )
                                                        }
                                                        className={`
                                                            border
                                                            rounded-lg
                                                            py-3
                                                            px-4
                                                            text-sm
                                                            font-bold
                                                            text-center
                                                            transition
                                                            ${
                                                                isSelected
                                                                    ? "bg-navy text-white border-navy"
                                                                    : "border-gray text-navy hover:border-navy"
                                                            }
                                                        `}
                                                    >
                                                        {time}
                                                    </button>
                                                );
                                            })}

                                        </div>
                                    ) : (
                                        <div className="py-10 text-center">
                                            <Calendar className="w-7 h-7 text-gray mx-auto mb-3" />

                                            <p className="text-sm text-slate">
                                                No available slots for this
                                                date.
                                            </p>
                                        </div>
                                    )}

                                </div>

                            </div>

                        </div>

                        {/* Appointment Summary */}
                        <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6">

                            <div className="flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-gold" />

                                <h2 className="font-serif text-2xl text-navy">
                                    Appointment Summary
                                </h2>
                            </div>

                            <div className="border-b border-gray/20 my-5"></div>

                            {/* Existing Context */}
                            <div className="flex flex-col gap-4">

                                <div className="flex justify-between items-center gap-4">
                                    <span className="text-sm text-slate">
                                        Clinic
                                    </span>

                                    <span className="text-sm font-bold text-navy text-right">
                                        {selectedCompany.name}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center gap-4">
                                    <span className="text-sm text-slate">
                                        Service
                                    </span>

                                    <span className="text-sm font-bold text-navy text-right">
                                        {selectedService.name}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center gap-4">
                                    <span className="text-sm text-slate">
                                        Staff
                                    </span>

                                    <span className="text-sm font-bold text-navy text-right">
                                        {selectedStaff.name}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center gap-4">
                                    <span className="text-sm text-slate">
                                        Duration
                                    </span>

                                    <span className="text-sm font-bold text-navy text-right">
                                        {selectedService.durationMinutes}{" "}
                                        minutes
                                    </span>
                                </div>

                            </div>

                            <div className="border-b border-gray/20 my-5"></div>

                            {/* Date & Time */}
                            <div className="flex flex-col gap-4">

                                <div className="flex justify-between items-center gap-4">
                                    <span className="text-sm font-bold text-navy">
                                        Date
                                    </span>

                                    <span
                                        className={`
                                            text-sm text-right
                                            ${
                                                selectedDate
                                                    ? "text-navy"
                                                    : "text-gray italic"
                                            }
                                        `}
                                    >
                                        {selectedDate
                                            ? formatSelectedDate(
                                                  selectedDate
                                              )
                                            : "Not selected yet"}
                                    </span>
                                </div>

                                <div className="flex justify-between items-center gap-4">
                                    <span className="text-sm font-bold text-navy">
                                        Time
                                    </span>

                                    <span
                                        className={`
                                            text-sm text-right
                                            ${
                                                selectedTime
                                                    ? "text-navy"
                                                    : "text-gray italic"
                                            }
                                        `}
                                    >
                                        {selectedTime ||
                                            "Not selected yet"}
                                    </span>
                                </div>

                            </div>

                            {/* Total Price */}
                            <div className="bg-beige/40 rounded-lg p-4 mt-5 flex justify-between items-center">

                                <span className="text-xs font-bold uppercase tracking-wide text-slate">
                                    Total Price
                                </span>

                                <span className="font-serif text-2xl text-navy">
                                    PKR{" "}
                                    {selectedService.price.toLocaleString()}
                                </span>

                            </div>

                            {/* Continue */}
                            <button
                                type="button"
                                onClick={handleContinue}
                                disabled={!selectedTime}
                                className="
                                    w-full
                                    mt-4
                                    bg-navy
                                    text-white
                                    uppercase
                                    tracking-wide
                                    font-bold
                                    text-sm
                                    py-3.5
                                    rounded-lg
                                    flex
                                    items-center
                                    justify-center
                                    gap-2
                                    transition
                                    hover:bg-gold
                                    hover:text-navy
                                    disabled:opacity-40
                                    disabled:cursor-not-allowed
                                "
                            >
                                Continue
                                <ArrowRight className="w-4 h-4" />
                            </button>

                        </div>

                    </div>

                </main>

            </div>
        </div>
    );
}

export default ChooseDateTime;