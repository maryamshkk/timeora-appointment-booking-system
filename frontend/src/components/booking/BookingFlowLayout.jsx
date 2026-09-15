import React from "react";
import {
    ArrowLeft,
    ArrowRight,
    Check,
    HelpCircle,
    Pencil,
    X,
} from "lucide-react";

function BookingFlowLayout({
    currentStep = "service",
    selectedCompany,
    selectedService,
    children,
    continueLabel = "CONTINUE",
    onContinue,
    isContinueDisabled = false,
    onBack,
    onClose,
    onEditCompany,
}) {
    const steps = [
        { key: "company", number: "01", label: "COMPANY" },
        { key: "service", number: "02", label: "SERVICE" },
        { key: "staff", number: "03", label: "STAFF" },
        { key: "time", number: "04", label: "TIME" },
    ];

    const currentStepIndex = steps.findIndex(
        (step) => step.key === currentStep
    );

    return (
        <div className="min-h-screen bg-beige text-navy">

            {/* Top Bar */}
            <header className="bg-beige border-b border-gray/20 px-8 py-4 flex items-center justify-between">
                <button
                    type="button"
                    onClick={onBack}
                    className="flex items-center gap-3 text-navy cursor-pointer"
                    aria-label="Go back"
                >
                    <ArrowLeft className="w-[18px] h-[18px]" />

                    <span className="font-serif text-xl">
                        Timeora
                    </span>
                </button>

                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        className="text-navy hover:text-gold transition"
                        aria-label="Help"
                    >
                        <HelpCircle className="w-5 h-5" />
                    </button>

                    <button
                        type="button"
                        onClick={onClose}
                        className="text-navy hover:text-gold transition"
                        aria-label="Close booking flow"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </header>

            {/* Step Indicator */}
            <div className="px-8 py-6 flex items-center flex-wrap gap-2">
                {steps.map((step, index) => {
                    const stepIndex = index;

                    const isCompleted =
                        stepIndex < currentStepIndex;

                    const isCurrent =
                        stepIndex === currentStepIndex;

                    return (
                        <React.Fragment key={step.key}>

                            {index > 0 && (
                                <span className="text-gray mx-2">
                                    /
                                </span>
                            )}

                            <div className="flex items-center gap-2">

                                <span
                                    className={`
                                        text-xs
                                        font-bold
                                        ${
                                            isCompleted
                                                ? "text-gold"
                                                : isCurrent
                                                ? "text-navy"
                                                : "text-gray"
                                        }
                                    `}
                                >
                                    {step.number}
                                </span>

                                <span
                                    className={`
                                        text-xs
                                        tracking-wide
                                        ${
                                            isCompleted || isCurrent
                                                ? "text-navy font-bold"
                                                : "text-gray"
                                        }
                                        ${
                                            isCurrent
                                                ? "border-b-2 border-navy pb-1"
                                                : ""
                                        }
                                    `}
                                >
                                    {step.label}
                                </span>

                                {isCompleted && (
                                    <Check className="w-3.5 h-3.5 text-gold" />
                                )}

                                {isCurrent && (
                                    <span className="w-2 h-2 rounded-full bg-navy" />
                                )}

                            </div>
                        </React.Fragment>
                    );
                })}
            </div>

            {/* Main Area */}
            <main className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 px-8 pb-8">

                {/* Step Content */}
                <section>
                    {children}
                </section>

                {/* Booking Summary */}
                <aside className="bg-white rounded-xl border border-gray/20 shadow-sm p-6 lg:sticky lg:top-6 lg:self-start">

                    {/* Summary Heading */}
                    <h2 className="font-serif text-2xl text-navy">
                        Booking Summary
                    </h2>

                    <div className="border-b border-gray/20 mt-4 mb-5" />

                    {/* Company */}
                    <div className="flex items-start justify-between gap-4 mb-5">
                        <div>
                            <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                Company
                            </p>

                            <p className="text-base font-bold text-navy mt-1">
                                {selectedCompany?.name || "Not selected"}
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={onEditCompany}
                            className="text-gold hover:text-navy transition cursor-pointer"
                            aria-label="Edit company"
                        >
                            <Pencil className="w-3.5 h-3.5" />
                        </button>
                    </div>

                    {/* Selected Service */}
                    {selectedService && (
                        <div className="bg-beige/40 rounded-lg p-4 mb-6">
                            <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                Selected Service
                            </p>

                            <p className="font-serif text-xl text-navy mt-1">
                                {selectedService.name}
                            </p>

                            <div className="flex items-center justify-between mt-2">
                                <span className="text-sm text-slate">
                                    {selectedService.duration}
                                </span>

                                <span className="text-sm font-bold text-navy">
                                    {selectedService.price}
                                </span>
                            </div>
                        </div>
                    )}

                    <div className="border-b border-gray/20 mb-4" />

                    {/* Remaining Steps */}
                    <div className="flex flex-col">

                        <div className="flex items-center gap-3">
                            <span className="w-6 h-6 border border-gray rounded-full flex items-center justify-center text-xs font-bold text-gray">
                                3
                            </span>

                            <span className="text-sm font-bold text-gray">
                                Select Staff
                            </span>
                        </div>

                        <div className="border-l border-gray/20 ml-3 h-4" />

                        <div className="flex items-center gap-3">
                            <span className="w-6 h-6 border border-gray rounded-full flex items-center justify-center text-xs font-bold text-gray">
                                4
                            </span>

                            <span className="text-sm font-bold text-gray">
                                Choose Time
                            </span>
                        </div>

                    </div>

                    <div className="border-b border-gray/20 mt-5 mb-5" />

                    {/* Continue */}
                    <button
                        type="button"
                        onClick={onContinue}
                        disabled={isContinueDisabled}
                        className="
                            w-full
                            bg-navy
                            text-white
                            uppercase
                            tracking-wide
                            font-bold
                            text-sm
                            py-3.5
                            rounded-lg
                            flex
                            items-center
                            justify-center
                            gap-2
                            hover:bg-gold
                            hover:text-navy
                            transition
                            disabled:opacity-40
                            disabled:cursor-not-allowed
                            disabled:hover:bg-navy
                            disabled:hover:text-white
                        "
                    >
                        {continueLabel}

                        <ArrowRight className="w-4 h-4" />
                    </button>

                    <p className="text-xs text-slate text-center mt-2.5">
                        You won't be charged yet.
                    </p>

                </aside>

            </main>
        </div>
    );
}

export default BookingFlowLayout;
