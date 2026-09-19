import React, { useMemo, useState } from "react";
import {
    AlertTriangle,
    Building2,
    Calendar,
    ChevronDown,
    Clock,
    Hash,
    Mail,
    Megaphone,
    Plus,
    Search,
    TrendingUp,
    Wrench,
} from "lucide-react";

import SuperAdminSidebar from "../../components/superadmin/SuperAdminSidebar";
import SuperAdminTopbar from "../../components/superadmin/SuperAdminTopbar";

function AdminNotifications() {
    const [stats] = useState({
        unreadNotifications: 12,
        systemAlerts: 4,
        activeAnnouncements: 28,
        scheduled: 3,
    });

    const [activeTab, setActiveTab] = useState("notifications");

    const [searchQuery, setSearchQuery] = useState("");

    const [typeFilter, setTypeFilter] = useState("all");
    const [isTypeOpen, setIsTypeOpen] = useState(false);

    const [statusFilter, setStatusFilter] = useState("all");
    const [isStatusOpen, setIsStatusOpen] = useState(false);

    const [dateFilter, setDateFilter] = useState("last_7_days");
    const [isDateOpen, setIsDateOpen] = useState(false);

    const [notifications] = useState([
        {
            id: 1,
            title: "New company registered",
            description:
                "Shifa Clinic completed registration and is awaiting initial verification.",
            timestamp: "5m ago",
            tag: "#Company",
            category: "company",
            isUnread: true,
            isNew: true,
            actionLabel: "Review Details",
        },
        {
            id: 2,
            title: "Appointment volume increased",
            description:
                "Platform activity has increased by 15% compared to yesterday's baseline.",
            timestamp: "1h ago",
            tag: "#Platform",
            category: "platform",
            isUnread: false,
            isNew: false,
            actionLabel: null,
        },
        {
            id: 3,
            title: "System maintenance reminder",
            description:
                "Scheduled database maintenance will begin at 02:00 AM UTC. Expected downtime: 15 mins.",
            timestamp: "3h ago",
            tag: "#System",
            category: "system",
            isUnread: false,
            isNew: false,
            actionLabel: null,
        },
    ]);

    // TODO: Replace seeded notifications with a real fetch on mount.

    function handleCreateAnnouncement() {
        // TODO: Open an announcement composer.
    }

    function handleLoadMore() {
        // TODO: Fetch and append the next page of notifications.
    }

    function handleReviewDetails(id) {
        // TODO: Navigate to the relevant detail page (e.g. the new
        // company's Company Details page for `#Company` notifications).
    }

    const tabs = [
        { key: "notifications", label: "Notifications" },
        { key: "announcements", label: "Announcements" },
    ];

    return (
        <div className="min-h-screen bg-beige flex">

            <SuperAdminSidebar activeItem="Notifications" />

            <div className="flex-1 min-w-0 flex flex-col">

                <SuperAdminTopbar unreadCount={stats.unreadNotifications} />

                <main className="flex-1 px-8 py-6">

    {/* Header */}
    <div className="flex justify-between items-start gap-6 flex-wrap mb-6">

        <div>
            <h1 className="font-serif text-5xl text-navy">
                Notifications
            </h1>

            <p className="text-sm text-slate mt-1.5">
                System alerts, updates, and announcements across the platform.
            </p>
        </div>

        <button
            type="button"
            onClick={handleCreateAnnouncement}
            className="
                bg-navy text-white font-bold text-sm
                px-5 py-3 rounded-lg
                flex items-center gap-2
                hover:bg-gold hover:text-navy transition
                cursor-pointer flex-shrink-0
            "
        >
            <Plus className="w-4 h-4" />
            Create Announcement
        </button>

    </div>

    {/* Stat Cards */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">

        {/* Needs Attention */}
        <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6 relative overflow-hidden">

            {/* Decorative tint */}
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-red-100/60 blur-2xl pointer-events-none" />

            <div className="relative">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-11 h-11 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-red-600" />
                    </div>

                    <span className="text-sm font-bold text-red-600">
                        Needs Attention
                    </span>
                </div>

                <p className="text-5xl font-bold text-navy mb-1.5">
                    {stats.unreadNotifications}
                </p>

                <p className="text-sm text-slate">
                    Unread Notifications
                </p>
            </div>

        </div>

        {/* System Alerts */}
        <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6 relative overflow-hidden">

            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-amber-100/60 blur-2xl pointer-events-none" />

            <div className="relative">
                <div className="w-11 h-11 bg-amber-100 rounded-lg flex items-center justify-center mb-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600" />
                </div>

                <p className="text-5xl font-bold text-navy mb-1.5">
                    {stats.systemAlerts}
                </p>

                <p className="text-sm text-slate">
                    System Alerts
                </p>
            </div>

        </div>

        {/* Active Announcements */}
        <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6 relative overflow-hidden">

            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-navy/5 blur-2xl pointer-events-none" />

            <div className="relative">
                <div className="w-11 h-11 bg-gray/10 rounded-lg flex items-center justify-center mb-3">
                    <Megaphone className="w-5 h-5 text-navy" />
                </div>

                <p className="text-5xl font-bold text-navy mb-1.5">
                    {stats.activeAnnouncements}
                </p>

                <p className="text-sm text-slate">
                    Active Announcements
                </p>
            </div>

        </div>

        {/* Scheduled */}
        <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6 relative overflow-hidden">

            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-gold/20 blur-2xl pointer-events-none" />

            <div className="relative">
                <div className="w-11 h-11 bg-gray/10 rounded-lg flex items-center justify-center mb-3">
                    <Clock className="w-5 h-5 text-navy" />
                </div>

                <p className="text-5xl font-bold text-navy mb-1.5">
                    {stats.scheduled}
                </p>

                <p className="text-sm text-slate">
                    Scheduled
                </p>
            </div>

        </div>

    </div>

    {/* Tabs + filter row added next */}
    {/* Tabs + Filters */}
<div className="flex justify-between items-start flex-wrap gap-4 mb-5">

    {/* Tabs */}
    <div className="flex gap-8 border-b border-gray/20">

        {tabs.map((tab) => (
            <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`
                    font-serif text-2xl pb-2 border-b-2 transition cursor-pointer
                    ${
                        activeTab === tab.key
                            ? "text-navy border-navy"
                            : "text-slate border-transparent hover:text-navy"
                    }
                `}
            >
                {tab.label}
            </button>
        ))}

    </div>

    {/* Filter Panel */}
    <div className="bg-white border border-gray/20 rounded-lg p-4 grid grid-cols-2 gap-3">

        {/* Search */}
        <div className="relative col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray pointer-events-none" />

            <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search..."
                className="
                    w-full border border-gray rounded-lg
                    pl-9 pr-3 py-2.5 text-sm text-navy
                    bg-white outline-none focus:border-navy
                "
            />
        </div>

        {/* Type */}
        <div className="relative">
            <button
                type="button"
                onClick={() => {
                    setIsTypeOpen(!isTypeOpen);
                    setIsStatusOpen(false);
                    setIsDateOpen(false);
                }}
                className="
                    w-full bg-white border border-gray rounded-lg
                    px-4 py-2.5 flex justify-between items-center
                    text-sm font-bold text-navy cursor-pointer
                    hover:border-navy transition
                "
            >
                <span>
                    Type:{" "}
                    {typeFilter === "all"
                        ? "All"
                        : typeFilter.charAt(0).toUpperCase() + typeFilter.slice(1)}
                </span>

                <ChevronDown className="w-4 h-4 text-slate" />
            </button>

            {isTypeOpen && (
                <div className="absolute left-0 top-full mt-2 z-20 w-full bg-white border border-gray/20 rounded-lg shadow-lg p-1">
                    {[
                        { value: "all", label: "All" },
                        { value: "company", label: "Company" },
                        { value: "platform", label: "Platform" },
                        { value: "system", label: "System" },
                    ].map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => {
                                setTypeFilter(option.value);
                                setIsTypeOpen(false);
                            }}
                            className="w-full text-left px-3 py-2 rounded-md text-sm text-navy hover:bg-beige cursor-pointer"
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>

        {/* Status */}
        <div className="relative">
            <button
                type="button"
                onClick={() => {
                    setIsStatusOpen(!isStatusOpen);
                    setIsTypeOpen(false);
                    setIsDateOpen(false);
                }}
                className="
                    w-full bg-white border border-gray rounded-lg
                    px-4 py-2.5 flex justify-between items-center
                    text-sm font-bold text-navy cursor-pointer
                    hover:border-navy transition
                "
            >
                <span>
                    Status:{" "}
                    {statusFilter === "all"
                        ? "All"
                        : statusFilter === "unread"
                        ? "Unread"
                        : "Read"}
                </span>

                <ChevronDown className="w-4 h-4 text-slate" />
            </button>

            {isStatusOpen && (
                <div className="absolute left-0 top-full mt-2 z-20 w-full bg-white border border-gray/20 rounded-lg shadow-lg p-1">
                    {[
                        { value: "all", label: "All" },
                        { value: "unread", label: "Unread" },
                        { value: "read", label: "Read" },
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

        {/* Date */}
        <div className="relative col-span-2">
            <button
                type="button"
                onClick={() => {
                    setIsDateOpen(!isDateOpen);
                    setIsTypeOpen(false);
                    setIsStatusOpen(false);
                }}
                className="
                    w-full bg-white border border-gray rounded-lg
                    px-4 py-2.5 flex justify-between items-center
                    text-sm font-bold text-navy cursor-pointer
                    hover:border-navy transition
                "
            >
                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-slate" />

                    <span>
                        {dateFilter === "last_7_days"
                            ? "Last 7 Days"
                            : dateFilter === "last_30_days"
                            ? "Last 30 Days"
                            : "All Time"}
                    </span>
                </div>

                <ChevronDown className="w-4 h-4 text-slate" />
            </button>

            {isDateOpen && (
                <div className="absolute left-0 top-full mt-2 z-20 w-full bg-white border border-gray/20 rounded-lg shadow-lg p-1">
                    {[
                        { value: "last_7_days", label: "Last 7 Days" },
                        { value: "last_30_days", label: "Last 30 Days" },
                        { value: "all_time", label: "All Time" },
                    ].map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => {
                                setDateFilter(option.value);
                                setIsDateOpen(false);
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

{/* Feed card added next */}

</main>

            </div>

        </div>
    );
}

export default AdminNotifications;