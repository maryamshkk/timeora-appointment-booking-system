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
    const [sidebarOpen, setSidebarOpen] = useState(false);

    function handleDownloadPdf() {
        // TODO: GET /api/company/receipts/:appointmentId/pdf
    }

    function handlePrint() {
        window.print();
    }

    return (
        <div className="min-h-screen flex bg-beige">

            {/* Desktop Sidebar (lg and up) */}
            <div className="hidden lg:block lg:flex-shrink-0 print:hidden">
                <Sidebar
                    companyName={receiptData.company.name}
                    activeItem="Appointments"
                />
            </div>

            {/* Mobile / Tablet Sidebar — overlay drawer */}
            {sidebarOpen && (
                <>
                    <button
                        type="button"
                        onClick={() => setSidebarOpen(false)}
                        className="fixed inset-0 z-30 bg-navy/50 lg:hidden print:hidden"
                        aria-label="Close menu"
                    />

                    <div className="fixed left-0 top-0 z-40 h-screen w-64 max-w-[80vw] overflow-y-auto lg:hidden print:hidden">
                        <Sidebar
                            companyName={receiptData.company.name}
                            activeItem="Appointments"
                        />
                    </div>
                </>
            )}

            {/* Main Area */}
            <div className="flex min-w-0 flex-1 flex-col">

                {/* Topbar */}
                <div className="print:hidden">
                    <Topbar
                        onMenuClick={() => setSidebarOpen(true)}
                        showBell
                        simpleProfileIcon
                        showSearch={false}
                    />
                </div>

                <main className="flex-1 bg-beige px-4 py-5 sm:px-6 md:px-8 md:py-6 flex flex-col items-center print:bg-white print:px-0 print:py-0">

                    {/* Action Row */}
                    <div className="max-w-3xl w-full mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between print:hidden">

                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 self-start text-sm text-slate hover:text-navy transition sm:self-auto"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back
                        </button>

                        <div className="flex flex-col gap-3 w-full sm:flex-row sm:items-center sm:w-auto">

                            <button
                                type="button"
                                onClick={handleDownloadPdf}
                                className="flex w-full items-center justify-center gap-2 px-5 py-2.5 bg-white border border-gray/40 rounded-lg text-sm font-bold text-navy hover:bg-beige transition sm:w-auto"
                            >
                                <Download className="w-4 h-4" />
                                Download PDF
                            </button>

                            <button
                                type="button"
                                onClick={handlePrint}
                                className="flex w-full items-center justify-center gap-2 px-5 py-2.5 bg-navy text-white rounded-lg text-sm font-bold hover:bg-gold hover:text-navy transition sm:w-auto"
                            >
                                <Printer className="w-4 h-4" />
                                Print Receipt
                            </button>

                        </div>
                    </div>

                    {/* Receipt Card */}
                    <div
                        id="receipt-printable"
                        className="max-w-3xl w-full bg-white rounded-xl border border-gray/20 shadow-sm p-5 sm:p-8 md:p-12 print:shadow-none print:border-0 print:rounded-none"
                    >

                        {/* Receipt Header */}
                        <div className="text-center">

                            <h1 className="font-serif text-3xl sm:text-4xl text-navy tracking-wide">
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
                        <div className="border-b border-gray/30 my-6 sm:my-8"></div>

                        {/* From + Receipt Details */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">

                            {/* From */}
                            <div>
                                <p className="text-[11px] font-bold uppercase tracking-widest text-slate mb-3">
                                    From
                                </p>

                                <h2 className="font-serif text-lg sm:text-xl text-navy">
                                    {receiptData.company.name}
                                </h2>

                                <p className="text-sm text-slate mt-2">
                                    {receiptData.company.address}
                                </p>

                                <p className="text-sm text-slate mt-1 break-words">
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

                                    <span className="w-5 h-5 rounded-full bg-navy flex items-center justify-center shrink-0">
                                        <Check className="w-3 h-3 text-white" />
                                    </span>

                                    <span className="text-xs font-bold tracking-wide text-navy">
                                        PAID
                                    </span>

                                </div>

                            </div>

                        </div>

                        {/* Billed To + Appointment Reference */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-10">

                            {/* Billed To */}
                            <div>
                                <p className="text-[11px] font-bold uppercase tracking-widest text-slate mb-3">
                                    Billed To
                                </p>

                                <h2 className="font-serif text-lg sm:text-xl text-navy">
                                    {receiptData.customer.name}
                                </h2>

                                <p className="text-sm text-slate mt-2">
                                    {receiptData.customer.phone}
                                </p>
                            </div>

                            {/* Appointment Reference */}
                            <div className="bg-beige/40 border border-gray/20 rounded-lg p-4 sm:p-5">

                                <p className="text-[11px] font-bold uppercase tracking-widest text-slate mb-4">
                                    Appointment Ref
                                </p>

                                <div className="space-y-2">

                                    <div className="flex justify-between gap-4 text-sm">
                                        <span className="text-slate">
                                            ID
                                        </span>

                                        <span className="text-navy font-bold text-right break-all">
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
                        <div className="mb-6 sm:mb-8">

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
                                        <p className="text-sm text-navy break-words">
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
                        <div className="flex flex-col items-end gap-3 mb-6 sm:mb-8">

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

                            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

                                <div>
                                    <p className="text-[11px] font-bold uppercase tracking-widest text-slate">
                                        Total Paid
                                    </p>

                                    <p className="font-serif text-2xl sm:text-3xl text-amber-700 mt-1">
                                        Rs {receiptData.amountPaid.toLocaleString()}
                                    </p>
                                </div>

                                <div className="text-left sm:text-right">
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

                        {/* Receipt Footer */}
                        <div className="border-t border-gray/30 mt-6 sm:mt-8 pt-6">

                            {/* Payment Method */}
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4 mb-6">
                                <span className="text-xs font-bold uppercase tracking-wide text-slate">
                                    Payment Method
                                </span>

                                <span className="text-sm font-bold text-navy sm:text-right">
                                    {receiptData.paymentMethod}
                                </span>
                            </div>

                            {/* Thank You */}
                            <div className="text-center pt-4">

                                <p className="font-serif text-base sm:text-lg text-navy">
                                    Thank you for choosing {receiptData.company.name}.
                                </p>

                                <p className="text-xs text-slate mt-2">
                                    We appreciate your business.
                                </p>

                            </div>

                        </div>

                    </div>

                </main>
            </div>
        </div>
    );
}

export default PaymentReceipt;