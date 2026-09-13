import React, { useState } from "react";
import {
    Search,
    BellOff,
    CalendarPlus,
    CalendarX,
    FileText,
    User,
    Info,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";

const mockNotifications = [
    {
        id: "notif-1",
        group: "Today",
        type: "booking",
        title: "New appointment booked",
        description:
            "Ayesha Khan booked a Consultation with Dr. Sara Ahmed for 10:00 AM.",
        timestamp: "10 minutes ago",
        read: false,
        linkTo: "/company/appointments",
    },
    {
        id: "notif-2",
        group: "Today",
        type: "payment",
        title: "Payment received",
        description:
            "Rs. 3,000 received for Ayesha Khan's appointment.",
        timestamp: "2 hours ago",
        read: true,
    },
    {
        id: "notif-3",
        group: "Today",
        type: "cancellation",
        title: "Appointment cancelled",
        description:
            "Hina Malik cancelled her Follow-up appointment.",
        timestamp: "4 hours ago",
        read: false,
        linkTo: "/company/appointments",
    },
    {
        id: "notif-4",
        group: "Yesterday",
        type: "staff",
        title: "Staff availability updated",
        description:
            "Dr. Sara Ahmed updated availability for Friday.",
        timestamp: "Yesterday, 4:30 PM",
        read: true,
        linkTo: "/company/staff",
    },
    {
        id: "notif-5",
        group: "Earlier",
        type: "system",
        title: "System maintenance complete",
        description:
            "The scheduled platform upgrade was completed successfully.",
        timestamp: "Oct 12",
        read: true,
    },
];

function Notifications() {
    const navigate = useNavigate();

    const [notifications, setNotifications] = useState(mockNotifications);
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [searchQuery, setSearchQuery] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const unreadCount = notifications.filter(
        (notification) => !notification.read
    ).length;

    const filterTabs = [
        { label: "All", value: "all" },
        { label: "Unread", value: "unread" },
        { label: "Appointments", value: "appointments" },
        { label: "Customers", value: "customers" },
        { label: "Staff", value: "staff" },
        { label: "Payments", value: "payments" },
        { label: "System", value: "system" },
    ];

    const filteredNotifications = notifications.filter((notification) => {
        let matchesCategory = true;

        if (categoryFilter === "unread") {
            matchesCategory = !notification.read;
        }

        if (categoryFilter === "appointments") {
            matchesCategory =
                notification.type === "booking" ||
                notification.type === "cancellation";
        }

        if (categoryFilter === "customers") {
            matchesCategory = notification.type === "booking";
        }

        if (categoryFilter === "payments") {
            matchesCategory = notification.type === "payment";
        }

        if (categoryFilter === "staff") {
            matchesCategory = notification.type === "staff";
        }

        if (categoryFilter === "system") {
            matchesCategory = notification.type === "system";
        }

        const query = searchQuery.trim().toLowerCase();

        const matchesSearch =
            query === "" ||
            notification.title.toLowerCase().includes(query) ||
            notification.description.toLowerCase().includes(query);

        return matchesCategory && matchesSearch;
    });

    const groupedNotifications = filteredNotifications.reduce(
        (groups, notification) => {
            if (!groups[notification.group]) {
                groups[notification.group] = [];
            }

            groups[notification.group].push(notification);

            return groups;
        },
        {}
    );

    function getNotificationIcon(type) {
        if (type === "booking") {
            return {
                icon: CalendarPlus,
                boxClass: "bg-blue-50",
                iconClass: "text-blue-600",
            };
        }

        if (type === "payment") {
            return {
                icon: FileText,
                boxClass: "bg-gray/10",
                iconClass: "text-slate",
            };
        }

        if (type === "cancellation") {
            return {
                icon: CalendarX,
                boxClass: "bg-red-50",
                iconClass: "text-red-500",
            };
        }

        if (type === "staff") {
            return {
                icon: User,
                boxClass: "bg-gray/10",
                iconClass: "text-slate",
            };
        }

        return {
            icon: Info,
            boxClass: "bg-gray/10",
            iconClass: "text-slate",
        };
    }

    function handleMarkAllRead() {
        setNotifications(
            notifications.map((notification) => ({
                ...notification,
                read: true,
            }))
        );

        // TODO: axios PATCH /api/company/notifications/mark-all-read
    }

    function handleNotificationClick(notification) {
        setNotifications(
            notifications.map((item) =>
                item.id === notification.id
                    ? { ...item, read: true }
                    : item
            )
        );

        if (notification.linkTo) {
            navigate(notification.linkTo);
        }

        // TODO: axios PATCH /api/company/notifications/{id}/read
    }

    return (
        <div className="min-h-screen bg-white flex">

            {/* Desktop Sidebar */}
            <div className="hidden lg:block lg:flex-shrink-0">
                <Sidebar activeItem="Notifications" />
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
                        <Sidebar activeItem="Notifications" />
                    </div>
                </>
            )}

            {/* Main Area */}
            <div className="flex min-w-0 flex-1 flex-col">

                <Topbar
                    onMenuClick={() => setSidebarOpen(true)}
                    showBell
                    hasNotification
                    simpleProfileIcon
                    showSearch={false}
                />

                <main className="flex-1 bg-white px-4 py-5 sm:px-6 md:px-8 md:py-6">

                    {/* Header */}
                    <div className="flex flex-col gap-5 mb-5 md:flex-row md:items-start md:justify-between">

                        <div>
                            <h1 className="font-serif text-2xl text-navy sm:text-3xl md:text-4xl">
                                Notifications
                            </h1>

                            <p className="text-sm text-slate mt-1.5">
                                Stay updated with your company's latest activity.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

                            <span className="bg-gray/10 text-slate text-sm font-bold px-4 py-2 rounded-lg text-center">
                                {unreadCount} unread
                            </span>

                            <button
                                type="button"
                                onClick={handleMarkAllRead}
                                className="
                                    bg-white
                                    border-2
                                    border-navy
                                    text-navy
                                    px-4
                                    py-2
                                    rounded-lg
                                    font-bold
                                    text-sm
                                    hover:bg-navy
                                    hover:text-white
                                    transition
                                "
                            >
                                Mark all as read
                            </button>

                        </div>

                    </div>

                    {/* Filters + Search */}
                    <div
                        className="
                            flex
                            flex-col
                            gap-3
                            mb-4
                            pb-3
                            border-b
                            border-gray/20
                            sm:flex-row
                            sm:flex-wrap
                            sm:justify-between
                            sm:items-center
                        "
                    >

                        {/* Filter Tabs */}
                        <div className="flex items-center gap-6 overflow-x-auto -mx-1 px-1">

                            {filterTabs.map((tab) => {
                                const isActive =
                                    categoryFilter === tab.value;

                                return (
                                    <button
                                        key={tab.value}
                                        type="button"
                                        onClick={() =>
                                            setCategoryFilter(tab.value)
                                        }
                                        className={`
                                            whitespace-nowrap
                                            text-sm
                                            font-bold
                                            cursor-pointer
                                            transition
                                            pb-3
                                            -mb-3
                                            ${
                                                isActive
                                                    ? "text-navy border-b-2 border-navy"
                                                    : "text-slate hover:text-navy border-b-2 border-transparent"
                                            }
                                        `}
                                    >
                                        {tab.label}
                                    </button>
                                );
                            })}

                        </div>

                        {/* Search */}
                        <div className="relative w-full sm:w-auto sm:min-w-[220px]">

                            <Search
                                size={16}
                                className="
                                    absolute
                                    left-3
                                    top-1/2
                                    -translate-y-1/2
                                    text-slate
                                    pointer-events-none
                                "
                            />

                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(event) =>
                                    setSearchQuery(event.target.value)
                                }
                                placeholder="Search notifications"
                                className="
                                    w-full
                                    bg-white
                                    border
                                    border-gray/30
                                    rounded-lg
                                    pl-9
                                    pr-4
                                    py-2.5
                                    text-sm
                                    text-navy
                                    outline-none
                                    focus:border-navy
                                "
                            />

                        </div>

                    </div>

                    {/* Notification Groups */}
                    {filteredNotifications.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20">

                            <BellOff
                                size={40}
                                className="text-gray mb-4"
                            />

                            <p className="text-slate">
                                No notifications found
                            </p>

                            <p className="text-sm text-gray mt-1 text-center">
                                Try a different filter or search term.
                            </p>

                        </div>
                    ) : (
                        <div>

                            {Object.entries(groupedNotifications).map(
                                ([group, groupNotifications], groupIndex) => (
                                    <section
                                        key={group}
                                        className={
                                            groupIndex === 0
                                                ? "mt-4"
                                                : "mt-6"
                                        }
                                    >

                                        {/* Section Label */}
                                        <h2 className="text-xs font-bold uppercase tracking-wide text-gray mb-3">
                                            {group}
                                        </h2>

                                        {/* Notifications */}
                                        <div>
                                            {groupNotifications.map(
                                                (notification) => {
                                                    const iconData =
                                                        getNotificationIcon(
                                                            notification.type
                                                        );

                                                    const Icon =
                                                        iconData.icon;

                                                    return (
                                                        <div
                                                            key={notification.id}
                                                            onClick={() =>
                                                                handleNotificationClick(
                                                                    notification
                                                                )
                                                            }
                                                            className={`
                                                                flex
                                                                items-start
                                                                gap-3
                                                                sm:gap-4
                                                                border
                                                                border-gray/15
                                                                rounded-xl
                                                                px-4
                                                                sm:px-5
                                                                py-4
                                                                mb-2.5
                                                                cursor-pointer
                                                                transition
                                                                hover:border-gray/30
                                                                ${
                                                                    !notification.read
                                                                        ? "bg-gray/5"
                                                                        : "bg-white"
                                                                }
                                                            `}
                                                        >

                                                            {/* Icon */}
                                                            <div
                                                                className={`
                                                                    w-10
                                                                    h-10
                                                                    rounded-lg
                                                                    flex
                                                                    items-center
                                                                    justify-center
                                                                    flex-shrink-0
                                                                    ${iconData.boxClass}
                                                                `}
                                                            >
                                                                <Icon
                                                                    size={18}
                                                                    className={
                                                                        iconData.iconClass
                                                                    }
                                                                />
                                                            </div>

                                                            {/* Content */}
                                                            <div className="flex-1 min-w-0">

                                                                <h3 className="font-serif text-sm sm:text-base font-bold text-navy break-words">
                                                                    {
                                                                        notification.title
                                                                    }
                                                                </h3>

                                                                <p className="text-xs sm:text-sm text-slate leading-relaxed mt-1 break-words">
                                                                    {
                                                                        notification.description
                                                                    }
                                                                </p>

                                                                {/* Timestamp on mobile */}
                                                                <span className="block sm:hidden text-[11px] text-gray mt-2">
                                                                    {
                                                                        notification.timestamp
                                                                    }
                                                                </span>

                                                            </div>

                                                            {/* Timestamp + Unread (desktop) */}
                                                            <div className="hidden sm:flex flex-col items-end gap-1.5 flex-shrink-0">

                                                                <span className="text-xs sm:text-sm text-gray whitespace-nowrap">
                                                                    {
                                                                        notification.timestamp
                                                                    }
                                                                </span>

                                                                {!notification.read && (
                                                                    <span className="w-2 h-2 rounded-full bg-gold" />
                                                                )}

                                                            </div>

                                                            {/* Unread dot (mobile) */}
                                                            {!notification.read && (
                                                                <span className="sm:hidden w-2 h-2 rounded-full bg-gold mt-2 flex-shrink-0" />
                                                            )}

                                                        </div>
                                                    );
                                                }
                                            )}
                                        </div>

                                    </section>
                                )
                            )}

                        </div>
                    )}

                </main>
            </div>
        </div>
    );
}

export default Notifications;