import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    ChevronRight,
    Banknote,
    Clock3,
    CheckCircle2,
} from "lucide-react";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";

const mockAppointmentData = {
    customer: "Ayesha Khan",
    service: "Consultation",
    staff: "Dr. Sara Ahmed",
    dateTime: {
        date: "25 August 2026",
        start: "10:00 AM",
        end: "11:00 AM",
    },
    status: "Confirmed",
    amount: "3,000",
};

function PaymentCashOnReception() {
    const { appointmentId } = useParams();
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [appointmentData, setAppointmentData] = useState(
        mockAppointmentData
    );

    const [paymentStatus, setPaymentStatus] = useState("pending");
    const [confirmingPayment, setConfirmingPayment] = useState(false);
    const [paidAt, setPaidAt] = useState(null);

    // TODO: axios GET /api/company/appointments/:appointmentId on mount

    function handleMarkAsPaid(event) {
        event.preventDefault();

        if (paymentStatus === "paid") {
            return;
        }

        if (!confirmingPayment) {
            setConfirmingPayment(true);
            return;
        }

        setPaymentStatus("paid");
        setPaidAt(new Date());
        setConfirmingPayment(false);

        // TODO: axios PATCH /api/company/appointments/:id/payment
        // await api.patch(`/company/appointments/${appointmentId}/payment`, {
        //     status: "paid",
        //     method: "cash",
        // });
    }

    return (
        <div className="flex min-h-screen bg-beige">

            {/* Desktop Sidebar */}
            <div className="hidden lg:block lg:flex-shrink-0">
                <Sidebar
                    companyName="Shifa Clinic"
                    activeItem="Appointments"
                    ctaLabel="Book Appointment"
                    ctaPath="/company/appointments/new"
                />
            </div>

            {/* Mobile Sidebar — overlay */}
            {sidebarOpen && (
                <>
                    <button
                        type="button"
                        onClick={function () {
                            setSidebarOpen(false);
                        }}
                        className="fixed inset-0 z-30 bg-navy/50 lg:hidden"
                        aria-label="Close menu"
                    />

                    <div className="fixed left-0 top-0 z-40 h-screen w-64 overflow-y-auto lg:hidden">
                        <Sidebar
                            companyName="Shifa Clinic"
                            activeItem="Appointments"
                            ctaLabel="Book Appointment"
                            ctaPath="/company/appointments/new"
                        />
                    </div>
                </>
            )}

            {/* Main Area */}
            <div className="flex min-w-0 flex-1 flex-col">

                <Topbar
                    onMenuClick={function () {
                        setSidebarOpen(true);
                    }}
                    showBell
                    hasNotification
                    showSettings
                    profileInfo={{ name: "Admin" }}
                    searchPlaceholder="Search..."
                />

                <main className="flex-1 bg-beige px-4 py-5 md:px-8 md:py-6">

                    {/* Breadcrumb */}
                    <div className="mb-2 flex items-center gap-2 text-xs text-slate">

                        <Link
                            to="/company/appointments"
                            className="transition hover:text-navy"
                        >
                            Appointments
                        </Link>

                        <ChevronRight className="h-3 w-3 text-gray" />

                        <Link
                            to={`/company/appointments/${appointmentId}`}
                            className="transition hover:text-navy"
                        >
                            Appointment Details
                        </Link>

                        <ChevronRight className="h-3 w-3 text-gray" />

                        <span className="font-bold text-navy">
                            Payment
                        </span>

                    </div>

                    {/* Header */}
                    <div className="border-b border-gray/20 pb-5">

                        <div className="flex flex-wrap items-center gap-3">

                            <h1 className="font-serif text-4xl text-navy">
                                Payment
                            </h1>

                            <span className="rounded-lg border border-gray/30 bg-white px-3 py-1.5 text-xs font-bold text-slate">
                                {appointmentId || "APT-00942"}
                            </span>

                        </div>

                        <p className="mt-2 text-sm text-slate">
                            Review and manage the cash payment for this appointment.
                        </p>

                    </div>

                    {/* Main Grid */}
                    <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">

                        {/* Card A — Appointment Summary */}
                        <div className="rounded-xl border border-gray/20 bg-white p-7 shadow-sm">

                            <h2 className="font-serif text-2xl text-navy">
                                Appointment Summary
                            </h2>

                            <div className="my-5 border-b border-gray/20" />

                            {/* Customer */}
                            <div className="mb-4 flex items-start justify-between gap-6">
                                <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                    Customer
                                </p>

                                <p className="text-right text-base font-bold text-navy">
                                    {appointmentData.customer}
                                </p>
                            </div>

                            {/* Service */}
                            <div className="mb-4 flex items-start justify-between gap-6">
                                <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                    Service
                                </p>

                                <p className="text-right text-base font-bold text-navy">
                                    {appointmentData.service}
                                </p>
                            </div>

                            {/* Staff */}
                            <div className="mb-4 flex items-start justify-between gap-6">
                                <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                    Staff
                                </p>

                                <p className="text-right text-base font-bold text-navy">
                                    {appointmentData.staff}
                                </p>
                            </div>

                            {/* Date & Time */}
                            <div className="flex items-start justify-between gap-6">
                                <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                    Date & Time
                                </p>

                                <div className="text-right">
                                    <p className="text-base font-bold text-navy">
                                        {appointmentData.dateTime.date}
                                    </p>

                                    <p className="mt-0.5 text-xs text-slate">
                                        {appointmentData.dateTime.start} -{" "}
                                        {appointmentData.dateTime.end}
                                    </p>
                                </div>
                            </div>

                            <div className="my-5 border-b border-gray/20" />

                            {/* Status */}
                            <div className="flex items-center justify-between gap-6">
                                <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                    Status
                                </p>

                                <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-bold text-green-700">
                                    {appointmentData.status}
                                </span>
                            </div>

                        </div>

                        {/* Card B — Payment */}
                        <div>
                            <div className="overflow-hidden rounded-xl border border-gray/20 bg-white shadow-sm">

                                {/* Accent Bar */}
                                <div className="h-1.5 w-full bg-navy" />

                                <div className="p-8">

                                    {/* Amount */}
                                    <div className="mb-5 text-center">

                                        <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate">
                                            Amount Due
                                        </p>

                                        <div className="flex items-end justify-center gap-1">

                                            <span className="mb-1 font-serif text-2xl text-navy">
                                                Rs.
                                            </span>

                                            <span className="font-serif text-5xl font-bold text-navy">
                                                {appointmentData.amount}
                                            </span>

                                        </div>

                                    </div>

                                    <div className="mb-5 border-b border-gray/20" />

                                    {/* Payment Method */}
                                    <div className="mb-3 flex items-center justify-between gap-4 rounded-lg border border-gray/20 bg-beige/30 px-4 py-3.5">

                                        <div className="flex items-center gap-2.5">
                                            <Banknote className="h-4 w-4 text-slate" />

                                            <span className="text-sm text-navy">
                                                Payment Method
                                            </span>
                                        </div>

                                        <span className="text-right text-sm font-bold uppercase tracking-wide text-navy">
                                            Cash on Reception
                                        </span>

                                    </div>

                                    {/* Payment Status */}
                                    <div className="flex items-center justify-between gap-4 rounded-lg border border-gray/20 bg-beige/30 px-4 py-3.5">

                                        <div className="flex items-center gap-2.5">
                                            <Clock3
                                                className={`h-4 w-4 ${
                                                    paymentStatus === "paid"
                                                        ? "text-green-600"
                                                        : "text-amber-600"
                                                }`}
                                            />

                                            <span className="text-sm text-navy">
                                                Payment Status
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-1.5">

                                            <span
                                                className={`h-2 w-2 rounded-full ${
                                                    paymentStatus === "paid"
                                                        ? "bg-green-500"
                                                        : "bg-amber-500"
                                                }`}
                                            />

                                            <span
                                                className={`text-sm font-bold uppercase tracking-wide ${
                                                    paymentStatus === "paid"
                                                        ? "text-green-700"
                                                        : "text-amber-700"
                                                }`}
                                            >
                                                {paymentStatus === "paid" ? "PAID" : "PENDING"}
                                            </span>

                                        </div>

                                    </div>

                                    {/* Action */}
                                    <div className="mt-5 text-center">

                                        <button
                                            type="button"
                                            onClick={handleMarkAsPaid}
                                            disabled={paymentStatus === "paid"}
                                            className={`
                                                mx-auto
                                                flex
                                                items-center
                                                gap-2
                                                rounded-lg
                                                px-8
                                                py-3.5
                                                text-sm
                                                font-bold
                                                uppercase
                                                tracking-wide
                                                transition
                                                ${
                                                    paymentStatus === "paid"
                                                        ? "cursor-not-allowed bg-gray/10 text-slate"
                                                        : confirmingPayment
                                                        ? "bg-gold text-navy hover:bg-navy hover:text-white"
                                                        : "bg-navy text-white hover:bg-gold hover:text-navy"
                                                }
                                            `}
                                        >

                                            {paymentStatus === "paid" ? (
                                                "Payment Recorded"
                                            ) : confirmingPayment ? (
                                                <>
                                                    <CheckCircle2 className="h-[18px] w-[18px]" />
                                                    Confirm Rs. {appointmentData.amount} received?
                                                </>
                                            ) : (
                                                <>
                                                    <CheckCircle2 className="h-[18px] w-[18px]" />
                                                    Mark as Paid
                                                </>
                                            )}

                                        </button>

                                        <p
                                            className={`mt-2 text-xs ${
                                                paymentStatus === "paid"
                                                    ? "text-green-700"
                                                    : "text-slate"
                                            }`}
                                        >
                                            {paymentStatus === "paid"
                                                ? "Payment recorded successfully."
                                                : "Payment will be collected at reception."}
                                        </p>

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

export default PaymentCashOnReception;