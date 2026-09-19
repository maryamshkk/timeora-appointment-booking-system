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
    Scissors,
    XCircle,
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
import { useServiceReport } from "../../hooks/company/useReports";

const categoryColors = {
    Service: "#000C1E",
    Popular: "#16a34a",
    Rare: "#3b82f6",
};

function ServiceReport() {
    const [periodFilter, setPeriodFilter] = useState("month");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [dateRange, setDateRange] = useState({ start: "2026-08-01", end: "2026-08-21" });
    const [serviceFilter, setServiceFilter] = useState("all");

    const {
        data: serviceResponse,
        isLoading,
        isError,
        error,
    } = useServiceReport({
        from: dateRange.start,
        to: dateRange.end,
        serviceId: serviceFilter !== "all" ? serviceFilter : undefined,
    });

    const reportData = serviceResponse?.data;
    const summary = reportData?.summary || {};
    const services = reportData?.services || [];

    const statCards = useMemo(() => {
        return [
            { label: "TOTAL SERVICES", value: summary.total_services ?? 0, icon: Scissors, iconBg: "bg-gray/10", iconColor: "text-slate" },
            { label: "TOTAL BOOKINGS", value: summary.total_bookings ?? 0, icon: CalendarCheck, iconBg: "bg-gray/10", iconColor: "text-slate" },
            { label: "COMPLETED", value: summary.completed ?? 0, icon: CheckCircle2, iconBg: "bg-green-50", iconColor: "text-green-600" },
            { label: "CANCELLED", value: summary.cancelled ?? 0, icon: XCircle, iconBg: "bg-red-50", iconColor: "text-red-500" },
            { label: "REJECTED", value: summary.rejected ?? 0, icon: XCircle, iconBg: "bg-gold/15", iconColor: "text-amber-600" },
        ];
    }, [summary]);

    const chartData = useMemo(() => {
        return services.slice(0, 6).map((s) => ({
            name: s.name?.slice(0, 12) || "—",
            bookings: s.bookings ?? 0,
            completed: s.completed ?? 0,
        }));
    }, [services]);

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
                    <button type="button" onClick={() => setSidebarOpen(false)} className="fixed inset-0 z-30 bg-navy/50 lg:hidden" aria-label="Close menu" />
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
                        <span className="text-xs text-navy">Service Report</span>
                    </div>

                    <div className="flex flex-col gap-5 mb-6 lg:flex-row lg:items-start lg:justify-between">
                        <div>
                            <h1 className="font-serif text-2xl text-navy sm:text-3xl md:text-4xl">Service Report</h1>
                            <p className="text-sm text-slate mt-1.5 max-w-[520px]">Analyze service popularity, appointment performance, and revenue generated.</p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:flex-col lg:items-end">
                            <div className="bg-white border border-gray/30 rounded-lg px-3 py-2 flex items-center gap-2 text-sm font-bold text-navy hover:border-navy transition">
                                <Calendar className="w-4 h-4 shrink-0 text-slate" />
                                <input type="date" value={dateRange.start} max={dateRange.end} onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })} className="bg-transparent text-xs font-bold text-navy outline-none w-[110px]" />
                                <span className="text-slate">—</span>
                                <input type="date" value={dateRange.end} min={dateRange.start} onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })} className="bg-transparent text-xs font-bold text-navy outline-none w-[110px]" />
                            </div>

                            <button type="button" onClick={handleExport} className="bg-navy text-white px-5 py-2.5 rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:bg-gold hover:text-navy transition">
                                <Download className="w-4 h-4" /> Export
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 border-b border-gray/20 pb-3 mb-6 overflow-x-auto">
                        {[{ key: "today", label: "Today" }, { key: "week", label: "This Week" }, { key: "month", label: "Monthly" }].map((p) => (
                            <button key={p.key} type="button" onClick={() => setPeriodFilter(p.key)} className={`text-sm font-bold whitespace-nowrap pb-3 -mb-3 border-b-2 transition ${periodFilter === p.key ? "text-navy border-navy" : "text-slate border-transparent hover:text-navy"}`}>
                                {p.label}
                            </button>
                        ))}
                    </div>

                    {isError && !isLoading && (
                        <div className="mb-4 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                            <p className="text-sm text-red-700">{apiErrorMessage || "Failed to load service report."}</p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                        {isLoading ? (
                            <div className="col-span-full flex items-center justify-center gap-3 rounded-xl border border-gray/20 bg-white py-10">
                                <Loader2 className="h-5 w-5 animate-spin text-navy" />
                                <span className="text-sm text-slate">Loading service report...</span>
                            </div>
                        ) : (
                            statCards.map((card) => (
                                <StatCard key={card.label} label={card.label} value={card.value} icon={card.icon} iconBg={card.iconBg} iconColor={card.iconColor} />
                            ))
                        )}
                    </div>

                    <div className="mb-6 rounded-xl border border-gray/20 bg-white p-5 shadow-sm sm:p-6">
                        <h2 className="font-serif text-lg font-bold text-navy mb-1">Bookings by Service</h2>
                        <p className="text-xs text-slate mb-5">Top services by booking volume</p>

                        <div className="h-[260px] w-full">
                            {chartData.length === 0 ? (
                                <div className="flex h-full items-center justify-center">
                                    <p className="text-sm text-slate">No service data available.</p>
                                </div>
                            ) : (
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#E4E2DD" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#43474E" }} />
                                        <YAxis axisLine={false} tickLine={false} allowDecimals={false} tick={{ fontSize: 12, fill: "#43474E" }} />
                                        <Tooltip cursor={{ fill: "rgba(254,212,136,0.15)" }} contentStyle={{ borderRadius: 8, border: "1px solid #C3C6CF", fontSize: 12 }} />
                                        <Bar dataKey="bookings" fill="#000C1E" radius={[6, 6, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            )}
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-gray/20 shadow-sm overflow-hidden">
                        <div className="p-5 sm:p-6 border-b border-gray/20">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                <div>
                                    <h2 className="font-serif text-lg text-navy sm:text-xl">Service Performance</h2>
                                    <p className="text-xs text-slate mt-1">Detailed performance breakdown for each service.</p>
                                </div>

                                <select
                                    value={serviceFilter}
                                    onChange={(e) => setServiceFilter(e.target.value)}
                                    className="h-9 w-full sm:w-auto rounded-lg border border-gray/30 bg-white px-3 text-xs font-bold text-navy outline-none focus:border-navy"
                                >
                                    <option value="all">All Services</option>
                                    {services.map((service) => (
                                        <option key={service.service_id} value={service.service_id}>
                                            {service.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[1000px]">
                                <thead>
                                    <tr className="bg-beige/50">
                                        <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">Service</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">Bookings</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">Completed</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">Cancelled</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">Rejected</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">Pending</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">Completion</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray/10">
                                    {isLoading ? (
                                        <tr>
                                            <td colSpan="7" className="px-6 py-12 text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <Loader2 className="h-5 w-5 animate-spin text-navy" />
                                                    <span className="text-sm text-slate">Loading services...</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : services.length > 0 ? (
                                        services.map((service) => (
                                            <tr key={service.service_id} className="hover:bg-beige/30 transition">
                                                <td className="px-6 py-4">
                                                    <p className="text-sm font-bold text-navy">{service.name}</p>
                                                    {service.duration_minutes && (
                                                        <p className="text-xs text-slate mt-0.5">{service.duration_minutes} min</p>
                                                    )}
                                                </td>

                                                <td className="px-6 py-4 text-sm font-bold text-navy">{service.bookings}</td>

                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-green-700">
                                                        <CheckCircle2 className="w-4 h-4" />
                                                        {service.completed}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-red-600">
                                                        <XCircle className="w-4 h-4" />
                                                        {service.cancelled}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4 text-sm font-bold text-amber-700">{service.rejected}</td>
                                                <td className="px-6 py-4 text-sm font-bold text-slate">{service.pending}</td>

                                                <td className="px-6 py-4">
                                                    <div className="w-28">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <span className="text-xs font-bold text-navy">{service.completion_rate}%</span>
                                                        </div>
                                                        <div className="h-1.5 bg-beige rounded-full overflow-hidden">
                                                            <div className="h-full bg-navy rounded-full" style={{ width: `${service.completion_rate}%` }} />
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="px-6 py-12 text-center">
                                                <p className="text-sm font-bold text-navy">No service data found.</p>
                                                <p className="text-xs text-slate mt-1">Try adjusting the date range.</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-5 sm:px-6 py-4 border-t border-gray/20">
                            <p className="text-xs text-slate">
                                Showing {services.length} of {summary.total_services ?? 0} services
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default ServiceReport;