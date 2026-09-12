import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    ChevronRight,
    Mail,
    Phone,
    User,
} from "lucide-react";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";

function AddCustomer() {
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [mode, setMode] = useState("manual");

    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        email: "",
        notes: "",
    });

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const isManualValid = formData.fullName.trim().length > 0;

    const isInviteValid = formData.email.trim().length > 0;

    function handleSubmit(event) {
        event.preventDefault();

        if (mode === "manual") {
            if (!isManualValid) {
                return;
            }

            // TODO: axios POST /api/company/customers
            // Payload:
            // {
            //     name: formData.fullName,
            //     phone: formData.phone,
            //     email: formData.email,
            //     notes: formData.notes
            // }

            return;
        }

        if (mode === "invite") {
            if (!isInviteValid) {
                return;
            }

            // TODO: axios POST /api/company/customers/invite
            // Payload:
            // {
            //     contact: formData.email,
            //     name: formData.fullName
            // }

            return;
        }
    }

    return (
        <div className="flex min-h-screen bg-beige/30">

            {/* Desktop Sidebar */}
            <div className="hidden lg:block">
                <Sidebar
                    companyName="Shifa Clinic"
                    activeItem="Customers"
                    ctaLabel="Book Appointment"
                />
            </div>

            {/* Mobile Sidebar */}
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

                    <div className="fixed left-0 top-0 z-40 h-screen lg:hidden">
                        <Sidebar
                            companyName="Shifa Clinic"
                            activeItem="Customers"
                            ctaLabel="Book Appointment"
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
                    simpleProfileIcon
                    searchPlaceholder="Search..."
                />

                <main className="bg-beige px-4 py-5 md:px-8 md:py-6">

                    {/* Breadcrumb */}
                    <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide">

                        <Link
                            to="/company/customers"
                            className="text-slate transition hover:text-navy"
                        >
                            Customers
                        </Link>

                        <ChevronRight className="h-3.5 w-3.5 text-gray" />

                        <span className="text-navy">
                            Add Customer
                        </span>

                    </div>

                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="font-serif text-4xl text-navy">
                            Add Customer
                        </h1>

                        <p className="mt-1.5 text-sm text-slate">
                            Add a new customer record or send them an invitation
                            to join TIMEORA.
                        </p>
                    </div>

                    {/* Mode Toggle */}
                    <div className="mb-6 inline-flex items-center rounded-lg border border-gray/30 bg-white p-1">

                        <button
                            type="button"
                            onClick={function () {
                                setMode("manual");
                            }}
                            className={`flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-bold transition ${
                                mode === "manual"
                                    ? "bg-navy text-white"
                                    : "text-slate hover:bg-beige/50"
                            }`}
                        >
                            <User className="h-4 w-4" />

                            Add Manually
                        </button>

                        <button
                            type="button"
                            onClick={function () {
                                setMode("invite");
                            }}
                            className={`flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-bold transition ${
                                mode === "invite"
                                    ? "bg-navy text-white"
                                    : "text-slate hover:bg-beige/50"
                            }`}
                        >
                            <Mail className="h-4 w-4" />

                            Send Invitation
                        </button>

                    </div>

                    {/* Main Card — centered */}
                    <div className="mx-auto w-full max-w-[640px] rounded-xl border border-gray/20 bg-white p-6 shadow-sm md:p-8">

                        {mode === "manual" ? (
                            <form onSubmit={handleSubmit}>

                                {/* Heading */}
                                <h2 className="font-serif text-2xl text-navy">
                                    Customer Information
                                </h2>

                                <p className="mt-2 text-sm leading-relaxed text-slate">
                                    Add the customer's basic information.
                                    They will not receive login access from this
                                    manual registration.
                                </p>

                                <div className="mt-5 border-b border-gray/20" />

                                {/* Full Name */}
                                <div className="mt-6">
                                    <label className="mb-2 block text-sm font-serif text-navy">
                                        Full Name
                                        <span className="ml-1 text-gold">*</span>
                                    </label>

                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />

                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            placeholder="Enter customer name"
                                            required
                                            className="
                                                h-11
                                                w-full
                                                rounded-xl
                                                border
                                                border-gray/40
                                                bg-white
                                                pl-11
                                                pr-4
                                                font-serif
                                                text-sm
                                                text-navy
                                                outline-none
                                                transition
                                                focus:border-gold
                                                focus:ring-1
                                                focus:ring-gold
                                            "
                                        />
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="mt-5">
                                    <label className="mb-2 block text-sm font-serif text-navy">
                                        Phone Number
                                    </label>

                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />

                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="Enter phone number"
                                            className="
                                                h-11
                                                w-full
                                                rounded-xl
                                                border
                                                border-gray/40
                                                bg-white
                                                pl-11
                                                pr-4
                                                font-serif
                                                text-sm
                                                text-navy
                                                outline-none
                                                transition
                                                focus:border-gold
                                                focus:ring-1
                                                focus:ring-gold
                                            "
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="mt-5">
                                    <label className="mb-2 block text-sm font-serif text-navy">
                                        Email
                                        <span className="ml-1 text-xs text-slate">
                                            (Optional)
                                        </span>
                                    </label>

                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />

                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="customer@example.com"
                                            className="
                                                h-11
                                                w-full
                                                rounded-xl
                                                border
                                                border-gray/40
                                                bg-white
                                                pl-11
                                                pr-4
                                                font-serif
                                                text-sm
                                                text-navy
                                                outline-none
                                                transition
                                                focus:border-gold
                                                focus:ring-1
                                                focus:ring-gold
                                            "
                                        />
                                    </div>
                                </div>

                                {/* Notes */}
                                <div className="mt-5">
                                    <label className="mb-2 block text-sm font-serif text-navy">
                                        Notes
                                        <span className="ml-1 text-xs text-slate">
                                            (Optional)
                                        </span>
                                    </label>

                                    <textarea
                                        name="notes"
                                        value={formData.notes}
                                        onChange={handleChange}
                                        placeholder="Add any notes about this customer..."
                                        rows="4"
                                        className="
                                            w-full
                                            resize-none
                                            rounded-xl
                                            border
                                            border-gray/40
                                            bg-white
                                            px-4
                                            py-3
                                            font-serif
                                            text-sm
                                            text-navy
                                            outline-none
                                            transition
                                            focus:border-gold
                                            focus:ring-1
                                            focus:ring-gold
                                        "
                                    />
                                </div>

                                {/* Footer */}
                                <div className="mt-8 border-t border-gray/20 pt-6">
                                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                                        {/* Cancel */}
                                        <button
                                            type="button"
                                            onClick={function () {
                                                navigate(-1);
                                            }}
                                            className="
                                                rounded-lg
                                                border
                                                border-gray/40
                                                px-5
                                                py-2.5
                                                text-sm
                                                font-bold
                                                text-slate
                                                transition
                                                hover:border-navy
                                                hover:text-navy
                                            "
                                        >
                                            Cancel
                                        </button>

                                        {/* Add Customer */}
                                        <button
                                            type="submit"
                                            disabled={!isManualValid}
                                            className="
                                                rounded-lg
                                                bg-navy
                                                px-5
                                                py-2.5
                                                text-sm
                                                font-bold
                                                text-white
                                                transition
                                                hover:bg-gold
                                                hover:text-navy
                                                disabled:cursor-not-allowed
                                                disabled:opacity-40
                                            "
                                        >
                                            Add Customer
                                        </button>

                                    </div>
                                </div>

                            </form>
                        ) : (
                            <form onSubmit={handleSubmit}>

                                {/* Heading */}
                                <h2 className="font-serif text-2xl text-navy">
                                    Send Invitation
                                </h2>

                                <p className="mt-2 text-sm leading-relaxed text-slate">
                                    Invite a customer to create their TIMEORA account.
                                    Once they accept, they will be automatically associated
                                    with your company.
                                </p>

                                <div className="mt-5 border-b border-gray/20" />

                                {/* Email */}
                                <div className="mt-6">
                                    <label className="mb-2 block text-sm font-serif text-navy">
                                        Email Address
                                        <span className="ml-1 text-gold">*</span>
                                    </label>

                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />

                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="customer@example.com"
                                            required
                                            className="
                                                h-11
                                                w-full
                                                rounded-xl
                                                border
                                                border-gray/40
                                                bg-white
                                                pl-11
                                                pr-4
                                                font-serif
                                                text-sm
                                                text-navy
                                                outline-none
                                                transition
                                                focus:border-gold
                                                focus:ring-1
                                                focus:ring-gold
                                            "
                                        />
                                    </div>
                                </div>

                                {/* Full Name */}
                                <div className="mt-5">
                                    <label className="mb-2 block text-sm font-serif text-navy">
                                        Full Name
                                        <span className="ml-1 text-xs text-slate">
                                            (Optional)
                                        </span>
                                    </label>

                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />

                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            placeholder="Enter customer name"
                                            className="
                                                h-11
                                                w-full
                                                rounded-xl
                                                border
                                                border-gray/40
                                                bg-white
                                                pl-11
                                                pr-4
                                                font-serif
                                                text-sm
                                                text-navy
                                                outline-none
                                                transition
                                                focus:border-gold
                                                focus:ring-1
                                                focus:ring-gold
                                            "
                                        />
                                    </div>
                                </div>

                                {/* Preview */}
                                <div className="mt-6 rounded-xl border border-gray/20 bg-beige/40 p-4">
                                    <p className="text-xs font-bold uppercase tracking-wide text-navy">
                                        Invitation Preview
                                    </p>

                                    <p className="mt-2 text-sm leading-relaxed text-slate">
                                        An email invitation will be sent to the customer
                                        with instructions to create their TIMEORA account.
                                    </p>
                                </div>

                                {/* Footer */}
                                <div className="mt-8 border-t border-gray/20 pt-6">
                                    <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                                        <button
                                            type="button"
                                            onClick={function () {
                                                navigate(-1);
                                            }}
                                            className="
                                                rounded-lg
                                                border
                                                border-gray/40
                                                px-5
                                                py-2.5
                                                text-sm
                                                font-bold
                                                text-slate
                                                transition
                                                hover:border-navy
                                                hover:text-navy
                                            "
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            type="submit"
                                            disabled={!isInviteValid}
                                            className="
                                                rounded-lg
                                                bg-navy
                                                px-5
                                                py-2.5
                                                text-sm
                                                font-bold
                                                text-white
                                                transition
                                                hover:bg-gold
                                                hover:text-navy
                                                disabled:cursor-not-allowed
                                                disabled:opacity-40
                                            "
                                        >
                                            Send Invitation
                                        </button>

                                    </div>
                                </div>

                            </form>
                        )}

                    </div>

                </main>
            </div>
        </div>
    );
}

export default AddCustomer;