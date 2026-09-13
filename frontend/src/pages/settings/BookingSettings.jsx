import React, { useState } from "react";
import {
    CheckCircle2,
    ChevronDown,
    ChevronRight,
    Info,
    Save,
} from "lucide-react";
import { Link } from "react-router-dom";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import SettingsNav from "../../components/settings/SettingsNav";

function BookingSettings() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [formData, setFormData] = useState({
        onlineBookingEnabled: true,
        minNoticeValue: 2,
        minNoticeUnit: "Hours",
        maxWindowValue: 60,
        maxWindowUnit: "Days",
        cancellationPolicyEnabled: true,
        cancellationDeadlineValue: 24,
        cancellationDeadlineUnit: "Hours before",
        reschedulingPolicyEnabled: true,
        reschedulingDeadlineValue: 24,
        reschedulingDeadlineUnit: "Hours before",
        maxReschedules: 2,
        sameDayBooking: false,
        appointmentBufferEnabled: true,
        appointmentBufferMinutes: 15,
        autoConfirmationEnabled: true,
    });

    const [savedSnapshot, setSavedSnapshot] = useState(formData);

    function handleToggle(field) {
        setFormData((previous) => ({
            ...previous,
            [field]: !previous[field],
        }));
    }

    function handleFieldChange(field, value) {
        setFormData((previous) => ({
            ...previous,
            [field]: value,
        }));
    }

    function handleSave(event) {
        if (event) {
            event.preventDefault();
        }

        setSavedSnapshot({
            ...formData,
        });

        // TODO: axios PUT /api/company/booking-settings
        // Payload:
        // {
        //     ...formData
        // }
    }

    return (
        <div className="min-h-screen flex bg-beige">

            {/* Desktop Sidebar */}
            <div className="hidden lg:block lg:flex-shrink-0">
                <Sidebar activeItem="Settings" />
            </div>

            {/* Mobile / Tablet Sidebar — overlay drawer */}
            {sidebarOpen && (
                <>
                    <button
                        type="button"
                        onClick={() => setSidebarOpen(false)}
                        className="fixed inset-0 z-30 bg-navy/50 lg:hidden"
                        aria-label="Close menu"
                    />

                    <div className="fixed left-0 top-0 z-40 h-screen w-64 max-w-[80vw] overflow-y-auto lg:hidden">
                        <Sidebar activeItem="Settings" />
                    </div>
                </>
            )}

            {/* Main Area */}
            <div className="flex min-w-0 flex-1 flex-col">

                <Topbar
                    onMenuClick={() => setSidebarOpen(true)}
                    showBell
                    simpleProfileIcon
                    searchPlaceholder="Search settings..."
                />

                <main className="flex-1 bg-beige px-4 py-5 sm:px-6 md:px-8 md:py-6">

                    {/* Breadcrumb */}
                    <div className="flex flex-wrap items-center gap-2 mb-6 text-sm">

                        <Link
                            to="/settings"
                            className="text-slate hover:text-navy transition"
                        >
                            Settings
                        </Link>

                        <ChevronRight className="w-3 h-3 text-gray" />

                        <span className="font-bold text-navy">
                            Booking Settings
                        </span>

                    </div>

                    {/* Header */}
                    <div className="flex flex-col gap-5 mb-6 md:flex-row md:items-start md:justify-between">

                        <div>
                            <h1 className="font-serif text-2xl text-navy sm:text-3xl md:text-4xl">
                                Booking Settings
                            </h1>

                            <p className="text-sm text-slate mt-1.5">
                                Control how customers book, cancel and
                                reschedule appointments.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={handleSave}
                            className="
                                flex
                                items-center
                                justify-center
                                gap-2
                                px-6
                                py-3
                                bg-navy
                                text-white
                                rounded-lg
                                font-bold
                                text-sm
                                hover:bg-gold
                                hover:text-navy
                                transition
                                w-full
                                md:w-auto
                                md:flex-shrink-0
                            "
                        >
                            <Save className="w-4 h-4" />
                            Save Changes
                        </button>

                    </div>

                    {/* Settings Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_280px] gap-6">

                        {/* Left */}
                        <SettingsNav activeSection="booking" />

                        {/* Center */}
                        <div className="flex flex-col gap-6 min-w-0">

                            {/* Status Summary */}
                            <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-5 sm:p-6">
                                <div className="flex flex-wrap items-center gap-5 sm:gap-6">

                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                                        </div>

                                        <div>
                                            <p className="text-sm font-bold text-navy">
                                                Online Booking
                                            </p>

                                            <p className="text-xs text-slate">
                                                {formData.onlineBookingEnabled ? "Enabled" : "Disabled"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="sm:border-l sm:border-gray/20 sm:pl-6">
                                        <p className="text-xs text-gray uppercase tracking-wide">
                                            Min Notice
                                        </p>

                                        <p className="text-sm font-bold text-navy mt-1">
                                            {formData.minNoticeValue}
                                            {formData.minNoticeUnit.charAt(0).toLowerCase()}
                                        </p>
                                    </div>

                                    <div className="sm:border-l sm:border-gray/20 sm:pl-6">
                                        <p className="text-xs text-gray uppercase tracking-wide">
                                            Window
                                        </p>

                                        <p className="text-sm font-bold text-navy mt-1">
                                            {formData.maxWindowValue}
                                            {formData.maxWindowUnit.charAt(0).toLowerCase()}
                                        </p>
                                    </div>

                                    <div className="sm:border-l sm:border-gray/20 sm:pl-6">
                                        <p className="text-xs text-gray uppercase tracking-wide">
                                            Cancel/Resched
                                        </p>

                                        <p className="text-sm font-bold text-navy mt-1">
                                            {formData.cancellationDeadlineValue}
                                            {formData.cancellationDeadlineUnit.startsWith("Hours") ? "h" : "d"}
                                        </p>
                                    </div>

                                </div>
                            </div>

                            {/* Online Booking */}
                            <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-5 sm:p-6">
                                <div className="flex items-start justify-between gap-6">
                                    <div className="min-w-0">
                                        <h2 className="font-serif text-lg text-navy sm:text-2xl">
                                            Online Booking
                                        </h2>

                                        <p className="text-sm text-slate mt-1">
                                            Allow customers to book appointments through your portal.
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => handleToggle("onlineBookingEnabled")}
                                        className={`
                                            relative w-12 h-6 rounded-full transition flex-shrink-0
                                            ${formData.onlineBookingEnabled ? "bg-navy" : "bg-gray/30"}
                                        `}
                                        aria-label="Toggle online booking"
                                    >
                                        <span
                                            className={`
                                                absolute top-1 w-4 h-4 rounded-full bg-white transition-transform
                                                ${formData.onlineBookingEnabled ? "translate-x-7" : "translate-x-1"}
                                            `}
                                        />
                                    </button>
                                </div>
                            </div>

                            {/* Booking Window */}
                            <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-5 sm:p-6">
                                <h2 className="font-serif text-lg text-navy sm:text-2xl mb-5">
                                    Booking Window
                                </h2>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                    <div className="min-w-0">
                                        <label className="block text-xs font-bold uppercase tracking-wide text-navy mb-2">
                                            Minimum Booking Notice
                                        </label>

                                        <div className="flex min-w-0">
                                            <input
                                                type="number"
                                                min="0"
                                                value={formData.minNoticeValue}
                                                onChange={(event) =>
                                                    handleFieldChange("minNoticeValue", Number(event.target.value))
                                                }
                                                className="w-20 min-w-0 border border-gray rounded-l-lg border-r-0 px-4 py-3 text-sm text-navy outline-none focus:border-navy"
                                            />

                                            <div className="relative flex-1 min-w-0">
                                                <select
                                                    value={formData.minNoticeUnit}
                                                    onChange={(event) =>
                                                        handleFieldChange("minNoticeUnit", event.target.value)
                                                    }
                                                    className="appearance-none w-full border border-gray rounded-r-lg px-3 py-3 pr-8 text-sm text-navy bg-white outline-none focus:border-navy"
                                                >
                                                    <option value="Hours">Hours</option>
                                                    <option value="Days">Days</option>
                                                </select>

                                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate pointer-events-none" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="min-w-0">
                                        <label className="block text-xs font-bold uppercase tracking-wide text-navy mb-2">
                                            Maximum Booking Window
                                        </label>

                                        <div className="flex min-w-0">
                                            <input
                                                type="number"
                                                min="0"
                                                value={formData.maxWindowValue}
                                                onChange={(event) =>
                                                    handleFieldChange("maxWindowValue", Number(event.target.value))
                                                }
                                                className="w-20 min-w-0 border border-gray rounded-l-lg border-r-0 px-4 py-3 text-sm text-navy outline-none focus:border-navy"
                                            />

                                            <div className="relative flex-1 min-w-0">
                                                <select
                                                    value={formData.maxWindowUnit}
                                                    onChange={(event) =>
                                                        handleFieldChange("maxWindowUnit", event.target.value)
                                                    }
                                                    className="appearance-none w-full border border-gray rounded-r-lg px-3 py-3 pr-8 text-sm text-navy bg-white outline-none focus:border-navy"
                                                >
                                                    <option value="Days">Days</option>
                                                    <option value="Weeks">Weeks</option>
                                                    <option value="Months">Months</option>
                                                </select>

                                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate pointer-events-none" />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* Cancellation + Rescheduling Policies */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                {/* Cancellation Policy */}
                                <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-5 sm:p-6">
                                    <div className="flex items-center justify-between gap-4 mb-5">
                                        <h2 className="font-serif text-lg text-navy sm:text-xl">
                                            Cancellation Policy
                                        </h2>

                                        <button
                                            type="button"
                                            onClick={() => handleToggle("cancellationPolicyEnabled")}
                                            className={`
                                                relative w-12 h-6 rounded-full transition flex-shrink-0
                                                ${formData.cancellationPolicyEnabled ? "bg-navy" : "bg-gray/30"}
                                            `}
                                            aria-label="Toggle cancellation policy"
                                        >
                                            <span
                                                className={`
                                                    absolute top-1 w-4 h-4 rounded-full bg-white transition-transform
                                                    ${formData.cancellationPolicyEnabled ? "translate-x-7" : "translate-x-1"}
                                                `}
                                            />
                                        </button>
                                    </div>

                                    <div className={`${!formData.cancellationPolicyEnabled ? "opacity-50 pointer-events-none" : ""}`}>
                                        <label className="block text-xs font-bold uppercase tracking-wide text-navy mb-2">
                                            Cancellation Deadline
                                        </label>

                                        <div className="flex min-w-0">
                                            <input
                                                type="number"
                                                min="0"
                                                value={formData.cancellationDeadlineValue}
                                                onChange={(event) =>
                                                    handleFieldChange("cancellationDeadlineValue", Number(event.target.value))
                                                }
                                                className="w-20 min-w-0 border border-gray rounded-l-lg border-r-0 px-4 py-3 text-sm text-navy outline-none focus:border-navy"
                                            />

                                            <div className="relative flex-1 min-w-0">
                                                <select
                                                    value={formData.cancellationDeadlineUnit}
                                                    onChange={(event) =>
                                                        handleFieldChange("cancellationDeadlineUnit", event.target.value)
                                                    }
                                                    className="appearance-none w-full border border-gray rounded-r-lg px-3 py-3 pr-8 text-sm text-navy bg-white outline-none focus:border-navy"
                                                >
                                                    <option value="Hours before">Hours before</option>
                                                    <option value="Days before">Days before</option>
                                                </select>

                                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate pointer-events-none" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Rescheduling Policy */}
                                <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-5 sm:p-6">
                                    <div className="flex items-center justify-between gap-4 mb-5">
                                        <h2 className="font-serif text-lg text-navy sm:text-xl">
                                            Rescheduling Policy
                                        </h2>

                                        <button
                                            type="button"
                                            onClick={() => handleToggle("reschedulingPolicyEnabled")}
                                            className={`
                                                relative w-12 h-6 rounded-full transition flex-shrink-0
                                                ${formData.reschedulingPolicyEnabled ? "bg-navy" : "bg-gray/30"}
                                            `}
                                            aria-label="Toggle rescheduling policy"
                                        >
                                            <span
                                                className={`
                                                    absolute top-1 w-4 h-4 rounded-full bg-white transition-transform
                                                    ${formData.reschedulingPolicyEnabled ? "translate-x-7" : "translate-x-1"}
                                                `}
                                            />
                                        </button>
                                    </div>

                                    <div className={`${!formData.reschedulingPolicyEnabled ? "opacity-50 pointer-events-none" : ""}`}>

                                        <div className="mb-5">
                                            <label className="block text-xs font-bold uppercase tracking-wide text-navy mb-2">
                                                Rescheduling Deadline
                                            </label>

                                            <div className="flex min-w-0">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={formData.reschedulingDeadlineValue}
                                                    onChange={(event) =>
                                                        handleFieldChange("reschedulingDeadlineValue", Number(event.target.value))
                                                    }
                                                    className="w-20 min-w-0 border border-gray rounded-l-lg border-r-0 px-4 py-3 text-sm text-navy outline-none focus:border-navy"
                                                />

                                                <div className="relative flex-1 min-w-0">
                                                    <select
                                                        value={formData.reschedulingDeadlineUnit}
                                                        onChange={(event) =>
                                                            handleFieldChange("reschedulingDeadlineUnit", event.target.value)
                                                        }
                                                        className="appearance-none w-full border border-gray rounded-r-lg px-3 py-3 pr-8 text-sm text-navy bg-white outline-none focus:border-navy"
                                                    >
                                                        <option value="Hours before">Hours before</option>
                                                        <option value="Days before">Days before</option>
                                                    </select>

                                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate pointer-events-none" />
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wide text-navy mb-2">
                                                Maximum Reschedules
                                            </label>

                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={formData.maxReschedules}
                                                    onChange={(event) =>
                                                        handleFieldChange("maxReschedules", Number(event.target.value))
                                                    }
                                                    className="w-24 border border-gray rounded-lg px-4 py-3 text-sm text-navy outline-none focus:border-navy"
                                                />

                                                <span className="text-sm text-slate">
                                                    times
                                                </span>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div>

                        </div>

                        {/* Right */}
                        <div className="flex flex-col gap-6">

                            {/* Appointment Rules */}
                            <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-5 sm:p-6">

                                <h2 className="font-serif text-lg text-navy sm:text-xl mb-5">
                                    Appointment Rules
                                </h2>

                                <div className="flex items-center justify-between gap-4 mb-5">
                                    <p className="text-sm font-bold text-navy">
                                        Same-Day Booking
                                    </p>

                                    <button
                                        type="button"
                                        onClick={() => handleToggle("sameDayBooking")}
                                        className={`
                                            relative w-12 h-6 rounded-full transition flex-shrink-0
                                            ${formData.sameDayBooking ? "bg-navy" : "bg-gray/30"}
                                        `}
                                        aria-label="Toggle same-day booking"
                                    >
                                        <span
                                            className={`
                                                absolute top-1 w-4 h-4 rounded-full bg-white transition-transform
                                                ${formData.sameDayBooking ? "translate-x-7" : "translate-x-1"}
                                            `}
                                        />
                                    </button>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between gap-4">
                                        <p className="text-sm font-bold text-navy">
                                            Appointment Buffer
                                        </p>

                                        <button
                                            type="button"
                                            onClick={() => handleToggle("appointmentBufferEnabled")}
                                            className={`
                                                relative w-12 h-6 rounded-full transition flex-shrink-0
                                                ${formData.appointmentBufferEnabled ? "bg-navy" : "bg-gray/30"}
                                            `}
                                            aria-label="Toggle appointment buffer"
                                        >
                                            <span
                                                className={`
                                                    absolute top-1 w-4 h-4 rounded-full bg-white transition-transform
                                                    ${formData.appointmentBufferEnabled ? "translate-x-7" : "translate-x-1"}
                                                `}
                                            />
                                        </button>
                                    </div>

                                    {formData.appointmentBufferEnabled && (
                                        <div className="flex items-center gap-2 mt-3">
                                            <input
                                                type="number"
                                                min="0"
                                                value={formData.appointmentBufferMinutes}
                                                onChange={(event) =>
                                                    handleFieldChange("appointmentBufferMinutes", Number(event.target.value))
                                                }
                                                className="w-16 border border-gray rounded-lg px-3 py-2 text-sm text-navy outline-none focus:border-navy"
                                            />

                                            <span className="text-sm text-slate">
                                                minutes between
                                            </span>
                                        </div>
                                    )}
                                </div>

                            </div>

                            {/* Auto Confirmation */}
                            <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-5 sm:p-6">

                                <div className="flex items-center justify-between gap-4 mb-2">

                                    <h2 className="font-serif text-lg text-navy sm:text-xl">
                                        Auto Confirmation
                                    </h2>

                                    <button
                                        type="button"
                                        onClick={() => handleToggle("autoConfirmationEnabled")}
                                        className={`
                                            relative w-12 h-6 rounded-full transition flex-shrink-0
                                            ${formData.autoConfirmationEnabled ? "bg-navy" : "bg-gray/30"}
                                        `}
                                        aria-label="Toggle auto confirmation"
                                    >
                                        <span
                                            className={`
                                                absolute top-1 w-4 h-4 rounded-full bg-white transition-transform
                                                ${formData.autoConfirmationEnabled ? "translate-x-7" : "translate-x-1"}
                                            `}
                                        />
                                    </button>

                                </div>

                                <p className="text-sm text-slate leading-relaxed">
                                    Automatically confirm valid online bookings without manual review.
                                </p>

                            </div>

                            {/* Required Details */}
                            <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-5 sm:p-6">

                                <h2 className="font-serif text-lg text-navy sm:text-xl mb-4">
                                    Required Details
                                </h2>

                                <div className="flex flex-col gap-2.5">

                                    <div className="flex items-center gap-2.5">
                                        <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />

                                        <span className="text-sm text-navy">
                                            Customer Name
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2.5">
                                        <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />

                                        <span className="text-sm text-navy">
                                            Email Address
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2.5">
                                        <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />

                                        <span className="text-sm text-navy">
                                            Phone Number
                                        </span>
                                    </div>

                                </div>

                            </div>

                            {/* Availability Info */}
                            <div className="bg-gray/10 rounded-xl p-[18px] flex items-start gap-3">

                                <Info className="w-[18px] h-[18px] text-navy flex-shrink-0 mt-px" />

                                <p className="text-sm text-slate leading-relaxed">
                                    Availability is calculated dynamically based on Business Hours,
                                    Staff Schedules, Service Durations, and the Booking Rules set here.
                                </p>

                            </div>

                        </div>

                    </div>

                </main>

            </div>

        </div>
    );
}

export default BookingSettings;