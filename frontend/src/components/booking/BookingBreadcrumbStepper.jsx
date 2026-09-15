import React from "react";
import { Check, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

function BookingBreadcrumbStepper({
    currentStep = "staff",
    companyName = "Shifa Clinic",
}) {
    const steps = [
        {
            key: "company",
            label: "Company",
        },
        {
            key: "service",
            label: "Service",
        },
        {
            key: "staff",
            label: "Staff",
        },
        {
            key: "time",
            label: "Time",
        },
    ];

    const currentStepIndex = steps.findIndex(
        (step) => step.key === currentStep
    );

    return (
        <div className="flex justify-between items-center flex-wrap gap-4 mb-4">

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

                <Link
                    to="/customer/booking/service"
                    className="text-xs font-bold uppercase tracking-wide text-slate hover:text-navy transition"
                >
                    Services
                </Link>

                <ChevronRight className="w-3 h-3 text-gray flex-shrink-0" />
                
                <Link
                    to="/customer/booking/staff"
                    className="text-xs font-bold uppercase tracking-wide text-slate hover:text-navy transition"
                >
                    Staff
                </Link>

                

            </div>

            {/* Circular Stepper */}
            <div className="flex items-center gap-2 flex-wrap">

                {steps.map((step, index) => {
                    const isCompleted = index < currentStepIndex;
                    const isCurrent = index === currentStepIndex;

                    return (
                        <React.Fragment key={step.key}>

                            {/* Connector */}
                            {index > 0 && (
                                <span
                                    className={`
                                        h-px
                                        min-w-6
                                        flex-1
                                        ${
                                            index <= currentStepIndex
                                                ? "bg-navy"
                                                : "bg-gray/30"
                                        }
                                    `}
                                />
                            )}

                            {/* Step */}
                            <div className="flex items-center gap-2">

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
                                                ? "border-2 border-navy bg-white"
                                                : "border-2 border-gray/30 bg-white"
                                        }
                                    `}
                                >
                                    {isCompleted && (
                                        <Check className="w-3 h-3 text-white" />
                                    )}

                                    {isCurrent && (
                                        <span className="w-2.5 h-2.5 rounded-full bg-navy" />
                                    )}
                                </div>

                                <span
                                    className={`
                                        text-xs
                                        whitespace-nowrap
                                        ${
                                            isCompleted || isCurrent
                                                ? "font-bold text-navy"
                                                : "text-gray"
                                        }
                                    `}
                                >
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