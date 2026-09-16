import React, { useMemo, useState } from "react";
import {
    Banknote,
    Building2,
    CalendarDays,
    ChevronDown,
    Clock,
    Plus,
    Search,
    User,
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
        // ───────────── Upcoming ─────────────
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

        // ───────────── Past ─────────────
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

        // ───────────── Cancelled ─────────────
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
        navigate(`/customer/appointments/${id}`);
    }

    function handleReschedule(id) {
    navigate(`/customer/appointments/${id}/reschedule`);
}

    function handleCancel(id) {
        navigate(`/customer/appointments/${id}/cancel`);
    }

    function getStatusStyles(status) {
        switch (status) {
            case "Confirmed":
                return "bg-green-50 text-green-700";
            case "Completed":
                return "bg-blue-50 text-blue-700";
            case "Cancelled":
                return "bg-red-50 text-red-700";
            default:
                return "bg-gold/20 text-amber-700";
        }
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
                    <div className="flex justify-between items-start gap-6 mb-5 flex-wrap">

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
                            className="
                                bg-navy
                                text-white
                                uppercase
                                tracking-wide
                                font-bold
                                text-sm
                                px-6
                                py-3
                                rounded-lg
                                flex
                                items-center
                                gap-2
                                hover:bg-gold
                                hover:text-navy
                                transition
                                flex-shrink-0
                            "
                        >
                            <Plus className="w-4 h-4" />
                            Book an Appointment
                        </button>

                    </div>

                    {/* Tabs + Filters Row */}
                    <div className="flex justify-between items-center flex-wrap gap-4 mb-4">

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
                                        text-sm
                                        pb-2
                                        border-b-2
                                        transition
                                        ${
                                            activeTab === tab.key
                                                ? "text-navy font-bold border-navy"
                                                : "text-slate border-transparent hover:text-navy"
                                        }
                                    `}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Filters */}
                        <div className="flex flex-wrap gap-3">

                            {/* Search */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray pointer-events-none" />

                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(event) =>
                                        setSearchQuery(event.target.value)
                                    }
                                    placeholder="Search appointments..."
                                    className="
                                        bg-white
                                        border
                                        border-gray
                                        rounded-lg
                                        pl-9
                                        pr-4
                                        py-2.5
                                        text-sm
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
                                        bg-white
                                        border
                                        border-gray
                                        rounded-lg
                                        px-4
                                        py-2.5
                                        text-sm
                                        font-bold
                                        text-navy
                                        flex
                                        items-center
                                        gap-2
                                    "
                                >
                                    {dateFilter === "any"
                                        ? "Any Date"
                                        : dateFilter === "today"
                                        ? "Today"
                                        : "This Week"}

                                    <ChevronDown className="w-3.5 h-3.5 text-slate" />
                                </button>

                                {isDateFilterOpen && (
                                    <div className="absolute right-0 top-full mt-2 z-20 w-36 bg-white border border-gray/20 rounded-lg shadow-lg p-1">

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
                                        bg-white
                                        border
                                        border-gray
                                        rounded-lg
                                        px-4
                                        py-2.5
                                        text-sm
                                        font-bold
                                        text-navy
                                        flex
                                        items-center
                                        gap-2
                                    "
                                >
                                    {statusFilter === "all"
                                        ? "All Status"
                                        : statusFilter.charAt(0).toUpperCase() +
                                          statusFilter.slice(1)}

                                    <ChevronDown className="w-3.5 h-3.5 text-slate" />
                                </button>

                                {isStatusFilterOpen && (
                                    <div className="absolute right-0 top-full mt-2 z-20 w-36 bg-white border border-gray/20 rounded-lg shadow-lg p-1">

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

                    {/* Divider */}
                    <div className="border-b border-gray/20 mt-4 mb-6"></div>

                    {/* Appointment List */}
                    <div className="flex flex-col gap-5">

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
                                        p-7
                                        flex
                                        flex-col
                                        md:flex-row
                                        md:items-center
                                        justify-between
                                        gap-6
                                        flex-wrap
                                    "
                                >

                                    {/* Date / Time / Status */}
                                    <div className="flex flex-col flex-shrink-0">
                                        <p className="text-xs font-bold uppercase tracking-wide text-slate mb-1">
                                            {appointment.date}
                                        </p>

                                        <p className="font-serif text-2xl text-navy mb-2">
                                            {appointment.time}
                                        </p>

                                        <span
                                            className={`
                                                inline-block
                                                px-2.5
                                                py-1
                                                rounded-full
                                                text-xs
                                                font-bold
                                                ${getStatusStyles(appointment.status)}
                                            `}
                                        >
                                            {appointment.status}
                                        </span>
                                    </div>

                                    {/* Vertical Divider */}
                                    <div className="hidden md:block border-l border-gray/20 self-stretch mx-2" />

                                    {/* Service Details */}
                                    <div className="flex-1 min-w-0">

                                        <h2 className="font-serif text-2xl text-navy mb-2.5">
                                            {appointment.service}
                                        </h2>

                                        <div className="flex items-center gap-2 text-sm text-slate mb-2">
                                            <Building2 className="w-3.5 h-3.5 flex-shrink-0" />

                                            <span>{appointment.companyName}</span>
                                        </div>

                                        <div className="flex flex-wrap gap-6 mb-1.5">
                                            <div className="flex items-center gap-2 text-sm text-slate">
                                                <User className="w-3.5 h-3.5 flex-shrink-0" />

                                                <span>{appointment.staffName}</span>
                                            </div>

                                            <div className="flex items-center gap-2 text-sm text-slate">
                                                <Clock className="w-3.5 h-3.5 flex-shrink-0" />

                                                <span>{appointment.durationMinutes} min</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 text-sm text-slate">
                                            <Banknote className="w-3.5 h-3.5 flex-shrink-0" />

                                            <span>
                                                PKR {appointment.price.toLocaleString()}
                                            </span>
                                        </div>

                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-col gap-2 min-w-[160px] flex-shrink-0">

                                        <button
                                            type="button"
                                            onClick={() => handleViewDetails(appointment.id)}
                                            className="
                                                bg-navy
                                                text-white
                                                uppercase
                                                tracking-wide
                                                font-bold
                                                text-sm
                                                px-5
                                                py-2.5
                                                rounded-lg
                                                hover:bg-gold
                                                hover:text-navy
                                                transition
                                            "
                                        >
                                            View Details
                                        </button>

                                        {appointment.status === "Confirmed" && (
                                            <div className="grid grid-cols-2 gap-2">

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleReschedule(appointment.id)
                                                    }
                                                    className="
                                                        bg-white
                                                        border-2
                                                        border-navy
                                                        text-navy
                                                        uppercase
                                                        tracking-wide
                                                        font-bold
                                                        text-xs
                                                        px-4
                                                        py-2
                                                        rounded-lg
                                                        hover:bg-navy
                                                        hover:text-white
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
                                                        bg-white
                                                        border-2
                                                        border-red-500
                                                        text-red-600
                                                        uppercase
                                                        tracking-wide
                                                        font-bold
                                                        text-xs
                                                        px-4
                                                        py-2
                                                        rounded-lg
                                                        hover:bg-red-500
                                                        hover:text-white
                                                        transition
                                                    "
                                                >
                                                    Cancel
                                                </button>

                                            </div>
                                        )}

                                    </div>

                                </div>
                            ))
                        ) : (
                            <div className="text-center mt-[60px]">
                                <CalendarDays className="w-7 h-7 text-gray/40 mx-auto mb-2.5" />

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