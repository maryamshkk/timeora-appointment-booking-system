import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
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
                            {/* Appointment Summary — next step */}
                            {/* Cancellation Reason — next step */}
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
