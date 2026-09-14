import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
    Calendar,
    CalendarCheck,
    CheckCircle2,
    ChevronRight,
    Clock,
    Users,
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
import { useCustomerReport } from "../../hooks/company/useReports";

const customerTrendData = [
    { date: "01 Aug", newCustomers: 3, returning: 8 },
    { date: "05 Aug", newCustomers: 5, returning: 10 },
    { date: "09 Aug", newCustomers: 4, returning: 12 },
    { date: "13 Aug", newCustomers: 7, returning: 14 },
    { date: "17 Aug", newCustomers: 6, returning: 13 },
    { date: "21 Aug", newCustomers: 8, returning: 16 },
];

const segmentColors = {
    New: "#3b82f6",
    Returning: "#d97706",
    Active: "#16a34a",
    Inactive: "#94a3b8",
};

function CustomerReport() {
    const [periodFilter, setPeriodFilter] = useState("month");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [dateRange, setDateRange] = useState({
        start: "2026-08-01",
        end: "2026-08-21",
    });

    const [statusFilter, setStatusFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);

    const {
        data: customerResponse,
        isLoading,
        isError,
        error,
    } = useCustomerReport({
        from: dateRange.start,
        to: dateRange.end,
    });

    const report = customerResponse?.data;

    const topCustomers = useMemo(() => {
        const raw = report?.top_customers || [];

        return raw.map((row) => ({
            id: row.customer_id,
            name: row.customer?.name || "Unknown",
            email: row.customer?.email || "—",
            appointments: row.appointment_count ?? 0,
        }));
    }, [report]);

    const filteredCustomers = useMemo(() => {
        if (statusFilter === "all") return topCustomers;
        return topCustomers;
    }, [topCustomers, statusFilter]);

    const statCards = useMemo(() => {
        return [
            {
                value: report?.total_customers ?? 0,
                label: "Total Customers",
                icon: Users,
                iconBg: "bg-beige",
                iconColor: "text-navy",
            },
            {
                value: 0,
                label: "New Customers",
                icon: Users,
                valueColor: "text-gold",
                iconBg: "bg-gold/20",
                iconColor: "text-navy",
            },
            {
                value: report?.customers_with_appointments ?? 0,
                label: "With Appointments",
                icon: CheckCircle2,
                iconBg: "bg-green-50",
                iconColor: "text-green-700",
            },
            {
                value: topCustomers.reduce(
                    (sum, row) => sum + row.appointments,
                    0
                ),
                label: "Total Appointments",
                icon: CalendarCheck,
                iconBg: "bg-beige",
                iconColor: "text-navy",
            },
            {
                value: "—",
                label: "Total Spent",
                icon: Clock,
                iconBg: "bg-gold/20",
                iconColor: "text-navy",
            },
        ];
    }, [report, topCustomers]);

    function handlePeriodChange(period) {
        setPeriodFilter(period);
        setCurrentPage(1);
    }

    function handleExport() {
        // TODO: no export endpoint
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

                        <span className="text-xs text-navy">Customer Report</span>
                    </div>

                    <div className="flex flex-col gap-5 mb-6 lg:flex-row lg:items-start lg:justify-between">
                        <div>
                            <h1 className="font-serif text-2xl text-navy sm:text-3xl md:text-4xl">
                                Customer Report
                            </h1>

                            <p className="text-sm text-slate mt-1.5 max-w-[520px]">
                                Analyze customer activity, retention and spending.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:flex-col lg:items-end">
                            <div className="bg-white border border-gray/30 rounded-lg px-3 py-2 flex items-center gap-2 text-sm font-bold text-navy hover:border-navy transition">
                                <Calendar className="w-4 h-4 shrink-0 text-slate" />

                                <input
                                    type="date"
                                    value={dateRange.start}
                                    max={dateRange.end}
                                    onChange={(event) => {
                                        setDateRange((prev) => ({
                                            ...prev,
                                            start: event.target.value,
                                        }));
                                        setCurrentPage(1);
                                    }}
                                    className="bg-transparent text-xs font-bold text-navy outline-none w-[110px]"
                                />

                                <span className="text-slate">—</span>

                                <input
                                    type="date"
                                    value={dateRange.end}
                                    min={dateRange.start}
                                    onChange={(event) => {
                                        setDateRange((prev) => ({
                                            ...prev,
                                            end: event.target.value,
                                        }));
                                        setCurrentPage(1);
                                    }}
                                    className="bg-transparent text-xs font-bold text-navy outline-none w-[110px]"
                                />
                            </div>

                            <button
                                type="button"
                                onClick={handleExport}
                                className="bg-navy text-white px-5 py-2.5 rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:bg-gold hover:text-navy transition"
                            >
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
                                    onClick={() => handlePeriodChange(period.key)}
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
                                {apiErrorMessage || "Failed to load customer report."}
                            </p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                        {isLoading ? (
                            <div className="col-span-full flex items-center justify-center gap-3 rounded-xl border border-gray/20 bg-white py-10">
                                <Loader2 className="h-5 w-5 animate-spin text-navy" />
                                <span className="text-sm text-slate">Loading customer report...</span>
                            </div>
                        ) : (
                            statCards.map((card, index) => (
                                <StatCard
                                    key={`${card.label}-${index}`}
                                    value={card.value}
                                    label={card.label}
                                    icon={card.icon}
                                    valueColor={card.valueColor}
                                    iconBg={card.iconBg}
                                    iconColor={card.iconColor}
                                />
                            ))
                        )}
                    </div>

                    <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <div className="rounded-xl border border-gray/20 bg-white p-5 shadow-sm sm:p-6">
                            <h2 className="font-serif text-lg font-bold text-navy mb-1">
                                Customer Growth
                            </h2>

                            <p className="text-xs text-slate mb-5">
                                New vs returning customers over time
                            </p>

                            <div className="h-[240px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart
                                        data={customerTrendData}
                                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                                    >
                                        <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#E4E2DD" />
                                        <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#43474E" }} />
                                        <YAxis axisLine={false} tickLine={false} allowDecimals={false} tick={{ fontSize: 12, fill: "#43474E" }} />
                                        <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #C3C6CF", fontSize: 12 }} />
                                        <Area type="monotone" dataKey="newCustomers" stroke="#000C1E" strokeWidth={2} fill="#000C1E" fillOpacity={0.06} name="New Customers" />
                                        <Area type="monotone" dataKey="returning" stroke="#16a34a" strokeWidth={2} fill="#16a34a" fillOpacity={0.05} name="Returning" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="rounded-xl border border-gray/20 bg-white p-5 shadow-sm sm:p-6">
                            <h2 className="font-serif text-lg font-bold text-navy mb-1">
                                Customer Segments
                            </h2>

                            <p className="text-xs text-slate mb-5">
                                Breakdown by customer type
                            </p>

                            <div className="h-[240px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart
                                        data={[
                                            { segment: "New", count: 0 },
                                            { segment: "Returning", count: report?.customers_with_appointments ?? 0 },
                                            { segment: "Active", count: 0 },
                                            { segment: "Inactive", count: 0 },
                                        ]}
                                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                                    >
                                        <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#E4E2DD" />
                                        <XAxis dataKey="segment" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#43474E" }} />
                                        <YAxis axisLine={false} tickLine={false} allowDecimals={false} tick={{ fontSize: 12, fill: "#43474E" }} />
                                        <Tooltip cursor={{ fill: "rgba(254,212,136,0.15)" }} contentStyle={{ borderRadius: 8, border: "1px solid #C3C6CF", fontSize: 12 }} />
                                        <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                                            {["New", "Returning", "Active", "Inactive"].map((segment) => (
                                                <Cell key={segment} fill={segmentColors[segment]} />
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
                                        Top Customers
                                    </h2>

                                    <p className="text-xs text-slate mt-1">
                                        Highest-volume customers for this period.
                                    </p>
                                </div>

                                <select
                                    value={statusFilter}
                                    onChange={(event) => {
                                        setStatusFilter(event.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="h-9 w-full sm:w-auto rounded-lg border border-gray/30 bg-white px-3 text-xs font-bold text-navy outline-none focus:border-navy"
                                >
                                    <option value="all">All Customers</option>
                                </select>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[1000px]">
                                <thead>
                                    <tr className="bg-beige/50">
                                        <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">Customer</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">Appointments</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">Completed</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">Cancelled</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">Last Visit</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">Total Spent</th>
                                        <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">Status</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray/10">
                                    {filteredCustomers.length > 0 ? (
                                        filteredCustomers.map((customer) => (
                                            <tr key={customer.id} className="hover:bg-beige/30 transition">
                                                <td className="px-6 py-4">
                                                    <p className="text-sm font-bold text-navy">
                                                        {customer.name}
                                                    </p>
                                                    <p className="text-xs text-slate mt-0.5">
                                                        {customer.email}
                                                    </p>
                                                </td>

                                                <td className="px-6 py-4 text-sm font-bold text-navy">
                                                    {customer.appointments}
                                                </td>

                                                <td className="px-6 py-4 text-sm text-gray">—</td>
                                                <td className="px-6 py-4 text-sm text-gray">—</td>
                                                <td className="px-6 py-4 text-sm text-gray">—</td>
                                                <td className="px-6 py-4 text-sm text-gray">—</td>
                                                <td className="px-6 py-4 text-sm text-gray">—</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="px-6 py-12 text-center">
                                                <p className="text-sm font-bold text-navy">
                                                    No customer data found.
                                                </p>
                                                <p className="text-xs text-slate mt-1">
                                                    Try adjusting the date range.
                                                </p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-5 sm:px-6 py-4 border-t border-gray/20">
                            <p className="text-xs text-slate">
                                Showing 1 to {filteredCustomers.length} of {report?.total_customers ?? 0} customers
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

export default CustomerReport;