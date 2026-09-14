import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Calendar,
    ChevronDown,
    CheckCircle2,
    Clock,
    Hourglass,
    Zap,
    ArrowRight,
    LayoutGrid,
    CalendarPlus,
    CalendarClock,
    Users,
    ClipboardList,
    UserCog,
} from "lucide-react";

import StaffSidebar from "../../components/staff/StaffSidebar";
import StaffTopbar from "../../components/staff/StaffTopbar";
import StatCard from "../../components/dashboard/StatCard";

function StaffDashboard() {
    const navigate = useNavigate();

    const [currentStaff] = useState({
        name: "Dr. Sara Ahmed",
        role: "Staff Member",
        avatarUrl: "",
        companyName: "Shifa Clinic",
    });

    const [selectedDate, setSelectedDate] = useState(
        new Date(2026, 7, 21)
    );

    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    const [appointments] = useState([
        {
            id: 1,
            time: "09:00 AM",
            customerName: "Ayesha Khan",
            service: "Consultation",
            status: "Completed",
            avatarUrl: "",
        },
        {
            id: 2,
            time: "10:00 AM",
            customerName: "Hina Malik",
            service: "Follow-up",
            status: "Next",
            avatarUrl: "",
        },
        {
            id: 3,
            time: "11:30 AM",
            customerName: "Kamran Ali",
            service: "Routine Check",
            status: "Confirmed",
            avatarUrl: "",
        },
        {
            id: 4,
            time: "02:00 PM",
            customerName: "Zainab Raza",
            service: "Consultation",
            status: "Confirmed",
            avatarUrl: "",
        },
    ]);

    const [breakTime] = useState({
        label: "12:30 PM - Break",
    });

    const [availabilityToday] = useState(
        "09:00 AM – 12:30 PM, 01:00 PM – 05:30 PM"
    );

    const nextAppointment = appointments.find(
        (appointment) => appointment.status === "Next"
    );

    const completedToday = appointments.filter(
        (appointment) => appointment.status === "Completed"
    ).length;

    const upcomingCount = appointments.filter(
        (appointment) =>
            appointment.status === "Confirmed" ||
            appointment.status === "Next"
    ).length;

    const availableHours = "4h 30m";
    const minutesUntil = 15;

    const quickActions = [
        {
            label: "View Calendar",
            icon: LayoutGrid,
            path: "/staff/calendar",
        },
        {
            label: "Appointments",
            icon: ClipboardList,
            path: "/staff/appointments",
        },
        {
            label: "Manage Availability",
            icon: CalendarClock,
            path: "/staff/availability",
        },
        {
            label: "View Customers",
            icon: Users,
            path: "/staff/customers",
        },
    ];

    function getGreeting() {
        const currentHour = new Date().getHours();

        if (currentHour < 12) {
            return "Good morning";
        }

        if (currentHour < 18) {
            return "Good afternoon";
        }

        return "Good evening";
    }

    function getFirstName(name) {
        return name.replace(/^Dr\.\s*/i, "").split(" ")[0];
    }

    function formatSelectedDate(date) {
        return date.toLocaleDateString("en-US", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    }

    function handleStartSession(appointmentId) {
        navigate(`/staff/appointments/${appointmentId}`);
    }

    function handleSignOut() {
        navigate("/login");
    }

    function handleSearchClick() {
        // TODO: Expand the inline staff search field.
    }

    function handleNotificationsClick() {
        navigate("/staff/notifications");
    }

    function handleSettingsClick() {
        navigate("/staff/settings");
    }

    return (
        <div className="min-h-screen bg-beige flex">

            <StaffSidebar
                companyName={currentStaff.companyName}
                currentStaff={currentStaff}
                activeItem="Dashboard"
                handleSignOut={handleSignOut}
            />

            <div className="flex-1 min-w-0 flex flex-col">

                <StaffTopbar
                    avatarUrl={currentStaff.avatarUrl}
                    onSearchClick={handleSearchClick}
                    onNotificationsClick={handleNotificationsClick}
                    onSettingsClick={handleSettingsClick}
                />

                <main className="flex-1 bg-beige px-4 sm:px-6 lg:px-8 py-6">

                    <div className="max-w-7xl mx-auto w-full">

                        {/* Header Row */}
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5 mb-6">

                            <div>
                                <h1 className="font-serif text-3xl sm:text-4xl text-navy">
                                    {getGreeting()}, Dr. {getFirstName(currentStaff.name)}
                                </h1>

                                <p className="text-sm text-slate mt-1.5">
                                    Here's your schedule and appointment overview for today.
                                </p>
                            </div>

                            {/* Date Picker */}
                            <div className="relative">

                                <button
                                    type="button"
                                    onClick={() =>
                                        setIsDatePickerOpen(!isDatePickerOpen)
                                    }
                                    className="
                                        w-full md:w-auto
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
                                        justify-center
                                        gap-2
                                        hover:border-navy
                                        transition
                                    "
                                >
                                    <Calendar className="w-4 h-4" />

                                    <span>
                                        {formatSelectedDate(selectedDate)}
                                    </span>

                                    <ChevronDown className="w-3.5 h-3.5" />
                                </button>

                                {isDatePickerOpen && (
                                    <div className="absolute right-0 top-full mt-2 w-64 bg-white border border-gray/20 rounded-xl shadow-lg p-4 z-30">

                                        <p className="text-xs font-bold uppercase tracking-wide text-slate mb-3">
                                            Select Date
                                        </p>

                                        <input
                                            type="date"
                                            value={`${selectedDate.getFullYear()}-${String(
                                                selectedDate.getMonth() + 1
                                            ).padStart(2, "0")}-${String(
                                                selectedDate.getDate()
                                            ).padStart(2, "0")}`}
                                            onChange={(event) => {
                                                const [year, month, day] =
                                                    event.target.value
                                                        .split("-")
                                                        .map(Number);

                                                setSelectedDate(
                                                    new Date(year, month - 1, day)
                                                );

                                                setIsDatePickerOpen(false);
                                            }}
                                            className="
                                                w-full
                                                h-10
                                                border
                                                border-gray/40
                                                rounded-lg
                                                px-3
                                                text-sm
                                                text-navy
                                                bg-white
                                                outline-none
                                                focus:border-navy
                                            "
                                        />

                                    </div>
                                )}

                            </div>

                        </div>

                        {/* Main 2-Column Layout */}
                        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px] gap-6">

                            {/* LEFT COLUMN */}
                            <div className="flex flex-col min-w-0">

                                {/* Stat Cards */}
                                <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 mb-6">

                                    <StatCard
                                        value={appointments.length}
                                        label="Today's Appointments"
                                        icon={Calendar}
                                        iconBg="bg-beige"
                                        iconColor="text-navy"
                                    />

                                    <StatCard
                                        value={completedToday}
                                        label="Completed Today"
                                        icon={CheckCircle2}
                                        iconBg="bg-green-50"
                                        iconColor="text-green-700"
                                    />

                                    <StatCard
                                        value={upcomingCount}
                                        label="Upcoming"
                                        icon={Clock}
                                        iconBg="bg-gold/15"
                                        iconColor="text-amber-600"
                                    />

                                    <StatCard
                                        value={availableHours}
                                        label="Available Hours"
                                        icon={Hourglass}
                                        iconBg="bg-beige"
                                        iconColor="text-navy"
                                    />

                                </div>

                                {/* Next Appointment Banner */}
                                {nextAppointment && (
                                    <div className="bg-white rounded-xl border border-gray/20 shadow-sm overflow-hidden flex flex-col md:flex-row border-l-4 border-gold mb-6">

                                        <div className="flex-1 p-6">

                                            <p className="text-xs font-bold uppercase tracking-wide text-gold flex items-center gap-1.5 mb-3">
                                                <Zap className="w-3 h-3" />

                                                NEXT APPOINTMENT ({minutesUntil} MINS)
                                            </p>

                                            <div className="flex items-center gap-4">

                                                {nextAppointment.avatarUrl ? (
                                                    <img
                                                        src={nextAppointment.avatarUrl}
                                                        alt={nextAppointment.customerName}
                                                        className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                                                    />
                                                ) : (
                                                    <div className="w-14 h-14 rounded-lg bg-beige flex items-center justify-center flex-shrink-0">
                                                        <span className="font-serif text-xl text-navy">
                                                            {nextAppointment.customerName
                                                                .charAt(0)
                                                                .toUpperCase()}
                                                        </span>
                                                    </div>
                                                )}

                                                <div className="min-w-0">
                                                    <h2 className="font-serif text-2xl text-navy">
                                                        {nextAppointment.customerName}
                                                    </h2>

                                                    <p className="text-sm text-slate mt-0.5">
                                                        {nextAppointment.service}
                                                    </p>
                                                </div>

                                            </div>
                                        </div>

                                        <div className="bg-beige/60 p-6 md:min-w-[200px] flex flex-col items-center justify-center">

                                            <p className="font-serif text-3xl text-navy">
                                                {nextAppointment.time}
                                            </p>

                                            <p className="text-sm text-slate mt-1">
                                                Duration: 30m
                                            </p>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleStartSession(nextAppointment.id)
                                                }
                                                className="
                                                    bg-gold
                                                    text-navy
                                                    font-bold
                                                    text-sm
                                                    px-5
                                                    py-2.5
                                                    rounded-lg
                                                    hover:bg-navy
                                                    hover:text-white
                                                    transition
                                                    mt-3
                                                "
                                            >
                                                Start Session
                                            </button>

                                        </div>

                                    </div>
                                )}

                                {/* Today's Appointments Table */}
                                <div className="bg-white rounded-xl border border-gray/20 shadow-sm overflow-hidden mb-6">

                                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray/20">
                                        <h2 className="font-serif text-xl font-bold text-navy">
                                            Today's Appointments
                                        </h2>

                                        <button
                                            type="button"
                                            onClick={() => navigate("/staff/appointments")}
                                            className="flex items-center gap-1.5 text-sm font-bold text-navy hover:text-gold transition"
                                        >
                                            <span>View All</span>
                                            <ArrowRight className="w-3.5 h-3.5" />
                                        </button>
                                    </div>

                                    <div className="overflow-x-auto">
                                        <div className="min-w-[640px]">

                                            <div className="grid grid-cols-[90px_1fr_1fr_110px] items-center px-6 py-3 bg-beige/40">
                                                <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                                    Time
                                                </p>

                                                <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                                    Customer
                                                </p>

                                                <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                                    Service
                                                </p>

                                                <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                                    Status
                                                </p>
                                            </div>

                                            {appointments.map((appointment) => {
                                                const isNext = appointment.id === nextAppointment?.id;

                                                return (
                                                    <div
                                                        key={appointment.id}
                                                        className="
                                                            grid grid-cols-[90px_1fr_1fr_110px]
                                                            items-center
                                                            px-6 py-4
                                                            border-b border-gray/20
                                                            last:border-b-0
                                                            hover:bg-beige/20
                                                            transition
                                                        "
                                                    >
                                                        <p className="text-sm text-navy">
                                                            {appointment.time}
                                                        </p>

                                                        <div className="flex items-center gap-3 min-w-0">
                                                            {appointment.avatarUrl ? (
                                                                <img
                                                                    src={appointment.avatarUrl}
                                                                    alt={appointment.customerName}
                                                                    className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                                                                />
                                                            ) : (
                                                                <div className="w-8 h-8 rounded-full bg-beige flex items-center justify-center flex-shrink-0">
                                                                    <span className="text-xs font-bold text-navy">
                                                                        {appointment.customerName
                                                                            .charAt(0)
                                                                            .toUpperCase()}
                                                                    </span>
                                                                </div>
                                                            )}

                                                            <p
                                                                className={`
                                                                    text-sm truncate
                                                                    ${
                                                                        isNext
                                                                            ? "font-bold text-navy"
                                                                            : "text-navy"
                                                                    }
                                                                `}
                                                            >
                                                                {appointment.customerName}
                                                            </p>
                                                        </div>

                                                        <p className="text-sm text-slate truncate">
                                                            {appointment.service}
                                                        </p>

                                                        <div>
                                                            <span
                                                                className={`
                                                                    inline-block
                                                                    text-xs
                                                                    font-bold
                                                                    px-3
                                                                    py-1
                                                                    rounded-full
                                                                    ${
                                                                        appointment.status === "Completed"
                                                                            ? "bg-gray/10 text-slate"
                                                                            : appointment.status === "Next"
                                                                            ? "bg-gold/20 text-navy"
                                                                            : "bg-blue-50 text-blue-700"
                                                                    }
                                                                `}
                                                            >
                                                                {appointment.status}
                                                            </span>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                            </div>

                            {/* RIGHT COLUMN */}
                            <div className="flex flex-col min-w-0">

                                {/* Quick Actions — 2×2 grid of tiles */}
                                <div className="grid grid-cols-2 gap-4 mb-6">

                                    {quickActions.map((action) => {
                                        const Icon = action.icon;

                                        return (
                                            <button
                                                key={action.label}
                                                type="button"
                                                onClick={() => navigate(action.path)}
                                                className="
                                                    bg-white
                                                    rounded-xl
                                                    border border-gray/20
                                                    shadow-sm
                                                    p-5
                                                    flex
                                                    flex-col
                                                    items-center
                                                    justify-center
                                                    gap-2
                                                    text-center
                                                    hover:border-navy
                                                    hover:shadow-md
                                                    transition
                                                "
                                            >
                                                <Icon className="w-6 h-6 text-navy" />

                                                <span className="text-xs font-bold text-navy leading-tight">
                                                    {action.label}
                                                </span>
                                            </button>
                                        );
                                    })}

                                </div>

                                {/* Schedule Timeline */}
                                <div className="bg-white rounded-xl border border-gray/20 shadow-sm mb-6">

                                    <div className="px-5 py-4 border-b border-gray/20">
                                        <h2 className="font-serif text-lg font-bold text-navy">
                                            Schedule Timeline
                                        </h2>
                                    </div>

                                    <div className="p-5">

                                        <div className="relative">

                                            <div className="absolute left-[58px] top-2 bottom-2 w-px bg-gray/30" />

                                            <div className="flex flex-col gap-5">

                                                {/* 09:00 AM */}
                                                <div className="flex items-start gap-4 relative">
                                                    <div className="w-10 flex-shrink-0">
                                                        <p className="text-xs font-bold text-slate">
                                                            09:00 AM
                                                        </p>
                                                    </div>

                                                    <div className="relative z-10 w-4 h-4 rounded-full bg-gray/20 border-4 border-white flex-shrink-0 mt-0.5" />

                                                    <div className="flex-1 bg-beige/40 rounded-lg px-3 py-2.5 min-w-0">
                                                        <p className="text-sm font-bold text-navy truncate">
                                                            Ayesha Khan - Consultation
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* 10:00 AM — NEXT */}
                                                <div className="flex items-start gap-4 relative">
                                                    <div className="w-10 flex-shrink-0">
                                                        <p className="text-xs font-bold text-gold">
                                                            10:00 AM
                                                        </p>
                                                    </div>

                                                    <div className="relative z-10 w-4 h-4 rounded-full bg-gold border-4 border-white flex-shrink-0 mt-0.5" />

                                                    <div className="flex-1 bg-navy text-white rounded-lg px-3 py-2.5 min-w-0">
                                                        <p className="text-sm font-bold truncate">
                                                            Hina Malik - Follow-up
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* 11:30 AM */}
                                                <div className="flex items-start gap-4 relative">
                                                    <div className="w-10 flex-shrink-0">
                                                        <p className="text-xs font-bold text-slate">
                                                            11:30 AM
                                                        </p>
                                                    </div>

                                                    <div className="relative z-10 w-4 h-4 rounded-full bg-gray/20 border-4 border-white flex-shrink-0 mt-0.5" />

                                                    <div className="flex-1 bg-beige/40 rounded-lg px-3 py-2.5 min-w-0">
                                                        <p className="text-sm font-bold text-navy truncate">
                                                            Kamran Ali - Routine Check
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* 12:30 PM — Break */}
                                                <div className="flex items-start gap-4 relative">
                                                    <div className="w-10 flex-shrink-0">
                                                        <p className="text-xs font-bold text-slate">
                                                            12:30 PM
                                                        </p>
                                                    </div>

                                                    <div className="relative z-10 flex items-center justify-center w-4 h-4 rounded-full bg-gray/30 border-4 border-white flex-shrink-0 mt-0.5" />

                                                    <div className="flex-1 border border-dashed border-gray/40 rounded-lg px-3 py-2.5 flex items-center gap-2 min-w-0">
                                                        <Clock className="w-3.5 h-3.5 text-slate flex-shrink-0" />

                                                        <p className="text-xs font-bold text-slate truncate">
                                                            12:30 PM - Break
                                                        </p>
                                                    </div>
                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                                {/* Today's Availability */}
                                <div className="bg-white rounded-xl border border-gray/20 shadow-sm">

                                    <div className="flex items-center justify-between px-5 py-4 border-b border-gray/20">
                                        <h2 className="font-serif text-base font-bold uppercase tracking-wide text-slate">
                                            Today's Availability
                                        </h2>

                                        <button
                                            type="button"
                                            onClick={() => navigate("/staff/availability")}
                                            className="text-xs font-bold text-navy hover:text-gold transition"
                                        >
                                            Edit
                                        </button>
                                    </div>

                                    <div className="p-5">

                                        <div className="flex items-center gap-3">

                                            <div className="w-9 h-9 rounded-lg bg-beige flex items-center justify-center flex-shrink-0">
                                                <Clock className="w-4 h-4 text-navy" />
                                            </div>

                                            <p className="font-serif text-base text-navy">
                                                {availabilityToday}
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </main>
            </div>
        </div>
    );
}

export default StaffDashboard;