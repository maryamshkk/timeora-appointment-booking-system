import React from "react";
import {
    Bell,
    CalendarDays,
    CalendarPlus,
    LayoutDashboard,
    LogOut,
    Settings,
    UserRound,
} from "lucide-react";
import { Link } from "react-router-dom";

function CustomerSidebar({ activeItem = "Dashboard" }) {
    const navItems = [
        {
            label: "Dashboard",
            path: "/customer/dashboard",
            icon: LayoutDashboard,
        },
        {
            label: "Browse Companies",
            path: "/customer/browse",
            icon: CalendarPlus,
        },
        {
            label: "My Appointments",
            path: "/customer/appointments",
            icon: CalendarDays,
        },
        {
            label: "Notifications",
            path: "/customer/notifications",
            icon: Bell,
        },
    ];

    function handleLogout() {
        // TODO: Clear customer session and navigate to /login.
    }

    return (
        <aside className="w-64 min-h-screen bg-navy flex flex-col px-5 py-6 flex-shrink-0">

            {/* Logo */}
            <div className="mb-6">
                <Link
                    to="/customer/dashboard"
                    className="block"
                >
                    <h1 className="font-serif text-2xl text-white">
                        Timeora
                    </h1>

                    <p className="text-sm text-white/50 mt-0.5">
                        Customer Portal
                    </p>
                </Link>
            </div>

            {/* Book Appointment */}
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
                    mb-7
                "
            >
                <CalendarPlus className="w-4 h-4" />
                Book New Appointment
            </Link>

            {/* Navigation */}
            <nav className="flex flex-col gap-1.5">

                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeItem === item.label;

                    return (
                        <Link
                            key={item.label}
                            to={item.path}
                            className={`
                                flex
                                items-center
                                gap-3
                                px-3
                                py-2.5
                                rounded-lg
                                text-sm
                                font-bold
                                transition
                                ${
                                    isActive
                                        ? "bg-white/10 text-white"
                                        : "text-white/60 hover:bg-white/5 hover:text-white"
                                }
                            `}
                        >
                            <Icon className="w-4 h-4 flex-shrink-0" />
                            {item.label}
                        </Link>
                    );
                })}

            </nav>

            {/* Bottom */}
            <div className="mt-auto">

                <div className="border-t border-white/10 pt-4 mb-2">
                    <Link
                        to="/customer/profile"
                        className="
                            flex
                            items-center
                            gap-3
                            px-3
                            py-2.5
                            rounded-lg
                            text-sm
                            font-bold
                            text-white/60
                            hover:bg-white/5
                            hover:text-white
                            transition
                        "
                    >
                        <UserRound className="w-4 h-4" />
                        Profile
                    </Link>

                    <Link
                        to="/customer/settings"
                        className="
                            flex
                            items-center
                            gap-3
                            px-3
                            py-2.5
                            rounded-lg
                            text-sm
                            font-bold
                            text-white/60
                            hover:bg-white/5
                            hover:text-white
                            transition
                        "
                    >
                        <Settings className="w-4 h-4" />
                        Settings
                    </Link>
                </div>

                {/* Logout */}
                <button
                    type="button"
                    onClick={handleLogout}
                    className="
                        w-full
                        flex
                        items-center
                        gap-3
                        px-3
                        py-2.5
                        rounded-lg
                        text-sm
                        font-bold
                        text-white/60
                        hover:bg-white/5
                        hover:text-white
                        transition
                    "
                >
                    <LogOut className="w-4 h-4" />
                    Logout
                </button>

            </div>
        </aside>
    );
}

export default CustomerSidebar;