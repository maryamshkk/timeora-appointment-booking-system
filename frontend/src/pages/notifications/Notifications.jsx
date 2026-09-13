import React, { useState } from "react";
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
    const [notifications, setNotifications] = useState(mockNotifications);

    const unreadCount = notifications.filter(
        (notification) => !notification.read
    ).length;

    function handleMarkAllRead() {
        setNotifications(
            notifications.map((notification) => ({
                ...notification,
                read: true,
            }))
        );

        // TODO: axios PATCH /api/company/notifications/mark-all-read
    }

    return (
        <div className="min-h-screen bg-white flex">
            {/* Sidebar */}
            <Sidebar activeItem="Notifications" />

            {/* Main Area */}
            <div className="flex-1 min-w-0 flex flex-col">
                <Topbar
                    showBell
                    hasNotification
                    simpleProfileIcon
                    showSearch={false}
                />

                <main className="flex-1 bg-white px-8 py-6">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5 mb-5">
                        {/* Heading */}
                        <div>
                            <h1 className="font-serif text-4xl text-navy">
                                Notifications
                            </h1>

                            <p className="text-sm text-slate mt-1.5">
                                Stay updated with your company's latest activity.
                            </p>
                        </div>

                        {/* Header Actions */}
                        <div className="flex items-center gap-3">
                            <span className="bg-gray/10 text-slate text-sm font-bold px-4 py-2 rounded-lg">
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

                    {/* Notifications content will be added next */}
                    <div className="border-t border-gray/20 pt-6">
                        <p className="text-sm text-slate">
                            Notification feed coming next.
                        </p>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Notifications;