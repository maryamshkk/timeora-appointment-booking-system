import React from "react";
import { Link } from "react-router-dom";
import {
    Calendar,
    Users,
    Contact,
    RefreshCw,
    TrendingUp,
} from "lucide-react";

import Navbar from "../components/public/Navbar";
import DashboardPreviewMock from "../components/public/DashboardPreviewMock";

function LandingPage() {
    const featureItems = [
        {
            label: "EASY SCHEDULING",
            icon: Calendar,
        },
        {
            label: "STAFF MANAGEMENT",
            icon: Users,
        },
        {
            label: "CUSTOMER MANAGEMENT",
            icon: Contact,
        },
        {
            label: "REAL-TIME AVAILABILITY",
            icon: RefreshCw,
        },
        {
            label: "BUSINESS INSIGHTS",
            icon: TrendingUp,
        },
    ];

    return (
        <div className="min-h-screen bg-beige">

            <Navbar />

            {/* Hero Section */}
            <main className="bg-beige">
                <section className="px-4 py-14 sm:px-6 sm:py-16 md:px-8 md:py-20 lg:py-24">
                    <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 md:gap-12 lg:grid-cols-2 lg:gap-16">

                        {/* Hero Content */}
                        <div className="text-center lg:text-left">
                            <p className="mb-4 text-xs font-bold tracking-[0.2em] text-gold sm:mb-5 sm:text-sm">
                                SMART APPOINTMENT MANAGEMENT
                            </p>

                            <h1 className="font-serif text-3xl leading-tight text-navy sm:text-4xl md:text-5xl lg:text-6xl">
                                Simplify Appointments.
                                <br />
                                Empower Your Business.
                            </h1>

                            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-slate sm:mt-6 sm:text-base lg:mx-0">
                                Timeora helps businesses manage appointments,
                                staff schedules, customers, services and daily
                                operations from one simple platform.
                            </p>

                            {/* CTA Buttons */}
                            <div className="mt-7 flex flex-col items-stretch gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center lg:justify-start">
                                <Link
                                    to="/register/company"
                                    className="
                                        inline-flex
                                        items-center
                                        justify-center
                                        rounded-lg
                                        bg-navy
                                        px-6
                                        py-3
                                        text-sm
                                        font-bold
                                        text-white
                                        transition
                                        hover:bg-gold
                                        hover:text-navy
                                    "
                                >
                                    Register Your Company
                                </Link>

                                <Link
                                    to="/#how-it-works"
                                    className="
                                        inline-flex
                                        items-center
                                        justify-center
                                        rounded-lg
                                        border
                                        border-navy
                                        px-6
                                        py-3
                                        text-sm
                                        font-bold
                                        text-navy
                                        transition
                                        hover:bg-navy
                                        hover:text-white
                                    "
                                >
                                    See How It Works
                                </Link>
                            </div>
                        </div>

                        {/* Dashboard Preview */}
                        <div className="flex w-full justify-center lg:justify-end">
                            <DashboardPreviewMock />
                        </div>

                    </div>
                </section>
            </main>

            {/* Feature Strip */}
            <section className="bg-white px-4 py-12 text-center sm:px-6 sm:py-14 md:px-8 md:py-16">
                <div className="mx-auto max-w-7xl">

                    <p className="mb-8 font-serif text-lg text-navy sm:mb-10 sm:text-xl md:text-2xl">
                        Everything you need to stay in control of your time.
                    </p>

                    <div className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-5">

                        {featureItems.map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.label}
                                    className="flex flex-col items-center gap-3"
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

        </div>
    );
}

export default LandingPage;