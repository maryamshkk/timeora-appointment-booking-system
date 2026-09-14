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
    CalendarClock,
    Users,
    ClipboardList,
} from "lucide-react";

import StaffSidebar from "../../components/staff/StaffSidebar";
import StaffTopbar from "../../components/staff/StaffTopbar";
import StatCard from "../../components/dashboard/StatCard";
import AppointmentsTable from "../../components/staff/AppointmentsTable";

function StaffDashboard() {
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [currentStaff] = useState({
        name: "Dr. Sara Ahmed",
        role: "Staff Member",
        avatarUrl: "",
        companyName: "Shifa Clinic",
    });

    const [selectedDate, setSelectedDate] = useState(new Date(2026, 7, 21));
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    const [appointments] = useState([
        {
            id: 1,
            time: "09:00 AM",
            customerName: "Ayesha Khan",
            service: "Consultation",
            staff: "Dr. Sara Ahmed",
            status: "Completed",
            avatarUrl: "",
        },
        {
            id: 2,
            time: "10:00 AM",
            customerName: "Hina Malik",
            service: "Follow-up",
            staff: "Dr. Sara Ahmed",
            status: "Next",
            avatarUrl: "",
        },
        {
            id: 3,
            time: "11:30 AM",
            customerName: "Kamran Ali",
            service: "Routine Check",
            staff: "Dr. Sara Ahmed",
            status: "Confirmed",
            avatarUrl: "",
        },
        {
            id: 4,
            time: "02:00 PM",
            customerName: "Zainab Raza",
            service: "Consultation",
            staff: "Dr. Sara Ahmed",
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

    // Map the shared appointments shape into the AppointmentsTable shape
    const tableAppointments = appointments.map((appointment) => ({
        time: appointment.time,
        customer: appointment.customerName,
        service: appointment.service,
        staff: appointment.staff,
        status: appointment.status,
    }));

    function getGreeting() {
        const currentHour = new Date().getHours();

        if (currentHour < 12) return "Good morning";
        if (currentHour < 18) return "Good afternoon";

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

            {/* Sidebar — desktop always visible, mobile slide-in drawer */}
            <StaffSidebar
                companyName={currentStaff.companyName}
                currentStaff={currentStaff}
                activeItem="Dashboard"
                handleSignOut={handleSignOut}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            {/* Main Area */}
            <div className="flex min-w-0 flex-1 flex-col">

                <StaffTopbar
                    avatarUrl={currentStaff.avatarUrl}
                    onMenuClick={() => setSidebarOpen(true)}
                    onSearchClick={handleSearchClick}
                    onNotificationsClick={handleNotificationsClick}
                    onSettingsClick={handleSettingsClick}
                />

                <main className="flex-1 bg-beige px-4 sm:px-6 lg:px-8 py-6">

                    <div className="mx-auto w-full max-w-7xl">

                        {/* Header Row */}
                        <div className="mb-6 flex flex-col gap-5 md:flex-row md:items-start md:justify-between">

                            <div>
                                <h1 className="font-serif text-2xl text-navy sm:text-3xl lg:text-4xl">
                                    {getGreeting()}, Dr. {getFirstName(currentStaff.name)}
                                </h1>

                                <p className="mt-1.5 text-sm text-slate">
                                    Here's your schedule and appointment overview for today.
                                </p>
                            </div>

                            {/* Date Picker */}
                            <div className="relative">

                                <button
                                    type="button"
                                    onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                                    className="
                                        flex w-full items-center justify-center gap-2
                                        rounded-lg border border-gray bg-white
                                        px-4 py-2.5 text-sm font-bold text-navy
                                        transition hover:border-navy
                                        md:w-auto
                                    "
                                >
                                    <Calendar className="h-4 w-4 flex-shrink-0" />

                                    <span className="whitespace-nowrap">
                                        {formatSelectedDate(selectedDate)}
                                    </span>

                                    <ChevronDown className="h-3.5 w-3.5 flex-shrink-0" />
                                </button>

                                {isDatePickerOpen && (
                                    <div className="absolute right-0 top-full z-30 mt-2 w-64 max-w-[90vw] rounded-xl border border-gray/20 bg-white p-4 shadow-lg">

                                        <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate">
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
                                                const [year, month, day] = event.target.value
                                                    .split("-")
                                                    .map(Number);

                                                setSelectedDate(
                                                    new Date(year, month - 1, day)
                                                );

                                                setIsDatePickerOpen(false);
                                            }}
                                            className="
                                                h-10 w-full rounded-lg border border-gray/40
                                                bg-white px-3 text-sm text-navy
                                                outline-none focus:border-navy
                                            "
                                        />

                                    </div>
                                )}

                            </div>

                        </div>

                        {/* Main 2-Column Layout */}
                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px]">

                            {/* LEFT COLUMN */}
                            <div className="flex min-w-0 flex-col">

                                {/* Stat Cards */}
                                <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">

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
                                    <div className="mb-6 flex flex-col overflow-hidden rounded-xl border border-gray/20 border-l-4 border-l-gold bg-white shadow-sm lg:flex-row">

                                        <div className="flex-1 p-5 sm:p-6">

                                            <p className="mb-3 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-gold">
                                                <Zap className="h-3 w-3" />

                                                NEXT APPOINTMENT ({minutesUntil} MINS)
                                            </p>

                                            <div className="flex items-center gap-4">

                                                {nextAppointment.avatarUrl ? (
                                                    <img
                                                        src={nextAppointment.avatarUrl}
                                                        alt={nextAppointment.customerName}
                                                        className="h-14 w-14 flex-shrink-0 rounded-lg object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg bg-beige">
                                                        <span className="font-serif text-xl text-navy">
                                                            {nextAppointment.customerName
                                                                .charAt(0)
                                                                .toUpperCase()}
                                                        </span>
                                                    </div>
                                                )}

                                                <div className="min-w-0">
                                                    <h2 className="truncate font-serif text-xl text-navy sm:text-2xl">
                                                        {nextAppointment.customerName}
                                                    </h2>

                                                    <p className="mt-0.5 text-sm text-slate">
                                                        {nextAppointment.service}
                                                    </p>
                                                </div>

                                            </div>
                                        </div>

                                        <div className="flex flex-col items-center justify-center bg-beige/60 p-5 sm:p-6 lg:min-w-[200px]">

                                            <p className="font-serif text-2xl text-navy sm:text-3xl">
                                                {nextAppointment.time}
                                            </p>

                                            <p className="mt-1 text-sm text-slate">
                                                Duration: 30m
                                            </p>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handleStartSession(nextAppointment.id)
                                                }
                                                className="
                                                    mt-3 rounded-lg bg-gold px-5 py-2.5
                                                    text-sm font-bold text-navy transition
                                                    hover:bg-navy hover:text-white
                                                "
                                            >
                                                Start Session
                                            </button>

                                        </div>

                                    </div>
                                )}

                                {/* Today's Appointments — now using reusable AppointmentsTable */}
                                <div className="mb-6">
                                    <AppointmentsTable appointments={tableAppointments} />
                                </div>

                            </div>

                            {/* RIGHT COLUMN */}
                            <div className="flex min-w-0 flex-col">

                                {/* Quick Actions — 2×2 grid of tiles */}
                                <div className="mb-6 grid grid-cols-2 gap-4">

                                    {quickActions.map((action) => {
                                        const Icon = action.icon;

                                        return (
                                            <button
                                                key={action.label}
                                                type="button"
                                                onClick={() => navigate(action.path)}
                                                className="
                                                    flex flex-col items-center justify-center gap-2
                                                    rounded-xl border border-gray/20 bg-white
                                                    p-5 text-center shadow-sm transition
                                                    hover:border-navy hover:shadow-md
                                                "
                                            >
                                                <Icon className="h-6 w-6 text-navy" />

                                                <span className="text-xs font-bold leading-tight text-navy">
                                                    {action.label}
                                                </span>
                                            </button>
                                        );
                                    })}

                                </div>

                                {/* Schedule Timeline */}
                                <div className="mb-6 rounded-xl border border-gray/20 bg-white shadow-sm">

                                    <div className="border-b border-gray/20 px-5 py-4">
                                        <h2 className="font-serif text-lg font-bold text-navy">
                                            Schedule Timeline
                                        </h2>
                                    </div>

                                    <div className="p-5">

                                        <div className="relative">

                                            <div className="absolute left-[58px] top-2 bottom-2 w-px bg-gray/30" />

                                            <div className="flex flex-col gap-5">

                                                {/* 09:00 AM */}
                                                <div className="relative flex items-start gap-4">

                                                    <div className="w-10 flex-shrink-0">
                                                        <p className="text-xs font-bold text-slate">
                                                            09:00 AM
                                                        </p>
                                                    </div>

                                                    <div className="relative z-10 mt-0.5 h-4 w-4 flex-shrink-0 rounded-full border-4 border-white bg-gray/20" />

                                                    <div className="min-w-0 flex-1 rounded-lg bg-beige/40 px-3 py-2.5">
                                                        <p className="truncate text-sm font-bold text-navy">
                                                            Ayesha Khan - Consultation
                                                        </p>
                                                    </div>

                                                </div>

                                                {/* 10:00 AM — NEXT */}
                                                <div className="relative flex items-start gap-4">

                                                    <div className="w-10 flex-shrink-0">
                                                        <p className="text-xs font-bold text-gold">
                                                            10:00 AM
                                                        </p>
                                                    </div>

                                                    <div className="relative z-10 mt-0.5 h-4 w-4 flex-shrink-0 rounded-full border-4 border-white bg-gold" />

                                                    <div className="min-w-0 flex-1 rounded-lg bg-navy px-3 py-2.5 text-white">
                                                        <p className="truncate text-sm font-bold">
                                                            Hina Malik - Follow-up
                                                        </p>
                                                    </div>

                                                </div>

                                                {/* 11:30 AM */}
                                                <div className="relative flex items-start gap-4">

                                                    <div className="w-10 flex-shrink-0">
                                                        <p className="text-xs font-bold text-slate">
                                                            11:30 AM
                                                        </p>
                                                    </div>

                                                    <div className="relative z-10 mt-0.5 h-4 w-4 flex-shrink-0 rounded-full border-4 border-white bg-gray/20" />

                                                    <div className="min-w-0 flex-1 rounded-lg bg-beige/40 px-3 py-2.5">
                                                        <p className="truncate text-sm font-bold text-navy">
                                                            Kamran Ali - Routine Check
                                                        </p>
                                                    </div>

                                                </div>

                                                {/* 12:30 PM — Break */}
                                                <div className="relative flex items-start gap-4">

                                                    <div className="w-10 flex-shrink-0">
                                                        <p className="text-xs font-bold text-slate">
                                                            12:30 PM
                                                        </p>
                                                    </div>

                                                    <div className="relative z-10 mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border-4 border-white bg-gray/30" />

                                                    <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-dashed border-gray/40 px-3 py-2.5">
                                                        <Clock className="h-3.5 w-3.5 flex-shrink-0 text-slate" />

                                                        <p className="truncate text-xs font-bold text-slate">
                                                            12:30 PM - Break
                                                        </p>
                                                    </div>

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                                {/* Today's Availability */}
                                <div className="rounded-xl border border-gray/20 bg-white shadow-sm">

                                    <div className="flex items-center justify-between border-b border-gray/20 px-5 py-4">

                                        <h2 className="font-serif text-sm font-bold uppercase tracking-wide text-slate sm:text-base">
                                            Today's Availability
                                        </h2>

                                        <button
                                            type="button"
                                            onClick={() => navigate("/staff/availability")}
                                            className="text-xs font-bold text-navy transition hover:text-gold"
                                        >
                                            Edit
                                        </button>

                                    </div>

                                    <div className="p-5">

                                        <div className="flex items-start gap-3">

                                            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-beige">
                                                <Clock className="h-4 w-4 text-navy" />
                                            </div>

                                            <p className="font-serif text-sm text-navy break-words sm:text-base">
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