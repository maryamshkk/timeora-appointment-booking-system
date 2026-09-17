import React, { useState } from "react";
import {
    Building2,
    Calendar,
    Plus,
    TrendingUp,
    Users,
} from "lucide-react";
import { Link } from "react-router-dom";

import SuperAdminSidebar from "../../components/superadmin/SuperAdminSidebar";
import SuperAdminTopbar from "../../components/superadmin/SuperAdminTopbar";

function SuperAdminDashboard() {
    const [currentAdmin] = useState({ name: "Admin" });

    const [systemStatus] = useState("operational");

    const [platformStats] = useState({
        companies: { total: 1248, deltaPercent: 8.4 },
        customers: { total: 28430, deltaPercent: 12.2 },
        appointments: { total: 142580, deltaPercent: 15.6 },
    });

    // TODO: Replace seeded admin + stats with a real fetch on mount.

    function getGreeting() {
        const hour = new Date().getHours();

        if (hour < 12) return "Good morning";
        if (hour < 18) return "Good afternoon";
        return "Good evening";
    }

    function formatToday() {
        return new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
        });
    }

    function handleAddCompany() {
        // TODO: Navigate to the add-company flow.
    }

    function handleSendAnnouncement() {
        // TODO: Open an announcement composer.
    }

    return (
        <div className="min-h-screen bg-beige flex">

            <SuperAdminSidebar activeItem="Dashboard" />

            <div className="flex-1 min-w-0 flex flex-col">

                <SuperAdminTopbar systemStatus={systemStatus} />

                <main className="flex-1 px-8 py-6">
                    {/* Content added in next steps */}
                </main>

            </div>

        </div>
    );
}

export default SuperAdminDashboard;