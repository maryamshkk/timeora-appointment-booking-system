import React, { useState } from "react";
import {
    Check,
    CheckCircle2,
    Copy,
    Building2,
    CalendarDays,
    Clock3,
    Stethoscope,
    Wallet,
} from "lucide-react";
import { Link } from "react-router-dom";

function BookingConfirmation() {
    const [booking] = useState({
        referenceCode: "TMR-20260821-00421",

        companyName: "Shifa Clinic",
        companyCategory: "Medical Center",
        companyCity: "Lahore",
        companyLogoUrl: "",

        service: {
            name: "Consultation",
        },

        staff: {
            name: "Dr. Sara Ahmed",
            role: "Doctor",
            avatarUrl: "",
        },

        date: "Fri, 21 Aug 2026",
        time: "04:00 PM",
        durationMinutes: 30,

        payment: {
            method: "Cash on Reception",
            amount: "PKR 2,500",
        },
    });

    const [justCopied, setJustCopied] = useState(false);

    function handleCopyReference() {
        navigator.clipboard.writeText(booking.referenceCode);

        setJustCopied(true);

        // TODO: Replace this temporary feedback with a proper toast if needed.
        setTimeout(() => {
            setJustCopied(false);
        }, 1500);
    }

    return (
        <div className="min-h-screen bg-white">

            <main className="max-w-lg mx-auto px-6 pt-16 pb-12">

                {/* Success Icon */}
                <div className="w-20 h-20 bg-navy rounded-2xl mx-auto mb-6 flex items-center justify-center">
                    <CheckCircle2 className="w-9 h-9 text-white" />
                </div>

                {/* Heading */}
                <h1 className="font-serif text-3xl text-navy text-center mb-2.5">
                    Appointment Confirmed
                </h1>

                <p className="text-base text-slate text-center max-w-md mx-auto mb-7">
                    Your appointment has been successfully booked with{" "}
                    {booking.companyName}.
                </p>

                {/* Booking Reference */}
                <div className="bg-beige/60 rounded-lg p-5 mb-7 flex items-center justify-between gap-4">

                    <div>
                        <p className="text-xs font-bold uppercase tracking-wide text-slate mb-1">
                            Booking Reference
                        </p>

                        <p className="text-base font-bold text-navy font-mono">
                            {booking.referenceCode}
                        </p>
                    </div>

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
                        "
                    >
                        {justCopied ? (
                            <Check className="w-[18px] h-[18px]" />
                        ) : (
                            <Copy className="w-[18px] h-[18px]" />
                        )}
                    </button>

                </div>

                {/* Appointment Details */}
                <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-8 text-left">

                    {/* Company Header */}
                    <div className="flex items-center gap-4">

                        {booking.companyLogoUrl ? (
                            <img
                                src={booking.companyLogoUrl}
                                alt={booking.companyName}
                                className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                            />
                        ) : (
                            <div className="w-14 h-14 rounded-xl bg-beige flex items-center justify-center flex-shrink-0">
                                <Building2 className="w-6 h-6 text-navy" />
                            </div>
                        )}

                        <div className="min-w-0">
                            <h2 className="font-serif text-xl text-navy truncate">
                                {booking.companyName}
                            </h2>

                            <p className="text-sm text-slate mt-0.5">
                                {booking.companyCategory}
                            </p>

                            <p className="text-xs text-slate mt-0.5">
                                {booking.companyCity}
                            </p>
                        </div>

                    </div>

                    <div className="border-b border-gray/20 my-6"></div>

                    {/* Appointment Information */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                        {/* Service */}
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Stethoscope className="w-4 h-4 text-navy" />

                                <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                    Service
                                </p>
                            </div>

                            <p className="text-sm font-bold text-navy">
                                {booking.service.name}
                            </p>
                        </div>

                        {/* Specialist */}
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Stethoscope className="w-4 h-4 text-navy" />

                                <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                    Specialist
                                </p>
                            </div>

                            <div className="flex items-center gap-2.5">
                                {booking.staff.avatarUrl ? (
                                    <img
                                        src={booking.staff.avatarUrl}
                                        alt={booking.staff.name}
                                        className="w-8 h-8 rounded-full object-cover"
                                    />
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-beige flex items-center justify-center">
                                        <span className="text-xs font-bold text-navy">
                                            {booking.staff.name
                                                .charAt(0)
                                                .toUpperCase()}
                                        </span>
                                    </div>
                                )}

                                <div>
                                    <p className="text-sm font-bold text-navy">
                                        {booking.staff.name}
                                    </p>

                                    <p className="text-xs text-slate">
                                        {booking.staff.role}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Date & Time */}
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <CalendarDays className="w-4 h-4 text-navy" />

                                <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                    Date & Time
                                </p>
                            </div>

                            <p className="text-sm font-bold text-navy">
                                {booking.date}
                            </p>

                            <div className="flex items-center gap-1.5 mt-1">
                                <Clock3 className="w-3.5 h-3.5 text-slate" />

                                <p className="text-xs text-slate">
                                    {booking.time} · {booking.durationMinutes} min
                                </p>
                            </div>
                        </div>

                        {/* Payment */}
                        <div>
                            <div className="flex items-center gap-2 mb-2">
                                <Wallet className="w-4 h-4 text-navy" />

                                <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                    Payment
                                </p>
                            </div>

                            <p className="text-sm font-bold text-navy">
                                {booking.payment.method}
                            </p>

                            <p className="text-xs text-slate mt-1">
                                {booking.payment.amount}
                            </p>
                        </div>

                    </div>
                </div>

                {/* What's Next */}
                <div className="bg-beige/60 rounded-xl p-6 mt-6 text-left">

                    <h2 className="font-serif text-xl text-navy mb-5">
                        What’s Next
                    </h2>

                    <div className="flex flex-col gap-5">

                        {/* Step 1 */}
                        <div className="flex items-start gap-3">
                            <div className="w-7 h-7 rounded-full bg-navy flex items-center justify-center flex-shrink-0">
                                <span className="text-xs font-bold text-white">
                                    1
                                </span>
                            </div>

                            <div>
                                <p className="text-sm font-bold text-navy">
                                    Arrive at your scheduled time
                                </p>

                                <p className="text-xs text-slate mt-1 leading-relaxed">
                                    Please arrive a few minutes before your appointment.
                                </p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex items-start gap-3">
                            <div className="w-7 h-7 rounded-full bg-navy flex items-center justify-center flex-shrink-0">
                                <span className="text-xs font-bold text-white">
                                    2
                                </span>
                            </div>

                            <div>
                                <p className="text-sm font-bold text-navy">
                                    Show your booking reference
                                </p>

                                <p className="text-xs text-slate mt-1 leading-relaxed">
                                    Keep your booking reference ready when you arrive.
                                </p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex items-start gap-3">
                            <div className="w-7 h-7 rounded-full bg-navy flex items-center justify-center flex-shrink-0">
                                <span className="text-xs font-bold text-white">
                                    3
                                </span>
                            </div>

                            <div>
                                <p className="text-sm font-bold text-navy">
                                    Pay at reception
                                </p>

                                <p className="text-xs text-slate mt-1 leading-relaxed">
                                    Your payment of {booking.payment.amount} will be collected
                                    at the reception.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Confirmation Actions */}
                <div className="mt-7">

                    {/* Primary Actions */}
                    <div className="flex flex-col sm:flex-row gap-3">

                        <Link
                            to={`/customer/appointments/${booking.referenceCode}`}
                            className="
                                flex-1
                                py-3.5
                                px-5
                                bg-navy
                                text-white
                                rounded-lg
                                text-sm
                                font-bold
                                uppercase
                                tracking-wide
                                text-center
                                hover:bg-gold
                                hover:text-navy
                                transition
                            "
                        >
                            View Appointment
                        </Link>

                        <Link
                            to="/customer/dashboard"
                            className="
                                flex-1
                                py-3.5
                                px-5
                                border
                                border-gray/30
                                text-navy
                                rounded-lg
                                text-sm
                                font-bold
                                uppercase
                                tracking-wide
                                text-center
                                hover:bg-beige
                                transition
                            "
                        >
                            Back to Dashboard
                        </Link>

                    </div>

                    {/* Appointments Link */}
                    <Link
                        to="/customer/appointments"
                        className="
                            block
                            text-center
                            text-sm
                            font-bold
                            text-slate
                            hover:text-navy
                            hover:underline
                            transition
                            mt-5
                        "
                    >
                        View My Appointments
                    </Link>

                </div>

            </main>

        </div>
    );
}

export default BookingConfirmation;