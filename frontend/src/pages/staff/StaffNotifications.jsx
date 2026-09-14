import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
    LayoutDashboard,
    Calendar,
    CalendarCheck,
    Clock,
    Users,
    BarChart3,
    Bell,
    Settings,
    Search,
    LogOut,
    CheckCheck,
    CalendarPlus,
    Clock3,
    User,
    CheckCircle2,
    Info,
    X,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Mock data                                                           */
/* ------------------------------------------------------------------ */
const mockNotifications = [
    {
        id: 1,
        type: "appointment",
        group: "Today",
        title: "New Appointment Request",
        description:
            "Marcus Vance requested a 60-minute consultation for next Tuesday at 2:00 PM.",
        time: "10:42 AM",
        unread: true,
        actions: [
            { label: "Review Request", variant: "primary", action: "review" },
            { label: "Dismiss", variant: "secondary", action: "dismiss" },
        ],
        icon: CalendarPlus,
    },
    {
        id: 2,
        type: "schedule",
        group: "Today",
        title: "Schedule Update",
        description:
            "Your shift for tomorrow has been modified. Please review your updated hours.",
        time: "08:15 AM",
        unread: true,
        icon: Clock3,
    },
    {
        id: 3,
        type: "customer",
        group: "Yesterday",
        title: "Customer Profile Updated",
        description:
            "Elena Rostova updated her contact information and preferences.",
        time: "4:30 PM",
        unread: false,
        icon: User,
    },
    {
        id: 4,
        type: "appointment",
        group: "Yesterday",
        title: "Appointment Completed",
        description:
            "Initial consultation with David Chen marked as completed.",
        time: "2:00 PM",
        unread: false,
        icon: CheckCircle2,
    },
    {
        id: 5,
        type: "company",
        group: "Yesterday",
        title: "System Maintenance Notice",
        description:
            "The portal will be down for scheduled maintenance this Sunday from 2 AM to 4 AM.",
        time: "9:00 AM",
        unread: false,
        icon: Info,
    },
];

