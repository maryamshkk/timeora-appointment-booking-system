import React from "react";
import { ShieldCheck, Sparkles, HeartHandshake, Globe2 } from "lucide-react";
import useInView from "../../hooks/useInView";

const values = [
    {
        icon: ShieldCheck,
        title: "Privacy First",
        description: "Customer data is handled with the care you'd expect from a healthcare-grade platform.",
    },
    {
        icon: Sparkles,
        title: "Built for Focus",
        description: "No clutter, no dashboards with ten tabs. Just the essentials, done well.",
    },
    {
        icon: HeartHandshake,
        title: "Made With Care",
        description: "Every screen is reviewed by real providers before it ships to you.",
    },
    {
        icon: Globe2,
        title: "Ready Anywhere",
        description: "Works on any device desktop, tablet, phone with the same calm interface.",
    },
];

function AboutSection() {
    const [ref, inView] = useInView({ threshold: 0.15 });

    return (
        <section
            id="about"
            ref={ref}
            className="bg-beige px-4 py-16 sm:px-6 sm:py-20 md:px-8 md:py-24"
        >
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16 lg:items-center">

                {/* Left: text */}
                <div
                    className={`transition-all duration-700
                        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                >
                    <p className="mb-3 text-xs font-bold tracking-[0.2em] text-brown sm:text-sm">
                        ABOUT TIMEORA
                    </p>

                    <h2 className="font-serif text-2xl text-navy sm:text-3xl md:text-4xl">
                        A calmer way to run appointments.
                    </h2>

                    <p className="mt-5 text-sm leading-relaxed text-slate md:text-base">
                        Timeora was built for clinics, consultants, salons and studios who
                        wanted one place to manage bookings - without turning their workflow
                        into a second job. We focus on the small things that matter: how a
                        booking feels, how a reminder lands, how a receipt looks.
                    </p>

                    <p className="mt-4 text-sm leading-relaxed text-slate md:text-base">
                        No aggressive upsells. No payment gateways bolted on. Just an honest
                        scheduling tool that respects your time and your customers' trust.
                    </p>

                    <div className="mt-8 flex flex-wrap gap-6">
                        <div>
                            <p className="font-serif text-3xl text-navy">1,200+</p>
                            <p className="text-xs font-bold uppercase tracking-wide text-slate mt-1">
                                Businesses Onboarded
                            </p>
                        </div>

                        <div>
                            <p className="font-serif text-3xl text-navy">98%</p>
                            <p className="text-xs font-bold uppercase tracking-wide text-slate mt-1">
                                Reminder Open Rate
                            </p>
                        </div>

                        <div>
                            <p className="font-serif text-3xl text-navy">-63%</p>
                            <p className="text-xs font-bold uppercase tracking-wide text-slate mt-1">
                                No-Show Reduction
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right: value cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {values.map((value, index) => {
                        const Icon = value.icon;

                        return (
                            <div
                                key={value.title}
                                style={{ transitionDelay: inView ? `${index * 90}ms` : "0ms" }}
                                className={`
                                    rounded-xl border border-gray/20 bg-white p-5 shadow-sm
                                    transition-all duration-500 ease-out
                                    hover:-translate-y-1 hover:shadow-md
                                    ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                                `}
                            >
                                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-beige">
                                    <Icon className="h-5 w-5 text-navy" />
                                </div>

                                <h3 className="font-serif text-base text-navy">
                                    {value.title}
                                </h3>

                                <p className="mt-2 text-sm leading-relaxed text-slate">
                                    {value.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}

export default AboutSection;