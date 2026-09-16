import React from "react";
import {
    LayoutGrid,
    Search,
    Calendar,
    Bell,
    User,
    Settings,
    Plus,
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
        {
            label: "Profile",
            icon: User,
            path: "/customer/profile",
        },
        {
            label: "Settings",
            icon: Settings,
            path: "/customer/settings",
        },
    ];

    function handleLogout() {
        // TODO: Clear session and navigate to /login.
    }

    return (
        <aside className="w-64 min-h-screen bg-navy flex flex-col flex-shrink-0">

            {/* Logo */}
            <div className="px-6 py-6">

                <Link to="/customer/dashboard">
                    <h1 className="font-serif text-2xl text-white">
                        Timeora
                    </h1>
                </Link>

                <p className="text-sm text-white/50 mt-1">
                    Customer Portal
                </p>

            </div>

            {/* Book New Appointment CTA */}
            <div className="px-3 mb-4">

                <Link
                    to="/customer/browse"
                    className="
                        w-full
                        bg-gold
                        text-navy
                        font-bold
                        text-sm
                        px-4
                        py-3
                        rounded-lg
                        flex
                        items-center
                        justify-center
                        gap-2
                        hover:bg-white
                        transition
                    "
                >
                    <Plus className="w-4 h-4" />
                    Book New Appointment
                </Link>

            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3">

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

            {/* Bottom — Identity Card with inline Logout */}
            <div className="mt-auto border-t border-white/10 p-3">

                <div className="flex items-center gap-3 rounded-lg p-2">

                    {/* Avatar */}
                    <div className="w-10 h-10 rounded-full bg-beige flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-navy">
                            J
                        </span>
                    </div>

                    {/* Name + Logout */}
                    <div className="min-w-0">
                        <p className="text-sm font-bold text-white truncate">
                            J. Doe
                        </p>

                        <button
                            type="button"
                            onClick={handleLogout}
                            className="
                                text-xs
                                font-bold
                                text-white/50
                                hover:text-white
                                transition
                                cursor-pointer
                            "
                        >
                            Logout
                        </button>
                    </div>

                </div>

            </div>

        </aside>
    );
}

export default CustomerSidebar;