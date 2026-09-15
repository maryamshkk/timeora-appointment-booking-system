import React, { useMemo, useState } from "react";
import { Plus } from "lucide-react";

import CustomerSidebar from "../../components/customer/CustomerSidebar";
import CustomerTopbar from "../../components/customer/CustomerTopbar";

function MyAppointments() {
    const [activeTab, setActiveTab] = useState("upcoming");

    const [searchQuery, setSearchQuery] = useState("");

    const [dateFilter, setDateFilter] = useState("any");
    const [isDateFilterOpen, setIsDateFilterOpen] = useState(false);

    const [statusFilter, setStatusFilter] = useState("all");
    const [isStatusFilterOpen, setIsStatusFilterOpen] = useState(false);

    const [appointments] = useState([
        {
            id: 1,
            date: "Fri · 21 Aug",
            time: "04:00 PM",
            status: "Confirmed",
            service: "Consultation",
            companyName: "Shifa Clinic",
            staffName: "Dr. Sara Ahmed",
            durationMinutes: 30,
            price: 2500,
            tab: "upcoming",
        },
        {
            id: 2,
            date: "Mon · 24 Aug",
            time: "10:00 AM",
            status: "Confirmed",
            service: "Follow-up",
            companyName: "Shifa Clinic",
            staffName: "Dr. Ali Khan",
            durationMinutes: 30,
            price: 1500,
            tab: "upcoming",
        },
    ]);

    const filteredAppointments = useMemo(() => {
        return appointments.filter((appointment) => {
            const matchesTab = appointment.tab === activeTab;

            const searchValue = searchQuery.toLowerCase().trim();

            const matchesSearch =
                !searchValue ||
                appointment.service.toLowerCase().includes(searchValue) ||
                appointment.companyName.toLowerCase().includes(searchValue) ||
                appointment.staffName.toLowerCase().includes(searchValue);

            const matchesStatus =
                statusFilter === "all" ||
                appointment.status.toLowerCase() === statusFilter;

            // TODO: Connect dateFilter to real appointment date filtering.
            const matchesDate = dateFilter === "any";

            return matchesTab && matchesSearch && matchesStatus && matchesDate;
        });
    }, [
        appointments,
        activeTab,
        searchQuery,
        dateFilter,
        statusFilter,
    ]);

    function handleBookAppointment() {
        // TODO: Navigate into Browse Companies / booking flow.
    }

    function handleViewDetails(id) {
        // TODO: Navigate to the appointment details page.
    }

    function handleReschedule(id) {
        // TODO: Open the reschedule flow for this appointment.
    }

    function handleCancel(id) {
        // TODO: Confirm cancellation, call the API,
        // then move the appointment to the Cancelled tab.
    }

    return (
        <div className="min-h-screen bg-beige flex">

            {/* Sidebar */}
            <CustomerSidebar activeItem="My Appointments" />

            {/* Main Area */}
            <div className="flex-1 min-w-0">

                <CustomerTopbar />

                <main className="px-8 py-6">

                    {/* Header */}
                    <div className="flex items-start justify-between gap-6 mb-5">

                        <div>
                            <h1 className="font-serif text-4xl text-navy">
                                My Appointments
                            </h1>

                            <p className="text-sm text-slate mt-1.5">
                                View and manage your upcoming and past
                                appointments.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={handleBookAppointment}
                            className="bg-navy text-white uppercase tracking-wide font-bold text-sm px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-gold hover:text-navy transition flex-shrink-0"
                        >
                            <Plus className="w-4 h-4" />
                            Book an Appointment
                        </button>

                    </div>

                    {/* Tabs + Filters */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">

                        {/* Tabs */}
                        <div className="flex items-center gap-6">

                            <button
                                type="button"
                                onClick={() => setActiveTab("upcoming")}
                                className={
                                    activeTab === "upcoming"
                                        ? "text-navy font-bold border-b-2 border-navy pb-2"
                                        : "text-slate hover:text-navy pb-2 transition"
                                }
                            >
                                Upcoming
                            </button>

                            <button
                                type="button"
                                onClick={() => setActiveTab("past")}
                                className={
                                    activeTab === "past"
                                        ? "text-navy font-bold border-b-2 border-navy pb-2"
                                        : "text-slate hover:text-navy pb-2 transition"
                                }
                            >
                                Past
                            </button>

                            <button
                                type="button"
                                onClick={() => setActiveTab("cancelled")}
                                className={
                                    activeTab === "cancelled"
                                        ? "text-navy font-bold border-b-2 border-navy pb-2"
                                        : "text-slate hover:text-navy pb-2 transition"
                                }
                            >
                                Cancelled
                            </button>

                        </div>

                        {/* Filters will be added next */}

                    </div>

                    <div className="border-b border-gray/20 mt-4 mb-6"></div>

                    {/* Appointment List will be added next */}
                    <div>
                        {filteredAppointments.length === 0 && (
                            <div className="text-center mt-[60px]">
                                <p className="text-sm text-slate">
                                    No {activeTab} appointments.
                                </p>
                            </div>
                        )}
                    </div>

                </main>
            </div>
        </div>
    );
}

export default MyAppointments;
