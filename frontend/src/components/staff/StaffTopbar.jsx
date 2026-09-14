import React from "react";
import { Search, Bell, Settings } from "lucide-react";

function StaffTopbar({
    avatarUrl = "",
    onSearchClick,
    onNotificationsClick,
    onSettingsClick,
}) {
    return (
        <header className="bg-beige border-b border-gray/20 px-8 py-4 flex items-center justify-between flex-shrink-0">

            {/* Left */}
            <button
                type="button"
                onClick={onSearchClick}
                aria-label="Search"
                className="
                    text-navy
                    hover:text-gold
                    transition
                    cursor-pointer
                "
            >
                <Search className="w-[18px] h-[18px]" />
            </button>

            {/* Right */}
            <div className="flex items-center gap-5">

                <button
                    type="button"
                    onClick={onNotificationsClick}
                    aria-label="Notifications"
                    className="
                        text-navy
                        hover:text-gold
                        transition
                        cursor-pointer
                    "
                >
                    <Bell className="w-[18px] h-[18px]" />
                </button>

                <button
                    type="button"
                    onClick={onSettingsClick}
                    aria-label="Account settings"
                    className="
                        text-navy
                        hover:text-gold
                        transition
                        cursor-pointer
                    "
                >
                    <Settings className="w-[18px] h-[18px]" />
                </button>

                {avatarUrl ? (
                    <img
                        src={avatarUrl}
                        alt="Staff profile"
                        className="w-9 h-9 rounded-full object-cover"
                    />
                ) : (
                    <div className="w-9 h-9 rounded-full bg-navy flex items-center justify-center">
                        <span className="text-xs font-bold text-gold">
                            SA
                        </span>
                    </div>
                )}

            </div>
        </header>
    );
}

export default StaffTopbar;
