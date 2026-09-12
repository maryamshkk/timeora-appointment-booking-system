import React, { useState } from "react";
import { ArrowLeft, Check, Download, Printer } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";

const mockReceiptData = {
    receiptNumber: "REC-2026-00942",

    company: {
        name: "Shifa Clinic",
        address: "Lahore, Pakistan",
        email: "info@shifaclinic.com",
    },

    receiptDate: "25 August 2026",
    paymentTime: "10:18 AM",

    customer: {
        name: "Ayesha Khan",
        phone: "+92 300 1234567",
    },

    appointment: {
        id: "APT-00942",
        date: "25 August 2026",
        time: "10:00 AM - 11:00 AM",
        staff: "Dr. Sara Ahmed",
        service: "Consultation",
    },

    items: [
        {
            description: "Consultation",
            amount: 3000,
        },
    ],

    amount: 3000,
    amountPaid: 3000,
    paymentMethod: "Cash on Reception",
};

function PaymentReceipt() {
    const { appointmentId } = useParams();
    const navigate = useNavigate();

    const [receiptData, setReceiptData] = useState(mockReceiptData);

    function handleDownloadPdf() {
        // TODO: GET /api/company/receipts/:appointmentId/pdf
    }

    function handlePrint() {
        window.print();
    }

    return (
        <div className="min-h-screen flex bg-beige">

            {/* Sidebar */}
            <div className="print:hidden">
                <Sidebar
                    companyName={receiptData.company.name}
                    activeItem="Appointments"
                />
            </div>

            {/* Main Area */}
            <div className="flex-1 min-w-0">

                {/* Topbar */}
                <div className="print:hidden">
                    <Topbar
                        showBell
                        simpleProfileIcon
                        showSearch={false}
                    />
                </div>

                <main className="bg-beige px-8 py-6 flex flex-col items-center">

                    {/* Action Row */}
                    <div className="max-w-3xl w-full mb-5 flex items-center justify-between print:hidden">

                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 text-sm text-slate hover:text-navy transition"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back
                        </button>

                        <div className="flex items-center gap-3">

                            <button
                                type="button"
                                onClick={handleDownloadPdf}
                                className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray/40 rounded-lg text-sm font-bold text-navy hover:bg-beige transition"
                            >
                                <Download className="w-4 h-4" />
                                Download PDF
                            </button>

                            <button
                                type="button"
                                onClick={handlePrint}
                                className="flex items-center gap-2 px-5 py-2.5 bg-navy text-white rounded-lg text-sm font-bold hover:bg-gold hover:text-navy transition"
                            >
                                <Printer className="w-4 h-4" />
                                Print Receipt
                            </button>

                        </div>
                    </div>

                    {/* Receipt Card */}
                    <div
                        id="receipt-printable"
                        className="max-w-3xl w-full bg-white rounded-xl border border-gray/20 shadow-sm p-8 md:p-12 print:shadow-none print:border-0"
                    >

                        {/* Receipt Header */}
                        <div className="text-center">

                            <h1 className="font-serif text-4xl text-navy tracking-wide">
                                TIMEORA
                            </h1>

                            <p className="text-xs font-bold uppercase tracking-widest text-slate mt-2">
                                Payment Receipt
                            </p>

                            <p className="text-sm text-slate mt-3">
                                Receipt No. {receiptData.receiptNumber}
                            </p>

                        </div>

                        {/* Divider */}
                        <div className="border-b border-gray/30 my-8"></div>

                        {/* From + Receipt Details */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8">

                            {/* From */}
                            <div>
                                <p className="text-[11px] font-bold uppercase tracking-widest text-slate mb-3">
                                    From
                                </p>

                                <h2 className="font-serif text-xl text-navy">
                                    {receiptData.company.name}
                                </h2>

                                <p className="text-sm text-slate mt-2">
                                    {receiptData.company.address}
                                </p>

                                <p className="text-sm text-slate mt-1">
                                    {receiptData.company.email}
                                </p>
                            </div>

                            {/* Details */}
                            <div className="sm:text-right">

                                <p className="text-[11px] font-bold uppercase tracking-widest text-slate mb-3">
                                    Details
                                </p>

                                <div className="flex sm:justify-end gap-2 text-sm">
                                    <span className="text-slate">
                                        Receipt Date:
                                    </span>

                                    <span className="text-navy font-medium">
                                        {receiptData.receiptDate}
                                    </span>
                                </div>

                                <div className="flex sm:justify-end gap-2 text-sm mt-2">
                                    <span className="text-slate">
                                        Payment Time:
                                    </span>

                                    <span className="text-navy font-medium">
                                        {receiptData.paymentTime}
                                    </span>
                                </div>

                                {/* Paid Status */}
                                <div className="flex sm:justify-end items-center gap-2 mt-3">

                                    <span className="w-5 h-5 rounded-full bg-navy flex items-center justify-center">
                                        <Check className="w-3 h-3 text-white" />
                                    </span>

                                    <span className="text-xs font-bold tracking-wide text-navy">
                                        PAID
                                    </span>

                                </div>

                            </div>

                        </div>

                        {/* Billed To + Appointment Reference */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">

                            {/* Billed To */}
                            <div>
                                <p className="text-[11px] font-bold uppercase tracking-widest text-slate mb-3">
                                    Billed To
                                </p>

                                <h2 className="font-serif text-xl text-navy">
                                    {receiptData.customer.name}
                                </h2>

                                <p className="text-sm text-slate mt-2">
                                    {receiptData.customer.phone}
                                </p>
                            </div>

                            {/* Appointment Reference */}
                            <div className="bg-beige/40 border border-gray/20 rounded-lg p-5">

                                <p className="text-[11px] font-bold uppercase tracking-widest text-slate mb-4">
                                    Appointment Ref
                                </p>

                                <div className="space-y-2">

                                    <div className="flex justify-between gap-4 text-sm">
                                        <span className="text-slate">
                                            ID
                                        </span>

                                        <span className="text-navy font-bold text-right">
                                            {receiptData.appointment.id}
                                        </span>
                                    </div>

                                    <div className="flex justify-between gap-4 text-sm">
                                        <span className="text-slate">
                                            Date
                                        </span>

                                        <span className="text-navy text-right">
                                            {receiptData.appointment.date}
                                        </span>
                                    </div>

                                    <div className="flex justify-between gap-4 text-sm">
                                        <span className="text-slate">
                                            Time
                                        </span>

                                        <span className="text-navy text-right">
                                            {receiptData.appointment.time}
                                        </span>
                                    </div>

                                    <div className="flex justify-between gap-4 text-sm">
                                        <span className="text-slate">
                                            Staff
                                        </span>

                                        <span className="text-navy text-right">
                                            {receiptData.appointment.staff}
                                        </span>
                                    </div>

                                    <div className="flex justify-between gap-4 text-sm">
                                        <span className="text-slate">
                                            Service
                                        </span>

                                        <span className="text-navy text-right">
                                            {receiptData.appointment.service}
                                        </span>
                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* Line Items */}
                        <div className="mb-8">

                            {/* Table Header */}
                            <div className="grid grid-cols-[1fr_auto] gap-4 border-b border-gray/30 pb-3">
                                <p className="text-[11px] font-bold uppercase tracking-widest text-slate">
                                    Description
                                </p>

                                <p className="text-[11px] font-bold uppercase tracking-widest text-slate text-right">
                                    Amount
                                </p>
                            </div>

                            {/* Items */}
                            <div>
                                {receiptData.items.map((item, index) => (
                                    <div
                                        key={index}
                                        className="grid grid-cols-[1fr_auto] gap-4 py-4 border-b border-dashed border-gray/30"
                                    >
                                        <p className="text-sm text-navy">
                                            {item.description}
                                        </p>

                                        <p className="text-sm font-medium text-navy text-right">
                                            Rs {item.amount.toLocaleString()}
                                        </p>
                                    </div>
                                ))}
                            </div>

                        </div>

                        {/* Totals */}
                        <div className="flex flex-col items-end gap-3 mb-8">

                            {/* Subtotal */}
                            <div className="w-full sm:w-64 flex items-center justify-between text-sm">
                                <span className="text-slate">
                                    Subtotal
                                </span>

                                <span className="text-navy font-medium">
                                    Rs {receiptData.amount.toLocaleString()}
                                </span>
                            </div>

                            {/* Total */}
                            <div className="w-full sm:w-64 flex items-center justify-between text-sm">
                                <span className="text-slate font-bold">
                                    Total
                                </span>

                                <span className="text-navy font-bold">
                                    Rs {receiptData.amount.toLocaleString()}
                                </span>
                            </div>

                        </div>

                        {/* Total Paid */}
                        <div className="border-t border-gray/30 pt-6">

                            <div className="flex items-end justify-between gap-4">

                                <div>
                                    <p className="text-[11px] font-bold uppercase tracking-widest text-slate">
                                        Total Paid
                                    </p>

                                    <p className="font-serif text-3xl text-amber-700 mt-1">
                                        Rs {receiptData.amountPaid.toLocaleString()}
                                    </p>
                                </div>

                                <div className="text-right">
                                    <p className="text-xs text-slate">
                                        Balance
                                    </p>

                                    <p className="text-sm font-bold text-navy mt-1">
                                        Rs{" "}
                                        {Math.max(
                                            receiptData.amount - receiptData.amountPaid,
                                            0
                                        ).toLocaleString()}
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>

                </main>
            </div>
        </div>
    );
}

export default PaymentReceipt;