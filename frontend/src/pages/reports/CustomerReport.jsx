import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    Calendar,
    CalendarCheck,
    CheckCircle2,
    ChevronRight,
    Clock,
    Users,
    XCircle,
} from "lucide-react";
import {
    AreaChart, Area, BarChart, Bar, Cell,
    CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import StatCard from "../../components/dashboard/StatCard";
import api from "../../services/api";

/* Trend + segment charts — mock for now, API will replace */
const customerTrendData = [
    { date: "01 Aug", newCustomers: 3, returning: 8 },
    { date: "05 Aug", newCustomers: 5, returning: 10 },
    { date: "09 Aug", newCustomers: 4, returning: 12 },
    { date: "13 Aug", newCustomers: 7, returning: 14 },
    { date: "17 Aug", newCustomers: 6, returning: 13 },
    { date: "21 Aug", newCustomers: 8, returning: 16 },
];

const segmentData = [
    { segment: "New", count: 48 },
    { segment: "Returning", count: 196 },
    { segment: "Active", count: 68 },
    { segment: "Inactive", count: 20 },
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

    const customers = [
        {
            id: 1,
            name: "Eleanor Vance",
            email: "eleanor@example.com",
            appointments: 18,
            completed: 15,
            cancelled: 2,
            lastVisit: "21 Aug 2026",
            totalSpent: "Rs. 245,000",
            status: "Active",
        },
        {
            id: 2,
            name: "Marcus Sterling",
            email: "marcus@example.com",
            appointments: 14,
            completed: 11,
            cancelled: 2,
            lastVisit: "21 Aug 2026",
            totalSpent: "Rs. 198,000",
            status: "Active",
        },
        {
            id: 3,
            name: "Clara Bow",
            email: "clara@example.com",
            appointments: 12,
            completed: 10,
            cancelled: 1,
            lastVisit: "20 Aug 2026",
            totalSpent: "Rs. 176,000",
            status: "Returning",
        },
        {
            id: 4,
            name: "Julian Beck",
            email: "julian@example.com",
            appointments: 9,
            completed: 7,
            cancelled: 2,
            lastVisit: "20 Aug 2026",
            totalSpent: "Rs. 142,000",
            status: "Active",
        },
        {
            id: 5,
            name: "Victoria Page",
            email: "victoria@example.com",
            appointments: 11,
            completed: 9,
            cancelled: 1,
            lastVisit: "19 Aug 2026",
            totalSpent: "Rs. 155,000",
            status: "Returning",
        },
        {
            id: 6,
            name: "Henry Collins",
            email: "henry@example.com",
            appointments: 7,
            completed: 5,
            cancelled: 1,
            lastVisit: "18 Aug 2026",
            totalSpent: "Rs. 98,000",
            status: "Active",
        },
        {
            id: 7,
            name: "Amelia Rose",
            email: "amelia@example.com",
            appointments: 5,
            completed: 4,
            cancelled: 1,
            lastVisit: "16 Aug 2026",
            totalSpent: "Rs. 76,000",
            status: "New",
        },
        {
            id: 8,
            name: "Daniel Hayes",
            email: "daniel@example.com",
            appointments: 4,
            completed: 3,
            cancelled: 1,
            lastVisit: "14 Aug 2026",
            totalSpent: "Rs. 61,000",
            status: "New",
        },
    ];

    useEffect(() => {
        /*
        API integration:

        async function fetchCustomerReport() {
            try {
                const response = await api.get(
                    "/company/reports/customers",
                    {
                        params: {
                            start_date: dateRange.start,
                            end_date: dateRange.end,
                            status: statusFilter,
                            period: periodFilter,
                        },
                    }
                );

                // set customer report data here
            } catch (error) {
                // handle API error here
            }
        }

        fetchCustomerReport();
        */
    }, [dateRange, statusFilter, periodFilter]);

    function handlePeriodChange(period) {
        setPeriodFilter(period);
        setCurrentPage(1);
    }

    function handleExport() {
        window.open(
            `${import.meta.env.VITE_API_URL}/company/reports/customers/export?format=csv`,
            "_blank"
        );
    }

    function getStatusStyle(status) {
        if (status === "Active") {
            return "bg-green-50 text-green-700";
        }

        if (status === "Returning") {
            return "bg-gold/20 text-amber-700";
        }

        if (status === "New") {
            return "bg-blue-50 text-blue-700";
        }

        return "bg-gray/20 text-slate";
    }

    const filteredCustomers =
        statusFilter === "all"
            ? customers
            : customers.filter(
                  (customer) => customer.status === statusFilter
              );

    return (
        <div className="min-h-screen flex bg-beige">

            {/* Desktop Sidebar */}
            <div className="hidden lg:block lg:flex-shrink-0">
                <Sidebar
                    companyName="Shifa Clinic"
                    activeItem="Reports"
                />
            </div>

            {/* Mobile / Tablet Sidebar — overlay drawer */}
            {sidebarOpen && (
                <>
                    <button
                        type="button"
                        onClick={() => setSidebarOpen(false)}
                        className="fixed inset-0 z-30 bg-navy/50 lg:hidden"
                        aria-label="Close menu"
                    />

                    <div className="fixed left-0 top-0 z-40 h-screen w-64 max-w-[80vw] overflow-y-auto lg:hidden">
                        <Sidebar
                            companyName="Shifa Clinic"
                            activeItem="Reports"
                        />
                    </div>
                </>
            )}

            {/* Main Area */}
            <div className="flex min-w-0 flex-1 flex-col">

                <Topbar
                    onMenuClick={() => setSidebarOpen(true)}
                    showBell
                    simpleProfileIcon
                    searchPlaceholder="Search..."
                />

                <main className="flex-1 bg-beige px-4 py-5 sm:px-6 md:px-8 md:py-6">

                    {/* Breadcrumb */}
                    <div className="flex flex-wrap items-center gap-2 mb-5">

                        <Link
                            to="/company/reports"
                            className="text-xs font-bold uppercase tracking-wide text-slate hover:text-navy transition"
                        >
                            Reports &amp; Analytics
                        </Link>

                        <ChevronRight className="w-3 h-3 text-gray" />

                        <span className="text-xs text-navy">
                            Customer Report
                        </span>

                    </div>

                    {/* Header */}
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

                            {/* Date Range */}
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

                            {/* Export */}
                            <button
                                type="button"
                                onClick={handleExport}
                                className="bg-navy text-white px-5 py-2.5 rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:bg-gold hover:text-navy transition"
                            >
                                Export
                            </button>

                        </div>

                    </div>

                    {/* Period Filter */}
                    <div className="flex items-center gap-6 border-b border-gray/20 pb-3 mb-6 overflow-x-auto">

                        {[
                            { key: "today", label: "Today" },
                            { key: "week", label: "This Week" },
                            { key: "month", label: "Monthly" },
                        ].map((period) => {
                            const isActive =
                                periodFilter === period.key;

                            return (
                                <button
                                    key={period.key}
                                    type="button"
                                    onClick={() => {
                                        setPeriodFilter(period.key);
                                        setCurrentPage(1);
                                    }}
                                    className={`
                                        text-sm
                                        font-bold
                                        whitespace-nowrap
                                        pb-3
                                        -mb-3
                                        border-b-2
                                        transition
                                        ${
                                            isActive
                                                ? "text-navy border-navy"
                                                : "text-slate border-transparent hover:text-navy"
                                        }
                                    `}
                                >
                                    {period.label}
                                </button>
                            );
                        })}

                    </div>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">

                        <StatCard
                            value="312"
                            label="Total Customers"
                            icon={Users}
                            iconBg="bg-beige"
                            iconColor="text-navy"
                        />

                        <StatCard
                            value="48"
                            label="New Customers"
                            icon={Users}
                            valueColor="text-gold"
                            iconBg="bg-gold/20"
                            iconColor="text-navy"
                        />

                        <StatCard
                            value="196"
                            label="Returning Customers"
                            icon={CheckCircle2}
                            iconBg="bg-green-50"
                            iconColor="text-green-700"
                        />

                        <StatCard
                            value="428"
                            label="Total Appointments"
                            icon={CalendarCheck}
                            iconBg="bg-beige"
                            iconColor="text-navy"
                        />

                        <StatCard
                            value="Rs. 1,850,000"
                            label="Total Spent"
                            icon={Clock}
                            iconBg="bg-gold/20"
                            iconColor="text-navy"
                        />

                    </div>

                    {/* Charts Row */}
                    <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">

                        {/* Customer Growth Trend */}
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
                                        <CartesianGrid
                                            strokeDasharray="4 4"
                                            vertical={false}
                                            stroke="#E4E2DD"
                                        />
                                        <XAxis
                                            dataKey="date"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fontSize: 12, fill: "#43474E" }}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            allowDecimals={false}
                                            tick={{ fontSize: 12, fill: "#43474E" }}
                                        />
                                        <Tooltip
                                            contentStyle={{
                                                borderRadius: 8,
                                                border: "1px solid #C3C6CF",
                                                fontSize: 12,
                                            }}
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="newCustomers"
                                            stroke="#000C1E"
                                            strokeWidth={2}
                                            fill="#000C1E"
                                            fillOpacity={0.06}
                                            name="New Customers"
                                        />
                                        <Area
                                            type="monotone"
                                            dataKey="returning"
                                            stroke="#16a34a"
                                            strokeWidth={2}
                                            fill="#16a34a"
                                            fillOpacity={0.05}
                                            name="Returning"
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>

                        </div>

                        {/* Customer Segments */}
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
                                        data={segmentData}
                                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                                    >
                                        <CartesianGrid
                                            strokeDasharray="4 4"
                                            vertical={false}
                                            stroke="#E4E2DD"
                                        />
                                        <XAxis
                                            dataKey="segment"
                                            axisLine={false}
                                            tickLine={false}
                                            tick={{ fontSize: 12, fill: "#43474E" }}
                                        />
                                        <YAxis
                                            axisLine={false}
                                            tickLine={false}
                                            allowDecimals={false}
                                            tick={{ fontSize: 12, fill: "#43474E" }}
                                        />
                                        <Tooltip
                                            cursor={{ fill: "rgba(254,212,136,0.15)" }}
                                            contentStyle={{
                                                borderRadius: 8,
                                                border: "1px solid #C3C6CF",
                                                fontSize: 12,
                                            }}
                                        />
                                        <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                                            {segmentData.map((entry) => (
                                                <Cell
                                                    key={entry.segment}
                                                    fill={segmentColors[entry.segment]}
                                                />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>

                        </div>

                    </div>

                    {/* Customer Activity */}
                    <div className="bg-white rounded-xl border border-gray/20 shadow-sm overflow-hidden">

                        {/* Header */}
                        <div className="p-5 sm:p-6 border-b border-gray/20">

                            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                                <div>
                                    <h2 className="font-serif text-lg text-navy sm:text-xl">
                                        Customer Activity
                                    </h2>

                                    <p className="text-xs text-slate mt-1">
                                        Customer-level appointment and spending data.
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
                                    <option value="Active">Active</option>
                                    <option value="Returning">Returning</option>
                                    <option value="New">New</option>
                                </select>

                            </div>

                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">

                            <table className="w-full min-w-[1000px]">

                                <thead>
                                    <tr className="bg-beige/50">
                                        <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">
                                            Customer
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">
                                            Appointments
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">
                                            Completed
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">
                                            Cancelled
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">
                                            Last Visit
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">
                                            Total Spent
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">
                                            Status
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray/10">
                                    {filteredCustomers.map((customer) => (
                                        <tr
                                            key={customer.id}
                                            className="hover:bg-beige/30 transition"
                                        >
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

                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-green-700">
                                                    <CheckCircle2 className="w-4 h-4" />
                                                    {customer.completed}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-red-600">
                                                    <XCircle className="w-4 h-4" />
                                                    {customer.cancelled}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 text-sm text-slate">
                                                {customer.lastVisit}
                                            </td>

                                            <td className="px-6 py-4 text-sm font-bold text-navy">
                                                {customer.totalSpent}
                                            </td>

                                            <td className="px-6 py-4">
                                                <span
                                                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold uppercase ${getStatusStyle(
                                                        customer.status
                                                    )}`}
                                                >
                                                    {customer.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>

                        </div>

                        {/* Footer */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-5 sm:px-6 py-4 border-t border-gray/20">

                            <p className="text-xs text-slate">
                                Showing 1 to {filteredCustomers.length} of 312 customers
                            </p>

                            <div className="flex items-center gap-1 flex-wrap">

                                <button
                                    type="button"
                                    disabled={currentPage === 1}
                                    onClick={() =>
                                        setCurrentPage((page) =>
                                            Math.max(1, page - 1)
                                        )
                                    }
                                    className="px-3 py-1.5 rounded-md text-xs font-bold text-slate hover:bg-beige disabled:opacity-40 disabled:cursor-not-allowed transition"
                                >
                                    Prev
                                </button>

                                {[1, 2, 3].map((page) => (
                                    <button
                                        key={page}
                                        type="button"
                                        onClick={() =>
                                            setCurrentPage(page)
                                        }
                                        className={`
                                            w-8
                                            h-8
                                            rounded-md
                                            text-xs
                                            font-bold
                                            transition
                                            ${
                                                currentPage === page
                                                    ? "bg-navy text-white"
                                                    : "text-slate hover:bg-beige"
                                            }
                                        `}
                                    >
                                        {page}
                                    </button>
                                ))}

                                <span className="px-2 text-xs text-slate">
                                    ...
                                </span>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setCurrentPage((page) => page + 1)
                                    }
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