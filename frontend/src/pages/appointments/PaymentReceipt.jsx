import React, { useState } from "react";
import { ArrowLeft, Download, Printer } from "lucide-react";
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

                        {/* Receipt content will be added next */}
                        <div className="min-h-[500px] flex items-center justify-center">
                            <p className="text-sm text-slate">
                                Payment Receipt
                            </p>
                        </div>

                    </div>

                </main>
            </div>
        </div>
    );
}

export default PaymentReceipt;