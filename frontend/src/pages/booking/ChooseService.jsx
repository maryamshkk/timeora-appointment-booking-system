import React, { useMemo, useState } from "react";
import { Check, Clock, Receipt, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

import CustomerSidebar from "../../components/customer/CustomerSidebar";
import CustomerTopbar from "../../components/customer/CustomerTopbar";
import BookingBreadcrumbStepper from "../../components/booking/BookingBreadcrumbStepper";
import BookingSummaryPanel from "../../components/booking/BookingSummaryPanel";

function ChooseService() {
    const navigate = useNavigate();

    const [selectedCompany] = useState({
        id: 1,
        name: "Shifa Clinic",
        category: "Healthcare",
        city: "Lahore",
    });

    const [services] = useState([
        {
            id: 1,
            name: "Consultation",
            duration: "30 min",
            price: "PKR 2,500",
            description:
                "Standard consultation with a general physician for routine checkups and common ailments.",
            category: "consultation",
        },
        {
            id: 2,
            name: "Follow-up",
            duration: "30 min",
            price: "PKR 1,500",
            description:
                "Brief follow-up appointment to review test results or check progress after initial treatment.",
            category: "follow-up",
        },
        {
            id: 3,
            name: "General Checkup",
            duration: "45 min",
            price: "PKR 4,000",
            description:
                "Comprehensive health evaluation including vital signs, basic physical exam, and health history.",
            category: "consultation",
        },
        {
            id: 4,
            name: "Specialist Consultation",
            duration: "30 min",
            price: "PKR 3,500",
            description:
                "Detailed consultation with a board-certified specialist for specific medical conditions.",
            category: "consultation",
        },
    ]);

    const [selectedServiceId, setSelectedServiceId] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("all");

    const selectedService = services.find(
        (service) => service.id === selectedServiceId
    );

    const filteredServices = useMemo(() => {
        return services.filter((service) => {
            const matchesSearch =
                service.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                service.description
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());

            const matchesTab =
                activeTab === "all" ||
                (activeTab === "consultations" &&
                    service.category === "consultation") ||
                (activeTab === "follow-ups" &&
                    service.category === "follow-up");

            return matchesSearch && matchesTab;
        });
    }, [services, searchQuery, activeTab]);

    function handleSelectService(id) {
        setSelectedServiceId(id);
    }

    function handleContinue() {
        if (!selectedService) {
            return;
        }

        navigate("/customer/booking/staff", {
            state: {
                company: selectedCompany,
                service: selectedService,
            },
        });
    }

    function handleBack() {
        navigate(`/customer/companies/${selectedCompany.id}`);
    }

    const summaryRows = [
        {
            label: "Company",
            value: selectedCompany.name,
            subvalue: `${selectedCompany.category} • ${selectedCompany.city}`,
        },
        {
            label: "Service",
            value: selectedService?.name || "Select a service",
            subvalue: selectedService
                ? `${selectedService.duration} • ${selectedService.price}`
                : undefined,
            highlighted: Boolean(selectedService),
        },
        {
            label: "Provider",
            value: "Not selected",
        },
        {
            label: "Time",
            value: "Not selected",
        },
    ];

    return (
        <div className="min-h-screen bg-beige flex">

            {/* Customer Sidebar */}
            <CustomerSidebar activeItem="Browse Companies" />

            {/* Main Portal */}
            <div className="flex-1 min-w-0 flex flex-col">

                <CustomerTopbar />

                <main className="flex-1 px-8 py-6">

                    <div className="max-w-[1400px] mx-auto">

                        {/* Breadcrumb + Stepper */}
                        <BookingBreadcrumbStepper
                            currentStep="service"
                            companyName={selectedCompany.name}
                        />

                        {/* Back */}
                        <button
                            type="button"
                            onClick={handleBack}
                            className="
                                text-sm
                                font-bold
                                text-slate
                                hover:text-navy
                                transition
                                mb-5
                            "
                        >
                            ← Back to Company
                        </button>

                        {/* Main Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">

                            {/* Left Content */}
                            <section>

                                {/* Company Context */}
                                <div className="inline-flex items-center gap-2 bg-white border border-gray/20 rounded-full px-4 py-2 mb-5">

                                    <div className="w-5 h-5 rounded-full bg-gray/10 flex items-center justify-center">
                                        <span className="text-[9px] font-bold text-navy">
                                            {selectedCompany.name
                                                .split(" ")
                                                .map((word) => word.charAt(0))
                                                .join("")
                                                .slice(0, 2)
                                                .toUpperCase()}
                                        </span>
                                    </div>

                                    <span className="text-xs font-bold uppercase tracking-wide text-slate">
                                        {selectedCompany.name} ·{" "}
                                        {selectedCompany.category} ·{" "}
                                        {selectedCompany.city}
                                    </span>

                                </div>

                                {/* Heading */}
                                <div className="mb-6">
                                    <h1 className="font-serif text-3xl text-navy">
                                        Choose a Service
                                    </h1>

                                    <p className="text-sm text-slate mt-2">
                                        Select the service you'd like to book at{" "}
                                        {selectedCompany.name}.
                                    </p>
                                </div>

                                {/* Search + Tabs */}
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                                    {/* Search */}
                                    <div className="relative w-full md:w-[280px]">

                                        <Search
                                            className="
                                                absolute
                                                left-3
                                                top-1/2
                                                -translate-y-1/2
                                                w-4
                                                h-4
                                                text-gray
                                                pointer-events-none
                                            "
                                        />

                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(event) =>
                                                setSearchQuery(
                                                    event.target.value
                                                )
                                            }
                                            placeholder="Search services..."
                                            className="
                                                w-full
                                                bg-white
                                                border
                                                border-gray
                                                rounded-lg
                                                pl-9
                                                pr-4
                                                py-3
                                                text-sm
                                                text-navy
                                                outline-none
                                                focus:border-navy
                                            "
                                        />

                                    </div>

                                    {/* Tabs */}
                                    <div className="flex items-center gap-5 overflow-x-auto">

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setActiveTab("all")
                                            }
                                            className={`
                                                text-sm
                                                whitespace-nowrap
                                                ${
                                                    activeTab === "all"
                                                        ? "text-navy font-bold border-b-2 border-navy pb-1"
                                                        : "text-slate hover:text-navy"
                                                }
                                            `}
                                        >
                                            All Services
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setActiveTab("consultations")
                                            }
                                            className={`
                                                text-sm
                                                whitespace-nowrap
                                                ${
                                                    activeTab ===
                                                    "consultations"
                                                        ? "text-navy font-bold border-b-2 border-navy pb-1"
                                                        : "text-slate hover:text-navy"
                                                }
                                            `}
                                        >
                                            Consultations
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setActiveTab("follow-ups")
                                            }
                                            className={`
                                                text-sm
                                                whitespace-nowrap
                                                ${
                                                    activeTab === "follow-ups"
                                                        ? "text-navy font-bold border-b-2 border-navy pb-1"
                                                        : "text-slate hover:text-navy"
                                                }
                                            `}
                                        >
                                            Follow-ups
                                        </button>

                                    </div>

                                </div>

                                {/* Divider */}
                                <div className="border-b border-gray/20 mt-4 mb-6" />

                                {/* Service Grid */}
                                {filteredServices.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                        {filteredServices.map((service) => {
                                            const isSelected =
                                                service.id ===
                                                selectedServiceId;

                                            return (
                                                <article
                                                    key={service.id}
                                                    onClick={() =>
                                                        handleSelectService(
                                                            service.id
                                                        )
                                                    }
                                                    className={`
                                                        bg-white
                                                        rounded-xl
                                                        border-2
                                                        p-6
                                                        cursor-pointer
                                                        relative
                                                        transition-colors
                                                        ${
                                                            isSelected
                                                                ? "border-navy"
                                                                : "border-gray/20 hover:border-navy/40"
                                                        }
                                                    `}
                                                >

                                                    {/* Selected */}
                                                    {isSelected && (
                                                        <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-navy flex items-center justify-center">
                                                            <Check className="w-3.5 h-3.5 text-white" />
                                                        </div>
                                                    )}

                                                    {/* Name */}
                                                    <h2 className="font-serif text-2xl text-navy pr-8">
                                                        {service.name}
                                                    </h2>

                                                    <div className="border-b border-gray/20 mt-2.5 mb-3" />

                                                    {/* Duration + Price */}
                                                    <div className="flex items-center gap-4 mb-3.5">

                                                        <div className="flex items-center gap-1.5">
                                                            <Clock className="w-4 h-4 text-slate" />

                                                            <span className="text-sm text-slate font-medium">
                                                                {
                                                                    service.duration
                                                                }
                                                            </span>
                                                        </div>

                                                        <div className="flex items-center gap-1.5">
                                                            <Receipt className="w-4 h-4 text-slate" />

                                                            <span className="text-sm text-slate font-medium">
                                                                {service.price}
                                                            </span>
                                                        </div>

                                                    </div>

                                                    {/* Description */}
                                                    <p className="text-sm text-slate leading-relaxed">
                                                        {service.description}
                                                    </p>

                                                </article>
                                            );
                                        })}

                                    </div>
                                ) : (
                                    <div className="bg-white rounded-xl border border-gray/20 p-10 text-center">

                                        <p className="font-serif text-xl text-navy">
                                            No services found
                                        </p>

                                        <p className="text-sm text-slate mt-2">
                                            Try a different search or
                                            category.
                                        </p>

                                    </div>
                                )}

                            </section>

                            {/* Booking Summary */}
                            <aside>
                                <BookingSummaryPanel
                                    rows={summaryRows}
                                    continueLabel="Continue to Staff"
                                    onContinue={handleContinue}
                                    isContinueDisabled={!selectedService}
                                />
                            </aside>

                        </div>

                    </div>

                </main>

            </div>

        </div>
    );
}

export default ChooseService;
