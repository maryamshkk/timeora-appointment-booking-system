import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Calendar,
    Inbox,
    CheckCircle2,
    XCircle,
} from "lucide-react";

import StaffSidebar from "../../components/staff/StaffSidebar";
import StaffTopbar from "../../components/staff/StaffTopbar";

function StaffAppointments() {
    const navigate = useNavigate();

    const [stats] = useState({
        today: 8,
        upcoming: 14,
        completed: 34,
        cancelled: 2,
    });

    const currentStaff = {
        name: "Dr. Sara Ahmed",
        role: "Doctor",
        avatarUrl: "",
        companyName: "Shifa Clinic",
    };

    const statCards = [
        {
            title: "Today",
            value: stats.today,
            icon: Calendar,
            iconClass: "text-navy",
        },
        {
            title: "Upcoming",
            value: stats.upcoming,
            icon: Inbox,
            iconClass: "text-gold",
        },
        {
            title: "Completed",
            value: stats.completed,
            icon: CheckCircle2,
            iconClass: "text-navy",
        },
        {
            title: "Cancelled",
            value: stats.cancelled,
            icon: XCircle,
            iconClass: "text-red-500",
        },
    ];

    return (
        <div className="min-h-screen bg-beige flex">
            {/* Sidebar */}
            <StaffSidebar
                companyName={currentStaff.companyName}
                currentStaff={currentStaff}
                activeItem="Appointments"
                handleSignOut={() => navigate("/login")}
            />

            <div className="flex-1 min-w-0 flex flex-col">
                {/* Topbar */}
                <StaffTopbar
                    avatarUrl={currentStaff.avatarUrl}
                    onSearchClick={() => {}}
                    onNotificationsClick={() =>
                        navigate("/staff/notifications")
                    }
                    onSettingsClick={() =>
                        navigate("/staff/settings")
                    }
                />

                {/* Main Content */}
                <main className="flex-1 bg-beige px-4 sm:px-6 lg:px-8 py-6">
                    <div className="max-w-7xl mx-auto w-full">

                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5 mb-6">
                            <div>
                                <h1 className="font-serif text-4xl text-navy">
                                    My Appointments
                                </h1>

                                <p className="text-sm text-slate mt-1.5">
                                    View and manage appointments assigned to you.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    navigate("/staff/calendar")
                                }
                                className="
                                    inline-flex
                                    items-center
                                    justify-center
                                    gap-2
                                    bg-navy
                                    text-white
                                    px-5
                                    py-2.5
                                    rounded-lg
                                    font-bold
                                    text-sm
                                    hover:bg-gold
                                    hover:text-navy
                                    transition
                                "
                            >
                                <Calendar className="w-4 h-4" />
                                Calendar
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                            {statCards.map((stat) => {
                                const Icon = stat.icon;

                                return (
                                    <div
                                        key={stat.title}
                                        className="
                                            bg-white
                                            rounded-xl
                                            border
                                            border-gray/20
                                            shadow-sm
                                            p-6
                                        "
                                    >
                                        <div className="flex items-center justify-between mb-2.5">
                                            <h2 className="font-serif text-xl text-navy">
                                                {stat.title}
                                            </h2>

                                            <Icon
                                                className={`w-[18px] h-[18px] ${stat.iconClass}`}
                                            />
                                        </div>

                                        <div className="border-b border-gray/20 mb-3.5" />

                                        <p className="text-4xl font-bold text-navy">
                                            {stat.value}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
}

export default StaffAppointments;