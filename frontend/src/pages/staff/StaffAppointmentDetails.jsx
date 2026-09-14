import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    ChevronRight,
    CheckCircle2,
    Timer,
    Pencil,
    MapPin,
    Check,
    Banknote,
} from "lucide-react";

import StaffSidebar from "../../components/staff/StaffSidebar";
import StaffTopbar from "../../components/staff/StaffTopbar";

function StaffAppointmentDetails() {
    const { appointmentId } = useParams();
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);

    /* TODO: Replace seed with axios GET /api/staff/appointments/:appointmentId */
    const [appointment, setAppointment] = useState({
        id: "APT-20260821-1042",
        date: "2026-08-21",
        time: "10:00 AM",
        status: "confirmed",
        durationMinutes: 30,
        service: "Follow-up Consultation",
        bookedVia: "Online Booking (19 Aug 2026)",
        notes:
            "Customer requested a follow-up consultation regarding previous treatment.",
        location: {
            name: "Shifa Clinic",
            room: "Main Consulting Room A",
        },
        customer: {
            id: "cust-hina-malik",
            name: "Hina Malik",
            phone: "+92 300 1234567",
        },
        payment: {
            status: "pending",
            method: "Cash on Reception",
        },
        recentVisits: [
            {
                id: "apt-prev-1",
                label: "Initial Consultation",
                date: "14 Aug 2026",
                completed: true,
            },
        ],
    });

    const [isEditingNotes, setIsEditingNotes] = useState(false);
    const [notesDraft, setNotesDraft] = useState(appointment.notes);

    useEffect(() => {
        // TODO: axios GET /api/staff/appointments/:appointmentId
    }, [appointmentId]);

    function getStatusStyle(status) {
        const normalized = String(status || "").toLowerCase();

        if (normalized === "confirmed") {
            return {
                bg: "bg-gold/10",
                border: "border-gold",
                text: "text-navy",
                icon: "text-gold",
            };
        }

        if (normalized === "completed") {
            return {
                bg: "bg-green-50",
                border: "border-green-600/40",
                text: "text-green-700",
                icon: "text-green-600",
            };
        }

        if (normalized === "cancelled") {
            return {
                bg: "bg-red-50",
                border: "border-red-500/40",
                text: "text-red-600",
                icon: "text-red-500",
            };
        }

        if (normalized === "pending") {
            return {
                bg: "bg-gray/10",
                border: "border-gray/40",
                text: "text-slate",
                icon: "text-slate",
            };
        }

        return {
            bg: "bg-gray/10",
            border: "border-gray/30",
            text: "text-slate",
            icon: "text-slate",
        };
    }

    const statusStyle = getStatusStyle(appointment.status);

    function formatHeaderDate(dateString) {
        const date = new Date(dateString);

        return date.toLocaleDateString("en-US", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    }

    function getInitials(name) {
        return name
            .split(" ")
            .map((word) => word.charAt(0))
            .slice(0, 2)
            .join("")
            .toUpperCase();
    }

    function handleSaveNotes() {
        setAppointment((previous) => ({
            ...previous,
            notes: notesDraft,
        }));

        setIsEditingNotes(false);

        // TODO: axios PUT /api/staff/appointments/:id/notes
    }

    function handleCancelEditNotes() {
        setNotesDraft(appointment.notes);
        setIsEditingNotes(false);
    }

    function handleMarkCompleted() {
        setAppointment((previous) => ({
            ...previous,
            status: "completed",
        }));

        // TODO: axios PATCH /api/staff/appointments/:id/complete
    }

    function handleReschedule() {
        // TODO: navigate or open reschedule flow, then axios PATCH
        navigate(`/staff/appointments/${appointmentId}/reschedule`);
    }

    function handleCancelAppointment() {
        const confirmed = window.confirm(
            "Are you sure you want to cancel this appointment?"
        );

        if (!confirmed) {
            return;
        }

        setAppointment((previous) => ({
            ...previous,
            status: "cancelled",
        }));

        // TODO: axios PATCH /api/staff/appointments/:id/cancel
    }

    function handleSignOut() {
        navigate("/login");
    }

    const isTerminal =
        appointment.status === "completed" ||
        appointment.status === "cancelled";

    return (
        <div className="flex min-h-screen bg-beige">

            {/* Sidebar — desktop always visible, mobile slide-in drawer */}
            <StaffSidebar
                companyName="Shifa Clinic"
                currentStaff={{
                    name: "Dr. Sara Ahmed",
                    role: "Doctor",
                    avatarUrl: "",
                }}
                activeItem="Appointments"
                handleSignOut={handleSignOut}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            {/* Main Area */}
            <div className="flex min-w-0 flex-1 flex-col">

                <StaffTopbar
                    avatarUrl=""
                    onMenuClick={() => setSidebarOpen(true)}
                    onSearchClick={() => {}}
                    onNotificationsClick={() =>
                        navigate("/staff/notifications")
                    }
                    onSettingsClick={() => navigate("/staff/settings")}
                />

                <main className="flex-1 bg-beige px-4 py-6 sm:px-6 md:px-8">

                    {/* Breadcrumb */}
                    <div className="mb-2 flex items-center gap-2">

                        <Link
                            to="/staff/appointments"
                            className="text-sm text-slate transition hover:text-navy"
                        >
                            Appointments
                        </Link>

                        <ChevronRight className="h-3 w-3 text-gray" />

                        <span className="text-sm font-bold text-navy">
                            Appointment Details
                        </span>

                    </div>

                    {/* Header */}
                    <div className="mb-1 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">

                        <div>
                            <h1 className="font-serif text-2xl text-navy sm:text-3xl md:text-4xl lg:text-5xl">
                                Appointment Details
                            </h1>

                            <p className="mt-2 text-sm text-slate">
                                {formatHeaderDate(appointment.date)} •{" "}
                                {appointment.time}
                            </p>
                        </div>

                        <span
                            className={`
                                inline-flex items-center gap-2 self-start rounded-lg border
                                px-4 py-2 text-sm font-bold
                                ${statusStyle.bg} ${statusStyle.border} ${statusStyle.text}
                            `}
                        >
                            <CheckCircle2
                                className={`h-4 w-4 ${statusStyle.icon}`}
                            />
                            {appointment.status.charAt(0).toUpperCase() +
                                appointment.status.slice(1)}
                        </span>

                    </div>

                    {/* Main Grid */}
                    <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">

                        {/* LEFT COLUMN */}
                        <div className="flex flex-col gap-6">

                            {/* Card A — Overview */}
                            <div className="rounded-xl border border-gray/20 bg-white p-5 shadow-sm sm:p-6 md:p-7">

                                <h2 className="font-serif text-xl text-navy sm:text-2xl">
                                    Overview
                                </h2>

                                <div className="mt-4 border-b border-gray/20" />

                                <div className="mt-5 grid grid-cols-1 gap-x-8 gap-y-6 md:grid-cols-2">

                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                            Appointment ID
                                        </p>
                                        <p className="mt-1 text-sm font-bold text-navy break-all">
                                            {appointment.id}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                            Duration
                                        </p>
                                        <p className="mt-1 flex items-center gap-1.5 text-sm text-navy">
                                            <Timer className="h-3.5 w-3.5 text-slate" />
                                            {appointment.durationMinutes} minutes
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                            Service
                                        </p>
                                        <p className="mt-1 text-sm text-navy">
                                            {appointment.service}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                            Booked Via
                                        </p>
                                        <p className="mt-1 text-sm text-navy">
                                            {appointment.bookedVia}
                                        </p>
                                    </div>

                                </div>

                            </div>

                            {/* Card B — Appointment Notes */}
                            <div className="rounded-xl border border-gray/20 bg-white p-5 shadow-sm sm:p-6 md:p-7">

                                <div className="mb-4 flex items-center justify-between">

                                    <h2 className="font-serif text-xl text-navy sm:text-2xl">
                                        Appointment Notes
                                    </h2>

                                    {!isEditingNotes && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setNotesDraft(appointment.notes);
                                                setIsEditingNotes(true);
                                            }}
                                            className="cursor-pointer text-slate transition hover:text-navy"
                                            aria-label="Edit notes"
                                        >
                                            <Pencil className="h-[18px] w-[18px]" />
                                        </button>
                                    )}

                                </div>

                                {isEditingNotes ? (
                                    <>
                                        <textarea
                                            rows="3"
                                            value={notesDraft}
                                            onChange={(event) =>
                                                setNotesDraft(event.target.value)
                                            }
                                            className="
                                                w-full rounded-lg border border-gray
                                                px-4 py-3 text-sm text-navy
                                                outline-none focus:border-navy
                                            "
                                        />

                                        <div className="mt-3 flex flex-wrap gap-3">
                                            <button
                                                type="button"
                                                onClick={handleSaveNotes}
                                                className="rounded-lg bg-navy px-5 py-2.5 text-sm font-bold text-white transition hover:bg-gold hover:text-navy"
                                            >
                                                Save
                                            </button>

                                            <button
                                                type="button"
                                                onClick={handleCancelEditNotes}
                                                className="rounded-lg border border-gray bg-white px-5 py-2.5 text-sm font-bold text-navy transition hover:border-navy"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <div className="rounded-lg bg-beige/40 p-4">
                                        <p className="text-sm italic text-navy">
                                            &ldquo;{appointment.notes}&rdquo;
                                        </p>
                                    </div>
                                )}

                            </div>

                            {/* Card C — Location */}
                            <div className="flex items-center gap-4 rounded-xl border border-gray/20 bg-white p-5 shadow-sm sm:p-6">

                                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-beige/60">
                                    <MapPin className="h-5 w-5 text-navy" />
                                </div>

                                <div className="min-w-0">
                                    <p className="font-serif text-lg text-navy sm:text-xl">
                                        {appointment.location.name}
                                    </p>
                                    <p className="mt-0.5 text-sm text-slate">
                                        {appointment.location.room}
                                    </p>
                                </div>

                            </div>

                        </div>

                        {/* RIGHT COLUMN */}
                        <div className="flex flex-col gap-6">

                            {/* Card D — Actions */}
                            <div className="rounded-xl border border-gray/20 bg-white p-5 shadow-sm sm:p-6">

                                {!isTerminal && (
                                    <button
                                        type="button"
                                        onClick={handleMarkCompleted}
                                        className="
                                            mb-3 flex w-full items-center justify-center gap-2
                                            rounded-lg bg-gold px-5 py-3 text-sm font-bold
                                            text-navy transition hover:bg-navy hover:text-white
                                        "
                                    >
                                        <Check className="h-4 w-4" />
                                        Mark Completed
                                    </button>
                                )}

                                {!isTerminal && (
                                    <div className="grid grid-cols-2 gap-3">

                                        <button
                                            type="button"
                                            onClick={handleReschedule}
                                            className="
                                                rounded-lg border-2 border-navy bg-white
                                                px-4 py-2.5 text-sm font-bold text-navy
                                                transition hover:bg-navy hover:text-white
                                            "
                                        >
                                            Reschedule
                                        </button>

                                        <button
                                            type="button"
                                            onClick={handleCancelAppointment}
                                            className="
                                                rounded-lg border-2 border-red-500 bg-white
                                                px-4 py-2.5 text-sm font-bold text-red-600
                                                transition hover:bg-red-500 hover:text-white
                                            "
                                        >
                                            Cancel
                                        </button>

                                    </div>
                                )}

                                {isTerminal && (
                                    <p className="text-sm text-slate">
                                        No actions available for a{" "}
                                        <span className="font-bold text-navy">
                                            {appointment.status}
                                        </span>{" "}
                                        appointment.
                                    </p>
                                )}

                            </div>

                            {/* Card E — Customer Profile */}
                            <div className="rounded-xl border border-gray/20 bg-white p-5 shadow-sm sm:p-6">

                                <h2 className="font-serif text-xl text-navy sm:text-2xl">
                                    Customer Profile
                                </h2>

                                <div className="mt-4 border-b border-gray/20" />

                                <div className="mt-5 text-center">

                                    <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-lg bg-navy">
                                        <span className="font-serif text-2xl text-white">
                                            {getInitials(appointment.customer.name)}
                                        </span>
                                    </div>

                                    <p className="font-serif text-xl text-navy">
                                        {appointment.customer.name}
                                    </p>

                                    <p className="mt-1 text-sm text-slate">
                                        {appointment.customer.phone}
                                    </p>

                                    <Link
                                        to={`/staff/customers/${appointment.customer.id}`}
                                        className="
                                            mt-4 inline-flex w-full items-center justify-center
                                            rounded-lg border-2 border-navy bg-white
                                            px-4 py-2.5 text-sm font-bold text-navy
                                            transition hover:bg-navy hover:text-white
                                        "
                                    >
                                        View Customer Details
                                    </Link>

                                </div>

                            </div>

                            {/* Card F — Payment */}
                            <div className="rounded-xl border border-gray/20 bg-white p-5 shadow-sm sm:p-6">

                                <div className="mb-3 flex items-center justify-between">

                                    <h2 className="font-serif text-xl text-navy sm:text-2xl">
                                        Payment
                                    </h2>

                                    <span
                                        className={`
                                            rounded-full px-3 py-1 text-xs font-bold
                                            ${
                                                appointment.payment.status === "paid"
                                                    ? "bg-green-50 text-green-700"
                                                    : "bg-gray/10 text-slate"
                                            }
                                        `}
                                    >
                                        {appointment.payment.status.charAt(0).toUpperCase() +
                                            appointment.payment.status.slice(1)}
                                    </span>

                                </div>

                                <div className="flex items-center gap-2">
                                    <Banknote className="h-4 w-4 text-navy" />
                                    <span className="text-sm text-navy">
                                        {appointment.payment.method}
                                    </span>
                                </div>

                            </div>

                            {/* Card G — Recent Visits */}
                            <div className="rounded-xl border border-gray/20 bg-white p-5 shadow-sm sm:p-6">

                                <h2 className="font-serif text-xl text-navy sm:text-2xl">
                                    Recent Visits
                                </h2>

                                <div className="mt-4 border-b border-gray/20" />

                                <div className="mt-1">

                                    {appointment.recentVisits.map((visit, index) => (
                                        <Link
                                            key={visit.id}
                                            to={`/staff/appointments/${visit.id}`}
                                            className={`
                                                flex items-center justify-between py-2.5
                                                ${
                                                    index !==
                                                    appointment.recentVisits.length - 1
                                                        ? "border-b border-gray/20"
                                                        : ""
                                                }
                                            `}
                                        >
                                            <div className="min-w-0">
                                                <p className="text-sm font-bold text-navy truncate">
                                                    {visit.label}
                                                </p>
                                                <p className="mt-0.5 text-xs text-slate">
                                                    {visit.date}
                                                </p>
                                            </div>

                                            {visit.completed && (
                                                <CheckCircle2 className="h-4.5 w-4.5 flex-shrink-0 text-navy" />
                                            )}
                                        </Link>
                                    ))}

                                </div>

                            </div>

                        </div>

                    </div>

                </main>

            </div>

        </div>
    );
}

export default StaffAppointmentDetails;