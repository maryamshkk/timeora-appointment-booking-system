import React, { useState } from "react";
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
    CheckCheck,
    CalendarPlus,
    Clock3,
    User,
    CheckCircle2,
    Info,
    AlertCircle,
} from "lucide-react";

function StaffNotifications() {
    const [activeFilter, setActiveFilter] = useState("all");
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

    const filterItems = [
        { key: "all", label: "All", count: 24 },
        { key: "unread", label: "Unread", count: 3, isUnread: true },
        { key: "appointments", label: "Appointments" },
        { key: "schedule", label: "Schedule" },
        { key: "customers", label: "Customers" },
        { key: "company", label: "Company" },
    ];

    const todayNotifications = [
        {
            id: 1,
            type: "appointment",
            title: "New Appointment Request",
            description: "Marcus Vance requested a 60-minute consultation for next Tuesday at 2:00 PM.",
            time: "10:42 AM",
            unread: true,
            actions: [
                { label: "Review Request", variant: "primary" },
                { label: "Dismiss", variant: "secondary" },
            ],
            icon: CalendarPlus,
        },
        {
            id: 2,
            type: "schedule",
            title: "Schedule Update",
            description: "Your shift for tomorrow has been modified. Please review your updated hours.",
            time: "08:15 AM",
            unread: true,
            icon: Clock3,
        },
    ];

    const yesterdayNotifications = [
        {
            id: 3,
            type: "customer",
            title: "Customer Profile Updated",
            description: "Elena Rostova updated her contact information and preferences.",
            time: "4:30 PM",
            icon: User,
        },
        {
            id: 4,
            type: "appointment",
            title: "Appointment Completed",
            description: "Initial consultation with David Chen marked as completed.",
            time: "2:00 PM",
            icon: CheckCircle2,
        },
        {
            id: 5,
            type: "company",
            title: "System Maintenance Notice",
            description: "The portal will be down for scheduled maintenance this Sunday from 2 AM to 4 AM.",
            time: "9:00 AM",
            icon: Info,
        },
    ];

    const markAllAsRead = () => {
        // TODO: call API to mark all as read
    };

    const getIconStyle = (type) => {
        if (type === "appointment") {
            return "bg-beige text-navy";
        }

        if (type === "schedule") {
            return "bg-beige text-navy";
        }

        if (type === "customer") {
            return "bg-beige text-navy";
        }

        if (type === "company") {
            return "bg-beige text-navy";
        }

        return "bg-gray/20 text-slate";
    };

    const NotificationCard = ({ notification }) => {
        const Icon = notification.icon;

        return (
            <div className="relative bg-white border border-gray/20 rounded-lg p-4 sm:p-5 flex gap-4 hover:border-navy/30 transition">

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
                <Sidebar
                    title="Staff Portal"
                    subtitle="Architectural Professionalism"
                    navItems={navItems}
                    user={{
                        name: "Dr. Sara Ahmed",
                        role: "Senior Staff",
                    }}
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
                            title="Staff Portal"
                            subtitle="Architectural Professionalism"
                            navItems={navItems}
                            user={{
                                name: "Dr. Sara Ahmed",
                                role: "Senior Staff",
                            }}
                        />
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
                            className="w-full bg-beige/50 border border-gray/20 rounded-lg pl-10 pr-4 py-2 text-sm text-navy outline-none focus:border-navy"
                        />

                    </div>

                    <div className="flex items-center gap-4">

                        <button
                            type="button"
                            className="relative w-9 h-9 rounded-full flex items-center justify-center hover:bg-beige transition"
                        >
                            <Bell className="w-5 h-5 text-navy" />

                            <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center">
                                3
                            </span>
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
                            className="bg-white border border-gray/30 rounded-lg px-4 py-2.5 flex items-center gap-2 text-sm font-bold text-navy hover:border-navy transition self-start"
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
                                                                : item.isUnread
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

                            {/* Today */}
                            <div className="mb-8">

                                <p className="text-xs font-bold uppercase tracking-wide text-slate mb-4">
                                    Today
                                </p>

                                <div className="flex flex-col gap-3">

                                    {todayNotifications.map((notification) => (
                                        <NotificationCard
                                            key={notification.id}
                                            notification={notification}
                                        />
                                    ))}

                                </div>

                            </div>

                            {/* Yesterday */}
                            <div className="mb-8">

                                <p className="text-xs font-bold uppercase tracking-wide text-slate mb-4">
                                    Yesterday
                                </p>

                                <div className="flex flex-col gap-3">

                                    {yesterdayNotifications.map((notification) => (
                                        <NotificationCard
                                            key={notification.id}
                                            notification={notification}
                                        />
                                    ))}

                                </div>

                            </div>

                            {/* Footer */}
                            <div className="flex flex-col items-center justify-center py-12">

                                <Bell className="w-6 h-6 text-gray mb-3" />

                                <p className="text-sm text-slate">
                                    You're all caught up for earlier this week.
                                </p>

                            </div>

                        </div>

                    </div>

                </main>

            </div>

        </div>
    );
}

/* ------------------------------------------------------------------ */
/* Inline Sidebar component (Staff Portal variant)                     */
/* ------------------------------------------------------------------ */
function Sidebar({ title, subtitle, navItems, user }) {
    return (
        <div className="w-64 h-full bg-navy flex flex-col">

            {/* Brand */}
            <div className="px-6 pt-6 pb-8 border-b border-white/10">

                <h2 className="font-serif text-xl text-white">
                    {title}
                </h2>

                <p className="text-xs text-white/50 mt-1">
                    {subtitle}
                </p>

            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 py-5 flex flex-col gap-1 overflow-y-auto">

                {navItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.label}
                            to={item.to}
                            className={`
                                flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition
                                ${
                                    item.active
                                        ? "bg-gold text-navy"
                                        : "text-white/70 hover:bg-white/5 hover:text-white"
                                }
                            `}
                        >
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
                        alt={user.name}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="min-w-0">
                    <p className="text-sm font-bold text-white truncate">
                        {user.name}
                    </p>

                    <p className="text-xs text-white/50">
                        {user.role}
                    </p>
                </div>

            </div>

        </div>
    );
}

export default StaffNotifications;