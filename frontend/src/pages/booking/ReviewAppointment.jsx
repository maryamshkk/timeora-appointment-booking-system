import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import CustomerSidebar from "../../components/customer/CustomerSidebar";
import CustomerTopbar from "../../components/customer/CustomerTopbar";
import BookingBreadcrumbStepper from "../../components/booking/BookingBreadcrumbStepper";

function ReviewAppointment() {
    const navigate = useNavigate();

    const [selectedCompany] = useState({
        name: "Shifa Clinic",
        category: "Healthcare",
        city: "Lahore",
        logoUrl: "",
    });

    const [selectedService] = useState({
        name: "Consultation",
        durationMinutes: 30,
        price: 2500,
    });

    const [selectedStaff] = useState({
        name: "Dr. Sara Ahmed",
        role: "Doctor",
        specialty: "General Consultation",
        avatarUrl: "",
    });

    const [selectedDateTime] = useState({
        date: "Friday, 21 August 2026",
        time: "04:00 PM",
        timezone: "PKT",
        durationMinutes: 30,
    });

    const [agreedToPolicy, setAgreedToPolicy] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const serviceFee = selectedService.price;
    const subtotal = serviceFee;
    const total = subtotal;

    function handleChangeCompany() {
        navigate("/customer/companies/1");
    }

    function handleChangeService() {
        navigate("/booking/service", {
            state: {
                company: selectedCompany,
            },
        });
    }

    function handleChangeStaff() {
        navigate("/booking/staff", {
            state: {
                company: selectedCompany,
                service: selectedService,
            },
        });
    }

    function handleChangeDateTime() {
        navigate("/booking/date-time", {
            state: {
                company: selectedCompany,
                service: selectedService,
                staff: selectedStaff,
            },
        });
    }

    function handleConfirmBooking() {
        setIsSubmitting(true);

        // TODO: POST full booking selection to /api/bookings using axios.
        // On successful response, navigate to /booking/confirmation
        // and pass the returned booking reference/data.

        setIsSubmitting(false);
    }

    return (
        <div className="min-h-screen bg-beige flex">

            {/* Sidebar */}
            <CustomerSidebar activeItem="Browse Companies" />

            {/* Main Area */}
            <div className="flex-1 min-w-0">

                <CustomerTopbar />

                <main className="px-8 py-6">

                    {/* Booking Stepper */}
                    <BookingBreadcrumbStepper
                        currentStep="summary"
                        companyName={selectedCompany.name}
                    />

                    {/* Page Header */}
                    <div className="mb-6">
                        <h1 className="font-serif text-4xl text-navy mb-1.5">
                            Review Your Appointment
                        </h1>

                        <p className="text-sm text-slate">
                            Please review your appointment details before
                            confirming.
                        </p>
                    </div>

                    {/* Main Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">

                        {/* Left Column */}
                        <div className="flex flex-col gap-6">

                            {/* Review cards will be added next */}

                        </div>

                        {/* Right Column */}
                        <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6 lg:sticky lg:top-6 h-fit">

                            <h2 className="font-serif text-2xl text-navy">
                                Order Summary
                            </h2>

                            <div className="border-b border-gray/20 my-5"></div>

                            {/* Order summary content will be added next */}

                        </div>

                    </div>

                </main>
            </div>
        </div>
    );
}

export default ReviewAppointment;
