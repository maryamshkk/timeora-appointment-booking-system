import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Calendar,
    ChevronDown,
    MoreHorizontal,
    CalendarDays,
    CheckCircle2,
    XCircle,
    UserX,
} from "lucide-react";
import {
    AreaChart,
    Area,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

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

    const [trendData] = useState([
        { date: "Oct 1", count: 9 },
        { date: "Oct 8", count: 11 },
        { date: "Oct 15", count: 15 },
        { date: "Oct 22", count: 10 },
        { date: "Oct 29", count: 21 },
    ]);

    const [hoursLogged] = useState({
        scheduled: 32,
        completed: 26,
        available: 8,
    });

    const currentStaff = {
        name: "Dr. Sara Ahmed",
        role: "Doctor",
        avatarUrl: "",
        companyName: "Shifa Clinic",
    };

    /* Derived completion metrics */
    const completionRate = Math.round(
        (stats.completed / stats.totalAppointments) * 100
    );

    const completedWidth =
        (stats.completed / stats.totalAppointments) * 100;

    const cancelledWidth =
        (stats.cancelled / stats.totalAppointments) * 100;

    const noShowWidth =
        (stats.noShows / stats.totalAppointments) * 100;

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

                        {/* Appointment Trend */}
                        <div className="mb-6 rounded-xl border border-gray/20 bg-white p-5 shadow-sm sm:p-6">

                            {/* Header */}
                            <div className="mb-6 flex items-center justify-between">

                                <div>
                                    <h2 className="font-serif text-lg font-bold text-navy sm:text-xl">
                                        Appointment Trend
                                    </h2>

                                    <p className="mt-1 text-xs text-slate">
                                        Your appointments over time
                                    </p>
                                </div>

                                <button
                                    type="button"
                                    className="
                                        flex h-8 w-8 items-center justify-center
                                        rounded-lg text-slate transition
                                        hover:bg-beige hover:text-navy
                                    "
                                    aria-label="More options"
                                >
                                    <MoreHorizontal className="h-5 w-5" />
                                </button>

                            </div>

                            {/* Chart */}
                            <div className="h-[260px] w-full sm:h-[320px]">

                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart
                                        data={trendData}
                                        margin={{
                                            top: 10,
                                            right: 10,
                                            left: -20,
                                            bottom: 0,
                                        }}
                                    >
                                        <CartesianGrid
                                            strokeDasharray="4 4"
                                            vertical={false}
                                            stroke="#E4E2DD"
                                        />

                                        <XAxis
                                            dataKey="date"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{
                                                fontSize: 12,
                                                fill: "#43474E",
                                            }}
                                        />

                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            allowDecimals={false}
                                            tick={{
                                                fontSize: 12,
                                                fill: "#43474E",
                                            }}
                                        />

                                        <Tooltip
                                            contentStyle={{
                                                borderRadius: "8px",
                                                border: "1px solid #C3C6CF",
                                                fontSize: "12px",
                                            }}
                                            labelStyle={{
                                                color: "#000C1E",
                                                fontWeight: "700",
                                            }}
                                        />

                                        <Area
                                            type="monotone"
                                            dataKey="count"
                                            stroke="#000C1E"
                                            strokeWidth={2}
                                            fill="#000C1E"
                                            fillOpacity={0.06}
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>

                            </div>

                        </div>

                        {/* Completion Rate + Hours Logged */}
                        <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">

                            {/* Completion Rate */}
                            <div className="rounded-xl border border-gray/20 bg-white p-5 shadow-sm sm:p-6">

                                <h2 className="font-serif text-lg font-bold text-navy">
                                    Completion Rate
                                </h2>

                                <p className="mb-6 mt-1 text-xs text-slate">
                                    Appointment outcome breakdown
                                </p>

                                {/* Percentage */}
                                <div className="mb-4 flex items-end gap-2">
                                    <span className="font-serif text-4xl text-navy">
                                        {completionRate}%
                                    </span>

                                    <span className="mb-1 text-xs text-slate">
                                        completed
                                    </span>
                                </div>

                                {/* Segmented Bar */}
                                <div className="flex h-3 w-full overflow-hidden rounded-full bg-gray/20">

                                    <div
                                        className="h-full bg-navy"
                                        style={{ width: `${completedWidth}%` }}
                                    />

                                    <div
                                        className="h-full bg-gold"
                                        style={{ width: `${cancelledWidth}%` }}
                                    />

                                    <div
                                        className="h-full bg-slate"
                                        style={{ width: `${noShowWidth}%` }}
                                    />

                                </div>

                                {/* Legend */}
                                <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">

                                    <div className="flex items-center gap-2">
                                        <span className="h-2.5 w-2.5 rounded-full bg-navy" />
                                        <span className="text-xs text-slate">
                                            Completed {stats.completed}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className="h-2.5 w-2.5 rounded-full bg-gold" />
                                        <span className="text-xs text-slate">
                                            Cancelled {stats.cancelled}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className="h-2.5 w-2.5 rounded-full bg-slate" />
                                        <span className="text-xs text-slate">
                                            No-shows {stats.noShows}
                                        </span>
                                    </div>

                                </div>

                            </div>

                            {/* Hours Logged */}
                            <div className="rounded-xl border border-gray/20 bg-white p-5 shadow-sm sm:p-6">

                                <h2 className="font-serif text-lg font-bold text-navy">
                                    Hours Logged
                                </h2>

                                <p className="mb-6 mt-1 text-xs text-slate">
                                    Your scheduled and completed hours
                                </p>

                                {/* Scheduled */}
                                <div className="mb-5">

                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="text-sm font-bold text-navy">
                                            Scheduled
                                        </span>

                                        <span className="text-sm text-slate">
                                            {hoursLogged.scheduled}h
                                        </span>
                                    </div>

                                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray/20">
                                        <div
                                            className="h-full rounded-full bg-navy"
                                            style={{
                                                width: `${(hoursLogged.scheduled / 40) * 100}%`,
                                            }}
                                        />
                                    </div>

                                </div>

                                {/* Completed */}
                                <div className="mb-5">

                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="text-sm font-bold text-navy">
                                            Completed
                                        </span>

                                        <span className="text-sm text-slate">
                                            {hoursLogged.completed}h
                                        </span>
                                    </div>

                                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray/20">
                                        <div
                                            className="h-full rounded-full bg-gold"
                                            style={{
                                                width: `${(hoursLogged.completed / 40) * 100}%`,
                                            }}
                                        />
                                    </div>

                                </div>

                                {/* Available */}
                                <div>

                                    <div className="mb-2 flex items-center justify-between">
                                        <span className="text-sm font-bold text-navy">
                                            Available
                                        </span>

                                        <span className="text-sm text-slate">
                                            {hoursLogged.available}h
                                        </span>
                                    </div>

                                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray/20">
                                        <div
                                            className="h-full rounded-full bg-slate"
                                            style={{
                                                width: `${(hoursLogged.available / 40) * 100}%`,
                                            }}
                                        />
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

export default StaffReports;