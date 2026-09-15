import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Building2,
    MapPin,
    Clock3,
    UserRound,
    CalendarDays,
    Hourglass,
    Banknote,
    Info,
} from "lucide-react";

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
        navigate("/customer/booking/service", {
            state: {
                company: selectedCompany,
            },
        });
    }

    function handleChangeStaff() {
        navigate("/customer/booking/staff", {
            state: {
                company: selectedCompany,
                service: selectedService,
            },
        });
    }

    function handleChangeDateTime() {
        navigate("/customer/booking/datetime", {
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
        // On successful response, use the returned reference code
        // instead of the temporary one below.

        // Temporary reference — replace with API response in the next step.
        const referenceCode = "TMR-20260821-00421";

        navigate("/customer/booking/confirmation", {
            state: {
                referenceCode,

                company: {
                    name: selectedCompany.name,
                    category: selectedCompany.category,
                    city: selectedCompany.city,
                    logoUrl: selectedCompany.logoUrl,
                },

                service: {
                    name: selectedService.name,
                    durationMinutes: selectedService.durationMinutes,
                    price: selectedService.price,
                },

                staff: {
                    name: selectedStaff.name,
                    role: selectedStaff.role,
                    avatarUrl: selectedStaff.avatarUrl,
                },

                date: selectedDateTime.date,
                time: selectedDateTime.time,
                durationMinutes: selectedDateTime.durationMinutes,

                payment: {
                    method: "Cash on Reception",
                    amount: `PKR ${total.toLocaleString()}`,
                },
            },
        });

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

                            {/* Company Details */}
                            <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-7">

                                {/* Header */}
                                <div className="flex justify-between items-center mb-4 gap-4">
                                    <h2 className="font-serif text-2xl text-navy">
                                        Company Details
                                    </h2>

                                    <button
                                        type="button"
                                        onClick={handleChangeCompany}
                                        className="bg-white border border-navy text-navy text-xs font-bold uppercase tracking-wide px-4 py-2 rounded-lg hover:bg-navy hover:text-white transition flex-shrink-0"
                                    >
                                        Change
                                    </button>
                                </div>

                                {/* Divider */}
                                <div className="border-b border-gray/20 mb-5"></div>

                                {/* Company */}
                                <div className="flex items-center gap-4">

                                    {selectedCompany.logoUrl ? (
                                        <img
                                            src={selectedCompany.logoUrl}
                                            alt={selectedCompany.name}
                                            className="w-14 h-14 rounded-lg object-cover border border-gray/20 flex-shrink-0"
                                        />
                                    ) : (
                                        <div className="w-14 h-14 rounded-lg bg-beige flex items-center justify-center border border-gray/20 flex-shrink-0">
                                            <Building2 className="w-6 h-6 text-navy" />
                                        </div>
                                    )}

                                    <div className="min-w-0">
                                        <p className="text-lg font-bold text-navy">
                                            {selectedCompany.name}
                                        </p>

                                        <div className="flex items-center gap-1.5 text-sm text-slate mt-1">
                                            <Building2 className="w-3.5 h-3.5 flex-shrink-0" />

                                            <span>{selectedCompany.category}</span>

                                            <span>·</span>

                                            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />

                                            <span>{selectedCompany.city}</span>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* Service Selected */}
                            <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-7">

                                {/* Header */}
                                <div className="flex justify-between items-center mb-4 gap-4">
                                    <h2 className="font-serif text-2xl text-navy">
                                        Service Selected
                                    </h2>

                                    <button
                                        type="button"
                                        onClick={handleChangeService}
                                        className="bg-white border border-navy text-navy text-xs font-bold uppercase tracking-wide px-4 py-2 rounded-lg hover:bg-navy hover:text-white transition flex-shrink-0"
                                    >
                                        Change
                                    </button>
                                </div>

                                {/* Divider */}
                                <div className="border-b border-gray/20 mb-5"></div>

                                {/* Service Information */}
                                <div className="flex items-center justify-between gap-6">

                                    <div className="min-w-0">
                                        <p className="text-lg font-bold text-navy">
                                            {selectedService.name}
                                        </p>

                                        <div className="flex items-center gap-1.5 text-sm text-slate mt-1">
                                            <Clock3 className="w-4 h-4 flex-shrink-0" />

                                            <span>
                                                {selectedService.durationMinutes} minutes
                                            </span>
                                        </div>
                                    </div>

                                    <p className="text-lg font-bold text-navy whitespace-nowrap">
                                        PKR {selectedService.price.toLocaleString()}
                                    </p>

                                </div>
                            </div>

                            {/* Specialist */}
                            <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-7">

                                {/* Header */}
                                <div className="flex justify-between items-center mb-4 gap-4">
                                    <h2 className="font-serif text-2xl text-navy">
                                        Specialist
                                    </h2>

                                    <button
                                        type="button"
                                        onClick={handleChangeStaff}
                                        className="bg-white border border-navy text-navy text-xs font-bold uppercase tracking-wide px-4 py-2 rounded-lg hover:bg-navy hover:text-white transition flex-shrink-0"
                                    >
                                        Change
                                    </button>
                                </div>

                                {/* Divider */}
                                <div className="border-b border-gray/20 mb-5"></div>

                                {/* Specialist Information */}
                                <div className="flex items-center gap-4">

                                    {selectedStaff.avatarUrl ? (
                                        <img
                                            src={selectedStaff.avatarUrl}
                                            alt={selectedStaff.name}
                                            className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                                        />
                                    ) : (
                                        <div className="w-14 h-14 rounded-lg bg-beige flex items-center justify-center flex-shrink-0">
                                            <UserRound className="w-6 h-6 text-navy" />
                                        </div>
                                    )}

                                    <div className="min-w-0">
                                        <p className="text-lg font-bold text-navy">
                                            {selectedStaff.name}
                                        </p>

                                        <p className="text-sm text-slate mt-1">
                                            {selectedStaff.role} · {selectedStaff.specialty}
                                        </p>
                                    </div>

                                </div>
                            </div>

                            {/* Date & Time */}
                            <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-7">

                                {/* Header */}
                                <div className="flex justify-between items-center mb-4 gap-4">
                                    <h2 className="font-serif text-2xl text-navy">
                                        Date & Time
                                    </h2>

                                    <button
                                        type="button"
                                        onClick={handleChangeDateTime}
                                        className="bg-white border border-navy text-navy text-xs font-bold uppercase tracking-wide px-4 py-2 rounded-lg hover:bg-navy hover:text-white transition flex-shrink-0"
                                    >
                                        Change
                                    </button>
                                </div>

                                {/* Divider */}
                                <div className="border-b border-gray/20 mb-5"></div>

                                {/* Date */}
                                <div className="flex items-center gap-2 mb-2">
                                    <CalendarDays className="w-5 h-5 text-navy flex-shrink-0" />

                                    <p className="text-base text-navy">
                                        {selectedDateTime.date}
                                    </p>
                                </div>

                                {/* Time */}
                                <div className="flex items-center gap-2 mb-2">
                                    <Clock3 className="w-5 h-5 text-navy flex-shrink-0" />

                                    <p className="text-lg font-bold text-navy">
                                        {selectedDateTime.time}
                                    </p>

                                    <span className="text-xs text-slate">
                                        {selectedDateTime.timezone}
                                    </span>
                                </div>

                                {/* Duration */}
                                <div className="flex items-center gap-2">
                                    <Hourglass className="w-4 h-4 text-slate flex-shrink-0" />

                                    <p className="text-sm text-slate">
                                        Duration: {selectedDateTime.durationMinutes} minutes
                                    </p>
                                </div>

                            </div>

                        </div>

                        {/* Right Column — Order Summary */}
                        <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6 lg:sticky lg:top-6 h-fit">

                            <h2 className="font-serif text-2xl text-navy">
                                Order Summary
                            </h2>

                            <div className="border-b border-gray/20 my-5"></div>

                            {/* Service Fee */}
                            <div className="flex items-center justify-between mb-3.5">
                                <p className="text-sm text-slate">
                                    Service Fee
                                </p>

                                <p className="text-sm text-navy">
                                    PKR {serviceFee.toLocaleString()}
                                </p>
                            </div>

                            <div className="border-b border-gray/20 my-2.5"></div>

                            {/* Subtotal */}
                            <div className="flex items-center justify-between mb-3.5">
                                <p className="text-sm font-bold text-navy">
                                    Subtotal
                                </p>

                                <p className="text-sm font-bold text-navy">
                                    PKR {subtotal.toLocaleString()}
                                </p>
                            </div>

                            <div className="border-b border-gray/20 my-2.5"></div>

                            {/* Total */}
                            <div className="flex items-center justify-between mb-5">
                                <p className="text-base font-bold uppercase text-navy">
                                    Total
                                </p>

                                <p className="text-lg font-bold text-navy">
                                    PKR {total.toLocaleString()}
                                </p>
                            </div>

                            {/* Payment Method */}
                            <div className="border border-gray/20 rounded-lg p-4 mb-4">

                                <div className="flex items-center gap-2 mb-1">
                                    <Banknote className="w-[18px] h-[18px] text-navy" />

                                    <p className="text-sm font-bold text-navy">
                                        Cash on Reception
                                    </p>
                                </div>

                                <p className="text-xs text-slate leading-relaxed">
                                    Pay at the company reception when you arrive.
                                </p>

                            </div>

                            {/* Cancellation Note */}
                            <div className="flex items-start gap-2 mb-4">

                                <Info className="w-4 h-4 text-slate flex-shrink-0 mt-0.5" />

                                <p className="text-sm text-slate leading-relaxed">
                                    Free cancellation up to 24 hours before the appointment.
                                </p>

                            </div>

                            {/* Agreement */}
                            <label className="flex items-start gap-2.5 mb-5 cursor-pointer">

                                <input
                                    type="checkbox"
                                    checked={agreedToPolicy}
                                    onChange={(event) =>
                                        setAgreedToPolicy(event.target.checked)
                                    }
                                    className="w-[18px] h-[18px] mt-0.5 flex-shrink-0 accent-navy cursor-pointer"
                                />

                                <span className="text-sm text-navy leading-relaxed">
                                    I agree to the booking and cancellation policy.
                                </span>

                            </label>

                            {/* Confirm Booking */}
                            <button
                                type="button"
                                onClick={handleConfirmBooking}
                                disabled={!agreedToPolicy || isSubmitting}
                                className="w-full bg-navy text-white uppercase tracking-wide font-bold text-sm py-3.5 rounded-lg hover:bg-gold hover:text-navy transition disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? "Confirming..." : "Confirm Booking"}
                            </button>

                        </div>

                    </div>

                </main>
            </div>
        </div>
    );
}

export default ReviewAppointment;