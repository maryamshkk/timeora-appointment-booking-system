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

    const [viewMode, setViewMode] = useState("week");

    const [weekStart, setWeekStart] = useState(
        new Date(2026, 7, 17)
    );

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
        // TODO: Open the New Appointment modal/flow.
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

            {/* Staff Sidebar */}
            <StaffSidebar
                companyName={currentStaff.companyName}
                currentStaff={currentStaff}
                activeItem="Calendar"
                handleSignOut={() => navigate("/login")}
            />

            {/* Main Area */}
            <div className="flex-1 min-w-0 flex flex-col">

                {/* Shared Staff Topbar */}
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
                        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 mb-6">

                            <div>
                                <h1 className="font-serif text-3xl text-navy">
                                    Calendar
                                </h1>

                                <p className="text-sm text-slate mt-1">
                                    Manage your schedule and view upcoming appointments.
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-3">

                                {/* Today */}
                                <button
                                    type="button"
                                    onClick={goToToday}
                                    className="
                                        bg-white
                                        border
                                        border-gray
                                        text-navy
                                        px-5
                                        py-2.5
                                        rounded-lg
                                        font-bold
                                        text-sm
                                        hover:border-navy
                                        transition
                                    "
                                >
                                    Today
                                </button>

                                {/* New Appointment */}
                                <button
                                    type="button"
                                    onClick={handleNewAppointment}
                                    className="
                                        bg-navy
                                        text-white
                                        px-5
                                        py-2.5
                                        rounded-lg
                                        font-bold
                                        text-sm
                                        flex
                                        items-center
                                        gap-2
                                        hover:bg-gold
                                        hover:text-navy
                                        transition
                                    "
                                >
                                    <Plus className="w-4 h-4" />
                                    <span>New Appointment</span>
                                </button>

                            </div>
                        </div>

                        {/* Calendar Card */}
                        <div className="bg-white rounded-xl border border-gray/20 shadow-sm overflow-hidden">

                            {/* Calendar Toolbar */}
                            <div className="px-6 py-4 border-b border-gray/20 flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">

                                {/* Week Navigation */}
                                <div className="flex items-center gap-3">

                                    <button
                                        type="button"
                                        onClick={goToPreviousWeek}
                                        aria-label="Previous week"
                                        className="
                                            text-slate
                                            hover:text-navy
                                            transition
                                            cursor-pointer
                                        "
                                    >
                                        <ChevronLeft className="w-[18px] h-[18px]" />
                                    </button>

                                    <button
                                        type="button"
                                        onClick={goToToday}
                                        className="
                                            text-sm
                                            font-bold
                                            text-navy
                                            hover:text-gold
                                            transition
                                            cursor-pointer
                                        "
                                    >
                                        Today
                                    </button>

                                    <button
                                        type="button"
                                        onClick={goToNextWeek}
                                        aria-label="Next week"
                                        className="
                                            text-slate
                                            hover:text-navy
                                            transition
                                            cursor-pointer
                                        "
                                    >
                                        <ChevronRight className="w-[18px] h-[18px]" />
                                    </button>

                                    {/* Focused Date */}
                                    <p className="font-serif text-2xl text-navy ml-3">
                                        {formatFocusedDate(focusedDate)}
                                    </p>

                                </div>

                                {/* View Switcher */}
                                <div className="bg-gray/10 rounded-lg p-1 flex gap-1 w-fit">

                                    {["day", "week", "month"].map((view) => (
                                        <button
                                            key={view}
                                            type="button"
                                            onClick={() => setViewMode(view)}
                                            className={`
                                                px-4
                                                py-1.5
                                                rounded-md
                                                text-sm
                                                font-bold
                                                capitalize
                                                transition
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

                            {/* Calendar Grid will be added in Step 2 */}

                            <div className="px-6 py-10 text-center">
                                <p className="text-sm text-slate">
                                    Calendar grid coming next.
                                </p>
                            </div>

                        </div>

                    </div>

                </main>
            </div>
        </div>
    );
}

export default StaffCalendar;
