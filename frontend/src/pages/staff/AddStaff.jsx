import React, { useMemo, useRef, useState } from "react";
import {
    ChevronRight,
    ChevronDown,
    User,
    Phone,
    Mail,
    UserCircle,
    Plus,
    Loader2,
    AlertCircle,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import { useRoles, useCreateRole } from "../../hooks/company/useRoles";
import { useServices } from "../../hooks/company/useServices";
import { useCreateStaff } from "../../hooks/company/useStaff";

const DAYS = [
    { value: 1, label: "Monday" },
    { value: 2, label: "Tuesday" },
    { value: 3, label: "Wednesday" },
    { value: 4, label: "Thursday" },
    { value: 5, label: "Friday" },
    { value: 6, label: "Saturday" },
    { value: 0, label: "Sunday" },
];

function buildDefaultAvailability() {
    return DAYS.map((day) => ({
        day_of_week: day.value,
        is_working: day.value >= 1 && day.value <= 5,
        start_time: day.value >= 1 && day.value <= 5 ? "09:00" : null,
        end_time: day.value >= 1 && day.value <= 5 ? "17:00" : null,
        break_start: null,
        break_end: null,
    }));
}

function AddStaff() {
    const photoInputRef = useRef(null);
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [localError, setLocalError] = useState("");
    const [isAddingRole, setIsAddingRole] = useState(false);
    const [newRoleName, setNewRoleName] = useState("");

    const [formData, setFormData] = useState({
        photoFile: null,
        photoPreviewUrl: "",
        firstName: "",
        lastName: "",
        roleId: "",
        phone: "",
        accountEmail: "",
        selectedServiceIds: [],
        availability: buildDefaultAvailability(),
    });

    const {
        data: rolesResponse,
        isLoading: rolesLoading,
    } = useRoles();

    const {
        data: servicesResponse,
        isLoading: servicesLoading,
    } = useServices();

    const { mutate: createStaff, isPending, error } = useCreateStaff();
    const {
        mutate: createRole,
        isPending: isCreatingRole,
    } = useCreateRole();

    const roles = rolesResponse?.data || [];
    const services = servicesResponse?.data || [];

    const hasWorkingDay = useMemo(
        () => formData.availability.some((d) => d.is_working),
        [formData.availability]
    );

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

    function handleServiceToggle(serviceId) {
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

    function updateAvailability(dayOfWeek, field, value) {
        setFormData((prev) => ({
            ...prev,
            availability: prev.availability.map((day) =>
                day.day_of_week === dayOfWeek
                    ? { ...day, [field]: value }
                    : day
            ),
        }));
    }

    function toggleAvailabilityDay(dayOfWeek) {
        setFormData((prev) => ({
            ...prev,
            availability: prev.availability.map((day) =>
                day.day_of_week === dayOfWeek
                    ? {
                          ...day,
                          is_working: !day.is_working,
                          start_time: !day.is_working ? "09:00" : null,
                          end_time: !day.is_working ? "17:00" : null,
                          break_start: null,
                          break_end: null,
                      }
                    : day
            ),
        }));
    }

    function handleAddRole() {
        const name = newRoleName.trim();
        if (!name) return;

        createRole(name, {
            onSuccess: () => {
                setNewRoleName("");
                setIsAddingRole(false);
            },
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

        if (!formData.phone.trim()) {
            setLocalError("Phone number is required.");
            return;
        }

        if (!formData.accountEmail.trim()) {
            setLocalError("Account email is required.");
            return;
        }

        const form = new FormData();
        form.append("first_name", formData.firstName);
        form.append("last_name", formData.lastName);
        form.append("role_id", formData.roleId);
        form.append("phone", formData.phone);
        form.append("account_email", formData.accountEmail);

        if (formData.photoFile) {
            form.append("photo", formData.photoFile);
        }

        formData.selectedServiceIds.forEach((serviceId) => {
            form.append("service_ids[]", serviceId);
        });

        formData.availability.forEach((day, index) => {
            form.append(`availability[${index}][day_of_week]`, day.day_of_week);
            form.append(
                `availability[${index}][is_working]`,
                day.is_working ? "1" : "0"
            );

            if (day.is_working) {
                form.append(`availability[${index}][start_time]`, day.start_time);
                form.append(`availability[${index}][end_time]`, day.end_time);
                if (day.break_start) {
                    form.append(`availability[${index}][break_start]`, day.break_start);
                }
                if (day.break_end) {
                    form.append(`availability[${index}][break_end]`, day.break_end);
                }
            }
        });

        createStaff(form);
    }

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
                    activeItem="Staff"
                    ctaLabel="Add Staff"
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
                        />
                    </div>
                </>
            )}

            <div className="flex min-w-0 flex-1 flex-col">
                <Topbar
                    onMenuClick={() => setSidebarOpen(true)}
                    showBell
                    hasNotification
                    showHelp
                    searchPlaceholder="Search..."
                />

                <main className="flex-1 bg-beige px-3 py-4 sm:px-4 sm:py-5 md:px-6 lg:px-8 lg:py-6">
                    <div className="mb-2 flex items-center gap-2 text-sm">
                        <Link
                            to="/company/staff"
                            className="text-slate transition hover:text-navy"
                        >
                            Staff
                        </Link>

                        <ChevronRight className="h-3.5 w-3.5 text-gray" />

                        <span className="font-bold text-navy">Add Staff</span>
                    </div>

                    <div className="mb-4 sm:mb-6 md:mb-8">
                        <h1 className="font-serif text-2xl text-navy sm:text-3xl md:text-4xl">
                            Add Staff
                        </h1>

                        <p className="mt-1 text-xs text-slate sm:mt-1.5 sm:text-sm">
                            Add a staff member to your company and assign their
                            role and availability.
                        </p>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="mx-auto w-full max-w-[760px] rounded-xl border border-gray/20 bg-white p-4 shadow-sm sm:p-6 md:p-10"
                    >
                        <section className="mb-6 sm:mb-8">
                            <h2 className="mb-1 font-serif text-lg text-navy sm:text-xl">
                                Personal Information
                            </h2>

                            <div className="mb-4 border-b border-gray/20 sm:mb-5" />

                            <div className="flex flex-col gap-4 sm:gap-6 md:flex-row md:items-start">
                                <div className="flex flex-col items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => photoInputRef.current.click()}
                                        className="flex h-20 w-20 cursor-pointer items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray bg-beige/30 transition hover:border-navy sm:h-24 sm:w-24"
                                    >
                                        {formData.photoPreviewUrl ? (
                                            <img
                                                src={formData.photoPreviewUrl}
                                                alt="Staff preview"
                                                className="h-full w-full rounded-lg object-cover"
                                            />
                                        ) : (
                                            <User className="h-6 w-6 text-gray sm:h-7 sm:w-7" />
                                        )}
                                    </button>

                                    <input
                                        ref={photoInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handlePhotoChange}
                                        className="hidden"
                                    />

                                    <span className="text-[10px] font-bold uppercase tracking-wide text-navy sm:text-xs">
                                        Upload Photo
                                    </span>
                                </div>

                                <div className="grid flex-1 grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
                                    <div>
                                        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-navy">
                                            First Name
                                        </label>

                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            placeholder="Enter first name"
                                            required
                                            className="w-full rounded-lg border border-gray px-3 py-2.5 text-sm text-navy outline-none transition focus:border-navy focus:ring-2 focus:ring-gold sm:px-4"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-navy">
                                            Last Name
                                        </label>

                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            placeholder="Enter last name"
                                            required
                                            className="w-full rounded-lg border border-gray px-3 py-2.5 text-sm text-navy outline-none transition focus:border-navy focus:ring-2 focus:ring-gold sm:px-4"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="mb-6 sm:mb-8">
                            <h2 className="mb-1 font-serif text-lg text-navy sm:text-xl">
                                Professional Information
                            </h2>

                            <div className="mb-4 border-b border-gray/20 sm:mb-5" />

                            <div>
                                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-navy">
                                    Role
                                </label>

                                <div className="relative">
                                    <select
                                        name="roleId"
                                        value={formData.roleId}
                                        onChange={handleChange}
                                        required
                                        disabled={rolesLoading}
                                        className="w-full appearance-none rounded-lg border border-gray px-3 py-2.5 pr-10 text-sm text-navy outline-none transition focus:border-navy focus:ring-2 focus:ring-gold disabled:opacity-60 sm:px-4"
                                    >
                                        <option value="">
                                            {rolesLoading
                                                ? "Loading roles..."
                                                : roles.length
                                                ? "Select a role"
                                                : "No roles available"}
                                        </option>

                                        {roles.map((role) => (
                                            <option key={role.id} value={role.id}>
                                                {role.name}
                                            </option>
                                        ))}
                                    </select>

                                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />
                                </div>

                                {!rolesLoading && roles.length === 0 && !isAddingRole && (
                                    <button
                                        type="button"
                                        onClick={() => setIsAddingRole(true)}
                                        className="mt-2 flex items-center gap-1 text-xs font-bold text-navy hover:underline"
                                    >
                                        <Plus className="h-3 w-3" />
                                        Add a new role
                                    </button>
                                )}

                                {isAddingRole && (
                                    <div className="mt-3 flex items-center gap-2">
                                        <input
                                            type="text"
                                            value={newRoleName}
                                            onChange={(event) =>
                                                setNewRoleName(event.target.value)
                                            }
                                            placeholder="Role name"
                                            className="flex-1 rounded-lg border border-gray px-3 py-2 text-sm text-navy outline-none focus:border-navy"
                                        />

                                        <button
                                            type="button"
                                            onClick={handleAddRole}
                                            disabled={isCreatingRole}
                                            className="rounded-lg bg-navy px-4 py-2 text-sm font-bold text-white disabled:opacity-50"
                                        >
                                            {isCreatingRole ? "Adding..." : "Add"}
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => {
                                                setIsAddingRole(false);
                                                setNewRoleName("");
                                            }}
                                            className="rounded-lg border border-gray px-4 py-2 text-sm text-slate"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="mt-4 sm:mt-5">
                                <label className="mb-2.5 block text-xs font-bold uppercase tracking-wide text-navy">
                                    Services (Multi-Select)
                                </label>

                                <div className="grid grid-cols-1 gap-x-6 gap-y-3 rounded-lg border border-gray/20 bg-beige/30 p-3 sm:grid-cols-2 sm:p-4">
                                    {servicesLoading ? (
                                        <div className="flex items-center gap-2 py-2 text-xs text-slate">
                                            <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                            Loading services...
                                        </div>
                                    ) : services.length > 0 ? (
                                        services.map((service) => {
                                            const isSelected =
                                                formData.selectedServiceIds.includes(
                                                    service.id
                                                );

                                            return (
                                                <label
                                                    key={service.id}
                                                    className="flex cursor-pointer items-center gap-2.5"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={isSelected}
                                                        onChange={() =>
                                                            handleServiceToggle(
                                                                service.id
                                                            )
                                                        }
                                                        className="h-5 w-5 cursor-pointer accent-navy"
                                                    />

                                                    <span className="text-sm text-navy">
                                                        {service.name}
                                                    </span>
                                                </label>
                                            );
                                        })
                                    ) : (
                                        <p className="text-xs text-slate">
                                            No services available. Add services first.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </section>

                        <section className="mb-6 sm:mb-8">
                            <h2 className="mb-1 font-serif text-lg text-navy sm:text-xl">
                                Contact Information
                            </h2>

                            <div className="mb-4 border-b border-gray/20 sm:mb-5" />

                            <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2">
                                <div>
                                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-navy">
                                        Phone Number
                                    </label>

                                    <div className="relative">
                                        <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />

                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+92 300 1234567"
                                            required
                                            className="w-full rounded-lg border border-gray px-3 py-2.5 pl-10 text-sm text-navy outline-none transition focus:border-navy focus:ring-2 focus:ring-gold sm:px-4 sm:pl-10"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-navy">
                                        Account Email
                                    </label>

                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />

                                        <input
                                            type="email"
                                            name="accountEmail"
                                            value={formData.accountEmail}
                                            onChange={handleChange}
                                            placeholder="staff@example.com"
                                            required
                                            className="w-full rounded-lg border border-gray px-3 py-2.5 pl-10 text-sm text-navy outline-none transition focus:border-navy focus:ring-2 focus:ring-gold sm:px-4 sm:pl-10"
                                        />
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="mb-6 sm:mb-8">
                            <h2 className="mb-1 font-serif text-lg text-navy sm:text-xl">
                                Availability
                            </h2>

                            <div className="mb-4 border-b border-gray/20 sm:mb-5" />

                            <div className="space-y-3">
                                {DAYS.map((day) => {
                                    const dayData = formData.availability.find(
                                        (d) => d.day_of_week === day.value
                                    );

                                    return (
                                        <div
                                            key={day.value}
                                            className="flex flex-wrap items-center gap-3 rounded-lg border border-gray/20 bg-beige/20 px-3 py-3 sm:px-4"
                                        >
                                            <label className="flex min-w-[120px] flex-1 cursor-pointer items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    checked={dayData.is_working}
                                                    onChange={() =>
                                                        toggleAvailabilityDay(
                                                            day.value
                                                        )
                                                    }
                                                    className="h-4 w-4 cursor-pointer accent-navy"
                                                />

                                                <span className="text-sm font-bold text-navy">
                                                    {day.label}
                                                </span>
                                            </label>

                                            {dayData.is_working ? (
                                                <div className="flex flex-wrap items-center gap-2">
                                                    <input
                                                        type="time"
                                                        value={dayData.start_time || ""}
                                                        onChange={(event) =>
                                                            updateAvailability(
                                                                day.value,
                                                                "start_time",
                                                                event.target.value
                                                            )
                                                        }
                                                        className="rounded-md border border-gray px-2 py-1.5 text-sm text-navy outline-none focus:border-navy"
                                                    />

                                                    <span className="text-gray">–</span>

                                                    <input
                                                        type="time"
                                                        value={dayData.end_time || ""}
                                                        onChange={(event) =>
                                                            updateAvailability(
                                                                day.value,
                                                                "end_time",
                                                                event.target.value
                                                            )
                                                        }
                                                        className="rounded-md border border-gray px-2 py-1.5 text-sm text-navy outline-none focus:border-navy"
                                                    />
                                                </div>
                                            ) : (
                                                <span className="text-sm italic text-gray">
                                                    Not working
                                                </span>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                            {!hasWorkingDay && (
                                <p className="mt-2 text-xs font-bold text-red-600">
                                    Select at least one working day.
                                </p>
                            )}
                        </section>

                        {displayError && (
                            <div className="mb-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                                <p className="text-sm text-red-700">
                                    {displayError}
                                </p>
                            </div>
                        )}

                        <div className="flex flex-col-reverse gap-3 border-t border-gray/20 pt-5 sm:flex-row sm:justify-end sm:pt-6">
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="w-full rounded-lg border border-gray/30 px-6 py-3 text-sm font-bold text-navy transition hover:bg-beige sm:w-auto"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                disabled={isPending || !hasWorkingDay}
                                className="flex w-full items-center justify-center gap-2 rounded-lg bg-navy px-6 py-3 text-sm font-bold text-white transition hover:bg-gold hover:text-navy disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Creating...
                                    </>
                                ) : (
                                    "Create Staff"
                                )}
                            </button>
                        </div>
                    </form>
                </main>
            </div>
        </div>
    );
}

export default AddStaff;