import React, { useState } from "react";
import {
    AlertTriangle,
    Calendar,
    CheckCircle2,
    ChevronDown,
    MoreHorizontal,
    RefreshCw,
    TrendingUp,
} from "lucide-react";

import SuperAdminSidebar from "../../components/superadmin/SuperAdminSidebar";
import SuperAdminTopbar from "../../components/superadmin/SuperAdminTopbar";

function Reports() {
    const [dateRange] = useState({
        start: "2026-08-01",
        end: "2026-08-21",
    });

    const [companyFilter, setCompanyFilter] = useState("all");
    const [isCompanyOpen, setIsCompanyOpen] = useState(false);

    const [statusFilter, setStatusFilter] = useState("all");
    const [isStatusOpen, setIsStatusOpen] = useState(false);

    const [lastUpdated] = useState("21 Aug 2026 · 05:12 PM");

    const [stats] = useState({
        totalAppointments: 12480,
        completed: { value: 9842, ratePercent: 78.8 },
        cancelled: { value: 1126, ratePercent: 9.0 },
        noShow: { value: 482, ratePercent: 3.8 },
        activeCompanies: 248,
        activeStaff: 1840,
        customersServed: 18920,
        services: 3420,
    });

    const [activeTab, setActiveTab] = useState("overview");

    const [performanceTrend] = useState([
        {
            date: "Aug 01, 2026",
            totalAppts: 420,
            completed: 340,
            cancelled: 32,
            noShow: 18,
            completionRate: 81,
        },
        {
            date: "Aug 02, 2026",
            totalAppts: 445,
            completed: 362,
            cancelled: 40,
            noShow: 15,
            completionRate: 81,
        },
        {
            date: "Aug 03, 2026",
            totalAppts: 390,
            completed: 315,
            cancelled: 28,
            noShow: 20,
            completionRate: 81,
        },
        {
            date: "Aug 04, 2026",
            totalAppts: 480,
            completed: 395,
            cancelled: 35,
            noShow: 12,
            completionRate: 82,
        },
    ]);

    const [overallCompletionRate] = useState({
        value: 81.4,
        deltaPercent: 3.2,
    });

    const [topCompanies] = useState([
        { initials: "SC", name: "Shifa Clinic", category: "Medical", value: 1240 },
        { initials: "EF", name: "Elite Fitness", category: "Wellness", value: 980 },
        { initials: "UW", name: "Urban Wellness", category: "Spa & Care", value: 740 },
    ]);

    // TODO: Replace seeded report data with a real fetch on mount.

    function handleRefresh() {
        // TODO: Refetch all report data, update `lastUpdated`.
    }

    function handleExportReport() {
        // TODO: Generate/download the report.
    }

    function handleClearFilters() {
        setCompanyFilter("all");
        setStatusFilter("all");

        // TODO: Refetch with cleared filters.
    }

    function handleApplyFilters() {
        // TODO: Refetch with the current filters applied.
    }

    function handleViewFullReport() {
        // TODO: Navigate to a fuller performance-trend view.
    }

    const tabs = [
        { key: "overview", label: "Overview" },
        { key: "appointments", label: "Appointments" },
        { key: "companies", label: "Companies" },
        { key: "staff", label: "Staff" },
        { key: "services", label: "Services" },
        { key: "customers", label: "Customers" },
    ];

    return (
        <div className="min-h-screen bg-beige flex">

            <SuperAdminSidebar activeItem="Reports" />

            <div className="flex-1 min-w-0 flex flex-col">

                <SuperAdminTopbar unreadCount={3} />

                <main className="flex-1 px-8 py-6">

    {/* Header */}
    <div className="flex justify-between items-start flex-wrap gap-4 mb-6">

        <div>
            <h1 className="font-serif text-4xl text-navy">
                Reports
            </h1>

            <p className="text-sm text-slate mt-1.5">
                Generate and review operational reports across TIMEORA.
            </p>
        </div>

        <div className="flex items-center gap-4 flex-wrap">

            <span className="text-xs text-slate max-w-[180px]">
                Last updated: {lastUpdated}
            </span>

            <button
                type="button"
                onClick={handleRefresh}
                aria-label="Refresh"
                className="
                    text-navy hover:rotate-180 transition-transform
                    cursor-pointer
                "
            >
                <RefreshCw className="w-[18px] h-[18px]" />
            </button>

            <button
                type="button"
                onClick={handleExportReport}
                className="
                    bg-navy text-white uppercase tracking-wide
                    font-bold text-sm px-6 py-3 rounded-lg
                    hover:bg-gold hover:text-navy transition
                    cursor-pointer
                "
            >
                Export Report
            </button>

        </div>

    </div>

    {/* Filter Card */}
    <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6 mb-6">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-5">

            {/* Date Range */}
            <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-navy mb-2">
                    Date Range
                </label>

                <button
                    type="button"
                    className="
                        w-full border border-gray rounded-lg
                        px-4 py-3 flex items-center justify-between
                        text-sm text-navy cursor-pointer hover:border-navy transition
                    "
                >
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-slate" />
                        <span>01 Aug 2026 - 21 Aug 2026</span>
                    </div>

                    <ChevronDown className="w-4 h-4 text-slate" />
                </button>
            </div>

            {/* Company */}
            <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-navy mb-2">
                    Company
                </label>

                <div className="relative">
                    <button
                        type="button"
                        onClick={() => {
                            setIsCompanyOpen(!isCompanyOpen);
                            setIsStatusOpen(false);
                        }}
                        className="
                            w-full border border-gray rounded-lg
                            px-4 py-3 flex items-center justify-between
                            text-sm text-navy cursor-pointer hover:border-navy transition
                        "
                    >
                        <span>
                            {companyFilter === "all"
                                ? "All Companies"
                                : companyFilter === "shifa-clinic"
                                ? "Shifa Clinic"
                                : "Elite Fitness"}
                        </span>

                        <ChevronDown className="w-4 h-4 text-slate" />
                    </button>

                    {isCompanyOpen && (
                        <div className="absolute left-0 top-full mt-2 z-20 w-full bg-white border border-gray/20 rounded-lg shadow-lg p-1">
                            {[
                                { value: "all", label: "All Companies" },
                                { value: "shifa-clinic", label: "Shifa Clinic" },
                                { value: "elite-fitness", label: "Elite Fitness" },
                            ].map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => {
                                        setCompanyFilter(option.value);
                                        setIsCompanyOpen(false);
                                    }}
                                    className="w-full text-left px-3 py-2 rounded-md text-sm text-navy hover:bg-beige cursor-pointer"
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Status */}
            <div>
                <label className="block text-xs font-bold uppercase tracking-wide text-navy mb-2">
                    Status
                </label>

                <div className="relative">
                    <button
                        type="button"
                        onClick={() => {
                            setIsStatusOpen(!isStatusOpen);
                            setIsCompanyOpen(false);
                        }}
                        className="
                            w-full border border-gray rounded-lg
                            px-4 py-3 flex items-center justify-between
                            text-sm text-navy cursor-pointer hover:border-navy transition
                        "
                    >
                        <span>
                            {statusFilter === "all"
                                ? "All Statuses"
                                : statusFilter === "confirmed"
                                ? "Confirmed"
                                : statusFilter === "completed"
                                ? "Completed"
                                : "Cancelled"}
                        </span>

                        <ChevronDown className="w-4 h-4 text-slate" />
                    </button>

                    {isStatusOpen && (
                        <div className="absolute left-0 top-full mt-2 z-20 w-full bg-white border border-gray/20 rounded-lg shadow-lg p-1">
                            {[
                                { value: "all", label: "All Statuses" },
                                { value: "confirmed", label: "Confirmed" },
                                { value: "completed", label: "Completed" },
                                { value: "cancelled", label: "Cancelled" },
                            ].map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => {
                                        setStatusFilter(option.value);
                                        setIsStatusOpen(false);
                                    }}
                                    className="w-full text-left px-3 py-2 rounded-md text-sm text-navy hover:bg-beige cursor-pointer"
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

        </div>

        {/* Actions */}
        <div className="flex gap-3 flex-wrap">

            <button
                type="button"
                onClick={handleClearFilters}
                className="
                    bg-white border border-gray text-navy
                    uppercase tracking-wide font-bold text-sm
                    px-5 py-2.5 rounded-lg
                    hover:border-navy transition cursor-pointer
                "
            >
                Clear Filters
            </button>

            <button
                type="button"
                onClick={handleApplyFilters}
                className="
                    bg-gold text-navy uppercase tracking-wide
                    font-bold text-sm px-5 py-2.5 rounded-lg
                    hover:bg-navy hover:text-white transition
                    cursor-pointer
                "
            >
                Apply Filters
            </button>

        </div>

    </div>

    {/* Stat rows added next */}
    {/* Stat Cards — Row 1 */}
<div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-4">

    {/* Total Appointments */}
    <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6">
        <div className="flex justify-between items-center mb-2.5">
            <span className="text-xs font-bold uppercase tracking-wide text-slate">
                Total Appointments
            </span>

            <Calendar className="w-[18px] h-[18px] text-navy" />
        </div>

        <p className="text-4xl font-bold text-navy">
            {stats.totalAppointments.toLocaleString()}
        </p>
    </div>

    {/* Completed */}
    <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6">
        <div className="flex justify-between items-center mb-2.5">
            <span className="text-xs font-bold uppercase tracking-wide text-slate">
                Completed
            </span>

            <CheckCircle2 className="w-[18px] h-[18px] text-green-600" />
        </div>

        <p className="text-4xl font-bold text-navy mb-2">
            {stats.completed.value.toLocaleString()}
        </p>

        <div className="flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-green-600" />
            <span className="text-sm font-bold text-green-600">
                {stats.completed.ratePercent}%
            </span>
        </div>
    </div>

    {/* Cancelled */}
    <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6">
        <div className="flex justify-between items-center mb-2.5">
            <span className="text-xs font-bold uppercase tracking-wide text-slate">
                Cancelled
            </span>
        </div>

        <p className="text-4xl font-bold text-navy mb-2">
            {stats.cancelled.value.toLocaleString()}
        </p>

        <p className="text-sm font-bold text-slate">
            {stats.cancelled.ratePercent}%
        </p>
    </div>

    {/* No-Show */}
    <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6">
        <div className="flex justify-between items-center mb-2.5">
            <span className="text-xs font-bold uppercase tracking-wide text-slate">
                No-Show
            </span>
        </div>

        <p className="text-4xl font-bold text-navy mb-2">
            {stats.noShow.value.toLocaleString()}
        </p>

        <div className="flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5 text-red-600" />
            <span className="text-sm font-bold text-red-600">
                {stats.noShow.ratePercent}%
            </span>
        </div>
    </div>

</div>

{/* Stat Cards — Row 2 */}
<div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">

    <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6">
        <p className="text-xs font-bold uppercase tracking-wide text-slate mb-2">
            Active Companies
        </p>

        <p className="text-3xl font-bold text-navy">
            {stats.activeCompanies}
        </p>
    </div>

    <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6">
        <p className="text-xs font-bold uppercase tracking-wide text-slate mb-2">
            Active Staff
        </p>

        <p className="text-3xl font-bold text-navy">
            {stats.activeStaff.toLocaleString()}
        </p>
    </div>

    <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6">
        <p className="text-xs font-bold uppercase tracking-wide text-slate mb-2">
            Customers Served
        </p>

        <p className="text-3xl font-bold text-navy">
            {stats.customersServed.toLocaleString()}
        </p>
    </div>

    <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6">
        <p className="text-xs font-bold uppercase tracking-wide text-slate mb-2">
            Services
        </p>

        <p className="text-3xl font-bold text-navy">
            {stats.services.toLocaleString()}
        </p>
    </div>

</div>

</main>

            </div>

        </div>
    );
}

export default Reports;