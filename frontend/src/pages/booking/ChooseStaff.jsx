import React, { useMemo, useState } from "react";
import { ArrowLeft, Search, SlidersHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";

import CustomerSidebar from "../../components/customer/CustomerSidebar";
import CustomerTopbar from "../../components/customer/CustomerTopbar";
import BookingBreadcrumbStepper from "../../components/booking/BookingBreadcrumbStepper";
import BookingSummaryPanel from "../../components/booking/BookingSummaryPanel";

function ChooseStaff() {
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState("");
    const [selectedStaffId, setSelectedStaffId] = useState(null);
    const [selectedFilter, setSelectedFilter] = useState("all");

    const selectedCompany = {
        id: 1,
        name: "Shifa Clinic",
    };

    const selectedService = {
        name: "Consultation",
        duration: "30 min",
        price: "PKR 2,500",
    };

    const staff = [
        {
            id: 1,
            name: "Dr. Sarah Ahmed",
            role: "Senior Consultant",
            availability: "Available today",
            status: "available",
            avatar: "",
        },
        {
            id: 2,
            name: "Dr. Ali Hassan",
            role: "General Physician",
            availability: "Available today",
            status: "available",
            avatar: "",
        },
        {
            id: 3,
            name: "Dr. Ayesha Malik",
            role: "Specialist",
            availability: "Available tomorrow",
            status: "available",
            avatar: "",
        },
        {
            id: 4,
            name: "Dr. Hamza Khan",
            role: "Consultant",
            availability: "Busy today",
            status: "busy",
            avatar: "",
        },
        {
            id: 5,
            name: "Dr. Hira Shah",
            role: "Family Physician",
            availability: "Available today",
            status: "available",
            avatar: "",
        },
        {
            id: 6,
            name: "Dr. Omar Farooq",
            role: "Medical Consultant",
            availability: "Available this week",
            status: "available",
            avatar: "",
        },
    ];

    const selectedStaff = staff.find(
        (member) => member.id === selectedStaffId
    );

    const filteredStaff = useMemo(() => {
        return staff.filter((member) => {
            const matchesSearch =
                member.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                member.role
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());

            const matchesFilter =
                selectedFilter === "all" ||
                (selectedFilter === "available" &&
                    member.status === "available");

            return matchesSearch && matchesFilter;
        });
    }, [searchQuery, selectedFilter]);

    function handleContinue() {
        if (!selectedStaff) {
            return;
        }

        navigate("/booking/time", {
            state: {
                company: selectedCompany,
                service: selectedService,
                staff: selectedStaff,
            },
        });
    }

    const summaryRows = [
        {
            label: "Company",
            value: selectedCompany.name,
        },
        {
            label: "Service",
            value: selectedService.name,
            subvalue: `${selectedService.duration} • ${selectedService.price}`,
        },
        {
            label: "Provider",
            value: selectedStaff?.name || "Select a staff member",
            subvalue: selectedStaff?.role,
            avatar: selectedStaff?.avatar,
            highlighted: Boolean(selectedStaff),
        },
        {
            label: "Time",
            value: "Not selected",
        },
    ];

    return (
        <div className="min-h-screen bg-beige flex">

            {/* Sidebar */}
            <CustomerSidebar activeItem="Browse Companies" />

            {/* Main Portal */}
            <div className="flex-1 min-w-0 flex flex-col">

                <CustomerTopbar />

                <main className="flex-1 px-8 py-6">

                    <div className="max-w-[1400px] mx-auto">

                        {/* Breadcrumb + Stepper */}
                        <BookingBreadcrumbStepper
                            currentStep="staff"
                            companyName={selectedCompany.name}
                        />

                        {/* Back */}
                        <button
                            type="button"
                            onClick={() => navigate("/customer/booking/service")}
                            className="
                                flex
                                items-center
                                gap-2
                                text-sm
                                font-bold
                                text-slate
                                hover:text-navy
                                transition
                                mb-5
                            "
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Services
                        </button>

                        {/* Main Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8">

                            {/* Left Content */}
                            <section>

                                {/* Heading */}
                                <div className="mb-6">
                                    <h1 className="font-serif text-3xl text-navy">
                                        Choose a Staff Member
                                    </h1>

                                    <p className="text-sm text-slate mt-2">
                                        Select the staff member you would like
                                        to book your appointment with.
                                    </p>
                                </div>

                                {/* Selected Service */}
                                <div className="bg-white rounded-xl border border-gray/20 p-4 mb-6 flex items-center justify-between gap-4">

                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                            Selected Service
                                        </p>

                                        <p className="text-base font-bold text-navy mt-1">
                                            {selectedService.name}
                                        </p>

                                        <p className="text-sm text-slate mt-0.5">
                                            {selectedService.duration} •{" "}
                                            {selectedService.price}
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            navigate("/customer/booking/service")
                                        }
                                        className="
                                            text-xs
                                            font-bold
                                            uppercase
                                            tracking-wide
                                            text-navy
                                            hover:text-gold
                                            transition
                                            whitespace-nowrap
                                        "
                                    >
                                        Change
                                    </button>

                                </div>

                                {/* Search + Filter */}
                                <div className="flex flex-col sm:flex-row gap-3 mb-6">

                                    <div className="relative flex-1">
                                        <Search
                                            className="
                                                absolute
                                                left-4
                                                top-1/2
                                                -translate-y-1/2
                                                w-4
                                                h-4
                                                text-slate
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
                                            placeholder="Search staff..."
                                            className="
                                                w-full
                                                h-11
                                                rounded-xl
                                                border
                                                border-gray/40
                                                bg-white
                                                pl-11
                                                pr-4
                                                font-serif
                                                text-sm
                                                text-navy
                                                outline-none
                                                focus:border-navy
                                            "
                                        />
                                    </div>

                                    <div className="flex gap-2">

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setSelectedFilter("all")
                                            }
                                            className={`
                                                h-11
                                                px-4
                                                rounded-xl
                                                border
                                                text-xs
                                                font-bold
                                                uppercase
                                                tracking-wide
                                                transition
                                                ${
                                                    selectedFilter === "all"
                                                        ? "bg-navy text-white border-navy"
                                                        : "bg-white text-slate border-gray/40 hover:border-navy hover:text-navy"
                                                }
                                            `}
                                        >
                                            All
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setSelectedFilter("available")
                                            }
                                            className={`
                                                h-11
                                                px-4
                                                rounded-xl
                                                border
                                                flex
                                                items-center
                                                gap-2
                                                text-xs
                                                font-bold
                                                uppercase
                                                tracking-wide
                                                transition
                                                ${
                                                    selectedFilter ===
                                                    "available"
                                                        ? "bg-navy text-white border-navy"
                                                        : "bg-white text-slate border-gray/40 hover:border-navy hover:text-navy"
                                                }
                                            `}
                                        >
                                            <SlidersHorizontal className="w-3.5 h-3.5" />
                                            Available
                                        </button>

                                    </div>
                                </div>

                                {/* Staff Grid */}
                                {filteredStaff.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                                        {filteredStaff.map((member) => {
                                            const isSelected =
                                                selectedStaffId === member.id;

                                            return (
                                                <button
                                                    type="button"
                                                    key={member.id}
                                                    onClick={() =>
                                                        setSelectedStaffId(
                                                            member.id
                                                        )
                                                    }
                                                    className={`
                                                        text-left
                                                        bg-white
                                                        rounded-xl
                                                        border
                                                        p-5
                                                        transition
                                                        ${
                                                            isSelected
                                                                ? "border-navy shadow-md"
                                                                : "border-gray/20 shadow-sm hover:border-navy/40"
                                                        }
                                                    `}
                                                >
                                                    <div className="flex items-start gap-4">

                                                        {/* Avatar */}
                                                        {member.avatar ? (
                                                            <img
                                                                src={
                                                                    member.avatar
                                                                }
                                                                alt={
                                                                    member.name
                                                                }
                                                                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                                                            />
                                                        ) : (
                                                            <div className="w-12 h-12 rounded-full bg-beige flex items-center justify-center flex-shrink-0">
                                                                <span className="text-base font-bold text-navy">
                                                                    {member.name
                                                                        .split(
                                                                            " "
                                                                        )
                                                                        .map(
                                                                            (
                                                                                name
                                                                            ) =>
                                                                                name.charAt(
                                                                                    0
                                                                                )
                                                                        )
                                                                        .slice(
                                                                            0,
                                                                            2
                                                                        )
                                                                        .join("")
                                                                        .toUpperCase()}
                                                                </span>
                                                            </div>
                                                        )}

                                                        {/* Info */}
                                                        <div className="min-w-0 flex-1">
                                                            <div className="flex items-start justify-between gap-3">

                                                                <div className="min-w-0">
                                                                    <h3 className="text-sm font-bold text-navy truncate">
                                                                        {
                                                                            member.name
                                                                        }
                                                                    </h3>

                                                                    <p className="text-sm text-slate mt-1">
                                                                        {
                                                                            member.role
                                                                        }
                                                                    </p>
                                                                </div>

                                                                {isSelected && (
                                                                    <span className="text-xs font-bold text-navy whitespace-nowrap">
                                                                        Selected
                                                                    </span>
                                                                )}

                                                            </div>

                                                            <div className="flex items-center gap-2 mt-4">
                                                                <span
                                                                    className={`
                                                                        w-2
                                                                        h-2
                                                                        rounded-full
                                                                        ${
                                                                            member.status ===
                                                                            "available"
                                                                                ? "bg-green-500"
                                                                                : "bg-gray"
                                                                        }
                                                                    `}
                                                                />

                                                                <span className="text-xs text-slate">
                                                                    {
                                                                        member.availability
                                                                    }
                                                                </span>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </button>
                                            );
                                        })}

                                    </div>
                                ) : (
                                    <div className="bg-white rounded-xl border border-gray/20 p-10 text-center">
                                        <p className="text-sm text-slate">
                                            No staff members found.
                                        </p>
                                    </div>
                                )}

                            </section>

                            {/* Summary */}
                            <aside>
                                <BookingSummaryPanel
                                    rows={summaryRows}
                                    continueLabel="Continue to Time"
                                    onContinue={handleContinue}
                                    isContinueDisabled={!selectedStaff}
                                />
                            </aside>

                        </div>

                    </div>

                </main>

            </div>

        </div>
    );
}

export default ChooseStaff;
