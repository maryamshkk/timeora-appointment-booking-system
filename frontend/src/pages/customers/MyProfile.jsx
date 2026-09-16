import React, { useRef, useState } from "react";
import {
    ArrowRight,
    Calendar,
    Clock,
    IdCard,
    Mail,
    Pencil,
    Phone,
    ShieldCheck,
} from "lucide-react";

import CustomerSidebar from "../../components/customer/CustomerSidebar";
import CustomerTopbar from "../../components/customer/CustomerTopbar";

function CustomerProfile() {
    const fileInputRef = useRef(null);

    const [customer, setCustomer] = useState({
        firstName: "Hina",
        lastName: "Malik",
        email: "hina.malik@example.com",
        emailVerified: true,
        phone: "+92 300 1234567",
        dateOfBirth: "October 12, 1990",
        avatarUrl: "",
        accountType: "Customer",
        memberSince: "August 2026",
        totalAppointments: 24,
    });

    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [formData, setFormData] = useState(customer);

    const [notificationPrefs, setNotificationPrefs] = useState({
        emailUpdates: true,
        smsReminders: true,
    });

    function handleChangePhoto() {
        // TODO: open file picker + handle avatar upload.
        fileInputRef.current?.click();
    }

    function handleSaveProfile() {
        setCustomer(formData);
        setIsEditingProfile(false);

        // TODO: axios PUT /api/customer/profile with formData.
    }

    function handleCancelEdit() {
        setFormData(customer);
        setIsEditingProfile(false);
    }

    function handleToggleNotificationPref(key) {
        setNotificationPrefs((current) => ({
            ...current,
            [key]: !current[key],
        }));

        // TODO: axios PATCH /api/customer/notification-preferences
        // with the updated flag.
    }

    function handleManagePreferences() {
        // TODO: navigate to the full notification-settings page.
    }

    function handleFieldChange(field, value) {
        setFormData((current) => ({
            ...current,
            [field]: value,
        }));
    }

    return (
        <div className="min-h-screen bg-beige flex">

            <CustomerSidebar activeItem="Profile" />

            <div className="flex-1 min-w-0">

                <CustomerTopbar />

                <main className="px-8 py-6">

                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="font-serif text-4xl text-navy mb-1.5">
                            My Profile
                        </h1>

                        <p className="text-sm text-slate">
                            Manage your personal information and profile details
                        </p>
                    </div>

                    {/* Main Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">

                        {/* Left Column */}
                        <div className="flex flex-col gap-6">

                            {/* Card A — Profile Header */}
                            <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6 flex items-center justify-between flex-wrap gap-4">

                                {/* Left */}
                                <div className="flex items-center gap-5">

                                    {customer.avatarUrl ? (
                                        <img
                                            src={customer.avatarUrl}
                                            alt={`${customer.firstName} ${customer.lastName}`}
                                            className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                                        />
                                    ) : (
                                        <div className="w-20 h-20 rounded-lg bg-beige flex items-center justify-center flex-shrink-0">
                                            <span className="font-serif text-2xl text-navy">
                                                {customer.firstName.charAt(0)}
                                                {customer.lastName.charAt(0)}
                                            </span>
                                        </div>
                                    )}

                                    <div className="min-w-0">
                                        <h2 className="font-serif text-2xl text-navy">
                                            {customer.firstName} {customer.lastName}
                                        </h2>

                                        <p className="text-xs font-bold uppercase tracking-wide text-slate mt-0.5">
                                            {customer.accountType}
                                        </p>

                                        <div className="flex items-center gap-2 text-sm text-slate mt-1.5">
                                            <Mail className="w-3.5 h-3.5 flex-shrink-0" />

                                            <span className="truncate">
                                                {customer.email}
                                            </span>
                                        </div>
                                    </div>

                                </div>

                                {/* Right */}
                                <div className="flex flex-col items-end gap-2">

                                    <button
                                        type="button"
                                        onClick={() => setIsEditingProfile((prev) => !prev)}
                                        className="
                                            bg-white
                                            border-2
                                            border-navy
                                            text-navy
                                            uppercase
                                            tracking-wide
                                            font-bold
                                            text-sm
                                            px-5
                                            py-2.5
                                            rounded-lg
                                            hover:bg-navy
                                            hover:text-white
                                            transition
                                            cursor-pointer
                                        "
                                    >
                                        {isEditingProfile ? "Cancel Edit" : "Edit Profile"}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handleChangePhoto}
                                        className="
                                            text-sm
                                            font-bold
                                            text-navy
                                            hover:text-gold
                                            transition
                                            cursor-pointer
                                        "
                                    >
                                        Change Photo
                                    </button>

                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                    />

                                </div>

                            </div>

                            {/* Card B — Personal Information */}
                            <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-7">

                                {/* Header */}
                                <div className="flex justify-between items-center gap-4 mb-5">

                                    <h2 className="font-serif text-2xl text-navy">
                                        Personal Information
                                    </h2>

                                    <button
                                        type="button"
                                        onClick={() => setIsEditingProfile((prev) => !prev)}
                                        aria-label="Edit personal information"
                                        className="text-slate hover:text-navy transition cursor-pointer"
                                    >
                                        <Pencil className="w-[18px] h-[18px]" />
                                    </button>

                                </div>

                                <div className="border-b border-gray/20 mb-5"></div>

                                {/* First / Last name */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">

                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wide text-slate mb-2">
                                            First Name
                                        </label>

                                        <input
                                            type="text"
                                            value={formData.firstName}
                                            disabled={!isEditingProfile}
                                            onChange={(event) =>
                                                handleFieldChange("firstName", event.target.value)
                                            }
                                            className={`
                                                w-full
                                                rounded-lg
                                                px-4
                                                py-3
                                                text-sm
                                                border
                                                outline-none
                                                transition
                                                ${
                                                    isEditingProfile
                                                        ? "bg-white border-gray text-navy focus:border-navy focus:ring-2 focus:ring-gold"
                                                        : "bg-beige/40 border-transparent text-navy cursor-default"
                                                }
                                            `}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wide text-slate mb-2">
                                            Last Name
                                        </label>

                                        <input
                                            type="text"
                                            value={formData.lastName}
                                            disabled={!isEditingProfile}
                                            onChange={(event) =>
                                                handleFieldChange("lastName", event.target.value)
                                            }
                                            className={`
                                                w-full
                                                rounded-lg
                                                px-4
                                                py-3
                                                text-sm
                                                border
                                                outline-none
                                                transition
                                                ${
                                                    isEditingProfile
                                                        ? "bg-white border-gray text-navy focus:border-navy focus:ring-2 focus:ring-gold"
                                                        : "bg-beige/40 border-transparent text-navy cursor-default"
                                                }
                                            `}
                                        />
                                    </div>

                                </div>

                                {/* Email */}
                                <div className="mb-5">
                                    <label className="block text-xs font-bold uppercase tracking-wide text-slate mb-2">
                                        Email Address
                                    </label>

                                    <div className="flex items-center gap-3">

                                        <input
                                            type="email"
                                            value={formData.email}
                                            disabled={!isEditingProfile}
                                            onChange={(event) =>
                                                handleFieldChange("email", event.target.value)
                                            }
                                            className={`
                                                flex-1
                                                min-w-0
                                                rounded-lg
                                                px-4
                                                py-3
                                                text-sm
                                                border
                                                outline-none
                                                transition
                                                ${
                                                    isEditingProfile
                                                        ? "bg-white border-gray text-navy focus:border-navy focus:ring-2 focus:ring-gold"
                                                        : "bg-beige/40 border-transparent text-navy cursor-default"
                                                }
                                            `}
                                        />

                                        {customer.emailVerified && (
                                            <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full flex-shrink-0">
                                                <ShieldCheck className="w-3 h-3" />
                                                Verified
                                            </span>
                                        )}

                                    </div>
                                </div>

                                {/* Phone / DOB */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wide text-slate mb-2">
                                            Phone Number
                                        </label>

                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate pointer-events-none" />

                                            <input
                                                type="tel"
                                                value={formData.phone}
                                                disabled={!isEditingProfile}
                                                onChange={(event) =>
                                                    handleFieldChange("phone", event.target.value)
                                                }
                                                className={`
                                                    w-full
                                                    rounded-lg
                                                    pl-9
                                                    pr-4
                                                    py-3
                                                    text-sm
                                                    border
                                                    outline-none
                                                    transition
                                                    ${
                                                        isEditingProfile
                                                            ? "bg-white border-gray text-navy focus:border-navy focus:ring-2 focus:ring-gold"
                                                            : "bg-beige/40 border-transparent text-navy cursor-default"
                                                    }
                                                `}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wide text-slate mb-2">
                                            Date of Birth
                                        </label>

                                        <div className="relative">
                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate pointer-events-none" />

                                            <input
                                                type="text"
                                                value={formData.dateOfBirth}
                                                disabled={!isEditingProfile}
                                                onChange={(event) =>
                                                    handleFieldChange("dateOfBirth", event.target.value)
                                                }
                                                className={`
                                                    w-full
                                                    rounded-lg
                                                    pl-9
                                                    pr-4
                                                    py-3
                                                    text-sm
                                                    border
                                                    outline-none
                                                    transition
                                                    ${
                                                        isEditingProfile
                                                            ? "bg-white border-gray text-navy focus:border-navy focus:ring-2 focus:ring-gold"
                                                            : "bg-beige/40 border-transparent text-navy cursor-default"
                                                    }
                                                `}
                                            />
                                        </div>
                                    </div>

                                </div>

                                {/* Save / Cancel */}
                                {isEditingProfile && (
                                    <div className="flex justify-end gap-3 mt-6">

                                        <button
                                            type="button"
                                            onClick={handleCancelEdit}
                                            className="
                                                bg-white
                                                border
                                                border-gray
                                                text-navy
                                                font-bold
                                                text-sm
                                                px-5
                                                py-2.5
                                                rounded-lg
                                                hover:bg-beige
                                                transition
                                                cursor-pointer
                                            "
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            type="button"
                                            onClick={handleSaveProfile}
                                            className="
                                                bg-navy
                                                text-white
                                                font-bold
                                                text-sm
                                                px-5
                                                py-2.5
                                                rounded-lg
                                                hover:bg-gold
                                                hover:text-navy
                                                transition
                                                cursor-pointer
                                            "
                                        >
                                            Save Changes
                                        </button>

                                    </div>
                                )}

                            </div>

                        </div>

                        {/* Right Column */}
                        <aside className="flex flex-col gap-6">

                            {/* Account Summary */}
                            <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6">

                                <h2 className="font-serif text-2xl text-navy">
                                    Account Summary
                                </h2>

                                <div className="border-b border-gray/20 my-5"></div>

                                {/* Account Type */}
                                <div className="mb-4">
                                    <div className="flex items-center gap-2 mb-1">
                                        <IdCard className="w-4 h-4 text-slate" />

                                        <span className="text-xs font-bold uppercase tracking-wide text-slate">
                                            Account Type
                                        </span>
                                    </div>

                                    <p className="text-base font-bold text-navy">
                                        {customer.accountType}
                                    </p>
                                </div>

                                {/* Member Since */}
                                <div className="mb-4">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Clock className="w-4 h-4 text-slate" />

                                        <span className="text-xs font-bold uppercase tracking-wide text-slate">
                                            Member Since
                                        </span>
                                    </div>

                                    <p className="text-base font-bold text-navy">
                                        {customer.memberSince}
                                    </p>
                                </div>

                                {/* Appointments */}
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <Calendar className="w-4 h-4 text-slate" />

                                        <span className="text-xs font-bold uppercase tracking-wide text-slate">
                                            Appointments
                                        </span>
                                    </div>

                                    <p className="text-base font-bold text-navy">
                                        {customer.totalAppointments} Total
                                    </p>
                                </div>

                            </div>

                            {/* Notification Preferences */}
                            <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6">

                                <h2 className="font-serif text-2xl text-navy mb-1.5">
                                    Notification Preferences
                                </h2>

                                <p className="text-sm text-slate leading-relaxed mb-4">
                                    Manage how you receive updates about your
                                    appointments and account activity.
                                </p>

                                {/* Email Updates */}
                                <div className="flex justify-between items-center mb-3">

                                    <span className="text-sm text-navy">
                                        Email Updates
                                    </span>

                                    <button
                                        type="button"
                                        role="switch"
                                        aria-checked={notificationPrefs.emailUpdates}
                                        onClick={() => handleToggleNotificationPref("emailUpdates")}
                                        className={`
                                            relative
                                            w-10
                                            h-[22px]
                                            rounded-full
                                            transition
                                            cursor-pointer
                                            flex-shrink-0
                                            ${
                                                notificationPrefs.emailUpdates
                                                    ? "bg-navy"
                                                    : "bg-gray/30"
                                            }
                                        `}
                                    >
                                        <span
                                            className={`
                                                absolute
                                                top-1/2
                                                -translate-y-1/2
                                                w-[18px]
                                                h-[18px]
                                                rounded-full
                                                bg-white
                                                shadow-sm
                                                transition
                                                ${
                                                    notificationPrefs.emailUpdates
                                                        ? "left-[22px]"
                                                        : "left-0.5"
                                                }
                                            `}
                                        />
                                    </button>

                                </div>

                                {/* SMS Reminders */}
                                <div className="flex justify-between items-center mb-4">

                                    <span className="text-sm text-navy">
                                        SMS Reminders
                                    </span>

                                    <button
                                        type="button"
                                        role="switch"
                                        aria-checked={notificationPrefs.smsReminders}
                                        onClick={() => handleToggleNotificationPref("smsReminders")}
                                        className={`
                                            relative
                                            w-10
                                            h-[22px]
                                            rounded-full
                                            transition
                                            cursor-pointer
                                            flex-shrink-0
                                            ${
                                                notificationPrefs.smsReminders
                                                    ? "bg-navy"
                                                    : "bg-gray/30"
                                            }
                                        `}
                                    >
                                        <span
                                            className={`
                                                absolute
                                                top-1/2
                                                -translate-y-1/2
                                                w-[18px]
                                                h-[18px]
                                                rounded-full
                                                bg-white
                                                shadow-sm
                                                transition
                                                ${
                                                    notificationPrefs.smsReminders
                                                        ? "left-[22px]"
                                                        : "left-0.5"
                                                }
                                            `}
                                        />
                                    </button>

                                </div>

                                {/* Manage Preferences */}
                                <button
                                    type="button"
                                    onClick={handleManagePreferences}
                                    className="
                                        inline-flex
                                        items-center
                                        gap-1.5
                                        text-sm
                                        font-bold
                                        text-navy
                                        hover:text-gold
                                        transition
                                        cursor-pointer
                                    "
                                >
                                    Manage Preferences
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </button>

                            </div>

                        </aside>

                    </div>

                </main>

            </div>

        </div>
    );
}

export default CustomerProfile;