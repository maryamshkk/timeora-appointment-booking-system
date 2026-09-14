import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Plus,
    ChevronLeft,
    ChevronRight,
    ChevronDown,
    Loader2,
    AlertCircle,
} from "lucide-react";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import { useCompanyCalendar } from "../../hooks/company/useAppointments";

const START_HOUR = 8;
const END_HOUR = 18;
const SLOT_HEIGHT = 60;

function getStartOfWeek(date) {
    const result = new Date(date);
    const day = result.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    result.setDate(result.getDate() + diff);
    result.setHours(0, 0, 0, 0);
    return result;
}

function getEndOfWeek(date) {
    const start = getStartOfWeek(date);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return end;
}

function toIsoDate(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
        2,
        "0"
    )}-${String(date.getDate()).padStart(2, "0")}`;
}

function getMinutes(time) {
    if (!time) return 0;
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + (minutes || 0);
}

function getBlockStyle(startTime, endTime) {
    const startMinutes = getMinutes(startTime);
    const endMinutes = getMinutes(endTime);
    const baseMinutes = START_HOUR * 60;

    return {
        top: `${startMinutes - baseMinutes}px`,
        height: `${Math.max(endMinutes - startMinutes, 20)}px`,
    };
}

function normalizeStatus(status) {
    if (!status) return "pending";
    const lower = status.toLowerCase();
    if (lower === "accepted") return "confirmed";
    return lower;
}

function getStatusColor(status) {
    const colors = {
        confirmed: "border-l-navy bg-navy/5",
        pending: "border-l-gold bg-gold/15",
        completed: "border-l-gray bg-gray/15",
        cancelled: "border-l-red-500 bg-red-50",
        rejected: "border-l-red-500 bg-red-50",
    };
    return colors[status] || "border-l-gray bg-gray/10";
}

function getCurrentTimePosition() {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const startMinutes = START_HOUR * 60;
    const endMinutes = END_HOUR * 60;

    if (currentMinutes < startMinutes || currentMinutes > endMinutes) {
        return null;
    }

    return currentMinutes - startMinutes;
}

function formatDateRange(startDate, endDate) {
    const start = startDate.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
    });
    const end = endDate.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });
    return `${start} – ${end}`;
}

function formatDayDate(date) {
    return date.toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
    });
}

function isToday(date) {
    const today = new Date();
    return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    );
}

function CalendarSchedule() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [viewMode, setViewMode] = useState("week");
    const [currentDate, setCurrentDate] = useState(new Date());
    const [staffFilter, setStaffFilter] = useState("all");
    const [serviceFilter, setServiceFilter] = useState("all");
    const [selectedAppointment, setSelectedAppointment] = useState(null);

    const navigate = useNavigate();

    const weekStart = getStartOfWeek(currentDate);
    const weekEnd = getEndOfWeek(currentDate);

    const rangeStart = viewMode === "week" ? weekStart : currentDate;
    const rangeEnd = viewMode === "week" ? weekEnd : currentDate;

    const {
        data: calendarResponse,
        isLoading,
        isError,
        error,
    } = useCompanyCalendar({
        start: toIsoDate(rangeStart),
        end: toIsoDate(rangeEnd),
    });

    const rawAppointments = calendarResponse?.data || [];

    const appointments = useMemo(() => {
        return rawAppointments.map((appointment) => ({
            id: appointment.id,
            date: appointment.appointment_date,
            startTime: appointment.start_time?.slice(0, 5) || "",
            endTime: appointment.end_time?.slice(0, 5) || "",
            customer: appointment.customer?.name || "Unknown",
            service: appointment.service?.name || "",
            staff: appointment.staff
                ? `${appointment.staff.first_name || ""} ${
                      appointment.staff.last_name || ""
                  }`.trim()
                : "",
            status: normalizeStatus(appointment.status),
            raw: appointment,
        }));
    }, [rawAppointments]);

    const visibleDays =
        viewMode === "week"
            ? Array.from({ length: 7 }, (_, index) => {
                  const date = new Date(weekStart);
                  date.setDate(weekStart.getDate() + index);
                  return date;
              })
            : [currentDate];

    const hours = Array.from(
        { length: END_HOUR - START_HOUR + 1 },
        (_, index) => START_HOUR + index
    );

    const staffOptions = useMemo(() => {
        const set = new Set();
        appointments.forEach((a) => a.staff && set.add(a.staff));
        return Array.from(set);
    }, [appointments]);

    const serviceOptions = useMemo(() => {
        const set = new Set();
        appointments.forEach((a) => a.service && set.add(a.service));
        return Array.from(set);
    }, [appointments]);

    const filteredAppointments = appointments.filter((appointment) => {
        const staffMatches =
            staffFilter === "all" || appointment.staff === staffFilter;
        const serviceMatches =
            serviceFilter === "all" || appointment.service === serviceFilter;
        return staffMatches && serviceMatches;
    });

    const currentTimePosition = getCurrentTimePosition();

    const rangeLabel =
        viewMode === "week"
            ? formatDateRange(visibleDays[0], visibleDays[visibleDays.length - 1])
            : formatDayDate(currentDate);

    function handleToday() {
        setCurrentDate(new Date());
    }

    function handlePrev() {
        const date = new Date(currentDate);
        if (viewMode === "week") {
            date.setDate(date.getDate() - 7);
        } else {
            date.setDate(date.getDate() - 1);
        }
        setCurrentDate(date);
    }

    function handleNext() {
        const date = new Date(currentDate);
        if (viewMode === "week") {
            date.setDate(date.getDate() + 7);
        } else {
            date.setDate(date.getDate() + 1);
        }
        setCurrentDate(date);
    }

    return (
        <div className="flex min-h-screen bg-beige">
            <div className="hidden lg:block lg:flex-shrink-0">
                <Sidebar
                    companyName="Shifa Clinic"
                    activeItem="Calendar"
                    ctaLabel="Book Appointment"
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
                            activeItem="Calendar"
                            ctaLabel="Book Appointment"
                        />
                    </div>
                </>
            )}

            <div className="flex min-w-0 flex-1 flex-col">
                <Topbar
                    onMenuClick={() => setSidebarOpen(true)}
                    showBell
                    simpleProfileIcon
                    searchPlaceholder="Search..."
                />

                <main className="flex-1 bg-beige px-3 py-4 sm:px-4 sm:py-5 md:px-6 lg:px-8 lg:py-6">
                    <div className="mb-4 flex flex-col items-start justify-between gap-3 sm:mb-5 md:flex-row md:items-center">
                        <div>
                            <h1 className="font-serif text-2xl text-navy sm:text-3xl">
                                Calendar / Schedule
                            </h1>

                            <p className="mt-1 text-xs text-slate sm:text-sm">
                                Manage appointments, staff schedules, and daily
                                availability.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => navigate("/company/appointments/new")}
                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-navy px-4 py-2.5 text-sm font-bold text-white transition hover:bg-gold hover:text-navy sm:w-auto sm:px-5 sm:py-3"
                        >
                            <Plus className="h-4 w-4" />
                            New Appointment
                        </button>
                    </div>

                    <div className="overflow-hidden rounded-xl border border-gray/20 bg-white shadow-sm">
                        <div className="border-b border-gray/20 p-3 sm:p-4 md:px-5">
                            <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
                                <div className="flex flex-wrap items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={handleToday}
                                        className="rounded-md border border-gray/30 px-3 py-1.5 text-xs font-bold text-navy transition hover:border-gold hover:bg-gold/10 sm:px-4 sm:py-2 sm:text-sm"
                                    >
                                        Today
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handlePrev}
                                        className="flex h-8 w-8 items-center justify-center rounded-md border border-gray/30 text-slate transition hover:border-gold hover:text-navy sm:h-9 sm:w-9"
                                        aria-label="Previous"
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleNext}
                                        className="flex h-8 w-8 items-center justify-center rounded-md border border-gray/30 text-slate transition hover:border-gold hover:text-navy sm:h-9 sm:w-9"
                                        aria-label="Next"
                                    >
                                        <ChevronRight className="h-4 w-4" />
                                    </button>

                                    <h2 className="ml-1 font-serif text-sm text-navy sm:ml-2 sm:text-base md:text-lg">
                                        {rangeLabel}
                                    </h2>
                                </div>

                                <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
                                    <div className="relative w-full sm:w-auto">
                                        <select
                                            value={staffFilter}
                                            onChange={(event) =>
                                                setStaffFilter(event.target.value)
                                            }
                                            className="w-full appearance-none rounded-md border border-gray/30 bg-white py-2 pl-3 pr-9 text-sm text-slate outline-none focus:border-gold focus:ring-1 focus:ring-gold sm:w-auto"
                                        >
                                            <option value="all">All Staff</option>
                                            {staffOptions.map((staff) => (
                                                <option key={staff} value={staff}>
                                                    {staff}
                                                </option>
                                            ))}
                                        </select>

                                        <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />
                                    </div>

                                    <div className="relative w-full sm:w-auto">
                                        <select
                                            value={serviceFilter}
                                            onChange={(event) =>
                                                setServiceFilter(event.target.value)
                                            }
                                            className="w-full appearance-none rounded-md border border-gray/30 bg-white py-2 pl-3 pr-9 text-sm text-slate outline-none focus:border-gold focus:ring-1 focus:ring-gold sm:w-auto"
                                        >
                                            <option value="all">All Services</option>
                                            {serviceOptions.map((service) => (
                                                <option key={service} value={service}>
                                                    {service}
                                                </option>
                                            ))}
                                        </select>

                                        <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />
                                    </div>

                                    <div className="flex w-full items-center rounded-md border border-gray/30 bg-beige p-1 sm:w-auto">
                                        <button
                                            type="button"
                                            onClick={() => setViewMode("day")}
                                            className={`flex-1 rounded px-4 py-1.5 text-xs font-bold uppercase tracking-wide transition sm:flex-none ${
                                                viewMode === "day"
                                                    ? "bg-white text-navy shadow-sm"
                                                    : "text-slate hover:text-navy"
                                            }`}
                                        >
                                            Day
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => setViewMode("week")}
                                            className={`flex-1 rounded px-4 py-1.5 text-xs font-bold uppercase tracking-wide transition sm:flex-none ${
                                                viewMode === "week"
                                                    ? "bg-white text-navy shadow-sm"
                                                    : "text-slate hover:text-navy"
                                            }`}
                                        >
                                            Week
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {isLoading && (
                            <div className="flex items-center justify-center gap-3 py-20">
                                <Loader2 className="h-5 w-5 animate-spin text-navy" />
                                <span className="text-sm text-slate">
                                    Loading calendar...
                                </span>
                            </div>
                        )}

                        {isError && !isLoading && (
                            <div className="flex items-start gap-3 px-5 py-6">
                                <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
                                <p className="text-sm text-red-700">
                                    {error?.response?.data?.message ||
                                        error?.message ||
                                        "Failed to load calendar."}
                                </p>
                            </div>
                        )}

                        {!isLoading && !isError && (
                            <>
                                <div className="overflow-x-auto">
                                    <div
                                        className="min-w-[850px]"
                                        style={{
                                            display: "grid",
                                            gridTemplateColumns:
                                                viewMode === "week"
                                                    ? "64px repeat(7, minmax(120px, 1fr))"
                                                    : "64px minmax(500px, 1fr)",
                                        }}
                                    >
                                        <div className="border-b border-r border-gray/20 bg-white" />

                                        {visibleDays.map((day) => {
                                            const dayName = day.toLocaleDateString(
                                                "en-US",
                                                { weekday: "short" }
                                            );
                                            const dayNumber = day.getDate();

                                            return (
                                                <div
                                                    key={day.toISOString()}
                                                    className={`border-b border-gray/20 px-3 py-3 text-center ${
                                                        isToday(day)
                                                            ? "bg-beige"
                                                            : "bg-white"
                                                    }`}
                                                >
                                                    <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                                        {dayName}
                                                    </p>

                                                    <p
                                                        className={`mt-1 font-serif text-xl ${
                                                            isToday(day)
                                                                ? "text-brown"
                                                                : "text-navy"
                                                        }`}
                                                    >
                                                        {dayNumber}
                                                    </p>
                                                </div>
                                            );
                                        })}

                                        <div className="relative bg-white">
                                            {hours.map((hour) => (
                                                <div
                                                    key={hour}
                                                    className="flex h-[60px] items-start justify-end border-b border-r border-gray/20 pr-2 pt-2"
                                                >
                                                    <span className="text-[11px] text-slate">
                                                        {hour > 12 ? hour - 12 : hour}
                                                        :00{" "}
                                                        {hour >= 12 ? "PM" : "AM"}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>

                                        {visibleDays.map((day) => {
                                            const isoDay = toIsoDate(day);

                                            const dayAppointments =
                                                filteredAppointments.filter(
                                                    (appointment) =>
                                                        appointment.date === isoDay
                                                );

                                            return (
                                                <div
                                                    key={day.toISOString()}
                                                    className="relative"
                                                >
                                                    {hours.map((hour) => (
                                                        <div
                                                            key={hour}
                                                            className="h-[60px] border-b border-r border-gray/20"
                                                        />
                                                    ))}

                                                    <div
                                                        className="pointer-events-none absolute left-0 right-0 bg-gray/10"
                                                        style={{
                                                            top: `${
                                                                (12 - START_HOUR) *
                                                                SLOT_HEIGHT
                                                            }px`,
                                                            height: `${SLOT_HEIGHT}px`,
                                                        }}
                                                    >
                                                        <div className="flex h-full items-center justify-center">
                                                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate/60">
                                                                Lunch Break
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {isToday(day) &&
                                                        currentTimePosition !==
                                                            null && (
                                                            <div
                                                                className="pointer-events-none absolute left-0 right-0 z-20"
                                                                style={{
                                                                    top: `${currentTimePosition}px`,
                                                                }}
                                                            >
                                                                <div className="relative h-px bg-gold">
                                                                    <span className="absolute -left-1 -top-1.5 h-3 w-3 rounded-full bg-gold" />
                                                                </div>
                                                            </div>
                                                        )}

                                                    {dayAppointments.map(
                                                        (appointment) => {
                                                            const blockStyle =
                                                                getBlockStyle(
                                                                    appointment.startTime,
                                                                    appointment.endTime
                                                                );

                                                            const duration =
                                                                getMinutes(
                                                                    appointment.endTime
                                                                ) -
                                                                getMinutes(
                                                                    appointment.startTime
                                                                );

                                                            const isCompact =
                                                                duration <= 30;

                                                            return (
                                                                <div
                                                                    key={appointment.id}
                                                                    onClick={() =>
                                                                        setSelectedAppointment(
                                                                            appointment
                                                                        )
                                                                    }
                                                                    className={`absolute left-1 right-1 cursor-pointer overflow-hidden rounded-md border-l-4 px-2 py-1 shadow-sm transition hover:shadow-md ${getStatusColor(
                                                                        appointment.status
                                                                    )}`}
                                                                    style={blockStyle}
                                                                >
                                                                    {isCompact ? (
                                                                        <div
                                                                            className={`truncate text-xs font-bold ${
                                                                                appointment.status ===
                                                                                "cancelled"
                                                                                    ? "text-red-500 line-through"
                                                                                    : "text-navy"
                                                                            }`}
                                                                        >
                                                                            {
                                                                                appointment.startTime
                                                                            }{" "}
                                                                            ·{" "}
                                                                            {
                                                                                appointment.customer
                                                                            }
                                                                        </div>
                                                                    ) : (
                                                                        <>
                                                                            <p
                                                                                className={`text-xs font-bold ${
                                                                                    appointment.status ===
                                                                                    "cancelled"
                                                                                        ? "text-red-500 line-through"
                                                                                        : "text-navy"
                                                                                }`}
                                                                            >
                                                                                {
                                                                                    appointment.startTime
                                                                                }{" "}
                                                                                –{" "}
                                                                                {
                                                                                    appointment.endTime
                                                                                }
                                                                            </p>

                                                                            <p className="mt-0.5 truncate text-xs font-bold text-navy">
                                                                                {
                                                                                    appointment.customer
                                                                                }
                                                                            </p>

                                                                            {appointment.service && (
                                                                                <p className="truncate text-[11px] text-slate">
                                                                                    {
                                                                                        appointment.service
                                                                                    }
                                                                                    {appointment.staff &&
                                                                                        ` · ${appointment.staff}`}
                                                                                </p>
                                                                            )}
                                                                        </>
                                                                    )}
                                                                </div>
                                                            );
                                                        }
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-3 border-t border-gray/20 px-3 py-3 sm:gap-5 sm:px-5 sm:py-4">
                                    <span className="text-xs font-bold text-navy">
                                        Status
                                    </span>

                                    <div className="flex items-center gap-2">
                                        <span className="h-3 w-3 rounded-sm bg-navy" />
                                        <span className="text-xs text-slate">
                                            Confirmed
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className="h-3 w-3 rounded-sm bg-gold" />
                                        <span className="text-xs text-slate">
                                            Pending
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className="h-3 w-3 rounded-sm bg-gray" />
                                        <span className="text-xs text-slate">
                                            Completed
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <span className="h-3 w-3 rounded-sm bg-red-500" />
                                        <span className="text-xs text-slate">
                                            Cancelled
                                        </span>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {selectedAppointment && (
                        <div className="fixed inset-0 z-50 flex items-center justify-end bg-navy/20">
                            <div className="h-full w-full max-w-md bg-white p-6 shadow-xl">
                                <div className="flex items-start justify-between border-b border-gray/20 pb-5">
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-widest text-slate">
                                            Appointment Details
                                        </p>

                                        <h2 className="mt-1 font-serif text-2xl text-navy">
                                            {selectedAppointment.customer}
                                        </h2>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setSelectedAppointment(null)
                                        }
                                        className="flex h-8 w-8 items-center justify-center rounded-md text-xl text-slate transition hover:bg-beige hover:text-navy"
                                        aria-label="Close"
                                    >
                                        ×
                                    </button>
                                </div>

                                <div className="mt-6 space-y-5">
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                            Time
                                        </p>

                                        <p className="mt-1 text-sm text-navy">
                                            {selectedAppointment.startTime} –{" "}
                                            {selectedAppointment.endTime}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                            Service
                                        </p>

                                        <p className="mt-1 text-sm text-navy">
                                            {selectedAppointment.service ||
                                                "Not specified"}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                            Staff
                                        </p>

                                        <p className="mt-1 text-sm text-navy">
                                            {selectedAppointment.staff ||
                                                "Not assigned"}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                            Status
                                        </p>

                                        <span className="mt-2 inline-flex rounded-full bg-beige px-3 py-1 text-xs font-bold capitalize text-navy">
                                            {selectedAppointment.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="mt-8 flex gap-3">
                                    <button
                                        type="button"
                                        onClick={() =>
                                            navigate(
                                                `/company/appointments/${selectedAppointment.id}`
                                            )
                                        }
                                        className="flex-1 rounded-lg bg-navy py-3 text-sm font-bold text-white transition hover:bg-gold hover:text-navy"
                                    >
                                        View Details
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setSelectedAppointment(null)
                                        }
                                        className="rounded-lg border border-gray/30 px-5 py-3 text-sm font-bold text-slate transition hover:border-navy hover:text-navy"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default CalendarSchedule;