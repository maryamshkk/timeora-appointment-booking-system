import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Calendar,
    ChevronDown,
    CalendarDays,
    CheckCircle2,
    XCircle,
    UserX,
} from "lucide-react";

import StaffSidebar from "../../components/staff/StaffSidebar";
import StaffTopbar from "../../components/staff/StaffTopbar";
import StatCard from "../../components/dashboard/StatCard";

function StaffReports() {
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [dateRange, setDateRange] = useState("Last 30 Days");
    const [isDateRangeOpen, setIsDateRangeOpen] = useState(false);

    const [stats] = useState({
        totalAppointments: 48,
        totalDelta: "+8%",
        completed: 39,
        cancelled: 5,
        noShows: 4,
    });

    const currentStaff = {
        name: "Dr. Sara Ahmed",
        role: "Doctor",
        avatarUrl: "",
        companyName: "Shifa Clinic",
    };

    function handleDateRangeChange(range) {
        setDateRange(range);
        setIsDateRangeOpen(false);

        // TODO: Refetch all report data for the selected date range.
    }

    function handleSignOut() {
        navigate("/login");
    }

    return (
        <div className="min-h-screen bg-beige flex">

            {/* Sidebar — desktop always visible, mobile slide-in drawer */}
            <StaffSidebar
                companyName={currentStaff.companyName}
                currentStaff={currentStaff}
                activeItem="Reports"
                handleSignOut={handleSignOut}
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

                {/* Main Content */}
                <main className="flex-1 bg-beige px-4 py-6 sm:px-6 md:px-8">
                    <div className="mx-auto w-full max-w-7xl">

                        {/* Header */}
                        <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

                            {/* Title */}
                            <div>
                                <h1 className="font-serif text-2xl text-navy sm:text-3xl lg:text-4xl">
                                    My Reports
                                </h1>

                                <p className="mt-1.5 text-sm text-slate">
                                    Track your appointment activity and performance.
                                </p>
                            </div>

                            {/* Date Range */}
                            <div className="relative">

                                <button
                                    type="button"
                                    onClick={() =>
                                        setIsDateRangeOpen(!isDateRangeOpen)
                                    }
                                    className="
                                        flex items-center gap-2 rounded-lg
                                        border border-gray bg-white px-4 py-2.5
                                        text-sm font-bold text-navy transition
                                        hover:bg-beige
                                    "
                                >
                                    <Calendar className="h-4 w-4" />

                                    <span>{dateRange}</span>

                                    <ChevronDown
                                        className={`
                                            h-3.5 w-3.5 transition-transform
                                            ${isDateRangeOpen ? "rotate-180" : ""}
                                        `}
                                    />
                                </button>

                                {/* Date Range Dropdown */}
                                {isDateRangeOpen && (
                                    <div
                                        className="
                                            absolute right-0 top-full z-30 mt-2
                                            w-44 rounded-xl border border-gray/30
                                            bg-white p-1.5 shadow-lg
                                        "
                                    >
                                        {[
                                            "Last 7 Days",
                                            "Last 30 Days",
                                            "Last 90 Days",
                                            "Custom Range",
                                        ].map((range) => (
                                            <button
                                                key={range}
                                                type="button"
                                                onClick={() =>
                                                    handleDateRangeChange(range)
                                                }
                                                className={`
                                                    w-full rounded-lg px-3 py-2.5
                                                    text-left text-sm font-bold transition
                                                    ${
                                                        dateRange === range
                                                            ? "bg-beige text-navy"
                                                            : "text-slate hover:bg-beige/60 hover:text-navy"
                                                    }
                                                `}
                                            >
                                                {range}
                                            </button>
                                        ))}
                                    </div>
                                )}

                            </div>

                        </div>

                        {/* Stat Cards */}
                        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">

                            <StatCard
                                value={stats.totalAppointments}
                                label="Total Appointments"
                                icon={CalendarDays}
                                iconBg="bg-beige"
                                iconColor="text-navy"
                                accentColor="bg-gold"
                            />

                            <StatCard
                                value={stats.completed}
                                label="Completed"
                                icon={CheckCircle2}
                                iconBg="bg-green-50"
                                iconColor="text-green-700"
                                accentColor="bg-green-500"
                            />

                            <StatCard
                                value={stats.cancelled}
                                label="Cancelled"
                                icon={XCircle}
                                iconBg="bg-red-50"
                                iconColor="text-red-600"
                                accentColor="bg-red-500"
                            />

                            <StatCard
                                value={stats.noShows}
                                label="No-Shows"
                                icon={UserX}
                                iconBg="bg-gold/15"
                                iconColor="text-amber-600"
                                accentColor="bg-amber-500"
                            />

                        </div>

                    </div>
                </main>

            </div>

        </div>
    );
}

export default StaffReports;