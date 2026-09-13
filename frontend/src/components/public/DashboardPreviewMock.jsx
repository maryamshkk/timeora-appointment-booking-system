import React, { useEffect, useState } from "react";
import {
    Calendar,
    Users,
    Settings,
} from "lucide-react";

function useReducedMotion() {
    const [prefersReduced, setPrefersReduced] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined" || !window.matchMedia) {
            return;
        }

        const query = window.matchMedia("(prefers-reduced-motion: reduce)");
        setPrefersReduced(query.matches);

        const handler = (event) => setPrefersReduced(event.matches);

        if (query.addEventListener) {
            query.addEventListener("change", handler);
            return () => query.removeEventListener("change", handler);
        }

        query.addListener(handler);
        return () => query.removeListener(handler);
    }, []);

    return prefersReduced;
}

function CountUp({ end, duration = 900, reducedMotion = false }) {
    const [value, setValue] = useState(reducedMotion ? end : 0);

    useEffect(() => {
        if (reducedMotion) {
            setValue(end);
            return;
        }

        let frame;
        const start = performance.now();

        function tick(now) {
            const progress = Math.min((now - start) / duration, 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setValue(Math.round(eased * end));

            if (progress < 1) {
                frame = requestAnimationFrame(tick);
            }
        }

        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [end, duration, reducedMotion]);

    return value.toLocaleString();
}

function DashboardPreviewMock({ compact = false }) {
    const prefersReducedMotion = useReducedMotion();

    const appointments = [
        { name: "Sarah Ahmed", service: "Consultation", time: "10:00 AM" },
        { name: "Michael Chen", service: "Follow-up", time: "11:30 AM" },
        { name: "Emma Davis", service: "Initial Review", time: "1:15 PM" },
    ];

    return (
        <div
            className={`
                w-full
                ${compact ? "max-w-[760px]" : "max-w-[720px]"}
                ${prefersReducedMotion ? "" : "animate-float"}
            `}
        >
            <div
                aria-hidden="true"
                className={`
                    bg-white
                    rounded-xl
                    shadow-lg
                    border
                    border-gray/20
                    overflow-hidden
                    w-full
                    transition-all
                    duration-500
                    ease-out
                    ${!compact && !prefersReducedMotion ? "hover:-translate-y-1 hover:shadow-xl" : ""}
                `}
            >
                {/* Browser Chrome */}
                <div className="bg-beige/60 px-4 py-3 flex items-center gap-2 border-b border-gray/20">
                    <span className="w-3 h-3 rounded-full bg-gray/40" />
                    <span className="w-3 h-3 rounded-full bg-gray/40" />
                    <span className="w-3 h-3 rounded-full bg-gray/40" />
                </div>

                {/* Dashboard Body */}
                <div className="flex min-h-[360px]">

                    {/* Mini Sidebar */}
                    <div className="w-14 bg-navy py-6 flex flex-col items-center gap-6 flex-shrink-0">
                        <Calendar className="w-[18px] h-[18px] text-gold" />
                        <Users className="w-[18px] h-[18px] text-white/70" />
                        <Settings className="w-[18px] h-[18px] text-white/70" />
                    </div>

                    {/* Main Preview */}
                    <div className="flex-1 bg-white p-6 min-w-0">

                        {/* Header */}
                        <div className="flex justify-between items-start gap-4">
                            <div>
                                <h3 className="font-serif text-xl text-navy">
                                    Today's Overview
                                </h3>

                                <p className="text-sm text-slate mt-1">
                                    Tuesday, Oct 24
                                </p>
                            </div>

                            <span
                                className={`
                                    bg-gold
                                    text-navy
                                    text-xs
                                    font-bold
                                    px-3
                                    py-1.5
                                    rounded-full
                                    whitespace-nowrap
                                    ${prefersReducedMotion ? "" : "animate-pulse-soft"}
                                `}
                            >
                                4 NEW BOOKINGS
                            </span>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4 mt-4">

                            <div className="border border-gray/20 rounded-lg p-4">
                                <p className="text-xs text-slate uppercase tracking-wide">
                                    Appointments
                                </p>

                                <p className="text-2xl font-bold text-navy mt-1">
                                    <CountUp end={12} reducedMotion={prefersReducedMotion} />
                                </p>
                            </div>

                            <div className="border border-gray/20 rounded-lg p-4">
                                <p className="text-xs text-slate uppercase tracking-wide">
                                    Revenue
                                </p>

                                <p className="text-2xl font-bold text-navy mt-1">
                                    $<CountUp end={1240} reducedMotion={prefersReducedMotion} />
                                </p>
                            </div>

                        </div>

                        {/* Upcoming */}
                        <div className="border border-gray/20 rounded-lg mt-4 overflow-hidden">

                            <div className="px-4 py-3 border-b border-gray/20">
                                <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                    Upcoming
                                </p>
                            </div>

                            {appointments.map((appointment, index) => (
                                <div
                                    key={appointment.name}
                                    className={`
                                        px-4
                                        py-3
                                        flex
                                        justify-between
                                        items-start
                                        gap-4
                                        ${index < appointments.length - 1 ? "border-b border-gray/20" : ""}
                                        ${prefersReducedMotion ? "" : "animate-slide-in-row"}
                                    `}
                                    style={{
                                        animationDelay: prefersReducedMotion
                                            ? undefined
                                            : `${index * 120 + 150}ms`,
                                    }}
                                >
                                    <div>
                                        <p className="text-sm font-bold text-navy">
                                            {appointment.name}
                                        </p>

                                        <p className="text-xs text-slate mt-0.5">
                                            {appointment.service}
                                        </p>
                                    </div>

                                    <p className="text-sm font-bold text-navy whitespace-nowrap">
                                        {appointment.time}
                                    </p>
                                </div>
                            ))}

                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default DashboardPreviewMock;