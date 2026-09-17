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

                {/* Header */}
                <div className="flex justify-between items-start gap-6 flex-wrap mb-5">

                    <div>
                        <h1 className="font-serif text-4xl text-navy">
                            {getGreeting()}, {currentAdmin.name}
                        </h1>

                        <p className="text-sm text-slate mt-1.5">
                            Here's your TIMEORA platform overview.
                        </p>
                    </div>

                    <p className="text-base text-navy">
                        {formatToday()}
                    </p>

                </div>

                {/* Quick Actions */}
                <div className="flex gap-3 flex-wrap mb-6">

                    <button
                        type="button"
                        onClick={handleAddCompany}
                        className="
                            bg-navy
                            text-white
                            font-bold
                            text-sm
                            px-5
                            py-3
                            rounded-lg
                            flex
                            items-center
                            gap-2
                            hover:bg-gold
                            hover:text-navy
                            transition
                            cursor-pointer
                        "
                    >
                        <Plus className="w-4 h-4" />
                        Add Company
                    </button>

                    <Link
                        to="/superadmin/appointments"
                        className="
                            bg-white
                            border-2
                            border-navy
                            text-navy
                            font-bold
                            text-sm
                            px-5
                            py-3
                            rounded-lg
                            hover:bg-navy
                            hover:text-white
                            transition
                        "
                    >
                        View Appointments
                    </Link>

                    <Link
                        to="/superadmin/reports"
                        className="
                            bg-white
                            border-2
                            border-navy
                            text-navy
                            font-bold
                            text-sm
                            px-5
                            py-3
                            rounded-lg
                            hover:bg-navy
                            hover:text-white
                            transition
                        "
                    >
                        View Reports
                    </Link>

                    <button
                        type="button"
                        onClick={handleSendAnnouncement}
                        className="
                            bg-white
                            border-2
                            border-navy
                            text-navy
                            font-bold
                            text-sm
                            px-5
                            py-3
                            rounded-lg
                            hover:bg-navy
                            hover:text-white
                            transition
                            cursor-pointer
                        "
                    >
                        Send Announcement
                    </button>

                </div>

                {/* Stat Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                    {/* Total Companies */}
                    <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6">

                        <div className="flex justify-between items-center mb-3.5">
                            <span className="text-xs font-bold uppercase tracking-wide text-slate">
                                Total Companies
                            </span>

                            <Building2 className="w-5 h-5 text-navy" />
                        </div>

                        <p className="text-4xl font-bold text-navy mb-2">
                            {platformStats.companies.total.toLocaleString()}
                        </p>

                        <div className="flex items-center gap-1.5">
                            <TrendingUp className="w-3.5 h-3.5 text-green-600" />

                            <span className="text-sm font-bold text-green-600">
                                +{platformStats.companies.deltaPercent}% this month
                            </span>
                        </div>

                    </div>

                    {/* Total Customers */}
                    <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6">

                        <div className="flex justify-between items-center mb-3.5">
                            <span className="text-xs font-bold uppercase tracking-wide text-slate">
                                Total Customers
                            </span>

                            <Users className="w-5 h-5 text-navy" />
                        </div>

                        <p className="text-4xl font-bold text-navy mb-2">
                            {platformStats.customers.total.toLocaleString()}
                        </p>

                        <div className="flex items-center gap-1.5">
                            <TrendingUp className="w-3.5 h-3.5 text-green-600" />

                            <span className="text-sm font-bold text-green-600">
                                +{platformStats.customers.deltaPercent}% this month
                            </span>
                        </div>

                    </div>

                    {/* Total Appointments */}
                    <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6">

                        <div className="flex justify-between items-center mb-3.5">
                            <span className="text-xs font-bold uppercase tracking-wide text-slate">
                                Total Appointments
                            </span>

                            <Calendar className="w-5 h-5 text-navy" />
                        </div>

                        <p className="text-4xl font-bold text-navy mb-2">
                            {platformStats.appointments.total.toLocaleString()}
                        </p>

                        <div className="flex items-center gap-1.5">
                            <TrendingUp className="w-3.5 h-3.5 text-green-600" />

                            <span className="text-sm font-bold text-green-600">
                                +{platformStats.appointments.deltaPercent}% this month
                            </span>
                        </div>

                    </div>

                </div>

            </main>

            </div>

        </div>
    );
}

export default SuperAdminDashboard;