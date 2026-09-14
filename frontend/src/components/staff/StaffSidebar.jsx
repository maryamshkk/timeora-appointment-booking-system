import React from "react";
import { NavLink } from "react-router-dom";
import {
    LayoutGrid,
    Calendar,
    ClipboardCheck,
    CalendarClock,
    Users,
    BarChart,
    Bell,
    Settings,
    LogOut,
} from "lucide-react";

function StaffSidebar({
    companyName = "Shifa Clinic",
    currentStaff = {
        name: "Dr. Sara Ahmed",
        role: "Staff Member",
        avatarUrl: "",
    },
    activeItem = "Dashboard",
    handleSignOut,
}) {
    const navItems = [
        {
            label: "Dashboard",
            icon: LayoutGrid,
            path: "/staff/dashboard",
        },
        {
            label: "Calendar",
            icon: Calendar,
            path: "/staff/calendar",
        },
        {
            label: "Appointments",
            icon: ClipboardCheck,
            path: "/staff/appointments",
        },
        {
            label: "Availability",
            icon: CalendarClock,
            path: "/staff/availability",
        },
        {
            label: "Customers",
            icon: Users,
            path: "/staff/customers",
        },
        {
            label: "Reports",
            icon: BarChart,
            path: "/staff/reports",
        },
        {
            label: "Notifications",
            icon: Bell,
            path: "/staff/notifications",
        },
        {
            label: "Settings",
            icon: Settings,
            path: "/staff/settings",
        },
    ];

    function getInitials(name) {
        return name
            .split(" ")
            .map((word) => word.charAt(0))
            .slice(0, 2)
            .join("")
            .toUpperCase();
    }

    return (
        <aside className="w-64 min-h-screen bg-navy text-white flex flex-col flex-shrink-0">

            {/* Logo */}
            <div className="px-6 py-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-lg font-bold text-navy">
                            T
                        </span>
                    </div>

                    <div className="min-w-0">
                        <p className="text-xl font-bold text-white leading-tight">
                            Timeora
                        </p>

                        <p className="text-xs text-white/50 mt-0.5 truncate">
                            {companyName} Staff Portal
                        </p>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3">
                <div className="flex flex-col gap-1">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = activeItem === item.label;

                        return (
                            <NavLink
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
                                            ? "bg-white/10 text-gold"
                                            : "text-white/60 hover:text-white hover:bg-white/5"
                                    }
                                `}
                            >
                                <Icon className="w-[18px] h-[18px] flex-shrink-0" />

                                <span>{item.label}</span>
                            </NavLink>
                        );
                    })}
                </div>
            </nav>

            {/* Bottom Section */}
            <div className="border-t border-white/10 p-4">

                {/* Staff User Card */}
                <div className="flex items-center gap-3 bg-white/5 rounded-lg px-3 py-2.5 mb-2">

                    {currentStaff.avatarUrl ? (
                        <img
                            src={currentStaff.avatarUrl}
                            alt={currentStaff.name}
                            className="w-9 h-9 rounded-lg object-cover flex-shrink-0"
                        />
                    ) : (
                        <div className="w-9 h-9 rounded-lg bg-gold flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-bold text-navy">
                                {getInitials(currentStaff.name)}
                            </span>
                        </div>
                    )}

                    <div className="min-w-0">
                        <p className="text-sm font-bold text-white truncate">
                            {currentStaff.name}
                        </p>

                        <p className="text-xs text-white/50 truncate mt-0.5">
                            {currentStaff.role}
                        </p>
                    </div>
                </div>

                {/* Sign Out */}
                <button
                    type="button"
                    onClick={handleSignOut}
                    className="
                        w-full
                        flex
                        items-center
                        gap-3
                        px-3
                        py-2
                        text-white/60
                        text-sm
                        font-bold
                        hover:text-white
                        transition
                        cursor-pointer
                    "
                >
                    <LogOut className="w-4 h-4" />

                    <span>Sign Out</span>
                </button>

            </div>
        </aside>
    );
}

export default StaffSidebar;
