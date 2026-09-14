import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    ChevronRight,
    ChevronDown,
    Save,
    User,
    Mail,
    Phone,
    Calendar,
    IdCard,
} from "lucide-react";

import StaffSidebar from "../../components/staff/StaffSidebar";
import StaffTopbar from "../../components/staff/StaffTopbar";

const mockCustomerData = {
    id: "CUS-20260819-1024",
    name: "Hina Malik",
    email: "hina@example.com",
    phone: "+92 300 1234567",
    gender: "female",
    dateOfBirth: "1994-06-15",
    since: "August 2026",
    address: "House 12, Block C, Gulberg III, Lahore",
    city: "Lahore",
    notes: "Prefers morning appointments.",
};

function StaffEditCustomer() {
    const { customerId } = useParams();
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);

    /* TODO: Replace seed with axios GET /api/staff/customers/:customerId */
    const [formData, setFormData] = useState(mockCustomerData);

    const [savedSnapshot, setSavedSnapshot] = useState(mockCustomerData);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});

    const currentStaff = {
        name: "Dr. Sara Ahmed",
        role: "Senior Physician",
        avatarUrl: "",
        companyName: "Shifa Clinic",
    };

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

    function validate() {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = "Name is required.";
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required.";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        ) {
            newErrors.email = "Enter a valid email address.";
        }

        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required.";
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
            // TODO: axios PUT /api/staff/customers/:customerId with formData
            // await api.put(`/staff/customers/${customerId}`, formData);

            setSavedSnapshot(formData);
            navigate(`/staff/customers/${customerId}`);
        } finally {
            setIsSubmitting(false);
        }
    }

    function handleCancel() {
        navigate(`/staff/customers/${customerId}`);
    }

    function handleSignOut() {
        navigate("/login");
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

            {/* Sidebar — desktop always visible, mobile slide-in drawer */}
            <StaffSidebar
                companyName={currentStaff.companyName}
                currentStaff={currentStaff}
                activeItem="Customers"
                handleSignOut={handleSignOut}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            {/* Main Area */}
            <div className="flex min-w-0 flex-1 flex-col">

                <StaffTopbar
                    avatarUrl={currentStaff.avatarUrl}
                    onMenuClick={() => setSidebarOpen(true)}
                    onSearchClick={() => {}}
                    onNotificationsClick={() =>
                        navigate("/staff/notifications")
                    }
                    onSettingsClick={() => navigate("/staff/settings")}
                />

                <main className="flex-1 bg-beige px-4 py-6 sm:px-6 md:px-8">
                    <div className="mx-auto w-full max-w-4xl">

                        {/* Breadcrumb */}
                        <div className="mb-4 flex flex-wrap items-center gap-2">

                            <Link
                                to="/staff/customers"
                                className="text-sm text-slate transition hover:text-navy"
                            >
                                Customers
                            </Link>

                            <ChevronRight className="h-3 w-3 text-gray" />

                            <Link
                                to={`/staff/customers/${customerId}`}
                                className="text-sm text-slate transition hover:text-navy"
                            >
                                {formData.name}
                            </Link>

                            <ChevronRight className="h-3 w-3 text-gray" />

                            <span className="text-sm font-bold text-navy">
                                Edit
                            </span>

                        </div>

                        {/* Header */}
                        <div className="mb-6">
                            <h1 className="font-serif text-2xl text-navy sm:text-3xl lg:text-4xl">
                                Edit Customer
                            </h1>

                            <p className="mt-1.5 text-sm text-slate">
                                Update the customer's information and contact details.
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
                                            placeholder="Customer name"
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

                                    {/* Gender */}
                                    <div>
                                        <label htmlFor="gender" className={labelClass}>
                                            Gender
                                        </label>

                                        <div className="relative">

                                            <select
                                                id="gender"
                                                name="gender"
                                                value={formData.gender}
                                                onChange={handleChange}
                                                className={`
                                                    ${inputClass}
                                                    appearance-none pr-10
                                                `}
                                            >
                                                <option value="">Select</option>
                                                <option value="female">Female</option>
                                                <option value="male">Male</option>
                                                <option value="other">Other</option>
                                                <option value="prefer-not-to-say">
                                                    Prefer not to say
                                                </option>
                                            </select>

                                            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />

                                        </div>
                                    </div>

                                    {/* Date of Birth */}
                                    <div>
                                        <label
                                            htmlFor="dateOfBirth"
                                            className={labelClass}
                                        >
                                            Date of Birth
                                        </label>

                                        <div className="relative">

                                            <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />

                                            <input
                                                id="dateOfBirth"
                                                type="date"
                                                name="dateOfBirth"
                                                value={formData.dateOfBirth}
                                                onChange={handleChange}
                                                className={`${inputClass} pl-10`}
                                            />

                                        </div>
                                    </div>

                                </div>

                            </div>

                            {/* Card 2 — Address */}
                            <div className="rounded-xl border border-gray/20 bg-white p-5 shadow-sm sm:p-6 md:p-7">

                                <div className="mb-5 flex items-center gap-3">

                                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-beige">
                                        <IdCard className="h-5 w-5 text-navy" />
                                    </div>

                                    <h2 className="font-serif text-lg font-bold text-navy sm:text-xl">
                                        Address
                                    </h2>

                                </div>

                                <div className="border-b border-gray/20" />

                                <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">

                                    {/* Street Address */}
                                    <div className="md:col-span-2">
                                        <label
                                            htmlFor="address"
                                            className={labelClass}
                                        >
                                            Street Address
                                        </label>

                                        <input
                                            id="address"
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            placeholder="House, street, area"
                                            className={inputClass}
                                        />
                                    </div>

                                    {/* City */}
                                    <div>
                                        <label htmlFor="city" className={labelClass}>
                                            City
                                        </label>

                                        <input
                                            id="city"
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleChange}
                                            placeholder="City"
                                            className={inputClass}
                                        />
                                    </div>

                                </div>

                            </div>

                            {/* Card 3 — Notes */}
                            <div className="rounded-xl border border-gray/20 bg-white p-5 shadow-sm sm:p-6 md:p-7">

                                <div className="mb-5 flex items-center gap-3">

                                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-beige">
                                        <Calendar className="h-5 w-5 text-navy" />
                                    </div>

                                    <h2 className="font-serif text-lg font-bold text-navy sm:text-xl">
                                        Notes
                                    </h2>

                                </div>

                                <div className="border-b border-gray/20" />

                                <div className="mt-5">

                                    <label htmlFor="notes" className={labelClass}>
                                        Customer Notes
                                    </label>

                                    <textarea
                                        id="notes"
                                        name="notes"
                                        rows="3"
                                        value={formData.notes}
                                        onChange={handleChange}
                                        placeholder="Any special notes about this customer..."
                                        className={`${inputClass} resize-y`}
                                    />

                                </div>

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

export default StaffEditCustomer;