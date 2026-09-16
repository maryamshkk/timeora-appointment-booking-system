import React, { useState } from "react";
import {
    ArrowLeft,
    Banknote,
    CheckCircle2,
    ChevronRight,
    Download,
    Info,
    Printer,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import CustomerSidebar from "../../components/customer/CustomerSidebar";
import CustomerTopbar from "../../components/customer/CustomerTopbar";

function CustomerPaymentReceipt() {
    const { id } = useParams();

    const [receipt] = useState({
        receiptNumber: "REC-20260824-00421",
        paymentDate: "24 August 2026",

        provider: {
            name: "Shifa Clinic",
            city: "Lahore",
        },

        customer: {
            name: "Hina Malik",
        },

        appointment: {
            bookingRef: "TMR-20260821-00421",
            date: "Mon, 24 Aug 2026",
            time: "10:00 AM",
            staffName: "Dr. Sara Ahmed",
        },

        lineItems: [
            {
                description: "Consultation",
                duration: "30 min",
                qty: 1,
                amount: "PKR 2,500",
            },
        ],

        subtotal: "PKR 2,500",
        totalPaid: "PKR 2,500",

        paymentMethod: "Cash on Reception",
        status: "paid",
    });

    // TODO: Replace the seeded receipt with a real fetch keyed by the route param.

    function handlePrintReceipt() {
        // TODO: Trigger window.print() or render a print-friendly layout.
    }

    function handleDownloadReceipt() {
        // TODO: Generate/download the receipt as a PDF
        // (client-side library like jsPDF, or a backend endpoint).
    }

    return (
        <div className="min-h-screen bg-beige flex">

            <CustomerSidebar activeItem="Receipts" />

            <div className="flex-1 min-w-0">

                <CustomerTopbar />

                <main className="px-8 py-6">

                    {/* Breadcrumb */}
                    <div className="flex items-center flex-wrap gap-1.5 mb-2">

                        <Link
                            to="/customer/appointments"
                            className="text-xs font-bold uppercase tracking-wide text-slate hover:text-navy transition"
                        >
                            My Appointments
                        </Link>

                        <ChevronRight className="w-3 h-3 text-gray flex-shrink-0" />

                        <Link
                            to={`/customer/appointments/${id}/detail`}
                            className="text-xs font-bold uppercase tracking-wide text-slate hover:text-navy transition"
                        >
                            Appointment Details
                        </Link>

                        <ChevronRight className="w-3 h-3 text-gray flex-shrink-0" />

                        <span className="text-xs font-bold uppercase tracking-wide text-navy underline">
                            Receipt
                        </span>

                    </div>

                    {/* Header Row */}
                    <div className="flex justify-between items-start gap-6 mb-6 flex-wrap">

                        <div>
                            <h1 className="font-serif text-4xl text-navy">
                                Receipt
                            </h1>

                            <p className="text-sm text-slate mt-1.5">
                                Payment receipt for your appointment.
                            </p>
                        </div>

                        <div className="text-right flex flex-col items-end">

                            <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full mb-2">
                                <CheckCircle2 className="w-3 h-3" />
                                Paid
                            </span>

                            <Link
                                to={`/customer/appointments/${id}`}
                                className="
                                    inline-flex
                                    items-center
                                    gap-1.5
                                    text-sm
                                    font-bold
                                    text-navy
                                    hover:text-gold
                                    transition
                                "
                            >
                                <ArrowLeft className="w-3.5 h-3.5" />
                                Back to Details
                            </Link>

                        </div>

                    </div>

                    {/* Receipt card added next */}
                    {/* Receipt Card */}
<div className="bg-white rounded-xl border border-gray/20 shadow-sm overflow-hidden mb-5">

    {/* Navy Accent Strip */}
    <div className="h-2 bg-navy"></div>

    <div className="p-10">

        {/* Header */}
        <div className="flex justify-between items-start gap-6 mb-6 flex-wrap">

            <div>
                <p className="font-serif text-3xl text-navy tracking-wide">
                    TIMEORA
                </p>

                <p className="text-xs font-bold uppercase tracking-wide text-slate mt-1">
                    Payment Receipt
                </p>
            </div>

            <div className="text-right">

                <p className="text-xs font-bold uppercase tracking-wide text-slate">
                    Receipt Number
                </p>

                <p className="text-base font-bold text-navy mb-2.5">
                    {receipt.receiptNumber}
                </p>

                <p className="text-xs font-bold uppercase tracking-wide text-slate">
                    Payment Date
                </p>

                <p className="text-base font-bold text-navy">
                    {receipt.paymentDate}
                </p>

            </div>

        </div>

        <div className="border-b border-gray/20 my-5"></div>

        {/* Provider / Customer */}
        <div className="flex justify-between flex-wrap gap-4 mb-6">

            <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate mb-1">
                    Service Provider
                </p>

                <p className="font-serif text-2xl text-navy">
                    {receipt.provider.name}
                </p>

                <p className="text-sm text-slate mt-0.5">
                    {receipt.provider.city}
                </p>
            </div>

            <div className="text-right">
                <p className="text-xs font-bold uppercase tracking-wide text-slate mb-1">
                    Customer
                </p>

                <p className="text-sm text-slate">
                    Billed To:
                </p>

                <p className="font-serif text-2xl text-navy mt-0.5">
                    {receipt.customer.name}
                </p>
            </div>

        </div>

        {/* Appointment Info / Line Items / Totals / Footer — next step */}
        {/* Appointment Information */}
<div className="bg-beige/40 rounded-lg p-5 mb-7">

    <p className="text-xs font-bold uppercase tracking-wide text-navy mb-3.5">
        Appointment Information
    </p>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        <div>
            <p className="text-xs font-bold uppercase tracking-wide text-slate mb-1">
                Booking Ref
            </p>

            <p className="text-sm text-navy font-mono break-all">
                {receipt.appointment.bookingRef}
            </p>
        </div>

        <div>
            <p className="text-xs font-bold uppercase tracking-wide text-slate mb-1">
                Date
            </p>

            <p className="text-sm text-navy">
                {receipt.appointment.date}
            </p>
        </div>

        <div>
            <p className="text-xs font-bold uppercase tracking-wide text-slate mb-1">
                Time
            </p>

            <p className="text-sm text-navy">
                {receipt.appointment.time}
            </p>
        </div>

        <div>
            <p className="text-xs font-bold uppercase tracking-wide text-slate mb-1">
                Staff
            </p>

            <p className="text-sm text-navy">
                {receipt.appointment.staffName}
            </p>
        </div>

    </div>

</div>

{/* Line Items */}
<div className="mb-2">

    {/* Table Header */}
    <div className="grid grid-cols-[1fr_100px_60px_120px] text-xs font-bold uppercase tracking-wide text-slate pb-2.5 border-b border-gray/20 gap-3">
        <span>Description</span>
        <span>Duration</span>
        <span>Qty</span>
        <span className="text-right">Amount</span>
    </div>

    {/* Rows */}
    {receipt.lineItems.map((item, index) => (
        <div
            key={index}
            className="grid grid-cols-[1fr_100px_60px_120px] py-3.5 gap-3"
        >
            <span className="text-base text-navy">
                {item.description}
            </span>

            <span className="text-sm text-slate">
                {item.duration}
            </span>

            <span className="text-sm text-slate">
                {item.qty}
            </span>

            <span className="text-base font-bold text-navy text-right">
                {item.amount}
            </span>
        </div>
    ))}

</div>

<div className="border-b border-gray/20 mb-2.5"></div>

{/* Totals */}
<div className="max-w-[280px] ml-auto">

    <div className="flex justify-between items-center mb-2.5">
        <span className="text-sm text-slate">Subtotal</span>
        <span className="text-sm text-navy">{receipt.subtotal}</span>
    </div>

    <div className="border-b border-gray/20 mb-2.5"></div>

    <div className="flex justify-between items-center mb-2.5">
        <span className="text-sm font-bold uppercase tracking-wide text-navy">
            Total Paid
        </span>

        <span className="font-serif text-2xl font-bold text-navy">
            {receipt.totalPaid}
        </span>
    </div>

</div>

<div className="border-b border-gray/20 my-5"></div>

{/* Footer Row */}
<div className="flex justify-between items-center flex-wrap gap-3">

    <div className="flex items-center gap-2 text-sm text-slate">
        <Banknote className="w-4 h-4 text-navy flex-shrink-0" />

        <span>
            Payment Method:{" "}
            <span className="font-bold text-navy">
                {receipt.paymentMethod}
            </span>
        </span>
    </div>

    <div className="flex items-center gap-2 text-sm text-slate">
        <Info className="w-4 h-4 text-navy flex-shrink-0" />

        <span>
            Status:{" "}
            <span className="font-bold text-navy">
                {receipt.status === "paid" ? "Paid" : receipt.status}
            </span>
        </span>
    </div>

</div>


{/* Action Buttons */}
<div className="flex justify-end gap-3 flex-wrap">

    <button
        type="button"
        onClick={handlePrintReceipt}
        className="
            bg-white
            border-2
            border-navy
            text-navy
            uppercase
            tracking-wide
            font-bold
            text-sm
            px-6
            py-3
            rounded-lg
            flex
            items-center
            justify-center
            gap-2
            hover:bg-navy
            hover:text-white
            transition
            cursor-pointer
        "
    >
        <Printer className="w-4 h-4" />
        Print Receipt
    </button>

    <button
        type="button"
        onClick={handleDownloadReceipt}
        className="
            bg-navy
            text-white
            uppercase
            tracking-wide
            font-bold
            text-sm
            px-6
            py-3
            rounded-lg
            flex
            items-center
            justify-center
            gap-2
            hover:bg-gold
            hover:text-navy
            transition
            cursor-pointer
        "
    >
        <Download className="w-4 h-4" />
        Download Receipt
    </button>

</div>



    </div>

</div>

                </main>

            </div>

        </div>
    );
}

export default CustomerPaymentReceipt;