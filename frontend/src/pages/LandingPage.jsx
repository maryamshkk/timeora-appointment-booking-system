import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
    Calendar,
    CalendarPlus,
    Users,
    UserCog,
    Contact,
    RefreshCw,
    TrendingUp,
    Scissors,
    Bell,
    Banknote,
    FileText,
} from "lucide-react";

import Navbar from "../components/public/Navbar";
import Footer from "../components/public/Footer";
import DashboardPreviewMock from "../components/public/DashboardPreviewMock";
import HowItWorks from "../components/public/HowItWorks";
import AboutSection from "../components/public/AboutSection";
import ContactSection from "../components/public/ContactSection";
import useInView from "../hooks/useInView";

function LandingPage() {
    const featureItems = [
        { label: "EASY SCHEDULING", icon: Calendar },
        { label: "STAFF MANAGEMENT", icon: Users },
        { label: "CUSTOMER MANAGEMENT", icon: Contact },
        { label: "REAL-TIME AVAILABILITY", icon: RefreshCw },
        { label: "BUSINESS INSIGHTS", icon: TrendingUp },
    ];

    const featureCards = [
        {
            icon: CalendarPlus,
            title: "Appointment Management",
            description:
                "Easily create, modify, or cancel bookings from a centralized dashboard.",
        },
        {
            icon: Calendar,
            title: "Scheduling & Availability",
            description:
                "Define working hours, breaks, and holidays to ensure accurate booking slots.",
        },
        {
            icon: UserCog,
            title: "Staff Management",
            description:
                "Assign services to specific team members and track their individual schedules.",
        },
        {
            icon: Contact,
            title: "Customer Management",
            description:
                "Maintain detailed client profiles, booking history, and preferences.",
        },
        {
            icon: Scissors,
            title: "Services",
            description:
                "Categorize your offerings with distinct durations and pricing structures.",
        },
        {
            icon: Bell,
            title: "Notifications",
            description:
                "Automated SMS and email reminders to drastically reduce client no-shows.",
        },
        {
            icon: Banknote,
            title: "Cash on Reception",
            description:
                "Streamlined handling of in-person payments tied directly to appointments.",
        },
        {
            icon: FileText,
            title: "Receipt Generation",
            description:
                "Instantly generate professional, branded receipts for completed services.",
        },
    ];

    // Hero — staggered entrance on page load
    const [heroLoaded, setHeroLoaded] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => setHeroLoaded(true), 60);
        return () => clearTimeout(timer);
    }, []);

    // Feature strip / grid — quiet scroll reveals
    const [stripRef, stripInView] = useInView();
    const [gridRef, gridInView] = useInView({ threshold: 0.1 });

    // CTA — scale-and-fade, plus parallax on the decorative preview
    const [ctaRef, ctaInView] = useInView({ threshold: 0.25 });
    const ctaSectionRef = useRef(null);
    const [parallaxOffset, setParallaxOffset] = useState(0);

    useEffect(() => {
        function handleScroll() {
            const node = ctaSectionRef.current;
            if (!node) return;

            const bounds = node.getBoundingClientRect();
            const viewportHeight = window.innerHeight;

            if (bounds.top > viewportHeight || bounds.bottom < 0) return;

            const progress = 1 - bounds.top / viewportHeight;
            const clamped = Math.min(Math.max(progress, 0), 1);
            setParallaxOffset(clamped * 18);
        }

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-beige">

            <Navbar />

            {/* Hero */}
            <main className="bg-beige">
                <section className="px-4 py-14 sm:px-6 sm:py-16 md:px-8 md:py-20 lg:py-24">
                    <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 md:gap-12 lg:grid-cols-2 lg:gap-16">

                        <div className="text-center lg:text-left">
                            <p
                                className={`
                                    mb-4 text-xs font-bold tracking-[0.2em] text-brown sm:mb-5 sm:text-sm
                                    transition-all duration-500 ease-out
                                    ${heroLoaded ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}
                                `}
                            >
                                SMART APPOINTMENT MANAGEMENT
                            </p>

                            <h1
                                className={`
                                    font-serif text-3xl leading-tight text-navy delay-100 sm:text-4xl md:text-5xl lg:text-6xl
                                    transition-all duration-500 ease-out
                                    ${heroLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}
                                `}
                            >
                                Simplify Appointments.
                                <br />
                                Empower Your Business.
                            </h1>

                            <p
                                className={`
                                    mx-auto mt-5 max-w-xl text-sm leading-relaxed text-slate delay-200 sm:mt-6 sm:text-base lg:mx-0
                                    transition-all duration-500 ease-out
                                    ${heroLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}
                                `}
                            >
                                Timeora helps businesses manage appointments, staff
                                schedules, customers, services and daily operations from one
                                simple platform.
                            </p>

                            <div
                                className={`
                                    mt-7 flex flex-col items-stretch gap-3 delay-300 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center lg:justify-start
                                    transition-all duration-500 ease-out
                                    ${heroLoaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}
                                `}
                            >
                                <Link
                                    to="/roleselection"
                                    className="inline-flex items-center justify-center rounded-lg bg-navy px-6 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold hover:text-navy hover:shadow-[0_10px_24px_-8px_rgba(254,212,136,0.55)]"
                                >
                                    Register Your Company
                                </Link>

                                <a
                                    href="#how-it-works"
                                    className="inline-flex items-center justify-center rounded-lg border border-navy px-6 py-3 text-sm font-bold text-navy transition-all duration-300 hover:-translate-y-0.5 hover:bg-navy hover:text-white"
                                >
                                    See How It Works
                                </a>
                            </div>
                        </div>

                        <div className="flex w-full justify-center lg:justify-end">
                            <DashboardPreviewMock />
                        </div>

                    </div>
                </section>
            </main>

            {/* Feature Strip */}
            <section
                ref={stripRef}
                className="bg-white px-4 py-12 text-center sm:px-6 sm:py-14 md:px-8 md:py-16"
            >
                <div className="mx-auto max-w-7xl">

                    <p
                        className={`
                            mb-8 font-serif text-lg text-navy sm:mb-10 sm:text-xl md:text-2xl
                            transition-all duration-500 ease-out
                            ${stripInView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}
                        `}
                    >
                        Everything you need to stay in control of your time.
                    </p>

                    <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-5">
                        {featureItems.map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.label}
                                    style={{
                                        transitionDelay: stripInView ? `${index * 70}ms` : "0ms",
                                    }}
                                    className={`
                                        flex flex-col items-center gap-3
                                        transition-all duration-500 ease-out
                                        ${stripInView ? "translate-y-0 scale-100 opacity-100" : "translate-y-3 scale-95 opacity-0"}
                                    `}
                                >
                                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-beige">
                                        <Icon className="h-5 w-5 text-navy" />
                                    </div>

                                    <p className="text-[11px] font-bold uppercase tracking-wide text-slate sm:text-xs">
                                        {item.label}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Feature Grid */}
            <section
                id="features"
                ref={gridRef}
                className="bg-beige px-4 py-14 sm:px-6 sm:py-16 md:px-8 md:py-20"
            >
                <div className="mx-auto max-w-7xl">

                    <div
                        className={`
                            mx-auto mb-10 max-w-2xl text-center sm:mb-12
                            transition-all duration-500 ease-out
                            ${gridInView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"}
                        `}
                    >
                        <h2 className="font-serif text-2xl text-navy sm:text-3xl md:text-4xl">
                            Everything You Need to Manage Appointments
                        </h2>

                        <p className="mt-4 text-sm leading-relaxed text-slate md:text-base">
                            A comprehensive suite of tools designed to streamline your
                            operations, reduce no-shows, and elevate your client experience.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
                        {featureCards.map((card, index) => {
                            const Icon = card.icon;

                            return (
                                <div
                                    key={card.title}
                                    style={{
                                        transitionDelay: gridInView
                                            ? `${(index % 4) * 80}ms`
                                            : "0ms",
                                    }}
                                    className={`
                                        rounded-xl border border-gray/20 bg-white p-5 shadow-sm
                                        transition-all duration-500 ease-out
                                        hover:-translate-y-1 hover:shadow-md sm:p-6
                                        ${gridInView ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"}
                                    `}
                                >
                                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-beige">
                                        <Icon className="h-5 w-5 text-navy" />
                                    </div>

                                    <h3 className="font-serif text-lg text-navy">
                                        {card.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-relaxed text-slate">
                                        {card.description}
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <HowItWorks />

            {/* About */}
            <AboutSection />

            {/* Contact */}
            <ContactSection />

            {/* CTA */}
            <section
                ref={(node) => {
                    ctaSectionRef.current = node;
                    ctaRef.current = node;
                }}
                className="relative overflow-hidden bg-navy px-4 py-16 text-center sm:px-6 sm:py-20 md:px-8 md:py-24"
            >
                <div
                    className={`
                        relative z-10 mx-auto max-w-3xl
                        transition-all duration-700 ease-out
                        ${ctaInView ? "scale-100 opacity-100" : "scale-95 opacity-0"}
                    `}
                >
                    <h2 className="font-serif text-2xl text-white sm:text-3xl md:text-4xl">
                        Ready to Take Control of Your Appointments?
                    </h2>

                    <Link
                        to="/register/company"
                        className="mt-8 inline-block rounded-lg bg-beige px-7 py-3.5 text-sm font-bold text-navy transition-all duration-300 hover:-translate-y-0.5 hover:bg-gold hover:shadow-[0_10px_28px_-8px_rgba(254,212,136,0.5)]"
                    >
                        Register Your Company
                    </Link>
                </div>

                <div
                    aria-hidden="true"
                    style={{ transform: `translate(-50%, ${82 - parallaxOffset}%)` }}
                    className="pointer-events-none absolute bottom-0 left-1/2 hidden w-[85%] max-w-[760px] transition-transform duration-100 ease-out sm:block"
                >
                    <DashboardPreviewMock compact />
                </div>
            </section>

            {/* Footer */}
            <div className="relative z-10">
                <Footer />
            </div>

        </div>
    );
}

export default LandingPage;