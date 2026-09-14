import React, { useEffect } from "react";
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
    X,
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
    isOpen = false,
    onClose,
}) {
    const navItems = [
        { label: "Dashboard", icon: LayoutGrid, path: "/staff/dashboard" },
        { label: "Calendar", icon: Calendar, path: "/staff/calendar" },
        { label: "Appointments", icon: ClipboardCheck, path: "/staff/appointments" },
        { label: "Availability", icon: CalendarClock, path: "/staff/availability" },
        { label: "Customers", icon: Users, path: "/staff/customers" },
        { label: "Reports", icon: BarChart, path: "/staff/reports" },
        { label: "Notifications", icon: Bell, path: "/staff/notifications" },
        { label: "Settings", icon: Settings, path: "/staff/settings" },
    ];

    /* Lock body scroll while drawer is open (mobile/tablet only) */
    useEffect(() => {
        if (!isOpen) return;

        const originalOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = originalOverflow;
        };
    }, [isOpen]);

    /* Close on Escape */
    useEffect(() => {
        function handleKeyDown(event) {
            if (event.key === "Escape" && isOpen) {
                onClose?.();
            }
        }

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, onClose]);

    function getInitials(name) {
        return name
            .split(" ")
            .map((word) => word.charAt(0))
            .slice(0, 2)
            .join("")
            .toUpperCase();
    }

    function handleLinkClick() {
        if (onClose) onClose();
    }

    function handleSignOutClick() {
        if (onClose) onClose();
        if (handleSignOut) handleSignOut();
    }

    /* Sidebar content — same markup for desktop and drawer */
    const sidebarContent = (
        <aside className="flex h-full w-64 flex-shrink-0 flex-col bg-navy px-6 py-6 text-white">

            {/* Brand — fixed */}
            <div className="mb-6 flex flex-shrink-0 items-start justify-between gap-3">

                <div className="flex min-w-0 items-center gap-3">

                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-white/10">
                        <span className="font-serif text-lg italic text-gold">
                            T
                        </span>
                    </div>

                    <div className="min-w-0">
                        <p className="font-serif text-lg italic leading-tight text-gold">
                            Timeora
                        </p>

                        <p className="mt-0.5 truncate text-xs text-white/60">
                            {companyName} Staff Portal
                        </p>
                    </div>

                </div>

                {/* Close button — only in drawer mode */}
                {onClose && (
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close menu"
                        className="
                            flex h-8 w-8 flex-shrink-0 items-center justify-center
                            rounded-lg text-white/60 transition
                            hover:bg-white/10 hover:text-white
                            lg:hidden
                        "
                    >
                        <X className="h-4 w-4" />
                    </button>
                )}

            </div>

            {/* Navigation — scrollable */}
            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto pr-1 sidebar-scroll">

                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeItem === item.label;

                    return (
                        <NavLink
                            key={item.label}
                            to={item.path}
                            onClick={handleLinkClick}
                            className={`
                                flex flex-shrink-0 items-center gap-3
                                rounded-lg border-l-4 px-3 py-2.5
                                text-sm transition
                                ${
                                    isActive
                                        ? "border-gold bg-gold/90 font-bold text-navy"
                                        : "border-transparent text-white/70 hover:bg-white/5 hover:text-white"
                                }
                            `}
                        >
                            <Icon className="h-[18px] w-[18px] flex-shrink-0" />

                            <span>{item.label}</span>
                        </NavLink>
                    );
                })}

            </nav>

            {/* Bottom — fixed */}
            <div className="flex-shrink-0">

                <div className="my-4 border-t border-white/10" />

                {/* Staff user card */}
                <div className="mb-3 flex items-center gap-3 rounded-lg bg-white/5 px-3 py-2.5">

                    {currentStaff.avatarUrl ? (
                        <img
                            src={currentStaff.avatarUrl}
                            alt={currentStaff.name}
                            className="h-9 w-9 flex-shrink-0 rounded-lg object-cover"
                        />
                    ) : (
                        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-gold">
                            <span className="text-xs font-bold text-navy">
                                {getInitials(currentStaff.name)}
                            </span>
                        </div>
                    )}

                    <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-white">
                            {currentStaff.name}
                        </p>

                        <p className="mt-0.5 truncate text-xs text-white/50">
                            {currentStaff.role}
                        </p>
                    </div>

                </div>

                {/* Logout */}
                <button
                    type="button"
                    onClick={handleSignOutClick}
                    className="
                        flex w-full cursor-pointer items-center gap-3
                        rounded-lg px-3 py-2.5 text-sm text-white/60
                        transition hover:bg-white/5 hover:text-white
                    "
                >
                    <LogOut className="h-[18px] w-[18px]" />

                    <span>Sign Out</span>
                </button>

            </div>

        </aside>
    );

    return (
        <>
            {/* Desktop sidebar — always visible from lg up */}
            <div className="hidden lg:block lg:flex-shrink-0">
                {sidebarContent}
            </div>

            {/* Mobile / Tablet drawer + scrim */}
            {onClose && (
                <>
                    {/* Scrim */}
                    <div
                        onClick={onClose}
                        aria-hidden="true"
                        className={`
                            fixed inset-0 z-30 bg-navy/50 backdrop-blur-[2px]
                            transition-opacity duration-300 ease-out
                            lg:hidden
                            ${
                                isOpen
                                    ? "pointer-events-auto opacity-100"
                                    : "pointer-events-none opacity-0"
                            }
                        `}
                    />

                    {/* Sliding drawer */}
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-label="Staff navigation"
                        className={`
                            fixed left-0 top-0 z-40 h-screen w-64 max-w-[80vw]
                            overflow-hidden lg:hidden
                            transition-transform duration-300 ease-out
                            will-change-transform
                            ${isOpen ? "translate-x-0" : "-translate-x-full"}
                        `}
                    >
                        {sidebarContent}
                    </div>
                </>
            )}
        </>
    );
}

export default StaffSidebar;