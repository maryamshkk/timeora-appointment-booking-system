import React, { useState } from "react";
import {
    AlertTriangle,
    Building2,
    Calendar,
    CheckCircle2,
    ChevronDown,
    MoreHorizontal,
    RefreshCw,
    TrendingUp,
    Users,
    UserCheck,
    Briefcase,
    ClipboardList,
} from "lucide-react";

import SuperAdminSidebar from "../../components/superadmin/SuperAdminSidebar";
import SuperAdminTopbar from "../../components/superadmin/SuperAdminTopbar";

function AdminReports() {
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
        { date: "Aug 01, 2026", totalAppts: 420, completed: 340, cancelled: 32, noShow: 18, completionRate: 81 },
        { date: "Aug 02, 2026", totalAppts: 445, completed: 362, cancelled: 40, noShow: 15, completionRate: 81 },
        { date: "Aug 03, 2026", totalAppts: 390, completed: 315, cancelled: 28, noShow: 20, completionRate: 81 },
        { date: "Aug 04, 2026", totalAppts: 480, completed: 395, cancelled: 35, noShow: 12, completionRate: 82 },
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

    // ─── Tab-specific seed data ───

    const [appointmentsReport] = useState({
        byStatus: [
            { label: "Confirmed", value: 1512, percent: 12.1, color: "bg-blue-500" },
            { label: "Completed", value: 9842, percent: 78.8, color: "bg-green-600" },
            { label: "Cancelled", value: 1126, percent: 9.0, color: "bg-red-600" },
            { label: "No-Show", value: 482, percent: 3.8, color: "bg-amber-500" },
        ],
        peakHours: [
            { hour: "09:00", count: 340 },
            { hour: "10:00", count: 420 },
            { hour: "11:00", count: 380 },
            { hour: "12:00", count: 260 },
            { hour: "13:00", count: 180 },
            { hour: "14:00", count: 310 },
            { hour: "15:00", count: 350 },
            { hour: "16:00", count: 290 },
        ],
    });

    const [companiesReport] = useState({
        rows: [
            { name: "Shifa Clinic", category: "Medical", appointments: 1240, staff: 18, customers: 890, status: "Active" },
            { name: "Elite Fitness", category: "Wellness", appointments: 980, staff: 12, customers: 640, status: "Active" },
            { name: "Urban Wellness", category: "Spa & Care", appointments: 740, staff: 8, customers: 420, status: "Active" },
            { name: "Vertex Consulting", category: "Consulting", appointments: 520, staff: 45, customers: 210, status: "Active" },
            { name: "Lumina Spa", category: "Spa & Care", appointments: 460, staff: 6, customers: 180, status: "Inactive" },
        ],
    });

    const [staffReport] = useState({
        rows: [
            { name: "Dr. Sara Ahmed", role: "Doctor", company: "Shifa Clinic", appointments: 128, rating: 4.9 },
            { name: "Mike Tyson", role: "Trainer", company: "Elite Fitness", appointments: 96, rating: 4.7 },
            { name: "Maham Raza", role: "Therapist", company: "Urban Wellness", appointments: 42, rating: 4.8 },
            { name: "Ali Khan", role: "Consultant", company: "Vertex Consulting", appointments: 89, rating: 4.6 },
        ],
    });

    const [servicesReport] = useState({
        rows: [
            { name: "Initial Consultation", category: "Medical", bookings: 3240, revenue: 8100000 },
            { name: "Personal Training", category: "Fitness", bookings: 2180, revenue: 4360000 },
            { name: "Therapy Session", category: "Wellness", bookings: 1560, revenue: 3900000 },
            { name: "Spa Treatment", category: "Spa & Care", bookings: 890, revenue: 1780000 },
        ],
    });

    const [customersReport] = useState({
        rows: [
            { name: "Hina Malik", email: "hina@example.com", appointments: 8, lastActive: "Today", status: "Active" },
            { name: "Ayesha Khan", email: "ayesha@example.com", appointments: 3, lastActive: "Yesterday", status: "Active" },
            { name: "Ali Khan", email: "ali@example.com", appointments: 6, lastActive: "2 days ago", status: "Active" },
            { name: "Maham Ali", email: "maham@example.com", appointments: 0, lastActive: "15 Aug 2026", status: "Inactive" },
        ],
    });

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

                    {/* Stat Cards — Row 1 */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-4">

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

                    {/* Tabs */}
                    <div className="flex items-center gap-8 border-b border-gray/20 mb-5 overflow-x-auto">

                        {tabs.map((tab) => (
                            <button
                                key={tab.key}
                                type="button"
                                onClick={() => setActiveTab(tab.key)}
                                className={`
                                    text-sm font-bold uppercase tracking-wide
                                    whitespace-nowrap pb-3 border-b-2 transition cursor-pointer
                                    ${
                                        activeTab === tab.key
                                            ? "text-navy border-gold"
                                            : "text-slate border-transparent hover:text-navy"
                                    }
                                `}
                            >
                                {tab.label}
                            </button>
                        ))}

                    </div>

                    {/* ─── OVERVIEW TAB ─── */}
                    {activeTab === "overview" && (
                        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">

                            {/* Left — Performance Trend */}
                            <div className="bg-white rounded-xl border border-gray/20 shadow-sm overflow-hidden">

                                <div className="flex justify-between items-center gap-4 p-6">
                                    <h2 className="font-serif text-2xl text-navy">
                                        Performance Trend
                                    </h2>

                                    <button
                                        type="button"
                                        aria-label="More options"
                                        className="text-slate hover:text-navy transition cursor-pointer"
                                    >
                                        <MoreHorizontal className="w-[18px] h-[18px]" />
                                    </button>
                                </div>

                                <div className="overflow-x-auto">

                                    <div className="grid grid-cols-[100px_90px_100px_100px_90px_110px] px-6 py-3 bg-beige/40 text-xs font-bold uppercase tracking-wide text-slate min-w-[700px]">
                                        <span>Date</span>
                                        <span>Total Appts</span>
                                        <span>Completed</span>
                                        <span>Cancelled</span>
                                        <span>No-Show</span>
                                        <span>Completion</span>
                                    </div>

                                    {performanceTrend.map((row, index) => (
                                        <div
                                            key={row.date}
                                            className={`
                                                grid grid-cols-[100px_90px_100px_100px_90px_110px]
                                                px-6 py-4 min-w-[700px]
                                                ${index !== performanceTrend.length - 1 ? "border-b border-gray/20" : ""}
                                            `}
                                        >
                                            <span className="text-sm text-navy self-center">
                                                {row.date}
                                            </span>

                                            <span className="text-sm text-navy self-center">
                                                {row.totalAppts}
                                            </span>

                                            <span className="text-sm font-bold text-green-600 self-center">
                                                {row.completed}
                                            </span>

                                            <span className="text-sm text-navy self-center">
                                                {row.cancelled}
                                            </span>

                                            <span className="text-sm text-navy self-center">
                                                {row.noShow}
                                            </span>

                                            <span className="text-sm font-bold text-navy self-center">
                                                {row.completionRate}%
                                            </span>
                                        </div>
                                    ))}

                                </div>

                                <button
                                    type="button"
                                    onClick={handleViewFullReport}
                                    className="
                                        block w-full bg-beige/40 text-navy
                                        font-bold uppercase tracking-wide text-sm
                                        py-3 text-center
                                        hover:bg-beige/60 transition cursor-pointer
                                    "
                                >
                                    View Full Report
                                </button>

                            </div>

                            {/* Right Column */}
                            <aside className="flex flex-col gap-5">

                                <div className="bg-navy text-white rounded-xl p-6">
                                    <div className="flex justify-between items-center mb-3.5">
                                        <span className="text-xs font-bold uppercase tracking-wide text-white/60">
                                            Overall Completion Rate
                                        </span>

                                        <CheckCircle2 className="w-[18px] h-[18px] text-white/70" />
                                    </div>

                                    <p className="font-serif text-5xl text-white mb-2.5">
                                        {overallCompletionRate.value}%
                                    </p>

                                    <div className="flex items-center gap-1.5">
                                        <TrendingUp className="w-3.5 h-3.5 text-green-400" />
                                        <span className="text-sm font-bold text-green-400">
                                            +{overallCompletionRate.deltaPercent}% vs previous period
                                        </span>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6">

                                    <h2 className="font-serif text-2xl text-navy mb-5">
                                        Top Companies by Volume
                                    </h2>

                                    {topCompanies.map((company, index) => {
                                        const maxValue = Math.max(
                                            ...topCompanies.map((c) => c.value)
                                        );

                                        const widthPercent = (company.value / maxValue) * 100;

                                        const fillColors = [
                                            "bg-navy",
                                            "bg-blue-500",
                                            "bg-gray/50",
                                        ];

                                        return (
                                            <div
                                                key={company.name}
                                                className={
                                                    index !== topCompanies.length - 1 ? "mb-4" : ""
                                                }
                                            >
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className="w-9 h-9 bg-gray/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                                        <span className="text-xs font-bold text-navy">
                                                            {company.initials}
                                                        </span>
                                                    </div>

                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-bold text-navy truncate">
                                                            {company.name}
                                                        </p>

                                                        <p className="text-xs text-slate truncate">
                                                            {company.category}
                                                        </p>
                                                    </div>

                                                    <span className="text-sm font-bold text-navy">
                                                        {company.value.toLocaleString()}
                                                    </span>
                                                </div>

                                                <div className="h-1.5 rounded-full bg-gray/15 overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full ${fillColors[index % fillColors.length]}`}
                                                        style={{ width: `${widthPercent}%` }}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}

                                </div>

                            </aside>

                        </div>
                    )}

                    {/* ─── APPOINTMENTS TAB ─── */}
                    {activeTab === "appointments" && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                            {/* By Status */}
                            <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6">

                                <h2 className="font-serif text-2xl text-navy mb-5">
                                    Appointments by Status
                                </h2>

                                <div className="flex flex-col gap-4">
                                    {appointmentsReport.byStatus.map((item) => (
                                        <div key={item.label}>
                                            <div className="flex justify-between items-center mb-1.5">
                                                <span className="text-sm font-bold text-navy">
                                                    {item.label}
                                                </span>

                                                <span className="text-sm text-slate">
                                                    {item.value.toLocaleString()} ·{" "}
                                                    {item.percent}%
                                                </span>
                                            </div>

                                            <div className="h-2 rounded-full bg-gray/15 overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${item.color}`}
                                                    style={{ width: `${item.percent}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>

                            </div>

                            {/* Peak Hours */}
                            <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6">

                                <h2 className="font-serif text-2xl text-navy mb-5">
                                    Peak Booking Hours
                                </h2>

                                <div className="flex items-end justify-between gap-2 h-52">

                                    {appointmentsReport.peakHours.map((slot) => {
                                        const maxCount = Math.max(
                                            ...appointmentsReport.peakHours.map((s) => s.count)
                                        );

                                        const heightPercent = (slot.count / maxCount) * 100;

                                        return (
                                            <div
                                                key={slot.hour}
                                                className="flex flex-col items-center gap-2 flex-1"
                                            >
                                                <span className="text-xs font-bold text-navy">
                                                    {slot.count}
                                                </span>

                                                <div
                                                    className="w-full bg-navy rounded-t-md"
                                                    style={{ height: `${heightPercent}%` }}
                                                />

                                                <span className="text-xs text-slate">
                                                    {slot.hour}
                                                </span>
                                            </div>
                                        );
                                    })}

                                </div>

                            </div>

                        </div>
                    )}

                    {/* ─── COMPANIES TAB ─── */}
                    {activeTab === "companies" && (
                        <div className="bg-white rounded-xl border border-gray/20 shadow-sm overflow-hidden">

                            <div className="flex justify-between items-center gap-4 p-6">
                                <h2 className="font-serif text-2xl text-navy">
                                    Company Performance
                                </h2>

                                <Building2 className="w-5 h-5 text-navy" />
                            </div>

                            <div className="overflow-x-auto">

                                <div className="grid grid-cols-[1.4fr_1fr_110px_90px_110px_100px] px-6 py-3 bg-beige/40 text-xs font-bold uppercase tracking-wide text-slate min-w-[800px]">
                                    <span>Company</span>
                                    <span>Category</span>
                                    <span>Appointments</span>
                                    <span>Staff</span>
                                    <span>Customers</span>
                                    <span>Status</span>
                                </div>

                                {companiesReport.rows.map((row, index) => (
                                    <div
                                        key={row.name}
                                        className={`
                                            grid grid-cols-[1.4fr_1fr_110px_90px_110px_100px]
                                            px-6 py-4 min-w-[800px]
                                            ${index !== companiesReport.rows.length - 1 ? "border-b border-gray/20" : ""}
                                        `}
                                    >
                                        <span className="text-sm font-bold text-navy self-center">
                                            {row.name}
                                        </span>

                                        <span className="text-sm text-slate self-center">
                                            {row.category}
                                        </span>

                                        <span className="text-sm font-bold text-navy self-center">
                                            {row.appointments.toLocaleString()}
                                        </span>

                                        <span className="text-sm text-navy self-center">
                                            {row.staff}
                                        </span>

                                        <span className="text-sm text-navy self-center">
                                            {row.customers.toLocaleString()}
                                        </span>

                                        <span className="self-center">
                                            <span
                                                className={`
                                                    text-xs font-bold px-2.5 py-1 rounded-full
                                                    ${
                                                        row.status === "Active"
                                                            ? "bg-green-50 text-green-700"
                                                            : "bg-gray/10 text-slate"
                                                    }
                                                `}
                                            >
                                                {row.status}
                                            </span>
                                        </span>
                                    </div>
                                ))}

                            </div>

                        </div>
                    )}

                    {/* ─── STAFF TAB ─── */}
                    {activeTab === "staff" && (
                        <div className="bg-white rounded-xl border border-gray/20 shadow-sm overflow-hidden">

                            <div className="flex justify-between items-center gap-4 p-6">
                                <h2 className="font-serif text-2xl text-navy">
                                    Staff Performance
                                </h2>

                                <UserCheck className="w-5 h-5 text-navy" />
                            </div>

                            <div className="overflow-x-auto">

                                <div className="grid grid-cols-[1.4fr_1fr_1.2fr_120px_100px] px-6 py-3 bg-beige/40 text-xs font-bold uppercase tracking-wide text-slate min-w-[700px]">
                                    <span>Staff Member</span>
                                    <span>Role</span>
                                    <span>Company</span>
                                    <span>Appointments</span>
                                    <span>Rating</span>
                                </div>

                                {staffReport.rows.map((row, index) => (
                                    <div
                                        key={row.name}
                                        className={`
                                            grid grid-cols-[1.4fr_1fr_1.2fr_120px_100px]
                                            px-6 py-4 min-w-[700px]
                                            ${index !== staffReport.rows.length - 1 ? "border-b border-gray/20" : ""}
                                        `}
                                    >
                                        <span className="text-sm font-bold text-navy self-center">
                                            {row.name}
                                        </span>

                                        <span className="text-sm text-slate self-center">
                                            {row.role}
                                        </span>

                                        <span className="text-sm text-navy self-center">
                                            {row.company}
                                        </span>

                                        <span className="text-sm font-bold text-navy self-center">
                                            {row.appointments}
                                        </span>

                                        <span className="text-sm font-bold text-gold self-center">
                                            ★ {row.rating}
                                        </span>
                                    </div>
                                ))}

                            </div>

                        </div>
                    )}

                    {/* ─── SERVICES TAB ─── */}
                    {activeTab === "services" && (
                        <div className="bg-white rounded-xl border border-gray/20 shadow-sm overflow-hidden">

                            <div className="flex justify-between items-center gap-4 p-6">
                                <h2 className="font-serif text-2xl text-navy">
                                    Service Performance
                                </h2>

                                <ClipboardList className="w-5 h-5 text-navy" />
                            </div>

                            <div className="overflow-x-auto">

                                <div className="grid grid-cols-[1.5fr_1fr_120px_1fr] px-6 py-3 bg-beige/40 text-xs font-bold uppercase tracking-wide text-slate min-w-[700px]">
                                    <span>Service</span>
                                    <span>Category</span>
                                    <span>Bookings</span>
                                    <span>Revenue</span>
                                </div>

                                {servicesReport.rows.map((row, index) => (
                                    <div
                                        key={row.name}
                                        className={`
                                            grid grid-cols-[1.5fr_1fr_120px_1fr]
                                            px-6 py-4 min-w-[700px]
                                            ${index !== servicesReport.rows.length - 1 ? "border-b border-gray/20" : ""}
                                        `}
                                    >
                                        <span className="text-sm font-bold text-navy self-center">
                                            {row.name}
                                        </span>

                                        <span className="text-sm text-slate self-center">
                                            {row.category}
                                        </span>

                                        <span className="text-sm font-bold text-navy self-center">
                                            {row.bookings.toLocaleString()}
                                        </span>

                                        <span className="text-sm font-bold text-navy self-center">
                                            PKR {row.revenue.toLocaleString()}
                                        </span>
                                    </div>
                                ))}

                            </div>

                        </div>
                    )}

                    {/* ─── CUSTOMERS TAB ─── */}
                    {activeTab === "customers" && (
                        <div className="bg-white rounded-xl border border-gray/20 shadow-sm overflow-hidden">

                            <div className="flex justify-between items-center gap-4 p-6">
                                <h2 className="font-serif text-2xl text-navy">
                                    Customer Insights
                                </h2>

                                <Users className="w-5 h-5 text-navy" />
                            </div>

                            <div className="overflow-x-auto">

                                <div className="grid grid-cols-[1.3fr_1.5fr_130px_130px_100px] px-6 py-3 bg-beige/40 text-xs font-bold uppercase tracking-wide text-slate min-w-[800px]">
                                    <span>Customer</span>
                                    <span>Email</span>
                                    <span>Appointments</span>
                                    <span>Last Active</span>
                                    <span>Status</span>
                                </div>

                                {customersReport.rows.map((row, index) => (
                                    <div
                                        key={row.email}
                                        className={`
                                            grid grid-cols-[1.3fr_1.5fr_130px_130px_100px]
                                            px-6 py-4 min-w-[800px]
                                            ${index !== customersReport.rows.length - 1 ? "border-b border-gray/20" : ""}
                                        `}
                                    >
                                        <span className="text-sm font-bold text-navy self-center">
                                            {row.name}
                                        </span>

                                        <span className="text-sm text-slate self-center truncate">
                                            {row.email}
                                        </span>

                                        <span className="text-sm font-bold text-navy self-center">
                                            {row.appointments}
                                        </span>

                                        <span className="text-sm text-slate self-center">
                                            {row.lastActive}
                                        </span>

                                        <span className="self-center">
                                            <span
                                                className={`
                                                    text-xs font-bold px-2.5 py-1 rounded-full
                                                    ${
                                                        row.status === "Active"
                                                            ? "bg-green-50 text-green-700"
                                                            : "bg-gray/10 text-slate"
                                                    }
                                                `}
                                            >
                                                {row.status}
                                            </span>
                                        </span>
                                    </div>
                                ))}

                            </div>

                        </div>
                    )}

                </main>

            </div>

        </div>
    );
}

export default AdminReports;