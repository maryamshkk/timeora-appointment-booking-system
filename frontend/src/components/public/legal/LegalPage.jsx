import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function LegalPage({ eyebrow, title, lastUpdated, children }) {
    return (
        <div className="min-h-screen bg-beige">

            {/* Header band */}
            <section className="bg-navy px-4 py-12 text-white sm:px-6 sm:py-16 md:px-8">
                <div className="mx-auto max-w-3xl">

                    <Link
                        to="/"
                        className="mb-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-gold transition hover:text-white"
                    >
                        <ArrowLeft className="h-3.5 w-3.5" />
                        Back to home
                    </Link>

                    {eyebrow && (
                        <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-gold sm:text-sm">
                            {eyebrow}
                        </p>
                    )}

                    <h1 className="font-serif text-3xl leading-tight sm:text-4xl md:text-5xl">
                        {title}
                    </h1>

                    {lastUpdated && (
                        <p className="mt-3 text-sm text-white/60">
                            Last updated: {lastUpdated}
                        </p>
                    )}

                </div>
            </section>

            {/* Content */}
            <section className="px-4 py-12 sm:px-6 sm:py-16 md:px-8">
                <article className="mx-auto max-w-3xl space-y-8 text-sm leading-relaxed text-slate md:text-base">
                    {children}
                </article>
            </section>

        </div>
    );
}

export function LegalSection({ heading, children }) {
    return (
        <section className="space-y-3">
            <h2 className="font-serif text-lg text-navy sm:text-xl">
                {heading}
            </h2>
            <div className="space-y-3">{children}</div>
        </section>
    );
}

export default LegalPage;