import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Plus,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import StaffSidebar from "../../components/staff/StaffSidebar";
import StaffTopbar from "../../components/staff/StaffTopbar";
import DayGrid from "../../components/staff/calendar/DayGrid";
import MonthGrid from "../../components/staff/calendar/MonthGrid";

function StaffCalendar() {
    const navigate = useNavigate();

    const [viewMode, setViewMode] = useState("week");

    const [focusedDate, setFocusedDate] = useState(new Date(2026, 7, 21));

    const [weekStart, setWeekStart] = useState(new Date(2026, 7, 17));

    const [visibleMonth, setVisibleMonth] = useState({
        year: 2026,
        month: 7,
    });

    const [appointments] = useState([
        {
            customerName: "Hina Malik",
            service: "Comprehensive Consultation",
            start: "09:00 AM",
            end: "10:00 AM",
            status: "confirmed",
        },
        {
            customerName: "Ayesha Khan",
            service: "Follow-up Assessment",
            start: "11:00 AM",
            end: "12:00 PM",
            status: "arrived",
        },
        {
            customerName: "Zainab Ali",
            service: "Specialist Procedure",
            start: "02:00 PM",
            end: "03:30 PM",
            status: "pending",
        },
        {
            type: "break",
            label: "Lunch Break",
            start: "12:00 PM",
            end: "01:00 PM",
        },
    ]);

    // TODO: In the full implementation, derive this map by grouping
    // the same shared appointment dataset used by Day/Week view
    // according to appointment date.
    const [appointmentsByDate] = useState({
        "2026-08-05": 4,
        "2026-08-19": 2,
        "2026-08-21": 3,
    });

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

    function computeMonthGrid(year, month) {
        const firstDay = new Date(year, month, 1);
        const dayOfWeek = firstDay.getDay();

        // Convert Sunday-first JS index into Monday-first calendar index.
        const mondayOffset = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

        const gridStart = new Date(year, month, 1 - mondayOffset);

        return Array.from({ length: 42 }, (_, index) => {
            const date = new Date(gridStart);
            date.setDate(gridStart.getDate() + index);
            return date;
        });
    }

    function goToPreviousWeek() {
        const previousWeek = new Date(weekStart);

        previousWeek.setDate(previousWeek.getDate() - 7);

        setWeekStart(previousWeek);

        if (viewMode === "week") {
            setFocusedDate(previousWeek);
        }
    }

    function goToNextWeek() {
        const nextWeek = new Date(weekStart);

        nextWeek.setDate(nextWeek.getDate() + 7);

        setWeekStart(nextWeek);

        if (viewMode === "week") {
            setFocusedDate(nextWeek);
        }
    }

    function goToPreviousDay() {
        const previousDay = new Date(focusedDate);
        previousDay.setDate(previousDay.getDate() - 1);
        setFocusedDate(previousDay);
    }

    function goToNextDay() {
        const nextDay = new Date(focusedDate);
        nextDay.setDate(nextDay.getDate() + 1);
        setFocusedDate(nextDay);
    }

    function goToPreviousMonth() {
        setVisibleMonth((currentMonth) => {
            if (currentMonth.month === 0) {
                return { year: currentMonth.year - 1, month: 11 };
            }

            return {
                year: currentMonth.year,
                month: currentMonth.month - 1,
            };
        });
    }

    function goToNextMonth() {
        setVisibleMonth((currentMonth) => {
            if (currentMonth.month === 11) {
                return { year: currentMonth.year + 1, month: 0 };
            }

            return {
                year: currentMonth.year,
                month: currentMonth.month + 1,
            };
        });
    }

    function goToToday() {
        const today = new Date();

        today.setHours(0, 0, 0, 0);

        setFocusedDate(today);
        setWeekStart(startOfWeek(today));
        setVisibleMonth({
            year: today.getFullYear(),
            month: today.getMonth(),
        });
    }

    function handleDayClick(date) {
        setFocusedDate(new Date(date));
        setViewMode("day");

        // TODO: If calendar views become routed sub-views,
        // also navigate/scroll to the selected day here.
    }

    function handleViewModeChange(mode) {
        setViewMode(mode);

        if (mode === "day") {
            return;
        }

        if (mode === "week") {
            setWeekStart(startOfWeek(focusedDate));
            return;
        }

        if (mode === "month") {
            setVisibleMonth({
                year: focusedDate.getFullYear(),
                month: focusedDate.getMonth(),
            });
        }
    }

    function handleNewAppointment() {
        // TODO: Connect this button to the real New Appointment flow/modal.
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

    function getTimeInMinutes(time) {
        const [timePart, meridiem] = time.split(" ");
        const [hours, minutes] = timePart.split(":").map(Number);

        let convertedHours = hours;

        if (meridiem === "PM" && hours !== 12) {
            convertedHours += 12;
        }

        if (meridiem === "AM" && hours === 12) {
            convertedHours = 0;
        }

        return convertedHours * 60 + minutes;
    }

    function getAppointmentStyle(appointment) {
        const gridStartMinutes = 8 * 60;

        const appointmentStartMinutes = getTimeInMinutes(appointment.start);
        const appointmentEndMinutes = getTimeInMinutes(appointment.end);

        const minutesFromGridStart =
            appointmentStartMinutes - gridStartMinutes;

        const durationMinutes =
            appointmentEndMinutes - appointmentStartMinutes;

        const top = (minutesFromGridStart / 60) * 80;
        const height = (durationMinutes / 60) * 80;

        return {
            top: `${top}px`,
            height: `${height}px`,
        };
    }

    function getCurrentTimeIndicator() {
        // TODO: Replace this static value with Date.now() and refresh
        // it on an interval in the real-time calendar implementation.
        const currentTime = "10:42 AM";

        const currentMinutes = getTimeInMinutes(currentTime);
        const gridStartMinutes = 8 * 60;
        const gridEndMinutes = 20 * 60;

        if (
            currentMinutes < gridStartMinutes ||
            currentMinutes > gridEndMinutes
        ) {
            return null;
        }

        const minutesFromGridStart =
            currentMinutes - gridStartMinutes;

        const top = (minutesFromGridStart / 60) * 80;

        return {
            top,
            label: currentTime,
        };
    }

    const weekDates = getWeekDates(weekStart);

    const today = new Date();

    const todayTime = new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate()
    );

    const focusedDateIsToday =
        focusedDate.getFullYear() === todayTime.getFullYear() &&
        focusedDate.getMonth() === todayTime.getMonth() &&
        focusedDate.getDate() === todayTime.getDate();

    const currentTimeIndicator = getCurrentTimeIndicator();

    const showCurrentTimeIndicator =
        focusedDateIsToday && currentTimeIndicator !== null;

    const weekFocusedDate = weekDates.some(
        (date) =>
            date.getFullYear() === focusedDate.getFullYear() &&
            date.getMonth() === focusedDate.getMonth() &&
            date.getDate() === focusedDate.getDate()
    )
        ? focusedDate
        : weekStart;

    const monthDates = computeMonthGrid(
        visibleMonth.year,
        visibleMonth.month
    );

    const visibleMonthLabel = new Date(
        visibleMonth.year,
        visibleMonth.month,
        1
    ).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
    });

    function handlePrevious() {
        if (viewMode === "day") {
            goToPreviousDay();
            return;
        }

        if (viewMode === "month") {
            goToPreviousMonth();
            return;
        }

        goToPreviousWeek();
    }

    function handleNext() {
        if (viewMode === "day") {
            goToNextDay();
            return;
        }

        if (viewMode === "month") {
            goToNextMonth();
            return;
        }

        goToNextWeek();
    }

    const headerSubtitle =
        viewMode === "day"
            ? `Detailed view of your schedule for ${formatFocusedDate(
                  focusedDate
              )}.`
            : viewMode === "month"
            ? "Monthly overview of your appointments."
            : "View and manage your weekly appointment schedule.";

    return (
        <div className="min-h-screen bg-beige flex">
            <StaffSidebar
                companyName={currentStaff.companyName}
                currentStaff={currentStaff}
                activeItem="Calendar"
                handleSignOut={() => navigate("/login")}
            />

            <div className="flex-1 min-w-0 flex flex-col">
                <StaffTopbar
                    avatarUrl={currentStaff.avatarUrl}
                    onSearchClick={() => {}}
                    onNotificationsClick={() =>
                        navigate("/staff/notifications")
                    }
                    onSettingsClick={() =>
                        navigate("/staff/settings")
                    }
                />

                <main className="flex-1 bg-beige px-4 sm:px-6 lg:px-8 py-6">
                    <div className="max-w-7xl mx-auto w-full">

                        {/* Page Header */}
                        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5 mb-6">
                            <div>
                                <h1 className="font-serif text-3xl text-navy">
                                    Calendar
                                </h1>

                                <p className="text-sm text-slate mt-1">
                                    {headerSubtitle}
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={goToToday}
                                    className="
                                        px-4 py-2.5 bg-white border border-gray/30 rounded-md
                                        text-sm font-bold text-navy
                                        hover:border-navy transition
                                    "
                                >
                                    Today
                                </button>

                                <button
                                    type="button"
                                    onClick={handleNewAppointment}
                                    className="
                                        inline-flex items-center gap-2 px-4 py-2.5
                                        bg-navy text-white rounded-md text-sm font-bold
                                        hover:bg-gold hover:text-navy transition
                                    "
                                >
                                    <Plus className="w-4 h-4" />
                                    New Appointment
                                </button>
                            </div>
                        </div>

                        {/* Calendar Card */}
                        <div className="bg-white rounded-xl border border-gray/20 shadow-sm overflow-hidden">

                            {/* Toolbar */}
                            <div className="px-4 sm:px-6 py-4 border-b border-gray/20">
                                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                                    {/* Date Navigation */}
                                    <div className="flex items-center">
                                        <button
                                            type="button"
                                            onClick={handlePrevious}
                                            className="
                                                w-9 h-9 flex items-center justify-center rounded-md
                                                text-slate hover:bg-beige hover:text-navy transition
                                            "
                                            aria-label={
                                                viewMode === "day"
                                                    ? "Previous day"
                                                    : viewMode === "month"
                                                    ? "Previous month"
                                                    : "Previous week"
                                            }
                                        >
                                            <ChevronLeft className="w-5 h-5" />
                                        </button>

                                        <p className="font-serif text-2xl text-navy ml-3">
                                            {viewMode === "day"
                                                ? formatFocusedDate(focusedDate)
                                                : viewMode === "month"
                                                ? visibleMonthLabel
                                                : formatFocusedDate(weekFocusedDate)}
                                        </p>

                                        <button
                                            type="button"
                                            onClick={handleNext}
                                            className="
                                                w-9 h-9 flex items-center justify-center rounded-md
                                                text-slate hover:bg-beige hover:text-navy transition ml-2
                                            "
                                            aria-label={
                                                viewMode === "day"
                                                    ? "Next day"
                                                    : viewMode === "month"
                                                    ? "Next month"
                                                    : "Next week"
                                            }
                                        >
                                            <ChevronRight className="w-5 h-5" />
                                        </button>
                                    </div>

                                    {/* View Switcher */}
                                    <div className="inline-flex items-center bg-beige rounded-lg p-1 self-start lg:self-auto">
                                        {["day", "week", "month"].map(
                                            (mode) => (
                                                <button
                                                    key={mode}
                                                    type="button"
                                                    onClick={() =>
                                                        handleViewModeChange(mode)
                                                    }
                                                    className={`
                                                        px-4 py-2 rounded-md text-sm font-bold capitalize transition
                                                        ${
                                                            viewMode === mode
                                                                ? "bg-white text-navy shadow-sm"
                                                                : "text-slate hover:text-navy"
                                                        }
                                                    `}
                                                >
                                                    {mode}
                                                </button>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>

                            {viewMode === "day" ? (
                                <DayGrid
                                    date={focusedDate}
                                    appointments={appointments}
                                    currentTimeIndicator={
                                        showCurrentTimeIndicator
                                            ? currentTimeIndicator
                                            : null
                                    }
                                />
                            ) : viewMode === "week" ? (
                                <>
                                    {/* Week Grid Header */}
                                    <div className="overflow-x-auto">
                                        <div className="min-w-[900px]">
                                            <div className="grid grid-cols-[80px_repeat(7,1fr)] border-b border-gray/20">
                                                <div className="w-20" />

                                                {weekDates.map((date, index) => {
                                                    const isFocused =
                                                        date.getFullYear() === focusedDate.getFullYear() &&
                                                        date.getMonth() === focusedDate.getMonth() &&
                                                        date.getDate() === focusedDate.getDate();

                                                    const isWeekend = index === 5 || index === 6;

                                                    const dayName = date.toLocaleDateString(
                                                        "en-US",
                                                        { weekday: "short" }
                                                    );

                                                    return (
                                                        <div
                                                            key={date.toISOString()}
                                                            className={`
                                                                px-2 py-3 text-center border-l border-gray/20
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
                                                                    font-serif text-xl mt-1
                                                                    ${
                                                                        isWeekend
                                                                            ? "text-gray"
                                                                            : "text-navy"
                                                                    }
                                                                    ${isFocused ? "font-bold" : ""}
                                                                `}
                                                            >
                                                                {date.getDate()}
                                                            </p>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Week Time Grid */}
                                    <div className="overflow-x-auto">
                                        <div className="min-w-[900px] relative">
                                            {Array.from(
                                                { length: 12 },
                                                (_, rowIndex) => {
                                                    const hour = 8 + rowIndex;

                                                    return (
                                                        <div
                                                            key={hour}
                                                            className="grid grid-cols-[80px_repeat(7,1fr)] min-h-[80px]"
                                                        >
                                                            <div className="px-2 pt-2 pr-3 text-right text-xs text-slate border-b border-gray/20">
                                                                {new Date(
                                                                    2026,
                                                                    0,
                                                                    1,
                                                                    hour
                                                                ).toLocaleTimeString(
                                                                    "en-US",
                                                                    {
                                                                        hour: "2-digit",
                                                                        minute: "2-digit",
                                                                    }
                                                                )}
                                                            </div>

                                                            {weekDates.map(
                                                                (date, dayIndex) => {
                                                                    const isWeekend =
                                                                        dayIndex === 5 || dayIndex === 6;

                                                                    const dayAppointments =
                                                                        appointments.filter(
                                                                            (appointment) =>
                                                                                appointment.dayIndex ===
                                                                                dayIndex
                                                                        );

                                                                    return (
                                                                        <div
                                                                            key={`${date.toISOString()}-${hour}`}
                                                                            className={`
                                                                                relative border-l border-b border-gray/20
                                                                                ${
                                                                                    isWeekend
                                                                                        ? "bg-[repeating-linear-gradient(135deg,#E4E2DD_0px,#E4E2DD_4px,#fbf9f4_4px,#fbf9f4_8px)]"
                                                                                        : ""
                                                                                }
                                                                            `}
                                                                        >
                                                                            {dayAppointments
                                                                                .filter(
                                                                                    (appointment) =>
                                                                                        Math.floor(
                                                                                            getTimeInMinutes(
                                                                                                appointment.start
                                                                                            ) / 60
                                                                                        ) === hour
                                                                                )
                                                                                .map(
                                                                                    (
                                                                                        appointment,
                                                                                        appointmentIndex
                                                                                    ) => (
                                                                                        <div
                                                                                            key={`${appointment.customerName}-${appointmentIndex}`}
                                                                                            className={`
                                                                                                absolute left-1 right-1 rounded-md
                                                                                                px-2 py-1 text-xs font-bold
                                                                                                overflow-hidden z-10
                                                                                                ${
                                                                                                    appointment.status ===
                                                                                                    "pending"
                                                                                                        ? "bg-blue-400 text-white"
                                                                                                        : "bg-navy text-white"
                                                                                                }
                                                                                            `}
                                                                                            style={getAppointmentStyle(
                                                                                                appointment
                                                                                            )}
                                                                                        >
                                                                                            {appointment.customerName}

                                                                                            <div className="font-normal opacity-80">
                                                                                                {appointment.start}
                                                                                            </div>
                                                                                        </div>
                                                                                    )
                                                                                )}
                                                                        </div>
                                                                    );
                                                                }
                                                            )}
                                                        </div>
                                                    );
                                                }
                                            )}

                                            {showCurrentTimeIndicator && (
                                                <div
                                                    className="absolute left-20 right-0 z-20 pointer-events-none"
                                                    style={{
                                                        top: `${currentTimeIndicator.top}px`,
                                                    }}
                                                >
                                                    <div className="relative border-t-2 border-gold">
                                                        <div className="absolute -left-1.5 -top-[5px] w-2.5 h-2.5 rounded-full bg-gold" />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Legend */}
                                    <div className="px-6 py-4 border-t border-gray/20 flex flex-wrap items-center gap-6">
                                        <div className="inline-flex items-center gap-2">
                                            <span className="w-2.5 h-2.5 rounded-full bg-navy" />
                                            <span className="text-sm text-slate">Confirmed</span>
                                        </div>

                                        <div className="inline-flex items-center gap-2">
                                            <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                                            <span className="text-sm text-slate">Pending</span>
                                        </div>

                                        <div className="inline-flex items-center gap-2">
                                            <span className="w-2.5 h-2.5 rounded-full bg-gray/30" />
                                            <span className="text-sm text-slate">Blocked/Break</span>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <MonthGrid
                                    year={visibleMonth.year}
                                    month={visibleMonth.month}
                                    dates={monthDates}
                                    appointmentsByDate={appointmentsByDate}
                                    onDayClick={handleDayClick}
                                />
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default StaffCalendar;