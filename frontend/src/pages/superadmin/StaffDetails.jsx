import React, { useState } from "react";
import {
    Building2,
    Calendar,
    ChevronDown,
    ChevronRight,
    Clock,
    FileText,
    HeartPulse,
    Stethoscope,
    UserRound,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
} from "recharts";

import SuperAdminSidebar from "../../components/superadmin/SuperAdminSidebar";
import SuperAdminTopbar from "../../components/superadmin/SuperAdminTopbar";

function SuperAdminStaffDetails() {
    const { id } = useParams();

    const [staff] = useState({
        id: "ST-003840",
        name: "Dr. Sara Ahmed",
        avatarUrl: "",
        role: "Doctor",
        company: { id: "cmp-shifa", name: "Shifa Clinic" },
        email: "s.ahmed@shifaclinic.com",
        phone: "+971 50 123 4567",
        joinedDate: "21 Aug 2026",
        systemStatus: "Active",

        stats: {
            totalAppts: 128,
            completed: 112,
            upcoming: 10,
            cancelled: 6,
        },

        appointmentActivity: {
            completed: [2, 3, 5, 7, 6, 4, 5, 7, 8, 9],
            cancelled: [1, 1, 2, 1, 1, 2, 1, 2, 1, 2],
        },

        assignedServices: [
            { name: "General Consultation", durationMinutes: 30 },
            { name: "Follow-up Consultation", durationMinutes: 20 },
            { name: "Health Assessment", durationMinutes: 45 },
        ],

        availability: {
            monday: "09:00 AM - 05:00 PM",
            tuesday: "09:00 AM - 05:00 PM",
            wednesday: null,
            thursday: "09:00 AM - 05:00 PM",
            friday: "09:00 AM - 02:00 PM",
            saturday: null,
            sunday: null,
        },

        recentAppointments: [
            {
                date: "12 Oct 2026",
                time: "10:00 AM",
                customer: "Hina Malik",
                service: "General Consultation",
                status: "completed",
            },
            {
                date: "11 Oct 2026",
                time: "02:30 PM",
                customer: "Omar Saeed",
                service: "Health Assessment",
                status: "completed",
            },
            {
                date: "09 Oct 2026",
                time: "11:15 AM",
                customer: "Laila N.",
                service: "Follow-up",
                status: "cancelled",
            },
        ],

        recentActivity: [
            {
                label: "Appointment completed",
                timestamp: "Today, 10:30 AM",
            },
            {
                label: "Availability updated",
                timestamp: "08 Oct 2026",
            },
            {
                label: "Service added",
                timestamp: "15 Sep 2026",
            },
        ],
    });

    // TODO: Replace seeded staff with a real fetch keyed by the route param.

    const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

    function handleChangeStatus() {
        // TODO: Open a status-change flow, likely with confirmation.
    }

    return (
        <div className="min-h-screen bg-beige flex">

            <SuperAdminSidebar activeItem="Staff" />

            <div className="flex-1 min-w-0 flex flex-col">

                <SuperAdminTopbar unreadCount={3} />

                <main className="flex-1 px-8 py-6">

    {/* Breadcrumb */}
    <div className="flex items-center flex-wrap gap-1.5 mb-4">

        <Link
            to="/superadmin/staff"
            className="text-xs font-bold uppercase tracking-wide text-slate hover:text-navy transition"
        >
            Staff
        </Link>

        <ChevronRight className="w-3 h-3 text-gray flex-shrink-0" />

        <span className="text-xs font-bold uppercase tracking-wide text-navy">
            {staff.name}
        </span>

    </div>

    {/* Header Row */}
    <div className="flex justify-between items-start flex-wrap gap-4 mb-6">

        {/* Left */}
        <div className="flex items-center gap-4">

            {staff.avatarUrl ? (
                <img
                    src={staff.avatarUrl}
                    alt={staff.name}
                    className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                />
            ) : (
                <div className="w-20 h-20 rounded-lg bg-white border border-gray/20 flex items-center justify-center flex-shrink-0">
                    <span className="font-serif text-2xl text-navy">
                        {staff.name
                            .split(" ")
                            .map((word) => word.charAt(0))
                            .slice(0, 2)
                            .join("")
                            .toUpperCase()}
                    </span>
                </div>
            )}

            <div className="min-w-0">
                <h1 className="font-serif text-3xl text-navy">
                    {staff.name}
                </h1>

                <p className="text-sm text-slate mt-1">
                    {staff.role} · {staff.id}
                </p>

                <div className="flex items-center gap-1.5 text-sm font-bold mt-1">
                    <Building2 className="w-3.5 h-3.5 flex-shrink-0 text-slate" />

                    <Link
                        to={`/superadmin/companies/${staff.company.id}`}
                        className="text-brown underline hover:text-navy transition"
                    >
                        {staff.company.name}
                    </Link>
                </div>
            </div>

        </div>

        {/* Right */}
        <div className="flex items-center gap-3 flex-wrap">

            <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                {staff.systemStatus}
            </span>

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
                        px-4
                        py-2.5
                        rounded-lg
                        flex
                        items-center
                        gap-1.5
                        hover:border-navy
                        transition
                        cursor-pointer
                    "
                >
                    More
                    <ChevronDown className="w-3.5 h-3.5" />
                </button>

                {isMoreMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 z-20 w-48 bg-white border border-gray/20 rounded-lg shadow-lg p-1">

                        <button
                            type="button"
                            className="w-full text-left px-3 py-2 rounded-md text-sm text-navy hover:bg-beige cursor-pointer"
                        >
                            Edit Staff
                        </button>

                        <button
                            type="button"
                            className="w-full text-left px-3 py-2 rounded-md text-sm text-navy hover:bg-beige cursor-pointer"
                        >
                            View Appointments
                        </button>

                        <button
                            type="button"
                            className="w-full text-left px-3 py-2 rounded-md text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                        >
                            Remove Staff
                        </button>

                    </div>
                )}
            </div>

        </div>

    </div>

    {/* Main layout added next */}
    {/* Main Layout */}
<div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">

    {/* Left Column */}
    <div className="flex flex-col gap-6">

        {/* Staff Overview */}
        <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-7">

            <h2 className="font-serif text-2xl text-navy">
                Staff Overview
            </h2>

            <div className="border-b border-gray/20 my-5"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">

                {/* Full Name */}
                <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate mb-1">
                        Full Name
                    </p>
                    <p className="text-sm font-bold text-navy">
                        {staff.name}
                    </p>
                </div>

                {/* Staff ID */}
                <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate mb-1">
                        Staff ID
                    </p>
                    <p className="text-sm font-bold text-navy">
                        {staff.id}
                    </p>
                </div>

                {/* Company */}
                <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate mb-1">
                        Company
                    </p>
                    <Link
                        to={`/superadmin/companies/${staff.company.id}`}
                        className="text-sm font-bold text-gold underline hover:text-navy transition"
                    >
                        {staff.company.name}
                    </Link>
                </div>

                {/* Role */}
                <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate mb-1">
                        Role
                    </p>
                    <p className="text-sm font-bold text-navy">
                        {staff.role}
                    </p>
                </div>

                {/* Email */}
                <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate mb-1">
                        Email Address
                    </p>
                    <p className="text-sm font-bold text-navy break-all">
                        {staff.email}
                    </p>
                </div>

                {/* Phone */}
                <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate mb-1">
                        Phone Number
                    </p>
                    <p className="text-sm font-bold text-navy">
                        {staff.phone}
                    </p>
                </div>

                {/* Joined Date */}
                <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate mb-1">
                        Joined Date
                    </p>
                    <p className="text-sm font-bold text-navy">
                        {staff.joinedDate}
                    </p>
                </div>

                {/* System Status */}
                <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate mb-1">
                        System Status
                    </p>
                    <p className="text-sm font-bold text-navy">
                        {staff.systemStatus}
                    </p>
                </div>

            </div>

        </div>

        {/* Appointment Activity + Recent Appointments added next */}
        {/* Appointment Activity */}
<div className="bg-white rounded-xl border border-gray/20 shadow-sm p-7">

    <div className="flex justify-between items-center gap-4 flex-wrap mb-5">

        <h2 className="font-serif text-2xl text-navy">
            Appointment Activity
        </h2>

        {/* Legend */}
        <div className="flex gap-4 text-sm text-slate">

            <div className="flex items-center gap-1.5">
                <span className="w-4 h-0.5 bg-navy rounded-full" />
                <span>Completed</span>
            </div>

            <div className="flex items-center gap-1.5">
                <span className="w-4 border-t-2 border-dashed border-gold" />
                <span>Cancelled</span>
            </div>

        </div>

    </div>

    <div style={{ width: "100%", height: 280 }}>

        <ResponsiveContainer width="100%" height="100%">
            <LineChart
                data={staff.appointmentActivity.completed.map(
                    (value, index) => ({
                        index,
                        completed: value,
                        cancelled:
                            staff.appointmentActivity.cancelled[index],
                    })
                )}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
                <CartesianGrid
                    strokeDasharray="4 4"
                    vertical={false}
                    stroke="#C3C6CF"
                />

                <Line
                    type="monotone"
                    dataKey="completed"
                    stroke="#000C1E"
                    strokeWidth={2}
                    dot={false}
                />

                <Line
                    type="monotone"
                    dataKey="cancelled"
                    stroke="#FED488"
                    strokeWidth={2}
                    strokeDasharray="4 4"
                    dot={false}
                />
            </LineChart>
        </ResponsiveContainer>

    </div>

</div>
{/* Recent Appointments */}
<div className="bg-white rounded-xl border border-gray/20 shadow-sm overflow-hidden">

    {/* Header */}
    <div className="flex justify-between items-center gap-4 p-6">
        <h2 className="font-serif text-2xl text-navy">
            Recent Appointments
        </h2>

        <Link
            to={`/superadmin/staff/${id}/appointments`}
            className="text-sm font-bold text-gold hover:underline transition"
        >
            View All
        </Link>
    </div>

    {/* Table */}
    <div className="overflow-x-auto">

        {/* Header */}
        <div className="grid grid-cols-[110px_1fr_1fr_100px] px-6 py-3 bg-beige/40 text-xs font-bold uppercase tracking-wide text-slate min-w-[600px]">
            <span>Date &amp; Time</span>
            <span>Customer</span>
            <span>Service</span>
            <span>Status</span>
        </div>

        {/* Rows */}
        {staff.recentAppointments.map((appt, index) => (
            <div
                key={index}
                className="
                    grid
                    grid-cols-[110px_1fr_1fr_100px]
                    px-6
                    py-4
                    border-b
                    border-gray/20
                    last:border-b-0
                    min-w-[600px]
                "
            >
                <div className="self-center">
                    <p className="text-sm font-bold text-navy">
                        {appt.date}
                    </p>

                    <p className="text-xs text-slate">
                        {appt.time}
                    </p>
                </div>

                <span className="text-sm text-navy self-center">
                    {appt.customer}
                </span>

                <span className="text-sm text-slate self-center">
                    {appt.service}
                </span>

                <span className="self-center">
                    <span
                        className={`
                            text-xs
                            font-bold
                            px-2.5
                            py-1
                            rounded-full
                            ${
                                appt.status === "completed"
                                    ? "bg-green-50 text-green-700"
                                    : "bg-gray/10 text-slate"
                            }
                        `}
                    >
                        {appt.status === "completed"
                            ? "Completed"
                            : "Cancelled"}
                    </span>
                </span>

            </div>
        ))}

    </div>

</div>

    </div>

    {/* Right column added next */}

</div>

</main>

            </div>

        </div>
    );
}

export default SuperAdminStaffDetails;