import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    ArrowRight,
    Briefcase,
    CalendarClock,
    CalendarDays,
    CalendarPlus,
    CalendarRange,
    CheckCircle2,
    ChevronRight,
    CircleUser,
    History,
    Loader2,
    AlertCircle,
    Pencil,
    Scissors,
    TrendingUp,
} from "lucide-react";
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import StatCard from "../../components/dashboard/StatCard";
import { useStaffMember } from "../../hooks/company/useStaff";

const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function StaffDetails() {
    const { staffId } = useParams();
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [chartRange, setChartRange] = useState("7");

    const {
        data: response,
        isLoading,
        isError,
        error,
    } = useStaffMember(staffId);

    const staff = response?.data;

    if (isLoading) {
        return (
            <div className="flex min-h-screen bg-beige">
                <div className="hidden lg:block lg:flex-shrink-0">
                    <Sidebar
                        companyName="Shifa Clinic"
                        activeItem="Staff"
                        ctaLabel="Add Staff"
                    />
                </div>

                <div className="flex flex-1 items-center justify-center">
                    <div className="flex items-center gap-3 text-navy">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span className="font-serif text-sm">Loading staff...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (isError || !staff) {
        return (
            <div className="flex min-h-screen bg-beige">
                <div className="hidden lg:block lg:flex-shrink-0">
                    <Sidebar
                        companyName="Shifa Clinic"
                        activeItem="Staff"
                        ctaLabel="Add Staff"
                    />
                </div>

                <div className="flex flex-1 items-center justify-center px-6">
                    <div className="flex max-w-md items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                        <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
                        <p className="text-sm text-red-700">
                            {error?.response?.data?.message ||
                                error?.message ||
                                "Staff member not found."}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    const fullName = `${staff.first_name || ""} ${staff.last_name || ""}`.trim();
    const initials = fullName
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    const statusLabel = staff.status
        ? staff.status.charAt(0).toUpperCase() + staff.status.slice(1)
        : "Unknown";

    const isActive = Boolean(staff.is_active);

    const services = staff.services || [];
    const availability = staff.availability || [];

    const todayDayIndex = new Date().getDay();
    const todayAvailability = availability.find(
        (a) => a.day_of_week === todayDayIndex
    );

    const weeklyHoursMap = DAY_NAMES.map((dayName, index) => {
        const day = availability.find((a) => a.day_of_week === index);

        if (!day || !day.is_working) {
            return { day: dayName, hours: "OFF" };
        }

        return {
            day: dayName,
            hours: `${day.start_time?.slice(0, 5) || ""} – ${
                day.end_time?.slice(0, 5) || ""
            }`,
            isToday: index === todayDayIndex,
        };
    });

    return (
        <div className="flex min-h-screen bg-beige">
            <div className="hidden lg:block lg:flex-shrink-0">
                <Sidebar
                    companyName="Shifa Clinic"
                    activeItem="Staff"
                    ctaLabel="Add Staff"
                />
            </div>

            {sidebarOpen && (
                <>
                    <button
                        type="button"
                        onClick={() => setSidebarOpen(false)}
                        className="fixed inset-0 z-30 bg-navy/50 lg:hidden"
                        aria-label="Close menu"
                    />

                    <div className="fixed left-0 top-0 z-40 h-screen w-64 overflow-y-auto lg:hidden">
                        <Sidebar
                            companyName="Shifa Clinic"
                            activeItem="Staff"
                            ctaLabel="Add Staff"
                        />
                    </div>
                </>
            )}

            <div className="flex min-w-0 flex-1 flex-col">
                <Topbar
                    onMenuClick={() => setSidebarOpen(true)}
                    showBell
                    hasNotification
                    showHelp
                    showProfileDropdown
                    searchPlaceholder="Search appointments, staff..."
                />

                <main className="flex-1 bg-beige px-3 py-4 sm:px-4 sm:py-5 md:px-6 lg:px-8 lg:py-6">
                    <div className="mb-3 flex items-center gap-2 text-sm">
                        <Link
                            to="/company/staff"
                            className="text-slate transition hover:text-navy"
                        >
                            Staff
                        </Link>

                        <ChevronRight className="h-3.5 w-3.5 text-gray" />

                        <span className="truncate font-bold text-navy">
                            {fullName}
                        </span>
                    </div>

                    <div className="mb-5 flex flex-col gap-4 sm:mb-6 lg:mb-7 lg:flex-row lg:items-start lg:justify-between">
                        <div className="flex items-start gap-3 sm:gap-5">
                            <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray/20 sm:h-20 sm:w-20 lg:h-24 lg:w-24">
                                {staff.photo_path ? (
                                    <img
                                        src={staff.photo_path}
                                        alt={fullName}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <span className="font-serif text-lg font-bold text-navy sm:text-xl lg:text-2xl">
                                        {initials}
                                    </span>
                                )}
                            </div>

                            <div className="min-w-0">
                                <h1 className="font-serif text-xl text-navy sm:text-2xl lg:text-3xl">
                                    {fullName}
                                </h1>

                                <div className="mt-1.5 flex flex-wrap items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-slate sm:gap-2 sm:text-sm">
                                    <span>{staff.role?.name || "No role"}</span>

                                    <span className="text-gray">•</span>

                                    <span>{staff.staff_id}</span>
                                </div>

                                <div className="mt-2.5 flex flex-wrap gap-2">
                                    <span className="flex items-center gap-1.5 rounded-full border border-gray/30 bg-white px-2.5 py-1 text-[10px] font-bold uppercase text-navy sm:px-3 sm:py-1.5 sm:text-xs">
                                        <span
                                            className={`h-2 w-2 rounded-full ${
                                                isActive ? "bg-green-500" : "bg-gray-400"
                                            }`}
                                        ></span>
                                        {statusLabel}
                                    </span>

                                    {todayAvailability?.is_working && (
                                        <span className="rounded-full bg-gold/20 px-2.5 py-1 text-[10px] font-bold uppercase text-amber-700 sm:px-3 sm:py-1.5 sm:text-xs">
                                            AVAILABLE TODAY
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3">
                            <button
                                type="button"
                                onClick={() =>
                                    navigate(`/company/staff/${staffId}/availability`)
                                }
                                className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray bg-white px-4 py-2.5 text-sm font-bold text-navy transition hover:border-navy sm:w-auto sm:px-5"
                            >
                                <CalendarClock className="h-4 w-4" />
                                Manage Availability
                            </button>

                            <button
                                type="button"
                                onClick={() =>
                                    navigate(`/company/staff/${staffId}/edit`)
                                }
                                className="flex w-full items-center justify-center gap-2 rounded-lg bg-navy px-4 py-2.5 text-sm font-bold text-white transition hover:bg-gold hover:text-navy sm:w-auto sm:px-5"
                            >
                                <Pencil className="h-4 w-4" />
                                Edit Staff
                            </button>
                        </div>
                    </div>

                    <div className="grid auto-rows-fr grid-cols-1 gap-4 md:gap-5 lg:grid-cols-3 lg:gap-6">
                        <div className="flex flex-col gap-4 md:gap-5 lg:col-span-2 lg:gap-6">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:gap-6">
                                <div className="rounded-xl border border-gray/20 bg-white p-4 shadow-sm sm:p-5 lg:p-6">
                                    <div className="mb-3 flex items-center gap-2 sm:mb-4">
                                        <CircleUser className="h-[18px] w-[18px] text-slate" />

                                        <h2 className="font-serif text-lg text-navy sm:text-xl">
                                            Personal Information
                                        </h2>
                                    </div>

                                    <div className="mb-4 border-b border-gray/20"></div>

                                    <div className="space-y-3.5">
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wide text-gray">
                                                Full Name
                                            </p>
                                            <p className="mt-1 text-sm font-bold text-navy">
                                                {fullName}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wide text-gray">
                                                Phone
                                            </p>
                                            <p className="mt-1 text-sm font-bold text-navy">
                                                {staff.phone || "—"}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wide text-gray">
                                                Email
                                            </p>
                                            <p className="mt-1 break-all text-sm font-bold text-navy">
                                                {staff.account_email || "—"}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wide text-gray">
                                                Staff ID
                                            </p>
                                            <span className="mt-1 inline-block rounded bg-gray/10 px-2 py-1 text-xs font-bold text-navy">
                                                {staff.staff_id}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="rounded-xl border border-gray/20 bg-white p-4 shadow-sm sm:p-5 lg:p-6">
                                    <div className="mb-3 flex items-center gap-2 sm:mb-4">
                                        <Briefcase className="h-[18px] w-[18px] text-slate" />

                                        <h2 className="font-serif text-lg text-navy sm:text-xl">
                                            Professional Profile
                                        </h2>
                                    </div>

                                    <div className="mb-4 border-b border-gray/20"></div>

                                    <div className="mb-3.5">
                                        <p className="text-xs font-bold uppercase tracking-wide text-gray">
                                            Role
                                        </p>
                                        <p className="mt-1 text-sm font-bold text-navy">
                                            {staff.role?.name || "—"}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-gray">
                                            Services
                                        </p>

                                        {services.length > 0 ? (
                                            <div className="flex flex-wrap gap-2">
                                                {services.map((service) => (
                                                    <span
                                                        key={service.id}
                                                        className="rounded-full border border-gray/40 bg-white px-2.5 py-1 text-xs font-bold text-navy sm:px-3 sm:py-1.5"
                                                    >
                                                        {service.name}
                                                    </span>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-xs text-slate">
                                                No services assigned.
                                            </p>
                                        )}
                                    </div>

                                    <div className="mb-3.5 mt-3.5">
                                        <p className="text-xs font-bold uppercase tracking-wide text-gray">
                                            Joined
                                        </p>
                                        <p className="mt-1 text-sm font-bold text-navy">
                                            {staff.created_at
                                                ? new Date(
                                                      staff.created_at
                                                  ).toLocaleDateString("en-US", {
                                                      day: "numeric",
                                                      month: "long",
                                                      year: "numeric",
                                                  })
                                                : "—"}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wide text-gray">
                                            Account Status
                                        </p>
                                        <div className="mt-1 flex items-center gap-1.5">
                                            <CheckCircle2
                                                className={`h-3.5 w-3.5 ${
                                                    isActive
                                                        ? "text-green-600"
                                                        : "text-gray-400"
                                                }`}
                                            />
                                            <span className="text-sm font-bold text-navy">
                                                {statusLabel}
                                                {staff.email_verified_at
                                                    ? " & Verified"
                                                    : ""}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-xl border border-gray/20 bg-white p-4 shadow-sm sm:p-5 lg:p-6">
                                <div className="mb-4 flex items-center justify-between gap-3">
                                    <div className="flex items-center gap-2">
                                        <CalendarDays className="h-[18px] w-[18px] text-slate" />

                                        <h2 className="font-serif text-lg text-navy sm:text-xl">
                                            Upcoming Appointments
                                        </h2>
                                    </div>

                                    <Link
                                        to="/company/appointments"
                                        className="flex items-center gap-1 text-xs font-bold text-navy hover:underline sm:text-sm"
                                    >
                                        View All
                                        <ArrowRight className="h-3.5 w-3.5" />
                                    </Link>
                                </div>

                                <p className="py-6 text-center text-sm text-slate">
                                    Appointment feed not yet wired to this page.
                                </p>
                            </div>

                            <div className="rounded-xl border border-gray/20 bg-white p-4 shadow-sm sm:p-5 lg:p-6">
                                <div className="mb-4 flex flex-col gap-3 sm:mb-5 sm:flex-row sm:items-center sm:justify-between">
                                    <div className="flex items-center gap-2">
                                        <TrendingUp className="h-[18px] w-[18px] text-slate" />

                                        <h2 className="font-serif text-lg text-navy sm:text-xl">
                                            Appointment Activity
                                        </h2>
                                    </div>

                                    <div className="flex w-fit items-center gap-1 rounded-lg bg-gray/10 p-1">
                                        {["7", "30", "90"].map((range) => (
                                            <button
                                                key={range}
                                                type="button"
                                                onClick={() => setChartRange(range)}
                                                className={
                                                    chartRange === range
                                                        ? "rounded-md bg-white px-2.5 py-1.5 text-[10px] font-bold text-navy shadow-sm sm:px-3 sm:text-xs"
                                                        : "rounded-md px-2.5 py-1.5 text-[10px] font-bold text-slate sm:px-3 sm:text-xs"
                                                }
                                            >
                                                {range} DAYS
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="h-[220px] w-full sm:h-[260px] lg:h-[280px]">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <AreaChart
                                            data={[]}
                                            margin={{
                                                top: 10,
                                                right: 10,
                                                left: 0,
                                                bottom: 0,
                                            }}
                                        >
                                            <defs>
                                                <linearGradient
                                                    id="appointmentAreaGradient"
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
                                                vertical={false}
                                                stroke="#E4E2DD"
                                            />

                                            <XAxis
                                                dataKey="day"
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{
                                                    fill: "#43474E",
                                                    fontSize: 12,
                                                }}
                                            />

                                            <YAxis
                                                domain={[0, 20]}
                                                ticks={[0, 5, 10, 15, 20]}
                                                axisLine={false}
                                                tickLine={false}
                                                tick={{
                                                    fill: "#43474E",
                                                    fontSize: 12,
                                                }}
                                            />

                                            <Tooltip
                                                contentStyle={{
                                                    border: "1px solid #C3C6CF",
                                                    borderRadius: "8px",
                                                    fontSize: "12px",
                                                }}
                                                labelStyle={{
                                                    color: "#000C1E",
                                                    fontWeight: "700",
                                                }}
                                            />

                                            <Area
                                                type="monotone"
                                                dataKey="count"
                                                stroke="#000C1E"
                                                strokeWidth={2.5}
                                                fill="url(#appointmentAreaGradient)"
                                                dot={{
                                                    fill: "#FED488",
                                                    stroke: "#FED488",
                                                    r: 5,
                                                }}
                                                activeDot={{
                                                    fill: "#FED488",
                                                    stroke: "#000C1E",
                                                    strokeWidth: 2,
                                                    r: 6,
                                                }}
                                            />
                                        </AreaChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>

                        <div className="flex h-full flex-col gap-4 md:gap-5 lg:gap-6">
                            <div className="relative rounded-xl bg-navy p-4 text-white sm:p-5 lg:p-6">
                                <p className="mb-2 text-xs font-bold uppercase tracking-wide text-white/60">
                                    Today's Availability
                                </p>

                                <h2 className="font-serif text-xl text-white sm:text-2xl">
                                    {new Date().toLocaleDateString("en-US", {
                                        weekday: "long",
                                        day: "numeric",
                                        month: "short",
                                    })}
                                </h2>

                                <p className="mt-1 text-sm text-white/70">
                                    {todayAvailability?.is_working
                                        ? `${todayAvailability.start_time?.slice(0, 5)} – ${todayAvailability.end_time?.slice(0, 5)}`
                                        : "Not available"}
                                </p>

                                <div className="mt-4 flex items-center justify-between">
                                    <span
                                        className={`rounded-full px-3 py-1.5 text-xs font-bold uppercase ${
                                            todayAvailability?.is_working
                                                ? "bg-gold text-navy"
                                                : "bg-white/20 text-white"
                                        }`}
                                    >
                                        {todayAvailability?.is_working
                                            ? "Available"
                                            : "Off"}
                                    </span>

                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                                        <CalendarPlus className="h-4 w-4 text-white" />
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-xl border border-gray/20 bg-white p-4 shadow-sm sm:p-5 lg:p-6">
                                <div className="mb-3 flex items-center gap-2 sm:mb-4">
                                    <CalendarRange className="h-[18px] w-[18px] text-slate" />

                                    <h2 className="font-serif text-lg text-navy sm:text-xl">
                                        Weekly Hours
                                    </h2>
                                </div>

                                <div className="mb-2 border-b border-gray/20"></div>

                                <div>
                                    {weeklyHoursMap.map((item, index) => (
                                        <div
                                            key={item.day}
                                            className={`flex items-center justify-between gap-3 border-b border-gray/10 py-2.5 ${
                                                index === weeklyHoursMap.length - 1
                                                    ? "border-b-0"
                                                    : ""
                                            } ${
                                                item.isToday
                                                    ? "border-l-4 border-navy bg-beige/30 pl-2.5"
                                                    : ""
                                            }`}
                                        >
                                            <span
                                                className={
                                                    item.isToday
                                                        ? "text-xs font-bold text-navy sm:text-sm"
                                                        : "text-xs text-slate sm:text-sm"
                                                }
                                            >
                                                {item.day}
                                            </span>

                                            <span
                                                className={
                                                    item.hours === "OFF"
                                                        ? "text-xs font-bold text-gray sm:text-sm"
                                                        : "text-xs text-navy sm:text-sm"
                                                }
                                            >
                                                {item.hours}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-xl border border-gray/20 bg-white p-4 shadow-sm sm:p-5 lg:p-6">
                                <div className="mb-3 flex items-center gap-2 sm:mb-4">
                                    <Scissors className="h-[18px] w-[18px] text-slate" />

                                    <h2 className="font-serif text-lg text-navy sm:text-xl">
                                        Assigned Services
                                    </h2>
                                </div>

                                <div className="mb-1 border-b border-gray/20"></div>

                                {services.length > 0 ? (
                                    <div>
                                        {services.map((service, index) => (
                                            <div
                                                key={service.id}
                                                className={`flex items-start justify-between gap-4 py-3 ${
                                                    index === services.length - 1
                                                        ? ""
                                                        : "border-b border-gray/10"
                                                }`}
                                            >
                                                <div className="min-w-0">
                                                    <p className="text-sm font-bold text-navy">
                                                        {service.name}
                                                    </p>

                                                    {service.category?.name && (
                                                        <p className="mt-1 text-xs uppercase text-gray">
                                                            {service.category.name}
                                                        </p>
                                                    )}
                                                </div>

                                                <span className="flex-shrink-0 rounded bg-gray/10 px-2.5 py-1 text-xs font-bold text-navy">
                                                    {service.duration} min
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="py-4 text-center text-sm text-slate">
                                        No services assigned.
                                    </p>
                                )}
                            </div>

                            <div className="flex flex-1 flex-col rounded-xl border border-gray/20 bg-white p-4 shadow-sm sm:p-5 lg:p-6">
                                <div className="mb-3 flex items-center gap-2 sm:mb-4">
                                    <History className="h-[18px] w-[18px] text-slate" />

                                    <h2 className="font-serif text-lg text-navy sm:text-xl">
                                        Recent Activity
                                    </h2>
                                </div>

                                <div className="mb-4 border-b border-gray/20"></div>

                                <p className="py-4 text-center text-sm text-slate">
                                    No activity log available yet.
                                </p>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default StaffDetails;