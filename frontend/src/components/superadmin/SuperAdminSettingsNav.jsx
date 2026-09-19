import React from "react";
import {
    User,
    Shield,
    SlidersHorizontal,
    Bell,
    Monitor,
} from "lucide-react";

function SuperAdminSettingsNav({ activeSection = "profile", onSectionChange }) {
    const items = [
        { key: "profile", label: "Profile", icon: User },
        { key: "security", label: "Security", icon: Shield },
        {
            key: "platformPreferences",
            label: "Platform Preferences",
            icon: SlidersHorizontal,
        },
        { key: "notifications", label: "Notifications", icon: Bell },
        { key: "sessions", label: "Sessions", icon: Monitor },
    ];

    return (
        <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0">
            {items.map((item) => {
                const Icon = item.icon;
                const isActive = activeSection === item.key;

                return (
                    <button
                        key={item.key}
                        type="button"
                        onClick={() => onSectionChange && onSectionChange(item.key)}
                        className={`
                            flex items-center gap-3
                            px-3 py-3
                            rounded-lg
                            text-sm font-bold
                            whitespace-nowrap
                            transition cursor-pointer
                            border-l-2
                            ${
                                isActive
                                    ? "bg-beige/60 text-navy border-navy"
                                    : "text-slate border-transparent hover:text-navy"
                            }
                        `}
                    >
                        <Icon className="w-4 h-4 flex-shrink-0" />

                        <span>{item.label}</span>
                    </button>
                );
            })}
        </nav>
    );
}

export default SuperAdminSettingsNav;