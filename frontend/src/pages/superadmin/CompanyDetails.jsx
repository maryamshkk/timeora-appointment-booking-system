import React, { useState } from "react";
import {
    Calendar,
    ChevronRight,
    Mail,
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

                <main className="flex-1 px-8 py-6">

                    {/* Breadcrumb */}
                    <div className="flex items-center flex-wrap gap-1.5 mb-4">

                        <Link
                            to="/superadmin/companies"
                            className="text-xs font-bold uppercase tracking-wide text-slate hover:text-navy transition"
                        >
                            Companies
                        </Link>

                        <ChevronRight className="w-3 h-3 text-gray flex-shrink-0" />

                        <span className="text-xs font-bold uppercase tracking-wide text-navy">
                            {company.name}
                        </span>

                    </div>

                    {/* Header Row */}
                    <div className="flex justify-between items-start flex-wrap gap-4 mb-6">

                        {/* Left — logo + name + meta */}
                        <div className="flex items-center gap-4">

                            {company.logoUrl ? (
                                <img
                                    src={company.logoUrl}
                                    alt={company.name}
                                    className="w-20 h-20 rounded-lg object-cover border border-gray/20 flex-shrink-0"
                                />
                            ) : (
                                <div className="w-20 h-20 rounded-lg bg-white border border-gray/20 flex items-center justify-center flex-shrink-0">
                                    <span className="font-serif text-2xl text-navy">
                                        {company.name
                                            .split(" ")
                                            .map((word) => word.charAt(0))
                                            .slice(0, 2)
                                            .join("")
                                            .toUpperCase()}
                                    </span>
                                </div>
                            )}

                            <div className="min-w-0">
                                <h1 className="font-serif text-5xl text-navy">
                                    {company.name}
                                </h1>

                                <div className="flex items-center gap-2 text-sm text-slate mt-2 flex-wrap">
                                    <span>{company.category}</span>

                                    <span>·</span>

                                    <span>ID: {company.id}</span>

                                    <span>·</span>

                                    <span
                                        className={`
                                            text-xs
                                            font-bold
                                            px-2.5
                                            py-1
                                            rounded-full
                                            ${getStatusStyles(company.status)}
                                        `}
                                    >
                                        {company.status.charAt(0).toUpperCase() +
                                            company.status.slice(1)}
                                    </span>
                                </div>
                            </div>

                        </div>

                        {/* Right — actions */}
                        <div className="flex gap-3 flex-shrink-0">

                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setIsMoreMenuOpen(!isMoreMenuOpen)}
                                    className="
                                        bg-white
                                        border
                                        border-gray
                                        text-navy
                                        font-bold
                                        text-sm
                                        px-5
                                        py-2.5
                                        rounded-lg
                                        hover:border-navy
                                        transition
                                        cursor-pointer
                                    "
                                >
                                    More
                                </button>

                                {isMoreMenuOpen && (
                                    <div className="absolute right-0 top-full mt-2 z-20 w-48 bg-white border border-gray/20 rounded-lg shadow-lg p-1">

                                        <button
                                            type="button"
                                            className="w-full text-left px-3 py-2 rounded-md text-sm text-navy hover:bg-beige cursor-pointer"
                                        >
                                            Edit Company
                                        </button>

                                        <button
                                            type="button"
                                            className="w-full text-left px-3 py-2 rounded-md text-sm text-navy hover:bg-beige cursor-pointer"
                                        >
                                            View Public Profile
                                        </button>

                                        <button
                                            type="button"
                                            className="w-full text-left px-3 py-2 rounded-md text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                                        >
                                            Delete Company
                                        </button>

                                    </div>
                                )}
                            </div>

                            <button
                                type="button"
                                onClick={handleChangeStatus}
                                className="
                                    bg-navy
                                    text-white
                                    font-bold
                                    text-sm
                                    px-5
                                    py-2.5
                                    rounded-lg
                                    hover:bg-gold
                                    hover:text-navy
                                    transition
                                    cursor-pointer
                                "
                            >
                                Change Status
                            </button>

                        </div>

                    </div>

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

                </main>

            </div>

        </div>
    );
}

export default CompanyDetails;