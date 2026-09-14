import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Plus,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import StaffSidebar from "../../components/staff/StaffSidebar";
import StaffTopbar from "../../components/staff/StaffTopbar";

function StaffCalendar() {
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [viewMode, setViewMode] = useState("week");

    const [weekStart, setWeekStart] = useState(new Date(2026, 7, 17));

    const [appointments] = useState([]);

    const currentStaff = {
        name: "Dr. Sara Ahmed",
        role: "Doctor",
        avatarUrl: "",
        companyName: "Shifa Clinic",
    };

    function getWeekDates(startDate) {
        return Array.from({ length: 7 }, (_, index) => {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + index);
            return date;
        });
    }

    function startOfWeek(date) {
        const result = new Date(date);
        const day = result.getDay();

        const difference = day === 0 ? -6 : 1 - day;

        result.setDate(result.getDate() + difference);
        result.setHours(0, 0, 0, 0);

        return result;
    }

    function goToPreviousWeek() {
        const previousWeek = new Date(weekStart);
        previousWeek.setDate(previousWeek.getDate() - 7);
        setWeekStart(previousWeek);
    }

    function goToNextWeek() {
        const nextWeek = new Date(weekStart);
        nextWeek.setDate(nextWeek.getDate() + 7);
        setWeekStart(nextWeek);
    }

    function goToToday() {
        setWeekStart(startOfWeek(new Date()));
    }

    function handleNewAppointment() {
        navigate("/staff/appointments/new");
    }

    function formatFocusedDate(date) {
        return date.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
        });
    }

    const weekDates = getWeekDates(weekStart);

    const today = new Date();

    const todayTime = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
    );

    const focusedDate = weekDates.some(
        (date) =>
            date.getFullYear() === todayTime.getFullYear() &&
            date.getMonth() === todayTime.getMonth() &&
            date.getDate() === todayTime.getDate()
    )
        ? todayTime
        : weekStart;

    return (
        <div className="min-h-screen bg-beige flex">

            {/* Sidebar — desktop always visible, mobile slide-in drawer */}
            <StaffSidebar
                companyName={currentStaff.companyName}
                currentStaff={currentStaff}
                activeItem="Calendar"
                handleSignOut={() => navigate("/login")}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            {/* Main Area */}
            <div className="flex min-w-0 flex-1 flex-col">

                <StaffTopbar
                    avatarUrl={currentStaff.avatarUrl}
                    onMenuClick={() => setSidebarOpen(true)}
                    onSearchClick={() => {}}
                    onNotificationsClick={() => navigate("/staff/notifications")}
                    onSettingsClick={() => navigate("/staff/settings")}
                />

                <main className="flex-1 bg-beige px-4 sm:px-6 lg:px-8 py-6">

                    <div className="mx-auto w-full max-w-7xl">

                        {/* Page Header */}
                        <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

                            <div>
                                <h1 className="font-serif text-2xl text-navy sm:text-3xl">
                                    Calendar
                                </h1>

                                <p className="mt-1 text-sm text-slate">
                                    Manage your schedule and view upcoming appointments.
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-3">

                                <button
                                    type="button"
                                    onClick={goToToday}
                                    className="
                                        rounded-lg border border-gray bg-white
                                        px-5 py-2.5 text-sm font-bold text-navy
                                        transition hover:border-navy
                                    "
                                >
                                    Today
                                </button>

                                <button
                                    type="button"
                                    onClick={handleNewAppointment}
                                    className="
                                        flex items-center gap-2 rounded-lg
                                        bg-navy px-5 py-2.5 text-sm font-bold text-white
                                        transition hover:bg-gold hover:text-navy
                                    "
                                >
                                    <Plus className="h-4 w-4" />
                                    <span>New Appointment</span>
                                </button>

                            </div>
                        </div>

                        {/* Calendar Card */}
                        <div className="overflow-hidden rounded-xl border border-gray/20 bg-white shadow-sm">

                            {/* Calendar Toolbar */}
                            <div className="flex flex-col gap-4 border-b border-gray/20 px-4 py-4 sm:px-6 xl:flex-row xl:items-center xl:justify-between">

                                <div className="flex flex-wrap items-center gap-3">

                                    <button
                                        type="button"
                                        onClick={goToPreviousWeek}
                                        aria-label="Previous week"
                                        className="cursor-pointer text-slate transition hover:text-navy"
                                    >
                                        <ChevronLeft className="h-[18px] w-[18px]" />
                                    </button>

                                    <button
                                        type="button"
                                        onClick={goToToday}
                                        className="cursor-pointer text-sm font-bold text-navy transition hover:text-gold"
                                    >
                                        Today
                                    </button>

                                    <button
                                        type="button"
                                        onClick={goToNextWeek}
                                        aria-label="Next week"
                                        className="cursor-pointer text-slate transition hover:text-navy"
                                    >
                                        <ChevronRight className="h-[18px] w-[18px]" />
                                    </button>

                                    <p className="ml-1 font-serif text-lg text-navy sm:ml-3 sm:text-2xl">
                                        {formatFocusedDate(focusedDate)}
                                    </p>

                                </div>

                                <div className="flex w-fit gap-1 rounded-lg bg-gray/10 p-1">

                                    {["day", "week", "month"].map((view) => (
                                        <button
                                            key={view}
                                            type="button"
                                            onClick={() => setViewMode(view)}
                                            className={`
                                                rounded-md px-4 py-1.5 text-sm font-bold capitalize transition
                                                ${
                                                    viewMode === view
                                                        ? "bg-white text-navy shadow-sm"
                                                        : "text-slate hover:text-navy"
                                                }
                                            `}
                                        >
                                            {view}
                                        </button>
                                    ))}

                                </div>

                            </div>

                            {/* Week Grid Header */}
                            <div className="overflow-x-auto">
                                <div className="min-w-[900px]">

                                    <div className="grid grid-cols-[80px_repeat(7,1fr)] border-b border-gray/20">

                                        {/* Time Gutter */}
                                        <div className="w-20" />

                                        {/* Days */}
                                        {weekDates.map((date, index) => {
                                            const isFocused =
                                                date.getFullYear() === focusedDate.getFullYear() &&
                                                date.getMonth() === focusedDate.getMonth() &&
                                                date.getDate() === focusedDate.getDate();

                                            const isWeekend = index === 5 || index === 6;

                                            const dayName = date.toLocaleDateString("en-US", {
                                                weekday: "short",
                                            });

                                            const dateNumber = date.getDate();

                                            return (
                                                <div
                                                    key={date.toISOString()}
                                                    className={`
                                                        border-l border-gray/20 px-2 py-3 text-center
                                                        ${isFocused ? "bg-gold/10" : ""}
                                                    `}
                                                >

                                                    <p
                                                        className={`
                                                            text-xs uppercase tracking-wide
                                                            ${
                                                                isWeekend
                                                                    ? "text-gray"
                                                                    : isFocused
                                                                    ? "text-gold"
                                                                    : "text-slate"
                                                            }
                                                        `}
                                                    >
                                                        {dayName}
                                                    </p>

                                                    <p
                                                        className={`
                                                            mt-1 font-serif text-xl
                                                            ${
                                                                isWeekend
                                                                    ? "text-gray"
                                                                    : "text-navy"
                                                            }
                                                            ${isFocused ? "font-bold" : ""}
                                                        `}
                                                    >
                                                        {dateNumber}
                                                    </p>

                                                </div>
                                            );
                                        })}

                                    </div>

                                </div>
                            </div>

                            {/* Time Grid Body */}
                            <div className="overflow-x-auto">
                                <div className="min-w-[900px]">

                                    {Array.from({ length: 12 }, (_, hourIndex) => {
                                        const hour = 8 + hourIndex;

                                        const displayHour = hour > 12 ? hour - 12 : hour;
                                        const period = hour >= 12 ? "PM" : "AM";

                                        const timeLabel = `${String(displayHour).padStart(
                                            2,
                                            "0"
                                        )}:00 ${period}`;

                                        return (
                                            <div
                                                key={hour}
                                                className="
                                                    grid grid-cols-[80px_repeat(7,1fr)]
                                                    min-h-[80px] border-b border-gray/20
                                                "
                                            >

                                                {/* Time Gutter */}
                                                <div className="w-20 pt-2 pr-2 text-right">
                                                    <p className="text-xs text-slate">
                                                        {timeLabel}
                                                    </p>
                                                </div>

                                                {/* Day Cells */}
                                                {weekDates.map((date, dayIndex) => {
                                                    const isWeekend =
                                                        dayIndex === 5 || dayIndex === 6;

                                                    const dayAppointments =
                                                        appointments.filter(
                                                            (appointment) =>
                                                                appointment.day === dayIndex
                                                        );

                                                    return (
                                                        <div
                                                            key={`${date.toISOString()}-${hour}`}
                                                            className={`
                                                                relative border-l border-gray/20
                                                                ${
                                                                    isWeekend
                                                                        ? "bg-[repeating-linear-gradient(135deg,#E4E2DD_0px,#E4E2DD_4px,#fbf9f4_4px,#fbf9f4_8px)]"
                                                                        : ""
                                                                }
                                                            `}
                                                        >

                                                            {/* Appointment Blocks */}
                                                            {dayAppointments
                                                                .filter((appointment) => {
                                                                    const startHour = parseInt(
                                                                        appointment.startTime.split(":")[0],
                                                                        10
                                                                    );

                                                                    return startHour === hour;
                                                                })
                                                                .map((appointment) => (
                                                                    <div
                                                                        key={appointment.id}
                                                                        className={`
                                                                            absolute left-1 right-1 top-1 z-10
                                                                            overflow-hidden rounded-md px-2 py-1
                                                                            text-xs font-bold
                                                                            ${
                                                                                appointment.status === "confirmed"
                                                                                    ? "bg-navy text-white"
                                                                                    : appointment.status === "pending"
                                                                                    ? "bg-blue-400 text-white"
                                                                                    : "bg-gray/20 text-slate"
                                                                            }
                                                                        `}
                                                                    >
                                                                        <p className="truncate">
                                                                            {appointment.customerName}
                                                                        </p>

                                                                        <p className="truncate text-[11px] opacity-80">
                                                                            {appointment.startTime}
                                                                        </p>
                                                                    </div>
                                                                ))}

                                                        </div>
                                                    );
                                                })}

                                            </div>
                                        );
                                    })}

                                </div>
                            </div>

                        </div>

                    </div>

                </main>
            </div>
        </div>
    );
}

export default StaffCalendar;