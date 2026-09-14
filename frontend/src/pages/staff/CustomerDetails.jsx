import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    ChevronRight,
    Calendar,
    IdCard,
    Mail,
    Phone,
    Clock,
    User,
    Plus,
} from "lucide-react";

import StaffSidebar from "../../components/staff/StaffSidebar";
import StaffTopbar from "../../components/staff/StaffTopbar";

function StaffCustomerDetails() {
    const { customerId } = useParams();
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);

    /* TODO: Replace seed with axios GET /api/staff/customers/:customerId */
    const [customer, setCustomer] = useState({
        id: "CUS-20260819-1024",
        name: "Hina Malik",
        since: "August 2026",
        contact: {
            email: "hina@example.com",
            phone: "+92 300 1234567",
        },
        stats: {
            total: 12,
            completed: 9,
            upcoming: 2,
            cancelled: 1,
        },
        upcomingAppointments: [
            {
                id: "APT-20260821-1042",
                month: "AUG",
                day: 21,
                status: "confirmed",
                time: "10:00 AM",
                service: "Follow-up Consultation",
                staffName: "Dr. Sara Ahmed",
            },
        ],
        history: [
            {
                id: "apt-h1",
                date: "12 Aug 2026",
                time: "10:00 AM",
                service: "Consultation",
                staffName: "Dr. Sara Ahmed",
                status: "Completed",
            },
            {
                id: "apt-h2",
                date: "28 Jul 2026",
                time: "02:30 PM",
                service: "Therapy Session",
                staffName: "Dr. Ali Khan",
                status: "Completed",
            },
            {
                id: "apt-h3",
                date: "15 Jul 2026",
                time: "11:15 AM",
                service: "Consultation",
                staffName: "Dr. Sara Ahmed",
                status: "Completed",
            },
        ],
        notes: [
            {
                id: "note-1",
                text: "Prefers morning appointments.",
                author: "System",
            },
        ],
        servicesUsed: [
            { name: "Consultation", count: 6 },
            { name: "Follow-up", count: 4 },
            { name: "Therapy Session", count: 2 },
        ],
        recentActivity: [
            {
                id: "act-1",
                label: "TODAY",
                description: "Appointment confirmed",
            },
            {
                id: "act-2",
                label: "19 Aug 2026",
                description: "Appointment booked",
            },
            {
                id: "act-3",
                label: "18 Aug 2026",
                description: "Profile created",
            },
        ],
    });

    const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);
    const [isAddingNote, setIsAddingNote] = useState(false);
    const [newNoteDraft, setNewNoteDraft] = useState("");

    const currentStaff = {
        name: "Dr. Sara Ahmed",
        role: "Senior Physician",
        avatarUrl: "",
        companyName: "Shifa Clinic",
    };

    /* Close the More menu on any outside click or Escape */
    useEffect(() => {
        function handleDocumentClick() {
            setIsMoreMenuOpen(false);
        }

        function handleEscape(event) {
            if (event.key === "Escape") {
                setIsMoreMenuOpen(false);
            }
        }

        document.addEventListener("click", handleDocumentClick);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("click", handleDocumentClick);
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    function getInitials(name) {
        return name
            .split(" ")
            .map((word) => word.charAt(0))
            .slice(0, 2)
            .join("")
            .toUpperCase();
    }

    function handleAddNote() {
        if (!newNoteDraft.trim()) {
            return;
        }

        setCustomer((previous) => ({
            ...previous,
            notes: [
                ...previous.notes,
                {
                    id: `note-${Date.now()}`,
                    text: newNoteDraft.trim(),
                    author: currentStaff.name,
                },
            ],
        }));

        setNewNoteDraft("");
        setIsAddingNote(false);

        // TODO: axios POST /api/staff/customers/:id/notes
    }

    function handleCancelAddNote() {
        setNewNoteDraft("");
        setIsAddingNote(false);
    }

    function handleEditCustomer() {
        setIsMoreMenuOpen(false);
        navigate(`/staff/customers/${customerId}/edit`);
    }

    function handleBlockCustomer() {
        setIsMoreMenuOpen(false);

        const confirmed = window.confirm(
            "Are you sure you want to block this customer? They will no longer be able to book appointments."
        );

        if (!confirmed) {
            return;
        }

        // TODO: axios PATCH /api/staff/customers/:customerId/block
        // Then reflect the new state:
        // setCustomer((prev) => ({ ...prev, blocked: true }));
    }

    function handleViewAllHistory() {
        // TODO: navigate to a full paginated appointment-history view
        navigate(`/staff/customers/${customerId}/history`);
    }

    function handleSignOut() {
        navigate("/login");
    }

    return (
        <div className="flex min-h-screen bg-beige">

            {/* Sidebar — desktop always visible, mobile slide-in drawer */}
            <StaffSidebar
                companyName={currentStaff.companyName}
                currentStaff={currentStaff}
                activeItem="Customers"
                handleSignOut={handleSignOut}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            {/* Main Area */}
            <div className="flex min-w-0 flex-1 flex-col">

                <StaffTopbar
                    avatarUrl={currentStaff.avatarUrl}
                    onMenuClick={() => setSidebarOpen(true)}
                    onSearchClick={() => {}}
                    onNotificationsClick={() =>
                        navigate("/staff/notifications")
                    }
                    onSettingsClick={() => navigate("/staff/settings")}
                />

                <main className="flex-1 bg-beige px-4 py-6 sm:px-6 md:px-8">

                    {/* Breadcrumb */}
                    <div className="mb-4 flex flex-wrap items-center gap-2">

                        <Link
                            to="/staff/customers"
                            className="text-sm text-slate transition hover:text-navy"
                        >
                            Customers
                        </Link>

                        <ChevronRight className="h-3 w-3 text-gray" />

                        <span className="text-sm font-bold text-navy">
                            {customer.name}
                        </span>

                    </div>

                    {/* Main Grid */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">

                        {/* LEFT COLUMN */}
                        <div className="flex flex-col gap-6">

                            {/* Card A — Profile Header */}
                            <div className="flex flex-wrap items-start justify-between gap-4 rounded-xl border border-gray/20 bg-white p-6 shadow-sm">

                                <div className="flex min-w-0 items-center gap-5">

                                    <div className="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-lg bg-navy">
                                        <span className="font-serif text-2xl text-white">
                                            {getInitials(customer.name)}
                                        </span>
                                    </div>

                                    <div className="min-w-0">

                                        <h1 className="font-serif text-2xl text-navy">
                                            {customer.name}
                                        </h1>

                                        <div className="mt-1 flex items-center gap-1.5 text-sm text-slate">
                                            <Calendar className="h-3.5 w-3.5" />
                                            Customer since {customer.since}
                                        </div>

                                        <div className="mt-1 flex items-center gap-1.5 text-sm text-slate">
                                            <IdCard className="h-3.5 w-3.5" />
                                            ID: {customer.id}
                                        </div>

                                    </div>

                                </div>

                                <div className="relative flex flex-col gap-2">

                                    <Link
                                        to={`/staff/appointments?customer=${customer.id}`}
                                        className="
                                            rounded-lg bg-navy px-5 py-2.5
                                            text-sm font-bold text-white transition
                                            hover:bg-gold hover:text-navy
                                        "
                                    >
                                        View Appointments
                                    </Link>

                                    <button
                                        type="button"
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            setIsMoreMenuOpen(!isMoreMenuOpen);
                                        }}
                                        className="
                                            rounded-lg border-2 border-navy bg-white
                                            px-5 py-2.5 text-sm font-bold text-navy
                                            transition hover:bg-navy hover:text-white
                                        "
                                    >
                                        More
                                    </button>

                                    {isMoreMenuOpen && (
                                        <div
                                            onClick={(event) =>
                                                event.stopPropagation()
                                            }
                                            className="
                                                absolute right-0 top-full z-20 mt-2
                                                w-44 rounded-lg border border-gray/20
                                                bg-white p-1.5 shadow-lg
                                            "
                                        >

                                            <button
                                                type="button"
                                                onClick={handleEditCustomer}
                                                className="
                                                    w-full rounded-md px-3 py-2 text-left
                                                    text-sm text-navy transition
                                                    hover:bg-beige
                                                "
                                            >
                                                Edit Customer
                                            </button>

                                            <button
                                                type="button"
                                                onClick={handleBlockCustomer}
                                                className="
                                                    w-full rounded-md px-3 py-2 text-left
                                                    text-sm text-red-600 transition
                                                    hover:bg-red-50
                                                "
                                            >
                                                Block Customer
                                            </button>

                                        </div>
                                    )}

                                </div>

                            </div>

                            {/* Card B — Stat Row */}
                            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">

                                <div className="rounded-xl border border-gray/20 bg-white p-5 shadow-sm">
                                    <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                        Total
                                    </p>
                                    <p className="mt-1.5 text-3xl font-bold text-navy">
                                        {customer.stats.total}
                                    </p>
                                </div>

                                <div className="rounded-xl border border-gray/20 bg-white p-5 shadow-sm">
                                    <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                        Completed
                                    </p>
                                    <p className="mt-1.5 text-3xl font-bold text-navy">
                                        {customer.stats.completed}
                                    </p>
                                </div>

                                <div className="rounded-xl border border-gray/20 bg-white p-5 shadow-sm">
                                    <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                        Upcoming
                                    </p>
                                    <p className="mt-1.5 text-3xl font-bold text-navy">
                                        {customer.stats.upcoming}
                                    </p>
                                </div>

                                <div className="rounded-xl border border-gray/20 bg-white p-5 shadow-sm">
                                    <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                        Cancelled
                                    </p>
                                    <p className="mt-1.5 text-3xl font-bold text-navy">
                                        {customer.stats.cancelled}
                                    </p>
                                </div>

                            </div>

                            {/* Card C — Upcoming Appointments */}
                            <div className="rounded-xl border border-gray/20 bg-white p-6 shadow-sm">

                                <h2 className="mb-4 font-serif text-xl font-bold text-navy sm:text-2xl">
                                    Upcoming Appointments
                                </h2>

                                {customer.upcomingAppointments.length === 0 ? (
                                    <p className="py-6 text-center text-sm text-slate">
                                        No upcoming appointments.
                                    </p>
                                ) : (
                                    <div className="flex flex-col gap-3">

                                        {customer.upcomingAppointments.map(
                                            (appointment) => (
                                                <div
                                                    key={appointment.id}
                                                    className="
                                                        flex flex-wrap items-center
                                                        justify-between gap-3 rounded-lg
                                                        bg-beige/40 p-4
                                                    "
                                                >

                                                    <div className="flex min-w-0 items-center gap-4">

                                                        <div className="flex w-14 flex-shrink-0 flex-col items-center rounded-lg bg-navy px-3 py-2 text-center text-white">
                                                            <span className="text-xs uppercase">
                                                                {appointment.month}
                                                            </span>
                                                            <span className="text-xl font-bold">
                                                                {appointment.day}
                                                            </span>
                                                        </div>

                                                        <div className="min-w-0">

                                                            <div className="flex flex-wrap items-center gap-2">
                                                                <span className="rounded-full border border-gray bg-white px-2.5 py-0.5 text-xs font-bold uppercase text-slate">
                                                                    {appointment.status}
                                                                </span>

                                                                <Clock className="h-3.5 w-3.5 text-slate" />

                                                                <span className="text-sm text-slate">
                                                                    {appointment.time}
                                                                </span>
                                                            </div>

                                                            <p className="mt-1 text-base font-bold text-navy">
                                                                {appointment.service}
                                                            </p>

                                                            <div className="mt-0.5 flex items-center gap-1.5 text-sm text-slate">
                                                                <User className="h-3.5 w-3.5" />
                                                                {appointment.staffName}
                                                            </div>

                                                        </div>

                                                    </div>

                                                    <Link
                                                        to={`/staff/appointments/${appointment.id}`}
                                                        className="
                                                            rounded-lg border border-gray
                                                            bg-white px-4 py-2 text-sm
                                                            font-bold text-navy transition
                                                            hover:border-navy
                                                        "
                                                    >
                                                        View Appointment
                                                    </Link>

                                                </div>
                                            )
                                        )}

                                    </div>
                                )}

                            </div>

                            {/* Card D — Appointment History */}
                            <div className="overflow-hidden rounded-xl border border-gray/20 bg-white shadow-sm">

                                <div className="p-6">
                                    <h2 className="font-serif text-xl font-bold text-navy sm:text-2xl">
                                        Appointment History
                                    </h2>
                                </div>

                                <div className="overflow-x-auto">
                                    <div className="min-w-[700px]">

                                        <div className="grid grid-cols-[110px_90px_1fr_1fr_110px] border-b border-gray/20 bg-beige/40 px-6 py-3 text-xs font-bold uppercase tracking-wide text-slate">
                                            <span>Date</span>
                                            <span>Time</span>
                                            <span>Service</span>
                                            <span>Staff</span>
                                            <span>Status</span>
                                        </div>

                                        {customer.history.map((row) => (
                                            <div
                                                key={row.id}
                                                className="
                                                    grid grid-cols-[110px_90px_1fr_1fr_110px]
                                                    border-b border-gray/20 px-6 py-4
                                                    transition last:border-b-0
                                                    hover:bg-beige/20
                                                "
                                            >
                                                <span className="text-sm text-navy">
                                                    {row.date}
                                                </span>

                                                <span className="text-sm text-navy">
                                                    {row.time}
                                                </span>

                                                <span className="text-sm text-slate">
                                                    {row.service}
                                                </span>

                                                <span className="text-sm text-slate">
                                                    {row.staffName}
                                                </span>

                                                <span className="inline-flex w-fit rounded-full bg-gray/10 px-3 py-1 text-xs font-bold text-slate">
                                                    {row.status}
                                                </span>
                                            </div>
                                        ))}

                                    </div>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleViewAllHistory}
                                    className="
                                        w-full cursor-pointer border-t border-gray/20
                                        bg-beige/40 py-3 text-center text-sm font-bold
                                        text-navy transition hover:bg-beige/60
                                    "
                                >
                                    View All History
                                </button>

                            </div>

                        </div>

                        {/* RIGHT COLUMN */}
                        <div className="flex flex-col gap-6">

                            {/* Card E — Contact Information */}
                            <div className="rounded-xl border border-gray/20 bg-white p-6 shadow-sm">

                                <h2 className="font-serif text-xl font-bold text-navy">
                                    Contact Information
                                </h2>

                                <div className="mt-3 border-b border-gray/20" />

                                <div className="mt-4 flex items-start gap-3">

                                    <Mail className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate" />

                                    <div className="min-w-0">
                                        <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                            Email
                                        </p>
                                        <p className="mt-0.5 truncate text-sm text-navy">
                                            {customer.contact.email}
                                        </p>
                                    </div>

                                </div>

                                <div className="mt-4 flex items-start gap-3">

                                    <Phone className="mt-0.5 h-4 w-4 flex-shrink-0 text-slate" />

                                    <div className="min-w-0">
                                        <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                            Phone
                                        </p>
                                        <p className="mt-0.5 text-sm text-navy">
                                            {customer.contact.phone}
                                        </p>
                                    </div>

                                </div>

                            </div>

                            {/* Card F — Notes */}
                            <div className="rounded-xl border border-gray/20 bg-white p-6 shadow-sm">

                                <div className="mb-3 flex items-center justify-between">

                                    <h2 className="font-serif text-xl font-bold text-navy">
                                        Notes
                                    </h2>

                                    {!isAddingNote && (
                                        <button
                                            type="button"
                                            onClick={() => setIsAddingNote(true)}
                                            className="
                                                flex cursor-pointer items-center gap-1
                                                text-sm font-bold text-navy transition
                                                hover:text-gold
                                            "
                                        >
                                            <Plus className="h-3.5 w-3.5" />
                                            Add Note
                                        </button>
                                    )}

                                </div>

                                {isAddingNote && (
                                    <div className="mb-3">

                                        <textarea
                                            rows="3"
                                            value={newNoteDraft}
                                            onChange={(event) =>
                                                setNewNoteDraft(event.target.value)
                                            }
                                            placeholder="Write a note..."
                                            className="
                                                w-full rounded-lg border border-gray
                                                px-4 py-3 text-sm text-navy
                                                outline-none focus:border-navy
                                            "
                                        />

                                        <div className="mt-2 flex gap-2">
                                            <button
                                                type="button"
                                                onClick={handleAddNote}
                                                className="rounded-lg bg-navy px-4 py-2 text-sm font-bold text-white transition hover:bg-gold hover:text-navy"
                                            >
                                                Save
                                            </button>

                                            <button
                                                type="button"
                                                onClick={handleCancelAddNote}
                                                className="rounded-lg border border-gray bg-white px-4 py-2 text-sm font-bold text-navy transition hover:border-navy"
                                            >
                                                Cancel
                                            </button>
                                        </div>

                                    </div>
                                )}

                                <div className="flex flex-col gap-2.5">

                                    {customer.notes.map((note) => (
                                        <div
                                            key={note.id}
                                            className="rounded-lg bg-beige/40 p-3.5"
                                        >
                                            <p className="text-sm italic text-navy">
                                                &ldquo;{note.text}&rdquo;
                                            </p>

                                            <p className="mt-1.5 text-right text-xs text-slate">
                                                — Added by {note.author}
                                            </p>
                                        </div>
                                    ))}

                                </div>

                            </div>

                            {/* Card G — Services Used */}
                            <div className="rounded-xl border border-gray/20 bg-white p-6 shadow-sm">

                                <h2 className="font-serif text-xl font-bold text-navy">
                                    Services Used
                                </h2>

                                <div className="mt-3 border-b border-gray/20" />

                                <div className="mt-3 flex flex-col">

                                    {customer.servicesUsed.map((service) => (
                                        <div
                                            key={service.name}
                                            className="flex items-center justify-between py-2"
                                        >
                                            <span className="text-sm text-navy">
                                                {service.name}
                                            </span>

                                            <span className="min-w-[36px] rounded-md bg-gray/10 px-2.5 py-1 text-center text-xs font-bold text-navy">
                                                {service.count}
                                            </span>
                                        </div>
                                    ))}

                                </div>

                            </div>

                            {/* Card H — Recent Activity */}
                            <div className="rounded-xl border border-gray/20 bg-white p-6 shadow-sm">

                                <h2 className="font-serif text-xl font-bold text-navy">
                                    Recent Activity
                                </h2>

                                <div className="mt-3 border-b border-gray/20" />

                                <div className="mt-4">

                                    {customer.recentActivity.map((entry, index) => {
                                        const isLast =
                                            index ===
                                            customer.recentActivity.length - 1;

                                        return (
                                            <div
                                                key={entry.id}
                                                className={`
                                                    relative flex gap-3
                                                    ${isLast ? "" : "pb-4"}
                                                    ${
                                                        isLast
                                                            ? ""
                                                            : "border-l border-gray/20"
                                                    }
                                                `}
                                            >
                                                <span
                                                    className={`
                                                        -ml-[5px] mt-1 h-2.5 w-2.5
                                                        flex-shrink-0 rounded-full
                                                        ${
                                                            index === 0
                                                                ? "bg-gold"
                                                                : "bg-gray/40"
                                                        }
                                                    `}
                                                />

                                                <div>
                                                    <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                                        {entry.label}
                                                    </p>

                                                    <p className="mt-0.5 text-sm text-navy">
                                                        {entry.description}
                                                    </p>
                                                </div>

                                            </div>
                                        );
                                    })}

                                </div>

                            </div>

                        </div>

                    </div>

                </main>

            </div>

        </div>
    );
}

export default StaffCustomerDetails;