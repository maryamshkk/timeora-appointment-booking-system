import React, { useState } from "react";
import {
    Calendar,
    ChevronDown,
    ChevronRight,
    Download,
} from "lucide-react";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";

function Reports() {
    const [periodFilter, setPeriodFilter] = useState("month");

    const [dateRange, setDateRange] = useState({
        start: "2026-08-01",
        end: "2026-08-21",
    });

    function handleExport(event) {
        event.preventDefault();

        // TODO: axios GET /api/company/reports/export?format=csv
    }

    return (
        <div className="min-h-screen flex bg-beige">

            {/* Sidebar */}
            <Sidebar
                companyName="Shifa Clinic"
                activeItem="Reports"
            />

            {/* Main Area */}
            <div className="flex-1 min-w-0">

                {/* Topbar */}
                <Topbar
                    showBell
                    simpleProfileIcon
                    searchPlaceholder="Search..."
                />

                <main className="bg-beige px-4 sm:px-6 lg:px-8 py-6">

                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 mb-2">

                        <span className="text-xs font-bold uppercase tracking-wide text-slate">
                            Reports & Analytics
                        </span>

                        <ChevronRight className="w-3 h-3 text-gray" />

                        <span className="text-xs text-navy">
                            Reports
                        </span>

                    </div>

                    {/* Header */}
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 mb-6">

                        {/* Heading */}
                        <div>
                            <h1 className="font-serif text-4xl text-navy">
                                Reports
                            </h1>

                            <p className="text-sm text-slate mt-1.5 max-w-[440px]">
                                Review your company's appointment and operational
                                performance.
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3">

                            {/* Date Range */}
                            <button
                                type="button"
                                className="bg-white border border-gray/30 rounded-lg px-4 py-2.5 flex items-center justify-center gap-2 text-sm font-bold text-navy hover:border-navy transition"
                            >
                                <Calendar className="w-4 h-4" />

                                <span>
                                    01 Aug 2026 — 21 Aug 2026
                                </span>

                                <ChevronDown className="w-3.5 h-3.5" />
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

                    {/* Content will be added next */}

                </main>
            </div>
        </div>
    );
}

export default Reports;