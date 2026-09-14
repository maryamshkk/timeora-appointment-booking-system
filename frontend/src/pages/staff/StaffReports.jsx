import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
    Calendar,
    ChevronDown,
    MoreHorizontal,
    Download,
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

    const [busiestDays] = useState([
        { day: "Friday", count: 12 },
        { day: "Thursday", count: 10 },
        { day: "Wednesday", count: 8 },
    ]);

    const [appointmentsByService] = useState([
        { service: "Consultation", count: 22 },
        { service: "Follow-up", count: 14 },
        { service: "Therapy Session", count: 8 },
    ]);

    const [recentActivity] = useState([
        {
            id: 1,
            date: "Oct 28, 2026",
            time: "09:00 AM",
            customer: "Michael Chen",
            customerId: 101,
            service: "Consultation",
            status: "Completed",
            appointmentId: 201,
        },
        {
            id: 2,
            date: "Oct 28, 2026",
            time: "11:30 AM",
            customer: "Sarah Jenkins",
            customerId: 102,
            service: "Therapy Session",
            status: "Completed",
            appointmentId: 202,
        },
        {
            id: 3,
            date: "Oct 27, 2026",
            time: "02:00 PM",
            customer: "David Ross",
            customerId: 103,
            service: "Follow-up",
            status: "Cancelled",
            appointmentId: 203,
        },
        {
            id: 4,
            date: "Oct 27, 2026",
            time: "04:15 PM",
            customer: "Elena Rodriguez",
            customerId: 104,
            service: "Consultation",
            status: "No-show",
            appointmentId: 204,
        },
    ]);

    const currentStaff = {
        name: "Dr. Sara Ahmed",
        role: "Doctor",
        avatarUrl: "",
        companyName: "Shifa Clinic",
    };

    const completionRate = Math.round(
        (stats.completed / stats.totalAppointments) * 100
    );

    const completedWidth =
        (stats.completed / stats.totalAppointments) * 100;

    const cancelledWidth =
        (stats.cancelled / stats.totalAppointments) * 100;

    const noShowWidth =
        (stats.noShows / stats.totalAppointments) * 100;

    useEffect(() => {
        function handleOutsideClick(event) {
            if (!event.target.closest("[data-date-range]")) {
                setIsDateRangeOpen(false);
            }
        }

        function handleEscape(event) {
            if (event.key === "Escape") {
                setIsDateRangeOpen(false);
            }
        }

        document.addEventListener("mousedown", handleOutsideClick);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    function handleDateRangeChange(range) {
        setDateRange(range);
        setIsDateRangeOpen(false);

        // TODO: Refetch all report data for the selected date range.
    }

    function handleExportReport() {
        // TODO: Generate and download CSV/PDF report.
    }

    function handleSignOut() {
        navigate("/login");
    }

    return (
        <div className="min-h-screen bg-beige flex">

            <StaffSidebar
                companyName={currentStaff.companyName}
                currentStaff={currentStaff}
                activeItem="Reports"
                handleSignOut={handleSignOut}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <div className="flex min-w-0 flex-1 flex-col">

                <StaffTopbar
                    avatarUrl={currentStaff.avatarUrl}
                    onMenuClick={() => setSidebarOpen(true)}
                    onSearchClick={() => {}}
                    onNotificationsClick={() => navigate("/staff/notifications")}
                    onSettingsClick={() => navigate("/staff/settings")}
                />

                <main className="flex-1 bg-beige px-4 py-6 sm:px-6 md:px-8">
                    <div className="mx-auto w-full max-w-7xl">

                        {/* Header */}
                        <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">

                            <div>
                                <h1 className="font-serif text-2xl text-navy sm:text-3xl lg:text-4xl">
                                    My Reports
                                </h1>

                                <p className="mt-1.5 text-sm text-slate">
                                    Track your appointment activity and performance.
                                </p>
                            </div>

                            <div className="relative" data-date-range>

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

                                {isDateRangeOpen && (
                                    <div
                                        className="
                                            absolute right-0 top-full z-30 mt-2
                                            w-48 overflow-hidden rounded-lg border
                                            border-gray/30 bg-white shadow-lg
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
                                                    w-full px-4 py-3 text-left text-sm transition
                                                    ${
                                                        dateRange === range
                                                            ? "bg-beige font-bold text-navy"
                                                            : "text-slate hover:bg-beige hover:text-navy"
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
                                delta={stats.totalDelta}
                                deltaColor="bg-green-50 text-green-700"
                            />

                            <StatCard
                                value={stats.completed}
                                label="Completed"
                                icon={CheckCircle2}
                                iconBg="bg-green-50"
                                iconColor="text-green-700"
                            />

                            <StatCard
                                value={stats.cancelled}
                                label="Cancelled"
                                icon={XCircle}
                                iconBg="bg-red-50"
                                iconColor="text-red-600"
                            />

                            <StatCard
                                value={stats.noShows}
                                label="No-Shows"
                                icon={UserX}
                                iconBg="bg-gold/15"
                                iconColor="text-amber-600"
                            />

                        </div>

                        {/* Appointment Trend + Completion Rate side by side on lg */}
                        <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">

                            {/* Appointment Trend (takes 2 columns) */}
                            <div className="rounded-xl border border-gray/20 bg-white p-5 shadow-sm sm:p-6 lg:col-span-2">

                                <div className="mb-6 flex items-center justify-between">

                                    <h2 className="font-serif text-lg font-bold text-navy sm:text-xl">
                                        Appointment Trend
                                    </h2>

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

                                <div className="h-[240px] w-full sm:h-[280px]">

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

                            {/* Completion Rate (right column, matches screenshot) */}
                            <div className="rounded-xl border border-gray/20 bg-white p-5 shadow-sm sm:p-6">

                                <h2 className="font-serif text-lg font-bold text-navy">
                                    Completion Rate
                                </h2>

                                <div className="mt-5 flex items-center gap-3">

                                    <span className="font-serif text-4xl font-bold text-navy">
                                        {completionRate}%
                                    </span>

                                    <div className="flex h-2.5 flex-1 overflow-hidden rounded-full bg-gray/20">

                                        <div
                                            className="h-full bg-navy"
                                            style={{ width: `${completedWidth}%` }}
                                        />

                                        <div
                                            className="h-full bg-gold"
                                            style={{ width: `${cancelledWidth}%` }}
                                        />

                                        <div
                                            className="h-full bg-red-500"
                                            style={{ width: `${noShowWidth}%` }}
                                        />

                                    </div>

                                </div>

                                <div className="mt-5 space-y-3">

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="h-2 w-2 rounded-full bg-navy" />
                                            <span className="text-sm text-slate">
                                                Completed
                                            </span>
                                        </div>
                                        <span className="text-sm font-bold text-navy">
                                            {stats.completed}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="h-2 w-2 rounded-full bg-gold" />
                                            <span className="text-sm text-slate">
                                                Cancelled
                                            </span>
                                        </div>
                                        <span className="text-sm font-bold text-navy">
                                            {stats.cancelled}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <span className="h-2 w-2 rounded-full bg-red-500" />
                                            <span className="text-sm text-slate">
                                                No-show
                                            </span>
                                        </div>
                                        <span className="text-sm font-bold text-navy">
                                            {stats.noShows}
                                        </span>
                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* Hours Logged + Busiest Days + Appointments by Service row */}
                        <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-3">

                            {/* Hours Logged */}
                            <div className="rounded-xl border border-gray/20 bg-white p-5 shadow-sm sm:p-6">

                                <h2 className="font-serif text-lg font-bold text-navy">
                                    Hours Logged
                                </h2>

                                <div className="mt-5 space-y-4">

                                    <div>
                                        <div className="mb-1.5 flex items-center justify-between">
                                            <span className="text-sm text-slate">
                                                Scheduled
                                            </span>

                                            <span className="text-sm font-bold text-navy">
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

                                    <div>
                                        <div className="mb-1.5 flex items-center justify-between">
                                            <span className="text-sm text-slate">
                                                Completed
                                            </span>

                                            <span className="text-sm font-bold text-navy">
                                                {hoursLogged.completed}h
                                            </span>
                                        </div>

                                        <div className="h-2 w-full overflow-hidden rounded-full bg-gray/20">
                                            <div
                                                className="h-full rounded-full bg-navy"
                                                style={{
                                                    width: `${(hoursLogged.completed / 40) * 100}%`,
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <div className="mb-1.5 flex items-center justify-between">
                                            <span className="text-sm text-slate">
                                                Available
                                            </span>

                                            <span className="text-sm font-bold text-navy">
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

                            {/* Busiest Days (spans 2 columns on lg) */}
                            <div className="rounded-xl border border-gray/20 bg-white p-5 shadow-sm sm:p-6 lg:col-span-2">

                                <h2 className="font-serif text-lg font-bold text-navy">
                                    Busiest Days
                                </h2>

                                <div className="mt-5 space-y-4">

                                    {busiestDays.map((item) => {
                                        const barWidth =
                                            (item.count / 12) * 100;

                                        return (
                                            <div
                                                key={item.day}
                                                className="flex items-center gap-4"
                                            >

                                                <span className="w-24 flex-shrink-0 text-sm font-bold text-navy">
                                                    {item.day}
                                                </span>

                                                <div className="h-3 flex-1 overflow-hidden rounded-full bg-gray/20">
                                                    <div
                                                        className="h-full rounded-full bg-navy"
                                                        style={{ width: `${barWidth}%` }}
                                                    />
                                                </div>

                                                <span className="w-10 flex-shrink-0 text-right text-sm font-bold text-navy">
                                                    {item.count}
                                                </span>

                                            </div>
                                        );
                                    })}

                                </div>

                            </div>

                        </div>

                        {/* Appointments by Service (full width row) */}
                        <div className="mb-6 rounded-xl border border-gray/20 bg-white p-5 shadow-sm sm:p-6">

                            <h2 className="font-serif text-lg font-bold text-navy">
                                Appointments by Service
                            </h2>

                            <div className="mt-6 flex h-48 items-end justify-around gap-5">

                                {appointmentsByService.map((item, index) => {
                                    const maxCount = Math.max(
                                        ...appointmentsByService.map(
                                            (service) => service.count
                                        )
                                    );

                                    const barHeight =
                                        (item.count / maxCount) * 100;

                                    const barClass =
                                        index === 0
                                            ? "bg-navy"
                                            : index === 1
                                            ? "bg-slate"
                                            : "bg-gold";

                                    return (
                                        <div
                                            key={item.service}
                                            className="flex h-full flex-1 flex-col items-center justify-end"
                                        >

                                            <span className="mb-2 text-xs font-bold text-navy">
                                                {item.count}
                                            </span>

                                            <div className="flex h-32 w-full max-w-[80px] items-end">
                                                <div
                                                    className={`w-full rounded-t-md ${barClass}`}
                                                    style={{
                                                        height: `${barHeight}%`,
                                                    }}
                                                />
                                            </div>

                                            <span className="mt-3 text-center text-xs leading-tight text-slate">
                                                {item.service}
                                            </span>

                                        </div>
                                    );
                                })}

                            </div>

                        </div>

                        {/* Recent Activity */}
                        <div className="rounded-xl border border-gray/20 bg-white shadow-sm">

                            <div className="border-b border-gray/20 p-5 sm:p-6">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                                    <h2 className="font-serif text-lg font-bold text-navy sm:text-xl">
                                        Recent Activity
                                    </h2>

                                    <button
                                        type="button"
                                        onClick={handleExportReport}
                                        className="
                                            inline-flex items-center justify-center gap-2
                                            rounded-lg border-2 border-navy bg-white
                                            px-4 py-2 text-sm font-bold text-navy
                                            transition hover:bg-navy hover:text-white
                                        "
                                    >
                                        Export Report
                                    </button>

                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <div className="min-w-[900px]">

                                    <div className="grid grid-cols-[140px_120px_1.5fr_1.5fr_130px_80px] gap-4 border-b border-gray/20 bg-beige/50 px-6 py-3">
                                        <span className="text-xs font-bold uppercase tracking-wide text-slate">
                                            Date
                                        </span>
                                        <span className="text-xs font-bold uppercase tracking-wide text-slate">
                                            Time
                                        </span>
                                        <span className="text-xs font-bold uppercase tracking-wide text-slate">
                                            Customer
                                        </span>
                                        <span className="text-xs font-bold uppercase tracking-wide text-slate">
                                            Service
                                        </span>
                                        <span className="text-xs font-bold uppercase tracking-wide text-slate">
                                            Status
                                        </span>
                                        <span className="text-xs font-bold uppercase tracking-wide text-slate">
                                            Action
                                        </span>
                                    </div>

                                    <div>
                                        {recentActivity.map((activity) => (
                                            <div
                                                key={activity.id}
                                                className="
                                                    grid grid-cols-[140px_120px_1.5fr_1.5fr_130px_80px]
                                                    items-center gap-4 border-b
                                                    border-gray/10 px-6 py-4 transition
                                                    last:border-b-0 hover:bg-beige/30
                                                "
                                            >
                                                <span className="text-sm text-navy">
                                                    {activity.date}
                                                </span>

                                                <span className="text-sm text-slate">
                                                    {activity.time}
                                                </span>

                                                <Link
                                                    to={`/staff/customers/${activity.customerId}`}
                                                    className="truncate text-sm font-bold text-navy transition hover:text-gold"
                                                >
                                                    {activity.customer}
                                                </Link>

                                                <span className="truncate text-sm text-slate">
                                                    {activity.service}
                                                </span>

                                                <span
                                                    className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-bold ${
                                                        activity.status === "Completed"
                                                            ? "bg-green-50 text-green-700"
                                                            : activity.status === "Cancelled"
                                                            ? "bg-gold/20 text-amber-700"
                                                            : "bg-red-50 text-red-600"
                                                    }`}
                                                >
                                                    {activity.status}
                                                </span>

                                                <Link
                                                    to={`/staff/appointments/${activity.appointmentId}`}
                                                    className="text-sm font-bold text-navy transition hover:text-gold"
                                                >
                                                    View
                                                </Link>
                                            </div>
                                        ))}
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