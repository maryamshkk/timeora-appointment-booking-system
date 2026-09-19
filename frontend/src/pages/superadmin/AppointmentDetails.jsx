import React, { useState } from "react";
import {
    Briefcase,
    Building2,
    Calendar,
    ChevronRight,
    ClipboardList,
    Download,
    ExternalLink,
    User,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import SuperAdminSidebar from "../../components/superadmin/SuperAdminSidebar";
import SuperAdminTopbar from "../../components/superadmin/SuperAdminTopbar";

function SuperAdminAppointmentDetails() {
    const { id } = useParams();

    const [appointment] = useState({
        id: "AP-009821",
        status: "confirmed",
        date: "21 Aug 2026",
        time: "09:00 AM",
        durationMinutes: 45,
        source: "Web Portal",
        createdDate: "15 Aug 2026, 14:32",
        createdBy: "Hina Malik (Self)",
        internalNotes: null,

        customer: {
            id: "cu-hina",
            name: "Hina Malik",
            email: "hina.m@example.com",
            initials: "HM",
        },

        staff: {
            id: "st-sara",
            name: "Dr. Sara Ahmed",
            role: "General Physician",
            avatarUrl: "",
        },

        company: {
            id: "CMP-9921",
            name: "Shifa Clinic",
        },

        service: {
            name: "Initial Consultation",
            category: "Outpatient",
        },

        financials: {
            totalAmount: "PKR 2,500",
            paymentStatus: "pending",
            method: "Cash on Reception",
            invoiceId: "INV-009821",
        },

        timeline: [
            {
                label: "Appointment Confirmed",
                description: "Auto-confirmed upon scheduling.",
                timestamp: "15 Aug 2026, 14:32",
                recent: true,
            },
            {
                label: "Appointment Created",
                description: "Booked via Web Portal by Hina Malik.",
                timestamp: "15 Aug 2026, 14:30",
                recent: false,
            },
        ],
    });

    // TODO: Replace seeded appointment with a real fetch keyed by the route param.

    function handleDownloadPdf() {
        // TODO: Generate/download a PDF of this appointment.
    }

    function handleViewInvoice() {
        // TODO: Navigate to the invoice/receipt for this appointment.
    }

    function getStatusStyles(status) {
        switch (status) {
            case "confirmed":
                return "bg-gray/10 text-navy";
            case "completed":
                return "bg-green-50 text-green-700";
            case "cancelled":
                return "bg-red-50 text-red-600";
            default:
                return "bg-gray/10 text-slate";
        }
    }

    return (
        <div className="min-h-screen bg-beige flex">

            <SuperAdminSidebar activeItem="Appointments" />

            <div className="flex-1 min-w-0 flex flex-col">

                <SuperAdminTopbar unreadCount={3} />

            <main className="flex-1 px-8 py-6">

    {/* Breadcrumb */}
    <div className="flex items-center flex-wrap gap-1.5 mb-2">

        <Link
            to="/superadmin/appointments"
            className="text-xs font-bold uppercase tracking-wide text-slate hover:text-navy transition"
        >
            Appointments
        </Link>

        <ChevronRight className="w-3 h-3 text-gray flex-shrink-0" />

        <span className="text-xs font-bold uppercase tracking-wide text-navy">
            {appointment.id}
        </span>

    </div>

    {/* Header Row */}
    <div className="flex justify-between items-start flex-wrap gap-4">

        {/* Left */}
        <div>
            <div className="flex items-center gap-3 flex-wrap">
                <h1 className="font-serif text-4xl text-navy">
                    Appointment Details
                </h1>

                <span
                    className={`
                        inline-flex items-center gap-1.5
                        text-xs font-bold px-3 py-1.5 rounded-full
                        uppercase tracking-wide
                        ${getStatusStyles(appointment.status)}
                    `}
                >
                    <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                    {appointment.status}
                </span>
            </div>

            <div className="flex items-center gap-1.5 text-sm text-slate mt-1">
                <Calendar className="w-4 h-4 flex-shrink-0" />

                <span>
                    {appointment.date} · {appointment.time}
                </span>
            </div>
        </div>

        {/* Right */}
        <button
            type="button"
            onClick={handleDownloadPdf}
            className="
                bg-white
                border-2
                border-navy
                text-navy
                uppercase
                tracking-wide
                font-bold
                text-sm
                px-5
                py-2.5
                rounded-lg
                flex
                items-center
                gap-2
                hover:bg-navy
                hover:text-white
                transition
                cursor-pointer
                flex-shrink-0
            "
        >
            <Download className="w-4 h-4" />
            Download PDF
        </button>

    </div>

    {/* Main layout added next */}
    {/* Main Layout */}
<div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 mt-6">

    {/* Left Column */}
    <div className="flex flex-col gap-5">

        {/* Overview */}
        <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-7">

            <h2 className="font-serif text-2xl text-navy">
                Overview
            </h2>

            <div className="border-b border-gray/20 my-5"></div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-6">

                {/* Appointment ID */}
                <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate mb-1">
                        Appointment ID
                    </p>

                    <p className="text-sm font-bold text-navy">
                        {appointment.id}
                    </p>
                </div>

                {/* Duration */}
                <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate mb-1">
                        Duration
                    </p>

                    <p className="text-sm font-bold text-navy">
                        {appointment.durationMinutes} min
                    </p>
                </div>

                {/* Source */}
                <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate mb-1">
                        Source
                    </p>

                    <p className="text-sm font-bold text-navy">
                        {appointment.source}
                    </p>
                </div>

                {/* Created Date */}
                <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate mb-1">
                        Created Date
                    </p>

                    <p className="text-sm font-bold text-navy">
                        {appointment.createdDate}
                    </p>
                </div>

                {/* Created By */}
                <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate mb-1">
                        Created By
                    </p>

                    <p className="text-sm font-bold text-navy">
                        {appointment.createdBy}
                    </p>
                </div>

                {/* Internal Notes */}
                <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate mb-1">
                        Internal Notes
                    </p>

                    {appointment.internalNotes ? (
                        <p className="text-sm text-navy">
                            {appointment.internalNotes}
                        </p>
                    ) : (
                        <p className="text-sm italic text-gray">
                            None provided.
                        </p>
                    )}
                </div>

            </div>

        </div>

        {/* Four sub-cards added next */}
        {/* Sub-cards */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

    {/* Customer */}
    <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-5">

        <div className="flex justify-between items-center gap-3 mb-3.5">
            <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-navy" />

                <span className="text-xs font-bold uppercase tracking-wide text-slate">
                    Customer
                </span>
            </div>

            <Link
                to={`/superadmin/customers/${appointment.customer.id}`}
                className="text-sm font-bold text-gold hover:underline transition"
            >
                View Profile
            </Link>
        </div>

        <div className="flex items-center gap-3">

            <div className="w-11 h-11 bg-gray/10 border border-gray/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="font-serif font-bold text-navy">
                    {appointment.customer.initials}
                </span>
            </div>

            <div className="min-w-0">
                <p className="text-base font-bold text-navy truncate">
                    {appointment.customer.name}
                </p>

                <p className="text-sm text-slate truncate">
                    {appointment.customer.email}
                </p>
            </div>

        </div>

    </div>

    {/* Staff Member */}
    <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-5">

        <div className="flex justify-between items-center gap-3 mb-3.5">
            <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-navy" />

                <span className="text-xs font-bold uppercase tracking-wide text-slate">
                    Staff Member
                </span>
            </div>

            <Link
                to={`/superadmin/staff/${appointment.staff.id}`}
                className="text-sm font-bold text-gold hover:underline transition"
            >
                View Staff
            </Link>
        </div>

        <div className="flex items-center gap-3">

            {appointment.staff.avatarUrl ? (
                <img
                    src={appointment.staff.avatarUrl}
                    alt={appointment.staff.name}
                    className="w-11 h-11 rounded-lg object-cover flex-shrink-0"
                />
            ) : (
                <div className="w-11 h-11 bg-beige rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="font-serif font-bold text-navy">
                        {appointment.staff.name
                            .split(" ")
                            .map((word) => word.charAt(0))
                            .slice(0, 2)
                            .join("")
                            .toUpperCase()}
                    </span>
                </div>
            )}

            <div className="min-w-0">
                <p className="text-base font-bold text-navy truncate">
                    {appointment.staff.name}
                </p>

                <p className="text-sm text-slate truncate">
                    {appointment.staff.role}
                </p>
            </div>

        </div>

    </div>

    {/* Company */}
    <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-5">

        <div className="flex justify-between items-center gap-3 mb-3.5">
            <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-navy" />

                <span className="text-xs font-bold uppercase tracking-wide text-slate">
                    Company
                </span>
            </div>

            <Link
                to={`/superadmin/companies/${appointment.company.id}`}
                className="text-sm font-bold text-gold hover:underline transition"
            >
                View Clinic
            </Link>
        </div>

        <div className="flex items-center gap-3">

            <div className="w-11 h-11 bg-gray/10 border border-gray/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Building2 className="w-5 h-5 text-navy" />
            </div>

            <div className="min-w-0">
                <p className="text-base font-bold text-navy truncate">
                    {appointment.company.name}
                </p>

                <p className="text-sm text-slate truncate">
                    ID: {appointment.company.id}
                </p>
            </div>

        </div>

    </div>

    {/* Service */}
    <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-5">

        <div className="flex items-center gap-2 mb-3.5">
            <ClipboardList className="w-4 h-4 text-navy" />

            <span className="text-xs font-bold uppercase tracking-wide text-slate">
                Service
            </span>
        </div>

        <div>
            <p className="text-base font-bold text-navy">
                {appointment.service.name}
            </p>

            <p className="text-sm text-slate mt-1">
                Category: {appointment.service.category}
            </p>
        </div>

    </div>

</div>

    </div>

    {/* Right column added next */}
    {/* Right Column */}
<aside className="flex flex-col gap-5">

    {/* Financials */}
    <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6">

        <h2 className="font-serif text-2xl text-navy">
            Financials
        </h2>

        <div className="border-b border-gray/20 my-5"></div>

        {/* Total Amount */}
        <p className="text-xs font-bold uppercase tracking-wide text-slate mb-1.5">
            Total Amount
        </p>

        <div className="flex items-center gap-3 mb-5">
            <span className="font-serif text-3xl text-navy">
                {appointment.financials.totalAmount}
            </span>

            <span
                className={`
                    text-xs font-bold px-2.5 py-1 rounded
                    ${
                        appointment.financials.paymentStatus === "paid"
                            ? "bg-green-50 text-green-700"
                            : "bg-amber-50 text-amber-700"
                    }
                `}
            >
                {appointment.financials.paymentStatus === "paid"
                    ? "PAID"
                    : "PENDING"}
            </span>
        </div>

        <div className="border-b border-gray/20 my-3.5"></div>

        {/* Method */}
        <div className="flex justify-between items-center mb-3.5">
            <span className="text-sm text-slate">
                Method
            </span>

            <span className="text-sm font-bold text-navy">
                {appointment.financials.method}
            </span>
        </div>

        {/* Invoice */}
        <div className="flex justify-between items-center">
            <span className="text-sm text-slate">
                Invoice
            </span>

            <button
                type="button"
                onClick={handleViewInvoice}
                className="
                    text-sm font-bold text-gold
                    flex items-center gap-1
                    hover:underline transition cursor-pointer
                "
            >
                {appointment.financials.invoiceId}
                <ExternalLink className="w-3 h-3" />
            </button>
        </div>

    </div>

    {/* Activity Timeline */}
    <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6">

        <h2 className="font-serif text-2xl text-navy">
            Activity Timeline
        </h2>

        <div className="border-b border-gray/20 my-5"></div>

        <div className="flex flex-col">

            {appointment.timeline.map((entry, index) => {
                const isLast = index === appointment.timeline.length - 1;

                return (
                    <div
                        key={entry.label}
                        className="flex gap-3 relative"
                        style={{ paddingBottom: isLast ? 0 : "20px" }}
                    >
                        {/* Connector */}
                        {!isLast && (
                            <span
                                className="absolute left-[4.5px] top-3 bottom-0 border-l border-gray/20"
                                aria-hidden="true"
                            />
                        )}

                        {/* Dot */}
                        <span
                            className={`
                                flex-shrink-0 relative z-10 mt-1.5
                                ${
                                    entry.recent
                                        ? "w-3 h-3 rounded-full bg-gold"
                                        : "w-2.5 h-2.5 rounded-full border-2 border-gray/40 bg-white"
                                }
                            `}
                        />

                        <div className="min-w-0">
                            <p className="text-sm font-bold uppercase tracking-wide text-navy">
                                {entry.label}
                            </p>

                            <p className="text-sm text-slate leading-relaxed mt-1">
                                {entry.description}
                            </p>

                            <p className="text-xs text-slate mt-1">
                                {entry.timestamp}
                            </p>
                        </div>

                    </div>
                );
            })}

        </div>

    </div>

</aside>

</div>

</main>     

            </div>

        </div>
    );
}

export default SuperAdminAppointmentDetails;