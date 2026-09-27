import React, { useEffect, useState } from "react";
import {
    AlertCircle,
    ChevronRight,
    Copy,
    Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import SettingsNav from "../../components/settings/SettingsNav";
import {
    useCompanyWorkingHours,
    useUpdateWorkingHours,
} from "../../hooks/company/useCompanyWorkingHours";

const DAYS = [
    { key: "monday", value: 1, label: "Monday" },
    { key: "tuesday", value: 2, label: "Tuesday" },
    { key: "wednesday", value: 3, label: "Wednesday" },
    { key: "thursday", value: 4, label: "Thursday" },
    { key: "friday", value: 5, label: "Friday" },
    { key: "saturday", value: 6, label: "Saturday" },
    { key: "sunday", value: 0, label: "Sunday" },
];

function buildBlankWeek() {
    return DAYS.map((day) => ({
        day_of_week: day.value,
        is_open: false,
        opening_time: null,
        closing_time: null,
    }));
}

function BusinessHours() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const {
        data: workingHoursResponse,
        isLoading,
        isError,
        error,
    } = useCompanyWorkingHours();

    const {
        mutate: updateWorkingHours,
        isPending: isSaving,
        error: saveError,
        isSuccess: isSaved,
    } = useUpdateWorkingHours();

    const [schedule, setSchedule] = useState(buildBlankWeek());
    const [savedSnapshot, setSavedSnapshot] = useState(buildBlankWeek());

    useEffect(() => {
        const raw = workingHoursResponse?.data;

        if (!raw || raw.length === 0) return;

        const map = new Map();
        raw.forEach((entry) => map.set(entry.day_of_week, entry));

        const merged = DAYS.map((day) => {
            const entry = map.get(day.value);

            return {
                day_of_week: day.value,
                is_open: Boolean(entry?.is_open),
                opening_time: entry?.opening_time?.slice(0, 5) || null,
                closing_time: entry?.closing_time?.slice(0, 5) || null,
            };
        });

        setSchedule(merged);
        setSavedSnapshot(merged);
    }, [workingHoursResponse]);

    const isDirty =
        JSON.stringify(schedule) !== JSON.stringify(savedSnapshot);

    function getDayKey(dayValue) {
        return DAYS.find((d) => d.value === dayValue)?.key || "";
    }

    function getDayLabel(dayValue) {
        return DAYS.find((d) => d.value === dayValue)?.label || "";
    }

    function updateDay(dayOfWeek, field, value) {
        setSchedule((prev) =>
            prev.map((day) =>
                day.day_of_week === dayOfWeek
                    ? { ...day, [field]: value }
                    : day
            )
        );
    }

    function toggleDayOpen(dayOfWeek) {
        setSchedule((prev) =>
            prev.map((day) => {
                if (day.day_of_week !== dayOfWeek) return day;

                const nextOpen = !day.is_open;

                return {
                    ...day,
                    is_open: nextOpen,
                    opening_time: nextOpen
                        ? day.opening_time || "09:00"
                        : null,
                    closing_time: nextOpen
                        ? day.closing_time || "18:00"
                        : null,
                };
            })
        );
    }

    function copyHoursToAll(dayOfWeek) {
        const source = schedule.find((d) => d.day_of_week === dayOfWeek);

        if (!source) return;

        setSchedule((prev) =>
            prev.map((day) => ({
                ...day,
                is_open: source.is_open,
                opening_time: source.opening_time,
                closing_time: source.closing_time,
            }))
        );
    }

    function formatTime12h(time) {
        if (!time) return "";

        const [hourStr, minute] = time.split(":");
        let hour = parseInt(hourStr, 10);
        const modifier = hour >= 12 ? "PM" : "AM";

        if (hour === 0) hour = 12;
        else if (hour > 12) hour -= 12;

        return `${String(hour).padStart(2, "0")}:${minute} ${modifier}`;
    }

    function getScheduleSummary() {
        const weekdays = schedule.filter(
            (d) => d.day_of_week >= 1 && d.day_of_week <= 5
        );

        const allWeekdaysOpen = weekdays.every((d) => d.is_open);

        const firstWeekday = weekdays[0];

        const allSame =
            allWeekdaysOpen &&
            weekdays.every(
                (d) =>
                    d.opening_time === firstWeekday.opening_time &&
                    d.closing_time === firstWeekday.closing_time
            );

        const summary = [];

        if (allSame) {
            summary.push({
                label: "Mon - Fri",
                value: `${formatTime12h(firstWeekday.opening_time)} - ${formatTime12h(
                    firstWeekday.closing_time
                )}`,
            });
        } else {
            weekdays.forEach((d) => {
                summary.push({
                    label: getDayLabel(d.day_of_week).slice(0, 3),
                    value: d.is_open
                        ? `${formatTime12h(d.opening_time)} - ${formatTime12h(
                              d.closing_time
                          )}`
                        : "Closed",
                });
            });
        }

        schedule
            .filter((d) => d.day_of_week === 6 || d.day_of_week === 0)
            .forEach((d) => {
                summary.push({
                    label: getDayLabel(d.day_of_week).slice(0, 3),
                    value: d.is_open
                        ? `${formatTime12h(d.opening_time)} - ${formatTime12h(
                              d.closing_time
                          )}`
                        : "Closed",
                });
            });

        return summary;
    }

    function handleSave() {
        // Validate
        for (const day of schedule) {
            if (day.is_open) {
                if (!day.opening_time || !day.closing_time) {
                    return;
                }

                if (day.opening_time >= day.closing_time) {
                    return;
                }
            }
        }

        updateWorkingHours(schedule, {
            onSuccess: () => {
                setSavedSnapshot(schedule);
            },
        });
    }

    function handleDiscard() {
        setSchedule(JSON.parse(JSON.stringify(savedSnapshot)));
    }

    const scheduleSummary = getScheduleSummary();
    const hasOpenDay = schedule.some((d) => d.is_open);
    const scheduleStatus = hasOpenDay ? "Configured" : "Not Set";

    const apiError =
        saveError?.response?.data?.message || saveError?.message || "";

    if (isLoading) {
        return (
            <div className="flex min-h-screen bg-beige">
                <div className="hidden lg:block lg:flex-shrink-0">
                    <Sidebar activeItem="Settings" />
                </div>

                <div className="flex flex-1 items-center justify-center">
                    <div className="flex items-center gap-3 text-navy">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span className="font-serif text-sm">
                            Loading business hours...
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex min-h-screen bg-beige">
                <div className="hidden lg:block lg:flex-shrink-0">
                    <Sidebar activeItem="Settings" />
                </div>

                <div className="flex flex-1 items-center justify-center px-6">
                    <div className="flex max-w-md items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                        <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
                        <p className="text-sm text-red-700">
                            {error?.response?.data?.message ||
                                error?.message ||
                                "Failed to load business hours."}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex bg-beige">
            <div className="hidden lg:block lg:flex-shrink-0">
                <Sidebar activeItem="Settings" />
            </div>

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

            <div className="flex min-w-0 flex-1 flex-col">
                <Topbar
                    onMenuClick={() => setSidebarOpen(true)}
                    showBell
                    simpleProfileIcon
                    searchPlaceholder="Search settings..."
                />

                <main className="flex-1 bg-beige px-4 py-5 pb-28 sm:px-6 md:px-8 md:py-6 md:pb-28">
                    <div className="flex flex-wrap items-center gap-2 mb-6 text-sm">
                        <Link
                            to="/company/settings"
                            className="text-slate hover:text-navy transition"
                        >
                            Settings
                        </Link>

                        <ChevronRight className="w-3 h-3 text-gray" />

                        <span className="font-bold text-navy">
                            Business Hours
                        </span>
                    </div>

                    <div className="mb-6">
                        <h1 className="font-serif text-2xl text-navy sm:text-3xl md:text-4xl">
                            Business Hours
                        </h1>

                        <p className="text-sm text-slate mt-1.5">
                            Set your company's regular operating hours.
                        </p>
                    </div>

                    {apiError && (
                        <div className="mb-6 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 max-w-3xl">
                            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                            <p className="text-sm text-red-700">{apiError}</p>
                        </div>
                    )}

                    {isSaved && !isDirty && (
                        <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 max-w-3xl">
                            <p className="text-sm text-green-700">
                                Business hours updated successfully.
                            </p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-[220px_320px_1fr] gap-6">
                        <SettingsNav activeSection="hours" />

                        <div className="flex flex-col gap-6">
                            <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-5 sm:p-6">
                                <h2 className="font-serif text-lg text-navy sm:text-2xl">
                                    Summary
                                </h2>

                                <div className="border-b border-gray/20 mt-4 mb-4" />

                                <div className="flex flex-col gap-3">
                                    {scheduleSummary.map((item, idx) => (
                                        <div
                                            key={`${item.label}-${idx}`}
                                            className="flex items-center justify-between gap-4"
                                        >
                                            <span className="text-xs font-bold uppercase tracking-wide text-navy">
                                                {item.label}
                                            </span>

                                            <span className="text-sm text-slate text-right">
                                                {item.value}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="border-t border-gray/20 mt-5 pt-4 flex items-center justify-between">
                                    <span className="text-xs font-bold uppercase tracking-wide text-slate">
                                        Status
                                    </span>

                                    <span
                                        className={`
                                            text-xs
                                            font-bold
                                            rounded-full
                                            px-3
                                            py-1
                                            ${
                                                hasOpenDay
                                                    ? "bg-green-50 text-green-700"
                                                    : "bg-gray/20 text-slate"
                                            }
                                        `}
                                    >
                                        {scheduleStatus}
                                    </span>
                                </div>
                            </div>

                            <div className="bg-beige/60 rounded-lg border-l-4 border-navy p-5">
                                <p className="text-sm text-slate leading-relaxed">
                                    Business hours determine when your company
                                    can accept appointments. Staff availability
                                    may further restrict individual appointment
                                    times.
                                </p>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-5 sm:p-6 md:p-7">
                            <h2 className="font-serif text-lg text-navy sm:text-2xl">
                                Weekly Schedule
                            </h2>

                            <p className="text-sm text-slate mt-1">
                                Set the hours your company is normally available
                                for appointments.
                            </p>

                            <div className="border-b border-gray/20 mt-5" />

                            <div className="mt-5 flex flex-col divide-y divide-gray/20">
                                {schedule.map((day) => {
                                    return (
                                        <div
                                            key={day.day_of_week}
                                            className="py-4 first:pt-0 last:pb-0"
                                        >
                                            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
                                                <div className="flex items-center gap-4 md:gap-5">
                                                    <div className="w-[100px] flex-shrink-0">
                                                        <p className="text-xs font-bold uppercase tracking-wide text-navy">
                                                            {getDayKey(day.day_of_week)}
                                                        </p>
                                                    </div>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            toggleDayOpen(
                                                                day.day_of_week
                                                            )
                                                        }
                                                        className={`
                                                            relative w-11 h-6 rounded-full flex-shrink-0
                                                            transition
                                                            ${day.is_open ? "bg-navy" : "bg-gray"}
                                                        `}
                                                        aria-label={`Toggle ${getDayKey(
                                                            day.day_of_week
                                                        )}`}
                                                    >
                                                        <span
                                                            className={`
                                                                absolute top-1 w-4 h-4 rounded-full bg-white
                                                                transition
                                                                ${day.is_open ? "left-6" : "left-1"}
                                                            `}
                                                        />
                                                    </button>

                                                    <span
                                                        className={`
                                                            text-sm w-[70px] flex-shrink-0
                                                            ${day.is_open ? "text-navy font-bold" : "text-slate"}
                                                        `}
                                                    >
                                                        {day.is_open ? "Open" : "Closed"}
                                                    </span>
                                                </div>

                                                {day.is_open && (
                                                    <div className="flex flex-wrap items-center gap-3 flex-1">
                                                        <div className="flex items-center gap-2">
                                                            <label className="text-xs text-slate">
                                                                From
                                                            </label>

                                                            <input
                                                                type="time"
                                                                value={day.opening_time || ""}
                                                                onChange={(e) =>
                                                                    updateDay(
                                                                        day.day_of_week,
                                                                        "opening_time",
                                                                        e.target.value
                                                                    )
                                                                }
                                                                className="
                                                                    w-[120px]
                                                                    h-10
                                                                    rounded-lg
                                                                    border
                                                                    border-gray/40
                                                                    px-3
                                                                    text-sm
                                                                    text-navy
                                                                    font-serif
                                                                    outline-none
                                                                    focus:border-navy
                                                                "
                                                            />
                                                        </div>

                                                        <div className="flex items-center gap-2">
                                                            <label className="text-xs text-slate">
                                                                To
                                                            </label>

                                                            <input
                                                                type="time"
                                                                value={day.closing_time || ""}
                                                                onChange={(e) =>
                                                                    updateDay(
                                                                        day.day_of_week,
                                                                        "closing_time",
                                                                        e.target.value
                                                                    )
                                                                }
                                                                className="
                                                                    w-[120px]
                                                                    h-10
                                                                    rounded-lg
                                                                    border
                                                                    border-gray/40
                                                                    px-3
                                                                    text-sm
                                                                    text-navy
                                                                    font-serif
                                                                    outline-none
                                                                    focus:border-navy
                                                                "
                                                            />
                                                        </div>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                copyHoursToAll(
                                                                    day.day_of_week
                                                                )
                                                            }
                                                            className="
                                                                flex
                                                                items-center
                                                                justify-center
                                                                w-9
                                                                h-9
                                                                rounded-lg
                                                                border
                                                                border-gray/40
                                                                text-slate
                                                                hover:border-navy
                                                                hover:text-navy
                                                                hover:bg-beige
                                                                transition
                                                            "
                                                            title="Copy hours to all days"
                                                            aria-label="Copy hours to all days"
                                                        >
                                                            <Copy className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </main>

                {isDirty && (
                    <div className="fixed bottom-0 left-0 right-0 lg:left-64 bg-navy text-white px-4 sm:px-8 py-4 z-50">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                            <p className="text-sm text-center sm:text-left">
                                You have unsaved changes.
                            </p>

                            <div className="flex items-center justify-center gap-3">
                                <button
                                    type="button"
                                    onClick={handleDiscard}
                                    disabled={isSaving}
                                    className="
                                        bg-transparent
                                        border
                                        border-white/30
                                        text-white
                                        px-5
                                        py-2.5
                                        rounded-lg
                                        text-sm
                                        font-bold
                                        hover:border-white
                                        transition
                                        disabled:opacity-50
                                    "
                                >
                                    Discard
                                </button>

                                <button
                                    type="button"
                                    onClick={handleSave}
                                    disabled={isSaving}
                                    className="
                                        bg-white
                                        text-navy
                                        px-5
                                        py-2.5
                                        rounded-lg
                                        text-sm
                                        font-bold
                                        hover:bg-gold
                                        transition
                                        disabled:opacity-50
                                    "
                                >
                                    {isSaving ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default BusinessHours;