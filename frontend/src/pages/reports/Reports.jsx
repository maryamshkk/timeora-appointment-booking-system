import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
    Calendar,
    CalendarDays,
    CheckCircle2,
    ChevronDown,
    ChevronRight,
    Clock,
    Download,
    UserX,
    XCircle,
    ArrowRight,
    Loader2,
    AlertCircle,
} from "lucide-react";
import {
    BarChart, Bar, Cell,
    CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import StatCard from "../../components/dashboard/StatCard";
import {
    useReportOverview,
    useBookingReport,
} from "../../hooks/company/useReports";

const statusColors = {
    Completed: "#16a34a",
    Pending: "#3b82f6",
    Cancelled: "#ef4444",
    Accepted: "#0ea5e9",
    Rejected: "#d97706",
    Rescheduled: "#8b5cf6",
};

function Reports() {
    const [periodFilter, setPeriodFilter] = useState("month");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [dateRange, setDateRange] = useState({ start: "2026-08-01", end: "2026-08-21" });

    const { data: overviewResponse, isLoading, isError, error } = useReportOverview({
        from: dateRange.start,
        to: dateRange.end,
    });

    const {
        data: bookingsResponse,
        isLoading: isBookingsLoading,
        isError: isBookingsError,
        error: bookingsError,
    } = useBookingReport({
        from: dateRange.start,
        to: dateRange.end,
    });

    const overview = overviewResponse?.data;
    const bookingsData = bookingsResponse?.data;

    const statusData = useMemo(() => {
        const sb = bookingsData?.status_breakdown || {};
        return Object.entries(sb).map(([status, count]) => ({
            status: status.charAt(0).toUpperCase() + status.slice(1),
            count: Number(count),
        }));
    }, [bookingsData]);

    useEffect(() => {
        const onDown = (e) => !e.target.closest("[data-date-picker]") && setIsDatePickerOpen(false);
        const onEsc = (e) => e.key === "Escape" && setIsDatePickerOpen(false);
        document.addEventListener("mousedown", onDown);
        document.addEventListener("keydown", onEsc);
        return () => {
            document.removeEventListener("mousedown", onDown);
            document.removeEventListener("keydown", onEsc);
        };
    }, []);

    const statCards = useMemo(() => {
        const a = overview?.appointments || {};
        return [
            { label: "TOTAL APPTS", value: a.total ?? 0, icon: CalendarDays, iconBg: "bg-gray/10", iconColor: "text-slate" },
            { label: "COMPLETED", value: a.completed ?? 0, icon: CheckCircle2, iconBg: "bg-green-50", iconColor: "text-green-600" },
            { label: "CANCELLED", value: a.cancelled ?? 0, icon: XCircle, iconBg: "bg-red-50", iconColor: "text-red-500" },
            { label: "REJECTED", value: a.rejected ?? 0, icon: UserX, iconBg: "bg-gold/15", iconColor: "text-amber-600" },
            { label: "PENDING", value: a.pending ?? 0, icon: Clock, iconBg: "bg-gray/10", iconColor: "text-slate" },
        ];
    }, [overview]);

    const reportCategories = useMemo(() => {
        const appts = overview?.appointments?.total ?? 0;
        const staff = overview?.staff?.total ?? 0;
        const services = overview?.services?.total ?? 0;
        const customers = overview?.customers?.total ?? 0;

        return [
            {
                title: "Appointment Report",
                description: "Detailed breakdown of scheduled, completed, and missed appointments.",
                metric: `${appts} Entries`,
                path: "/company/reports/appointments",
            },
            {
                title: "Staff Report",
                description: "Performance metrics and appointments per staff member.",
                metric: `${staff} Active`,
                path: "/company/reports/staff",
            },
            {
                title: "Service Report",
                description: "Popularity and completion analysis of services offered.",
                metric: `${services} Services`,
                path: "/company/reports/services",
            },
            {
                title: "Customer Report",
                description: "Client retention, new acquisitions, and lifetime value.",
                metric: `${customers} Clients`,
                path: "/company/reports/customers",
            },
        ];
    }, [overview]);

    const apiErrorMessage = error?.response?.data?.message || error?.message || "";
    const bookingsErrorMessage = bookingsError?.response?.data?.message || bookingsError?.message || "";

    function handleExport() {
        // TODO: no export endpoint yet
    }

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
                    {/* Breadcrumb */}
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-xs font-bold uppercase tracking-wide text-slate">Reports &amp; Analytics</span>
                        <ChevronRight className="w-3 h-3 text-gray" />
                        <span className="text-xs text-navy">Reports</span>
                    </div>

                    {/* Header */}
                    <div className="flex flex-col gap-5 mb-6 lg:flex-row lg:items-start lg:justify-between">
                        <div>
                            <h1 className="font-serif text-2xl text-navy sm:text-3xl md:text-4xl">Reports</h1>
                            <p className="text-sm text-slate mt-1.5 max-w-[440px]">Review your company's appointment and operational performance.</p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:flex-col lg:items-end">
                            <div className="relative" data-date-picker>
                                <button onClick={() => setIsDatePickerOpen(!isDatePickerOpen)} className="flex items-center gap-2 rounded-lg border border-gray/30 bg-white px-4 py-2.5 text-sm font-bold text-navy hover:border-navy transition">
                                    <Calendar className="h-4 w-4 shrink-0 text-slate" />
                                    <span className="whitespace-nowrap">{dateRange.start} — {dateRange.end}</span>
                                    <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isDatePickerOpen ? "rotate-180" : ""}`} />
                                </button>

                                {isDatePickerOpen && (
                                    <div className="absolute right-0 top-full z-30 mt-2 w-64 rounded-lg border border-gray/30 bg-white p-4 shadow-lg">
                                        <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate">Select Date Range</p>
                                        <div className="flex flex-col gap-3">
                                            <input type="date" value={dateRange.start} max={dateRange.end} onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })} className="h-10 w-full rounded-lg border border-gray/40 px-3 text-sm text-navy outline-none focus:border-navy" />
                                            <input type="date" value={dateRange.end} min={dateRange.start} onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })} className="h-10 w-full rounded-lg border border-gray/40 px-3 text-sm text-navy outline-none focus:border-navy" />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <button onClick={handleExport} className="flex items-center justify-center gap-2 rounded-lg bg-navy px-5 py-2.5 text-sm font-bold text-white hover:bg-gold hover:text-navy transition">
                                <Download className="h-4 w-4" /> Export
                            </button>
                        </div>
                    </div>

                    {/* Period Filter */}
                    <div className="flex items-center gap-6 border-b border-gray/20 pb-3 mb-6 overflow-x-auto">
                        {[{ key: "today", label: "Today" }, { key: "week", label: "This Week" }, { key: "month", label: "Monthly" }].map((p) => (
                            <button key={p.key} onClick={() => setPeriodFilter(p.key)} className={`text-sm font-bold whitespace-nowrap pb-3 -mb-3 border-b-2 transition ${periodFilter === p.key ? "text-navy border-navy" : "text-slate border-transparent hover:text-navy"}`}>
                                {p.label}
                            </button>
                        ))}
                    </div>

                    {/* Error */}
                    {isError && !isLoading && (
                        <div className="mb-4 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                            <p className="text-sm text-red-700">{apiErrorMessage || "Failed to load report overview."}</p>
                        </div>
                    )}

                    {/* Stat Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                        {isLoading ? (
                            <div className="col-span-full flex items-center justify-center gap-3 rounded-xl border border-gray/20 bg-white py-10">
                                <Loader2 className="h-5 w-5 animate-spin text-navy" />
                                <span className="text-sm text-slate">Loading overview...</span>
                            </div>
                        ) : (
                            statCards.map((c) => (
                                <StatCard key={c.label} label={c.label} value={c.value} icon={c.icon} iconBg={c.iconBg} iconColor={c.iconColor} />
                            ))
                        )}
                    </div>

                    {/* Status Breakdown Chart */}
                    <div className="mb-6 rounded-xl border border-gray/20 bg-white p-5 shadow-sm sm:p-6">
                        <h2 className="font-serif text-lg font-bold text-navy mb-1">Status Breakdown</h2>
                        <p className="text-xs text-slate mb-5">Appointments by status</p>

                        <div className="h-[240px] w-full">
                            {isBookingsLoading ? (
                                <div className="flex h-full items-center justify-center gap-2">
                                    <Loader2 className="h-5 w-5 animate-spin text-navy" />
                                    <span className="text-sm text-slate">Loading breakdown...</span>
                                </div>
                            ) : isBookingsError ? (
                                <div className="flex h-full items-center justify-center">
                                    <p className="text-sm text-red-600">{bookingsErrorMessage || "Failed to load breakdown."}</p>
                                </div>
                            ) : statusData.length === 0 ? (
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
                                                <Cell key={entry.status} fill={statusColors[entry.status] || "#000C1E"} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            )}
                        </div>
                    </div>

                    {/* Report Categories */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {reportCategories.map((r) => (
                            <div key={r.title} className="bg-white rounded-xl border border-gray/20 shadow-sm p-5 sm:p-6 flex flex-col hover:border-navy hover:shadow-md transition">
                                <h2 className="font-serif text-lg text-navy sm:text-xl">{r.title}</h2>
                                <div className="border-b border-gray/20 my-4" />
                                <p className="text-sm text-slate leading-relaxed flex-grow">{r.description}</p>
                                <div className="flex items-center justify-between mt-6 gap-4">
                                    <span className="text-xs font-bold uppercase tracking-wide text-slate">{r.metric}</span>
                                    <Link to={r.path} className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-navy hover:text-gold transition whitespace-nowrap">
                                        View <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Reports;