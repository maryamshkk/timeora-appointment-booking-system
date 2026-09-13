import React from "react";
import { Link } from "react-router-dom";

function SettingsNav({ activeSection = "overview" }) {
    const navItems = [
        {
            key: "overview",
            label: "Overview",
            path: "/company/settings",
        },
        {
            key: "profile",
            label: "Company Profile",
            path: "/company/settings/profile",
        },
        {
            key: "hours",
            label: "Business Hours",
            path: "/company/settings/hours",
        },
        {
            key: "booking",
            label: "Booking Settings",
            path: "/company/settings/booking",
        },
        {
            key: "notifications",
            label: "Notification Settings",
            path: "/company/settings/notifications",
        },
    ];

    return (
        <nav className="w-full md:w-[220px] md:flex-shrink-0">
            <div className="flex flex-col gap-1">
                {navItems.map((item) => {
                    const isActive = activeSection === item.key;

                    return (
                        <Link
                            key={item.key}
                            to={item.path}
                            className={`
                                block
                                px-3 py-2.5
                                rounded-lg
                                border-l-4
                                text-sm
                                font-bold
                                transition
                                ${
                                    isActive
                                        ? "bg-white text-navy border-gold"
                                        : "text-slate border-transparent hover:bg-white/60"
                                }
                            `}
                        >
                            {item.label}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}

export default SettingsNav;