import React from "react";
import {
    LayoutGrid,
    Search,
    Calendar,
    Bell,
    User,
    Settings,
} from "lucide-react";
import { Link } from "react-router-dom";

function CustomerSidebar({ activeItem = "Dashboard" }) {

    const navItems = [
        {
            label: "Dashboard",
            icon: LayoutGrid,
            path: "/customer/dashboard",
        },
        {
            label: "Browse Companies",
            icon: Search,
            path: "/customer/browse",
        },
        {
            label: "My Appointments",
            icon: Calendar,
            path: "/customer/appointments",
        },
        {
            label: "Notifications",
            icon: Bell,
            path: "/customer/notifications",
        },
    ];

    return (
        <aside className="w-64 min-h-screen bg-navy flex flex-col flex-shrink-0">

            {/* Logo */}
            <div className="px-6 py-6">

                <Link to="/customer/dashboard">
                    <h1 className="font-serif italic text-2xl text-gold">
                        Timeora
                    </h1>
                </Link>

                <p className="text-sm text-white/50 mt-1">
                    Personal Hub
                </p>

            </div>


            {/* Navigation */}
            <nav className="flex-1 px-3 mt-4">

                <div className="flex flex-col gap-1">

                    {navItems.map((item) => {

                        const Icon = item.icon;
                        const isActive = activeItem === item.label;

                        return (
                            <Link
                                key={item.label}
                                to={item.path}
                                className={`
                                    flex items-center gap-3
                                    px-3 py-2.5
                                    rounded-lg
                                    text-sm
                                    font-bold
                                    transition
                                    ${
                                        isActive
                                            ? "text-gold border-l-2 border-gold"
                                            : "text-white/60 hover:text-white border-l-2 border-transparent"
                                    }
                                `}
                            >
                                <Icon className="w-4 h-4 flex-shrink-0" />

                                <span>
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}

                </div>

            </nav>


            {/* Bottom Links */}
            <div className="border-t border-white/10 px-3 py-4">

                {/* Profile */}
                <Link
                    to="/customer/profile"
                    className="flex items-center gap-3 px-3 py-2 text-sm font-bold text-white/60 hover:text-white transition"
                >
                    <User className="w-4 h-4" />

                    <span>
                        Profile
                    </span>
                </Link>


                {/* Settings */}
                <Link
                    to="/customer/settings"
                    className="flex items-center gap-3 px-3 py-2 text-sm font-bold text-white/60 hover:text-white transition"
                >
                    <Settings className="w-4 h-4" />

                    <span>
                        Settings
                    </span>
                </Link>

            </div>

        </aside>
    );
}

export default CustomerSidebar;