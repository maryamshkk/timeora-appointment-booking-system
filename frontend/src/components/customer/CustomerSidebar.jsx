import React from "react";
import {
    LayoutGrid,
    Search,
    Calendar,
    Bell,
} from "lucide-react";
import { Link } from "react-router-dom";

function CustomerSidebar({
    activeItem = "Dashboard",
    customer = null,
}) {

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


            {/* Bottom Customer Section */}
            <div className="mt-auto px-3 py-4 border-t border-white/10">

                {/* Customer Identity Card */}
                <Link
                    to="/customer/profile"
                    className="
                        flex
                        items-center
                        gap-3
                        rounded-xl
                        p-2.5
                        hover:bg-white/5
                        transition
                    "
                >
                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-beige flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {customer?.avatarUrl ? (
                            <img
                                src={customer.avatarUrl}
                                alt={customer.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <span className="text-sm font-bold text-navy">
                                {customer?.name
                                    ?.charAt(0)
                                    ?.toUpperCase() || "J"}
                            </span>
                        )}
                    </div>

                    {/* Customer Information */}
                    <div className="min-w-0">
                        <p className="text-sm font-bold text-white truncate">
                            {customer?.name || "Jane Doe"}
                        </p>

                        <p className="text-xs text-white/50 truncate mt-0.5">
                            {customer?.email || "jane.d@example.com"}
                        </p>
                    </div>
                </Link>

                {/* Profile / Settings */}
                <div className="flex items-center gap-4 px-3 mt-2">

                    <Link
                        to="/customer/profile"
                        className="text-xs font-bold text-white/50 hover:text-white transition"
                    >
                        Profile
                    </Link>

                    <Link
                        to="/customer/settings"
                        className="text-xs font-bold text-white/50 hover:text-white transition"
                    >
                        Settings
                    </Link>

                </div>

            </div>

        </aside>
    );
}

export default CustomerSidebar;