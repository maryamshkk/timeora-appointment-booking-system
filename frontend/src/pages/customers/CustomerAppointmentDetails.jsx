import React, { useState } from "react";
import {
    ArrowLeft,
    Calendar,
    Check,
    Clock,
    Copy,
    Hourglass,
    Info,
    MapPin,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import CustomerSidebar from "../../components/customer/CustomerSidebar";
import CustomerTopbar from "../../components/customer/CustomerTopbar";

function CustomerAppointmentDetails() {
    const { id } = useParams();

    const [appointment] = useState({
        id: "apt-1",
        referenceCode: "TMR-20260821-00421",
        status: "confirmed",

        service: {
            name: "Consultation",
            description:
                "A comprehensive initial consultation to discuss symptoms, medical history, and outline a tailored treatment plan. Please arrive 10 minutes early to complete any necessary paperwork.",
            fee: "PKR 2,500",
        },

        staffName: "Dr. Sara Ahmed",
        staffRole: "General Physician",
        staffAvatarUrl: "",

        date: "Fri, 21 Aug 2026",
        time: "04:00 PM",
        durationMinutes: 30,

        clinic: {
            name: "Shifa Clinic",
            address: "123 Health Avenue, Gulberg III, Lahore",
        },

        payment: {
            method: "Cash on Reception",
            amount: "PKR 2,500",
            status: "pending",
        },

        timeline: [
            {
                label: "Booked",
                timestamp: "Mon, 10 Aug 2026 · 10:15 AM",
                completed: true,
            },
            {
                label: "Confirmed",
                timestamp: "Mon, 10 Aug 2026 · 11:30 AM",
                completed: true,
            },
            {
                label: "Upcoming",
                timestamp: "Fri, 21 Aug 2026 · 04:00 PM",
                completed: false,
            },
        ],
    });

    // TODO: Replace the seeded appointment with a real fetch keyed by the route param.

    const [justCopied, setJustCopied] = useState(false);

    function handleCopyReference() {
        navigator.clipboard.writeText(appointment.referenceCode);

        setJustCopied(true);

        setTimeout(() => {
            setJustCopied(false);
        }, 1500);
    }

    function getStatusStyles(status) {
        switch (status) {
            case "confirmed":
                return "bg-green-50 text-green-700";
            case "completed":
                return "bg-blue-50 text-blue-700";
            case "cancelled":
                return "bg-red-50 text-red-700";
            case "pending":
                return "bg-amber-50 text-amber-700";
            default:
                return "bg-gray/10 text-slate";
        }
    }

    return (
        <div className="min-h-screen bg-beige flex">

            <CustomerSidebar activeItem="My Appointments" />

            <div className="flex-1 min-w-0">

                <CustomerTopbar />

                <main className="px-8 py-6">

                    {/* Back */}
                    <Link
                        to="/customer/appointments"
                        className="
                            inline-flex
                            items-center
                            gap-2
                            text-xs
                            font-bold
                            uppercase
                            tracking-wide
                            text-slate
                            hover:text-navy
                            transition
                            cursor-pointer
                            mb-3
                        "
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        Back to My Appointments
                    </Link>

                    {/* Header */}
                    <div className="flex items-center gap-3 mb-6">

                        <h1 className="font-serif text-4xl text-navy">
                            Appointment Details
                        </h1>

                        <span
                            className={`
                                text-xs
                                font-bold
                                uppercase
                                tracking-wide
                                px-3
                                py-1.5
                                rounded-full
                                ${getStatusStyles(appointment.status)}
                            `}
                        >
                            {appointment.status}
                        </span>

                    </div>

                    {/* Main Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">

                        {/* Left Column */}
                        <section className="bg-white rounded-xl border border-gray/20 shadow-sm p-8">

                            {/* Header */}
                            <div className="flex items-center gap-4 mb-5">

                                <img
                                    src=""
                                    alt={appointment.service.name}
                                    className="w-16 h-16 rounded-lg object-cover border border-gray/20 bg-beige flex-shrink-0"
                                />

                                <div className="min-w-0">
                                    <h2 className="font-serif text-2xl text-navy">
                                        {appointment.service.name}
                                    </h2>

                                    <p className="text-base text-slate mt-0.5">
                                        with {appointment.staffName}
                                    </p>
                                </div>

                            </div>

                            <div className="border-b border-gray/20 mb-5"></div>

                            {/* Meta Row */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-7">

                                {/* Date */}
                                <div>
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <Calendar className="w-3.5 h-3.5 text-slate" />

                                        <span className="text-xs font-bold uppercase tracking-wide text-slate">
                                            Date
                                        </span>
                                    </div>

                                    <p className="text-base font-bold text-navy">
                                        {appointment.date}
                                    </p>
                                </div>

                                {/* Time */}
                                <div>
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <Clock className="w-3.5 h-3.5 text-slate" />

                                        <span className="text-xs font-bold uppercase tracking-wide text-slate">
                                            Time
                                        </span>
                                    </div>

                                    <p className="text-base font-bold text-navy">
                                        {appointment.time}
                                    </p>
                                </div>

                                {/* Duration */}
                                <div>
                                    <div className="flex items-center gap-2 mb-1.5">
                                        <Hourglass className="w-3.5 h-3.5 text-slate" />

                                        <span className="text-xs font-bold uppercase tracking-wide text-slate">
                                            Duration
                                        </span>
                                    </div>

                                    <p className="text-base font-bold text-navy">
                                        {appointment.durationMinutes} minutes
                                    </p>
                                </div>

                            </div>

                            {/* Clinic Location */}
                            <section className="mt-7">

                                <h3 className="font-serif text-xl text-navy mb-4">
                                    Clinic Location
                                </h3>

                                <div className="flex items-start gap-4">

                                    <div className="w-11 h-11 bg-beige/60 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <MapPin className="w-[18px] h-[18px] text-navy" />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-base font-bold text-navy">
                                            {appointment.clinic.name}
                                        </p>

                                        <p className="text-sm text-slate mt-0.5">
                                            {appointment.clinic.address}
                                        </p>
                                    </div>

                                </div>

                            </section>

                            {/* Service Details */}
                            <section className="mt-7">

                                <h3 className="font-serif text-xl text-navy mb-4">
                                    Service Details
                                </h3>

                                <p className="text-base text-slate leading-relaxed mb-4">
                                    {appointment.service.description}
                                </p>

                                <div className="inline-flex items-center gap-2 bg-beige/40 rounded-lg px-4 py-2.5">
                                    <span className="text-xs font-bold uppercase tracking-wide text-slate">
                                        Fee
                                    </span>

                                    <span className="text-base font-bold text-navy">
                                        {appointment.service.fee}
                                    </span>
                                </div>

                            </section>

                            {/* Practitioner */}
                            <section className="mt-7">

                                <h3 className="font-serif text-xl text-navy mb-4">
                                    Practitioner
                                </h3>

                                <div className="flex items-center gap-4">

                                    {appointment.staffAvatarUrl ? (
                                        <img
                                            src={appointment.staffAvatarUrl}
                                            alt={appointment.staffName}
                                            className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                                        />
                                    ) : (
                                        <div className="w-14 h-14 rounded-lg bg-beige flex items-center justify-center flex-shrink-0">
                                            <span className="font-serif text-lg text-navy">
                                                {appointment.staffName
                                                    .split(" ")
                                                    .map((word) => word.charAt(0))
                                                    .slice(0, 2)
                                                    .join("")
                                                    .toUpperCase()}
                                            </span>
                                        </div>
                                    )}

                                    <div className="min-w-0">
                                        <p className="text-base font-bold text-navy">
                                            {appointment.staffName}
                                        </p>

                                        <p className="text-sm text-slate mt-0.5">
                                            {appointment.staffRole}
                                        </p>
                                    </div>

                                </div>

                            </section>

                        </section>

                        {/* Right Column */}
                        <aside className="flex flex-col gap-5">

                            {/* Actions */}
                            <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-5">

                                <Link
                                    to={`/customer/appointments/${id}/reschedule`}
                                    className="
                                        w-full
                                        bg-navy
                                        text-white
                                        font-bold
                                        text-sm
                                        py-3
                                        rounded-lg
                                        text-center
                                        hover:bg-gold
                                        hover:text-navy
                                        transition
                                        block
                                        mb-2.5
                                    "
                                >
                                    Reschedule
                                </Link>

                                <Link
                                    to={`/customer/appointments/${id}/cancel`}
                                    className="
                                        w-full
                                        bg-white
                                        border-2
                                        border-navy
                                        text-navy
                                        font-bold
                                        text-sm
                                        py-3
                                        rounded-lg
                                        text-center
                                        hover:bg-navy
                                        hover:text-white
                                        transition
                                        block
                                    "
                                >
                                    Cancel Appointment
                                </Link>

                            </div>

                            {/* Booking Reference */}
                            <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-5">

                                <p className="text-xs font-bold uppercase tracking-wide text-slate mb-2">
                                    Booking Reference
                                </p>

                                <div className="flex justify-between items-start gap-3">

                                    <p className="text-lg font-bold text-navy font-mono break-all">
                                        {appointment.referenceCode}
                                    </p>

                                    <button
                                        type="button"
                                        onClick={handleCopyReference}
                                        aria-label="Copy booking reference"
                                        className="
                                            text-slate
                                            hover:text-navy
                                            transition
                                            cursor-pointer
                                            flex-shrink-0
                                            mt-1
                                        "
                                    >
                                        {justCopied ? (
                                            <Check className="w-[18px] h-[18px]" />
                                        ) : (
                                            <Copy className="w-[18px] h-[18px]" />
                                        )}
                                    </button>

                                </div>

                            </div>

                            {/* Payment Summary */}
                            <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-5">

                                <p className="text-xs font-bold uppercase tracking-wide text-slate mb-3.5">
                                    Payment Summary
                                </p>

                                <div className="flex justify-between items-start gap-3 mb-3">

                                    <span className="text-sm text-slate">
                                        Payment Method
                                    </span>

                                    <span className="text-sm font-bold text-navy text-right">
                                        {appointment.payment.method}
                                    </span>

                                </div>

                                <div className="flex justify-between items-center gap-3 mb-3.5">

                                    <span className="text-sm text-slate">
                                        Total Amount
                                    </span>

                                    <span className="text-sm font-bold text-navy">
                                        {appointment.payment.amount}
                                    </span>

                                </div>

                                <div className="flex justify-end">
                                    <span
                                        className={`
                                            text-xs
                                            font-bold
                                            uppercase
                                            tracking-wide
                                            px-3
                                            py-1.5
                                            rounded-full
                                            ${
                                                appointment.payment.status === "paid"
                                                    ? "bg-green-50 text-green-700"
                                                    : "bg-amber-50 text-amber-700"
                                            }
                                        `}
                                    >
                                        {appointment.payment.status === "paid"
                                            ? "Paid"
                                            : "Payment Pending"}
                                    </span>
                                </div>

                            </div>

                            {/* Timeline */}
                            <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-5">

                                <p className="text-xs font-bold uppercase tracking-wide text-slate mb-4">
                                    Timeline
                                </p>

                                <div className="flex flex-col">

                                    {appointment.timeline.map((entry, index) => (
                                        <div
                                            key={entry.label}
                                            className="flex gap-3 relative"
                                            style={{
                                                paddingBottom:
                                                    index !== appointment.timeline.length - 1
                                                        ? "16px"
                                                        : 0,
                                            }}
                                        >
                                            {/* Vertical connector line */}
                                            {index !== appointment.timeline.length - 1 && (
                                                <span
                                                    className="absolute left-[4.5px] top-3 bottom-0 border-l border-gray/20"
                                                    aria-hidden="true"
                                                />
                                            )}

                                            {/* Dot */}
                                            <span
                                                className={`
                                                    w-2.5
                                                    h-2.5
                                                    rounded-full
                                                    mt-1.5
                                                    flex-shrink-0
                                                    relative
                                                    z-10
                                                    ${
                                                        entry.completed
                                                            ? "bg-green-600"
                                                            : "border-2 border-navy bg-white"
                                                    }
                                                `}
                                            />

                                            {/* Text */}
                                            <div className="min-w-0">
                                                <p className="text-sm font-bold text-navy">
                                                    {entry.label}
                                                </p>

                                                <p className="text-xs text-slate mt-0.5">
                                                    {entry.timestamp}
                                                </p>
                                            </div>

                                        </div>
                                    ))}

                                </div>

                            </div>

                            {/* Cancellation Policy */}
                            <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-5">

                                <div className="flex items-center gap-2 mb-2.5">
                                    <Info className="w-4 h-4 text-navy" />

                                    <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                        Cancellation Policy
                                    </p>
                                </div>

                                <p className="text-sm text-slate leading-relaxed">
                                    Free cancellation up to 24 hours before the appointment.
                                    Cancellations made after this period may be subject to a fee.
                                </p>

                            </div>

                        </aside>

                    </div>

                </main>

            </div>

        </div>
    );
}

export default CustomerAppointmentDetails;