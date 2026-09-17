import React from "react";
import {
    LayoutGrid,
    Building2,
    Users,
    Briefcase,
    Calendar,
    BarChart3,
    TrendingUp,
    Bell,
    Settings,
    LifeBuoy,
} from "lucide-react";
import { Link } from "react-router-dom";

function SuperAdminSidebar({ activeItem = "Dashboard" }) {
    const navItems = [
        {
            label: "Dashboard",
            icon: LayoutGrid,
            path: "/superadmin/dashboard",
        },
        {
            label: "Companies",
            icon: Building2,
            path: "/superadmin/companies",
        },
        {
            label: "Customers",
            icon: Users,
            path: "/superadmin/customers",
        },
        {
            label: "Staff",
            icon: Briefcase,
            path: "/superadmin/staff",
        },
        {
            label: "Appointments",
            icon: Calendar,
            path: "/superadmin/appointments",
        },
        {
            label: "Reports",
            icon: BarChart3,
            path: "/superadmin/reports",
        },
        {
            label: "Analytics",
            icon: TrendingUp,
            path: "/superadmin/analytics",
        },
        {
            label: "Notifications",
            icon: Bell,
            path: "/superadmin/notifications",
        },
        {
            label: "Settings",
            icon: Settings,
            path: "/superadmin/settings",
        },
    ];

    return (
        <aside className="w-64 min-h-screen bg-navy flex flex-col flex-shrink-0">

            {/* Logo */}
            <div className="px-6 py-6">
                <Link to="/superadmin/dashboard">
                    <h1 className="font-serif italic text-3xl text-gold">
                        Timeora
                    </h1>
                </Link>

                <p className="text-sm text-white/50 mt-1">
                    Super Admin
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
                                    flex
                                    items-center
                                    gap-3
                                    px-3
                                    py-2.5
                                    rounded-lg
                                    text-sm
                                    font-bold
                                    uppercase
                                    tracking-wide
                                    transition
                                    ${
                                        isActive
                                            ? "text-gold border-l-2 border-gold"
                                            : "text-white/60 hover:text-white border-l-2 border-transparent"
                                    }
                                `}
                            >
                                <Icon className="w-4 h-4 flex-shrink-0" />

                                <span>{item.label}</span>
                            </Link>
                        );
                    })}

                </div>
            </nav>

            {/* Bottom — Support Portal */}
            <div className="border-t border-white/10 p-4 mt-auto">

                <Link
                    to="/superadmin/support"
                    className="
                        w-full
                        bg-transparent
                        border
                        border-white/20
                        text-white
                        text-sm
                        font-bold
                        uppercase
                        tracking-wide
                        py-2.5
                        rounded-lg
                        flex
                        items-center
                        justify-center
                        gap-2
                        hover:bg-white/5
                        transition
                    "
                >
                    <LifeBuoy className="w-4 h-4" />
                    Support Portal
                </Link>

            </div>

        </aside>
    );
}

export default SuperAdminSidebar;