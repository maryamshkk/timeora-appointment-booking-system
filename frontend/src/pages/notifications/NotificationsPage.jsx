import React, { useState } from "react";
import {
    BellOff,
    CalendarPlus,
    CalendarX,
    FileText,
    User,
    Info,
    Loader2,
    Search,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";

function NotificationsPage({
    useList,
    useMarkRead,
    useMarkAll,
    basePath,
}) {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const { data, isLoading } = useList(page);
    const { mutate: markRead } = useMarkRead();
    const { mutate: markAll } = useMarkAll();

    const raw = data?.data?.data || [];
    const pagination = data?.data || {};

    const notifications = raw.map((n) => ({
        id: n.id,
        type: n.data?.type || "system",
        title: n.data?.title || "Notification",
        description: n.data?.description || "",
        link: n.data?.link_to || null,
        read: Boolean(n.read_at),
        time: formatTime(n.created_at),
    }));

    const unread = notifications.filter((n) => !n.read).length;

    const filtered = notifications.filter((n) => {
        if (filter === "unread" && n.read) return false;
        if (filter === "appointments" && !["booking", "cancellation"].includes(n.type)) return false;
        if (filter === "payments" && n.type !== "payment") return false;
        if (filter === "staff" && n.type !== "staff") return false;

        if (search) {
            const q = search.toLowerCase();
            if (!n.title.toLowerCase().includes(q) && !n.description.toLowerCase().includes(q)) {
                return false;
            }
        }
        return true;
    });

    const getIcon = (type) => {
        if (type === "booking") return <CalendarPlus size={18} className="text-blue-600" />;
        if (type === "cancellation") return <CalendarX size={18} className="text-red-500" />;
        if (type === "payment") return <FileText size={18} className="text-slate" />;
        if (type === "staff") return <User size={18} className="text-slate" />;
        return <Info size={18} className="text-slate" />;
    };

    const getIconBg = (type) => {
        if (type === "booking") return "bg-blue-50";
        if (type === "cancellation") return "bg-red-50";
        return "bg-gray/10";
    };

    const handleClick = (n) => {
        if (!n.read) markRead(n.id);
        if (n.link) navigate(n.link);
    };

    const tabs = [
        { label: "All", value: "all" },
        { label: "Unread", value: "unread" },
        { label: "Appointments", value: "appointments" },
        { label: "Payments", value: "payments" },
        { label: "Staff", value: "staff" },
    ];

    return (
        <div className="min-h-screen flex bg-beige">
            <div className="hidden lg:block lg:flex-shrink-0">
                <Sidebar activeItem="Notifications" />
            </div>

            {sidebarOpen && (
                <>
                    <button
                        type="button"
                        onClick={() => setSidebarOpen(false)}
                        className="fixed inset-0 z-30 bg-navy/50 lg:hidden"
                    />
                    <div className="fixed left-0 top-0 z-40 h-screen w-64 max-w-[80vw] overflow-y-auto lg:hidden">
                        <Sidebar activeItem="Notifications" />
                    </div>
                </>
            )}

            <div className="flex min-w-0 flex-1 flex-col">
                <Topbar
                    onMenuClick={() => setSidebarOpen(true)}
                    showBell
                    hasNotification={unread > 0}
                    simpleProfileIcon
                    showSearch={false}
                />

                <main className="flex-1 bg-beige px-4 py-5 sm:px-6 md:px-8 md:py-6">
                    {/* Header */}
                    <div className="flex flex-col gap-4 mb-5 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h1 className="font-serif text-2xl text-navy sm:text-3xl md:text-4xl">
                                Notifications
                            </h1>
                            <p className="text-sm text-slate mt-1.5">
                                Stay updated with your latest activity.
                            </p>
                        </div>

                        <div className="flex gap-3 items-center">
                            <span className="inline-flex items-center gap-2 bg-gold/15 border border-gold text-amber-700 text-xs font-bold uppercase px-3 py-2 rounded-lg">
                                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                                {unread} unread
                            </span>
                            <button
                                onClick={() => markAll()}
                                disabled={unread === 0}
                                className="bg-white border-2 border-navy text-navy px-4 py-2 rounded-lg font-bold text-sm hover:bg-navy hover:text-white transition disabled:opacity-50"
                            >
                                Mark all read
                            </button>
                        </div>
                    </div>

                    {/* Tabs + Search */}
                    <div className="flex flex-col gap-3 mb-4 pb-3 border-b border-gray/20 sm:flex-row sm:justify-between sm:items-center">
                        <div className="flex items-center gap-6 overflow-x-auto">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.value}
                                    onClick={() => setFilter(tab.value)}
                                    className={`whitespace-nowrap text-sm font-bold pb-3 -mb-3 border-b-2 transition ${
                                        filter === tab.value
                                            ? "text-navy border-navy"
                                            : "text-slate border-transparent hover:text-navy"
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        <div className="relative w-full sm:w-auto sm:min-w-[220px]">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search notifications"
                                className="w-full bg-white border border-gray/30 rounded-lg pl-9 pr-4 py-2.5 text-sm outline-none focus:border-navy"
                            />
                        </div>
                    </div>

                    {/* Content */}
                    {isLoading ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="h-6 w-6 animate-spin text-navy" />
                            <span className="ml-3 text-sm text-slate">Loading...</span>
                        </div>
                    ) : filtered.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <BellOff size={40} className="text-gray mb-4" />
                            <p className="text-slate">No notifications found</p>
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl border border-gray/20 shadow-sm overflow-hidden divide-y divide-gray/10">
                            {filtered.map((n) => (
                                <div
                                    key={n.id}
                                    onClick={() => handleClick(n)}
                                    className={`flex items-start gap-3 px-4 sm:px-5 py-4 cursor-pointer hover:bg-beige/40 transition ${
                                        !n.read ? "bg-beige/30" : "bg-white"
                                    }`}
                                >
                                    <div
                                        className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getIconBg(
                                            n.type
                                        )}`}
                                    >
                                        {getIcon(n.type)}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-sm sm:text-base text-navy">
                                            {n.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-slate mt-1">
                                            {n.description}
                                        </p>
                                    </div>

                                    <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                                        <span className="text-xs text-gray whitespace-nowrap">
                                            {n.time}
                                        </span>
                                        {!n.read && (
                                            <span className="w-2 h-2 rounded-full bg-gold" />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
                    {pagination.last_page > 1 && (
                        <div className="flex items-center justify-center gap-2 mt-6">
                            <button
                                disabled={page === 1}
                                onClick={() => setPage((p) => p - 1)}
                                className="px-3 py-1.5 rounded-md text-xs font-bold text-slate hover:bg-beige disabled:opacity-40"
                            >
                                Prev
                            </button>
                            <span className="px-3 text-xs font-bold text-navy">
                                {pagination.current_page} / {pagination.last_page}
                            </span>
                            <button
                                disabled={page >= pagination.last_page}
                                onClick={() => setPage((p) => p + 1)}
                                className="px-3 py-1.5 rounded-md text-xs font-bold text-slate hover:bg-beige disabled:opacity-40"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

function formatTime(iso) {
    if (!iso) return "";
    const date = new Date(iso);
    const now = new Date();
    const diffMin = Math.floor((now - date) / 60000);
    if (diffMin < 1) return "Just now";
    if (diffMin < 60) return `${diffMin} min ago`;
    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `${diffHr} hr ago`;
    return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
}

export default NotificationsPage;