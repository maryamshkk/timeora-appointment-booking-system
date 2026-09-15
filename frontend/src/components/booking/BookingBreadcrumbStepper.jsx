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

    // Breadcrumb trail per step — last entry is the current (static) label,
    // everything before it renders as a link.
    const breadcrumbsByStep = {
        company: [
            { label: "Browse Companies", to: "/customer/browse" },
            { label: companyName, current: true },
        ],
        service: [
            { label: "Browse Companies", to: "/customer/browse" },
            { label: companyName, to: "/customer/companies/1" },
            { label: "Service", current: true },
        ],
        staff: [
            { label: "Browse Companies", to: "/customer/browse" },
            { label: companyName, to: "/customer/companies/1" },
            { label: "Service", to: "/customer/booking/service" },
            { label: "Staff", current: true },
        ],
        "date-time": [
            { label: "Browse Companies", to: "/customer/browse" },
            { label: companyName, to: "/customer/companies/1" },
            { label: "Service", to: "/customer/booking/service" },
            { label: "Staff", to: "/customer/booking/staff" },
            { label: "Date & Time", current: true },
        ],
        summary: [
            { label: "Browse Companies", to: "/customer/browse" },
            { label: companyName, to: "/customer/companies/1" },
            { label: "Service", to: "/customer/booking/service" },
            { label: "Staff", to: "/customer/booking/staff" },
            { label: "Date & Time", to: "/customer/booking/datetime" },
            { label: "Summary", current: true },
        ],
        confirmation: [
            { label: "Browse Companies", to: "/customer/browse" },
            { label: companyName, to: "/customer/companies/1" },
            { label: "Service", to: "/customer/booking/service" },
            { label: "Staff", to: "/customer/booking/staff" },
            { label: "Date & Time", to: "/customer/booking/datetime" },
            { label: "Summary", to: "/customer/booking/summary" },
            { label: "Confirmation", current: true },
        ],
    };

    const breadcrumbs =
        breadcrumbsByStep[currentStep] || breadcrumbsByStep.staff;

    const currentStepIndex = steps.findIndex(
        (step) => step.key === currentStep
    );

    return (
        <div className="flex justify-between items-center gap-6 flex-wrap mb-4">

            {/* Breadcrumb */}
            <div className="flex items-center flex-wrap gap-1.5">

                {breadcrumbs.map((crumb, index) => (
                    <React.Fragment key={`${crumb.label}-${index}`}>

                        {index > 0 && (
                            <ChevronRight className="w-3 h-3 text-gray flex-shrink-0" />
                        )}

                        {crumb.current ? (
                            <span className="text-xs font-bold uppercase tracking-wide text-navy">
                                {crumb.label}
                            </span>
                        ) : (
                            <Link
                                to={crumb.to}
                                className="text-xs font-bold uppercase tracking-wide text-slate hover:text-navy transition"
                            >
                                {crumb.label}
                            </Link>
                        )}

                    </React.Fragment>
                ))}

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