import React from "react";
import { Check, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

function BookingBreadcrumbStepper({
    currentStep = "staff",
    companyName = "Shifa Clinic",
}) {
    const steps = [
        { key: "company", label: "Company" },
        { key: "service", label: "Service" },
        { key: "staff", label: "Staff" },
        { key: "date-time", label: "Date & Time" },
        { key: "summary", label: "Summary" },
        { key: "confirmation", label: "Confirmation" },
    ];

    const currentStepIndex = steps.findIndex(
        (step) => step.key === currentStep
    );

    return (
        <div className="flex justify-between items-center gap-6 flex-wrap mb-4">

            {/* Breadcrumb */}
            <div className="flex items-center flex-wrap gap-1.5">

                <Link
                    to="/customer/browse"
                    className="text-xs font-bold uppercase tracking-wide text-slate hover:text-navy transition"
                >
                    Browse Companies
                </Link>

                <ChevronRight className="w-3 h-3 text-gray flex-shrink-0" />

                <Link
                    to="/customer/companies/1"
                    className="text-xs font-bold uppercase tracking-wide text-slate hover:text-navy transition"
                >
                    {companyName}
                </Link>

                <ChevronRight className="w-3 h-3 text-gray flex-shrink-0" />

                <span className="text-xs font-bold uppercase tracking-wide text-navy">
                    {steps[currentStepIndex]?.label}
                </span>

            </div>

            {/* Stepper */}
            <div className="flex items-center gap-2 flex-wrap">

                {steps.map((step, index) => {
                    const isCompleted = index < currentStepIndex;
                    const isCurrent = index === currentStepIndex;
                    const isUpcoming = index > currentStepIndex;

                    return (
                        <React.Fragment key={step.key}>

                            {/* Connector */}
                            {index > 0 && (
                                <span
                                    className={`
                                        h-px
                                        w-6
                                        flex-shrink-0
                                        ${
                                            index <= currentStepIndex
                                                ? "bg-navy"
                                                : "bg-gray/30"
                                        }
                                    `}
                                />
                            )}

                            <div className="flex items-center gap-2">

                                {/* Step Circle */}
                                <div
                                    className={`
                                        w-6
                                        h-6
                                        rounded-full
                                        flex
                                        items-center
                                        justify-center
                                        flex-shrink-0

                                        ${
                                            isCompleted
                                                ? "bg-navy"
                                                : isCurrent
                                                ? "bg-navy ring-2 ring-gold ring-offset-2 ring-offset-beige"
                                                : isUpcoming
                                                ? "bg-gray/20 text-slate"
                                                : ""
                                        }
                                    `}
                                >
                                    {isCompleted && (
                                        <Check className="w-3 h-3 text-white" />
                                    )}

                                    {isCurrent && (
                                        <span className="w-2 h-2 rounded-full bg-white" />
                                    )}

                                    {isUpcoming && (
                                        <span className="text-[10px] font-bold text-slate">
                                            {String(index + 1).padStart(2, "0")}
                                        </span>
                                    )}
                                </div>

                                {/* Step Label */}
                                <span
                                    className={`
                                        text-xs
                                        whitespace-nowrap

                                        ${
                                            isCompleted || isCurrent
                                                ? "font-bold text-navy"
                                                : "text-slate"
                                        }
                                    `}
                                >
                                    {String(index + 1).padStart(2, "0")}{" "}
                                    {step.label}
                                </span>

                            </div>

                        </React.Fragment>
                    );
                })}

            </div>
        </div>
    );
}

export default BookingBreadcrumbStepper;
