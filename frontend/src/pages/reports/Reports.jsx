import React, { useState } from "react";
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
} from "lucide-react";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import StatCard from "../../components/dashboard/StatCard";

function Reports() {
    const [periodFilter, setPeriodFilter] = useState("month");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [dateRange, setDateRange] = useState({
        start: "2026-08-01",
        end: "2026-08-21",
    });

    const statCards = [
        {
            label: "TOTAL APPTS",
            value: 128,
            icon: CalendarDays,
            iconBg: "bg-gray/10",
            iconColor: "text-slate",
        },
        {
            label: "COMPLETED",
            value: 94,
            icon: CheckCircle2,
            iconBg: "bg-green-50",
            iconColor: "text-green-600",
        },
        {
            label: "CANCELLED",
            value: 12,
            icon: XCircle,
            iconBg: "bg-red-50",
            iconColor: "text-red-500",
        },
        {
            label: "NO-SHOW",
            value: 7,
            icon: UserX,
            iconBg: "bg-gold/15",
            iconColor: "text-amber-600",
        },
        {
            label: "PENDING",
            value: 15,
            icon: Clock,
            iconBg: "bg-gray/10",
            iconColor: "text-slate",
        },
    ];

    const reportCategories = [
        {
            title: "Appointment Report",
            description:
                "Detailed breakdown of all scheduled, completed, and missed appointments.",
            metric: "128 Entries",
            path: "/reports/appointments",
        },
        {
            title: "Staff Report",
            description:
                "Performance metrics, hours logged, and revenue generated per staff member.",
            metric: "8 Active",
            path: "/reports/staff",
        },
        {
            title: "Service Report",
            description:
                "Popularity and revenue analysis of individual services offered.",
            metric: "24 Services",
            path: "/reports/services",
        },
        {
            title: "Customer Report",
            description:
                "Client retention, new acquisitions, and individual lifetime value.",
            metric: "312 Clients",
            path: "/reports/customers",
        },
    ];

    function handleExport(event) {
        event.preventDefault();

        // TODO: axios GET /api/company/reports/export?format=csv
    }

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

                {/* Topbar */}
                <Topbar
                    onMenuClick={() => setSidebarOpen(true)}
                    showBell
                    simpleProfileIcon
                    searchPlaceholder="Search..."
                />

                <main className="flex-1 bg-beige px-4 py-5 sm:px-6 md:px-8 md:py-6">

                    {/* Breadcrumb */}
                    <div className="flex flex-wrap items-center gap-2 mb-2">

                        <span className="text-xs font-bold uppercase tracking-wide text-slate">
                            Reports &amp; Analytics
                        </span>

                        <ChevronRight className="w-3 h-3 text-gray" />

                        <span className="text-xs text-navy">
                            Reports
                        </span>

                    </div>

                    {/* Header */}
                    <div className="flex flex-col gap-5 mb-6 lg:flex-row lg:items-start lg:justify-between">

                        {/* Heading */}
                        <div>
                            <h1 className="font-serif text-2xl text-navy sm:text-3xl md:text-4xl">
                                Reports
                            </h1>

                            <p className="text-sm text-slate mt-1.5 max-w-[440px]">
                                Review your company's appointment and operational
                                performance.
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:flex-col lg:items-end">

                            {/* Date Range */}
                            <button
                                type="button"
                                className="bg-white border border-gray/30 rounded-lg px-4 py-2.5 flex items-center justify-center gap-2 text-sm font-bold text-navy hover:border-navy transition"
                            >
                                <Calendar className="w-4 h-4 shrink-0" />

                                <span className="whitespace-nowrap">
                                    01 Aug 2026 — 21 Aug 2026
                                </span>

                                <ChevronDown className="w-3.5 h-3.5 shrink-0" />
                            </button>

                            {/* Export */}
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

                    {/* Period Filter */}
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
                                    onClick={() => setPeriodFilter(period.key)}
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

                    {/* Statistics */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">

                        {statCards.map((card) => (
                            <StatCard
                                key={card.label}
                                label={card.label}
                                value={card.value}
                                icon={card.icon}
                                iconBg={card.iconBg}
                                iconColor={card.iconColor}
                            />
                        ))}

                    </div>

                    {/* Report Categories */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">

                        {reportCategories.map((report) => (
                            <div
                                key={report.title}
                                className="bg-white rounded-xl border border-gray/20 shadow-sm p-5 sm:p-6 flex flex-col"
                            >
                                <h2 className="font-serif text-lg text-navy sm:text-xl">
                                    {report.title}
                                </h2>

                                <div className="border-b border-gray/20 my-4" />

                                <p className="text-sm text-slate leading-relaxed flex-grow">
                                    {report.description}
                                </p>

                                <div className="flex items-center justify-between mt-6 gap-4">

                                    <span className="text-xs font-bold uppercase tracking-wide text-slate">
                                        {report.metric}
                                    </span>

                                    <Link
                                        to={report.path}
                                        className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-navy hover:text-gold transition whitespace-nowrap"
                                    >
                                        View
                                        <ArrowRight className="w-3.5 h-3.5" />
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