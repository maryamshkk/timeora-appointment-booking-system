import React, { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import SettingsNav from "../../components/settings/SettingsNav";

function BusinessHours() {

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

            {/* Sidebar */}
            <Sidebar activeItem="Settings" />

            {/* Main Area */}
            <div className="flex-1 min-w-0">

                <Topbar
                    showBell
                    simpleProfileIcon
                    searchPlaceholder="Search settings..."
                />

                <main className="px-8 py-6 pb-24">

                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 mb-8 text-sm">

                        <Link
                            to="/settings"
                            className="text-slate hover:text-navy transition"
                        >
                            Settings
                        </Link>

                        <ChevronRight
                            className="w-3 h-3 text-gray"
                        />

                        <span className="font-bold text-navy">
                            Business Hours
                        </span>

                    </div>

                    {/* Header */}
                    <div className="mb-6">

                        <h1 className="font-serif text-4xl text-navy">
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
                            <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6">

                                <h2 className="font-serif text-2xl text-navy">
                                    Summary
                                </h2>

                                <div className="border-b border-gray/20 mt-4 mb-4" />

                                <p className="text-sm text-slate">
                                    Weekly schedule summary will appear here.
                                </p>

                            </div>

                            {/* Timezone */}
                            <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6">

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
                        <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-7">

                            <h2 className="font-serif text-2xl text-navy">
                                Weekly Schedule
                            </h2>

                            <p className="text-sm text-slate mt-1">
                                Set the hours your company is normally available
                                for appointments.
                            </p>

                            <div className="border-b border-gray/20 mt-5" />

                            <div className="mt-5">
                                <p className="text-sm text-slate">
                                    Weekly schedule controls will be added here.
                                </p>
                            </div>

                        </div>

                    </div>

                </main>

                {/* Sticky Unsaved Changes Bar */}
                {isDirty && (
                    <div className="fixed bottom-0 left-64 right-0 bg-navy text-white px-8 py-4 z-50">
                        <div className="flex items-center justify-between gap-4">

                            <p className="text-sm">
                                You have unsaved changes.
                            </p>

                            <div className="flex items-center gap-3">

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