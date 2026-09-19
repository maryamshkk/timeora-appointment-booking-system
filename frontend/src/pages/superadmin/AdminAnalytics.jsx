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
    Send,
    TrendingUp,
    Users,
    Wrench,
    X,
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

    // Shared filters
    const [searchQuery, setSearchQuery] = useState("");
    const [typeFilter, setTypeFilter] = useState("all");
    const [isTypeOpen, setIsTypeOpen] = useState(false);
    const [statusFilter, setStatusFilter] = useState("all");
    const [isStatusOpen, setIsStatusOpen] = useState(false);
    const [dateFilter, setDateFilter] = useState("last_7_days");
    const [isDateOpen, setIsDateOpen] = useState(false);

    // ─── Notifications state ───
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            title: "New company registered",
            description:
                "Shifa Clinic completed registration and is awaiting initial verification.",
            timestamp: "5m ago",
            dateSortKey: "2026-08-21",
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
            dateSortKey: "2026-08-21",
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
            dateSortKey: "2026-08-21",
            tag: "#System",
            category: "system",
            isUnread: false,
            isNew: false,
            actionLabel: null,
        },
    ]);

    // ─── Announcements state ───
    const [announcements, setAnnouncements] = useState([
        {
            id: 1,
            title: "Platform-wide maintenance window",
            description:
                "All booking flows will be paused on 25 Aug 2026 from 02:00 to 02:30 AM UTC for scheduled infrastructure upgrades.",
            audience: "All Companies",
            status: "active",
            publishedAt: "18 Aug 2026 · 10:15 AM",
            recipients: 248,
        },
        {
            id: 2,
            title: "New pricing tier now available",
            description:
                "Introducing the Premium tier with advanced analytics and priority support. Rolling out to selected companies this week.",
            audience: "Shifa Clinic + 12 others",
            status: "active",
            publishedAt: "15 Aug 2026 · 02:30 PM",
            recipients: 13,
        },
        {
            id: 3,
            title: "Holiday schedule reminder",
            description:
                "All Timeora-operated support will be reduced on 14 Sep 2026. Companies should update their availability accordingly.",
            audience: "All Companies",
            status: "scheduled",
            publishedAt: "Scheduled for 10 Sep 2026",
            recipients: 0,
        },
    ]);

    const [isComposerOpen, setIsComposerOpen] = useState(false);
    const [composerData, setComposerData] = useState({
        title: "",
        description: "",
        audience: "All Companies",
    });

    // TODO: Replace seeded notifications + announcements with real fetches.

    // ─────────────── Derived lists ───────────────

    const filteredNotifications = useMemo(() => {
        const search = searchQuery.trim().toLowerCase();

        return notifications.filter((item) => {
            const matchesSearch =
                !search ||
                item.title.toLowerCase().includes(search) ||
                item.description.toLowerCase().includes(search) ||
                item.tag.toLowerCase().includes(search);

            const matchesType =
                typeFilter === "all" || item.category === typeFilter;

            const matchesStatus =
                statusFilter === "all" ||
                (statusFilter === "unread" && item.isUnread) ||
                (statusFilter === "read" && !item.isUnread);

            // Date filter is TODO until real dates come from the API.
            const matchesDate = true;

            return matchesSearch && matchesType && matchesStatus && matchesDate;
        });
    }, [notifications, searchQuery, typeFilter, statusFilter, dateFilter]);

    const filteredAnnouncements = useMemo(() => {
        const search = searchQuery.trim().toLowerCase();

        return announcements.filter((item) => {
            const matchesSearch =
                !search ||
                item.title.toLowerCase().includes(search) ||
                item.description.toLowerCase().includes(search) ||
                item.audience.toLowerCase().includes(search);

            const matchesStatus =
                statusFilter === "all" ||
                (statusFilter === "active" && item.status === "active") ||
                (statusFilter === "scheduled" && item.status === "scheduled");

            return matchesSearch && matchesStatus;
        });
    }, [announcements, searchQuery, statusFilter]);

    // ─────────────── Handlers ───────────────

    function handleCreateAnnouncement() {
        setIsComposerOpen(true);
    }

    function handleCloseComposer() {
        setIsComposerOpen(false);
        setComposerData({
            title: "",
            description: "",
            audience: "All Companies",
        });
    }

    function handlePublishAnnouncement() {
        if (!composerData.title.trim() || !composerData.description.trim()) {
            return;
        }

        const newAnnouncement = {
            id: Date.now(),
            title: composerData.title.trim(),
            description: composerData.description.trim(),
            audience: composerData.audience,
            status: "active",
            publishedAt: "Just now",
            recipients: composerData.audience === "All Companies" ? 248 : 13,
        };

        setAnnouncements((current) => [newAnnouncement, ...current]);

        // TODO: axios POST /api/superadmin/announcements

        handleCloseComposer();
    }

    function handleLoadMore() {
        // TODO: Fetch and append the next page of notifications.
    }

    function handleReviewDetails(id) {
        // TODO: Navigate to the relevant detail page (e.g. the new
        // company's Company Details page for `#Company` notifications).
    }

    function handleMarkAllRead() {
        setNotifications((current) =>
            current.map((item) => ({ ...item, isUnread: false, isNew: false }))
        );

        // TODO: axios PATCH /api/superadmin/notifications/mark-all-read
    }

    function handleMarkRead(id) {
        setNotifications((current) =>
            current.map((item) =>
                item.id === id
                    ? { ...item, isUnread: false, isNew: false }
                    : item
            )
        );

        // TODO: axios PATCH /api/superadmin/notifications/:id/read
    }

    function handleAnnouncementAction(id) {
        // TODO: Open the announcement for editing, or view its full details.
    }

    function handleToggleAnnouncementStatus(id) {
        setAnnouncements((current) =>
            current.map((item) =>
                item.id === id
                    ? {
                          ...item,
                          status: item.status === "active" ? "scheduled" : "active",
                      }
                    : item
            )
        );

        // TODO: axios PATCH /api/superadmin/announcements/:id
    }

    const tabs = [
        { key: "notifications", label: "Notifications" },
        { key: "announcements", label: "Announcements" },
    ];

    const unreadCount = notifications.filter((item) => item.isUnread).length;
    const hasActiveFilters =
        searchQuery ||
        typeFilter !== "all" ||
        statusFilter !== "all";

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

                        <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6 relative overflow-hidden">
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
                                    {unreadCount || stats.unreadNotifications}
                                </p>

                                <p className="text-sm text-slate">
                                    Unread Notifications
                                </p>
                            </div>
                        </div>

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

                        <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6 relative overflow-hidden">
                            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-navy/5 blur-2xl pointer-events-none" />

                            <div className="relative">
                                <div className="w-11 h-11 bg-gray/10 rounded-lg flex items-center justify-center mb-3">
                                    <Megaphone className="w-5 h-5 text-navy" />
                                </div>

                                <p className="text-5xl font-bold text-navy mb-1.5">
                                    {announcements.filter((a) => a.status === "active").length}
                                </p>

                                <p className="text-sm text-slate">
                                    Active Announcements
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6 relative overflow-hidden">
                            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-gold/20 blur-2xl pointer-events-none" />

                            <div className="relative">
                                <div className="w-11 h-11 bg-gray/10 rounded-lg flex items-center justify-center mb-3">
                                    <Clock className="w-5 h-5 text-navy" />
                                </div>

                                <p className="text-5xl font-bold text-navy mb-1.5">
                                    {announcements.filter((a) => a.status === "scheduled").length}
                                </p>

                                <p className="text-sm text-slate">
                                    Scheduled
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* Tabs + Filters */}
                    <div className="flex justify-between items-start flex-wrap gap-4 mb-5">

                        <div className="flex gap-8 border-b border-gray/20">

                            {tabs.map((tab) => (
                                <button
                                    key={tab.key}
                                    type="button"
                                    onClick={() => {
                                        setActiveTab(tab.key);
                                        setSearchQuery("");
                                        setTypeFilter("all");
                                        setStatusFilter("all");
                                    }}
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

                            <div className="relative col-span-2">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray pointer-events-none" />

                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(event) =>
                                        setSearchQuery(event.target.value)
                                    }
                                    placeholder="Search..."
                                    className="
                                        w-full border border-gray rounded-lg
                                        pl-9 pr-3 py-2.5 text-sm text-navy
                                        bg-white outline-none focus:border-navy
                                    "
                                />
                            </div>

                            {/* Type — only shows on Notifications tab */}
                            {activeTab === "notifications" && (
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
                                                : typeFilter.charAt(0).toUpperCase() +
                                                  typeFilter.slice(1)}
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
                            )}

                            {/* Status — different options per tab */}
                            <div
                                className={`relative ${
                                    activeTab === "announcements"
                                        ? "col-span-2"
                                        : ""
                                }`}
                            >
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
                                            : statusFilter.charAt(0).toUpperCase() +
                                              statusFilter.slice(1)}
                                    </span>

                                    <ChevronDown className="w-4 h-4 text-slate" />
                                </button>

                                {isStatusOpen && (
                                    <div className="absolute left-0 top-full mt-2 z-20 w-full bg-white border border-gray/20 rounded-lg shadow-lg p-1">
                                        {(activeTab === "notifications"
                                            ? [
                                                  { value: "all", label: "All" },
                                                  { value: "unread", label: "Unread" },
                                                  { value: "read", label: "Read" },
                                              ]
                                            : [
                                                  { value: "all", label: "All" },
                                                  { value: "active", label: "Active" },
                                                  { value: "scheduled", label: "Scheduled" },
                                              ]
                                        ).map((option) => (
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

                            {/* Date — only shows on Notifications tab */}
                            {activeTab === "notifications" && (
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
                            )}

                        </div>

                    </div>

                    {/* Filters shortcut row */}
                    {hasActiveFilters && (
                        <div className="flex items-center gap-3 mb-4 flex-wrap">

                            <button
                                type="button"
                                onClick={() => {
                                    setSearchQuery("");
                                    setTypeFilter("all");
                                    setStatusFilter("all");
                                }}
                                className="
                                    text-sm font-bold text-slate
                                    hover:text-navy transition cursor-pointer
                                "
                            >
                                Clear filters
                            </button>

                            <span className="text-sm text-slate">
                                {filteredNotifications.length + filteredAnnouncements.length} result(s)
                            </span>

                        </div>
                    )}

                    {/* ─── NOTIFICATIONS TAB ─── */}
                    {activeTab === "notifications" && (
                        <>
                            <div className="flex justify-end mb-3">
                                <button
                                    type="button"
                                    onClick={handleMarkAllRead}
                                    disabled={unreadCount === 0}
                                    className="
                                        text-sm font-bold text-navy
                                        hover:text-gold transition cursor-pointer
                                        disabled:opacity-40 disabled:cursor-not-allowed
                                    "
                                >
                                    Mark all as read
                                </button>
                            </div>

                            <div className="bg-white rounded-xl border border-gray/20 shadow-sm overflow-hidden">

                                {filteredNotifications.length > 0 ? (
                                    filteredNotifications.map(
                                        (notification, index) => {
                                            const isCompany =
                                                notification.category === "company";
                                            const isSystem =
                                                notification.category === "system";

                                            const Icon = isCompany
                                                ? Building2
                                                : isSystem
                                                ? Wrench
                                                : TrendingUp;

                                            return (
                                                <div
                                                    key={notification.id}
                                                    onClick={() =>
                                                        handleMarkRead(notification.id)
                                                    }
                                                    className={`
                                                        flex items-start gap-4 p-6 relative
                                                        cursor-pointer hover:bg-beige/20 transition
                                                        ${
                                                            index !==
                                                            filteredNotifications.length - 1
                                                                ? "border-b border-gray/20"
                                                                : ""
                                                        }
                                                    `}
                                                >
                                                    {notification.isUnread && (
                                                        <span className="absolute inset-y-0 left-0 w-1 bg-navy" />
                                                    )}

                                                    <div
                                                        className={`
                                                            w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0
                                                            ${
                                                                isCompany
                                                                    ? "bg-beige/60"
                                                                    : "bg-gray/10"
                                                            }
                                                        `}
                                                    >
                                                        <Icon
                                                            className={`
                                                                w-5 h-5
                                                                ${
                                                                    isCompany
                                                                        ? "text-gold"
                                                                        : "text-navy"
                                                                }
                                                            `}
                                                        />
                                                    </div>

                                                    <div className="flex-1 min-w-0">

                                                        <div className="flex items-center gap-2 flex-wrap">
                                                            <h3 className="font-serif text-2xl text-navy">
                                                                {notification.title}
                                                            </h3>

                                                            {notification.isNew && (
                                                                <span className="bg-navy text-white text-xs font-bold px-2 py-0.5 rounded">
                                                                    New
                                                                </span>
                                                            )}

                                                            <span className="text-sm text-slate ml-auto whitespace-nowrap">
                                                                {notification.timestamp}
                                                            </span>
                                                        </div>

                                                        <p className="text-base text-slate leading-relaxed mt-1.5">
                                                            {notification.description}
                                                        </p>

                                                        <div className="flex items-center gap-3 mt-2.5 flex-wrap">

                                                            <span className="text-sm text-slate font-medium inline-flex items-center gap-1">
                                                                <Hash className="w-3 h-3" />
                                                                {notification.tag.replace(
                                                                    "#",
                                                                    ""
                                                                )}
                                                            </span>

                                                            {notification.actionLabel && (
                                                                <button
                                                                    type="button"
                                                                    onClick={(event) => {
                                                                        event.stopPropagation();
                                                                        handleReviewDetails(
                                                                            notification.id
                                                                        );
                                                                    }}
                                                                    className="
                                                                        text-sm font-bold text-navy underline
                                                                        hover:text-gold transition cursor-pointer
                                                                    "
                                                                >
                                                                    {notification.actionLabel}
                                                                </button>
                                                            )}

                                                        </div>

                                                    </div>

                                                </div>
                                            );
                                        }
                                    )
                                ) : (
                                    <div className="p-16 text-center">
                                        <p className="text-sm text-slate">
                                            No notifications match the current filters.
                                        </p>
                                    </div>
                                )}

                            </div>

                            {filteredNotifications.length > 0 && (
                                <div className="flex justify-center mt-6">
                                    <button
                                        type="button"
                                        onClick={handleLoadMore}
                                        className="
                                            bg-white border border-gray text-navy font-bold text-sm
                                            px-8 py-3 rounded-lg
                                            hover:border-navy transition cursor-pointer
                                        "
                                    >
                                        Load More
                                    </button>
                                </div>
                            )}
                        </>
                    )}

                    {/* ─── ANNOUNCEMENTS TAB ─── */}
                    {activeTab === "announcements" && (
                        <div className="flex flex-col gap-4">

                            {filteredAnnouncements.length > 0 ? (
                                filteredAnnouncements.map((announcement) => (
                                    <div
                                        key={announcement.id}
                                        className="
                                            bg-white rounded-xl border border-gray/20
                                            shadow-sm p-6
                                        "
                                    >
                                        <div className="flex items-start gap-4">

                                            <div className="w-11 h-11 bg-gray/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Megaphone className="w-5 h-5 text-navy" />
                                            </div>

                                            <div className="flex-1 min-w-0">

                                                <div className="flex items-center gap-3 flex-wrap mb-2">
                                                    <h3 className="font-serif text-2xl text-navy">
                                                        {announcement.title}
                                                    </h3>

                                                    <span
                                                        className={`
                                                            text-xs font-bold uppercase tracking-wide
                                                            px-2.5 py-1 rounded-full
                                                            ${
                                                                announcement.status ===
                                                                "active"
                                                                    ? "bg-green-50 text-green-700"
                                                                    : "bg-amber-50 text-amber-700"
                                                            }
                                                        `}
                                                    >
                                                        {announcement.status}
                                                    </span>
                                                </div>

                                                <p className="text-base text-slate leading-relaxed mb-3">
                                                    {announcement.description}
                                                </p>

                                                <div className="flex items-center gap-5 flex-wrap text-sm">

                                                    <div className="flex items-center gap-1.5 text-slate">
                                                        <Users className="w-4 h-4" />
                                                        <span>{announcement.audience}</span>
                                                    </div>

                                                    <div className="flex items-center gap-1.5 text-slate">
                                                        <Clock className="w-4 h-4" />
                                                        <span>{announcement.publishedAt}</span>
                                                    </div>

                                                    {announcement.recipients > 0 && (
                                                        <span className="text-slate">
                                                            {announcement.recipients} recipients
                                                        </span>
                                                    )}

                                                </div>

                                            </div>

                                            <div className="flex flex-col gap-2 flex-shrink-0">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleAnnouncementAction(
                                                            announcement.id
                                                        )
                                                    }
                                                    className="
                                                        text-sm font-bold text-navy
                                                        hover:text-gold transition cursor-pointer
                                                        whitespace-nowrap
                                                    "
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleToggleAnnouncementStatus(
                                                            announcement.id
                                                        )
                                                    }
                                                    className="
                                                        text-sm font-bold text-slate
                                                        hover:text-navy transition cursor-pointer
                                                        whitespace-nowrap
                                                    "
                                                >
                                                    {announcement.status === "active"
                                                        ? "Pause"
                                                        : "Activate"}
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-16 text-center">
                                    <p className="text-sm text-slate">
                                        No announcements match the current filters.
                                    </p>
                                </div>
                            )}

                        </div>
                    )}

                </main>

            </div>

            {/* ─── Composer Modal ─── */}
            {isComposerOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">

                    <div
                        className="absolute inset-0 bg-navy/40"
                        onClick={handleCloseComposer}
                    />

                    <div className="relative bg-white rounded-xl border border-gray/20 shadow-lg max-w-lg w-full p-6">

                        <div className="flex justify-between items-center gap-4 mb-5">
                            <h2 className="font-serif text-2xl text-navy">
                                Create Announcement
                            </h2>

                            <button
                                type="button"
                                onClick={handleCloseComposer}
                                aria-label="Close"
                                className="text-slate hover:text-navy transition cursor-pointer"
                            >
                                <X className="w-[18px] h-[18px]" />
                            </button>
                        </div>

                        <div className="flex flex-col gap-4 mb-5">

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wide text-navy mb-2">
                                    Title
                                </label>

                                <input
                                    type="text"
                                    value={composerData.title}
                                    onChange={(event) =>
                                        setComposerData((current) => ({
                                            ...current,
                                            title: event.target.value,
                                        }))
                                    }
                                    placeholder="e.g. Holiday schedule reminder"
                                    className="
                                        w-full border border-gray rounded-lg
                                        px-4 py-3 text-sm text-navy
                                        outline-none focus:border-navy
                                    "
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wide text-navy mb-2">
                                    Message
                                </label>

                                <textarea
                                    value={composerData.description}
                                    onChange={(event) =>
                                        setComposerData((current) => ({
                                            ...current,
                                            description: event.target.value,
                                        }))
                                    }
                                    rows={4}
                                    placeholder="What would you like to announce?"
                                    className="
                                        w-full border border-gray rounded-lg
                                        px-4 py-3 text-sm text-navy
                                        outline-none focus:border-navy resize-none
                                    "
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wide text-navy mb-2">
                                    Audience
                                </label>

                                <select
                                    value={composerData.audience}
                                    onChange={(event) =>
                                        setComposerData((current) => ({
                                            ...current,
                                            audience: event.target.value,
                                        }))
                                    }
                                    className="
                                        w-full border border-gray rounded-lg
                                        px-4 py-3 text-sm text-navy
                                        outline-none focus:border-navy bg-white
                                        cursor-pointer
                                    "
                                >
                                    <option value="All Companies">All Companies</option>
                                    <option value="Selected Companies">
                                        Selected Companies
                                    </option>
                                </select>
                            </div>

                        </div>

                        <div className="flex justify-end gap-3">

                            <button
                                type="button"
                                onClick={handleCloseComposer}
                                className="
                                    bg-white border border-gray text-navy
                                    font-bold text-sm px-5 py-2.5 rounded-lg
                                    hover:bg-beige transition cursor-pointer
                                "
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={handlePublishAnnouncement}
                                disabled={
                                    !composerData.title.trim() ||
                                    !composerData.description.trim()
                                }
                                className="
                                    bg-navy text-white font-bold text-sm
                                    px-5 py-2.5 rounded-lg
                                    hover:bg-gold hover:text-navy transition
                                    cursor-pointer
                                    flex items-center gap-2
                                    disabled:opacity-40 disabled:cursor-not-allowed
                                "
                            >
                                <Send className="w-4 h-4" />
                                Publish
                            </button>

                        </div>

                    </div>

                </div>
            )}

        </div>
    );
}

export default AdminNotifications;