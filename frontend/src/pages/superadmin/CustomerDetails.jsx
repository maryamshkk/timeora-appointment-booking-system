import React, { useState } from "react";
import {
    AlertTriangle,
    Calendar,
    CheckCircle2,
    ChevronRight,
    Clock,
    IdCard,
    Mail,
    MoreVertical,
    Phone,
    XCircle,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import SuperAdminSidebar from "../../components/superadmin/SuperAdminSidebar";
import SuperAdminTopbar from "../../components/superadmin/SuperAdminTopbar";

function SuperAdminCustomerDetails() {
    const { id } = useParams();

    const [customer] = useState({
        id: "CU-028430",
        name: "Hina Malik",
        avatarUrl: "",
        email: "hina@example.com",
        phone: "+92 300 1234567",
        status: "active",
        registeredDate: "21 Aug 2026",
        lastActivity: "20 Aug 2026",

        stats: {
            total: 8,
            completed: 5,
            cancelled: 1,
            upcoming: 2,
        },

        attentionIssues: [],

        companyActivity: [
            { name: "Shifa Clinic", appointmentCount: 8 },
            { name: "Elite Wellness", appointmentCount: 3 },
            { name: "Urban Fitness", appointmentCount: 2 },
        ],

        activityTrend: [
            { month: "Sep", value: 1 },
            { month: "Oct", value: 0.3 },
            { month: "Nov", value: 2 },
            { month: "Dec", value: 1 },
            { month: "Jan", value: 2.7 },
            { month: "Feb", value: 1.5 },
            { month: "Mar", value: 1 },
            { month: "Apr", value: 4 },
            { month: "May", value: 1.8 },
            { month: "Jun", value: 2.8 },
            { month: "Jul", value: 1.2 },
            { month: "Aug", value: 5 },
        ],

        appointmentHistory: [
            {
                date: "21 Aug 2026",
                time: "09:00 AM",
                company: "Shifa Clinic",
                service: "Consultation",
                staffName: "Dr. Sara Ahmed",
            },
            {
                date: "18 Aug 2026",
                time: "11:00 AM",
                company: "Elite Wellness",
                service: "Therapy",
                staffName: "Malik Rehman",
            },
        ],
    });

    // TODO: Replace seeded customer with a real fetch keyed by the route param.

    const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

    function handleChangeStatus() {
        // TODO: Open a status-change flow, likely with confirmation
        // since it affects a real customer's account.
    }

    return (
        <div className="min-h-screen bg-beige flex">

            <SuperAdminSidebar activeItem="Customers" />

            <div className="flex-1 min-w-0 flex flex-col">

                <SuperAdminTopbar unreadCount={3} />

                <main className="flex-1 px-8 py-6">

    {/* Breadcrumb */}
    <div className="flex items-center flex-wrap gap-1.5 mb-4">

        <Link
            to="/superadmin/customers"
            className="text-xs font-bold uppercase tracking-wide text-slate hover:text-navy transition"
        >
            Customers
        </Link>

        <ChevronRight className="w-3 h-3 text-gray flex-shrink-0" />

        <span className="text-xs font-bold uppercase tracking-wide text-navy">
            {customer.name}
        </span>

    </div>

    {/* Profile Header */}
    <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6 flex justify-between items-center flex-wrap gap-4 mb-6">

        {/* Left */}
        <div className="flex items-center gap-4">

            {customer.avatarUrl ? (
                <img
                    src={customer.avatarUrl}
                    alt={customer.name}
                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                />
            ) : (
                <div className="w-16 h-16 rounded-lg bg-beige flex items-center justify-center flex-shrink-0">
                    <span className="font-serif text-xl text-navy">
                        {customer.name
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
                    {customer.name}
                </h1>

                <div className="flex items-center gap-3 text-sm text-slate mt-1.5 flex-wrap">

                    <div className="flex items-center gap-1.5">
                        <IdCard className="w-4 h-4 flex-shrink-0" />

                        <span>{customer.id}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                        <Mail className="w-4 h-4 flex-shrink-0" />

                        <span>{customer.email}</span>
                    </div>

                    {/* Bare dot + text — NOT a pill (deliberately different
                        from the status pill used on the Customers list) */}
                    <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-green-500" />

                        <span className="text-xs font-bold uppercase tracking-wide text-green-700">
                            {customer.status}
                        </span>
                    </div>

                </div>
            </div>

        </div>

        {/* Right */}
        <div className="flex items-center gap-3 flex-shrink-0">

            <button
                type="button"
                onClick={handleChangeStatus}
                className="
                    bg-white
                    border-2
                    border-navy
                    text-navy
                    font-bold
                    text-sm
                    px-5
                    py-2.5
                    rounded-lg
                    hover:bg-navy
                    hover:text-white
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
                    aria-label="More actions"
                    className="
                        border
                        border-gray
                        rounded-lg
                        p-2.5
                        text-slate
                        hover:text-navy
                        transition
                        cursor-pointer
                    "
                >
                    <MoreVertical className="w-[18px] h-[18px]" />
                </button>

                {isMoreMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 z-20 w-48 bg-white border border-gray/20 rounded-lg shadow-lg p-1">

                        <button
                            type="button"
                            className="w-full text-left px-3 py-2 rounded-md text-sm text-navy hover:bg-beige cursor-pointer"
                        >
                            View as Customer
                        </button>

                        <button
                            type="button"
                            className="w-full text-left px-3 py-2 rounded-md text-sm text-navy hover:bg-beige cursor-pointer"
                        >
                            Flag Account
                        </button>

                        <button
                            type="button"
                            className="w-full text-left px-3 py-2 rounded-md text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                        >
                            Delete Account
                        </button>

                    </div>
                )}
            </div>

        </div>

    </div>

    {/* Main grid added next */}
                {/* Main Layout */}
<div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">

    {/* Left Column */}
    <div className="flex flex-col gap-6">

        {/* Customer Overview */}
        <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6">

            <h2 className="font-serif text-2xl text-navy">
                Customer Overview
            </h2>

            <div className="border-b border-gray/20 my-4"></div>

            {/* Full Name / Customer ID */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-4">

                <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate">
                        Full Name
                    </p>

                    <p className="text-sm font-bold text-navy mt-1">
                        {customer.name}
                    </p>
                </div>

                <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate">
                        Customer ID
                    </p>

                    <p className="text-sm font-bold text-navy mt-1">
                        {customer.id}
                    </p>
                </div>

            </div>

            {/* Email */}
            <div className="mb-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate">
                    Email Address
                </p>

                <p className="text-sm font-bold text-navy mt-1 break-all">
                    {customer.email}
                </p>
            </div>

            {/* Phone */}
            <div className="mb-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate">
                    Phone Number
                </p>

                <p className="text-sm font-bold text-navy mt-1">
                    {customer.phone}
                </p>
            </div>

            {/* Registered / Last Activity */}
            <div className="grid grid-cols-2 gap-x-6">

                <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate">
                        Registered
                    </p>

                    <p className="text-sm font-bold text-navy mt-1">
                        {customer.registeredDate}
                    </p>
                </div>

                <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate">
                        Last Activity
                    </p>

                    <p className="text-sm font-bold text-navy mt-1">
                        {customer.lastActivity}
                    </p>
                </div>

            </div>

        </div>

        {/* Attention */}
        <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-5 flex items-center gap-4">

            <div className="w-11 h-11 bg-beige/60 rounded-full flex items-center justify-center flex-shrink-0">
                {customer.attentionIssues.length === 0 ? (
                    <CheckCircle2 className="w-5 h-5 text-navy" />
                ) : (
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                )}
            </div>

            <div className="min-w-0">
                <p className="font-serif text-xl text-navy">
                    Attention
                </p>

                {customer.attentionIssues.length === 0 ? (
                    <p className="text-sm text-slate mt-0.5">
                        No current issues.
                    </p>
                ) : (
                    <p className="text-sm text-slate mt-0.5">
                        {customer.attentionIssues.join(", ")}
                    </p>
                )}
            </div>

        </div>

        {/* Company Activity */}
        <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-5">

            <h2 className="font-serif text-xl text-navy mb-3.5">
                Company Activity
            </h2>

            <div>
                {customer.companyActivity.map((activity, index) => (
                    <div
                        key={activity.name}
                        className={`
                            flex justify-between items-center py-2.5
                            ${
                                index !== customer.companyActivity.length - 1
                                    ? "border-b border-gray/20"
                                    : ""
                            }
                        `}
                    >
                        <span className="text-sm font-bold text-navy">
                            {activity.name}
                        </span>

                        <span className="bg-gray/10 text-navy text-xs font-bold px-2.5 py-1 rounded-md whitespace-nowrap">
                            {activity.appointmentCount} Appts
                        </span>
                    </div>
                ))}
            </div>

        </div>

    </div>

    {/* Right Column — added next */}
                {/* Right Column */}
<div className="min-w-0">

    {/* Stat Row */}
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

        {/* Total */}
        <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-5">

            <div className="flex justify-between items-center mb-2.5">
                <span className="text-xs font-bold uppercase tracking-wide text-slate">
                    Total
                </span>

                <Calendar className="w-[18px] h-[18px] text-navy" />
            </div>

            <p className="text-4xl font-bold text-navy">
                {customer.stats.total}
            </p>

        </div>

        {/* Completed */}
        <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-5">

            <div className="flex justify-between items-center mb-2.5">
                <span className="text-xs font-bold uppercase tracking-wide text-slate">
                    Completed
                </span>

                <CheckCircle2 className="w-[18px] h-[18px] text-green-600" />
            </div>

            <p className="text-4xl font-bold text-navy">
                {customer.stats.completed}
            </p>

        </div>

        {/* Cancelled */}
        <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-5">

            <div className="flex justify-between items-center mb-2.5">
                <span className="text-xs font-bold uppercase tracking-wide text-slate">
                    Cancelled
                </span>

                <XCircle className="w-[18px] h-[18px] text-red-600" />
            </div>

            <p className="text-4xl font-bold text-navy">
                {customer.stats.cancelled}
            </p>

        </div>

        {/* Upcoming */}
        <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-5">

            <div className="flex justify-between items-center mb-2.5">
                <span className="text-xs font-bold uppercase tracking-wide text-slate">
                    Upcoming
                </span>

                <Clock className="w-[18px] h-[18px] text-gold" />
            </div>

            <p className="text-4xl font-bold text-navy">
                {customer.stats.upcoming}
            </p>

        </div>

    </div>

    {/* Activity Trend + Appointment History — added next */}
                {/* Activity Trend */}
<div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6 mb-6">

    <h2 className="font-serif text-2xl text-navy mb-5">
        Activity Trend
    </h2>

    <div style={{ width: "100%", height: 280 }}>

        <ResponsiveContainer width="100%" height="100%">
            <AreaChart
                data={customer.activityTrend}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
                <defs>
                    <linearGradient
                        id="activityFill"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                    >
                        <stop
                            offset="0%"
                            stopColor="#000C1E"
                            stopOpacity={0.15}
                        />
                        <stop
                            offset="100%"
                            stopColor="#000C1E"
                            stopOpacity={0}
                        />
                    </linearGradient>
                </defs>

                <CartesianGrid
                    strokeDasharray="4 4"
                    vertical={false}
                    stroke="#C3C6CF"
                />

                <XAxis
                    dataKey="month"
                    tick={{ fill: "#43474E", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                />

                <YAxis
                    domain={[0, 5]}
                    ticks={[0, 1, 2, 3, 4, 5]}
                    tick={{ fill: "#43474E", fontSize: 12 }}
                    axisLine={false}
                    tickLine={false}
                />

                <Tooltip
                    cursor={{ stroke: "#C3C6CF", strokeDasharray: "4 4" }}
                />

                <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#000C1E"
                    strokeWidth={2}
                    fill="url(#activityFill)"
                    dot={{
                        r: 4,
                        fill: "#FED488",
                        stroke: "#000C1E",
                        strokeWidth: 1.5,
                    }}
                    activeDot={{
                        r: 5,
                        fill: "#FED488",
                        stroke: "#000C1E",
                        strokeWidth: 2,
                    }}
                />
            </AreaChart>
        </ResponsiveContainer>

    </div>

    

</div>

{/* Appointment History */}
<div className="bg-white rounded-xl border border-gray/20 shadow-sm overflow-hidden">

    {/* Header */}
    <div className="flex justify-between items-center gap-4 p-6">
        <h2 className="font-serif text-2xl text-navy">
            Appointment History
        </h2>

        <Link
            to={`/superadmin/customers/${id}/appointments`}
            className="text-sm font-bold text-navy hover:text-gold transition"
        >
            View All
        </Link>
    </div>

    {/* Table */}
    <div className="overflow-x-auto">

        {/* Header */}
        <div className="grid grid-cols-[110px_90px_1fr_1fr_140px] px-6 py-3 border-b border-gray/20 text-xs font-bold uppercase tracking-wide text-slate min-w-[700px]">
            <span>Date</span>
            <span>Time</span>
            <span>Company</span>
            <span>Service</span>
            <span>Staff</span>
        </div>

        {/* Rows */}
        {customer.appointmentHistory.map((entry, index) => (
            <div
                key={index}
                className="
                    grid
                    grid-cols-[110px_90px_1fr_1fr_140px]
                    px-6
                    py-4
                    border-b
                    border-gray/20
                    last:border-b-0
                    min-w-[700px]
                "
            >
                <span className="text-sm text-navy self-center">
                    {entry.date}
                </span>

                <span className="text-sm text-slate self-center">
                    {entry.time}
                </span>

                <span className="text-sm font-bold text-navy self-center">
                    {entry.company}
                </span>

                <span className="text-sm text-slate self-center">
                    {entry.service}
                </span>

                <span className="text-sm text-slate self-center">
                    {entry.staffName}
                </span>

            </div>
        ))}

    </div>

</div>
</div>
</div>
</main>

            </div>

        </div>
    );
}

export default SuperAdminCustomerDetails;