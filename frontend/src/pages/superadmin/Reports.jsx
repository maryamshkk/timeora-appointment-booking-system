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
                    {/* Content added in next steps */}
                </main>

            </div>

        </div>
    );
}

export default Reports;