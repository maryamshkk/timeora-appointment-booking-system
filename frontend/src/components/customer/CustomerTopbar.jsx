import React from "react";
import { Bell, Search } from "lucide-react";

function CustomerTopbar({
    avatarUrl = "",
    unreadNotificationsCount = 0,
}) {

    return (
        <header className="bg-beige border-b border-gray/20 px-4 md:px-8 py-4 flex items-center justify-between gap-4">

            {/* Search */}
            <div className="relative w-full max-w-xs">

                <Search
                    className="
                        absolute
                        left-3
                        top-1/2
                        -translate-y-1/2
                        w-4
                        h-4
                        text-gray
                        pointer-events-none
                    "
                />

                <input
                    type="text"
                    placeholder="Search..."
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


            {/* Right Actions */}
            <div className="flex items-center gap-5 flex-shrink-0">

                {/* Notifications */}
                <button
                    type="button"
                    className="relative text-navy hover:text-gold transition"
                    aria-label="Notifications"
                >
                    <Bell className="w-5 h-5" />

                    {unreadNotificationsCount > 0 && (
                        <span
                            className="
                                absolute
                                -top-0.5
                                -right-0.5
                                w-2
                                h-2
                                rounded-full
                                bg-gold
                            "
                        />
                    )}
                </button>


                {/* Avatar */}
                <div className="w-9 h-9 rounded-full overflow-hidden bg-white border border-gray/40 flex-shrink-0">

                    {avatarUrl ? (
                        <img
                            src={avatarUrl}
                            alt="Customer"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center bg-navy text-white">
                            <span className="text-xs font-bold">
                                H
                            </span>
                        </div>
                    )}

                </div>

            </div>

        </header>
    );
}

export default CustomerTopbar;