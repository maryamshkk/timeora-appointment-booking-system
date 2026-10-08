import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    AlertCircle,
    ArrowRight,
    Calendar,
    CalendarClock,
    CheckCircle2,
    ChevronDown,
    ClipboardList,
    Clock,
    Hourglass,
    LayoutGrid,
    Loader2,
    Users,
    Zap,
} from "lucide-react";

import StaffSidebar from "../../components/staff/StaffSidebar";
import StaffTopbar from "../../components/staff/StaffTopbar";
import StatCard from "../../components/dashboard/StatCard";
import { useStaffDashboard } from "../../hooks/staff/useStaffDashboard";
import { useAuth } from "../../hooks/authHook";

function formatTime(timeString) {
    if (!timeString) return "";
    const [hour, minute] = timeString.split(":");
    const hourNumber = Number(hour);
    const period = hourNumber >= 12 ? "PM" : "AM";
    const displayHour = hourNumber % 12 || 12;
    return `${String(displayHour).padStart(2, "0")}:${minute} ${period}`;
}

function formatAvailability(availability) {
    if (!availability || !availability.is_working) {
        return "Not available today";
    }
    const start = availability.start_time?.slice(0, 5) || "";
    const end = availability.end_time?.slice(0, 5) || "";
    let result = `${formatTime(start)} – ${formatTime(end)}`;
    if (availability.break_start && availability.break_end) {
        result += ` (Break: ${formatTime(availability.break_start)} – ${formatTime(availability.break_end)})`;
    }
    return result;
}

function statusLabel(status) {
    if (!status) return "";
    return status.charAt(0).toUpperCase() + status.slice(1);
}

function getStatusStyle(status) {
    const s = (status || "").toLowerCase();
    if (s === "completed") return "bg-gray/10 text-slate";
    if (s === "pending") return "bg-gold/20 text-navy";
    if (s === "accepted") return "bg-blue-50 text-blue-700";
    if (s === "cancelled") return "bg-red-50 text-red-600";
    if (s === "rejected") return "bg-red-50 text-red-600";
    return "bg-gray/10 text-slate";
}

