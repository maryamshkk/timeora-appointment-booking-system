import React, { useState } from "react";
import {
    Calendar,
    ChevronDown,
    Lightbulb,
} from "lucide-react";

import SuperAdminSidebar from "../../components/superadmin/SuperAdminSidebar";
import SuperAdminTopbar from "../../components/superadmin/SuperAdminTopbar";

function AdminAnalytics() {
    const [dateRange] = useState({
        start: "2026-08-01",
        end: "2026-08-21",
    });

    const [compareWith, setCompareWith] = useState("previous_period");
    const [isCompareOpen, setIsCompareOpen] = useState(false);

    const [companyFilter, setCompanyFilter] = useState("all");
    const [isCompanyOpen, setIsCompanyOpen] = useState(false);

    const [keyInsight] = useState({
        text: "Appointment activity is trending upward compared with the previous reporting period.",
    });

    // TODO: Derive `keyInsight` from real data once filters are applied,
    // rather than seeding it as a static string.

    function handleApplyFilters() {
        // TODO: Refetch analytics data for the current filters and
        // recompute `keyInsight`.
    }

    return (
        <div className="min-h-screen bg-beige flex">

            <SuperAdminSidebar activeItem="Analytics" />

            <div className="flex-1 min-w-0 flex flex-col">

                <SuperAdminTopbar unreadCount={3} />

                <main className="flex-1 px-8 py-6">

    {/* Header */}
    <div className="mb-6">
        <h1 className="font-serif text-4xl text-navy mb-1.5">
            Analytics
        </h1>

        <p className="text-sm text-slate">
            Understand platform performance, trends, and activity across TIMEORA.
        </p>
    </div>

    {/* Filter Card */}
    <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6 mb-6">

        <div className="flex items-end gap-6 flex-wrap">

            {/* Date Range */}
            <div className="flex-1 min-w-[220px]">
                <label className="block text-xs font-bold uppercase tracking-wide text-navy mb-2">
                    Date Range
                </label>

                <button
                    type="button"
                    className="
                        w-full border border-gray rounded-lg
                        px-4 py-3 flex items-center gap-2
                        text-sm text-navy cursor-pointer
                        hover:border-navy transition
                        text-left
                    "
                >
                    <Calendar className="w-4 h-4 text-slate flex-shrink-0" />
                    <span>01 Aug 2026 — 21 Aug 2026</span>
                </button>
            </div>

            {/* Compare With */}
            <div className="relative flex-1 min-w-[200px]">
                <label className="block text-xs font-bold uppercase tracking-wide text-navy mb-2">
                    Compare With
                </label>

                <button
                    type="button"
                    onClick={() => {
                        setIsCompareOpen(!isCompareOpen);
                        setIsCompanyOpen(false);
                    }}
                    className="
                        w-full border border-gray rounded-lg
                        px-4 py-3 flex justify-between items-center
                        text-sm text-navy cursor-pointer
                        hover:border-navy transition
                    "
                >
                    <span>
                        {compareWith === "previous_period"
                            ? "Previous Period"
                            : compareWith === "previous_year"
                            ? "Previous Year"
                            : "No Comparison"}
                    </span>

                    <ChevronDown className="w-4 h-4 text-slate" />
                </button>

                {isCompareOpen && (
                    <div className="absolute left-0 top-full mt-2 z-20 w-full bg-white border border-gray/20 rounded-lg shadow-lg p-1">
                        {[
                            { value: "previous_period", label: "Previous Period" },
                            { value: "previous_year", label: "Previous Year" },
                            { value: "none", label: "No Comparison" },
                        ].map((option) => (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => {
                                    setCompareWith(option.value);
                                    setIsCompareOpen(false);
                                }}
                                className="w-full text-left px-3 py-2 rounded-md text-sm text-navy hover:bg-beige cursor-pointer"
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Company */}
            <div className="relative flex-1 min-w-[200px]">
                <label className="block text-xs font-bold uppercase tracking-wide text-navy mb-2">
                    Company
                </label>

                <button
                    type="button"
                    onClick={() => {
                        setIsCompanyOpen(!isCompanyOpen);
                        setIsCompareOpen(false);
                    }}
                    className="
                        w-full border border-gray rounded-lg
                        px-4 py-3 flex justify-between items-center
                        text-sm text-navy cursor-pointer
                        hover:border-navy transition
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

            {/* Apply */}
            <button
                type="button"
                onClick={handleApplyFilters}
                className="
                    bg-gold text-navy font-bold text-sm
                    px-6 py-3 rounded-lg
                    hover:bg-navy hover:text-white transition
                    cursor-pointer flex-shrink-0
                "
            >
                Apply
            </button>

        </div>

    </div>

    {/* Key Insight card added next */}

</main>

            </div>

        </div>
    );
}

export default AdminAnalytics;