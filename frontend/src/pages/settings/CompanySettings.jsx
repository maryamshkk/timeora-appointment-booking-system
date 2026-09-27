import React from "react";
import { Link } from "react-router-dom";
import {
    AlertCircle,
    Bell,
    Building2,
    ChevronDown,
    Clock,
    Loader2,
    Smartphone,
} from "lucide-react";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import SettingsNav from "../../components/settings/SettingsNav";
import { useCompanyProfile } from "../../hooks/company/useCompanyProfile";
import { useCompanyWorkingHours } from "../../hooks/company/useCompanyWorkingHours";
import { useCompanySettings } from "../../hooks/company/useCompanySettings";

const DAY_KEYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function formatTime12h(time) {
    if (!time) return "";

    const [hourStr, minute] = time.split(":");
    let hour = parseInt(hourStr, 10);
    const modifier = hour >= 12 ? "PM" : "AM";

    if (hour === 0) hour = 12;
    else if (hour > 12) hour -= 12;

    return `${String(hour).padStart(2, "0")}:${minute} ${modifier}`;
}

function buildWorkingHoursSummary(workingHours) {
    if (!workingHours || workingHours.length === 0) {
        return "Not configured";
    }

    const map = new Map();
    workingHours.forEach((entry) => map.set(entry.day_of_week, entry));

    const days = [1, 2, 3, 4, 5, 6, 0].map((dayOfWeek) => ({
        dayOfWeek,
        label: DAY_KEYS[dayOfWeek],
        entry: map.get(dayOfWeek),
    }));

    const openDays = days.filter((d) => d.entry?.is_open);

    if (openDays.length === 0) {
        return "All days closed";
    }

    const parts = days.map((d) => {
        if (!d.entry || !d.entry.is_open) {
            return `${d.label} Closed`;
        }

        return `${d.label} ${formatTime12h(
            d.entry.opening_time
        )} - ${formatTime12h(d.entry.closing_time)}`;
    });

    return parts.join(", ");
}

function buildCompanyLocation(company) {
    if (!company) return "Not configured";

    const parts = [company.name, company.city, company.country].filter(Boolean);

    return parts.length > 0 ? parts.join(", ") : "Not configured";
}

function buildBookingSummary(settings) {
    if (!settings) return "Not configured";

    const parts = [];

    parts.push(settings.booking_enabled ? "Booking Enabled" : "Booking Disabled");

    if (settings.auto_accept_appointments) {
        parts.push("Auto-accept ON");
    } else {
        parts.push("Manual review");
    }

    return parts.join(", ");
}

function buildNotificationSummary(settings) {
    if (!settings) return "Not configured";

    const parts = [];

    if (settings.email_notifications) parts.push("Email");
    if (settings.appointment_reminders) parts.push("Reminders");
    if (settings.booking_updates) parts.push("Booking Updates");
    if (settings.cancellation_updates) parts.push("Cancellations");

    return parts.length > 0 ? `${parts.join(", ")} Enabled` : "All Disabled";
}

function CompanySettings() {
    const {
        data: profileResponse,
        isLoading: isProfileLoading,
        isError: isProfileError,
    } = useCompanyProfile();

    const {
        data: workingHoursResponse,
        isLoading: isHoursLoading,
        isError: isHoursError,
    } = useCompanyWorkingHours();

    const {
        data: settingsResponse,
        isLoading: isSettingsLoading,
        isError: isSettingsError,
    } = useCompanySettings();

    const company = profileResponse?.data?.company;
    const workingHours = workingHoursResponse?.data;
    const settings = settingsResponse?.settings;

    const isLoading =
        isProfileLoading || isHoursLoading || isSettingsLoading;

    const hasError = isProfileError || isHoursError || isSettingsError;

    const settingsCards = [
        {
            icon: Building2,
            title: "Company Profile",
            label: "IDENTITY",
            value: buildCompanyLocation(company),
            buttonText: "Manage Profile",
            linkPath: "/company/settings/profile",
            hasStatus: false,
        },
        {
            icon: Clock,
            title: "Business Hours",
            label: "OPERATING DAYS",
            value: buildWorkingHoursSummary(workingHours),
            buttonText: "Manage Hours",
            linkPath: "/company/settings/hours",
            hasStatus: false,
        },
        {
            icon: Smartphone,
            title: "Booking Settings",
            label: "RULES",
            value: buildBookingSummary(settings),
            buttonText: "Manage Settings",
            linkPath: "/company/settings/booking",
            hasStatus: false,
        },
        {
            icon: Bell,
            title: "Notification Settings",
            label: "ALERTS",
            value: buildNotificationSummary(settings),
            buttonText: "Manage Notifications",
            linkPath: "/company/settings/notifications",
            hasStatus: false,
        },
    ];

    return (
        <div className="flex min-h-screen bg-beige">
            <div className="hidden lg:block lg:flex-shrink-0">
                <Sidebar
                    companyName={company?.name || "Company"}
                    activeItem="Settings"
                />
            </div>

            <div className="flex min-w-0 flex-1 flex-col">
                <Topbar showBell simpleProfileIcon showSearch={false} />

                <main className="flex-1 bg-beige px-4 py-5 sm:px-6 md:px-8 md:py-6">
                    <div className="mb-6 border-b border-gray/20 pb-5">
                        <h1 className="font-serif text-2xl text-navy sm:text-3xl md:text-4xl">
                            Settings
                        </h1>

                        <p className="mt-2 text-sm text-slate">
                            Manage your company profile, hours, booking rules,
                            and notifications.
                        </p>
                    </div>

                    {hasError && !isLoading && (
                        <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 max-w-2xl">
                            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                            <p className="text-sm text-red-700">
                                Failed to load some settings. Please refresh.
                            </p>
                        </div>
                    )}

                    <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-8">
                        <SettingsNav activeSection="overview" />

                        <div className="flex-1 min-w-0">
                            {isLoading ? (
                                <div className="flex items-center justify-center gap-3 rounded-xl border border-gray/20 bg-white py-20">
                                    <Loader2 className="h-5 w-5 animate-spin text-navy" />
                                    <span className="text-sm text-slate">
                                        Loading settings...
                                    </span>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-6">
                                    {settingsCards.map((card) => {
                                        const Icon = card.icon;

                                        return (
                                            <div
                                                key={card.title}
                                                className="bg-white rounded-xl border border-gray/20 shadow-sm p-5 sm:p-6 md:p-7"
                                            >
                                                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                                                    <div className="flex items-center gap-3 min-w-0">
                                                        <div className="w-10 h-10 bg-navy rounded-lg flex items-center justify-center shrink-0">
                                                            <Icon className="w-[18px] h-[18px] text-white" />
                                                        </div>

                                                        <h2 className="font-serif text-xl text-navy sm:text-2xl truncate">
                                                            {card.title}
                                                        </h2>
                                                    </div>

                                                    {card.hasStatus && (
                                                        <div
                                                            className="flex items-center gap-1.5 px-3 py-1.5 bg-gold/15 border border-gold rounded-full text-xs font-bold text-amber-700"
                                                            title="Completion status"
                                                        >
                                                            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                                                            <span>Complete</span>
                                                            <ChevronDown className="w-3 h-3" />
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="border-b border-gray/20 mb-4" />

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
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default CompanySettings;