import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
    Calendar,
    CalendarCheck,
    CheckCircle2,
    ChevronDown,
    ChevronRight,
    Clock,
    Download,
    Users,
    XCircle,
    Loader2,
    AlertCircle,
} from "lucide-react";
import {
    AreaChart, Area, BarChart, Bar, Cell,
    CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import StatCard from "../../components/dashboard/StatCard";
import { useStaffReport } from "../../hooks/company/useReports";

const staffTrendData = [
    { date: "01 Aug", appointments: 14, completed: 11 },
    { date: "05 Aug", appointments: 18, completed: 15 },
    { date: "09 Aug", appointments: 22, completed: 18 },
    { date: "13 Aug", appointments: 26, completed: 21 },
    { date: "17 Aug", appointments: 24, completed: 20 },
    { date: "21 Aug", appointments: 29, completed: 25 },
];

const roleData = [
    { role: "Specialist", count: 42 },
    { role: "Consultant", count: 50 },
    { role: "Therapist", count: 32 },
    { role: "Physician", count: 19 },
];

const roleColors = {
    Specialist: "#000C1E",
    Consultant: "#16a34a",
    Therapist: "#3b82f6",
    Physician: "#d97706",
};

function StaffReport() {
    const [periodFilter, setPeriodFilter] = useState("month");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [dateRange, setDateRange] = useState({
        start: "2026-08-01",
        end: "2026-08-21",
    });

    const [staffFilter, setStaffFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);

    const {
        data: staffResponse,
        isLoading,
        isError,
        error,
    } = useStaffReport({
        from: dateRange.start,
        to: dateRange.end,
    });

    const staffRows = useMemo(() => {
        const raw = staffResponse?.data || [];

        return raw.map((member) => ({
            id: member.id,
            staffId: member.staff_id,
            name: `${member.first_name || ""} ${member.last_name || ""}`.trim(),
            role: member.role?.name || "—",
            appointments: member.total_appointments ?? 0,
            completed: member.completed_appointments ?? 0,
            cancelled: member.cancelled_appointments ?? 0,
            rejected: member.rejected_appointments ?? 0,
            pending: member.pending_appointments ?? 0,
            completionRate: member.completion_rate ?? 0,
        }));
    }, [staffResponse]);

    const filteredStaff = useMemo(() => {
        if (staffFilter === "all") return staffRows;
        return staffRows.filter((row) => row.name === staffFilter);
    }, [staffRows, staffFilter]);

    const statCards = useMemo(() => {
        const totalAppointments = staffRows.reduce(
            (sum, row) => sum + row.appointments,
            0
        );
        const totalCompleted = staffRows.reduce(
            (sum, row) => sum + row.completed,
            0
        );

        return [
            {
                label: "TOTAL STAFF",
                value: staffRows.length,
                icon: Users,
                iconBg: "bg-gray/10",
                iconColor: "text-slate",
            },
            {
                label: "ACTIVE STAFF",
                value: staffRows.length,
                icon: CheckCircle2,
                iconBg: "bg-green-50",
                iconColor: "text-green-600",
            },
            {
                label: "TOTAL APPOINTMENTS",
                value: totalAppointments,
                icon: CalendarCheck,
                iconBg: "bg-gray/10",
                iconColor: "text-slate",
            },
            {
                label: "COMPLETED",
                value: totalCompleted,
                icon: CheckCircle2,
                iconBg: "bg-green-50",
                iconColor: "text-green-600",
            },
            {
                label: "TOTAL ROWS",
                value: staffRows.length,
                icon: Clock,
                iconBg: "bg-gold/15",
                iconColor: "text-amber-600",
            },
        ];
    }, [staffRows]);

    function handleExport(event) {
        event.preventDefault();
        // TODO: no export endpoint yet
    }

    const apiErrorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "";

    return (
        <div className="min-h-screen flex bg-beige">
            <div className="hidden lg:block lg:flex-shrink-0">
                <Sidebar companyName="Shifa Clinic" activeItem="Reports" />
            </div>

            {sidebarOpen && (
                <>
                    <button
                        type="button"
                        onClick={() => setSidebarOpen(false)}
                        className="fixed inset-0 z-30 bg-navy/50 lg:hidden"
                        aria-label="Close menu"
                    />

                    <div className="fixed left-0 top-0 z-40 h-screen w-64 max-w-[80vw] overflow-y-auto lg:hidden">
                        <Sidebar companyName="Shifa Clinic" activeItem="Reports" />
                    </div>
                </>
            )}

            <div className="flex min-w-0 flex-1 flex-col">
                <Topbar
                    onMenuClick={() => setSidebarOpen(true)}
                    showBell
                    simpleProfileIcon
                    searchPlaceholder="Search..."
                />

                <main className="flex-1 bg-beige px-4 py-5 sm:px-6 md:px-8 md:py-6">
                    <div className="flex flex-wrap items-center gap-2 mb-5">
                        <Link
                            to="/company/reports"
                            className="text-xs font-bold uppercase tracking-wide text-slate hover:text-navy transition"
                        >
                            Reports &amp; Analytics
                        </Link>

                        <ChevronRight className="w-3 h-3 text-gray" />

                        <span className="text-xs text-navy">Staff Report</span>
                    </div>

                    <div className="flex flex-col gap-5 mb-6 lg:flex-row lg:items-start lg:justify-between">
                        <div>
                            <h1 className="font-serif text-2xl text-navy sm:text-3xl md:text-4xl">
                                Staff Report
                            </h1>

                            <p className="text-sm text-slate mt-1.5 max-w-[520px]">
                                Review staff performance, working hours,
                                appointments, and revenue generated.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:flex-col lg:items-end">
                            <button
                                type="button"
                                className="bg-white border border-gray/30 rounded-lg px-4 py-2.5 flex items-center justify-center gap-2 text-sm font-bold text-navy hover:border-navy transition"
                            >
                                <Calendar className="w-4 h-4 shrink-0" />
                                <span className="whitespace-nowrap">
                                    {dateRange.start} — {dateRange.end}
                                </span>
                                <ChevronDown className="w-3.5 h-3.5 shrink-0" />
                            </button>

                            <button
                                type="button"
                                onClick={handleExport}
                                className="bg-navy text-white px-5 py-2.5 rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:bg-gold hover:text-navy transition"
                            >
                                <Download className="w-4 h-4" />
                                Export
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 border-b border-gray/20 pb-3 mb-6 overflow-x-auto">
                        {[
                            { key: "today", label: "Today" },
                            { key: "week", label: "This Week" },
                            { key: "month", label: "Monthly" },
                        ].map((period) => {
                            const isActive = periodFilter === period.key;

                            return (
                                <button
                                    key={period.key}
                                    type="button"
                                    onClick={() => {
                                        setPeriodFilter(period.key);
                                        setCurrentPage(1);
                                    }}
                                    className={`text-sm font-bold whitespace-nowrap pb-3 -mb-3 border-b-2 transition ${
                                        isActive
                                            ? "text-navy border-navy"
                                            : "text-slate border-transparent hover:text-navy"
                                    }`}
                                >
                                    {period.label}
                                </button>
                            );
                        })}
                    </div>

                    {isError && !isLoading && (
                        <div className="mb-4 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                            <p className="text-sm text-red-700">
                                {apiErrorMessage || "Failed to load staff report."}
                            </p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                        {isLoading ? (
                            <div className="col-span-full flex items-center justify-center gap-3 rounded-xl border border-gray/20 bg-white py-10">
                                <Loader2 className="h-5 w-5 animate-spin text-navy" />
                                <span className="text-sm text-slate">Loading staff report...</span>
                            </div>
                        ) : (
                            statCards.map((card) => (
                                <StatCard
                                    key={card.label}
                                    label={card.label}
                                    value={card.value}
                                    icon={card.icon}
                                    iconBg={card.iconBg}
                                    iconColor={card.iconColor}
                                />
                            ))
                        )}
                    </div>

                    <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <div className="rounded-xl border border-gray/20 bg-white p-5 shadow-sm sm:p-6">
                            <h2 className="font-serif text-lg font-bold text-navy mb-1">
                                Staff Trend
                            </h2>
                            <p className="text-xs text-slate mb-5">
                                Appointments vs completed
                            </p>

                            <div className="h-[240px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart
                                        data={staffTrendData}
                                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                                    >
                                        <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#E4E2DD" />
                                        <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#43474E" }} />
                                        <YAxis axisLine={false} tickLine={false} allowDecimals={false} tick={{ fontSize: 12, fill: "#43474E" }} />
                                        <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #C3C6CF", fontSize: 12 }} />
                                        <Area type="monotone" dataKey="appointments" stroke="#000C1E" strokeWidth={2} fill="#000C1E" fillOpacity={0.06} name="Appointments" />
                                        <Area type="monotone" dataKey="completed" stroke="#16a34a" strokeWidth={2} fill="#16a34a" fillOpacity={0.05} name="Completed" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="rounded-xl border border-gray/20 bg-white p-5 shadow-sm sm:p-6">
                            <h2 className="font-serif text-lg font-bold text-navy mb-1">
                                Role Breakdown
                            </h2>
                            <p className="text-xs text-slate mb-5">
                                Appointments by staff role
                            </p>

                            <div className="h-[240px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={roleData}
                                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                                    >
                                        <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#E4E2DD" />
                                        <XAxis dataKey="role" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#43474E" }} />
                                        <YAxis axisLine={false} tickLine={false} allowDecimals={false} tick={{ fontSize: 12, fill: "#43474E" }} />
                                        <Tooltip cursor={{ fill: "rgba(254,212,136,0.15)" }} contentStyle={{ borderRadius: 8, border: "1px solid #C3C6CF", fontSize: 12 }} />
                                        <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                                            {roleData.map((entry) => (
                                                <Cell key={entry.role} fill={roleColors[entry.role]} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-gray/20 shadow-sm overflow-hidden">
                        <div className="p-5 sm:p-6 border-b border-gray/20">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                <div>
                                    <h2 className="font-serif text-lg text-navy sm:text-xl">
                                        Staff Performance
                                    </h2>
                                    <p className="text-xs text-slate mt-1">
                                        Detailed performance breakdown for each staff member.
                                    </p>
                                </div>

                                <select
                                    value={staffFilter}
                                    onChange={(event) => {
                                        setStaffFilter(event.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="h-9 w-full sm:w-auto rounded-lg border border-gray/30 bg-white px-3 text-xs font-bold text-navy outline-none focus:border-navy"
                                >
                                    <option value="all">All Staff</option>
                                    {staffRows.map((member) => (
                                        <option key={member.id} value={member.name}>
                                            {member.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[1100px]">
                                <thead>
                                    <tr className="bg-beige/50">
                                        <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">Staff</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">Appointments</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">Completed</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">Cancelled</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">Rejected</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">Completion</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">Hours</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">Revenue</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray/10">
                                    {filteredStaff.length > 0 ? (
                                        filteredStaff.map((member) => (
                                            <tr key={member.id} className="hover:bg-beige/30 transition">
                                                <td className="px-6 py-4">
                                                    <p className="text-sm font-bold text-navy">
                                                        {member.name}
                                                    </p>
                                                    <p className="text-xs text-slate mt-0.5">
                                                        {member.role}
                                                    </p>
                                                    <p className="text-[11px] text-gray mt-0.5">
                                                        {member.staffId}
                                                    </p>
                                                </td>

                                                <td className="px-6 py-4 text-sm font-bold text-navy">
                                                    {member.appointments}
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-green-700">
                                                        <CheckCircle2 className="w-4 h-4" />
                                                        {member.completed}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-red-600">
                                                        <XCircle className="w-4 h-4" />
                                                        {member.cancelled}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4 text-sm font-bold text-amber-700">
                                                    {member.rejected}
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="w-28">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <span className="text-xs font-bold text-navy">
                                                                {member.completionRate}%
                                                            </span>
                                                        </div>

                                                        <div className="h-1.5 bg-beige rounded-full overflow-hidden">
                                                            <div
                                                                className="h-full bg-navy rounded-full"
                                                                style={{
                                                                    width: `${member.completionRate}%`,
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 text-sm text-gray">—</td>

                                                <td className="px-6 py-4 text-sm text-gray">—</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="8" className="px-6 py-12 text-center">
                                                <p className="text-sm font-bold text-navy">
                                                    No staff data found.
                                                </p>
                                                <p className="text-xs text-slate mt-1">
                                                    Try changing the selected staff member.
                                                </p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-5 sm:px-6 py-4 border-t border-gray/20">
                            <p className="text-xs text-slate">
                                Showing 1 to {filteredStaff.length} of {staffRows.length} staff
                            </p>

                            <div className="flex items-center gap-1 flex-wrap">
                                <button
                                    type="button"
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                                    className="px-3 py-1.5 rounded-md text-xs font-bold text-slate hover:bg-beige disabled:opacity-40 disabled:cursor-not-allowed transition"
                                >
                                    Prev
                                </button>

                                {[1, 2, 3].map((page) => (
                                    <button
                                        key={page}
                                        type="button"
                                        onClick={() => setCurrentPage(page)}
                                        className={`w-8 h-8 rounded-md text-xs font-bold transition ${
                                            currentPage === page
                                                ? "bg-navy text-white"
                                                : "text-slate hover:bg-beige"
                                        }`}
                                    >
                                        {page}
                                    </button>
                                ))}

                                <span className="px-2 text-xs text-slate">...</span>

                                <button
                                    type="button"
                                    onClick={() => setCurrentPage((page) => page + 1)}
                                    className="px-3 py-1.5 rounded-md text-xs font-bold text-slate hover:bg-beige transition"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default StaffReport;