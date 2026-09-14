import React, { useEffect, useMemo, useState } from "react";
import {
    CalendarClock,
    Save,
    Loader2,
    AlertCircle,
    ChevronRight,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import {
    useStaffAvailability,
    useUpdateAvailabilityAll,
} from "../../hooks/company/useStaffAvailability";
import { useStaffMember } from "../../hooks/company/useStaff";

const DAYS = [
    { value: 1, label: "Monday" },
    { value: 2, label: "Tuesday" },
    { value: 3, label: "Wednesday" },
    { value: 4, label: "Thursday" },
    { value: 5, label: "Friday" },
    { value: 6, label: "Saturday" },
    { value: 0, label: "Sunday" },
];

function buildBlankWeek() {
    return DAYS.map((day) => ({
        day_of_week: day.value,
        is_working: false,
        start_time: null,
        end_time: null,
        break_start: null,
        break_end: null,
    }));
}

function hoursToInput(hours) {
    if (!hours) return "";
    return hours.slice(0, 5);
}

function AvailabilityManagement() {
    const { staffId } = useParams();
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [availability, setAvailability] = useState(buildBlankWeek());
    const [savedSnapshot, setSavedSnapshot] = useState(buildBlankWeek());
    const [localError, setLocalError] = useState("");

    const { data: staffResponse } = useStaffMember(staffId);

    const {
        data: availabilityResponse,
        isLoading,
        isError,
        error,
    } = useStaffAvailability(staffId);

    const {
        mutate: saveAvailability,
        isPending,
    } = useUpdateAvailabilityAll();

    const staff = staffResponse?.data;

    useEffect(() => {
        const raw = availabilityResponse?.data;
        if (!raw) return;

        const map = new Map();
        raw.forEach((entry) => map.set(entry.day_of_week, entry));

        const merged = DAYS.map((day) => {
            const entry = map.get(day.value);

            return {
                day_of_week: day.value,
                is_working: entry?.is_working || false,
                start_time: entry?.start_time || null,
                end_time: entry?.end_time || null,
                break_start: entry?.break_start || null,
                break_end: entry?.break_end || null,
            };
        });

        setAvailability(merged);
        setSavedSnapshot(merged);
    }, [availabilityResponse]);

    const isDirty = useMemo(
        () => JSON.stringify(availability) !== JSON.stringify(savedSnapshot),
        [availability, savedSnapshot]
    );

    function updateDay(dayOfWeek, field, value) {
        setAvailability((prev) =>
            prev.map((day) =>
                day.day_of_week === dayOfWeek
                    ? { ...day, [field]: value }
                    : day
            )
        );
    }

    function toggleDay(dayOfWeek) {
        setAvailability((prev) =>
            prev.map((day) =>
                day.day_of_week === dayOfWeek
                    ? {
                          ...day,
                          is_working: !day.is_working,
                          start_time: !day.is_working
                              ? "09:00"
                              : null,
                          end_time: !day.is_working
                              ? "17:00"
                              : null,
                          break_start: null,
                          break_end: null,
                      }
                    : day
            )
        );
    }

    function handleSave() {
        setLocalError("");

        // Validate
        for (const day of availability) {
            if (day.is_working) {
                if (!day.start_time || !day.end_time) {
                    setLocalError(
                        `${DAYS.find((d) => d.value === day.day_of_week)?.label}: Start and end time are required.`
                    );
                    return;
                }

                if (day.start_time >= day.end_time) {
                    setLocalError(
                        `${DAYS.find((d) => d.value === day.day_of_week)?.label}: Start must be before end.`
                    );
                    return;
                }
            }
        }

        saveAvailability(
            { staffId, availability },
            {
                onSuccess: () => {
                    setSavedSnapshot(availability);
                },
                onError: (err) => {
                    setLocalError(
                        err?.response?.data?.message ||
                            "Failed to save availability."
                    );
                },
            }
        );
    }

    function handleDiscard() {
        setAvailability(JSON.parse(JSON.stringify(savedSnapshot)));
        setLocalError("");
    }

    if (isLoading) {
        return (
            <div className="flex min-h-screen bg-beige">
                <div className="hidden lg:block lg:flex-shrink-0">
                    <Sidebar
                        companyName="Shifa Clinic"
                        activeItem="Staff"
                        ctaLabel="Add Staff"
                    />
                </div>

                <div className="flex flex-1 items-center justify-center">
                    <div className="flex items-center gap-3 text-navy">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span className="font-serif text-sm">
                            Loading availability...
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
                    <Sidebar
                        companyName="Shifa Clinic"
                        activeItem="Staff"
                        ctaLabel="Add Staff"
                    />
                </div>

                <div className="flex flex-1 items-center justify-center px-6">
                    <div className="flex max-w-md items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                        <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
                        <p className="text-sm text-red-700">
                            {error?.response?.data?.message ||
                                error?.message ||
                                "Failed to load availability."}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    const staffName = staff
        ? `${staff.first_name || ""} ${staff.last_name || ""}`.trim()
        : "Staff";

    const apiError =
        error?.response?.data?.message ||
        error?.message ||
        "";

    const displayError = localError || apiError;

    return (
        <div className="flex min-h-screen bg-beige">
            <div className="hidden lg:block lg:flex-shrink-0">
                <Sidebar
                    companyName="Shifa Clinic"
                    activeItem="Staff"
                    ctaLabel="Add Staff"
                />
            </div>

            {sidebarOpen && (
                <>
                    <button
                        type="button"
                        onClick={() => setSidebarOpen(false)}
                        className="fixed inset-0 z-30 bg-navy/50 lg:hidden"
                        aria-label="Close menu"
                    />

                    <div className="fixed left-0 top-0 z-40 h-screen w-64 overflow-y-auto lg:hidden">
                        <Sidebar
                            companyName="Shifa Clinic"
                            activeItem="Staff"
                            ctaLabel="Add Staff"
                        />
                    </div>
                </>
            )}

            <div className="flex min-w-0 flex-1 flex-col">
                <Topbar
                    onMenuClick={() => setSidebarOpen(true)}
                    showBell
                    showSettings
                    showSupportText
                    searchPlaceholder="Search..."
                />

                <main className="flex-1 bg-beige px-4 py-6 sm:px-6 md:px-8">
                    <div className="mb-4 flex items-center gap-2 text-sm">
                        <Link
                            to="/company/staff"
                            className="text-slate transition hover:text-navy"
                        >
                            Staff
                        </Link>

                        <ChevronRight className="h-3.5 w-3.5 text-gray" />

                        <Link
                            to={`/company/staff/${staffId}`}
                            className="truncate text-slate transition hover:text-navy"
                        >
                            {staffName}
                        </Link>

                        <ChevronRight className="h-3.5 w-3.5 text-gray" />

                        <span className="font-bold text-navy">Availability</span>
                    </div>

                    <div className="mb-6 sm:mb-8">
                        <h1 className="font-serif text-2xl text-navy sm:text-3xl lg:text-4xl">
                            Manage Availability
                        </h1>

                        <p className="mt-2 max-w-[560px] text-sm leading-relaxed text-slate">
                            Configure the weekly working hours and breaks for{" "}
                            <span className="font-bold text-navy">{staffName}</span>.
                        </p>

                        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                            <button
                                type="button"
                                onClick={handleDiscard}
                                disabled={!isDirty}
                                className="w-full rounded-lg border-2 border-navy bg-white px-6 py-3 text-sm font-bold text-navy transition hover:bg-beige disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
                            >
                                Discard Changes
                            </button>

                            <button
                                type="button"
                                onClick={handleSave}
                                disabled={!isDirty || isPending}
                                className="flex w-full items-center justify-center gap-2 rounded-lg bg-navy px-6 py-3 text-sm font-bold text-white transition hover:bg-gold hover:text-navy disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="h-4 w-4" />
                                        Save Configuration
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {isDirty && (
                        <div className="mb-4 rounded-lg border border-gold bg-gold/15 px-4 py-2 text-xs font-bold text-amber-700 sm:mb-6">
                            You have unsaved changes.
                        </div>
                    )}

                    <div className="rounded-xl border border-gray/20 bg-white p-5 shadow-sm sm:p-6">
                        <div className="mb-5 flex items-center gap-2">
                            <CalendarClock className="h-4 w-4 text-navy" />

                            <h2 className="font-serif text-xl text-navy sm:text-2xl">
                                Weekly Working Hours
                            </h2>
                        </div>

                        <div className="overflow-x-auto">
                            <div className="min-w-[820px]">
                                <div className="grid grid-cols-[140px_110px_1fr] items-center gap-4 border-b border-gray/20 pb-3">
                                    <span className="text-xs font-bold uppercase tracking-wide text-slate">
                                        Day
                                    </span>
                                    <span className="text-xs font-bold uppercase tracking-wide text-slate">
                                        Status
                                    </span>
                                    <span className="text-xs font-bold uppercase tracking-wide text-slate">
                                        Working Hours &amp; Break
                                    </span>
                                </div>

                                {availability.map((day) => {
                                    const dayMeta = DAYS.find(
                                        (d) => d.value === day.day_of_week
                                    );

                                    return (
                                        <div
                                            key={day.day_of_week}
                                            className="grid grid-cols-[140px_110px_1fr] items-center gap-4 border-b border-gray/10 py-5 last:border-b-0"
                                        >
                                            <span className="text-sm font-bold text-navy">
                                                {dayMeta?.label}
                                            </span>

                                            <div>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        toggleDay(day.day_of_week)
                                                    }
                                                    className={`relative h-6 w-12 rounded-full transition ${
                                                        day.is_working
                                                            ? "bg-navy"
                                                            : "bg-gray/30"
                                                    }`}
                                                >
                                                    <span
                                                        className={`absolute top-1 flex h-4 w-4 items-center justify-center rounded-full bg-white shadow-sm transition ${
                                                            day.is_working
                                                                ? "left-7"
                                                                : "left-1"
                                                        }`}
                                                    />
                                                </button>
                                            </div>

                                            {day.is_working ? (
                                                <div className="flex flex-wrap items-center gap-3">
                                                    <input
                                                        type="time"
                                                        value={hoursToInput(day.start_time)}
                                                        onChange={(event) =>
                                                            updateDay(
                                                                day.day_of_week,
                                                                "start_time",
                                                                event.target.value
                                                            )
                                                        }
                                                        className="rounded-lg border border-gray px-3 py-2 text-sm text-navy outline-none focus:border-navy"
                                                    />

                                                    <span className="text-gray">—</span>

                                                    <input
                                                        type="time"
                                                        value={hoursToInput(day.end_time)}
                                                        onChange={(event) =>
                                                            updateDay(
                                                                day.day_of_week,
                                                                "end_time",
                                                                event.target.value
                                                            )
                                                        }
                                                        className="rounded-lg border border-gray px-3 py-2 text-sm text-navy outline-none focus:border-navy"
                                                    />

                                                    <div className="ml-2 flex items-center gap-2">
                                                        <span className="text-xs font-bold uppercase text-slate">
                                                            Break:
                                                        </span>

                                                        <input
                                                            type="time"
                                                            value={hoursToInput(day.break_start)}
                                                            onChange={(event) =>
                                                                updateDay(
                                                                    day.day_of_week,
                                                                    "break_start",
                                                                    event.target.value
                                                                )
                                                            }
                                                            className="rounded-lg border border-gray px-3 py-2 text-sm text-navy outline-none focus:border-navy"
                                                        />

                                                        <span className="text-gray">—</span>

                                                        <input
                                                            type="time"
                                                            value={hoursToInput(day.break_end)}
                                                            onChange={(event) =>
                                                                updateDay(
                                                                    day.day_of_week,
                                                                    "break_end",
                                                                    event.target.value
                                                                )
                                                            }
                                                            className="rounded-lg border border-gray px-3 py-2 text-sm text-navy outline-none focus:border-navy"
                                                        />
                                                    </div>
                                                </div>
                                            ) : (
                                                <span className="text-sm italic text-gray">
                                                    Not working
                                                </span>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {displayError && (
                            <div className="mt-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                                <p className="text-sm text-red-700">
                                    {displayError}
                                </p>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default AvailabilityManagement;