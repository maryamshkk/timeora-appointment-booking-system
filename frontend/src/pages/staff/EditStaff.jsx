import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    ChevronRight,
    ChevronDown,
    Save,
    Mail,
    Phone,
    Briefcase,
    IdCard,
    Trash2,
    Loader2,
    AlertCircle,
    User,
} from "lucide-react";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import {
    useStaffMember,
    useUpdateStaff,
    useDeleteStaff,
} from "../../hooks/company/useStaff";
import { useRoles } from "../../hooks/company/useRoles";
import { useServices } from "../../hooks/company/useServices";

function mapStaffToForm(member) {
    return {
        firstName: member.first_name || "",
        lastName: member.last_name || "",
        roleId: member.role_id || "",
        phone: member.phone || "",
        accountEmail: member.account_email || "",
        status: member.status || "active",
        isActive: Boolean(member.is_active),
        photoFile: null,
        photoPreviewUrl: member.photo_path || "",
        selectedServiceIds: (member.services || []).map((s) => s.id),
        bio: member.bio || "",
    };
}

function EditStaff() {
    const { staffId } = useParams();
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [formData, setFormData] = useState(null);
    const [savedSnapshot, setSavedSnapshot] = useState(null);
    const [localError, setLocalError] = useState("");

    const {
        data: staffResponse,
        isLoading,
        isError,
        error,
    } = useStaffMember(staffId);

    const { data: rolesResponse } = useRoles();
    const { data: servicesResponse } = useServices();

    const {
        mutate: updateStaff,
        isPending: isUpdating,
    } = useUpdateStaff();

    const {
        mutate: deleteStaff,
        isPending: isDeleting,
    } = useDeleteStaff();

    const staff = staffResponse?.data;
    const roles = rolesResponse?.data || [];
    const services = servicesResponse?.data || [];

    useEffect(() => {
        if (staff && !formData) {
            const initial = mapStaffToForm(staff);
            setFormData(initial);
            setSavedSnapshot(initial);
        }
    }, [staff, formData]);

    const isDirty =
        formData &&
        savedSnapshot &&
        JSON.stringify(formData) !== JSON.stringify(savedSnapshot);

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setLocalError("");
    }

    function handlePhotoChange(event) {
        const file = event.target.files[0];
        if (!file) return;

        const previewUrl = URL.createObjectURL(file);
        setFormData((prev) => ({
            ...prev,
            photoFile: file,
            photoPreviewUrl: previewUrl,
        }));
    }

    function handleToggleService(serviceId) {
        setFormData((prev) => {
            const has = prev.selectedServiceIds.includes(serviceId);
            return {
                ...prev,
                selectedServiceIds: has
                    ? prev.selectedServiceIds.filter((id) => id !== serviceId)
                    : [...prev.selectedServiceIds, serviceId],
            };
        });
    }

    function handleSubmit(event) {
        event.preventDefault();
        setLocalError("");

        if (!formData.firstName.trim() || !formData.lastName.trim()) {
            setLocalError("First and last name are required.");
            return;
        }

        if (!formData.roleId) {
            setLocalError("Please select a role.");
            return;
        }

        const form = new FormData();
        form.append("first_name", formData.firstName);
        form.append("last_name", formData.lastName);
        form.append("role_id", formData.roleId);
        form.append("phone", formData.phone);
        form.append("account_email", formData.accountEmail);
        form.append("status", formData.status);

        if (formData.photoFile) {
            form.append("photo", formData.photoFile);
        }

        if (formData.bio) {
            form.append("bio", formData.bio);
        }

        formData.selectedServiceIds.forEach((serviceId) => {
            form.append("service_ids[]", serviceId);
        });

        updateStaff({ id: staffId, formData });
    }

    function handleRemoveStaff() {
        const confirmed = window.confirm(
            "Are you sure you want to remove this staff member? This action cannot be undone."
        );

        if (!confirmed) return;

        deleteStaff(staffId, {
            onSuccess: () => navigate("/company/staff"),
        });
    }

    if (isLoading || !formData) {
        return (
            <div className="flex min-h-screen bg-beige">
                <div className="hidden lg:block lg:flex-shrink-0">
                    <Sidebar
                        companyName="Shifa Clinic"
                        activeItem="Staff"
                        ctaLabel="Add Staff"
                        ctaPath="/company/staff/add"
                    />
                </div>

                <div className="flex flex-1 items-center justify-center">
                    <div className="flex items-center gap-3 text-navy">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span className="font-serif text-sm">Loading...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex min-h-screen bg-beige">
                <div className="hidden lg:block lg:flex-shrink-0">
                    <Sidebar
                        companyName="Shifa Clinic"
                        activeItem="Staff"
                        ctaLabel="Add Staff"
                        ctaPath="/company/staff/add"
                    />
                </div>

                <div className="flex flex-1 items-center justify-center px-6">
                    <div className="flex max-w-md items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                        <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
                        <p className="text-sm text-red-700">
                            {error?.response?.data?.message ||
                                error?.message ||
                                "Failed to load staff."}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    const inputClass =
        "w-full rounded-lg border border-gray bg-white px-4 py-3 text-sm text-navy outline-none focus:border-navy";

    const labelClass =
        "mb-2 block text-xs font-bold uppercase tracking-wide text-navy";

    return (
        <div className="flex min-h-screen bg-beige">
            <div className="hidden lg:block lg:flex-shrink-0">
                <Sidebar
                    companyName="Shifa Clinic"
                    activeItem="Staff"
                    ctaLabel="Add Staff"
                    ctaPath="/company/staff/add"
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
                            activeItem="Staff"
                            ctaLabel="Add Staff"
                            ctaPath="/company/staff/add"
                        />
                    </div>
                </>
            )}

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
                                {formData.firstName} {formData.lastName}
                            </Link>

                            <ChevronRight className="h-3.5 w-3.5 text-gray" />

                            <span className="font-bold text-navy">Edit</span>
                        </div>

                        <div className="mb-6">
                            <h1 className="font-serif text-2xl text-navy sm:text-3xl lg:text-4xl">
                                Edit Staff Member
                            </h1>

                            <p className="mt-1.5 text-sm text-slate">
                                Update the staff member's profile, role, and
                                assigned services.
                            </p>
                        </div>

                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-6"
                        >
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
                                    <div>
                                        <label className={labelClass}>
                                            First Name
                                        </label>

                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            className={inputClass}
                                        />
                                    </div>

                                    <div>
                                        <label className={labelClass}>
                                            Last Name
                                        </label>

                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            className={inputClass}
                                        />
                                    </div>

                                    <div>
                                        <label className={labelClass}>
                                            Email Address
                                        </label>

                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />

                                            <input
                                                type="email"
                                                name="accountEmail"
                                                value={formData.accountEmail}
                                                onChange={handleChange}
                                                className={`${inputClass} pl-10`}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className={labelClass}>
                                            Phone Number
                                        </label>

                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />

                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className={`${inputClass} pl-10`}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className={labelClass}>
                                            Staff ID
                                        </label>

                                        <div className="relative">
                                            <IdCard className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />

                                            <input
                                                type="text"
                                                value={staff?.staff_id || ""}
                                                readOnly
                                                className={`${inputClass} pl-10 cursor-not-allowed bg-gray/5 text-slate`}
                                            />
                                        </div>

                                        <p className="mt-1.5 text-xs text-slate">
                                            Staff IDs are assigned automatically.
                                        </p>
                                    </div>

                                    <div>
                                        <label className={labelClass}>
                                            Account Status
                                        </label>

                                        <div className="relative">
                                            <select
                                                name="status"
                                                value={formData.status}
                                                onChange={handleChange}
                                                className={`${inputClass} appearance-none pr-10`}
                                            >
                                                <option value="active">Active</option>
                                                <option value="pending">Pending</option>
                                                <option value="deactivated">
                                                    Deactivated
                                                </option>
                                            </select>

                                            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />
                                        </div>
                                    </div>
                                </div>
                            </div>

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

                                <div className="mt-5">
                                    <label className={labelClass}>Role</label>

                                    <div className="relative">
                                        <select
                                            name="roleId"
                                            value={formData.roleId}
                                            onChange={handleChange}
                                            className={`${inputClass} appearance-none pr-10`}
                                        >
                                            <option value="">Select a role</option>
                                            {roles.map((role) => (
                                                <option key={role.id} value={role.id}>
                                                    {role.name}
                                                </option>
                                            ))}
                                        </select>

                                        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <label className={labelClass}>
                                        Assigned Services
                                    </label>

                                    <div className="flex flex-wrap gap-2.5">
                                        {services.map((service) => {
                                            const isSelected =
                                                formData.selectedServiceIds.includes(
                                                    service.id
                                                );

                                            return (
                                                <button
                                                    key={service.id}
                                                    type="button"
                                                    onClick={() =>
                                                        handleToggleService(service.id)
                                                    }
                                                    className={`rounded-full border px-4 py-2 text-xs font-bold transition ${
                                                        isSelected
                                                            ? "border-navy bg-navy text-white"
                                                            : "border-gray/40 bg-white text-navy hover:border-navy"
                                                    }`}
                                                >
                                                    {service.name}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <p className="mt-2 text-xs text-slate">
                                        Toggle which services this staff member can
                                        perform.
                                    </p>
                                </div>

                                <div className="mt-6">
                                    <label className={labelClass}>Bio</label>

                                    <textarea
                                        name="bio"
                                        rows="3"
                                        value={formData.bio}
                                        onChange={handleChange}
                                        placeholder="Short bio about this staff member..."
                                        className={`${inputClass} resize-y`}
                                    />
                                </div>
                            </div>

                            <div className="rounded-xl border border-red-200 bg-red-50/40 p-5 sm:p-6">
                                <h2 className="font-serif text-lg font-bold text-red-700">
                                    Danger Zone
                                </h2>

                                <p className="mt-1 text-sm text-slate">
                                    Removing this staff member will unassign them
                                    from all future appointments.
                                </p>

                                <button
                                    type="button"
                                    onClick={handleRemoveStaff}
                                    disabled={isDeleting}
                                    className="mt-4 inline-flex items-center gap-2 rounded-lg border-2 border-red-500 bg-white px-5 py-2.5 text-sm font-bold text-red-600 transition hover:bg-red-500 hover:text-white disabled:opacity-50"
                                >
                                    <Trash2 className="h-4 w-4" />
                                    {isDeleting ? "Removing..." : "Remove Staff Member"}
                                </button>
                            </div>

                            {localError && (
                                <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                                    <p className="text-sm text-red-700">
                                        {localError}
                                    </p>
                                </div>
                            )}

                            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                                <button
                                    type="button"
                                    onClick={() =>
                                        navigate(`/company/staff/${staffId}`)
                                    }
                                    className="w-full rounded-lg border border-gray bg-white px-6 py-3 text-sm font-bold text-navy transition hover:border-navy sm:w-auto"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={!isDirty || isUpdating}
                                    className={`flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-bold transition sm:w-auto ${
                                        !isDirty || isUpdating
                                            ? "cursor-not-allowed bg-gray/20 text-gray"
                                            : "bg-navy text-white hover:bg-gold hover:text-navy"
                                    }`}
                                >
                                    <Save className="h-4 w-4" />
                                    {isUpdating ? "Saving..." : "Save Changes"}
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