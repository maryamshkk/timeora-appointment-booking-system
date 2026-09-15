import React, { useState } from "react";
import {
    ArrowRight,
    Bell,
    Calendar,
    CheckCircle2,
    ChevronRight,
    Clock,
    RotateCcw,
    Search,
    User,
} from "lucide-react";
import { Link } from "react-router-dom";

import CustomerSidebar from "../../components/customer/CustomerSidebar";
import CustomerTopbar from "../../components/customer/CustomerTopbar";

function CustomerDashboard() {

    const [customer] = useState({
        firstName: "Hina",
        avatarUrl: "",
    });

    const [nextAppointment, setNextAppointment] = useState({
        id: 1,
        month: "AUG",
        day: 21,
        weekday: "Fri",
        status: "confirmed",
        companyName: "Shifa Clinic",
        providerName: "Dr. Sara Ahmed",
        timeRange: "10:00 AM - 10:45 AM",
    });

    const [exploreCompanies] = useState([
        {
            id: 1,
            name: "Shifa Clinic",
            category: "Specialized Medical Care",
            distance: "2.4 km",
            rating: 4.9,
            imageUrl: "",
        },
        {
            id: 2,
            name: "City Medical Center",
            category: "General Practice & Diagnostics",
            distance: "5.1 km",
            rating: null,
            imageUrl: "",
        },
        {
            id: 3,
            name: "Wellness Studio",
            category: "Holistic Health & Therapy",
            distance: "1.8 km",
            rating: null,
            imageUrl: "",
        },
    ]);

    const [recentActivity] = useState([
        {
            id: 1,
            service: "Dental Checkup",
            companyName: "Smile Care Clinic",
            date: "14 Aug",
            status: "Completed",
        },
        {
            id: 2,
            service: "Physio Session",
            companyName: "Motion Rehab Center",
            date: "02 Aug",
            status: "Completed",
        },
    ]);

    const [unreadNotificationsCount] = useState(1);

    function handleReschedule() {
        // TODO: connect reschedule appointment API
    }

    function getGreeting() {
        const hour = new Date().getHours();

        if (hour < 12) {
            return "Good morning";
        }

        if (hour < 18) {
            return "Good afternoon";
        }

        return "Good evening";
    }

    return (
        <div className="min-h-screen bg-beige flex">

            {/* Sidebar */}
            <CustomerSidebar activeItem="Dashboard" />

            {/* Main Area */}
            <div className="flex-1 min-w-0 flex flex-col">

                {/* Topbar */}
                <CustomerTopbar
                    avatarUrl={customer.avatarUrl}
                    unreadNotificationsCount={unreadNotificationsCount}
                />

                {/* Dashboard Content */}
                <main className="flex-1 px-4 py-6 sm:px-6 sm:py-8 md:px-8 lg:py-10">

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-navy">
                            {getGreeting()}, {customer.firstName}
                        </h1>

                        <p className="text-sm text-slate mt-2 max-w-xl">
                            Manage your appointments and discover new places to book.
                        </p>
                    </div>

                    {/* Main Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-6 xl:gap-8">

                        {/* Left Content */}
                        <section>

                            {/* Next Appointment Label */}
                            <div className="mb-3">
                                <p className="text-xs font-bold uppercase tracking-wider text-slate">
                                    Your Next Appointment
                                </p>
                            </div>

                            {nextAppointment ? (
                                <div className="relative overflow-hidden bg-white rounded-xl border border-gray/20 shadow-sm p-5 sm:p-7 mb-8">

                                    {/* Decorative Background */}
                                    <div className="absolute -top-24 -right-20 w-64 h-64 rounded-full bg-gold/10 blur-3xl pointer-events-none" />

                                    <div className="relative flex items-start justify-between gap-6 flex-wrap">

                                        {/* Appointment Information */}
                                        <div className="flex items-start gap-4 sm:gap-5 min-w-0">

                                            {/* Date */}
                                            <div className="w-20 rounded-lg border border-gray/20 bg-beige/60 px-4 py-2 text-center flex-shrink-0">
                                                <p className="text-xs font-bold text-gold">
                                                    {nextAppointment.month}
                                                </p>

                                                <p className="font-serif text-3xl text-navy leading-tight">
                                                    {nextAppointment.day}
                                                </p>

                                                <p className="text-xs text-slate">
                                                    {nextAppointment.weekday}
                                                </p>
                                            </div>

                                            {/* Details */}
                                            <div className="min-w-0">

                                                {/* Status */}
                                                <div className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 mb-2">
                                                    <CheckCircle2 className="w-3 h-3 text-green-700" />

                                                    <span className="text-xs font-bold text-green-700">
                                                        Confirmed
                                                    </span>
                                                </div>

                                                {/* Company */}
                                                <h2 className="font-serif text-xl sm:text-2xl text-navy">
                                                    {nextAppointment.companyName}
                                                </h2>

                                                {/* Provider */}
                                                <div className="flex items-center gap-2 mt-2">
                                                    <User className="w-4 h-4 text-slate flex-shrink-0" />

                                                    <span className="text-sm text-slate">
                                                        {nextAppointment.providerName}
                                                    </span>
                                                </div>

                                                {/* Time */}
                                                <div className="flex items-center gap-2 mt-1">
                                                    <Clock className="w-4 h-4 text-slate flex-shrink-0" />

                                                    <span className="text-sm text-slate">
                                                        {nextAppointment.timeRange}
                                                    </span>
                                                </div>

                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-3 ml-auto w-full sm:w-auto">

                                            <Link
                                                to={`/customer/appointments/${nextAppointment.id}`}
                                                className="text-sm font-bold text-navy hover:text-gold transition"
                                            >
                                                View Details
                                            </Link>

                                            <button
                                                type="button"
                                                onClick={handleReschedule}
                                                className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg bg-navy text-white text-sm font-bold hover:bg-gold hover:text-navy transition"
                                            >
                                                Reschedule
                                            </button>

                                        </div>

                                    </div>
                                </div>
                            ) : (
                                <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-8 mb-8 text-center">
                                    <h2 className="font-serif text-xl text-navy mb-2">
                                        No upcoming appointments
                                    </h2>

                                    <p className="text-sm text-slate mb-5">
                                        Find a company and book your next appointment.
                                    </p>

                                    <Link
                                        to="/customer/browse"
                                        className="inline-flex items-center gap-2 text-sm font-bold text-navy hover:text-gold transition"
                                    >
                                        Browse Companies
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            )}

                            {/* Explore Companies */}
                            <div className="mb-8">

                                {/* Section Header */}
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="font-serif text-2xl text-navy">
                                        Explore Companies
                                    </h2>

                                    <Link
                                        to="/customer/browse"
                                        className="flex items-center gap-1.5 text-sm font-bold text-navy hover:text-gold transition"
                                    >
                                        See all
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>

                                {/* Company Cards */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">

                                    {exploreCompanies.map((company) => (
                                        <div
                                            key={company.id}
                                            className="bg-white rounded-xl border border-gray/20 shadow-sm overflow-hidden"
                                        >

                                            {/* Company Image */}
                                            <div className="relative h-40 bg-beige overflow-hidden">

                                                {company.imageUrl ? (
                                                    <img
                                                        src={company.imageUrl}
                                                        alt={company.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <span className="font-serif text-xl text-navy/40">
                                                            {company.name}
                                                        </span>
                                                    </div>
                                                )}

                                                {/* Rating */}
                                                {company.rating && (
                                                    <div className="absolute top-3 right-3 bg-white/95 rounded-full px-2.5 py-1">
                                                        <span className="text-xs font-bold text-navy">
                                                            ★ {company.rating}
                                                        </span>
                                                    </div>
                                                )}

                                            </div>

                                            {/* Company Details */}
                                            <div className="p-5">

                                                <h3 className="font-serif text-xl text-navy">
                                                    {company.name}
                                                </h3>

                                                <p className="text-sm text-slate mt-1">
                                                    {company.category}
                                                </p>

                                                <div className="border-b border-gray/20 my-4" />

                                                {/* Distance + Arrow */}
                                                <div className="flex items-center justify-between">

                                                    <span className="text-xs text-slate">
                                                        {company.distance}
                                                    </span>

                                                    <Link
                                                        to={`/customer/browse/${company.id}`}
                                                        className="w-9 h-9 rounded-full bg-beige flex items-center justify-center text-navy hover:bg-gold transition"
                                                        aria-label={`View ${company.name}`}
                                                    >
                                                        <ArrowRight className="w-4 h-4" />
                                                    </Link>

                                                </div>

                                            </div>
                                        </div>
                                    ))}

                                </div>

                            </div>

                        </section>

                        {/* Right Content */}
                        <aside className="flex flex-col gap-8 lg:sticky lg:top-6 lg:self-start">

                            {/* Quick Actions */}
                            <div>

                                <p className="text-xs font-bold uppercase tracking-wider text-slate mb-3">
                                    Quick Actions
                                </p>

                                <div className="bg-white rounded-xl border border-gray/20 shadow-sm overflow-hidden">

                                    {/* Find a Company */}
                                    <Link
                                        to="/customer/browse"
                                        className="flex items-center justify-between px-5 py-4 border-b border-gray/20 hover:bg-beige/40 transition"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-lg bg-beige flex items-center justify-center">
                                                <Search className="w-4 h-4 text-navy" />
                                            </div>

                                            <span className="text-sm font-bold text-navy">
                                                Find a Company
                                            </span>
                                        </div>

                                        <ChevronRight className="w-4 h-4 text-slate" />
                                    </Link>

                                    {/* My Appointments */}
                                    <Link
                                        to="/customer/appointments"
                                        className="flex items-center justify-between px-5 py-4 border-b border-gray/20 hover:bg-beige/40 transition"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-lg bg-beige flex items-center justify-center">
                                                <Calendar className="w-4 h-4 text-navy" />
                                            </div>

                                            <span className="text-sm font-bold text-navy">
                                                My Appointments
                                            </span>
                                        </div>

                                        <ChevronRight className="w-4 h-4 text-slate" />
                                    </Link>

                                    {/* Notifications */}
                                    <Link
                                        to="/customer/notifications"
                                        className="flex items-center justify-between px-5 py-4 hover:bg-beige/40 transition"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="relative w-9 h-9 rounded-lg bg-beige flex items-center justify-center">
                                                <Bell className="w-4 h-4 text-navy" />

                                                {unreadNotificationsCount > 0 && (
                                                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-gold" />
                                                )}
                                            </div>

                                            <span className="text-sm font-bold text-navy">
                                                Notifications
                                            </span>
                                        </div>

                                        <ChevronRight className="w-4 h-4 text-slate" />
                                    </Link>

                                </div>
                            </div>

                            {/* Recent Activity */}
                            <div>

                                <div className="flex items-center justify-between mb-3">
                                    <p className="text-xs font-bold uppercase tracking-wider text-slate">
                                        Recent Activity
                                    </p>

                                    <Link
                                        to="/customer/appointments?filter=past"
                                        className="text-xs font-bold text-navy hover:text-gold transition"
                                    >
                                        View All
                                    </Link>
                                </div>

                                <div className="bg-white rounded-xl border border-gray/20 shadow-sm overflow-hidden">

                                    {recentActivity.map((activity, index) => (
                                        <div
                                            key={activity.id}
                                            className={`
                                                px-5 py-4
                                                ${index !== recentActivity.length - 1
                                                    ? "border-b border-gray/20"
                                                    : ""}
                                            `}
                                        >
                                            <div className="flex items-start gap-3">

                                                {/* History Icon */}
                                                <div className="w-8 h-8 rounded-lg bg-beige flex items-center justify-center flex-shrink-0">
                                                    <RotateCcw className="w-3.5 h-3.5 text-slate" />
                                                </div>

                                                {/* Activity Info */}
                                                <div className="min-w-0 flex-1">

                                                    <p className="text-sm font-bold text-navy truncate">
                                                        {activity.service}
                                                    </p>

                                                    <p className="text-xs text-slate mt-0.5 truncate">
                                                        {activity.companyName}
                                                    </p>

                                                    <div className="flex items-center justify-between gap-2 mt-2">

                                                        <span className="text-xs text-slate">
                                                            {activity.date}
                                                        </span>

                                                        <span className="rounded-full bg-gray/10 px-2 py-1 text-[10px] font-bold text-slate">
                                                            {activity.status}
                                                        </span>

                                                    </div>

                                                </div>

                                            </div>
                                        </div>
                                    ))}

                                </div>
                            </div>

                        </aside>

                    </div>

                </main>
            </div>
        </div>
    );
}

export default CustomerDashboard;