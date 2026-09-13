import React from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/public/Navbar";
import DashboardPreviewMock from "../components/public/DashboardPreviewMock";

function LandingPage() {
    return (
        <div className="min-h-screen bg-beige">

            <Navbar />

            {/* Hero Section */}
            <main className="bg-beige">
                <section className="px-8 py-20">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                        {/* Hero Content */}
                        <div>
                            <p className="text-sm font-bold tracking-[0.2em] text-gold mb-5">
                                SMART APPOINTMENT MANAGEMENT
                            </p>

                            <h1 className="font-serif text-5xl lg:text-6xl leading-tight text-navy">
                                Simplify Appointments.
                                <br />
                                Empower Your Business.
                            </h1>

                            <p className="text-base text-slate leading-relaxed max-w-xl mt-6">
                                Timeora helps businesses manage appointments,
                                staff schedules, customers, services and daily
                                operations from one simple platform.
                            </p>

                            {/* CTA Buttons */}
                            <div className="flex flex-wrap items-center gap-4 mt-8">
                                <Link
                                    to="/register/company"
                                    className="
                                        bg-navy
                                        text-white
                                        px-6
                                        py-3
                                        rounded-lg
                                        font-bold
                                        text-sm
                                        hover:bg-gold
                                        hover:text-navy
                                        transition
                                    "
                                >
                                    Register Your Company
                                </Link>

                                <Link
                                    to="/#how-it-works"
                                    className="
                                        border
                                        border-navy
                                        text-navy
                                        px-6
                                        py-3
                                        rounded-lg
                                        font-bold
                                        text-sm
                                        hover:bg-navy
                                        hover:text-white
                                        transition
                                    "
                                >
                                    See How It Works
                                </Link>
                            </div>
                        </div>

                        {/* Dashboard Preview */}
                        <div className="w-full flex justify-center lg:justify-end">
                            <DashboardPreviewMock />
                        </div>

                    </div>
                </section>
            </main>

        </div>
    );
}

export default LandingPage;
