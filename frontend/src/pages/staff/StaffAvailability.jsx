import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Check,
    X,
    Clock,
    Plus,
    Pencil,
} from "lucide-react";

import StaffSidebar from "../../components/staff/StaffSidebar";
import StaffTopbar from "../../components/staff/StaffTopbar";

const DAYS = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
];

function StaffAvailability() {
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);

    /*
     * Assumption: the reference only shows Monday (available) and Sunday
     * (unavailable), so Tue–Sat are seeded by mirroring Monday's pattern.
     * Replace with axios GET /api/staff/availability on mount.
     */
    const [schedule, setSchedule] = useState({
        monday: {
            isAvailable: true,
            open: "09:00 AM",
            close: "05:30 PM",
            breaks: [{ start: "12:30 PM", end: "01:00 PM" }],
        },
        tuesday: {
            isAvailable: true,
            open: "09:00 AM",
            close: "05:30 PM",
            breaks: [{ start: "12:30 PM", end: "01:00 PM" }],
        },
        wednesday: {
            isAvailable: true,
            open: "09:00 AM",
            close: "05:30 PM",
            breaks: [{ start: "12:30 PM", end: "01:00 PM" }],
        },
        thursday: {
            isAvailable: true,
            open: "09:00 AM",
            close: "05:30 PM",
            breaks: [{ start: "12:30 PM", end: "01:00 PM" }],
        },
        friday: {
            isAvailable: true,
            open: "09:00 AM",
            close: "05:30 PM",
            breaks: [{ start: "12:30 PM", end: "01:00 PM" }],
        },
        saturday: {
            isAvailable: false,
            open: "",
            close: "",
            breaks: [],
        },
        sunday: {
            isAvailable: false,
            open: "",
            close: "",
            breaks: [],
        },
    });

    const [savedSnapshot, setSavedSnapshot] = useState(schedule);
    const [editingBreak, setEditingBreak] = useState(null);

    const currentStaff = {
        name: "Dr. Sara Ahmed",
        role: "Doctor",
        avatarUrl: "",
        companyName: "Shifa Clinic",
    };

    const isDirty =
        JSON.stringify(schedule) !== JSON.stringify(savedSnapshot);

    const hasAvailability = DAYS.some(
        (day) => schedule[day].isAvailable
    );

    function toggleDayAvailable(day) {
        setSchedule((previous) => ({
            ...previous,
            [day]: {
                ...previous[day],
                isAvailable: !previous[day].isAvailable,
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
                    { start: "12:30 PM", end: "01:00 PM" },
                ],
            },
        }));
    }

    function updateBreak(day, index, field, value) {
        setSchedule((previous) => ({
            ...previous,
            [day]: {
                ...previous[day],
                breaks: previous[day].breaks.map((breakItem, breakIndex) =>
                    breakIndex === index
                        ? { ...breakItem, [field]: value }
                        : breakItem
                ),
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

        setEditingBreak(null);
    }

    function handleSave() {
        if (!isDirty) {
            return;
        }

        setSavedSnapshot(schedule);

        // TODO: axios PUT /api/staff/availability with { schedule }
    }

    function handleSignOut() {
        navigate("/login");
    }

    function getTodayKey() {
        return DAYS[
            (new Date().getDay() + 6) % 7
        ];
    }

    const todayKey = getTodayKey();
    const today = schedule[todayKey];

    const todayLabel = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "short",
        day: "numeric",
    });

    return (
        <div className="min-h-screen bg-beige flex">

            {/* Sidebar — desktop always visible, mobile slide-in drawer */}
            <StaffSidebar
                companyName={currentStaff.companyName}
                currentStaff={currentStaff}
                activeItem="Availability"
                handleSignOut={handleSignOut}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            {/* Main Area */}
            <div className="flex min-w-0 flex-1 flex-col">

                <StaffTopbar
                    avatarUrl={currentStaff.avatarUrl}
                    onMenuClick={() => setSidebarOpen(true)}
                    onSearchClick={() => {}}
                    onNotificationsClick={() =>
                        navigate("/staff/notifications")
                    }
                    onSettingsClick={() => navigate("/staff/settings")}
                />

                <main className="flex-1 bg-beige px-4 py-6 sm:px-6 md:px-8">

                    {/* Header Row */}
                    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">

                        <div>
                            <h1 className="font-serif text-2xl text-navy sm:text-3xl lg:text-4xl">
                                My Availability
                            </h1>

                            <p className="mt-1.5 text-sm text-slate">
                                Manage your working hours, breaks, and availability.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={!isDirty}
                            className={`
                                rounded-lg px-6 py-3 text-sm font-bold transition
                                ${
                                    isDirty
                                        ? "cursor-pointer bg-navy text-white hover:bg-gold hover:text-navy"
                                        : "cursor-not-allowed bg-gray/20 text-gray"
                                }
                            `}
                        >
                            Save Changes
                        </button>

                    </div>

                    {/* Main Grid */}
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">

                        {/* LEFT COLUMN */}
                        <div className="flex flex-col gap-6">

                            {/* Card A — Status Summary */}
                            <div className="flex items-start gap-4 rounded-xl border border-gray/20 bg-white p-5 shadow-sm sm:p-6">

                                <div
                                    className={`
                                        flex h-9 w-9 flex-shrink-0 items-center
                                        justify-center rounded-full
                                        ${
                                            hasAvailability
                                                ? "bg-gold"
                                                : "bg-gray/30"
                                        }
                                    `}
                                >
                                    {hasAvailability ? (
                                        <Check className="h-4 w-4 text-white" />
                                    ) : (
                                        <X className="h-4 w-4 text-slate" />
                                    )}
                                </div>

                                <div className="min-w-0">
                                    <p className="text-sm font-bold uppercase tracking-wide text-navy">
                                        {hasAvailability ? "Available" : "Unavailable"}
                                    </p>

                                    <p className="mt-1 text-sm leading-relaxed text-slate">
                                        {hasAvailability
                                            ? "Your current schedule allows appointments during your configured working hours."
                                            : "You have no working hours configured. Toggle a day on to become available."}
                                    </p>
                                </div>

                            </div>

                            {/* Card B — Weekly Working Hours */}
                            <div className="overflow-hidden rounded-xl border border-gray/20 bg-white shadow-sm">

                                <div className="border-b border-gray/20 p-5 sm:p-6">
                                    <h2 className="font-serif text-xl text-navy sm:text-2xl">
                                        Weekly Working Hours
                                    </h2>
                                </div>

                                <div>

                                    {DAYS.map((day, dayIndex) => {
                                        const dayData = schedule[day];

                                        const isLastDay =
                                            dayIndex === DAYS.length - 1;

                                        return (
                                            <div
                                                key={day}
                                                className={`
                                                    flex flex-wrap items-center gap-4
                                                    px-5 py-5 sm:px-6
                                                    ${
                                                        isLastDay
                                                            ? ""
                                                            : "border-b border-gray/20"
                                                    }
                                                `}
                                            >

                                                {/* Day label */}
                                                <p className="w-16 text-sm font-bold uppercase tracking-wide text-navy">
                                                    {day}
                                                </p>

                                                {/* Availability toggle */}
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        toggleDayAvailable(day)
                                                    }
                                                    className={`
                                                        relative h-5.5 w-10 flex-shrink-0
                                                        rounded-full transition
                                                        ${
                                                            dayData.isAvailable
                                                                ? "bg-navy"
                                                                : "bg-gray/30"
                                                        }
                                                    `}
                                                    aria-label={`Toggle ${day} availability`}
                                                >
                                                    <span
                                                        className={`
                                                            absolute top-1 h-3.5 w-3.5
                                                            rounded-full bg-white
                                                            shadow-sm transition
                                                            ${
                                                                dayData.isAvailable
                                                                    ? "left-5"
                                                                    : "left-1"
                                                            }
                                                        `}
                                                    />
                                                </button>

                                                {/* Available — time inputs + breaks */}
                                                {dayData.isAvailable ? (
                                                    <>
                                                        {/* Open time */}
                                                        <div className="relative flex-shrink-0">
                                                            <Clock className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray" />

                                                            <input
                                                                type="text"
                                                                value={dayData.open}
                                                                onChange={(event) =>
                                                                    handleTimeChange(
                                                                        day,
                                                                        "open",
                                                                        event.target.value
                                                                    )
                                                                }
                                                                className="
                                                                    w-[110px] rounded-lg border border-gray
                                                                    py-2 pl-9 pr-3 text-sm text-navy
                                                                    outline-none focus:border-navy
                                                                "
                                                            />
                                                        </div>

                                                        <span className="text-gray">
                                                            -
                                                        </span>

                                                        {/* Close time */}
                                                        <div className="relative flex-shrink-0">
                                                            <Clock className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray" />

                                                            <input
                                                                type="text"
                                                                value={dayData.close}
                                                                onChange={(event) =>
                                                                    handleTimeChange(
                                                                        day,
                                                                        "close",
                                                                        event.target.value
                                                                    )
                                                                }
                                                                className="
                                                                    w-[110px] rounded-lg border border-gray
                                                                    py-2 pl-9 pr-3 text-sm text-navy
                                                                    outline-none focus:border-navy
                                                                "
                                                            />
                                                        </div>

                                                        {/* Add Break */}
                                                        <button
                                                            type="button"
                                                            onClick={() => addBreak(day)}
                                                            className="
                                                                flex items-center gap-1 rounded-lg
                                                                border-2 border-navy px-3 py-2
                                                                text-sm font-bold text-navy transition
                                                                hover:bg-navy hover:text-white
                                                            "
                                                        >
                                                            <Plus className="h-3.5 w-3.5" />
                                                            Add Break
                                                        </button>

                                                        {/* Break chips */}
                                                        {dayData.breaks.length > 0 && (
                                                            <div className="mt-2.5 flex flex-wrap gap-2 basis-full">

                                                                {dayData.breaks.map(
                                                                    (breakItem, breakIndex) => {
                                                                        const isEditing =
                                                                            editingBreak?.day === day &&
                                                                            editingBreak?.index === breakIndex;

                                                                        return (
                                                                            <div
                                                                                key={breakIndex}
                                                                                className="
                                                                                    flex items-center gap-3
                                                                                    rounded-lg border border-gray/20
                                                                                    bg-gray/10 px-3 py-2
                                                                                    text-sm text-navy
                                                                                "
                                                                            >
                                                                                {isEditing ? (
                                                                                    <>
                                                                                        <input
                                                                                            type="text"
                                                                                            value={breakItem.start}
                                                                                            onChange={(event) =>
                                                                                                updateBreak(
                                                                                                    day,
                                                                                                    breakIndex,
                                                                                                    "start",
                                                                                                    event.target.value
                                                                                                )
                                                                                            }
                                                                                            className="
                                                                                                w-[90px] rounded-md
                                                                                                border border-gray bg-white
                                                                                                px-2 py-1 text-xs text-navy
                                                                                                outline-none focus:border-navy
                                                                                            "
                                                                                        />

                                                                                        <span className="text-gray">
                                                                                            -
                                                                                        </span>

                                                                                        <input
                                                                                            type="text"
                                                                                            value={breakItem.end}
                                                                                            onChange={(event) =>
                                                                                                updateBreak(
                                                                                                    day,
                                                                                                    breakIndex,
                                                                                                    "end",
                                                                                                    event.target.value
                                                                                                )
                                                                                            }
                                                                                            className="
                                                                                                w-[90px] rounded-md
                                                                                                border border-gray bg-white
                                                                                                px-2 py-1 text-xs text-navy
                                                                                                outline-none focus:border-navy
                                                                                            "
                                                                                        />

                                                                                        <button
                                                                                            type="button"
                                                                                            onClick={() => setEditingBreak(null)}
                                                                                            className="cursor-pointer text-xs font-bold text-navy hover:underline"
                                                                                        >
                                                                                            Done
                                                                                        </button>
                                                                                    </>
                                                                                ) : (
                                                                                    <>
                                                                                        <span>
                                                                                            Break: {breakItem.start} - {breakItem.end}
                                                                                        </span>

                                                                                        <button
                                                                                            type="button"
                                                                                            onClick={() =>
                                                                                                setEditingBreak({
                                                                                                    day,
                                                                                                    index: breakIndex,
                                                                                                })
                                                                                            }
                                                                                            className="cursor-pointer text-slate transition hover:text-navy"
                                                                                            aria-label="Edit break"
                                                                                        >
                                                                                            <Pencil className="h-3.5 w-3.5" />
                                                                                        </button>

                                                                                        <button
                                                                                            type="button"
                                                                                            onClick={() =>
                                                                                                removeBreak(day, breakIndex)
                                                                                            }
                                                                                            className="cursor-pointer text-slate transition hover:text-red-600"
                                                                                            aria-label="Remove break"
                                                                                        >
                                                                                            <X className="h-3.5 w-3.5" />
                                                                                        </button>
                                                                                    </>
                                                                                )}
                                                                            </div>
                                                                        );
                                                                    }
                                                                )}

                                                            </div>
                                                        )}
                                                    </>
                                                ) : (
                                                    <p className="text-sm italic text-gray">
                                                        Unavailable
                                                    </p>
                                                )}

                                            </div>
                                        );
                                    })}

                                </div>

                            </div>

                        </div>

                        {/* RIGHT COLUMN */}
                        <div className="flex flex-col gap-6">

                            <div className="rounded-xl border border-gray/20 bg-white p-5 shadow-sm sm:p-6">

                                <h2 className="font-serif text-xl text-navy">
                                    Today's Availability
                                </h2>

                                <div className="mt-3 border-b border-gray/20" />

                                <p className="mt-3.5 text-sm font-bold text-navy">
                                    {todayLabel}
                                </p>

                                <p className="mt-1.5 text-sm text-slate">
                                    {today.isAvailable
                                        ? `${today.open} - ${today.close}`
                                        : "Unavailable today"}
                                </p>

                                <div className="mt-2.5 flex items-center gap-2">
                                    <span
                                        className={`
                                            h-2 w-2 rounded-full
                                            ${
                                                today.isAvailable
                                                    ? "bg-gold"
                                                    : "bg-gray"
                                            }
                                        `}
                                    />

                                    <span className="text-sm font-bold text-navy">
                                        {today.isAvailable
                                            ? "Available"
                                            : "Unavailable"}
                                    </span>
                                </div>

                            </div>

                        </div>

                    </div>

                </main>

            </div>

        </div>
    );
}

export default StaffAvailability;