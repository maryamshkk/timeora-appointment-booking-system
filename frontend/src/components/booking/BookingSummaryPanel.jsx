import React from "react";
import { ArrowRight } from "lucide-react";

function BookingSummaryPanel({
    rows = [],
    continueLabel = "Continue",
    onContinue,
    isContinueDisabled = false,
}) {
    return (
        <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6 lg:sticky lg:top-6">

            {/* Heading */}
            <h2 className="font-serif text-2xl text-navy">
                Booking Summary
            </h2>

            <div className="border-b border-gray/20 my-5"></div>

            {/* Summary Rows */}
            <div className="flex flex-col gap-5">
                {rows.map((row, index) => (
                    <div key={`${row.label}-${index}`}>

                        {/* Highlighted Row */}
                        {row.highlighted ? (
                            <div className="bg-beige/40 rounded-lg p-3 flex items-center gap-3">

                                {row.avatar ? (
                                    <img
                                        src={row.avatar}
                                        alt={row.value}
                                        className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                                    />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                                        <span className="text-sm font-bold text-navy">
                                            {row.value
                                                ?.charAt(0)
                                                ?.toUpperCase()}
                                        </span>
                                    </div>
                                )}

                                <div className="min-w-0">
                                    <p className="text-xs font-bold uppercase tracking-wide text-slate mb-1">
                                        {row.label}
                                    </p>

                                    <p className="text-base font-bold text-navy truncate">
                                        {row.value || "Not selected"}
                                    </p>

                                    {row.subvalue && (
                                        <p className="text-sm text-slate mt-0.5">
                                            {row.subvalue}
                                        </p>
                                    )}
                                </div>

                            </div>
                        ) : (
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wide text-slate mb-1">
                                    {row.label}
                                </p>

                                <p className="text-base font-bold text-navy">
                                    {row.value || "Not selected"}
                                </p>

                                {row.subvalue && (
                                    <p className="text-sm text-slate mt-0.5">
                                        {row.subvalue}
                                    </p>
                                )}
                            </div>
                        )}

                    </div>
                ))}
            </div>

            {/* Continue */}
            <button
                type="button"
                onClick={onContinue}
                disabled={isContinueDisabled}
                className="
                    w-full
                    mt-7
                    py-3.5
                    bg-navy
                    text-white
                    rounded-lg
                    text-sm
                    font-bold
                    uppercase
                    tracking-wide
                    flex
                    items-center
                    justify-center
                    gap-2
                    transition
                    hover:bg-gold
                    hover:text-navy
                    disabled:opacity-40
                    disabled:cursor-not-allowed
                "
            >
                {continueLabel}

                <ArrowRight className="w-4 h-4" />
            </button>

        </div>
    );
}

export default BookingSummaryPanel;
