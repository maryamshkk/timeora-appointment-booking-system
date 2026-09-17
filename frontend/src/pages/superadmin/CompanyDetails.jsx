import React, { useState } from "react";
import {
    Calendar,
    ChevronRight,
    Mail,
    MoreHorizontal,
    Phone,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import SuperAdminSidebar from "../../components/superadmin/SuperAdminSidebar";
import SuperAdminTopbar from "../../components/superadmin/SuperAdminTopbar";

function CompanyDetails() {
    const { id } = useParams();

    const [company] = useState({
        id: "TM-001248",
        name: "Shifa Clinic",
        category: "Healthcare",
        status: "active",
        logoUrl: "",
        email: "info@shifaclinic.com",
        phone: "+92 300 1234567",
        registeredDate: "21 Aug 2026",
        stats: {
            totalAppointments: 324,
            completed: 286,
            totalCustomers: 1240,
            staffCount: 18,
            servicesCount: 12,
        },
    });

    // TODO: Replace seeded company with a real fetch keyed by the route param.

    const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

    function handleChangeStatus() {
        // TODO: Open a status-change flow (e.g. Active → Suspended).
        // Should require confirmation since it affects a live company's access.
    }

    function getStatusStyles(status) {
        switch (status) {
            case "active":
                return "bg-green-50 text-green-700";
            case "pending":
                return "bg-amber-50 text-amber-700";
            case "suspended":
                return "bg-red-50 text-red-700";
            default:
                return "bg-gray/10 text-slate";
        }
    }

    return (
        <div className="min-h-screen bg-beige flex">

            <SuperAdminSidebar activeItem="Companies" />

            <div className="flex-1 min-w-0 flex flex-col">

                <SuperAdminTopbar unreadCount={3} />

                {/* Summary Row */}
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr_1fr_1fr_1fr] gap-6">

                {/* Company Overview */}
                <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6 min-w-[260px]">

                    <h2 className="font-serif text-xl text-navy">
                        Company Overview
                    </h2>

                    <div className="border-b border-gray/20 my-4"></div>

                    {/* Email */}
                    <div className="flex items-center gap-2.5 mb-2.5">
                        <Mail className="w-4 h-4 text-slate flex-shrink-0" />

                        <span className="text-sm text-slate truncate">
                            {company.email}
                        </span>
                    </div>

                    {/* Phone */}
                    <div className="flex items-center gap-2.5 mb-2.5">
                        <Phone className="w-4 h-4 text-slate flex-shrink-0" />

                        <span className="text-sm text-slate">
                            {company.phone}
                        </span>
                    </div>

                    {/* Registered */}
                    <div className="flex items-center gap-2.5">
                        <Calendar className="w-4 h-4 text-slate flex-shrink-0" />

                        <span className="text-sm text-slate">
                            Registered: {company.registeredDate}
                        </span>
                    </div>

                </div>

                {/* Total Appointments */}
                <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6">

                    <p className="text-xs font-bold uppercase tracking-wide text-slate mb-2.5">
                        Total Appointments
                    </p>

                    <p className="text-4xl font-bold text-navy">
                        {company.stats.totalAppointments.toLocaleString()}
                    </p>

                </div>

                {/* Completed */}
                <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6">

                    <p className="text-xs font-bold uppercase tracking-wide text-slate mb-2.5">
                        Completed
                    </p>

                    <p className="text-4xl font-bold text-navy">
                        {company.stats.completed.toLocaleString()}
                    </p>

                </div>

                {/* Total Customers */}
                <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6">

                    <p className="text-xs font-bold uppercase tracking-wide text-slate mb-2.5">
                        Total Customers
                    </p>

                    <p className="text-4xl font-bold text-navy">
                        {company.stats.totalCustomers.toLocaleString()}
                    </p>

                </div>

                {/* Staff & Services */}
                <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6">

                    <p className="text-xs font-bold uppercase tracking-wide text-slate mb-2.5">
                        Staff & Services
                    </p>

                    <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-3xl font-bold text-navy">
                            {company.stats.staffCount}
                        </span>

                        <span className="text-sm text-slate">
                            Staff
                        </span>
                    </div>

                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-navy">
                            {company.stats.servicesCount}
                        </span>

                        <span className="text-sm text-slate">
                            Svcs
                        </span>
                    </div>

                </div>

            </div>

            </div>

        </div>
    );
}

export default CompanyDetails;