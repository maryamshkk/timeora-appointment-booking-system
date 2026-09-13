import React, { useState } from "react";
import { ChevronRight, Copy } from "lucide-react";
import { Link } from "react-router-dom";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import SettingsNav from "../../components/settings/SettingsNav";

function BusinessHours() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const DAYS = [
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
    ];

    const [schedule, setSchedule] = useState({
        monday: {
            isOpen: true,
            open: "09:00 AM",
            close: "06:00 PM",
            breaks: [
                {
                    start: "01:00 PM",
                    end: "02:00 PM",
                },
            ],
        },
        tuesday: {
            isOpen: true,
            open: "09:00 AM",
            close: "06:00 PM",
            breaks: [],
        },
        wednesday: {
            isOpen: true,
            open: "09:00 AM",
            close: "06:00 PM",
            breaks: [],
        },
        thursday: {
            isOpen: true,
            open: "09:00 AM",
            close: "06:00 PM",
            breaks: [],
        },
        friday: {
            isOpen: true,
            open: "09:00 AM",
            close: "06:00 PM",
            breaks: [],
        },
        saturday: {
            isOpen: true,
            open: "09:00 AM",
            close: "02:00 PM",
            breaks: [],
        },
        sunday: {
            isOpen: false,
            open: "",
            close: "",
            breaks: [],
        },
    });

    const timezone =
        "Pakistan Standard Time (UTC+05:00)";

    const [savedSnapshot, setSavedSnapshot] =
        useState(schedule);

    const isDirty =
        JSON.stringify(schedule) !==
        JSON.stringify(savedSnapshot);

    function toggleDayOpen(day) {
        setSchedule((previous) => ({
            ...previous,
            [day]: {
                ...previous[day],
                isOpen: !previous[day].isOpen,
            },
        }));
    }

    function handleTimeChange(day, field, value) {
        setSchedule((previous) => ({
            ...previous,
            [day]: {
                ...previous[day],
                [field]: value,
            },
        }));
    }

    function addBreak(day) {
        setSchedule((previous) => ({
            ...previous,
            [day]: {
                ...previous[day],
                breaks: [
                    ...previous[day].breaks,
                    {
                        start: "01:00 PM",
                        end: "02:00 PM",
                    },
                ],
            },
        }));
    }

    function removeBreak(day, index) {
        setSchedule((previous) => ({
            ...previous,
            [day]: {
                ...previous[day],
                breaks: previous[day].breaks.filter(
                    (_, breakIndex) => breakIndex !== index
                ),
            },
        }));
    }

    function handleBreakChange(day, index, field, value) {
        setSchedule((previous) => ({
            ...previous,
            [day]: {
                ...previous[day],
                breaks: previous[day].breaks.map((breakItem, breakIndex) =>
                    breakIndex === index
                        ? {
                              ...breakItem,
                              [field]: value,
                          }
                        : breakItem
                ),
            },
        }));
    }

    function copyHoursToAll(day) {
        setSchedule((previous) => {
            const sourceDay = previous[day];

            const updatedSchedule = { ...previous };

            DAYS.forEach((currentDay) => {
                if (currentDay === day) {
                    return;
                }

                updatedSchedule[currentDay] = {
                    ...updatedSchedule[currentDay],
                    isOpen: sourceDay.isOpen,
                    open: sourceDay.open,
                    close: sourceDay.close,
                    breaks: [],
                };
            });

            return updatedSchedule;
        });

        // TODO: Add confirmation dialog before copying hours to all days.
    }

    function convertToTimeInput(value) {
        if (!value) {
            return "";
        }

        const [time, modifier] = value.split(" ");
        let [hours, minutes] = time.split(":");

        hours = parseInt(hours, 10);

        if (modifier === "PM" && hours !== 12) {
            hours += 12;
        }

        if (modifier === "AM" && hours === 12) {
            hours = 0;
        }

        return `${String(hours).padStart(2, "0")}:${minutes}`;
    }

    function convertFromTimeInput(value) {
        if (!value) {
            return "";
        }

        let [hours, minutes] = value.split(":");
        hours = parseInt(hours, 10);

        const modifier = hours >= 12 ? "PM" : "AM";

        if (hours === 0) {
            hours = 12;
        } else if (hours > 12) {
            hours -= 12;
        }

        return `${String(hours).padStart(2, "0")}:${minutes} ${modifier}`;
    }

    function getScheduleSummary() {
        const weekdays = ["monday", "tuesday", "wednesday", "thursday", "friday"];

        const weekdaySchedules = weekdays.map((day) => schedule[day]);

        const allWeekdaysOpen = weekdaySchedules.every(
            (day) => day.isOpen
        );

        const firstWeekday = weekdaySchedules[0];

        const allWeekdaysSame =
            allWeekdaysOpen &&
            weekdaySchedules.every(
                (day) =>
                    day.open === firstWeekday.open &&
                    day.close === firstWeekday.close
            );

        const summary = [];

        if (allWeekdaysSame) {
            summary.push({
                label: "Mon - Fri",
                value: `${firstWeekday.open} - ${firstWeekday.close}`,
            });
        } else {
            weekdays.forEach((day) => {
                const dayData = schedule[day];

                summary.push({
                    label: day.slice(0, 3),
                    value: dayData.isOpen
                        ? `${dayData.open} - ${dayData.close}`
                        : "Closed",
                });
            });
        }

        ["saturday", "sunday"].forEach((day) => {
            const dayData = schedule[day];

            summary.push({
                label: day.slice(0, 3),
                value: dayData.isOpen
                    ? `${dayData.open} - ${dayData.close}`
                    : "Closed",
            });
        });

        return summary;
    }

    const scheduleSummary = getScheduleSummary();

    const hasOpenDay = DAYS.some(
        (day) => schedule[day].isOpen
    );

    const scheduleStatus = hasOpenDay ? "Configured" : "Not Set";

    function handleSave() {
        setSavedSnapshot(schedule);

        // TODO: axios PUT /api/company/business-hours
        // Payload: { schedule }
    }

    function handleDiscard() {
        setSchedule(savedSnapshot);
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

                <main className="flex-1 bg-beige px-4 py-5 pb-28 sm:px-6 md:px-8 md:py-6 md:pb-28">

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
                            Business Hours
                        </span>

                    </div>

                    {/* Header */}
                    <div className="mb-6">

                        <h1 className="font-serif text-2xl text-navy sm:text-3xl md:text-4xl">
                            Business Hours
                        </h1>

                        <p className="text-sm text-slate mt-1.5">
                            Set your company's regular operating hours and breaks.
                        </p>

                    </div>

                    {/* Settings Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-[220px_320px_1fr] gap-6">

                        {/* Left */}
                        <SettingsNav activeSection="hours" />

                        {/* Center */}
                        <div className="flex flex-col gap-6">

                            {/* Summary */}
                            <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-5 sm:p-6">

                                <h2 className="font-serif text-lg text-navy sm:text-2xl">
                                    Summary
                                </h2>

                                <div className="border-b border-gray/20 mt-4 mb-4" />

                                <div className="flex flex-col gap-3">

                                    {scheduleSummary.map((item) => (
                                        <div
                                            key={item.label}
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

                            {/* Timezone */}
                            <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-5 sm:p-6">

                                <p className="text-sm font-bold text-navy">
                                    Timezone
                                </p>

                                <p className="text-sm text-navy mt-3">
                                    {timezone.split(" (")[0]}
                                </p>

                                <p className="text-sm text-slate mt-1">
                                    (UTC+05:00)
                                </p>

                            </div>

                            {/* Info */}
                            <div className="bg-beige/60 rounded-lg border-l-4 border-navy p-5">

                                <p className="text-sm text-slate leading-relaxed">
                                    Business hours determine when your company
                                    can accept appointments. Staff availability
                                    may further restrict individual appointment
                                    times.
                                </p>

                            </div>

                        </div>

                        {/* Right */}
                        <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-5 sm:p-6 md:p-7">

                            <h2 className="font-serif text-lg text-navy sm:text-2xl">
                                Weekly Schedule
                            </h2>

                            <p className="text-sm text-slate mt-1">
                                Set the hours your company is normally available
                                for appointments.
                            </p>

                            <div className="border-b border-gray/20 mt-5" />

                            {/* Weekly Schedule */}
                            <div className="mt-5 flex flex-col divide-y divide-gray/20">

                                {DAYS.map((day) => {
                                    const dayData = schedule[day];

                                    return (
                                        <div
                                            key={day}
                                            className="py-4 first:pt-0 last:pb-0"
                                        >

                                            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">

                                                {/* Day + Toggle + Status */}
                                                <div className="flex items-center gap-4 md:gap-5">

                                                    {/* Day */}
                                                    <div className="w-[100px] flex-shrink-0">
                                                        <p className="text-xs font-bold uppercase tracking-wide text-navy">
                                                            {day}
                                                        </p>
                                                    </div>

                                                    {/* Toggle */}
                                                    <button
                                                        type="button"
                                                        onClick={() => toggleDayOpen(day)}
                                                        className={`
                                                            relative w-11 h-6 rounded-full flex-shrink-0
                                                            transition
                                                            ${dayData.isOpen ? "bg-navy" : "bg-gray"}
                                                        `}
                                                        aria-label={`Toggle ${day} ${dayData.isOpen ? "closed" : "open"}`}
                                                    >
                                                        <span
                                                            className={`
                                                                absolute top-1 w-4 h-4 rounded-full bg-white
                                                                transition
                                                                ${dayData.isOpen ? "left-6" : "left-1"}
                                                            `}
                                                        />
                                                    </button>

                                                    {/* Status */}
                                                    <span
                                                        className={`
                                                            text-sm w-[70px] flex-shrink-0
                                                            ${dayData.isOpen ? "text-navy font-bold" : "text-slate"}
                                                        `}
                                                    >
                                                        {dayData.isOpen ? "Open" : "Closed"}
                                                    </span>

                                                </div>

                                                {/* Open-day controls */}
                                                {dayData.isOpen && (
                                                    <div className="flex flex-wrap items-center gap-3 flex-1">

                                                        {/* Opening Time */}
                                                        <div className="flex items-center gap-2">
                                                            <label className="text-xs text-slate">
                                                                From
                                                            </label>

                                                            <input
                                                                type="time"
                                                                value={convertToTimeInput(dayData.open)}
                                                                onChange={(event) =>
                                                                    handleTimeChange(
                                                                        day,
                                                                        "open",
                                                                        convertFromTimeInput(event.target.value)
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

                                                        {/* Closing Time */}
                                                        <div className="flex items-center gap-2">
                                                            <label className="text-xs text-slate">
                                                                To
                                                            </label>

                                                            <input
                                                                type="time"
                                                                value={convertToTimeInput(dayData.close)}
                                                                onChange={(event) =>
                                                                    handleTimeChange(
                                                                        day,
                                                                        "close",
                                                                        convertFromTimeInput(event.target.value)
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

                                                        {/* Copy Hours to All */}
                                                        <button
                                                            type="button"
                                                            onClick={() => copyHoursToAll(day)}
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
                                                            aria-label={`Copy ${day} hours to all days`}
                                                        >
                                                            <Copy className="w-4 h-4" />
                                                        </button>

                                                        {/* Break Chips */}
                                                        {dayData.breaks.length > 0 && (
                                                            <div className="w-full flex flex-wrap items-center gap-2 md:pl-[70px]">

                                                                {dayData.breaks.map((breakItem, index) => (
                                                                    <div
                                                                        key={index}
                                                                        className="
                                                                            flex flex-wrap items-center gap-2
                                                                            bg-beige
                                                                            border border-gray/30
                                                                            rounded-lg
                                                                            px-3
                                                                            py-2
                                                                        "
                                                                    >
                                                                        <span className="text-xs text-slate">
                                                                            Break
                                                                        </span>

                                                                        <input
                                                                            type="text"
                                                                            value={breakItem.start}
                                                                            onChange={(event) =>
                                                                                handleBreakChange(
                                                                                    day,
                                                                                    index,
                                                                                    "start",
                                                                                    event.target.value
                                                                                )
                                                                            }
                                                                            className="
                                                                                w-[105px]
                                                                                h-8
                                                                                rounded-md
                                                                                border
                                                                                border-gray/40
                                                                                bg-white
                                                                                px-2
                                                                                text-xs
                                                                                text-navy
                                                                                font-serif
                                                                                outline-none
                                                                                focus:border-navy
                                                                            "
                                                                        />

                                                                        <span className="text-xs text-slate">
                                                                            -
                                                                        </span>

                                                                        <input
                                                                            type="text"
                                                                            value={breakItem.end}
                                                                            onChange={(event) =>
                                                                                handleBreakChange(
                                                                                    day,
                                                                                    index,
                                                                                    "end",
                                                                                    event.target.value
                                                                                )
                                                                            }
                                                                            className="
                                                                                w-[105px]
                                                                                h-8
                                                                                rounded-md
                                                                                border
                                                                                border-gray/40
                                                                                bg-white
                                                                                px-2
                                                                                text-xs
                                                                                text-navy
                                                                                font-serif
                                                                                outline-none
                                                                                focus:border-navy
                                                                            "
                                                                        />

                                                                        <button
                                                                            type="button"
                                                                            onClick={() => removeBreak(day, index)}
                                                                            className="
                                                                                text-lg
                                                                                leading-none
                                                                                text-slate
                                                                                hover:text-navy
                                                                                transition
                                                                            "
                                                                            aria-label="Remove break"
                                                                        >
                                                                            ×
                                                                        </button>
                                                                    </div>
                                                                ))}

                                                            </div>
                                                        )}

                                                        {/* Add Break Button */}
                                                        <button
                                                            type="button"
                                                            onClick={() => addBreak(day)}
                                                            className="
                                                                text-xs
                                                                font-bold
                                                                text-navy
                                                                border
                                                                border-gray/40
                                                                rounded-lg
                                                                px-3
                                                                py-2
                                                                hover:border-navy
                                                                hover:bg-beige
                                                                transition
                                                            "
                                                        >
                                                            + Add Break
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

                {/* Sticky Unsaved Changes Bar */}
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
                                    "
                                >
                                    Discard
                                </button>

                                <button
                                    type="button"
                                    onClick={handleSave}
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
                                    "
                                >
                                    Save Changes
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