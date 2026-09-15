import React, { useState } from "react";

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

                    {/* Dashboard Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">

                        {/* Left Content */}
                        <section>
                            <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-8">
                                <p className="text-sm text-slate">
                                    Customer dashboard content will be added here.
                                </p>
                            </div>
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