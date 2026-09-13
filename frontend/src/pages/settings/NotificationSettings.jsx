import React, { useState } from "react";
import { ChevronRight, Lock } from "lucide-react";
import { Link } from "react-router-dom";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import SettingsNav from "../../components/settings/SettingsNav";

function NotificationSettings() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [masterEnabled, setMasterEnabled] = useState(true);

    const [events, setEvents] = useState([
        {
            id: 1,
            section: "Appointments",
            label: "New Appointment",
            inApp: true,
            email: true,
            locked: false,
        },
        {
            id: 2,
            section: "Appointments",
            label: "Appointment Cancelled",
            inApp: true,
            email: true,
            locked: false,
        },
        {
            id: 3,
            section: "Appointments",
            label: "Appointment Rescheduled",
            inApp: true,
            email: true,
            locked: false,
        },
        {
            id: 4,
            section: "Appointments",
            label: "Upcoming Appointment Reminder",
            inApp: true,
            email: true,
            locked: false,
        },
        {
            id: 5,
            section: "Customers",
            label: "New Customer Registered",
            inApp: true,
            email: true,
            locked: false,
        },
        {
            id: 6,
            section: "Staff",
            label: "Staff Member Added",
            inApp: true,
            email: true,
            locked: false,
        },
        {
            id: 7,
            section: "Staff",
            label: "Staff Schedule Changed",
            inApp: true,
            email: false,
            locked: false,
        },
        {
            id: 8,
            section: "Security",
            label: "New Login From Unrecognized Device",
            inApp: true,
            email: true,
            locked: true,
        },
        {
            id: 9,
            section: "Security",
            label: "Password Changed",
            inApp: true,
            email: true,
            locked: true,
        },
    ]);

    const [savedSnapshot, setSavedSnapshot] = useState(null);

    const inAppEnabledCount = events.filter(
        (event) => event.inApp
    ).length;

    const emailEnabledCount = events.filter(
        (event) => event.email
    ).length;

    function toggleMaster() {
        setMasterEnabled(!masterEnabled);
    }

    function toggleEvent(id, channel) {
        setEvents(
            events.map((event) => {
                if (event.id !== id || event.locked) {
                    return event;
                }

                return {
                    ...event,
                    [channel]: !event[channel],
                };
            })
        );
    }

    function handleSave(event) {
        if (event) {
            event.preventDefault();
        }

        setSavedSnapshot({
            masterEnabled,
            events,
        });

        // TODO: axios PUT /api/company/notification-settings
        // Payload:
        // {
        //     masterEnabled,
        //     events
        // }
    }

    const groupedEvents = Object.entries(
        events.reduce((groups, event) => {
            if (!groups[event.section]) {
                groups[event.section] = [];
            }

            groups[event.section].push(event);

            return groups;
        }, {})
    );

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
                    <div className="flex flex-wrap items-center gap-1.5 mb-2">

                        <Link
                            to="/settings"
                            className="text-sm text-slate hover:text-navy transition"
                        >
                            Settings
                        </Link>

                        <ChevronRight
                            size={12}
                            className="text-gray"
                        />

                        <span className="text-sm font-bold text-navy">
                            Notification Settings
                        </span>

                    </div>

                    {/* Header */}
                    <div className="flex flex-col gap-5 mb-6 md:flex-row md:items-start md:justify-between">

                        <div>
                            <h1 className="font-serif text-2xl text-navy sm:text-3xl md:text-4xl">
                                Notification Settings
                            </h1>

                            <p className="text-sm text-slate mt-1.5">
                                Choose which company activity and system
                                notifications you receive.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={handleSave}
                            className="
                                bg-navy
                                text-white
                                px-6
                                py-3
                                rounded-lg
                                font-bold
                                text-sm
                                hover:bg-gold
                                hover:text-navy
                                transition
                                w-full
                                md:w-auto
                            "
                        >
                            Save Changes
                        </button>

                    </div>

                    {/* Settings Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6">

                        {/* Settings Navigation */}
                        <div>
                            <SettingsNav activeSection="notifications" />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0 flex flex-col gap-6">

                            {/* Master Switch + Stats */}
                            <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-5 sm:p-6">

                                <div className="flex items-start justify-between gap-4">

                                    <div className="min-w-0">
                                        <h2 className="font-serif text-lg text-navy sm:text-xl">
                                            Company Notifications
                                        </h2>

                                        <p className="text-sm text-slate mt-1">
                                            Master switch for all non-security alerts.
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={toggleMaster}
                                        className={`
                                            relative
                                            w-12
                                            h-6
                                            rounded-full
                                            transition
                                            flex-shrink-0
                                            ${masterEnabled ? "bg-navy" : "bg-gray/30"}
                                        `}
                                        aria-label="Toggle company notifications"
                                    >
                                        <span
                                            className={`
                                                absolute
                                                top-1
                                                w-4
                                                h-4
                                                rounded-full
                                                bg-white
                                                transition-transform
                                                ${masterEnabled ? "translate-x-7" : "translate-x-1"}
                                            `}
                                        />
                                    </button>

                                </div>

                                <div className="border-t border-gray/20 my-6" />

                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-4">

                                    {/* In-App */}
                                    <div>
                                        <p className="text-xs font-bold tracking-wide text-slate uppercase">
                                            In-App
                                        </p>

                                        <p className="font-serif text-2xl text-navy mt-1">
                                            {inAppEnabledCount}
                                        </p>

                                        <p className="text-xs text-slate mt-1">
                                            enabled
                                        </p>
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <p className="text-xs font-bold tracking-wide text-slate uppercase">
                                            Email
                                        </p>

                                        <p className="font-serif text-2xl text-navy mt-1">
                                            {emailEnabledCount}
                                        </p>

                                        <p className="text-xs text-slate mt-1">
                                            enabled
                                        </p>
                                    </div>

                                    {/* Security */}
                                    <div>
                                        <p className="text-xs font-bold tracking-wide text-slate uppercase">
                                            Security
                                        </p>

                                        <div className="flex items-center gap-1.5 mt-1">
                                            <Lock className="w-4 h-4 text-slate flex-shrink-0" />

                                            <p className="font-serif text-2xl text-navy">
                                                Always
                                            </p>
                                        </div>

                                        <p className="text-xs text-slate mt-1">
                                            required
                                        </p>
                                    </div>

                                </div>

                            </div>

                            {/* Notification Events Table */}
                            <div
                                className={`
                                    bg-white
                                    rounded-xl
                                    border
                                    border-gray/20
                                    shadow-sm
                                    overflow-hidden
                                    transition
                                    ${!masterEnabled ? "opacity-50 pointer-events-none" : ""}
                                `}
                            >

                                {/* Table Header */}
                                <div className="overflow-x-auto">
                                    <div className="min-w-[520px]">

                                        <div className="grid grid-cols-[1fr_100px_100px] border-b border-gray/20 bg-beige/40">

                                            <div className="px-4 sm:px-6 py-4">
                                                <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                                    Notification Event
                                                </p>
                                            </div>

                                            <div className="px-4 py-4 text-center">
                                                <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                                    In-App
                                                </p>
                                            </div>

                                            <div className="px-4 py-4 text-center">
                                                <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                                    Email
                                                </p>
                                            </div>

                                        </div>

                                        {/* Event Sections */}
                                        {groupedEvents.map(
                                            ([section, sectionEvents]) => (
                                                <div key={section}>

                                                    {/* Section Header */}
                                                    <div className="px-4 sm:px-6 py-3 bg-gray/5 border-b border-gray/10">
                                                        <p className="text-xs font-bold uppercase tracking-wide text-navy">
                                                            {section}
                                                        </p>
                                                    </div>

                                                    {/* Events */}
                                                    {sectionEvents.map((event) => (
                                                        <div
                                                            key={event.id}
                                                            className="grid grid-cols-[1fr_100px_100px] border-b border-gray/10 last:border-b-0"
                                                        >

                                                            {/* Event Name */}
                                                            <div className="px-4 sm:px-6 py-4">
                                                                <p className="text-sm font-bold text-navy break-words">
                                                                    {event.label}
                                                                </p>

                                                                {event.helperText && (
                                                                    <p className="text-xs text-slate mt-1">
                                                                        {event.helperText}
                                                                    </p>
                                                                )}
                                                            </div>

                                                            {/* In-App */}
                                                            <div className="flex items-center justify-center px-4">
                                                                <button
                                                                    type="button"
                                                                    disabled={event.locked}
                                                                    onClick={() =>
                                                                        toggleEvent(event.id, "inApp")
                                                                    }
                                                                    aria-label={`Toggle in-app for ${event.label}`}
                                                                    className={`
                                                                        w-5
                                                                        h-5
                                                                        rounded
                                                                        border
                                                                        flex
                                                                        items-center
                                                                        justify-center
                                                                        transition
                                                                        ${
                                                                            event.inApp
                                                                                ? "bg-navy border-navy"
                                                                                : "bg-white border-gray"
                                                                        }
                                                                        ${
                                                                            event.locked
                                                                                ? "cursor-not-allowed"
                                                                                : "cursor-pointer hover:border-navy"
                                                                        }
                                                                    `}
                                                                >
                                                                    {event.inApp && (
                                                                        <span className="text-white text-xs font-bold">
                                                                            ✓
                                                                        </span>
                                                                    )}
                                                                </button>
                                                            </div>

                                                            {/* Email */}
                                                            <div className="flex items-center justify-center px-4">
                                                                <button
                                                                    type="button"
                                                                    disabled={event.locked}
                                                                    onClick={() =>
                                                                        toggleEvent(event.id, "email")
                                                                    }
                                                                    aria-label={`Toggle email for ${event.label}`}
                                                                    className={`
                                                                        w-5
                                                                        h-5
                                                                        rounded
                                                                        border
                                                                        flex
                                                                        items-center
                                                                        justify-center
                                                                        transition
                                                                        ${
                                                                            event.email
                                                                                ? "bg-navy border-navy"
                                                                                : "bg-white border-gray"
                                                                        }
                                                                        ${
                                                                            event.locked
                                                                                ? "cursor-not-allowed"
                                                                                : "cursor-pointer hover:border-navy"
                                                                        }
                                                                    `}
                                                                >
                                                                    {event.email && (
                                                                        <span className="text-white text-xs font-bold">
                                                                            ✓
                                                                        </span>
                                                                    )}
                                                                </button>
                                                            </div>

                                                        </div>
                                                    ))}

                                                </div>
                                            )
                                        )}

                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>

                </main>

            </div>

        </div>
    );
}

export default NotificationSettings;