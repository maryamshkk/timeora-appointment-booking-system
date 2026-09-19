import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
    Calendar,
    CalendarCheck,
    CheckCircle2,
    ChevronRight,
    Clock,
    Download,
    UserX,
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
import { useAppointmentReport } from "../../hooks/company/useReports";

const statusColors = {
    completed: "#16a34a",
    pending: "#3b82f6",
    accepted: "#0ea5e9",
    cancelled: "#ef4444",
    rejected: "#d97706",
    rescheduled: "#8b5cf6",
};

const getStatusStyle = (status) => {
    const s = (status || "").toLowerCase();
    if (s === "completed") return "bg-green-50 text-green-700";
    if (s === "pending") return "bg-blue-50 text-blue-700";
    if (s === "accepted") return "bg-sky-50 text-sky-700";
    if (s === "cancelled") return "bg-red-50 text-red-600";
    if (s === "rejected") return "bg-gold/15 text-amber-700";
    if (s === "rescheduled") return "bg-purple-50 text-purple-700";
    return "bg-gray/10 text-slate";
};

function AppointmentReport() {
    const [periodFilter, setPeriodFilter] = useState("month");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [dateRange, setDateRange] = useState({ start: "2026-08-01", end: "2026-08-21" });
    const [staffFilter, setStaffFilter] = useState("all");
    const [serviceFilter, setServiceFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);

    const {
        data: appointmentResponse,
        isLoading,
        isError,
        error,
    } = useAppointmentReport({
        from: dateRange.start,
        to: dateRange.end,
        staffId: staffFilter !== "all" ? staffFilter : undefined,
        serviceId: serviceFilter !== "all" ? serviceFilter : undefined,
        status: statusFilter !== "all" ? statusFilter : undefined,
        page: currentPage,
    });

    const reportData = appointmentResponse?.data;
    const summary = reportData?.summary || {};
    const appointments = reportData?.appointments || [];
    const pagination = reportData?.pagination || {};

    const statCards = useMemo(() => {
        return [
            { label: "TOTAL APPOINTMENTS", value: summary.total ?? 0, icon: CalendarCheck, iconBg: "bg-gray/10", iconColor: "text-slate" },
            { label: "COMPLETED", value: summary.completed ?? 0, icon: CheckCircle2, iconBg: "bg-green-50", iconColor: "text-green-600" },
            { label: "CANCELLED", value: summary.cancelled ?? 0, icon: XCircle, iconBg: "bg-red-50", iconColor: "text-red-500" },
            { label: "REJECTED", value: summary.rejected ?? 0, icon: UserX, iconBg: "bg-gold/15", iconColor: "text-amber-600" },
            { label: "PENDING", value: summary.pending ?? 0, icon: Clock, iconBg: "bg-gray/10", iconColor: "text-slate" },
        ];
    }, [summary]);

    const statusData = useMemo(() => {
        return [
            { status: "Completed", count: summary.completed ?? 0 },
            { status: "Pending", count: summary.pending ?? 0 },
            { status: "Accepted", count: summary.accepted ?? 0 },
            { status: "Cancelled", count: summary.cancelled ?? 0 },
            { status: "Rejected", count: summary.rejected ?? 0 },
            { status: "Rescheduled", count: summary.rescheduled ?? 0 },
        ].filter((row) => row.count > 0);
    }, [summary]);

    const trendData = useMemo(() => {
        const groups = {};
        appointments.forEach((a) => {
            const date = a.appointment_date;
            if (!date) return;
            if (!groups[date]) groups[date] = { appointments: 0, completed: 0 };
            groups[date].appointments += 1;
            if (a.status === "completed") groups[date].completed += 1;
        });

        return Object.entries(groups)
            .sort(([a], [b]) => a.localeCompare(b))
            .map(([date, stats]) => ({
                date: new Date(date).toLocaleDateString("en-GB", { day: "2-digit", month: "short" }),
                appointments: stats.appointments,
                completed: stats.completed,
            }));
    }, [appointments]);

    const getStaffName = (staff) => {
        if (!staff) return "—";
        return `${staff.first_name || ""} ${staff.last_name || ""}`.trim() || "—";
    };

    const getStatusColor = (status) => {
        const s = (status || "").toLowerCase();
        return statusColors[s] || "#000C1E";
    };

    const handleExport = async () => {
        // TODO: export endpoint not implemented yet
    };

    const apiErrorMessage = error?.response?.data?.message || error?.message || "";

    return (
        <div className="min-h-screen flex bg-beige">
            <div className="hidden lg:block lg:flex-shrink-0">
                <Sidebar companyName="Shifa Clinic" activeItem="Reports" />
            </div>

            {sidebarOpen && (
                <>
                    <button onClick={() => setSidebarOpen(false)} className="fixed inset-0 z-30 bg-navy/50 lg:hidden" aria-label="Close menu" />
                    <div className="fixed left-0 top-0 z-40 h-screen w-64 max-w-[80vw] overflow-y-auto lg:hidden">
                        <Sidebar companyName="Shifa Clinic" activeItem="Reports" />
                    </div>
                </>
            )}

            <div className="flex min-w-0 flex-1 flex-col">
                <Topbar onMenuClick={() => setSidebarOpen(true)} showBell simpleProfileIcon searchPlaceholder="Search..." />

                <main className="flex-1 bg-beige px-4 py-5 sm:px-6 md:px-8 md:py-6">
                    <div className="flex flex-wrap items-center gap-2 mb-5">
                        <Link to="/company/reports" className="text-xs font-bold uppercase tracking-wide text-slate hover:text-navy transition">Reports &amp; Analytics</Link>
                        <ChevronRight className="w-3 h-3 text-gray" />
                        <span className="text-xs text-navy">Appointment Report</span>
                    </div>

                    <div className="flex flex-col gap-5 mb-6 lg:flex-row lg:items-start lg:justify-between">
                        <div>
                            <h1 className="font-serif text-2xl text-navy sm:text-3xl md:text-4xl">Appointment Report</h1>
                            <p className="text-sm text-slate mt-1.5 max-w-[520px]">Detailed overview of scheduled, completed, cancelled, and missed appointments.</p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                            <div className="bg-white border border-gray/30 rounded-lg px-3 py-2 flex items-center gap-2 text-sm font-bold text-navy hover:border-navy transition">
                                <Calendar className="w-4 h-4 shrink-0 text-slate" />
                                <input type="date" value={dateRange.start} max={dateRange.end} onChange={(e) => { setDateRange({ ...dateRange, start: e.target.value }); setCurrentPage(1); }} className="bg-transparent text-xs font-bold text-navy outline-none w-[110px]" />
                                <span className="text-slate">—</span>
                                <input type="date" value={dateRange.end} min={dateRange.start} onChange={(e) => { setDateRange({ ...dateRange, end: e.target.value }); setCurrentPage(1); }} className="bg-transparent text-xs font-bold text-navy outline-none w-[110px]" />
                            </div>

                            <button onClick={handleExport} className="bg-navy text-white px-5 py-2.5 rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:bg-gold hover:text-navy transition">
                                <Download className="w-4 h-4" /> Export
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 border-b border-gray/20 pb-3 mb-6 overflow-x-auto">
                        {[{ key: "today", label: "Today" }, { key: "week", label: "This Week" }, { key: "month", label: "Monthly" }].map((p) => (
                            <button key={p.key} onClick={() => { setPeriodFilter(p.key); setCurrentPage(1); }} className={`text-sm font-bold whitespace-nowrap pb-3 -mb-3 border-b-2 transition ${periodFilter === p.key ? "text-navy border-navy" : "text-slate border-transparent hover:text-navy"}`}>
                                {p.label}
                            </button>
                        ))}
                    </div>

                    {isError && !isLoading && (
                        <div className="mb-4 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                            <p className="text-sm text-red-700">{apiErrorMessage || "Failed to load appointment report."}</p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                        {isLoading ? (
                            <div className="col-span-full flex items-center justify-center gap-3 rounded-xl border border-gray/20 bg-white py-10">
                                <Loader2 className="h-5 w-5 animate-spin text-navy" />
                                <span className="text-sm text-slate">Loading appointment report...</span>
                            </div>
                        ) : (
                            statCards.map((c) => (
                                <StatCard key={c.label} label={c.label} value={c.value} icon={c.icon} iconBg={c.iconBg} iconColor={c.iconColor} />
                            ))
                        )}
                    </div>

                    <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <div className="rounded-xl border border-gray/20 bg-white p-5 shadow-sm sm:p-6">
                            <h2 className="font-serif text-lg font-bold text-navy mb-1">Appointment Trend</h2>
                            <p className="text-xs text-slate mb-5">Scheduled vs completed</p>

                            <div className="h-[240px] w-full">
                                {trendData.length === 0 ? (
                                    <div className="flex h-full items-center justify-center">
                                        <p className="text-sm text-slate">No trend data available.</p>
                                    </div>
                                ) : (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#E4E2DD" />
                                            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#43474E" }} />
                                            <YAxis axisLine={false} tickLine={false} allowDecimals={false} tick={{ fontSize: 12, fill: "#43474E" }} />
                                            <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #C3C6CF", fontSize: 12 }} />
                                            <Area type="monotone" dataKey="appointments" stroke="#000C1E" strokeWidth={2} fill="#000C1E" fillOpacity={0.06} name="Appointments" />
                                            <Area type="monotone" dataKey="completed" stroke="#16a34a" strokeWidth={2} fill="#16a34a" fillOpacity={0.05} name="Completed" />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                )}
                            </div>
                        </div>

                        <div className="rounded-xl border border-gray/20 bg-white p-5 shadow-sm sm:p-6">
                            <h2 className="font-serif text-lg font-bold text-navy mb-1">Status Breakdown</h2>
                            <p className="text-xs text-slate mb-5">Appointments by status</p>

                            <div className="h-[240px] w-full">
                                {statusData.length === 0 ? (
                                    <div className="flex h-full items-center justify-center">
                                        <p className="text-sm text-slate">No status data available.</p>
                                    </div>
                                ) : (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={statusData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#E4E2DD" />
                                            <XAxis dataKey="status" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#43474E" }} />
                                            <YAxis axisLine={false} tickLine={false} allowDecimals={false} tick={{ fontSize: 12, fill: "#43474E" }} />
                                            <Tooltip cursor={{ fill: "rgba(254,212,136,0.15)" }} contentStyle={{ borderRadius: 8, border: "1px solid #C3C6CF", fontSize: 12 }} />
                                            <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                                                {statusData.map((entry) => (
                                                    <Cell key={entry.status} fill={getStatusColor(entry.status)} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-gray/20 shadow-sm overflow-hidden">
                        <div className="p-5 sm:p-6 border-b border-gray/20">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                <div>
                                    <h2 className="font-serif text-lg text-navy sm:text-xl">Appointment Details</h2>
                                    <p className="text-xs text-slate mt-1">All appointments within the selected reporting period.</p>
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }} className="h-9 rounded-lg border border-gray/30 bg-white px-3 text-xs font-bold text-navy outline-none focus:border-navy">
                                        <option value="all">All Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="accepted">Accepted</option>
                                        <option value="completed">Completed</option>
                                        <option value="cancelled">Cancelled</option>
                                        <option value="rejected">Rejected</option>
                                        <option value="rescheduled">Rescheduled</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[1100px]">
                                <thead>
                                    <tr className="bg-beige/50">
                                        {["Date", "Time", "Customer", "Service", "Staff", "Status"].map((h) => (
                                            <th key={h} className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">{h}</th>
                                        ))}
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray/10">
                                    {isLoading ? (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-12 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Loader2 className="h-5 w-5 animate-spin text-navy" />
                                                    <span className="text-sm text-slate">Loading appointments...</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : appointments.length > 0 ? (
                                        appointments.map((a) => (
                                            <tr key={a.id} className="hover:bg-beige/30 transition">
                                                <td className="px-6 py-4 text-sm font-bold text-navy">{a.appointment_date}</td>
                                                <td className="px-6 py-4 text-sm text-slate">{a.start_time || "—"}</td>
                                                <td className="px-6 py-4">
                                                    <p className="text-sm font-bold text-navy">{a.customer?.name || "—"}</p>
                                                    <p className="text-xs text-slate mt-0.5">{a.customer?.email || ""}</p>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate">{a.service?.name || "—"}</td>
                                                <td className="px-6 py-4 text-sm text-slate">{getStaffName(a.staff)}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold uppercase ${getStatusStyle(a.status)}`}>
                                                        {a.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="px-6 py-12 text-center">
                                                <p className="text-sm font-bold text-navy">No appointments found.</p>
                                                <p className="text-xs text-slate mt-1">Try changing your filters.</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-5 sm:px-6 py-4 border-t border-gray/20">
                            <p className="text-xs text-slate">
                                Showing {appointments.length} of {pagination.total ?? 0} entries
                                {pagination.last_page > 1 && ` (Page ${pagination.current_page} of ${pagination.last_page})`}
                            </p>

                            <div className="flex items-center gap-1 flex-wrap">
                                <button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} className="px-3 py-1.5 rounded-md text-xs font-bold text-slate hover:bg-beige disabled:opacity-40 disabled:cursor-not-allowed transition">Prev</button>
                                <span className="px-3 text-xs font-bold text-navy">
                                    {pagination.current_page ?? 1} / {pagination.last_page ?? 1}
                                </span>
                                <button
                                    disabled={currentPage >= (pagination.last_page ?? 1)}
                                    onClick={() => setCurrentPage((p) => p + 1)}
                                    className="px-3 py-1.5 rounded-md text-xs font-bold text-slate hover:bg-beige disabled:opacity-40 disabled:cursor-not-allowed transition"
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

export default AppointmentReport;