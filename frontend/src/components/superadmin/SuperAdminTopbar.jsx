import React from "react";
import { Search, Bell, HelpCircle } from "lucide-react";

function SuperAdminTopbar({
    systemStatus = "operational",
    unreadCount = 0,
}) {
    // Map status → pill styling + label
    const statusStyles = {
        operational: {
            container: "bg-green-50 text-green-700",
            dot: "bg-green-500",
            label: "Operational",
        },
        degraded: {
            container: "bg-amber-50 text-amber-700",
            dot: "bg-amber-500",
            label: "Degraded",
        },
        down: {
            container: "bg-red-50 text-red-700",
            dot: "bg-red-500",
            label: "Down",
        },
    };

    const status = statusStyles[systemStatus] || statusStyles.operational;

    return (
        <header className="bg-beige border-b border-gray/20 px-8 py-4 flex items-center justify-between gap-6 flex-shrink-0">

            {/* Search */}
            <div className="relative w-full max-w-sm">

                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray pointer-events-none" />

                <input
                    type="text"
                    placeholder="Search companies, customers, staff..."
                    className="
                        w-full
                        border
                        border-gray
                        rounded-lg
                        pl-9
                        pr-4
                        py-2.5
                        text-sm
                        text-navy
                        bg-white
                        outline-none
                        focus:border-navy
                    "
                />

            </div>

            {/* Right cluster */}
            <div className="flex items-center gap-4 flex-shrink-0">

                {/* System status pill */}
                <span
                    className={`
                        rounded-full
                        px-3
                        py-1.5
                        text-xs
                        font-bold
                        inline-flex
                        items-center
                        gap-1.5
                        whitespace-nowrap
                        ${status.container}
                    `}
                >
                    <span
                        className={`w-1.5 h-1.5 rounded-full ${status.dot}`}
                    />

                    {status.label}

                </span>

                {/* Bell with unread dot */}
                <button
                    type="button"
                    aria-label="Notifications"
                    className="relative text-navy hover:text-gold transition cursor-pointer"
                >
                    <Bell className="w-5 h-5" />

                    {unreadCount > 0 && (
                        <span
                            className="
                                absolute
                                -top-0.5
                                -right-0.5
                                w-2
                                h-2
                                rounded-full
                                bg-red-500
                            "
                        />
                    )}
                </button>

                <button
                    type="button"
                    aria-label="Help"
                    className="text-navy hover:text-gold transition cursor-pointer"
                >
                    <HelpCircle className="w-5 h-5" />
                </button>

                <button
                    type="button"
                    className="
                        hidden
                        md:inline-block
                        text-xs
                        font-bold
                        uppercase
                        tracking-wide
                        text-navy
                        hover:text-gold
                        transition
                        cursor-pointer
                    "
                >
                    System Status
                </button>

                <img
                    src=""
                    alt="Super admin avatar"
                    className="w-9 h-9 rounded-full object-cover bg-beige flex-shrink-0"
                />

            </div>

        </header>
    );
}

export default SuperAdminTopbar;