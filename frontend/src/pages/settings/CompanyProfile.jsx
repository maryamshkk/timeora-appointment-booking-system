import React, { useEffect, useRef, useState } from "react";
import {
    AlertCircle,
    ChevronDown,
    ChevronRight,
    Image,
    Loader2,
    Upload,
    X,
} from "lucide-react";
import { Link } from "react-router-dom";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import SettingsNav from "../../components/settings/SettingsNav";
import {
    useCompanyProfile,
    useUpdateCompanyProfile,
} from "../../hooks/company/useCompanyProfile";

function CompanyProfile() {
    const fileInputRef = useRef(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const {
        data: profileResponse,
        isLoading,
        isError,
        error,
    } = useCompanyProfile();

    const {
        mutate: updateProfile,
        isPending: isSaving,
        error: saveError,
        isSuccess: isSaved,
    } = useUpdateCompanyProfile();

    const company = profileResponse?.data?.company;

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        email: "",
        phone: "",
        website: "",
        address: "",
        city: "",
        country: "",
        timezone: "",
        logoFile: null,
        logoPreviewUrl: "",
    });

    const [savedSnapshot, setSavedSnapshot] = useState(null);

    useEffect(() => {
        if (!company) return;

        const next = {
            name: company.name || "",
            description: company.description || "",
            email: company.email || "",
            phone: company.phone || "",
            website: company.website || "",
            address: company.address || "",
            city: company.city || "",
            country: company.country || "",
            timezone: company.timezone || "",
            logoFile: null,
            logoPreviewUrl: company.logo_path
                ? `/storage/${company.logo_path}`
                : "",
        };

        setFormData(next);
        setSavedSnapshot(next);
    }, [company]);

    const isDirty =
        savedSnapshot &&
        JSON.stringify({ ...formData, logoFile: null }) !==
            JSON.stringify({ ...savedSnapshot, logoFile: null });

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    function handleLogoChange(event) {
        const file = event.target.files[0];
        if (!file) return;

        const previewUrl = URL.createObjectURL(file);
        setFormData((prev) => ({
            ...prev,
            logoFile: file,
            logoPreviewUrl: previewUrl,
        }));
    }

    function handleLogoRemove() {
        setFormData((prev) => ({
            ...prev,
            logoFile: null,
            logoPreviewUrl: "",
        }));

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }

    function handleSave(event) {
        if (event) event.preventDefault();

        const payload = new FormData();

        payload.append("name", formData.name);
        payload.append("description", formData.description);
        payload.append("email", formData.email);
        payload.append("phone", formData.phone);
        payload.append("website", formData.website);
        payload.append("address", formData.address);
        payload.append("city", formData.city);
        payload.append("country", formData.country);
        payload.append("timezone", formData.timezone);

        if (formData.logoFile) {
            payload.append("logo", formData.logoFile);
        }

        updateProfile(payload, {
            onSuccess: () => {
                setSavedSnapshot({ ...formData });
            },
        });
    }

    function handleCancel() {
        if (savedSnapshot) {
            setFormData({ ...savedSnapshot });
        }

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }

    const descriptionCharCount = formData.description.length;

    const inputClass = `
        w-full
        border
        border-gray
        rounded-lg
        px-4
        py-3
        text-sm
        text-navy
        bg-white
        outline-none
        focus:border-navy
        focus:ring-2
        focus:ring-gold
    `;

    if (isLoading) {
        return (
            <div className="flex min-h-screen bg-beige">
                <div className="hidden lg:block lg:flex-shrink-0">
                    <Sidebar activeItem="Settings" />
                </div>

                <div className="flex flex-1 items-center justify-center">
                    <div className="flex items-center gap-3 text-navy">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span className="font-serif text-sm">
                            Loading company profile...
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex min-h-screen bg-beige">
                <div className="hidden lg:block lg:flex-shrink-0">
                    <Sidebar activeItem="Settings" />
                </div>

                <div className="flex flex-1 items-center justify-center px-6">
                    <div className="flex max-w-md items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                        <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
                        <p className="text-sm text-red-700">
                            {error?.response?.data?.message ||
                                error?.message ||
                                "Failed to load company profile."}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    const apiError =
        saveError?.response?.data?.message || saveError?.message || "";

    return (
        <div className="min-h-screen flex bg-beige">
            <div className="hidden lg:block lg:flex-shrink-0">
                <Sidebar activeItem="Settings" />
            </div>

            {sidebarOpen && (
                <>
                    <button
                        type="button"
                        onClick={() => setSidebarOpen(false)}
                        className="fixed inset-0 z-30 bg-navy/50 lg:hidden"
                        aria-label="Close menu"
                    />

                    <div className="fixed left-0 top-0 z-40 h-screen w-64 max-w-[80vw] overflow-y-auto lg:hidden">
                        <Sidebar activeItem="Settings" />
                    </div>
                </>
            )}

            <div className="flex min-w-0 flex-1 flex-col">
                <Topbar
                    onMenuClick={() => setSidebarOpen(true)}
                    showBell
                    simpleProfileIcon
                    searchPlaceholder="Search settings..."
                />

                <main className="flex-1 bg-beige px-4 py-5 sm:px-6 md:px-8 md:py-6">
                    <div className="flex flex-wrap items-center gap-2 mb-6">
                        <Link
                            to="/company/settings"
                            className="text-sm text-slate hover:text-navy transition"
                        >
                            Settings
                        </Link>

                        <ChevronRight className="w-3 h-3 text-gray" />

                        <span className="text-sm font-bold text-navy">
                            Company Profile
                        </span>
                    </div>

                    <div className="flex flex-col gap-5 mb-8 md:flex-row md:items-start md:justify-between">
                        <div>
                            <h1 className="font-serif text-2xl text-navy sm:text-3xl md:text-4xl">
                                Company Profile
                            </h1>

                            <p className="text-sm text-slate mt-1.5">
                                Manage the information customers see about your business.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={handleSave}
                            disabled={isSaving || !isDirty}
                            className="
                                bg-navy
                                text-white
                                px-6
                                py-3
                                rounded-lg
                                font-bold
                                text-sm
                                hover:bg-gold
                                hover:text-navy
                                transition
                                w-full
                                md:w-auto
                                disabled:opacity-50
                                disabled:cursor-not-allowed
                            "
                        >
                            {isSaving ? "Saving..." : "Save Changes"}
                        </button>
                    </div>

                    {apiError && (
                        <div className="mb-6 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 max-w-2xl">
                            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                            <p className="text-sm text-red-700">{apiError}</p>
                        </div>
                    )}

                    {isSaved && !isDirty && (
                        <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 max-w-2xl">
                            <p className="text-sm text-green-700">
                                Company profile updated successfully.
                            </p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_280px] gap-6">
                        <div>
                            <SettingsNav activeSection="profile" />
                        </div>

                        <div className="min-w-0 max-w-2xl w-full">
                            <form
                                onSubmit={handleSave}
                                className="flex flex-col gap-6"
                            >
                                <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-5 sm:p-6 md:p-7">
                                    <h2 className="font-serif text-xl text-navy sm:text-2xl">
                                        Basic Information
                                    </h2>

                                    <div className="border-b border-gray/20 mt-4 mb-5" />

                                    <div className="flex flex-col sm:flex-row items-start gap-5 mb-5">
                                        <div className="w-24 h-20 bg-gray/10 border border-gray/20 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0">
                                            {formData.logoPreviewUrl ? (
                                                <img
                                                    src={formData.logoPreviewUrl}
                                                    alt="Company logo"
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <Image className="w-7 h-7 text-gray" />
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <p className="text-xs font-bold uppercase tracking-wide text-navy mb-1.5">
                                                Company Logo
                                            </p>

                                            <p className="text-sm text-slate leading-relaxed mb-3">
                                                This logo will appear on your public booking page and customer communications. Recommended size: 512x512px.
                                            </p>

                                            <div className="flex flex-wrap items-center gap-4">
                                                <input
                                                    ref={fileInputRef}
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleLogoChange}
                                                    className="hidden"
                                                />

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        fileInputRef.current?.click()
                                                    }
                                                    className="
                                                        flex
                                                        items-center
                                                        gap-2
                                                        bg-white
                                                        border-2
                                                        border-navy
                                                        text-navy
                                                        px-4
                                                        py-2
                                                        rounded-lg
                                                        text-sm
                                                        font-bold
                                                        hover:bg-navy
                                                        hover:text-white
                                                        transition
                                                    "
                                                >
                                                    <Upload className="w-4 h-4" />
                                                    Change Logo
                                                </button>

                                                {formData.logoPreviewUrl && (
                                                    <button
                                                        type="button"
                                                        onClick={handleLogoRemove}
                                                        className="
                                                            flex
                                                            items-center
                                                            gap-1
                                                            text-sm
                                                            font-bold
                                                            text-red-600
                                                            hover:underline
                                                        "
                                                    >
                                                        <X className="w-3.5 h-3.5" />
                                                        Remove
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-b border-gray/20 my-5" />

                                    <div className="mb-5">
                                        <label className="block text-xs font-bold uppercase tracking-wide text-navy mb-2">
                                            Company Name
                                        </label>

                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className={inputClass}
                                        />
                                    </div>

                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <label className="text-xs font-bold uppercase tracking-wide text-navy">
                                                Business Description
                                            </label>

                                            <span className="text-xs text-gray">
                                                {descriptionCharCount} / 500
                                            </span>
                                        </div>

                                        <textarea
                                            name="description"
                                            rows="3"
                                            maxLength={500}
                                            value={formData.description}
                                            onChange={handleChange}
                                            className={`${inputClass} resize-y`}
                                        />
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-5 sm:p-6 md:p-7">
                                    <h2 className="font-serif text-xl text-navy sm:text-2xl">
                                        Contact Information
                                    </h2>

                                    <div className="border-b border-gray/20 mt-4 mb-5" />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wide text-navy mb-2">
                                                Business Email
                                            </label>

                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className={inputClass}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wide text-navy mb-2">
                                                Business Phone
                                            </label>

                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className={inputClass}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-wide text-navy mb-2">
                                            Website
                                        </label>

                                        <input
                                            type="url"
                                            name="website"
                                            value={formData.website}
                                            onChange={handleChange}
                                            placeholder="www.yourcompany.example"
                                            className={inputClass}
                                        />
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-5 sm:p-6 md:p-7">
                                    <h2 className="font-serif text-xl text-navy sm:text-2xl">
                                        Business Address
                                    </h2>

                                    <div className="border-b border-gray/20 mt-4 mb-5" />

                                    <div className="mb-5">
                                        <label className="block text-xs font-bold uppercase tracking-wide text-navy mb-2">
                                            Address
                                        </label>

                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            className={inputClass}
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wide text-navy mb-2">
                                                City
                                            </label>

                                            <input
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleChange}
                                                className={inputClass}
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wide text-navy mb-2">
                                                Country
                                            </label>

                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    name="country"
                                                    value={formData.country}
                                                    onChange={handleChange}
                                                    className={inputClass}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-t border-gray/20 pt-5 flex flex-col-reverse sm:flex-row sm:justify-end gap-3">
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        disabled={!isDirty || isSaving}
                                        className="
                                            w-full
                                            sm:w-auto
                                            bg-white
                                            border
                                            border-gray
                                            text-navy
                                            px-6
                                            py-2.5
                                            rounded-lg
                                            font-bold
                                            text-sm
                                            hover:border-navy
                                            transition
                                            disabled:opacity-50
                                        "
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        disabled={!isDirty || isSaving}
                                        className="
                                            w-full
                                            sm:w-auto
                                            bg-navy
                                            text-white
                                            px-6
                                            py-2.5
                                            rounded-lg
                                            font-bold
                                            text-sm
                                            hover:bg-gold
                                            hover:text-navy
                                            transition
                                            disabled:opacity-50
                                            disabled:cursor-not-allowed
                                        "
                                    >
                                        {isSaving ? "Saving..." : "Save Changes"}
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="flex flex-col gap-6">
                            <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6 text-center">
                                <div className="relative w-16 h-16 mx-auto mb-3">
                                    <div className="w-16 h-16 rounded-lg bg-gray/10 border border-gray/20 overflow-hidden flex items-center justify-center">
                                        {formData.logoPreviewUrl ? (
                                            <img
                                                src={formData.logoPreviewUrl}
                                                alt="Company logo"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <span className="font-serif text-xl text-navy">
                                                {formData.name
                                                    .charAt(0)
                                                    .toUpperCase() || "C"}
                                            </span>
                                        )}
                                    </div>

                                    <div className="absolute -right-1 -bottom-1 w-5 h-5 rounded-full bg-gold border-2 border-white flex items-center justify-center">
                                        <span className="text-[10px] font-bold text-navy">
                                            ✓
                                        </span>
                                    </div>
                                </div>

                                <h2 className="font-serif text-2xl text-navy break-words">
                                    {formData.name || "Company Name"}
                                </h2>

                                <p className="text-sm text-slate mt-1">
                                    Company
                                </p>

                                <span className="inline-flex items-center gap-2 mt-3 bg-green-50 text-green-700 text-xs font-bold uppercase px-3 py-1.5 rounded-full">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                    Active
                                </span>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default CompanyProfile;