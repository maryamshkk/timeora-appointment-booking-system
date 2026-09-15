import React, { useState } from "react";
import { ArrowRight, CheckCircle2, Clock, User } from "lucide-react";
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
                <main className="flex-1 px-6 py-8 md:px-8">

                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="font-serif text-4xl md:text-5xl text-navy">
                            {getGreeting()}, {customer.firstName}
                        </h1>

                        <p className="text-sm text-slate mt-2">
                            Manage your appointments and discover new places to book.
                        </p>
                    </div>

                    {/* Main Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">

                        {/* Left Content */}
                        <section>

                            {/* Next Appointment Label */}
                            <div className="mb-3">
                                <p className="text-xs font-bold uppercase tracking-wider text-slate">
                                    Your Next Appointment
                                </p>
                            </div>

                            {nextAppointment ? (
                                <div className="relative overflow-hidden bg-white rounded-xl border border-gray/20 shadow-sm p-7 mb-8">

                                    {/* Decorative Background */}
                                    <div className="absolute -top-24 -right-20 w-64 h-64 rounded-full bg-gold/10 blur-3xl pointer-events-none" />

                                    <div className="relative flex items-center justify-between gap-6 flex-wrap">

                                        {/* Appointment Information */}
                                        <div className="flex items-center gap-5">

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
                                            <div>

                                                {/* Status */}
                                                <div className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 mb-2">
                                                    <CheckCircle2 className="w-3 h-3 text-green-700" />

                                                    <span className="text-xs font-bold text-green-700">
                                                        Confirmed
                                                    </span>
                                                </div>

                                                {/* Company */}
                                                <h2 className="font-serif text-2xl text-navy">
                                                    {nextAppointment.companyName}
                                                </h2>

                                                {/* Provider */}
                                                <div className="flex items-center gap-2 mt-2">
                                                    <User className="w-4 h-4 text-slate" />

                                                    <span className="text-sm text-slate">
                                                        {nextAppointment.providerName}
                                                    </span>
                                                </div>

                                                {/* Time */}
                                                <div className="flex items-center gap-2 mt-1">
                                                    <Clock className="w-4 h-4 text-slate" />

                                                    <span className="text-sm text-slate">
                                                        {nextAppointment.timeRange}
                                                    </span>
                                                </div>

                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-4 ml-auto">

                                            <Link
                                                to={`/customer/appointments/${nextAppointment.id}`}
                                                className="text-sm font-bold text-navy hover:text-gold transition"
                                            >
                                                View Details
                                            </Link>

                                            <button
                                                type="button"
                                                onClick={handleReschedule}
                                                className="px-4 py-2.5 rounded-lg bg-navy text-white text-sm font-bold hover:bg-gold hover:text-navy transition"
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

                        </section>

                        {/* Right Content */}
                        <aside>
                            <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6">
                                <p className="text-sm text-slate">
                                    Quick actions will be added here.
                                </p>
                            </div>
                        </aside>

                    </div>

                </main>
            </div>
        </div>
    );
}

export default CustomerDashboard;