function StaffDashboard() {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    const { data: authUser } = useAuth();

    const staffName =
        `${authUser?.first_name || ""} ${authUser?.last_name || ""}`.trim() ||
        authUser?.name ||
        "Staff";

    const companyName = authUser?.company?.name || "Company";
    const avatarUrl = authUser?.photo_path
        ? `/storage/${authUser.photo_path}`
        : "";

    const {
        data: dashboardResponse,
        isLoading,
        isError,
        error,
    } = useStaffDashboard();

    const dashboard = dashboardResponse?.data;
    const stats = dashboard?.statistics || {};
    const todayAppointmentsRaw = stats?.today_appointments || [];
    const todayAvailability = dashboard?.today_availability;

    const todayAppointments = useMemo(() => {
        return todayAppointmentsRaw.map((a) => ({
            id: a.id,
            time: formatTime(a.start_time),
            customerName: a.customer?.name || "Unknown",
            service: a.service?.name || "Service",
            status: statusLabel(a.status),
            startTime: a.start_time,
        }));
    }, [todayAppointmentsRaw]);

    const nextAppointment = useMemo(() => {
        const now = new Date();
        const currentMinutes = now.getHours() * 60 + now.getMinutes();

        return todayAppointments.find((a) => {
            if (
                a.status === "Completed" ||
                a.status === "Cancelled" ||
                a.status === "Rejected"
            ) {
                return false;
            }
            const [hourStr] = (a.startTime || "").split(":");
            const hour = Number(hourStr);
            return hour * 60 >= currentMinutes;
        });
    }, [todayAppointments]);

    const completedToday = todayAppointments.filter(
        (a) => a.status === "Completed"
    ).length;

    const upcomingTodayCount = todayAppointments.filter(
        (a) =>
            a.status !== "Completed" &&
            a.status !== "Cancelled" &&
            a.status !== "Rejected"
    ).length;

    const minutesUntil = useMemo(() => {
        if (!nextAppointment) return 0;
        const now = new Date();
        const currentMinutes = now.getHours() * 60 + now.getMinutes();
        const [hourStr, minuteStr] = (nextAppointment.startTime || "").split(":");
        const hour = Number(hourStr);
        const minute = Number(minuteStr);
        return Math.max(0, hour * 60 + minute - currentMinutes);
    }, [nextAppointment]);

    const quickActions = [
        { label: "View Calendar", icon: LayoutGrid, path: "/staff/calendar" },
        { label: "Appointments", icon: ClipboardList, path: "/staff/appointments" },
        { label: "Manage Availability", icon: CalendarClock, path: "/staff/availability" },
        { label: "View Customers", icon: Users, path: "/staff/customers" },
    ];

    function getGreeting() {
        const h = new Date().getHours();
        if (h < 12) return "Good morning";
        if (h < 18) return "Good afternoon";
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

    function handleNotificationsClick() {
        navigate("/staff/notifications");
    }

    function handleSettingsClick() {
        navigate("/staff/settings");
    }

    const apiError = error?.response?.data?.message || error?.message || "";

    return (
        <div className="min-h-screen bg-beige flex">
            <StaffSidebar
                companyName={companyName}
                currentStaff={{ name: staffName, avatarUrl }}
                activeItem="Dashboard"
                handleSignOut={handleSignOut}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            <div className="flex min-w-0 flex-1 flex-col">
                <StaffTopbar
                    avatarUrl={avatarUrl}
                    onMenuClick={() => setSidebarOpen(true)}
                    onSearchClick={() => {}}
                    onNotificationsClick={handleNotificationsClick}
                    onSettingsClick={handleSettingsClick}
                />

                <main className="flex-1 bg-beige px-4 sm:px-6 lg:px-8 py-6">
                    <div className="mx-auto w-full max-w-7xl">
                        <div className="mb-6 flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                            <div>
                                <h1 className="font-serif text-2xl text-navy sm:text-3xl lg:text-4xl">
                                    {getGreeting()}, Dr. {getFirstName(staffName)}
                                </h1>
                                <p className="mt-1.5 text-sm text-slate">
                                    Here's your schedule and appointment overview for today.
                                </p>
                            </div>

                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
                                    className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray bg-white px-4 py-2.5 text-sm font-bold text-navy transition hover:border-navy md:w-auto"
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
                                                setSelectedDate(new Date(year, month - 1, day));
                                                setIsDatePickerOpen(false);
                                            }}
                                            className="h-10 w-full rounded-lg border border-gray/40 bg-white px-3 text-sm text-navy outline-none focus:border-navy"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {isError && (
                            <div className="mb-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                                <p className="text-sm text-red-700">
                                    {apiError || "Failed to load dashboard."}
                                </p>
                            </div>
                        )}

                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px]">
                            <div className="flex min-w-0 flex-col">
                                <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
                                    {isLoading ? (
                                        <div className="col-span-full flex items-center justify-center gap-3 rounded-xl border border-gray/20 bg-white py-10">
                                            <Loader2 className="h-5 w-5 animate-spin text-navy" />
                                            <span className="text-sm text-slate">
                                                Loading dashboard...
                                            </span>
                                        </div>
                                    ) : (
                                        <>
                                            <StatCard
                                                value={todayAppointments.length}
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
                                                value={upcomingTodayCount}
                                                label="Upcoming Today"
                                                icon={Clock}
                                                iconBg="bg-gold/15"
                                                iconColor="text-amber-600"
                                            />
                                            <StatCard
                                                value={stats?.pending_appointments ?? 0}
                                                label="Pending"
                                                icon={Hourglass}
                                                iconBg="bg-beige"
                                                iconColor="text-navy"
                                            />
                                        </>
                                    )}
                                </div>

                                {nextAppointment && (
                                    <div className="mb-6 flex flex-col overflow-hidden rounded-xl border border-gray/20 border-l-4 border-l-gold bg-white shadow-sm lg:flex-row">
                                        <div className="flex-1 p-5 sm:p-6">
                                            <p className="mb-3 flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-gold">
                                                <Zap className="h-3 w-3" />
                                                NEXT APPOINTMENT ({minutesUntil} MINS)
                                            </p>
                                            <div className="flex items-center gap-4">
                                                <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-lg bg-beige">
                                                    <span className="font-serif text-xl text-navy">
                                                        {nextAppointment.customerName.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
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
                                            <button
                                                type="button"
                                                onClick={() => handleStartSession(nextAppointment.id)}
                                                className="mt-3 rounded-lg bg-gold px-5 py-2.5 text-sm font-bold text-navy transition hover:bg-navy hover:text-white"
                                            >
                                                Start Session
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <div className="mb-6 overflow-hidden rounded-xl border border-gray/20 bg-white shadow-sm">
                                    <div className="flex items-center justify-between border-b border-gray/20 px-5 py-4 sm:px-6">
                                        <h2 className="font-serif text-lg font-bold text-navy sm:text-xl">
                                            Today's Appointments
                                        </h2>
                                        <button
                                            type="button"
                                            onClick={() => navigate("/staff/appointments")}
                                            className="flex items-center gap-1.5 text-sm font-bold text-navy transition hover:text-gold"
                                        >
                                            <span>View All</span>
                                            <ArrowRight className="h-3.5 w-3.5" />
                                        </button>
                                    </div>

                                    <div className="overflow-x-auto">
                                        <div className="min-w-[640px]">
                                            <div className="grid grid-cols-[90px_1fr_1fr_110px] items-center bg-beige/40 px-5 py-3 sm:px-6">
                                                <p className="text-xs font-bold uppercase tracking-wide text-slate">Time</p>
                                                <p className="text-xs font-bold uppercase tracking-wide text-slate">Customer</p>
                                                <p className="text-xs font-bold uppercase tracking-wide text-slate">Service</p>
                                                <p className="text-xs font-bold uppercase tracking-wide text-slate">Status</p>
                                            </div>

                                            {isLoading ? (
                                                <div className="px-6 py-8 text-center">
                                                    <Loader2 className="mx-auto h-5 w-5 animate-spin text-navy" />
                                                </div>
                                            ) : todayAppointments.length === 0 ? (
                                                <div className="px-6 py-12 text-center">
                                                    <p className="text-sm text-slate">
                                                        No appointments scheduled for today.
                                                    </p>
                                                </div>
                                            ) : (
                                                todayAppointments.map((a) => {
                                                    const isNext = a.id === nextAppointment?.id;
                                                    return (
                                                        <div
                                                            key={a.id}
                                                            className="grid grid-cols-[90px_1fr_1fr_110px] items-center border-b border-gray/20 px-5 py-4 transition last:border-b-0 hover:bg-beige/20 sm:px-6"
                                                        >
                                                            <p className="text-sm text-navy">{a.time}</p>
                                                            <div className="flex min-w-0 items-center gap-3">
                                                                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-beige">
                                                                    <span className="text-xs font-bold text-navy">
                                                                        {a.customerName.charAt(0).toUpperCase()}
                                                                    </span>
                                                                </div>
                                                                <p className={`truncate text-sm text-navy ${isNext ? "font-bold" : ""}`}>
                                                                    {a.customerName}
                                                                </p>
                                                            </div>
                                                            <p className="truncate text-sm text-slate">{a.service}</p>
                                                            <div>
                                                                <span className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${getStatusStyle(a.status)}`}>
                                                                    {a.status}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex min-w-0 flex-col">
                                <div className="mb-6 grid grid-cols-2 gap-4">
                                    {quickActions.map((action) => {
                                        const Icon = action.icon;
                                        return (
                                            <button
                                                key={action.label}
                                                type="button"
                                                onClick={() => navigate(action.path)}
                                                className="flex flex-col items-center justify-center gap-2 rounded-xl border border-gray/20 bg-white p-5 text-center shadow-sm transition hover:border-navy hover:shadow-md"
                                            >
                                                <Icon className="h-6 w-6 text-navy" />
                                                <span className="text-xs font-bold leading-tight text-navy">
                                                    {action.label}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>

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
                                        {isLoading ? (
                                            <div className="flex items-center gap-2 text-sm text-slate">
                                                <Loader2 className="h-4 w-4 animate-spin text-navy" />
                                                Loading...
                                            </div>
                                        ) : (
                                            <div className="flex items-start gap-3">
                                                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-beige">
                                                    <Clock className="h-4 w-4 text-navy" />
                                                </div>
                                                <p className="font-serif text-sm text-navy break-words sm:text-base">
                                                    {formatAvailability(todayAvailability)}
                                                </p>
                                            </div>
                                        )}
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
