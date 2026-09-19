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

                

            </div>

        </div>
    );
}

export default AdminAnalytics;