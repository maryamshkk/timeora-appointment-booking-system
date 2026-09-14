import React, { useMemo, useState } from "react";
import { Check, ChevronRight, Loader2, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import { useCreateService } from "../../hooks/company/useServices";
import { useStaff } from "../../hooks/company/useStaff";

function getInitials(firstName, lastName) {
    return `${(firstName || "").charAt(0)}${(lastName || "").charAt(0)}`.toUpperCase();
}

function AddService() {
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [localError, setLocalError] = useState("");
    const [selectedStaffIds, setSelectedStaffIds] = useState([]);

    const [formData, setFormData] = useState({
        serviceName: "",
        description: "",
        price: "",
        durationMinutes: 60,
        isActive: true,
    });

    const {
        data: staffResponse,
        isLoading: staffLoading,
    } = useStaff();

    const {
        mutate: createService,
        isPending,
        error,
    } = useCreateService();

    const staffList = useMemo(() => {
        const raw = staffResponse?.data || [];
        return raw.map((member) => ({
            id: member.id,
            name: `${member.first_name || ""} ${member.last_name || ""}`.trim(),
            role: member.role?.name || "Staff",
            initials: getInitials(member.first_name, member.last_name),
            color: "bg-blue-100",
            textColor: "text-navy",
        }));
    }, [staffResponse]);

    function handleStaffToggle(staffId) {
        setSelectedStaffIds((current) =>
            current.includes(staffId)
                ? current.filter((id) => id !== staffId)
                : [...current, staffId]
        );
    }

    function handleStatusToggle() {
        setFormData((current) => ({
            ...current,
            isActive: !current.isActive,
        }));
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((current) => ({ ...current, [name]: value }));
        setLocalError("");
    }

    function handleSubmit(event) {
        event.preventDefault();
        setLocalError("");

        if (!formData.serviceName.trim()) {
            setLocalError("Service name is required.");
            return;
        }

        if (!formData.price || Number(formData.price) < 0) {
            setLocalError("Please enter a valid price.");
            return;
        }

        const payload = {
            name: formData.serviceName,
            description: formData.description || null,
            duration: Number(formData.durationMinutes),
            price: Number(formData.price),
            status: formData.isActive ? "active" : "disabled",
            staff_ids: selectedStaffIds,
        };

        createService(payload);
    }

    const isFormValid = Boolean(formData.serviceName && formData.price);

    const apiErrorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "";

    const displayError = localError || apiErrorMessage;

    return (
        <div className="flex min-h-screen bg-beige">
            <div className="hidden lg:block lg:flex-shrink-0">
                <Sidebar
                    companyName="Shifa Clinic"
                    activeItem="Services"
                    ctaLabel="Add Service"
                />
            </div>

            {sidebarOpen && (
                <>
                    <button
                        type="button"
                        onClick={() => setSidebarOpen(false)}
                        className="fixed inset-0 z-30 bg-navy/50 lg:hidden"
                        aria-label="Close menu"
                    />

                    <div className="fixed left-0 top-0 z-40 h-screen w-64 overflow-y-auto lg:hidden">
                        <Sidebar
                            companyName="Shifa Clinic"
                            activeItem="Services"
                            ctaLabel="Add Service"
                        />
                    </div>
                </>
            )}

            <div className="flex min-w-0 flex-1 flex-col">
                <Topbar
                    onMenuClick={() => setSidebarOpen(true)}
                    showBell
                    hasNotification
                    simpleProfileIcon
                    searchPlaceholder="Search..."
                />

                <main className="flex-1 bg-beige px-3 py-4 sm:px-4 sm:py-5 md:px-6 lg:px-8 lg:py-6">
                    <div className="mb-2 flex items-center gap-2 text-sm">
                        <Link
                            to="/company/services"
                            className="text-slate transition hover:text-navy"
                        >
                            Services
                        </Link>

                        <ChevronRight className="h-3.5 w-3.5 text-gray" />

                        <span className="font-bold text-navy">
                            Add Service
                        </span>
                    </div>

                    <div className="mb-4 sm:mb-6">
                        <h1 className="font-serif text-2xl text-navy sm:text-3xl lg:text-4xl">
                            Add Service
                        </h1>

                        <p className="mt-1 text-xs text-slate sm:mt-1.5 sm:text-sm">
                            Create a service that customers can book through
                            your company.
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-3 lg:gap-6"
                    >
                        <div className="flex flex-col gap-4 md:gap-5 lg:col-span-2 lg:gap-6">
                            <div className="rounded-xl border border-gray/20 bg-white p-4 shadow-sm sm:p-5 md:p-6 lg:p-8">
                                <h2 className="font-serif text-xl text-navy sm:text-2xl">
                                    Basic Information
                                </h2>

                                <div className="mb-4 mt-3 border-b border-gray/20 sm:mb-5 sm:mt-4" />

                                <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
                                    <div className="md:col-span-2">
                                        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-navy">
                                            Service Name
                                        </label>

                                        <input
                                            type="text"
                                            name="serviceName"
                                            value={formData.serviceName}
                                            onChange={handleChange}
                                            placeholder="e.g. Initial Consultation"
                                            className="w-full rounded-lg border border-gray px-3 py-2.5 text-sm text-navy outline-none transition focus:border-navy focus:ring-2 focus:ring-gold sm:px-4"
                                        />
                                    </div>
                                </div>

                                <div className="mt-4 sm:mt-5">
                                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-navy">
                                        Description
                                    </label>

                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows="4"
                                        placeholder="Briefly describe what this service includes..."
                                        className="w-full resize-none rounded-lg border border-gray px-3 py-2.5 text-sm text-navy outline-none transition focus:border-navy focus:ring-2 focus:ring-gold sm:px-4"
                                    />
                                </div>
                            </div>

                            <div className="rounded-xl border border-gray/20 bg-white p-4 shadow-sm sm:p-5 md:p-6 lg:p-8">
                                <h2 className="font-serif text-xl text-navy sm:text-2xl">
                                    Pricing &amp; Duration
                                </h2>

                                <div className="mb-4 mt-3 border-b border-gray/20 sm:mb-5 sm:mt-4" />

                                <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-navy">
                                            Price (Rs.)
                                        </label>

                                        <div className="relative">
                                            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate sm:left-4">
                                                Rs.
                                            </span>

                                            <input
                                                type="number"
                                                name="price"
                                                value={formData.price}
                                                onChange={handleChange}
                                                min="0"
                                                step="0.01"
                                                placeholder="0.00"
                                                className="w-full rounded-lg border border-gray py-2.5 pl-10 pr-3 text-sm text-navy outline-none transition focus:border-navy focus:ring-2 focus:ring-gold sm:pr-4"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-navy">
                                            Duration (minutes)
                                        </label>

                                        <input
                                            type="number"
                                            name="durationMinutes"
                                            value={formData.durationMinutes}
                                            onChange={handleChange}
                                            min="1"
                                            step="1"
                                            className="w-full rounded-lg border border-gray px-3 py-2.5 text-sm text-navy outline-none transition focus:border-navy focus:ring-2 focus:ring-gold sm:px-4"
                                        />

                                        <p className="mt-1.5 text-xs text-slate">
                                            Default is 60 minutes.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-xl border border-gray/20 bg-white p-4 shadow-sm sm:p-5 md:p-6 lg:p-8">
                                <h2 className="font-serif text-xl text-navy sm:text-2xl">
                                    Staff Assignment
                                </h2>

                                <div className="mb-3 mt-3 border-b border-gray/20 sm:mt-4" />

                                <p className="mb-4 text-xs text-slate sm:text-sm">
                                    Select the staff members qualified to perform
                                    this service.
                                </p>

                                {staffLoading ? (
                                    <div className="flex items-center gap-2 py-3 text-sm text-slate">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Loading staff...
                                    </div>
                                ) : staffList.length === 0 ? (
                                    <p className="rounded-lg border border-dashed border-gray/40 bg-beige/30 px-4 py-3 text-sm text-slate">
                                        No staff members yet. Add staff first.
                                    </p>
                                ) : (
                                    <div className="flex flex-col gap-2.5">
                                        {staffList.map((staff) => {
                                            const isSelected =
                                                selectedStaffIds.includes(staff.id);

                                            return (
                                                <div
                                                    key={staff.id}
                                                    role="button"
                                                    tabIndex={0}
                                                    onClick={() =>
                                                        handleStaffToggle(staff.id)
                                                    }
                                                    onKeyDown={(event) => {
                                                        if (
                                                            event.key === "Enter" ||
                                                            event.key === " "
                                                        ) {
                                                            event.preventDefault();
                                                            handleStaffToggle(
                                                                staff.id
                                                            );
                                                        }
                                                    }}
                                                    className={`flex cursor-pointer items-center justify-between rounded-lg border p-3 transition sm:p-3.5 ${
                                                        isSelected
                                                            ? "border-navy/40 bg-navy/[0.02]"
                                                            : "border-gray/20 hover:border-navy/40"
                                                    }`}
                                                >
                                                    <div className="flex min-w-0 items-center gap-3">
                                                        <div
                                                            className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full ${staff.color}`}
                                                        >
                                                            <span
                                                                className={`text-sm font-bold ${staff.textColor}`}
                                                            >
                                                                {staff.initials}
                                                            </span>
                                                        </div>

                                                        <div className="min-w-0">
                                                            <p className="truncate text-sm font-bold text-navy">
                                                                {staff.name}
                                                            </p>

                                                            <p className="mt-0.5 truncate text-xs text-slate">
                                                                {staff.role}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div
                                                        className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md border-2 transition ${
                                                            isSelected
                                                                ? "border-navy bg-navy"
                                                                : "border-gray bg-white"
                                                        }`}
                                                    >
                                                        {isSelected && (
                                                            <Check className="h-3.5 w-3.5 text-white" />
                                                        )}
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            <div className="rounded-xl border border-gray/20 bg-white p-4 shadow-sm sm:p-5 md:p-6 lg:p-8">
                                <h2 className="font-serif text-xl text-navy sm:text-2xl">
                                    Service Status
                                </h2>

                                <div className="mb-4 mt-3 border-b border-gray/20 sm:mt-4" />

                                <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                                    <p className="max-w-[500px] text-xs leading-relaxed text-slate sm:text-sm">
                                        Service availability automatically follows
                                        company hours and assigned staff schedules.
                                        Toggle to quickly hide this service from
                                        booking.
                                    </p>

                                    <div className="flex flex-shrink-0 items-center gap-3">
                                        <span className="text-sm font-bold text-navy">
                                            {formData.isActive ? "ACTIVE" : "INACTIVE"}
                                        </span>

                                        <button
                                            type="button"
                                            role="switch"
                                            aria-checked={formData.isActive}
                                            onClick={handleStatusToggle}
                                            className={`relative flex h-6 w-12 items-center rounded-full transition-colors ${
                                                formData.isActive
                                                    ? "bg-navy"
                                                    : "bg-gray/40"
                                            }`}
                                        >
                                            <span
                                                className={`flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-sm transition-transform ${
                                                    formData.isActive
                                                        ? "translate-x-6"
                                                        : "translate-x-0.5"
                                                }`}
                                            >
                                                {formData.isActive && (
                                                    <Check className="h-3 w-3 text-navy" />
                                                )}
                                            </span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="hidden lg:block">
                            <div className="sticky top-6 flex flex-col gap-4 md:gap-5 lg:gap-6">
                                <div className="rounded-xl border border-gray/20 bg-white p-5 shadow-sm lg:p-7">
                                    <h2 className="font-serif text-xl text-navy sm:text-2xl">
                                        Service Summary
                                    </h2>

                                    <div className="my-4 border-b border-gray/30 sm:my-5" />

                                    <div className="mb-5 sm:mb-6">
                                        <p
                                            className={`font-serif text-base font-bold ${
                                                formData.serviceName
                                                    ? "text-navy"
                                                    : "text-gray italic"
                                            }`}
                                        >
                                            {formData.serviceName ||
                                                "Untitled Service"}
                                        </p>
                                    </div>

                                    <div className="mb-5 grid grid-cols-2 gap-4 sm:mb-6">
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                                Price
                                            </p>

                                            <p className="mt-1 font-serif text-lg font-bold text-navy">
                                                Rs. {formData.price || "0.00"}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                                Duration
                                            </p>

                                            <p className="mt-1 font-serif text-lg font-bold text-navy">
                                                {formData.durationMinutes} min
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate">
                                            Assigned Staff
                                        </p>

                                        <div className="flex flex-wrap gap-2">
                                            {staffList
                                                .filter((staff) =>
                                                    selectedStaffIds.includes(
                                                        staff.id
                                                    )
                                                )
                                                .map((staff) => (
                                                    <span
                                                        key={staff.id}
                                                        className="rounded-full bg-beige px-3 py-1.5 text-xs font-bold text-navy"
                                                    >
                                                        {staff.name}
                                                    </span>
                                                ))}

                                            {selectedStaffIds.length === 0 && (
                                                <span className="text-sm italic text-gray">
                                                    No staff assigned yet
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {displayError && (
                            <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 lg:col-span-3">
                                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                                <p className="text-sm text-red-700">
                                    {displayError}
                                </p>
                            </div>
                        )}

                        <div className="flex flex-col-reverse gap-3 border-t border-gray/30 pt-5 sm:flex-row sm:justify-end sm:pt-6 lg:col-span-3">
                            <button
                                type="button"
                                onClick={() => navigate("/company/services")}
                                className="rounded-lg border border-gray px-6 py-3 text-center text-sm font-bold text-slate transition hover:border-navy hover:text-navy"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={!isFormValid || isPending}
                                className="flex items-center justify-center gap-2 rounded-lg bg-navy px-6 py-3 text-sm font-bold text-white transition hover:bg-gold hover:text-navy disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Creating...
                                    </>
                                ) : (
                                    "Create Service"
                                )}
                            </button>
                        </div>
                    </form>
                </main>
            </div>
        </div>
    );
}

export default AddService;