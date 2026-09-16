import React, { useMemo, useState } from "react";
import {
    CheckCircle2,
    Clock,
    Mail,
    Receipt,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import CustomerSidebar from "../../components/customer/CustomerSidebar";
import CustomerTopbar from "../../components/customer/CustomerTopbar";

function CustomerNotifications() {
    const navigate = useNavigate();

    const [activeFilter, setActiveFilter] = useState("all");

    const [notifications, setNotifications] = useState([
        // TODAY — unread
        {
            id: 1,
            category: "appointment",
            isRead: false,
            icon: CheckCircle2,
            title: "Appointment Confirmed",
            time: "10:32 AM",
            dateGroup: "Today",
            description:
                "Your appointment with Dr. Sara Ahmed at Shifa Clinic has been confirmed.",
            action: {
                label: "View Appointment",
                type: "appointment",
                targetId: 1,
            },
        },
        {
            id: 2,
            category: "appointment",
            isRead: false,
            icon: Clock,
            title: "Appointment Reminder",
            time: "09:00 AM",
            dateGroup: "Today",
            description:
                "Your appointment begins tomorrow at 10:00 AM.",
            action: {
                label: "View Appointment",
                type: "appointment",
                targetId: 2,
            },
        },

        // YESTERDAY — read
        {
            id: 3,
            category: "payment",
            isRead: true,
            icon: Receipt,
            title: "Payment Received",
            time: "04:20 PM",
            dateGroup: "Yesterday",
            description:
                "Your payment for Consultation at Shifa Clinic has been recorded.",
            action: {
                label: "View Receipt",
                type: "receipt",
                targetId: 3,
            },
        },

        // EARLIER — read, no action
        {
            id: 4,
            category: "account",
            isRead: true,
            icon: Mail,
            title: "Email Verified",
            time: "Oct 12",
            dateGroup: "Earlier",
            description:
                "Your email address has been successfully verified.",
            action: null,
        },
    ]);

    const unreadCount = useMemo(
        () => notifications.filter((item) => !item.isRead).length,
        [notifications]
    );

    // TODO: Replace seeded notifications with a real fetch on mount.

    function handleMarkAllRead() {
        setNotifications((current) =>
            current.map((item) => ({ ...item, isRead: true }))
        );

        // TODO: axios PATCH /api/customer/notifications/mark-all-read
    }

    function handleViewAppointment(targetId) {
        // TODO: navigate to the appointment details page for this target.
        navigate(`/customer/appointments/${targetId}`);
    }

    function handleViewReceipt(targetId) {
        // TODO: navigate to the receipt page for this target.
        navigate(`/customer/receipts/${targetId}`);
    }

    function handleAction(notification) {
        if (!notification.action) {
            return;
        }

        if (notification.action.type === "appointment") {
            handleViewAppointment(notification.action.targetId);
            return;
        }

        if (notification.action.type === "receipt") {
            handleViewReceipt(notification.action.targetId);
        }
    }

        // Filter logic per tab
    const filteredNotifications = useMemo(() => {
        return notifications.filter((item) => {
            if (activeFilter === "all") return true;
            if (activeFilter === "unread") return !item.isRead;
            if (activeFilter === "appointments") return item.category === "appointment";
            if (activeFilter === "payments") return item.category === "payment";
            if (activeFilter === "account") return item.category === "account";
            return true;
        });
    }, [notifications, activeFilter]);

    // Group by dateGroup, preserving section order: Today → Yesterday → Earlier
    const GROUP_ORDER = ["Today", "Yesterday", "Earlier"];

    const groupedNotifications = useMemo(() => {
        const groups = {};

        filteredNotifications.forEach((item) => {
            if (!groups[item.dateGroup]) {
                groups[item.dateGroup] = [];
            }
            groups[item.dateGroup].push(item);
        });

        return GROUP_ORDER
            .filter((key) => groups[key]?.length)
            .map((key) => ({
                label: key,
                items: groups[key],
            }));
    }, [filteredNotifications]);

    // Tab definitions
    const tabs = [
        { key: "all", label: "All" },
        { key: "unread", label: `Unread (${unreadCount})` },
        { key: "appointments", label: "Appointments" },
        { key: "payments", label: "Payments" },
        { key: "account", label: "Account" },
    ];

    return (
        <div className="min-h-screen bg-beige flex">

            <CustomerSidebar activeItem="Notifications" />

            <div className="flex-1 min-w-0">

                <CustomerTopbar />

                <main className="px-8 py-6">

                    {/* Header */}
                    <div className="flex justify-between items-start gap-6 flex-wrap mb-1">

                        <div>
                            <h1 className="font-serif text-4xl text-navy">
                                Notifications
                            </h1>

                            <p className="text-sm text-slate mt-1">
                                Stay updated on your appointments and account activity.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={handleMarkAllRead}
                            disabled={unreadCount === 0}
                            className="
                                bg-white
                                border-2
                                border-navy
                                text-navy
                                uppercase
                                tracking-wide
                                font-bold
                                text-sm
                                px-5
                                py-2.5
                                rounded-lg
                                hover:bg-navy
                                hover:text-white
                                transition
                                cursor-pointer
                                disabled:opacity-40
                                disabled:cursor-not-allowed
                                disabled:hover:bg-white
                                disabled:hover:text-navy
                                flex-shrink-0
                            "
                        >
                            Mark All As Read
                        </button>

                    </div>

                    {/* Tabs */}
                    <div className="flex items-center gap-6 mt-4 overflow-x-auto pb-1 -mx-1 px-1">

                        {tabs.map((tab) => (
                            <button
                                key={tab.key}
                                type="button"
                                onClick={() => setActiveFilter(tab.key)}
                                className={`
                                    text-sm
                                    font-bold
                                    uppercase
                                    tracking-wide
                                    whitespace-nowrap
                                    pb-2
                                    border-b-2
                                    transition
                                    cursor-pointer
                                    ${
                                        activeFilter === tab.key
                                            ? "text-navy border-navy"
                                            : "text-slate border-transparent hover:text-navy"
                                    }
                                `}
                            >
                                {tab.label}
                            </button>
                        ))}

                    </div>

                    <div className="border-b border-gray/20 mb-6"></div>

                    {/* Notification feed added next */}
                    {/* Feed */}
{groupedNotifications.length > 0 ? (
    <div>
        {groupedNotifications.map((group, groupIndex) => (
            <div
                key={group.label}
                className={groupIndex > 0 ? "mt-7" : ""}
            >
                {/* Section label */}
                <p className="text-xs font-bold uppercase tracking-wide text-slate mb-3">
                    {group.label}
                </p>

                {/* Cards */}
                <div>
                    {group.items.map((notification) => {
                        const Icon = notification.icon;

                        // ─── UNREAD CARD ───
                        if (!notification.isRead) {
                            return (
                                <div
                                    key={notification.id}
                                    className="
                                        relative
                                        bg-beige/40
                                        rounded-xl
                                        p-6
                                        mb-4
                                    "
                                >
                                    {/* Gold unread dot, outside the card */}
                                    <span className="absolute -left-2.5 top-8 w-2 h-2 rounded-full bg-gold" />

                                    <div className="flex items-start gap-3">

                                        {/* Icon badge */}
                                        <div className="w-8 h-8 rounded-full bg-navy flex items-center justify-center flex-shrink-0">
                                            <Icon className="w-3.5 h-3.5 text-white" />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">

                                            <div className="flex justify-between items-start gap-3 flex-wrap">
                                                <p className="text-sm font-bold uppercase tracking-wide text-navy">
                                                    {notification.title}
                                                </p>

                                                <span className="text-xs text-slate whitespace-nowrap">
                                                    {notification.time}
                                                </span>
                                            </div>

                                            <p className="text-sm text-slate leading-relaxed mt-1">
                                                {notification.description}
                                            </p>

                                            {notification.action && (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleAction(notification)
                                                    }
                                                    className="
                                                        mt-3
                                                        bg-navy
                                                        text-white
                                                        uppercase
                                                        tracking-wide
                                                        font-bold
                                                        text-sm
                                                        px-5
                                                        py-2.5
                                                        rounded-lg
                                                        hover:bg-gold
                                                        hover:text-navy
                                                        transition
                                                        cursor-pointer
                                                    "
                                                >
                                                    {notification.action.label}
                                                </button>
                                            )}

                                        </div>

                                    </div>

                                </div>
                            );
                        }

                        // ─── READ CARD ───
                        return (
                            <div
                                key={notification.id}
                                className="
                                    bg-white
                                    rounded-xl
                                    border
                                    border-gray/20
                                    shadow-sm
                                    p-6
                                    mb-4
                                "
                            >
                                <div className="flex items-start gap-3">

                                    {/* Bare icon (no badge) */}
                                    <Icon className="w-[18px] h-[18px] text-navy flex-shrink-0 mt-0.5" />

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">

                                        <div className="flex justify-between items-start gap-3 flex-wrap">
                                            <p className="text-base font-bold text-navy">
                                                {notification.title}
                                            </p>

                                            <span className="text-xs text-slate whitespace-nowrap">
                                                {notification.time}
                                            </span>
                                        </div>

                                        <p className="text-sm text-slate leading-relaxed mt-1">
                                            {notification.description}
                                        </p>

                                        {notification.action && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleAction(notification)
                                                }
                                                className="
                                                    mt-3
                                                    bg-white
                                                    border
                                                    border-gray
                                                    text-navy
                                                    uppercase
                                                    tracking-wide
                                                    font-bold
                                                    text-sm
                                                    px-5
                                                    py-2.5
                                                    rounded-lg
                                                    hover:border-navy
                                                    transition
                                                    cursor-pointer
                                                "
                                            >
                                                {notification.action.label}
                                            </button>
                                        )}

                                    </div>

                                </div>

                            </div>
                        );
                    })}
                </div>
            </div>
        ))}
    </div>
) : (
    <div className="text-center mt-[60px]">

        <div className="w-12 h-12 rounded-full bg-beige mx-auto mb-4 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-navy" />
        </div>

        <p className="text-sm text-slate">
            No notifications in this category.
        </p>

    </div>
)}

                </main>

            </div>

        </div>
    );
}

export default CustomerNotifications;