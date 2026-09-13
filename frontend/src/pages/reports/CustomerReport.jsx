import React, { useEffect, useState } from "react";
import {
    CalendarCheck,
    CheckCircle2,
    Clock,
    Users,
    XCircle,
} from "lucide-react";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import StatCard from "../../components/dashboard/StatCard";
import api from "../../services/api";

function CustomerReport() {
    const [periodFilter, setPeriodFilter] = useState("month");

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
        <div className="min-h-screen bg-beige flex">
            <Sidebar activeItem="Reports" />

            <div className="flex-1 min-w-0">
                <Topbar
                    showBell
                    simpleProfileIcon
                    searchPlaceholder="Search..."
                />

                <main className="p-6 md:p-8">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-xs text-slate mb-4">
                        <span>Reports</span>
                        <span>/</span>
                        <span className="text-navy font-bold">
                            Customer Report
                        </span>
                    </div>

                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-7">
                        <div>
                            <h1 className="font-serif text-3xl text-navy">
                                Customer Report
                            </h1>

                            <p className="text-sm text-slate mt-1">
                                Analyze customer activity, retention and spending.
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                                <input
                                    type="date"
                                    value={dateRange.start}
                                    onChange={(event) =>
                                        setDateRange({
                                            ...dateRange,
                                            start: event.target.value,
                                        })
                                    }
                                    className="h-10 rounded-lg border border-gray/40 bg-white px-3 text-sm text-navy outline-none focus:border-navy"
                                />

                                <span className="text-sm text-slate">
                                    to
                                </span>

                                <input
                                    type="date"
                                    value={dateRange.end}
                                    onChange={(event) =>
                                        setDateRange({
                                            ...dateRange,
                                            end: event.target.value,
                                        })
                                    }
                                    className="h-10 rounded-lg border border-gray/40 bg-white px-3 text-sm text-navy outline-none focus:border-navy"
                                />
                            </div>

                            <button
                                type="button"
                                onClick={handleExport}
                                className="h-10 rounded-lg bg-navy px-4 text-sm font-bold text-white transition hover:bg-gold hover:text-navy"
                            >
                                Export
                            </button>
                        </div>
                    </div>

                    {/* Period Filters */}
                    <div className="flex items-center gap-2 mb-7">
                        {["today", "week", "month"].map((period) => (
                            <button
                                key={period}
                                type="button"
                                onClick={() => handlePeriodChange(period)}
                                className={`
                                    px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wide transition
                                    ${
                                        periodFilter === period
                                            ? "bg-navy text-white"
                                            : "bg-white text-slate border border-gray/30 hover:border-navy hover:text-navy"
                                    }
                                `}
                            >
                                {period}
                            </button>
                        ))}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
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

                    {/* Filters */}
                    <div className="bg-white border border-gray/20 rounded-xl shadow-sm p-5 mb-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <h2 className="font-serif text-lg text-navy">
                                    Customer Activity
                                </h2>

                                <p className="text-xs text-slate mt-1">
                                    Customer-level appointment and spending data.
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <select
                                    value={statusFilter}
                                    onChange={(event) => {
                                        setStatusFilter(event.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="h-10 rounded-lg border border-gray/40 bg-white px-3 text-sm text-navy outline-none focus:border-navy"
                                >
                                    <option value="all">
                                        All Customers
                                    </option>
                                    <option value="Active">
                                        Active
                                    </option>
                                    <option value="Returning">
                                        Returning
                                    </option>
                                    <option value="New">
                                        New
                                    </option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Customer Table */}
                    <div className="bg-white rounded-xl border border-gray/20 shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[1000px]">
                                <thead>
                                    <tr className="border-b border-gray/20 bg-surface">
                                        <th className="text-left px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate">
                                            Customer
                                        </th>

                                        <th className="text-left px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate">
                                            Appointments
                                        </th>

                                        <th className="text-left px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate">
                                            Completed
                                        </th>

                                        <th className="text-left px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate">
                                            Cancelled
                                        </th>

                                        <th className="text-left px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate">
                                            Last Visit
                                        </th>

                                        <th className="text-left px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate">
                                            Total Spent
                                        </th>

                                        <th className="text-left px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate">
                                            Status
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {filteredCustomers.map((customer) => (
                                        <tr
                                            key={customer.id}
                                            className="border-b border-gray/10 last:border-b-0 hover:bg-beige/40 transition"
                                        >
                                            <td className="px-5 py-4">
                                                <div>
                                                    <p className="text-sm font-bold text-navy">
                                                        {customer.name}
                                                    </p>

                                                    <p className="text-xs text-slate mt-0.5">
                                                        {customer.email}
                                                    </p>
                                                </div>
                                            </td>

                                            <td className="px-5 py-4 text-sm text-navy">
                                                {customer.appointments}
                                            </td>

                                            <td className="px-5 py-4 text-sm text-green-700 font-bold">
                                                {customer.completed}
                                            </td>

                                            <td className="px-5 py-4 text-sm text-red-600 font-bold">
                                                {customer.cancelled}
                                            </td>

                                            <td className="px-5 py-4 text-sm text-slate">
                                                {customer.lastVisit}
                                            </td>

                                            <td className="px-5 py-4 text-sm font-bold text-navy">
                                                {customer.totalSpent}
                                            </td>

                                            <td className="px-5 py-4">
                                                <span
                                                    className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${getStatusStyle(
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

                        {/* Pagination */}
                        <div className="flex items-center justify-between border-t border-gray/20 px-5 py-4">
                            <p className="text-xs text-slate">
                                Showing {filteredCustomers.length} of 312 customers
                            </p>

                            <div className="flex items-center gap-2">
                                <button
                                    type="button"
                                    disabled={currentPage === 1}
                                    onClick={() =>
                                        setCurrentPage((page) =>
                                            Math.max(1, page - 1)
                                        )
                                    }
                                    className="px-3 py-2 rounded-lg border border-gray/30 text-xs font-bold text-slate disabled:opacity-40 hover:border-navy hover:text-navy"
                                >
                                    Previous
                                </button>

                                <span className="px-3 py-2 rounded-lg bg-navy text-white text-xs font-bold">
                                    {currentPage}
                                </span>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setCurrentPage((page) => page + 1)
                                    }
                                    className="px-3 py-2 rounded-lg border border-gray/30 text-xs font-bold text-slate hover:border-navy hover:text-navy"
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