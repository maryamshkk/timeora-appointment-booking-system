import React, { useRef, useState } from "react";
import { ShieldCheck } from "lucide-react";

import SuperAdminSidebar from "../../components/superadmin/SuperAdminSidebar";
import SuperAdminTopbar from "../../components/superadmin/SuperAdminTopbar";
import SuperAdminSettingsNav from "../../components/superadmin/SuperAdminSettingsNav";

function SuperAdminSettings() {
    const [activeSection, setActiveSection] = useState("profile");

    const [formData, setFormData] = useState({
        fullName: "Maryam Sheikh",
        email: "admin@timeora.com",
        emailVerified: true,
        phone: "+92 300 1234567",
        role: "Super Admin",
        avatarUrl: "",
    });

    const [savedSnapshot, setSavedSnapshot] = useState(formData);

    const fileInputRef = useRef(null);

    const isDirty =
        JSON.stringify(formData) !== JSON.stringify(savedSnapshot);

    // ─────────────── Handlers ───────────────

    function handleChangePhoto() {
        // TODO: hidden file input + upload.
        fileInputRef.current?.click();
    }

    function handleRemovePhoto() {
        setFormData((current) => ({ ...current, avatarUrl: "" }));
    }

    function handleSave() {
        setSavedSnapshot(formData);

        // TODO: axios PUT /api/superadmin/profile
    }

    function handleCancel() {
        setFormData(savedSnapshot);
    }

    function handleFieldChange(field, value) {
        setFormData((current) => ({ ...current, [field]: value }));
    }

    return (
        <div className="min-h-screen bg-beige flex">

            <SuperAdminSidebar activeItem="Settings" />

            <div className="flex-1 min-w-0 flex flex-col">

                <SuperAdminTopbar unreadCount={3} />

                <main className="flex-1 px-8 py-6">

                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="font-serif text-5xl text-navy mb-1.5">
                            Settings
                        </h1>

                        <p className="text-sm text-slate">
                            Manage your TIMEORA platform preferences and
                            administrator account.
                        </p>
                    </div>

                    {/* Main Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6">

                        {/* Left — Settings Nav */}
                        <div>
                            <SuperAdminSettingsNav
                                activeSection={activeSection}
                                onSectionChange={setActiveSection}
                            />
                        </div>

                        {/* Right — Section Content */}
                        <div className="min-w-0">

                            {activeSection === "profile" && (
                                <div className="bg-white rounded-xl border border-gray/20 shadow-sm overflow-hidden">

                                    {/* Card Header */}
                                    <div className="p-6 border-b border-gray/20">
                                        <h2 className="font-serif text-2xl text-navy">
                                            Administrator Profile
                                        </h2>
                                    </div>

                                    {/* Card Content */}
                                    <div className="p-6">

                                        {/* Photo Row */}
                                        <div className="flex items-center gap-4 mb-2.5">

                                            {formData.avatarUrl ? (
                                                <img
                                                    src={formData.avatarUrl}
                                                    alt={formData.fullName}
                                                    className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                                                />
                                            ) : (
                                                <div className="w-16 h-16 rounded-lg bg-beige flex items-center justify-center flex-shrink-0">
                                                    <span className="font-serif text-xl text-navy">
                                                        {formData.fullName
                                                            .split(" ")
                                                            .map((word) => word.charAt(0))
                                                            .slice(0, 2)
                                                            .join("")
                                                            .toUpperCase()}
                                                    </span>
                                                </div>
                                            )}

                                            <button
                                                type="button"
                                                onClick={handleChangePhoto}
                                                className="
                                                    bg-navy text-white font-bold text-sm
                                                    px-4 py-2.5 rounded-lg
                                                    hover:bg-gold hover:text-navy transition
                                                    cursor-pointer
                                                "
                                            >
                                                Change Photo
                                            </button>

                                            <button
                                                type="button"
                                                onClick={handleRemovePhoto}
                                                className="
                                                    bg-white border border-gray text-navy
                                                    font-bold text-sm px-4 py-2.5 rounded-lg
                                                    hover:border-navy transition
                                                    cursor-pointer
                                                "
                                            >
                                                Remove
                                            </button>

                                            <input
                                                ref={fileInputRef}
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                // TODO: onChange → handleAvatarUpload(event.target.files[0])
                                            />

                                        </div>

                                        <p className="text-sm text-slate mt-2.5 mb-5">
                                            JPG, GIF or PNG. Max size of 800K.
                                        </p>

                                        <div className="border-b border-gray/20 mb-6"></div>

                                        {/* Full Name / Email */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5">

                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-wide text-navy mb-2">
                                                    Full Name
                                                </label>

                                                <input
                                                    type="text"
                                                    value={formData.fullName}
                                                    onChange={(event) =>
                                                        handleFieldChange(
                                                            "fullName",
                                                            event.target.value
                                                        )
                                                    }
                                                    className="
                                                        w-full border border-gray rounded-lg
                                                        px-4 py-3 text-sm text-navy
                                                        outline-none focus:border-navy bg-white
                                                    "
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-wide text-navy mb-2">
                                                    Email Address
                                                </label>

                                                <div className="flex items-center gap-3">

                                                    <input
                                                        type="email"
                                                        value={formData.email}
                                                        onChange={(event) =>
                                                            handleFieldChange(
                                                                "email",
                                                                event.target.value
                                                            )
                                                        }
                                                        className="
                                                            flex-1 min-w-0
                                                            border border-gray rounded-lg
                                                            px-4 py-3 text-sm text-navy
                                                            outline-none focus:border-navy bg-white
                                                        "
                                                    />

                                                    {formData.emailVerified && (
                                                        <span className="text-gold text-sm font-bold flex items-center gap-1 flex-shrink-0">
                                                            <ShieldCheck className="w-3.5 h-3.5" />
                                                            Verified
                                                        </span>
                                                    )}

                                                </div>
                                            </div>

                                        </div>

                                        {/* Phone / Role */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-wide text-navy mb-2">
                                                    Phone Number
                                                </label>

                                                <input
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={(event) =>
                                                        handleFieldChange(
                                                            "phone",
                                                            event.target.value
                                                        )
                                                    }
                                                    className="
                                                        w-full border border-gray rounded-lg
                                                        px-4 py-3 text-sm text-navy
                                                        outline-none focus:border-navy bg-white
                                                    "
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-wide text-navy mb-2">
                                                    Role
                                                </label>

                                                <input
                                                    type="text"
                                                    value={formData.role}
                                                    disabled
                                                    className="
                                                        w-full rounded-lg
                                                        px-4 py-3 text-sm
                                                        bg-gray/5 border border-gray/20
                                                        text-slate cursor-not-allowed
                                                    "
                                                />
                                            </div>

                                        </div>

                                        <div className="border-b border-gray/20 my-6"></div>

                                        {/* Footer */}
                                        <div className="flex justify-end gap-3 flex-wrap">

                                            <button
                                                type="button"
                                                onClick={handleCancel}
                                                disabled={!isDirty}
                                                className="
                                                    bg-white border border-gray text-navy
                                                    font-bold text-sm px-6 py-2.5 rounded-lg
                                                    hover:border-navy transition cursor-pointer
                                                    disabled:opacity-40 disabled:cursor-not-allowed
                                                "
                                            >
                                                Cancel
                                            </button>

                                            <button
                                                type="button"
                                                onClick={handleSave}
                                                disabled={!isDirty}
                                                className="
                                                    bg-navy text-white font-bold text-sm
                                                    px-6 py-2.5 rounded-lg
                                                    hover:bg-gold hover:text-navy transition
                                                    cursor-pointer
                                                    disabled:opacity-40 disabled:cursor-not-allowed
                                                "
                                            >
                                                Save Changes
                                            </button>

                                        </div>

                                    </div>

                                </div>
                            )}

                            {activeSection === "security" && (
                                <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-12 text-center">
                                    <h2 className="font-serif text-2xl text-navy mb-2">
                                        Security
                                    </h2>

                                    <p className="text-sm text-slate">
                                        Security settings (password, 2FA) are coming soon.
                                    </p>
                                </div>
                            )}

                            {activeSection === "platformPreferences" && (
                                <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-12 text-center">
                                    <h2 className="font-serif text-2xl text-navy mb-2">
                                        Platform Preferences
                                    </h2>

                                    <p className="text-sm text-slate">
                                        Platform-wide preferences are coming soon.
                                    </p>
                                </div>
                            )}

                            {activeSection === "notifications" && (
                                <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-12 text-center">
                                    <h2 className="font-serif text-2xl text-navy mb-2">
                                        Notifications
                                    </h2>

                                    <p className="text-sm text-slate">
                                        Notification preferences for the admin account are coming soon.
                                    </p>
                                </div>
                            )}

                            {activeSection === "sessions" && (
                                <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-12 text-center">
                                    <h2 className="font-serif text-2xl text-navy mb-2">
                                        Sessions
                                    </h2>

                                    <p className="text-sm text-slate">
                                        Active sessions and device management are coming soon.
                                    </p>
                                </div>
                            )}

                        </div>

                    </div>

                </main>

            </div>

        </div>
    );
}

export default SuperAdminSettings;