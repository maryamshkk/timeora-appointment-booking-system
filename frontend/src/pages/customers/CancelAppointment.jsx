import React, { useState } from "react";
import {
    AlertTriangle,
    ArrowLeft,
    Banknote,
    Calendar,
    CheckCircle2,
    ChevronDown,
    Clock,
    Hash,
    Info,
    Stethoscope,
    XCircle,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import CustomerSidebar from "../../components/customer/CustomerSidebar";
import CustomerTopbar from "../../components/customer/CustomerTopbar";

function CancelAppointment() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [appointment] = useState({
        id: "apt-1",
        referenceCode: "TMR-20260821-00421",
        service: {
            name: "Consultation",
        },
        staffName: "Dr. Sara Ahmed",
        companyName: "Shifa Clinic",
        date: "Monday, 24 August 2026",
        time: "10:00 AM",
        price: "PKR 2,500",
        paymentMethod: "Cash on Reception",
        status: "pending_cancellation",
    });

    const [cancellationReason, setCancellationReason] = useState("");
    const [isCancelling, setIsCancelling] = useState(false);

    // TODO: Replace local appointment state with a real fetch using the route id.
    // The appointment should be loaded using `id` from useParams().

    // TODO: Calculate the cancellation deadline from appointment.date
    // and appointment.time, then subtract 24 hours.

    function handleBackToAppointment() {
        navigate(`/customer/appointments/${id}`);
    }

    function handleCancelAppointment() {
        setIsCancelling(true);

        // TODO: Axios POST/PATCH call to cancel the appointment
        // using the appointment id and cancellationReason.
        // On success, navigate to My Appointments / Cancelled tab.

        setIsCancelling(false);
    }

    function handleKeepAppointment() {
        navigate(`/customer/appointments/${id}`);
    }

    return (
        <div className="min-h-screen bg-beige flex">
            {/* Sidebar */}
            <CustomerSidebar activeItem="My Appointments" />

            <div className="flex-1 min-w-0">
                {/* Topbar */}
                <CustomerTopbar />

                {/* Main Content */}
                <main className="px-8 py-6">

                    {/* Back */}
                    <button
                        type="button"
                        onClick={handleBackToAppointment}
                        className="
                            flex
                            items-center
                            gap-2
                            text-sm
                            text-slate
                            hover:text-navy
                            transition
                            cursor-pointer
                            mb-4
                        "
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        Back to Appointment
                    </button>

                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="font-serif text-4xl text-navy mb-1.5">
                            Cancel Appointment
                        </h1>

                        <p className="text-sm text-slate">
                            Review the appointment details and cancellation
                            policy before cancelling.
                        </p>
                    </div>

                    {/* Main Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">

                        {/* Left Column */}
                        <div className="flex flex-col gap-6">

                            {/* Card A — Appointment Summary */}
                            <div className="bg-white rounded-xl border border-gray/20 shadow-sm overflow-hidden">

                                {/* Header */}
                                <div className="flex justify-between items-center gap-4 p-6 border-b border-gray/20">
                                    <h2 className="font-serif text-2xl text-navy">
                                        Appointment Summary
                                    </h2>

                                    <span className="bg-red-50 text-red-600 text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded-full whitespace-nowrap">
                                        {appointment.status === "pending_cancellation"
                                            ? "Pending Cancellation"
                                            : appointment.status}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="p-6">

                                    {/* Service + Staff + Company */}
                                    <div className="flex items-center gap-4 mb-4">

                                        <div className="w-14 h-14 bg-beige/60 rounded-lg flex items-center justify-center flex-shrink-0">
                                            <Stethoscope className="w-5 h-5 text-navy" />
                                        </div>

                                        <div className="min-w-0">
                                            <p className="font-serif text-xl text-navy">
                                                {appointment.service.name}
                                            </p>

                                            <p className="text-sm text-slate mt-0.5">
                                                with {appointment.staffName} at{" "}
                                                {appointment.companyName}
                                            </p>
                                        </div>

                                    </div>

                                    {/* Reference Tag */}
                                    <div className="inline-flex items-center gap-1.5 bg-gray/10 rounded-md px-2.5 py-1 mt-2">
                                        <Hash className="w-3 h-3 text-slate" />

                                        <span className="text-xs font-bold text-slate font-mono">
                                            Ref: {appointment.referenceCode}
                                        </span>
                                    </div>

                                    {/* Divider */}
                                    <div className="border-b border-gray/20 my-4" />

                                    {/* Details Grid */}
                                    <div className="grid grid-cols-2 gap-x-8 gap-y-6">

                                        {/* DATE */}
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wide text-slate mb-1.5">
                                                Date
                                            </p>

                                            <div className="flex items-center gap-2">
                                                <Calendar className="w-4 h-4 text-navy flex-shrink-0" />

                                                <p className="text-base text-navy">
                                                    {appointment.date}
                                                </p>
                                            </div>
                                        </div>

                                        {/* TIME */}
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wide text-slate mb-1.5">
                                                Time
                                            </p>

                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4 text-navy flex-shrink-0" />

                                                <p className="text-base text-navy">
                                                    {appointment.time}
                                                </p>
                                            </div>
                                        </div>

                                        {/* PRICE */}
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wide text-slate mb-1.5">
                                                Price
                                            </p>

                                            <p className="text-base font-bold text-navy">
                                                {appointment.price}
                                            </p>
                                        </div>

                                        {/* PAYMENT METHOD */}
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wide text-slate mb-1.5">
                                                Payment Method
                                            </p>

                                            <div className="flex items-center gap-2">
                                                <Banknote className="w-4 h-4 text-navy flex-shrink-0" />

                                                <p className="text-base text-navy">
                                                    {appointment.paymentMethod}
                                                </p>
                                            </div>
                                        </div>

                                    </div>

                                </div>

                            </div>

                            {/* Card B — Cancellation Reason */}
                            <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-7">

                                {/* Warning Banner */}
                                <div className="bg-red-50 rounded-lg p-5 flex items-start gap-3 mb-6">

                                    <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-px" />

                                    <p className="text-sm text-red-700 leading-relaxed">
                                        You are about to cancel this appointment.
                                        This action cannot be easily undone, and
                                        you may lose your preferred time slot.
                                    </p>

                                </div>

                                {/* Reason Label */}
                                <label
                                    htmlFor="cancellation-reason"
                                    className="block text-xs font-bold uppercase tracking-wide text-navy mb-2"
                                >
                                    Reason for Cancellation
                                </label>

                                {/* Reason Select */}
                                <div className="relative">

                                    <select
                                        id="cancellation-reason"
                                        value={cancellationReason}
                                        onChange={(event) =>
                                            setCancellationReason(event.target.value)
                                        }
                                        className={`
                                            appearance-none
                                            w-full
                                            border
                                            border-gray
                                            rounded-lg
                                            px-4
                                            py-3
                                            pr-10
                                            text-sm
                                            bg-white
                                            outline-none
                                            focus:border-navy
                                            cursor-pointer
                                            ${cancellationReason ? "text-navy" : "text-slate"}
                                        `}
                                    >
                                        <option value="" disabled>
                                            Select a reason...
                                        </option>

                                        <option value="schedule-conflict">
                                            Schedule conflict
                                        </option>

                                        <option value="found-another-provider">
                                            Found another provider
                                        </option>

                                        <option value="no-longer-needed">
                                            No longer needed
                                        </option>

                                        <option value="other">
                                            Other
                                        </option>
                                    </select>

                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate pointer-events-none" />

                                </div>

                            </div>

                        </div>

                        {/* Right Column */}
                        <div>
                            {/* Cancellation Policy — next step */}
                        </div>

                    </div>
                </main>
            </div>
        </div>
    );
}

export default CancelAppointment;