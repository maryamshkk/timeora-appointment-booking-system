import React from "react";
import { Link } from "react-router-dom";
import {
    Bell,
    Building2,
    ChevronDown,
    Clock,
    Smartphone,
} from "lucide-react";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import SettingsNav from "../../components/settings/SettingsNav";

const settingsCards = [
    {
        icon: Building2,
        title: "Company Profile",
        label: "IDENTITY",
        value: "Shifa Clinic, Lahore, Pakistan",
        buttonText: "Manage Profile",
        linkPath: "/settings/profile",
        hasStatus: true,
    },
    {
        icon: Clock,
        title: "Business Hours",
        label: "OPERATING DAYS",
        value: "Mon-Fri 09:00-18:00, Sat 09:00-14:00, Sun Closed",
        buttonText: "Manage Hours",
        linkPath: "/settings/hours",
        hasStatus: false,
    },
    {
        icon: Smartphone,
        title: "Booking Settings",
        label: "RULES",
        value: "Booking Enabled, Cancellation 24h, Rescheduling Allowed",
        buttonText: "Manage Settings",
        linkPath: "/settings/booking",
        hasStatus: false,
    },
    {
        icon: Bell,
        title: "Notification Settings",
        label: "ALERTS",
        value: "Appointment, Payment, and Staff Alerts Enabled",
        buttonText: "Manage Notifications",
        linkPath: "/settings/notifications",
        hasStatus: false,
    },
];

function CompanySettings() {
    return (
        <div className="flex min-h-screen bg-beige">

            {/* Desktop Sidebar */}
            <div className="hidden lg:block lg:flex-shrink-0">
                <Sidebar
                    companyName="Shifa Clinic"
                    activeItem="Settings"
                />
            </div>

            {/* Main Area */}
            <div className="flex min-w-0 flex-1 flex-col">

                <Topbar
                    showBell
                    simpleProfileIcon
                    showSearch={false}
                />

                <main className="flex-1 bg-beige px-4 py-5 sm:px-6 md:px-8 md:py-6">

                    {/* Page Header */}
                    <div className="mb-6 border-b border-gray/20 pb-5">
                        <h1 className="font-serif text-2xl text-navy sm:text-3xl md:text-4xl">
                            Settings
                        </h1>

                        <p className="mt-2 text-sm text-slate">
                            Manage your company profile, hours, booking rules, and notifications.
                        </p>
                    </div>

                    {/* Layout: Nav + Content */}
                    <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">

                        {/* Settings Nav */}
                        <SettingsNav activeSection="overview" />

                        {/* Content */}
                        <div className="flex-1 min-w-0">

                            <div className="flex flex-col gap-6">

                                {settingsCards.map((card) => {
                                    const Icon = card.icon;

                                    return (
                                        <div
                                            key={card.title}
                                            className="bg-white rounded-xl border border-gray/20 shadow-sm p-5 sm:p-6 md:p-7"
                                        >

                                            {/* Card Header */}
                                            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">

                                                <div className="flex items-center gap-3 min-w-0">

                                                    <div className="w-10 h-10 bg-navy rounded-lg flex items-center justify-center shrink-0">
                                                        <Icon className="w-[18px] h-[18px] text-white" />
                                                    </div>

                                                    <h2 className="font-serif text-xl text-navy sm:text-2xl truncate">
                                                        {card.title}
                                                    </h2>

                                                </div>

                                                {/* Completion Status */}
                                                {card.hasStatus && (
                                                    <div
                                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-gold/15 border border-gold rounded-full text-xs font-bold text-amber-700"
                                                        title="TODO: Add completion breakdown dropdown"
                                                    >
                                                        <span className="w-1.5 h-1.5 rounded-full bg-gold" />

                                                        <span>
                                                            Complete
                                                        </span>

                                                        <ChevronDown className="w-3 h-3" />
                                                    </div>
                                                )}

                                            </div>

                                            {/* Divider */}
                                            <div className="border-b border-gray/20 mb-4" />

                                            {/* Card Content */}
                                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-5">

                                                <div className="min-w-0">
                                                    <p className="text-xs font-bold uppercase tracking-wide text-slate mb-1.5">
                                                        {card.label}
                                                    </p>

                                                    <p className="text-base text-navy break-words">
                                                        {card.value}
                                                    </p>
                                                </div>

                                                <Link
                                                    to={card.linkPath}
                                                    className="self-start sm:self-auto shrink-0 bg-white border-2 border-navy text-navy px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-navy hover:text-white transition text-center"
                                                >
                                                    {card.buttonText}
                                                </Link>

                                            </div>

                                        </div>
                                    );
                                })}

                            </div>

                        </div>

                    </div>

                </main>

            </div>

        </div>
    );
}

export default CompanySettings;