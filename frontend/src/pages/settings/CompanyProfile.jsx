import React, { useState, useRef } from "react";
import { ChevronRight, Image, Upload, X } from "lucide-react";
import { Link } from "react-router-dom";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import SettingsNav from "../../components/settings/SettingsNav";

function CompanyProfile() {
    const fileInputRef = useRef(null);

    const [formData, setFormData] = useState({
        logoUrl: "",
        companyName: "Shifa Clinic",
        description:
            "A professional healthcare clinic providing consultation and follow-up services.",
        email: "contact@shifaclinic.example",
        phone: "+92 300 0000000",
        website: "www.shifaclinic.example",
        address: "Main Boulevard",
        city: "Lahore",
        province: "Punjab",
        country: "Pakistan",
        postalCode: "54000",
    });

    const [savedSnapshot, setSavedSnapshot] = useState(formData);

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData({
            ...formData,
            [name]: value,
        });
    }

    function handleLogoChange(event) {
        const file = event.target.files[0];

        if (!file) {
            return;
        }

        const previewUrl = URL.createObjectURL(file);

        setFormData({
            ...formData,
            logoUrl: previewUrl,
        });
    }

    function handleLogoRemove() {
        setFormData({
            ...formData,
            logoUrl: "",
        });

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    }

    function handleSave(event) {
        event.preventDefault();

        setSavedSnapshot(formData);

        // TODO: axios PUT /api/company/profile with the full form payload
    }

    function handleCancel() {
        setFormData(savedSnapshot);
    }

    const descriptionCharCount = formData.description.length;

    return (
        <div className="min-h-screen bg-beige flex">

            {/* Sidebar */}
            <Sidebar activeItem="Settings" />

            {/* Main Area */}
            <div className="flex-1 min-w-0">

                {/* Topbar */}
                <Topbar
                    showBell
                    simpleProfileIcon
                    searchPlaceholder="Search settings..."
                />

                <main className="px-8 py-6">

                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 mb-8">
                        <Link
                            to="/settings"
                            className="text-sm text-slate hover:text-navy transition"
                        >
                            Settings
                        </Link>

                        <ChevronRight className="w-3 h-3 text-gray" />

                        <span className="text-sm font-bold text-navy">
                            Company Profile
                        </span>
                    </div>

                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5 mb-8">

                        <div>
                            <h1 className="font-serif text-4xl text-navy">
                                Company Profile
                            </h1>

                            <p className="text-sm text-slate mt-1.5">
                                Manage the information customers see about your business.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={handleSave}
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
                            "
                        >
                            Save Changes
                        </button>

                    </div>

                    {/* Three Zone Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_280px] gap-6">

                        {/* Left - Settings Navigation */}
                        <div>
                            <SettingsNav activeSection="profile" />
                        </div>

                        {/* Center - Form Cards */}
                        <div className="min-w-0 max-w-2xl w-full">

                            <form
                                onSubmit={handleSave}
                                className="flex flex-col gap-6"
                            >

                                {/* Basic Information */}
                                <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-7">

                                    <h2 className="font-serif text-2xl text-navy">
                                        Basic Information
                                    </h2>

                                    <div className="border-b border-gray/20 mt-4 mb-5" />

                                    {/* Logo */}
                                    <div className="flex flex-col sm:flex-row items-start gap-5 mb-5">

                                        {/* Logo Preview */}
                                        <div className="w-24 h-20 bg-gray/10 border border-gray/20 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0">

                                            {formData.logoUrl ? (
                                                <img
                                                    src={formData.logoUrl}
                                                    alt="Company logo"
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <Image className="w-7 h-7 text-gray" />
                                            )}

                                        </div>

                                        {/* Logo Details */}
                                        <div className="flex-1">

                                            <p className="text-xs font-bold uppercase tracking-wide text-navy mb-1.5">
                                                Company Logo
                                            </p>

                                            <p className="text-sm text-slate leading-relaxed mb-3">
                                                This logo will appear on your public booking page and customer communications. Recommended size: 512x512px.
                                            </p>

                                            <div className="flex items-center gap-4">

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

                                                {formData.logoUrl && (
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

                                    {/* Company Name */}
                                    <div className="mb-5">

                                        <label className="block text-xs font-bold uppercase tracking-wide text-navy mb-2">
                                            Company Name
                                        </label>

                                        <input
                                            type="text"
                                            name="companyName"
                                            value={formData.companyName}
                                            onChange={handleChange}
                                            className="
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
                                            "
                                        />

                                    </div>

                                    {/* Business Description */}
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
                                            className="
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
                                                resize-y
                                                focus:border-navy
                                                focus:ring-2
                                                focus:ring-gold
                                            "
                                        />

                                    </div>

                                </div>

                                {/* Temporary bottom actions */}
                                <div className="flex justify-end gap-3">

                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        className="
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
                                        "
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        className="
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
                                        "
                                    >
                                        Save Changes
                                    </button>

                                </div>

                            </form>

                        </div>

                        {/* Right Column */}
                        <div className="flex flex-col gap-6">

                            {/* Profile Summary */}
                            <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6 text-center">

                                <div className="w-16 h-16 mx-auto rounded-lg bg-gray/10 border border-gray/20 flex items-center justify-center">
                                    {formData.logoUrl ? (
                                        <img
                                            src={formData.logoUrl}
                                            alt="Company logo"
                                            className="w-full h-full object-cover rounded-lg"
                                        />
                                    ) : (
                                        <span className="font-serif text-xl text-navy">
                                            S
                                        </span>
                                    )}
                                </div>

                                <h2 className="font-serif text-2xl text-navy mt-4">
                                    {formData.companyName}
                                </h2>

                                <p className="text-sm text-slate mt-1">
                                    Company
                                </p>

                                <span className="inline-flex items-center gap-2 mt-3 bg-green-50 text-green-700 text-xs font-bold uppercase px-3 py-1.5 rounded-full">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                    Active
                                </span>

                            </div>

                            {/* Next Steps */}
                            <div className="bg-navy rounded-xl p-6 text-white">

                                <h2 className="font-serif text-xl">
                                    Next Steps
                                </h2>

                                <p className="text-sm text-white/70 leading-relaxed mt-2">
                                    Complete these actions to fully optimize your company presence.
                                </p>

                                <div className="mt-5 space-y-4">

                                    <div className="flex items-start gap-2.5">

                                        <div className="w-5 h-5 rounded-full border-2 border-gold bg-gold/20 flex items-center justify-center flex-shrink-0">
                                            <span className="text-gold text-xs">
                                                ✓
                                            </span>
                                        </div>

                                        <span className="text-sm font-bold text-white/70 line-through">
                                            Add Basic Details
                                        </span>

                                    </div>

                                    <div className="flex items-start gap-2.5">

                                        <div className="w-5 h-5 rounded-full border-2 border-white/40 flex-shrink-0" />

                                        <div>
                                            <p className="text-sm font-bold text-white">
                                                Verify Email Address
                                            </p>

                                            <button
                                                type="button"
                                                onClick={() => {
                                                    // TODO: axios call to resend verification email
                                                }}
                                                className="text-xs text-gold hover:underline mt-0.5"
                                            >
                                                Send Link
                                            </button>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </main>

            </div>
        </div>
    );
}

export default CompanyProfile;