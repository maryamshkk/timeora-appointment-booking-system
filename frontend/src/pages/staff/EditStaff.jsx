import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    ChevronRight,
    ChevronDown,
    Save,
    User,
    Mail,
    Phone,
    Briefcase,
    IdCard,
    Trash2,
} from "lucide-react";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";

const mockStaffData = {
    staffId: "STF-0012",
    name: "Dr. Sara Ahmed",
    email: "sara.ahmed@timeora.com",
    phone: "+1 (555) 123-4567",
    professionalRole: "Senior Doctor",
    role: "doctor",
    status: "active",
    joinedDate: "14 October, 2021",
    services: ["Consultation", "Follow-up", "Therapy Session"],
    notes: "Leads the morning shift. Excellent patient feedback.",
};

const ALL_SERVICES = [
    "Consultation",
    "Follow-up",
    "Therapy Session",
    "Initial Assessment",
    "Standard Checkup",
];

function EditStaff() {
    const { staffId } = useParams();
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);

    /* TODO: Replace seed with axios GET /api/company/staff/:staffId */
    const [formData, setFormData] = useState(mockStaffData);
    const [savedSnapshot, setSavedSnapshot] = useState(mockStaffData);

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isDirty =
        JSON.stringify(formData) !== JSON.stringify(savedSnapshot);

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

        if (errors[name]) {
            setErrors((previous) => ({
                ...previous,
                [name]: "",
            }));
        }
    }

    function handleToggleService(service) {
        setFormData((previous) => {
            const hasService = previous.services.includes(service);

            return {
                ...previous,
                services: hasService
                    ? previous.services.filter((item) => item !== service)
                    : [...previous.services, service],
            };
        });
    }

    function validate() {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required.";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Enter a valid email address.";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone is required.";
        }

        if (!formData.professionalRole.trim()) {
            newErrors.professionalRole = "Role is required.";
        }

        return newErrors;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setIsSubmitting(true);

        try {
            // TODO: axios PUT /api/company/staff/:staffId with formData
            // await api.put(`/company/staff/${staffId}`, formData);

            setSavedSnapshot(formData);
            navigate(`/company/staff/${staffId}`);
        } finally {
            setIsSubmitting(false);
        }
    }

    function handleRemoveStaff() {
        const confirmed = window.confirm(
            "Are you sure you want to remove this staff member? This action cannot be undone."
        );

        if (!confirmed) {
            return;
        }

        // TODO: axios DELETE /api/company/staff/:staffId
        navigate("/company/staff");
    }

    function handleCancel() {
        navigate(`/company/staff/${staffId}`);
    }

    const inputClass = `
        w-full rounded-lg border border-gray bg-white px-4 py-3
        text-sm text-navy outline-none focus:border-navy
    `;

    const labelClass = `
        mb-2 block text-xs font-bold uppercase tracking-wide text-navy
    `;

    return (
        <div className="flex min-h-screen bg-beige">

            {/* Desktop Sidebar */}
            <div className="hidden lg:block lg:flex-shrink-0">
                <Sidebar
                    companyName="Shifa Clinic"
                    activeItem="Staff"
                    ctaLabel="Add Staff"
                    ctaPath="/company/staff/add"
                />
            </div>

            {/* Mobile Sidebar — overlay */}
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
                            activeItem="Staff"
                            ctaLabel="Add Staff"
                            ctaPath="/company/staff/add"
                        />
                    </div>
                </>
            )}

            {/* Main Area */}
            <div className="flex min-w-0 flex-1 flex-col">

                <Topbar
                    onMenuClick={() => setSidebarOpen(true)}
                    showBell
                    showHelp
                    showProfileDropdown
                    searchPlaceholder="Search..."
                />

                <main className="flex-1 bg-beige px-4 py-6 sm:px-6 md:px-8">
                    <div className="mx-auto w-full max-w-4xl">

                        {/* Breadcrumb */}
                        <div className="mb-4 flex flex-wrap items-center gap-2 text-sm">

                            <Link
                                to="/company/staff"
                                className="text-slate transition hover:text-navy"
                            >
                                Staff
                            </Link>

                            <ChevronRight className="h-3.5 w-3.5 text-gray" />

                            <Link
                                to={`/company/staff/${staffId}`}
                                className="text-slate transition hover:text-navy"
                            >
                                {formData.name}
                            </Link>

                            <ChevronRight className="h-3.5 w-3.5 text-gray" />

                            <span className="font-bold text-navy">Edit</span>

                        </div>

                        {/* Header */}
                        <div className="mb-6">
                            <h1 className="font-serif text-2xl text-navy sm:text-3xl lg:text-4xl">
                                Edit Staff Member
                            </h1>

                            <p className="mt-1.5 text-sm text-slate">
                                Update the staff member's profile, role, and assigned services.
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                            {/* Card 1 — Basic Information */}
                            <div className="rounded-xl border border-gray/20 bg-white p-5 shadow-sm sm:p-6 md:p-7">

                                <div className="mb-5 flex items-center gap-3">

                                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-beige">
                                        <User className="h-5 w-5 text-navy" />
                                    </div>

                                    <h2 className="font-serif text-lg font-bold text-navy sm:text-xl">
                                        Basic Information
                                    </h2>

                                </div>

                                <div className="border-b border-gray/20" />

                                <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">

                                    {/* Full Name */}
                                    <div className="md:col-span-2">
                                        <label htmlFor="name" className={labelClass}>
                                            Full Name
                                        </label>

                                        <input
                                            id="name"
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Staff member name"
                                            className={inputClass}
                                        />

                                        {errors.name && (
                                            <p className="mt-1.5 text-xs text-red-600">
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label htmlFor="email" className={labelClass}>
                                            Email Address
                                        </label>

                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />

                                            <input
                                                id="email"
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="name@example.com"
                                                className={`${inputClass} pl-10`}
                                            />
                                        </div>

                                        {errors.email && (
                                            <p className="mt-1.5 text-xs text-red-600">
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label htmlFor="phone" className={labelClass}>
                                            Phone Number
                                        </label>

                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />

                                            <input
                                                id="phone"
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                placeholder="+92 300 1234567"
                                                className={`${inputClass} pl-10`}
                                            />
                                        </div>

                                        {errors.phone && (
                                            <p className="mt-1.5 text-xs text-red-600">
                                                {errors.phone}
                                            </p>
                                        )}
                                    </div>

                                    {/* Staff ID (read-only) */}
                                    <div>
                                        <label className={labelClass}>
                                            Staff ID
                                        </label>

                                        <div className="relative">
                                            <IdCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />

                                            <input
                                                type="text"
                                                value={formData.staffId}
                                                readOnly
                                                className={`${inputClass} pl-10 cursor-not-allowed bg-gray/5 text-slate`}
                                            />
                                        </div>

                                        <p className="mt-1.5 text-xs text-slate">
                                            Staff IDs are assigned automatically.
                                        </p>
                                    </div>

                                    {/* Account Status */}
                                    <div>
                                        <label htmlFor="status" className={labelClass}>
                                            Account Status
                                        </label>

                                        <div className="relative">
                                            <select
                                                id="status"
                                                name="status"
                                                value={formData.status}
                                                onChange={handleChange}
                                                className={`${inputClass} appearance-none pr-10`}
                                            >
                                                <option value="active">Active</option>
                                                <option value="inactive">Inactive</option>
                                                <option value="suspended">Suspended</option>
                                            </select>

                                            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />
                                        </div>
                                    </div>

                                </div>

                            </div>

                            {/* Card 2 — Professional Profile */}
                            <div className="rounded-xl border border-gray/20 bg-white p-5 shadow-sm sm:p-6 md:p-7">

                                <div className="mb-5 flex items-center gap-3">

                                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-beige">
                                        <Briefcase className="h-5 w-5 text-navy" />
                                    </div>

                                    <h2 className="font-serif text-lg font-bold text-navy sm:text-xl">
                                        Professional Profile
                                    </h2>

                                </div>

                                <div className="border-b border-gray/20" />

                                <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">

                                    {/* Professional Role */}
                                    <div className="md:col-span-2">
                                        <label htmlFor="professionalRole" className={labelClass}>
                                            Professional Role
                                        </label>

                                        <input
                                            id="professionalRole"
                                            type="text"
                                            name="professionalRole"
                                            value={formData.professionalRole}
                                            onChange={handleChange}
                                            placeholder="e.g. Senior Doctor"
                                            className={inputClass}
                                        />

                                        {errors.professionalRole && (
                                            <p className="mt-1.5 text-xs text-red-600">
                                                {errors.professionalRole}
                                            </p>
                                        )}
                                    </div>

                                </div>

                                {/* Assigned Services */}
                                <div className="mt-6">

                                    <label className={labelClass}>
                                        Assigned Services
                                    </label>

                                    <div className="flex flex-wrap gap-2.5">

                                        {ALL_SERVICES.map((service) => {
                                            const isSelected =
                                                formData.services.includes(service);

                                            return (
                                                <button
                                                    key={service}
                                                    type="button"
                                                    onClick={() =>
                                                        handleToggleService(service)
                                                    }
                                                    className={`
                                                        rounded-full border px-4 py-2
                                                        text-xs font-bold transition
                                                        ${
                                                            isSelected
                                                                ? "border-navy bg-navy text-white"
                                                                : "border-gray/40 bg-white text-navy hover:border-navy"
                                                        }
                                                    `}
                                                >
                                                    {service}
                                                </button>
                                            );
                                        })}

                                    </div>

                                    <p className="mt-2 text-xs text-slate">
                                        Toggle which services this staff member can perform.
                                    </p>

                                </div>

                            </div>

                            {/* Card 3 — Notes */}
                            <div className="rounded-xl border border-gray/20 bg-white p-5 shadow-sm sm:p-6 md:p-7">

                                <div className="mb-5 flex items-center gap-3">

                                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-beige">
                                        <Briefcase className="h-5 w-5 text-navy" />
                                    </div>

                                    <h2 className="font-serif text-lg font-bold text-navy sm:text-xl">
                                        Internal Notes
                                    </h2>

                                </div>

                                <div className="border-b border-gray/20" />

                                <div className="mt-5">

                                    <textarea
                                        name="notes"
                                        rows="3"
                                        value={formData.notes}
                                        onChange={handleChange}
                                        placeholder="Add any notes about this staff member..."
                                        className={`${inputClass} resize-y`}
                                    />

                                </div>

                            </div>

                            {/* Card 4 — Danger Zone */}
                            <div className="rounded-xl border border-red-200 bg-red-50/40 p-5 sm:p-6">

                                <h2 className="font-serif text-lg font-bold text-red-700">
                                    Danger Zone
                                </h2>

                                <p className="mt-1 text-sm text-slate">
                                    Removing this staff member will unassign them from all
                                    future appointments.
                                </p>

                                <button
                                    type="button"
                                    onClick={handleRemoveStaff}
                                    className="
                                        mt-4 inline-flex items-center gap-2 rounded-lg
                                        border-2 border-red-500 bg-white px-5 py-2.5
                                        text-sm font-bold text-red-600 transition
                                        hover:bg-red-500 hover:text-white
                                    "
                                >
                                    <Trash2 className="h-4 w-4" />
                                    Remove Staff Member
                                </button>

                            </div>

                            {/* Bottom Actions */}
                            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="
                                        w-full rounded-lg border border-gray bg-white
                                        px-6 py-3 text-sm font-bold text-navy
                                        transition hover:border-navy sm:w-auto
                                    "
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={!isDirty || isSubmitting}
                                    className={`
                                        flex w-full items-center justify-center gap-2
                                        rounded-lg px-6 py-3 text-sm font-bold
                                        transition sm:w-auto
                                        ${
                                            !isDirty || isSubmitting
                                                ? "cursor-not-allowed bg-gray/20 text-gray"
                                                : "bg-navy text-white hover:bg-gold hover:text-navy"
                                        }
                                    `}
                                >
                                    <Save className="h-4 w-4" />
                                    {isSubmitting ? "Saving..." : "Save Changes"}
                                </button>

                            </div>

                        </form>

                    </div>
                </main>

            </div>

        </div>
    );
}

export default EditStaff;