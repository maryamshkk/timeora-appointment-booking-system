import React, { useState } from "react";
import {
    ArrowRight,
    Bell,
    Check,
    ChevronDown,
    LogOut,
    Shield,
    User,
} from "lucide-react";
import { Link } from "react-router-dom";

import CustomerSidebar from "../../components/customer/CustomerSidebar";
import CustomerTopbar from "../../components/customer/CustomerTopbar";

function CustomerSettings() {
    const [language, setLanguage] = useState("English");
    const [timezone, setTimezone] = useState(
        "Pakistan Standard Time (PKT)"
    );

    const [notificationPrefs, setNotificationPrefs] = useState({
        appointmentReminders: true,
        bookingConfirmations: true,
        appointmentChanges: true,
        paymentReceiptUpdates: false,
    });

    const [securityAlerts, setSecurityAlerts] = useState(true);
    const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

    // ─────────────── Handlers ───────────────

    function handleToggleNotification(key) {
        setNotificationPrefs((current) => ({
            ...current,
            [key]: !current[key],
        }));

        // TODO: axios PATCH /api/customer/notification-preferences
        // with the updated flag.
    }

    function handleToggleSecurityAlerts() {
        setSecurityAlerts((current) => !current);

        // TODO: axios PATCH /api/customer/security-alerts
    }

    function handleLanguageChange(value) {
        setLanguage(value);

        // TODO: axios PATCH /api/customer/preferences { language: value }
    }

    function handleTimezoneChange(value) {
        setTimezone(value);

        // TODO: axios PATCH /api/customer/preferences { timezone: value }
    }

    function handleLogout() {
        // TODO: Clear session and navigate to /login.
    }

    function handleDeleteAccount() {
        // Guard: a confirmation dialog must appear before anything is deleted.
        setIsDeleteConfirmOpen(true);
    }

    function handleConfirmDelete() {
        // TODO: axios DELETE /api/customer/account
        // On success, clear session and navigate to /login.

        setIsDeleteConfirmOpen(false);
    }

    function handleCancelDelete() {
        setIsDeleteConfirmOpen(false);
    }

    // ─────────────── Toggle component (uses page's custom style) ───────────────

    function ToggleSwitch({ checked, onToggle, locked = false }) {
        return (
            <button
                type="button"
                role="switch"
                aria-checked={checked}
                onClick={locked ? undefined : onToggle}
                className={`
                    relative
                    w-11
                    h-6
                    rounded-full
                    flex-shrink-0
                    transition
                    ${
                        locked
                            ? "bg-slate/40 cursor-default"
                            : checked
                            ? "bg-navy cursor-pointer"
                            : "bg-gray/20 cursor-pointer"
                    }
                `}
            >
                {checked && !locked ? (
                    // ON: brighter blue thumb with check
                    <span
                        className="
                            absolute
                            top-0
                            right-0
                            w-6
                            h-6
                            rounded-full
                            bg-blue-500
                            flex
                            items-center
                            justify-center
                            shadow-sm
                        "
                    >
                        <Check className="w-3 h-3 text-white" />
                    </span>
                ) : (
                    // OFF (or locked-on): plain white thumb on the left
                    <span
                        className="
                            absolute
                            top-0
                            left-0
                            w-6
                            h-6
                            rounded-full
                            bg-white
                            shadow-sm
                        "
                    />
                )}
            </button>
        );
    }

    return (
        <div className="min-h-screen bg-beige flex">

            <CustomerSidebar activeItem="Settings" />

            <div className="flex-1 min-w-0">

                <CustomerTopbar />

                <main className="px-8 py-6">

                    <div className="max-w-3xl">

                        {/* Header */}
                        <div className="mb-10">
                            <h1 className="font-serif text-4xl font-bold text-navy mb-1.5">
                                Settings
                            </h1>

                            <p className="text-sm text-slate">
                                Manage your account preferences, notifications
                                and security.
                            </p>
                        </div>

                        {/* ─────────────── Account ─────────────── */}
                        <section className="mb-8">

                            <div className="flex items-center gap-2 mb-1">
                                <User className="w-5 h-5 text-navy" />

                                <h2 className="font-serif text-2xl text-navy">
                                    Account
                                </h2>
                            </div>

                            <div className="border-b border-gray/20 mb-6"></div>

                            {/* Profile Information */}
                            <div className="flex justify-between items-start gap-4 pb-6 border-b border-gray/20 mb-6 flex-wrap">

                                <div className="min-w-0">
                                    <p className="text-xs font-bold uppercase tracking-wide text-navy mb-1">
                                        Profile Information
                                    </p>

                                    <p className="text-sm text-slate">
                                        Manage your name, contact information
                                        and profile photo.
                                    </p>
                                </div>

                                <Link
                                    to="/customer/profile"
                                    className="
                                        inline-flex
                                        items-center
                                        gap-1.5
                                        text-sm
                                        font-bold
                                        text-navy
                                        hover:text-gold
                                        transition
                                        flex-shrink-0
                                    "
                                >
                                    View Profile
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </Link>

                            </div>

                            {/* Language / Timezone */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wide text-navy mb-2">
                                        Language
                                    </label>

                                    <div className="relative">

                                        <select
                                            value={language}
                                            onChange={(event) =>
                                                handleLanguageChange(event.target.value)
                                            }
                                            className="
                                                appearance-none
                                                w-full
                                                border
                                                border-gray
                                                rounded-lg
                                                px-4
                                                py-3
                                                pr-10
                                                text-sm
                                                text-navy
                                                bg-white
                                                outline-none
                                                focus:border-navy
                                                cursor-pointer
                                            "
                                        >
                                            <option value="English">English</option>
                                            <option value="Urdu">Urdu</option>
                                            <option value="Arabic">Arabic</option>
                                        </select>

                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate pointer-events-none" />

                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wide text-navy mb-2">
                                        Timezone
                                    </label>

                                    <div className="relative">

                                        <select
                                            value={timezone}
                                            onChange={(event) =>
                                                handleTimezoneChange(event.target.value)
                                            }
                                            className="
                                                appearance-none
                                                w-full
                                                border
                                                border-gray
                                                rounded-lg
                                                px-4
                                                py-3
                                                pr-10
                                                text-sm
                                                text-navy
                                                bg-white
                                                outline-none
                                                focus:border-navy
                                                cursor-pointer
                                            "
                                        >
                                            <option value="Pakistan Standard Time (PKT)">
                                                Pakistan Standard Time (PKT)
                                            </option>
                                            <option value="Gulf Standard Time (GST)">
                                                Gulf Standard Time (GST)
                                            </option>
                                            <option value="UTC">
                                                UTC
                                            </option>
                                        </select>

                                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate pointer-events-none" />

                                    </div>
                                </div>

                            </div>

                        </section>

                        {/* ─────────────── Notifications ─────────────── */}
                        <section className="mt-10 mb-8">

                            <div className="flex items-center gap-2 mb-1">
                                <Bell className="w-5 h-5 text-navy" />

                                <h2 className="font-serif text-2xl text-navy">
                                    Notifications
                                </h2>
                            </div>

                            <div className="border-b border-gray/20 mb-5"></div>

                            <p className="text-sm text-slate mb-5">
                                Choose how TIMEORA keeps you informed.
                            </p>

                            {/* Appointment Reminders */}
                            <div className="flex justify-between items-center py-4 border-b border-gray/20">
                                <span className="text-base text-navy">
                                    Appointment Reminders
                                </span>

                                <ToggleSwitch
                                    checked={notificationPrefs.appointmentReminders}
                                    onToggle={() =>
                                        handleToggleNotification("appointmentReminders")
                                    }
                                />
                            </div>

                            {/* Booking Confirmations */}
                            <div className="flex justify-between items-center py-4 border-b border-gray/20">
                                <span className="text-base text-navy">
                                    Booking Confirmations
                                </span>

                                <ToggleSwitch
                                    checked={notificationPrefs.bookingConfirmations}
                                    onToggle={() =>
                                        handleToggleNotification("bookingConfirmations")
                                    }
                                />
                            </div>

                            {/* Appointment Changes */}
                            <div className="flex justify-between items-center py-4 border-b border-gray/20">
                                <span className="text-base text-navy">
                                    Appointment Changes
                                </span>

                                <ToggleSwitch
                                    checked={notificationPrefs.appointmentChanges}
                                    onToggle={() =>
                                        handleToggleNotification("appointmentChanges")
                                    }
                                />
                            </div>

                            {/* Payment & Receipt Updates */}
                            <div className="flex justify-between items-center py-4 border-b border-gray/20">
                                <span className="text-base text-navy">
                                    Payment & Receipt Updates
                                </span>

                                <ToggleSwitch
                                    checked={notificationPrefs.paymentReceiptUpdates}
                                    onToggle={() =>
                                        handleToggleNotification("paymentReceiptUpdates")
                                    }
                                />
                            </div>

                            {/* Important Account Notifications (locked) */}
                            <div className="flex justify-between items-center py-4">
                                <div className="min-w-0 pr-4">
                                    <p className="text-base text-navy">
                                        Important Account Notifications
                                    </p>

                                    <p className="text-xs text-slate mt-0.5">
                                        Required for important account and
                                        security updates.
                                    </p>
                                </div>

                                <ToggleSwitch checked={true} locked={true} />
                            </div>

                        </section>

                        {/* ─────────────── Security ─────────────── */}
                        <section className="mt-10 mb-8">

                            <div className="flex items-center gap-2 mb-1">
                                <Shield className="w-5 h-5 text-navy" />

                                <h2 className="font-serif text-2xl text-navy">
                                    Security
                                </h2>
                            </div>

                            <div className="border-b border-gray/20 mb-5"></div>

                            <p className="text-sm text-slate mb-5">
                                Manage your account security.
                            </p>

                            {/* Password */}
                            <div className="flex justify-between items-start gap-4 py-5 border-b border-gray/20 flex-wrap">
                                <div className="min-w-0">
                                    <p className="text-xs font-bold uppercase tracking-wide text-navy mb-1">
                                        Password
                                    </p>

                                    <p className="text-sm text-slate">
                                        Last changed: Recently
                                    </p>
                                </div>

                                <Link
                                    to="/customer/change-password"
                                    className="
                                        inline-flex
                                        items-center
                                        gap-1.5
                                        text-sm
                                        font-bold
                                        text-navy
                                        hover:text-gold
                                        transition
                                        flex-shrink-0
                                    "
                                >
                                    Change Password
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>

                            {/* Active Sessions */}
                            <div className="flex justify-between items-start gap-4 py-5 border-b border-gray/20 flex-wrap">
                                <div className="min-w-0">
                                    <p className="text-xs font-bold uppercase tracking-wide text-navy mb-1">
                                        Active Sessions
                                    </p>

                                    <p className="text-sm text-slate">
                                        Current Device: Windows · Chrome
                                    </p>
                                </div>

                                <Link
                                    to="/customer/sessions"
                                    className="
                                        inline-flex
                                        items-center
                                        gap-1.5
                                        text-sm
                                        font-bold
                                        text-navy
                                        hover:text-gold
                                        transition
                                        flex-shrink-0
                                    "
                                >
                                    Manage
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </Link>
                            </div>

                            {/* Security Alerts */}
                            <div className="flex justify-between items-center py-5">
                                <span className="text-base text-navy">
                                    Security Alerts
                                </span>

                                <ToggleSwitch
                                    checked={securityAlerts}
                                    onToggle={handleToggleSecurityAlerts}
                                />
                            </div>

                        </section>

                        {/* ─────────────── Bottom Bar ─────────────── */}
                        <div className="bg-beige/60 rounded-lg p-6 mt-4 flex justify-between items-center flex-wrap gap-4">

                            <button
                                type="button"
                                onClick={handleLogout}
                                className="
                                    inline-flex
                                    items-center
                                    gap-2
                                    text-sm
                                    font-bold
                                    text-navy
                                    hover:text-gold
                                    transition
                                    cursor-pointer
                                "
                            >
                                <LogOut className="w-4 h-4" />
                                Log Out
                            </button>

                            <button
                                type="button"
                                onClick={handleDeleteAccount}
                                className="
                                    text-sm
                                    font-bold
                                    text-red-600
                                    hover:text-red-700
                                    transition
                                    cursor-pointer
                                "
                            >
                                Delete Account
                            </button>

                        </div>

                    </div>

                </main>

            </div>

            {/* ─────────────── Delete Confirmation Dialog ─────────────── */}
            {isDeleteConfirmOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4">

                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-navy/40"
                        onClick={handleCancelDelete}
                    />

                    {/* Dialog */}
                    <div className="relative bg-white rounded-xl border border-gray/20 shadow-lg max-w-md w-full p-6">

                        <h3 className="font-serif text-2xl text-navy mb-2">
                            Delete Account?
                        </h3>

                        <p className="text-sm text-slate leading-relaxed mb-6">
                            This action is permanent and cannot be undone.
                            All your appointments, receipts and account
                            history will be deleted.
                        </p>

                        <div className="flex justify-end gap-3">

                            <button
                                type="button"
                                onClick={handleCancelDelete}
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
                                onClick={handleConfirmDelete}
                                className="
                                    bg-red-600
                                    text-white
                                    font-bold
                                    text-sm
                                    px-5
                                    py-2.5
                                    rounded-lg
                                    hover:bg-red-700
                                    transition
                                    cursor-pointer
                                "
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                </div>
            )}

        </div>
    );
}

export default CustomerSettings;