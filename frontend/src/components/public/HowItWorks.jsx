import React, { useEffect, useState } from "react";
import {
    CalendarPlus,
    UserCheck,
    Bell,
    Play,
} from "lucide-react";

import useInView from "../../hooks/useInView";

const steps = [
    {
        id: 1,
        icon: CalendarPlus,
        title: "Book in Seconds",
        description:
            "Customers pick a service, choose an available slot, and confirm — all without phone calls.",
        accent: "bg-gold/15 text-amber-700",
        mock: "booking",
    },
    {
        id: 2,
        icon: UserCheck,
        title: "Staff Gets Notified",
        description:
            "The assigned team member is instantly alerted with the appointment details and client info.",
        accent: "bg-green-50 text-green-700",
        mock: "notify",
    },
    {
        id: 3,
        icon: Bell,
        title: "Reminders Go Out",
        description:
            "Automatic SMS and email reminders keep customers on schedule and slash no-shows.",
        accent: "bg-blue-50 text-blue-700",
        mock: "reminder",
    },
];

function BookingMock({ active }) {
    return (
        <div className={`transition-all duration-500 ${active ? "opacity-100" : "opacity-30"}`}>
            <div className="rounded-lg border border-gray/20 bg-white p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate mb-3">
                    Choose a slot
                </p>

                <div className="grid grid-cols-3 gap-2">
                    {["09:00", "10:00", "11:00", "13:00", "14:00", "15:00"].map(
                        (slot, index) => (
                            <div
                                key={slot}
                                style={{ animationDelay: `${index * 80}ms` }}
                                className={`rounded-md border px-2 py-2 text-center text-xs font-bold animate-slot-in
                                    ${
                                        slot === "10:00"
                                            ? "border-navy bg-navy text-white"
                                            : "border-gray/30 text-navy"
                                    }`}
                            >
                                {slot}
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
}

function NotifyMock({ active }) {
    return (
        <div className={`transition-all duration-500 ${active ? "opacity-100" : "opacity-30"}`}>
            <div className="rounded-lg border border-gray/20 bg-white p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate mb-3">
                    New appointment
                </p>

                <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-full bg-gold/20 flex items-center justify-center text-navy font-bold">
                        SA
                    </div>
                    <div className="min-w-0">
                        <p className="text-sm font-bold text-navy">Sarah Ahmed</p>
                        <p className="text-xs text-slate">Consultation · 10:00 AM</p>
                    </div>
                </div>

                <div className="mt-3 flex gap-2">
                    <span className="rounded-full bg-green-50 px-3 py-1 text-[11px] font-bold text-green-700 animate-pulse-soft">
                        Accept
                    </span>
                    <span className="rounded-full bg-red-50 px-3 py-1 text-[11px] font-bold text-red-600">
                        Reschedule
                    </span>
                </div>
            </div>
        </div>
    );
}

function ReminderMock({ active }) {
    return (
        <div className={`transition-all duration-500 ${active ? "opacity-100" : "opacity-30"}`}>
            <div className="rounded-lg border border-gray/20 bg-white p-4">
                <p className="text-xs font-bold uppercase tracking-wide text-slate mb-3">
                    Reminder sent
                </p>

                <div className="space-y-2">
                    {[
                        { channel: "SMS", status: "Delivered" },
                        { channel: "Email", status: "Opened" },
                    ].map((row, index) => (
                        <div
                            key={row.channel}
                            style={{ animationDelay: `${index * 220}ms` }}
                            className="flex items-center justify-between rounded-md bg-beige/50 px-3 py-2 animate-slot-in"
                        >
                            <span className="text-xs font-bold text-navy">
                                {row.channel}
                            </span>
                            <span className="text-[11px] font-bold text-green-700">
                                {row.status}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

function HowItWorks() {
    const [sectionRef, sectionInView] = useInView({ threshold: 0.15 });
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        if (!sectionInView) return;

        const interval = setInterval(() => {
            setActiveStep((current) => (current + 1) % steps.length);
        }, 3200);

        return () => clearInterval(interval);
    }, [sectionInView]);

    return (
        <section
            id="how-it-works"
            ref={sectionRef}
            className="relative overflow-hidden bg-white px-4 py-16 sm:px-6 sm:py-20 md:px-8 md:py-24"
        >
            <div className="mx-auto max-w-7xl">

                <div
                    className={`mx-auto mb-12 max-w-2xl text-center transition-all duration-500
                        ${sectionInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
                >
                    <p className="mb-3 text-xs font-bold tracking-[0.2em] text-brown sm:text-sm">
                        HOW IT WORKS
                    </p>

                    <h2 className="font-serif text-2xl text-navy sm:text-3xl md:text-4xl">
                        From booking to reminder in three quiet steps.
                    </h2>

                    <p className="mt-4 text-sm leading-relaxed text-slate md:text-base">
                        No tools to learn. No setup rabbit holes. Just a clean flow your team and your customers will actually enjoy using.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 lg:items-center">

                    {/* Steps List */}
                    <div className="flex flex-col gap-4">
                        {steps.map((step, index) => {
                            const Icon = step.icon;
                            const isActive = activeStep === index;

                            return (
                                <button
                                    key={step.id}
                                    type="button"
                                    onClick={() => setActiveStep(index)}
                                    className={`
                                        group text-left rounded-2xl border p-5 sm:p-6 transition-all duration-500
                                        ${
                                            isActive
                                                ? "border-navy bg-beige/40 shadow-md -translate-y-0.5"
                                                : "border-gray/20 bg-white hover:border-navy/40"
                                        }
                                    `}
                                >
                                    <div className="flex items-start gap-4">

                                        <div
                                            className={`
                                                flex h-11 w-11 shrink-0 items-center justify-center rounded-xl
                                                transition-all duration-500
                                                ${
                                                    isActive
                                                        ? "bg-navy text-gold scale-105"
                                                        : "bg-beige text-navy"
                                                }
                                            `}
                                        >
                                            <Icon className="h-5 w-5" />
                                        </div>

                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[11px] font-bold tracking-[0.2em] text-brown">
                                                    STEP {step.id}
                                                </span>

                                                {isActive && (
                                                    <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse-soft" />
                                                )}
                                            </div>

                                            <h3 className="mt-1 font-serif text-lg text-navy">
                                                {step.title}
                                            </h3>

                                            <p className="mt-2 text-sm leading-relaxed text-slate">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Progress bar for active step */}
                                    <div className="mt-4 h-0.5 w-full overflow-hidden rounded-full bg-gray/20">
                                        <div
                                            className={`
                                                h-full bg-gold transition-all ease-linear
                                                ${isActive ? "w-full duration-[3200ms]" : "w-0 duration-300"}
                                            `}
                                        />
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    {/* "Video" Mock — scripted carousel, styled like a mini player */}
                    <div
                        className={`
                            relative rounded-2xl border border-gray/20 bg-navy p-3 shadow-xl
                            transition-all duration-700
                            ${sectionInView ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95"}
                        `}
                    >
                        {/* Player chrome */}
                        <div className="flex items-center justify-between px-2 pb-3">
                            <div className="flex items-center gap-1.5">
                                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                            </div>

                            <div className="flex items-center gap-2 text-white/70">
                                <Play className="h-3.5 w-3.5 text-gold" />
                                <span className="text-[11px] font-bold tracking-wide">
                                    LIVE PREVIEW
                                </span>
                            </div>
                        </div>

                        {/* Player viewport */}
                        <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-beige/95 p-5 sm:p-6">
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(254,212,136,0.25),transparent_55%)]" />

                            <div className="relative h-full">
                                {activeStep === 0 && <BookingMock active />}
                                {activeStep === 1 && <NotifyMock active />}
                                {activeStep === 2 && <ReminderMock active />}
                            </div>

                            {/* Step indicator */}
                            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                                {steps.map((step, index) => (
                                    <span
                                        key={step.id}
                                        className={`
                                            h-1.5 rounded-full transition-all duration-500
                                            ${
                                                activeStep === index
                                                    ? "w-6 bg-navy"
                                                    : "w-1.5 bg-navy/30"
                                            }
                                        `}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default HowItWorks;