/* ------------------------------------------------------------------ */
/* Main Component                                                      */
/* ------------------------------------------------------------------ */
function StaffNotifications() {
    const [notifications, setNotifications] = useState(mockNotifications);
    const [activeFilter, setActiveFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navItems = [
        { label: "Dashboard", icon: LayoutDashboard, to: "/staff/dashboard" },
        { label: "Calendar", icon: Calendar, to: "/staff/calendar" },
        { label: "Appointments", icon: CalendarCheck, to: "/staff/appointments" },
        { label: "Availability", icon: Clock, to: "/staff/availability" },
        { label: "Customers", icon: Users, to: "/staff/customers" },
        { label: "Reports", icon: BarChart3, to: "/staff/reports" },
        { label: "Notifications", icon: Bell, to: "/staff/notifications", active: true },
        { label: "Settings", icon: Settings, to: "/staff/settings" },
    ];

    const unreadCount = notifications.filter((n) => n.unread).length;

    const filterItems = [
        { key: "all", label: "All", count: notifications.length },
        { key: "unread", label: "Unread", count: unreadCount, isUnread: true },
        { key: "appointments", label: "Appointments" },
        { key: "schedule", label: "Schedule" },
        { key: "customers", label: "Customers" },
        { key: "company", label: "Company" },
    ];

    /* Filter + search */
    const filteredNotifications = useMemo(() => {
        const q = searchQuery.trim().toLowerCase();

        return notifications.filter((n) => {
            if (activeFilter === "unread" && !n.unread) return false;
            if (activeFilter === "appointments" && n.type !== "appointment") return false;
            if (activeFilter === "schedule" && n.type !== "schedule") return false;
            if (activeFilter === "customers" && n.type !== "customer") return false;
            if (activeFilter === "company" && n.type !== "company") return false;

            if (q) {
                const haystack = `${n.title} ${n.description}`.toLowerCase();
                if (!haystack.includes(q)) return false;
            }

            return true;
        });
    }, [notifications, activeFilter, searchQuery]);

    /* Group by day */
    const grouped = useMemo(() => {
        const groups = {};
        filteredNotifications.forEach((n) => {
            if (!groups[n.group]) groups[n.group] = [];
            groups[n.group].push(n);
        });
        return groups;
    }, [filteredNotifications]);

    /* Handlers */
    function markAllAsRead() {
        setNotifications((prev) =>
            prev.map((n) => ({ ...n, unread: false }))
        );
        // TODO: PATCH /api/staff/notifications/mark-all-read
    }

    function handleAction(notification, actionLabel) {
        if (actionLabel === "Review Request") {
            // TODO: navigate to review page
        }

        if (actionLabel === "Dismiss") {
            setNotifications((prev) =>
                prev.filter((n) => n.id !== notification.id)
            );
        }

        // TODO: PATCH /api/staff/notifications/{id}/{action}
    }

    function markAsRead(id) {
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
        );
        // TODO: PATCH /api/staff/notifications/{id}/read
    }

    /* Icon style per type */
    function getIconStyle(type) {
        if (type === "appointment") return "bg-blue-50 text-blue-600";
        if (type === "schedule") return "bg-gold/15 text-amber-700";
        if (type === "customer") return "bg-gray/15 text-slate";
        if (type === "company") return "bg-gray/15 text-slate";
        return "bg-gray/20 text-slate";
    }

    /* Notification card */
    const NotificationCard = ({ notification }) => {
        const Icon = notification.icon;

        return (
            <div
                onClick={() => markAsRead(notification.id)}
                className={`
                    relative bg-white border border-gray/20 rounded-lg p-4 sm:p-5 flex gap-4 cursor-pointer transition
                    hover:border-navy/30
                    ${notification.unread ? "bg-beige/30" : "bg-white"}
                `}
            >
                {notification.unread && (
                    <span className="absolute top-5 left-2 w-1.5 h-1.5 rounded-full bg-gold" />
                )}

                <div
                    className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${getIconStyle(
                        notification.type
                    )}`}
                >
                    <Icon className="w-5 h-5" />
                </div>

                <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                        <h3 className="text-sm font-bold text-navy">
                            {notification.title}
                        </h3>

                        <span className="text-xs text-slate whitespace-nowrap shrink-0">
                            {notification.time}
                        </span>
                    </div>

                    <p className="text-sm text-slate mt-1">
                        {notification.description}
                    </p>

                    {notification.actions && (
                        <div className="flex items-center gap-2 mt-4">
                            {notification.actions.map((action) => (
                                <button
                                    key={action.label}
                                    type="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleAction(
                                            notification,
                                            action.label
                                        );
                                    }}
                                    className={`
                                        px-4 py-2 rounded-lg text-xs font-bold transition
                                        ${
                                            action.variant === "primary"
                                                ? "bg-navy text-white hover:bg-gold hover:text-navy"
                                                : "bg-white border border-gray/30 text-slate hover:border-navy hover:text-navy"
                                        }
                                    `}
                                >
                                    {action.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen flex bg-beige">

            {/* Desktop Sidebar */}
            <div className="hidden lg:block lg:flex-shrink-0">
                <Sidebar navItems={navItems} />
            </div>

            {/* Mobile / Tablet Sidebar */}
            {sidebarOpen && (
                <>
                    <button
                        type="button"
                        onClick={() => setSidebarOpen(false)}
                        className="fixed inset-0 z-30 bg-navy/50 lg:hidden"
                        aria-label="Close menu"
                    />

                    <div className="fixed left-0 top-0 z-40 h-screen w-64 max-w-[80vw] overflow-y-auto lg:hidden">
                        <Sidebar navItems={navItems} />
                    </div>
                </>
            )}

            {/* Main Area */}
            <div className="flex min-w-0 flex-1 flex-col">

                {/* Topbar */}
                <div className="bg-white border-b border-gray/20 px-4 sm:px-6 md:px-8 py-4 flex items-center justify-between">

                    <div className="relative w-full max-w-[280px]">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-beige/50 border border-gray/20 rounded-lg pl-10 pr-4 py-2 text-sm text-navy outline-none focus:border-navy"
                        />
                    </div>

                    <div className="flex items-center gap-4">

                        <button
                            type="button"
                            className="relative w-9 h-9 rounded-full flex items-center justify-center hover:bg-beige transition"
                        >
                            <Bell className="w-5 h-5 text-navy" />

                            {unreadCount > 0 && (
                                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                                    {unreadCount}
                                </span>
                            )}
                        </button>

                        <button
                            type="button"
                            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-beige transition"
                        >
                            <div className="w-7 h-7 rounded-full border-2 border-navy flex items-center justify-center">
                                <User className="w-4 h-4 text-navy" />
                            </div>
                        </button>

                    </div>

                </div>

                <main className="flex-1 bg-beige px-4 py-6 sm:px-6 md:px-8 md:py-8">

                    {/* Header */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between mb-8">

                        <div>
                            <h1 className="font-serif text-3xl text-navy sm:text-4xl md:text-5xl">
                                Notifications
                            </h1>

                            <p className="text-sm text-slate mt-2">
                                Stay up to date with your appointments and schedule.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={markAllAsRead}
                            disabled={unreadCount === 0}
                            className="bg-white border border-gray/30 rounded-lg px-4 py-2.5 flex items-center gap-2 text-sm font-bold text-navy hover:border-navy transition self-start disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            <CheckCheck className="w-4 h-4" />
                            Mark All as Read
                        </button>

                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">

                        {/* Filters */}
                        <aside>

                            <p className="text-xs font-bold uppercase tracking-wide text-slate mb-4">
                                Filter By
                            </p>

                            <div className="flex flex-col gap-1">

                                {filterItems.map((item) => {
                                    const isActive = activeFilter === item.key;

                                    return (
                                        <button
                                            key={item.key}
                                            type="button"
                                            onClick={() => setActiveFilter(item.key)}
                                            className={`
                                                flex items-center justify-between gap-3 px-4 py-2.5 rounded-lg text-sm font-bold transition text-left
                                                ${
                                                    isActive
                                                        ? "bg-navy text-white"
                                                        : "text-slate hover:bg-white"
                                                }
                                            `}
                                        >
                                            <span>{item.label}</span>

                                            {item.count !== undefined && (
                                                <span
                                                    className={`
                                                        min-w-[24px] h-6 px-1.5 rounded-full text-xs font-bold flex items-center justify-center
                                                        ${
                                                            isActive
                                                                ? "bg-white/15 text-white"
                                                                : item.isUnread && item.count > 0
                                                                    ? "bg-red-50 text-red-500"
                                                                    : "bg-gray/20 text-slate"
                                                        }
                                                    `}
                                                >
                                                    {item.count}
                                                </span>
                                            )}
                                        </button>
                                    );
                                })}

                            </div>

                        </aside>

                        {/* Notifications List */}
                        <div>

                            {filteredNotifications.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-20">

                                    <Bell className="w-10 h-10 text-gray mb-4" />

                                    <p className="text-sm font-bold text-navy">
                                        No notifications found
                                    </p>

                                    <p className="text-xs text-slate mt-1">
                                        Try a different filter or search term.
                                    </p>

                                </div>
                            ) : (
                                <>
                                    {Object.entries(grouped).map(
                                        ([group, items]) => (
                                            <div key={group} className="mb-8">

                                                <p className="text-xs font-bold uppercase tracking-wide text-slate mb-4">
                                                    {group}
                                                </p>

                                                <div className="flex flex-col gap-3">

                                                    {items.map((notification) => (
                                                        <NotificationCard
                                                            key={notification.id}
                                                            notification={notification}
                                                        />
                                                    ))}

                                                </div>

                                            </div>
                                        )
                                    )}

                                    <div className="flex flex-col items-center justify-center py-12">

                                        <Bell className="w-6 h-6 text-gray mb-3" />

                                        <p className="text-sm text-slate">
                                            You're all caught up.
                                        </p>

                                    </div>
                                </>
                            )}

                        </div>

                    </div>

                </main>

            </div>

        </div>
    );
}

/* ------------------------------------------------------------------ */
/* Inline Sidebar (Timeora Staff Portal)                               */
/* ------------------------------------------------------------------ */
function Sidebar({ navItems }) {
    return (
        <div className="w-64 h-full bg-navy flex flex-col">

            {/* Brand */}
            <div className="px-6 pt-8 pb-8 text-center">

                <h2 className="font-serif text-2xl text-gold">
                    Timeora
                </h2>

                <p className="text-[10px] tracking-[0.2em] text-white/60 mt-1 uppercase">
                    Staff Portal
                </p>

            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 flex flex-col gap-1 overflow-y-auto">

                {navItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.label}
                            to={item.to}
                            className={`
                                relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition
                                ${
                                    item.active
                                        ? "bg-white/10 text-gold"
                                        : "text-white/70 hover:bg-white/5 hover:text-white"
                                }
                            `}
                        >
                            {item.active && (
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r bg-gold" />
                            )}

                            <Icon className="w-4 h-4 shrink-0" />
                            {item.label}
                        </Link>
                    );
                })}

            </nav>

            {/* User */}
            <div className="px-4 py-4 border-t border-white/10 flex items-center gap-3">

                <div className="w-10 h-10 rounded-full overflow-hidden bg-white/10 shrink-0">
                    <img
                        src="https://i.pravatar.cc/80?img=47"
                        alt="Dr. Sara Ahmed"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-white truncate">
                        Dr. Sara Ahmed
                    </p>

                    <p className="text-xs text-white/50">
                        Senior Staff
                    </p>
                </div>

                <button
                    type="button"
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:bg-white/5 hover:text-white transition"
                    title="Logout"
                >
                    <LogOut className="w-4 h-4" />
                </button>

            </div>

        </div>
    );
}

export default StaffNotifications;