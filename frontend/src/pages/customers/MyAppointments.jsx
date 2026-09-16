import React, { useMemo, useState } from "react";
import {
    Plus,
    Search,
    ChevronDown,
    CalendarDays,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import CustomerSidebar from "../../components/customer/CustomerSidebar";
import CustomerTopbar from "../../components/customer/CustomerTopbar";

function MyAppointments() {
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState("upcoming");

    const [searchQuery, setSearchQuery] = useState("");

    const [dateFilter, setDateFilter] = useState("any");
    const [isDateFilterOpen, setIsDateFilterOpen] = useState(false);

    const [statusFilter, setStatusFilter] = useState("all");
    const [isStatusFilterOpen, setIsStatusFilterOpen] = useState(false);

    const [appointments] = useState([
        // Upcoming
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

        // Past
        {
            id: 3,
            date: "Wed · 06 Aug",
            time: "11:00 AM",
            status: "Completed",
            service: "Dental Checkup",
            companyName: "Smile Care Clinic",
            staffName: "Dr. Ayesha Malik",
            durationMinutes: 45,
            price: 4000,
            tab: "past",
        },
        {
            id: 4,
            date: "Fri · 01 Aug",
            time: "02:30 PM",
            status: "Completed",
            service: "Physio Session",
            companyName: "Motion Rehab Center",
            staffName: "Dr. Hamza Khan",
            durationMinutes: 30,
            price: 3000,
            tab: "past",
        },

        // Cancelled
        {
            id: 5,
            date: "Tue · 12 Aug",
            time: "09:00 AM",
            status: "Cancelled",
            service: "General Checkup",
            companyName: "City Medical Center",
            staffName: "Dr. Omar Farooq",
            durationMinutes: 45,
            price: 4000,
            tab: "cancelled",
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
        // TODO: Navigate to Browse Companies / booking flow.
    }

    function handleViewDetails(id) {
        // TODO: Navigate to appointment details page.
    }

    function handleReschedule(id) {
        // TODO: Open reschedule flow for this appointment.
    }

    function handleCancel(id) {
        navigate("/customer/cancel", {
            state: {
                appointmentId: id,
            },
        });
    }

    function handleBookAgain(id) {
        // TODO: Navigate into booking flow with the same company/service
        // pre-filled for a new appointment.
    }

    function handleLeaveReview(id) {
        // TODO: Open the review/rating flow for this completed appointment.
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

                    {/* Search + Filters */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">

                        {/* Tabs */}
                        <div className="flex items-center gap-6">
                            {[
                                { key: "upcoming", label: "Upcoming" },
                                { key: "past", label: "Past" },
                                { key: "cancelled", label: "Cancelled" },
                            ].map((tab) => (
                                <button
                                    key={tab.key}
                                    type="button"
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`
                                        text-sm font-bold pb-2 border-b-2 transition
                                        ${
                                            activeTab === tab.key
                                                ? "text-navy border-navy"
                                                : "text-slate border-transparent hover:text-navy"
                                        }
                                    `}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Search + Filters */}
                        <div className="flex flex-wrap items-center gap-3">

                            {/* Search */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate" />

                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(event) => setSearchQuery(event.target.value)}
                                    placeholder="Search appointments..."
                                    className="
                                        w-64
                                        h-10
                                        bg-white
                                        border
                                        border-gray/30
                                        rounded-lg
                                        pl-9
                                        pr-4
                                        text-sm
                                        font-serif
                                        text-navy
                                        outline-none
                                        focus:border-navy
                                    "
                                />
                            </div>

                            {/* Date Filter */}
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsDateFilterOpen(!isDateFilterOpen);
                                        setIsStatusFilterOpen(false);
                                    }}
                                    className="
                                        h-10
                                        min-w-32
                                        px-4
                                        bg-white
                                        border
                                        border-gray/30
                                        rounded-lg
                                        flex
                                        items-center
                                        justify-between
                                        gap-3
                                        text-sm
                                        font-serif
                                        text-navy
                                    "
                                >
                                    <span>
                                        {dateFilter === "any"
                                            ? "Any Date"
                                            : dateFilter === "today"
                                            ? "Today"
                                            : "This Week"}
                                    </span>

                                    <ChevronDown className="w-4 h-4 text-slate" />
                                </button>

                                {isDateFilterOpen && (
                                    <div className="absolute right-0 top-12 z-20 w-36 bg-white border border-gray/20 rounded-lg shadow-lg p-1">

                                        {[
                                            { value: "any", label: "Any Date" },
                                            { value: "today", label: "Today" },
                                            { value: "week", label: "This Week" },
                                        ].map((option) => (
                                            <button
                                                key={option.value}
                                                type="button"
                                                onClick={() => {
                                                    setDateFilter(option.value);
                                                    setIsDateFilterOpen(false);
                                                }}
                                                className="
                                                    w-full
                                                    text-left
                                                    px-3
                                                    py-2
                                                    rounded-md
                                                    text-sm
                                                    font-serif
                                                    text-navy
                                                    hover:bg-beige
                                                "
                                            >
                                                {option.label}
                                            </button>
                                        ))}

                                    </div>
                                )}
                            </div>

                            {/* Status Filter */}
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsStatusFilterOpen(!isStatusFilterOpen);
                                        setIsDateFilterOpen(false);
                                    }}
                                    className="
                                        h-10
                                        min-w-32
                                        px-4
                                        bg-white
                                        border
                                        border-gray/30
                                        rounded-lg
                                        flex
                                        items-center
                                        justify-between
                                        gap-3
                                        text-sm
                                        font-serif
                                        text-navy
                                    "
                                >
                                    <span>
                                        {statusFilter === "all"
                                            ? "All Status"
                                            : statusFilter.charAt(0).toUpperCase() +
                                              statusFilter.slice(1)}
                                    </span>

                                    <ChevronDown className="w-4 h-4 text-slate" />
                                </button>

                                {isStatusFilterOpen && (
                                    <div className="absolute right-0 top-12 z-20 w-36 bg-white border border-gray/20 rounded-lg shadow-lg p-1">

                                        {[
                                            { value: "all", label: "All Status" },
                                            { value: "confirmed", label: "Confirmed" },
                                            { value: "pending", label: "Pending" },
                                            { value: "completed", label: "Completed" },
                                            { value: "cancelled", label: "Cancelled" },
                                        ].map((option) => (
                                            <button
                                                key={option.value}
                                                type="button"
                                                onClick={() => {
                                                    setStatusFilter(option.value);
                                                    setIsStatusFilterOpen(false);
                                                }}
                                                className="
                                                    w-full
                                                    text-left
                                                    px-3
                                                    py-2
                                                    rounded-md
                                                    text-sm
                                                    font-serif
                                                    text-navy
                                                    hover:bg-beige
                                                "
                                            >
                                                {option.label}
                                            </button>
                                        ))}

                                    </div>
                                )}
                            </div>

                        </div>
                    </div>

                    <div className="border-b border-gray/20 mt-4 mb-6"></div>

                    {/* Appointment List */}
                    <div className="flex flex-col gap-4">
                        {filteredAppointments.length > 0 ? (
                            filteredAppointments.map((appointment) => (
                                <div
                                    key={appointment.id}
                                    className="
                                        bg-white
                                        rounded-xl
                                        border
                                        border-gray/20
                                        shadow-sm
                                        p-5
                                        lg:p-6
                                        flex
                                        flex-col
                                        lg:flex-row
                                        lg:items-center
                                        gap-5
                                    "
                                >
                                    {/* Date & Time */}
                                    <div className="lg:w-36 flex-shrink-0">
                                        <p className="text-xs font-bold uppercase tracking-wide text-slate mb-1">
                                            {appointment.date}
                                        </p>

                                        <p className="font-serif text-xl text-navy">
                                            {appointment.time}
                                        </p>

                                        <span
                                            className={`
                                                inline-flex
                                                mt-2
                                                px-2.5
                                                py-1
                                                rounded-full
                                                text-xs
                                                font-bold
                                                ${
                                                    appointment.status === "Confirmed"
                                                        ? "bg-green-50 text-green-700"
                                                        : appointment.status === "Cancelled"
                                                        ? "bg-red-50 text-red-700"
                                                        : appointment.status === "Completed"
                                                        ? "bg-blue-50 text-blue-700"
                                                        : "bg-gold/20 text-amber-700"
                                                }
                                            `}
                                        >
                                            {appointment.status}
                                        </span>
                                    </div>

                                    {/* Divider */}
                                    <div className="hidden lg:block w-px h-20 bg-gray/20" />

                                    {/* Appointment Details */}
                                    <div className="flex-1 min-w-0">
                                        <h2 className="font-serif text-xl text-navy mb-1">
                                            {appointment.service}
                                        </h2>

                                        <p className="text-sm font-bold text-navy">
                                            {appointment.companyName}
                                        </p>

                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
                                            <span className="text-sm text-slate">
                                                {appointment.staffName}
                                            </span>

                                            <span className="text-sm text-slate">
                                                {appointment.durationMinutes} min
                                            </span>

                                            <span className="text-sm font-bold text-navy">
                                                PKR {appointment.price.toLocaleString()}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-wrap items-center gap-2 lg:flex-col lg:items-stretch lg:w-36 flex-shrink-0">
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleViewDetails(appointment.id)
                                            }
                                            className="
                                                px-4
                                                py-2
                                                border
                                                border-navy
                                                rounded-lg
                                                text-xs
                                                font-bold
                                                uppercase
                                                tracking-wide
                                                text-navy
                                                hover:bg-navy
                                                hover:text-white
                                                transition
                                            "
                                        >
                                            View Details
                                        </button>

                                        {appointment.status === "Confirmed" && (
                                            <>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleReschedule(appointment.id)
                                                    }
                                                    className="
                                                        px-4
                                                        py-2
                                                        rounded-lg
                                                        text-xs
                                                        font-bold
                                                        uppercase
                                                        tracking-wide
                                                        text-navy
                                                        hover:bg-beige
                                                        transition
                                                    "
                                                >
                                                    Reschedule
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleCancel(appointment.id)
                                                    }
                                                    className="
                                                        px-4
                                                        py-2
                                                        rounded-lg
                                                        text-xs
                                                        font-bold
                                                        uppercase
                                                        tracking-wide
                                                        text-slate
                                                        hover:text-red-700
                                                        transition
                                                    "
                                                >
                                                    Cancel
                                                </button>
                                            </>
                                        )}

                                        {appointment.status === "Completed" && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleLeaveReview(appointment.id)
                                                }
                                                className="
                                                    px-4
                                                    py-2
                                                    rounded-lg
                                                    text-xs
                                                    font-bold
                                                    uppercase
                                                    tracking-wide
                                                    text-navy
                                                    hover:bg-beige
                                                    transition
                                                "
                                            >
                                                Leave Review
                                            </button>
                                        )}

                                        {(appointment.status === "Completed" ||
                                            appointment.status === "Cancelled") && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleBookAgain(appointment.id)
                                                }
                                                className="
                                                    px-4
                                                    py-2
                                                    rounded-lg
                                                    text-xs
                                                    font-bold
                                                    uppercase
                                                    tracking-wide
                                                    text-slate
                                                    hover:bg-beige
                                                    transition
                                                "
                                            >
                                                Book Again
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="bg-white rounded-xl border border-gray/20 shadow-sm py-16 px-6 text-center">
                                <div className="w-12 h-12 rounded-full bg-beige mx-auto mb-4 flex items-center justify-center">
                                    <CalendarDays className="w-5 h-5 text-navy" />
                                </div>

                                <h2 className="font-serif text-xl text-navy mb-1">
                                    No {activeTab} appointments
                                </h2>

                                <p className="text-sm text-slate mb-5">
                                    You don't have any {activeTab} appointments yet.
                                </p>

                                {activeTab === "upcoming" && (
                                    <button
                                        type="button"
                                        onClick={handleBookAppointment}
                                        className="
                                            inline-flex
                                            items-center
                                            gap-2
                                            bg-navy
                                            text-white
                                            px-5
                                            py-2.5
                                            rounded-lg
                                            text-xs
                                            font-bold
                                            uppercase
                                            tracking-wide
                                            hover:bg-gold
                                            hover:text-navy
                                            transition
                                        "
                                    >
                                        <Plus className="w-4 h-4" />
                                        Book an Appointment
                                    </button>
                                )}
                            </div>
                        )}
                    </div>

                </main>
            </div>
        </div>
    );
}

export default MyAppointments;