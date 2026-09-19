import React, { useRef, useState } from "react";
import {
    ShieldCheck,
    Check,
    ChevronDown,
    Eye,
    EyeOff,
    Monitor,
    Smartphone,
    Tablet,
    LogOut,
} from "lucide-react";

import SuperAdminSidebar from "../../components/superadmin/SuperAdminSidebar";
import SuperAdminTopbar from "../../components/superadmin/SuperAdminTopbar";
import SuperAdminSettingsNav from "../../components/superadmin/SuperAdminSettingsNav";

function SuperAdminSettings() {
    const [activeSection, setActiveSection] = useState("profile");

    // ─── Profile ───
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

    const isDirty = JSON.stringify(formData) !== JSON.stringify(savedSnapshot);

    // ─── Security ───
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [showPasswords, setShowPasswords] = useState(false);
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
    const [securityAlerts, setSecurityAlerts] = useState(true);

    // ─── Platform Preferences ───
    const [platformPrefs, setPlatformPrefs] = useState({
        language: "English",
        timezone: "Pakistan Standard Time (PKT)",
        dateFormat: "DD MMM YYYY",
        defaultLandingPage: "Dashboard",
    });
    const [isLanguageOpen, setIsLanguageOpen] = useState(false);
    const [isTimezoneOpen, setIsTimezoneOpen] = useState(false);
    const [isDateFormatOpen, setIsDateFormatOpen] = useState(false);
    const [isLandingOpen, setIsLandingOpen] = useState(false);

    // ─── Notifications ───
    const [notificationPrefs, setNotificationPrefs] = useState({
        newCompanyRegistrations: true,
        systemAlerts: true,
        dailyDigest: true,
        weeklyReports: false,
        appointmentMilestones: true,
        staffChanges: false,
    });

    // ─── Sessions ───
    const [sessions, setSessions] = useState([
        { id: 1, device: "MacBook Pro · Chrome", icon: Monitor, location: "Lahore, Pakistan", ip: "203.81.xxx.xxx", lastActive: "Active now", current: true },
        { id: 2, device: "iPhone 15 · Safari", icon: Smartphone, location: "Lahore, Pakistan", ip: "203.81.xxx.xxx", lastActive: "2 hours ago", current: false },
        { id: 3, device: "iPad Air · Safari", icon: Tablet, location: "Karachi, Pakistan", ip: "111.68.xxx.xxx", lastActive: "3 days ago", current: false },
    ]);

    // ─── Handlers ───

    function handleChangePhoto() { fileInputRef.current?.click(); }
    function handleRemovePhoto() {
        setFormData((c) => ({ ...c, avatarUrl: "" }));
    }
    function handleSave() {
        setSavedSnapshot(formData);
        // TODO: axios PUT /api/superadmin/profile
    }
    function handleCancel() { setFormData(savedSnapshot); }
    function handleFieldChange(field, value) {
        setFormData((c) => ({ ...c, [field]: value }));
    }
    function handlePasswordChange(field, value) {
        setPasswordData((c) => ({ ...c, [field]: value }));
    }
    function handleUpdatePassword() {
        if (
            !passwordData.currentPassword ||
            !passwordData.newPassword ||
            !passwordData.confirmPassword ||
            passwordData.newPassword !== passwordData.confirmPassword
        ) return;
        // TODO: axios POST /api/superadmin/change-password
        setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    }
    function handleToggleTwoFactor() {
        setTwoFactorEnabled((c) => !c);
        // TODO: axios PATCH /api/superadmin/security/2fa
    }
    function handleToggleSecurityAlerts() {
        setSecurityAlerts((c) => !c);
        // TODO: axios PATCH /api/superadmin/security/alerts
    }
    function handlePlatformPrefChange(field, value) {
        setPlatformPrefs((c) => ({ ...c, [field]: value }));
        // TODO: axios PATCH /api/superadmin/preferences
    }
    function handleToggleNotification(key) {
        setNotificationPrefs((c) => ({ ...c, [key]: !c[key] }));
        // TODO: axios PATCH /api/superadmin/notifications/preferences
    }
    function handleSignOutSession(sessionId) {
        setSessions((current) => current.filter((s) => s.id !== sessionId));
        // TODO: axios DELETE /api/superadmin/sessions/:id
    }
    function handleSignOutAll() {
        setSessions((current) => current.filter((s) => s.current));
        // TODO: axios DELETE /api/superadmin/sessions
    }

    function ToggleSwitch({ checked, onToggle, locked = false }) {
        return (
            <button
                type="button"
                role="switch"
                aria-checked={checked}
                onClick={locked ? undefined : onToggle}
                className={`
                    relative w-11 h-6 rounded-full flex-shrink-0 transition
                    ${
                        locked
                            ? "bg-slate/40 cursor-default"
                            : checked
                            ? "bg-navy cursor-pointer"
                            : "bg-gray/30 cursor-pointer"
                    }
                `}
            >
                {checked && !locked ? (
                    <span className="absolute top-0 right-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center shadow-sm">
                        <Check className="w-3 h-3 text-white" />
                    </span>
                ) : (
                    <span className="absolute top-0 left-0 w-6 h-6 rounded-full bg-white shadow-sm" />
                )}
            </button>
        );
    }

    return (
        <div className="min-h-screen bg-beige flex">

            <SuperAdminSidebar activeItem="Settings" />

            <div className="flex-1 min-w-0 flex flex-col">

                <SuperAdminTopbar unreadCount={3} />

                <main className="flex-1 px-8 py-6">

                    <div className="mb-6">
                        <h1 className="font-serif text-5xl text-navy mb-1.5">Settings</h1>
                        <p className="text-sm text-slate">
                            Manage your TIMEORA platform preferences and administrator account.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-6">

                        <div>
                            <SuperAdminSettingsNav
                                activeSection={activeSection}
                                onSectionChange={setActiveSection}
                            />
                        </div>

                        <div className="min-w-0">

                            {/* PROFILE */}
                            {activeSection === "profile" && (
                                <div className="bg-white rounded-xl border border-gray/20 shadow-sm overflow-hidden">
                                    <div className="p-6 border-b border-gray/20">
                                        <h2 className="font-serif text-2xl text-navy">
                                            Administrator Profile
                                        </h2>
                                    </div>

                                    <div className="p-6">
                                        <div className="flex items-center gap-4 mb-2.5 flex-wrap">
                                            {formData.avatarUrl ? (
                                                <img src={formData.avatarUrl} alt={formData.fullName} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
                                            ) : (
                                                <div className="w-16 h-16 rounded-lg bg-beige flex items-center justify-center flex-shrink-0">
                                                    <span className="font-serif text-xl text-navy">
                                                        {formData.fullName.split(" ").map((w) => w.charAt(0)).slice(0, 2).join("").toUpperCase()}
                                                    </span>
                                                </div>
                                            )}

                                            <button type="button" onClick={handleChangePhoto} className="bg-navy text-white font-bold text-sm px-4 py-2.5 rounded-lg hover:bg-gold hover:text-navy transition cursor-pointer">
                                                Change Photo
                                            </button>

                                            <button type="button" onClick={handleRemovePhoto} className="bg-white border border-gray text-navy font-bold text-sm px-4 py-2.5 rounded-lg hover:border-navy transition cursor-pointer">
                                                Remove
                                            </button>

                                            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" />
                                        </div>

                                        <p className="text-sm text-slate mt-2.5 mb-5">
                                            JPG, GIF or PNG. Max size of 800K.
                                        </p>

                                        <div className="border-b border-gray/20 mb-6" />

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5">
                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-wide text-navy mb-2">Full Name</label>
                                                <input
                                                    type="text"
                                                    value={formData.fullName}
                                                    onChange={(e) => handleFieldChange("fullName", e.target.value)}
                                                    className="w-full border border-gray rounded-lg px-4 py-3 text-sm text-navy outline-none focus:border-navy bg-white"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-wide text-navy mb-2">Email Address</label>
                                                <div className="flex items-center gap-3">
                                                    <input
                                                        type="email"
                                                        value={formData.email}
                                                        onChange={(e) => handleFieldChange("email", e.target.value)}
                                                        className="flex-1 min-w-0 border border-gray rounded-lg px-4 py-3 text-sm text-navy outline-none focus:border-navy bg-white"
                                                    />
                                                    {formData.emailVerified && (
                                                        <span className="text-gold text-sm font-bold flex items-center gap-1 flex-shrink-0">
                                                            <ShieldCheck className="w-3.5 h-3.5" /> Verified
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-wide text-navy mb-2">Phone Number</label>
                                                <input
                                                    type="tel"
                                                    value={formData.phone}
                                                    onChange={(e) => handleFieldChange("phone", e.target.value)}
                                                    className="w-full border border-gray rounded-lg px-4 py-3 text-sm text-navy outline-none focus:border-navy bg-white"
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-xs font-bold uppercase tracking-wide text-navy mb-2">Role</label>
                                                <input
                                                    type="text"
                                                    value={formData.role}
                                                    disabled
                                                    className="w-full rounded-lg px-4 py-3 text-sm bg-gray/5 border border-gray/20 text-slate cursor-not-allowed"
                                                />
                                            </div>
                                        </div>

                                        <div className="border-b border-gray/20 my-6" />

                                        <div className="flex justify-end gap-3 flex-wrap">
                                            <button
                                                type="button"
                                                onClick={handleCancel}
                                                disabled={!isDirty}
                                                className="bg-white border border-gray text-navy font-bold text-sm px-6 py-2.5 rounded-lg hover:border-navy transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                                            >
                                                Cancel
                                            </button>

                                            <button
                                                type="button"
                                                onClick={handleSave}
                                                disabled={!isDirty}
                                                className="bg-navy text-white font-bold text-sm px-6 py-2.5 rounded-lg hover:bg-gold hover:text-navy transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                                            >
                                                Save Changes
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* SECURITY */}
                            {activeSection === "security" && (
                                <div className="flex flex-col gap-6">

                                    <div className="bg-white rounded-xl border border-gray/20 shadow-sm overflow-hidden">
                                        <div className="p-6 border-b border-gray/20">
                                            <h2 className="font-serif text-2xl text-navy">Change Password</h2>
                                            <p className="text-sm text-slate mt-1">
                                                Update your administrator password. Use a strong, unique password.
                                            </p>
                                        </div>

                                        <div className="p-6">
                                            <div className="flex flex-col gap-5 mb-6">

                                                <div>
                                                    <label className="block text-xs font-bold uppercase tracking-wide text-navy mb-2">Current Password</label>
                                                    <div className="relative">
                                                        <input
                                                            type={showPasswords ? "text" : "password"}
                                                            value={passwordData.currentPassword}
                                                            onChange={(e) => handlePasswordChange("currentPassword", e.target.value)}
                                                            className="w-full border border-gray rounded-lg px-4 py-3 pr-11 text-sm text-navy outline-none focus:border-navy bg-white"
                                                        />
                                                        <button
                                                            type="button"
                                                            onClick={() => setShowPasswords(!showPasswords)}
                                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate hover:text-navy transition cursor-pointer"
                                                        >
                                                            {showPasswords ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                        </button>
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-bold uppercase tracking-wide text-navy mb-2">New Password</label>
                                                    <input
                                                        type={showPasswords ? "text" : "password"}
                                                        value={passwordData.newPassword}
                                                        onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
                                                        className="w-full border border-gray rounded-lg px-4 py-3 text-sm text-navy outline-none focus:border-navy bg-white"
                                                    />
                                                </div>

                                                <div>
                                                    <label className="block text-xs font-bold uppercase tracking-wide text-navy mb-2">Confirm New Password</label>
                                                    <input
                                                        type={showPasswords ? "text" : "password"}
                                                        value={passwordData.confirmPassword}
                                                        onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
                                                        className="w-full border border-gray rounded-lg px-4 py-3 text-sm text-navy outline-none focus:border-navy bg-white"
                                                    />

                                                    {passwordData.newPassword &&
                                                        passwordData.confirmPassword &&
                                                        passwordData.newPassword !== passwordData.confirmPassword && (
                                                            <p className="text-xs text-red-600 mt-2">Passwords do not match.</p>
                                                        )}
                                                </div>

                                            </div>

                                            <div className="flex justify-end">
                                                <button
                                                    type="button"
                                                    onClick={handleUpdatePassword}
                                                    disabled={
                                                        !passwordData.currentPassword ||
                                                        !passwordData.newPassword ||
                                                        !passwordData.confirmPassword ||
                                                        passwordData.newPassword !== passwordData.confirmPassword
                                                    }
                                                    className="bg-navy text-white font-bold text-sm px-6 py-2.5 rounded-lg hover:bg-gold hover:text-navy transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                                                >
                                                    Update Password
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-xl border border-gray/20 shadow-sm overflow-hidden">
                                        <div className="p-6 border-b border-gray/20">
                                            <h2 className="font-serif text-2xl text-navy">Security Preferences</h2>
                                        </div>

                                        <div className="px-6">
                                            <div className="flex justify-between items-center gap-4 py-4 border-b border-gray/20">
                                                <div className="min-w-0 pr-4">
                                                    <p className="text-base text-navy">Two-Factor Authentication</p>
                                                    <p className="text-xs text-slate mt-0.5">Add an extra layer of security to your account.</p>
                                                </div>
                                                <ToggleSwitch checked={twoFactorEnabled} onToggle={handleToggleTwoFactor} />
                                            </div>

                                            <div className="flex justify-between items-center gap-4 py-4">
                                                <div className="min-w-0 pr-4">
                                                    <p className="text-base text-navy">Security Alerts</p>
                                                    <p className="text-xs text-slate mt-0.5">Get notified of suspicious sign-ins and changes.</p>
                                                </div>
                                                <ToggleSwitch checked={securityAlerts} onToggle={handleToggleSecurityAlerts} />
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            )}

                            {/* PLATFORM PREFERENCES */}
                            {activeSection === "platformPreferences" && (
                                <div className="bg-white rounded-xl border border-gray/20 shadow-sm overflow-hidden">
                                    <div className="p-6 border-b border-gray/20">
                                        <h2 className="font-serif text-2xl text-navy">Platform Preferences</h2>
                                        <p className="text-sm text-slate mt-1">
                                            Personalize how TIMEORA appears and behaves for you.
                                        </p>
                                    </div>

                                    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">

                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wide text-navy mb-2">Language</label>
                                            <div className="relative">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setIsLanguageOpen(!isLanguageOpen);
                                                        setIsTimezoneOpen(false);
                                                        setIsDateFormatOpen(false);
                                                        setIsLandingOpen(false);
                                                    }}
                                                    className="w-full border border-gray rounded-lg px-4 py-3 flex justify-between items-center text-sm text-navy cursor-pointer hover:border-navy transition bg-white"
                                                >
                                                    <span>{platformPrefs.language}</span>
                                                    <ChevronDown className="w-4 h-4 text-slate" />
                                                </button>

                                                {isLanguageOpen && (
                                                    <div className="absolute left-0 top-full mt-2 z-20 w-full bg-white border border-gray/20 rounded-lg shadow-lg p-1">
                                                        {["English", "Urdu", "Arabic"].map((option) => (
                                                            <button
                                                                key={option}
                                                                type="button"
                                                                onClick={() => {
                                                                    handlePlatformPrefChange("language", option);
                                                                    setIsLanguageOpen(false);
                                                                }}
                                                                className="w-full text-left px-3 py-2 rounded-md text-sm text-navy hover:bg-beige cursor-pointer"
                                                            >
                                                                {option}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wide text-navy mb-2">Timezone</label>
                                            <div className="relative">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setIsTimezoneOpen(!isTimezoneOpen);
                                                        setIsLanguageOpen(false);
                                                        setIsDateFormatOpen(false);
                                                        setIsLandingOpen(false);
                                                    }}
                                                    className="w-full border border-gray rounded-lg px-4 py-3 flex justify-between items-center text-sm text-navy cursor-pointer hover:border-navy transition bg-white"
                                                >
                                                    <span className="truncate">{platformPrefs.timezone}</span>
                                                    <ChevronDown className="w-4 h-4 text-slate flex-shrink-0" />
                                                </button>

                                                {isTimezoneOpen && (
                                                    <div className="absolute left-0 top-full mt-2 z-20 w-full bg-white border border-gray/20 rounded-lg shadow-lg p-1">
                                                        {["Pakistan Standard Time (PKT)", "Gulf Standard Time (GST)", "UTC"].map((option) => (
                                                            <button
                                                                key={option}
                                                                type="button"
                                                                onClick={() => {
                                                                    handlePlatformPrefChange("timezone", option);
                                                                    setIsTimezoneOpen(false);
                                                                }}
                                                                className="w-full text-left px-3 py-2 rounded-md text-sm text-navy hover:bg-beige cursor-pointer"
                                                            >
                                                                {option}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wide text-navy mb-2">Date Format</label>
                                            <div className="relative">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setIsDateFormatOpen(!isDateFormatOpen);
                                                        setIsLanguageOpen(false);
                                                        setIsTimezoneOpen(false);
                                                        setIsLandingOpen(false);
                                                    }}
                                                    className="w-full border border-gray rounded-lg px-4 py-3 flex justify-between items-center text-sm text-navy cursor-pointer hover:border-navy transition bg-white"
                                                >
                                                    <span>{platformPrefs.dateFormat}</span>
                                                    <ChevronDown className="w-4 h-4 text-slate" />
                                                </button>

                                                {isDateFormatOpen && (
                                                    <div className="absolute left-0 top-full mt-2 z-20 w-full bg-white border border-gray/20 rounded-lg shadow-lg p-1">
                                                        {["DD MMM YYYY", "MM/DD/YYYY", "YYYY-MM-DD"].map((option) => (
                                                            <button
                                                                key={option}
                                                                type="button"
                                                                onClick={() => {
                                                                    handlePlatformPrefChange("dateFormat", option);
                                                                    setIsDateFormatOpen(false);
                                                                }}
                                                                className="w-full text-left px-3 py-2 rounded-md text-sm text-navy hover:bg-beige cursor-pointer"
                                                            >
                                                                {option}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold uppercase tracking-wide text-navy mb-2">Default Landing Page</label>
                                            <div className="relative">
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setIsLandingOpen(!isLandingOpen);
                                                        setIsLanguageOpen(false);
                                                        setIsTimezoneOpen(false);
                                                        setIsDateFormatOpen(false);
                                                    }}
                                                    className="w-full border border-gray rounded-lg px-4 py-3 flex justify-between items-center text-sm text-navy cursor-pointer hover:border-navy transition bg-white"
                                                >
                                                    <span>{platformPrefs.defaultLandingPage}</span>
                                                    <ChevronDown className="w-4 h-4 text-slate" />
                                                </button>

                                                {isLandingOpen && (
                                                    <div className="absolute left-0 top-full mt-2 z-20 w-full bg-white border border-gray/20 rounded-lg shadow-lg p-1">
                                                        {["Dashboard", "Companies", "Appointments", "Analytics"].map((option) => (
                                                            <button
                                                                key={option}
                                                                type="button"
                                                                onClick={() => {
                                                                    handlePlatformPrefChange("defaultLandingPage", option);
                                                                    setIsLandingOpen(false);
                                                                }}
                                                                className="w-full text-left px-3 py-2 rounded-md text-sm text-navy hover:bg-beige cursor-pointer"
                                                            >
                                                                {option}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            )}

                            {/* NOTIFICATIONS */}
                            {activeSection === "notifications" && (
                                <div className="bg-white rounded-xl border border-gray/20 shadow-sm overflow-hidden">
                                    <div className="p-6 border-b border-gray/20">
                                        <h2 className="font-serif text-2xl text-navy">Notification Preferences</h2>
                                        <p className="text-sm text-slate mt-1">
                                            Choose how and when TIMEORA keeps you informed.
                                        </p>
                                    </div>

                                    <div className="px-6">

                                        <div className="flex justify-between items-center gap-4 py-4 border-b border-gray/20">
                                            <div className="min-w-0 pr-4">
                                                <p className="text-base text-navy">New Company Registrations</p>
                                                <p className="text-xs text-slate mt-0.5">Alerts when a new company completes registration.</p>
                                            </div>
                                            <ToggleSwitch
                                                checked={notificationPrefs.newCompanyRegistrations}
                                                onToggle={() => handleToggleNotification("newCompanyRegistrations")}
                                            />
                                        </div>

                                        <div className="flex justify-between items-center gap-4 py-4 border-b border-gray/20">
                                            <div className="min-w-0 pr-4">
                                                <p className="text-base text-navy">System Alerts</p>
                                                <p className="text-xs text-slate mt-0.5">Platform incidents and maintenance notices.</p>
                                            </div>
                                            <ToggleSwitch
                                                checked={notificationPrefs.systemAlerts}
                                                onToggle={() => handleToggleNotification("systemAlerts")}
                                            />
                                        </div>

                                        <div className="flex justify-between items-center gap-4 py-4 border-b border-gray/20">
                                            <div className="min-w-0 pr-4">
                                                <p className="text-base text-navy">Daily Digest</p>
                                                <p className="text-xs text-slate mt-0.5">A single morning summary of platform activity.</p>
                                            </div>
                                            <ToggleSwitch
                                                checked={notificationPrefs.dailyDigest}
                                                onToggle={() => handleToggleNotification("dailyDigest")}
                                            />
                                        </div>

                                        <div className="flex justify-between items-center gap-4 py-4 border-b border-gray/20">
                                            <div className="min-w-0 pr-4">
                                                <p className="text-base text-navy">Weekly Reports</p>
                                                <p className="text-xs text-slate mt-0.5">A full weekly analytics digest every Monday.</p>
                                            </div>
                                            <ToggleSwitch
                                                checked={notificationPrefs.weeklyReports}
                                                onToggle={() => handleToggleNotification("weeklyReports")}
                                            />
                                        </div>

                                        <div className="flex justify-between items-center gap-4 py-4 border-b border-gray/20">
                                            <div className="min-w-0 pr-4">
                                                <p className="text-base text-navy">Appointment Milestones</p>
                                                <p className="text-xs text-slate mt-0.5">Notifications when major milestones are hit.</p>
                                            </div>
                                            <ToggleSwitch
                                                checked={notificationPrefs.appointmentMilestones}
                                                onToggle={() => handleToggleNotification("appointmentMilestones")}
                                            />
                                        </div>

                                        <div className="flex justify-between items-center gap-4 py-4">
                                            <div className="min-w-0 pr-4">
                                                <p className="text-base text-navy">Staff Changes</p>
                                                <p className="text-xs text-slate mt-0.5">When staff are added or removed at any company.</p>
                                            </div>
                                            <ToggleSwitch
                                                checked={notificationPrefs.staffChanges}
                                                onToggle={() => handleToggleNotification("staffChanges")}
                                            />
                                        </div>

                                    </div>
                                </div>
                            )}

                            {/* SESSIONS */}
                            {activeSection === "sessions" && (
                                <div className="bg-white rounded-xl border border-gray/20 shadow-sm overflow-hidden">
                                    <div className="flex justify-between items-center gap-4 p-6 border-b border-gray/20 flex-wrap">
                                        <div>
                                            <h2 className="font-serif text-2xl text-navy">Active Sessions</h2>
                                            <p className="text-sm text-slate mt-1">
                                                Devices currently signed into your administrator account.
                                            </p>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={handleSignOutAll}
                                            disabled={sessions.filter((s) => !s.current).length === 0}
                                            className="bg-white border border-red-500 text-red-600 font-bold text-sm px-4 py-2.5 rounded-lg hover:bg-red-500 hover:text-white transition cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                                        >
                                            Sign Out All Others
                                        </button>
                                    </div>

                                    <div className="px-6">

                                        {sessions.map((session, index) => {
                                            const Icon = session.icon;

                                            return (
                                                <div
                                                    key={session.id}
                                                    className={`
                                                        flex items-center gap-4 py-4
                                                        ${index !== sessions.length - 1 ? "border-b border-gray/20" : ""}
                                                    `}
                                                >
                                                    <div className="w-11 h-11 bg-gray/10 rounded-lg flex items-center justify-center flex-shrink-0">
                                                        <Icon className="w-5 h-5 text-navy" />
                                                    </div>

                                                    <div className="flex-1 min-w-0">
                                                        <div className="flex items-center gap-2 flex-wrap">
                                                            <p className="text-sm font-bold text-navy">{session.device}</p>
                                                            {session.current && (
                                                                <span className="bg-green-50 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">
                                                                    Current
                                                                </span>
                                                            )}
                                                        </div>
                                                        <p className="text-xs text-slate mt-0.5">
                                                            {session.location} · {session.ip}
                                                        </p>
                                                    </div>

                                                    <span className="text-sm text-slate whitespace-nowrap">{session.lastActive}</span>

                                                    {!session.current && (
                                                        <button
                                                            type="button"
                                                            onClick={() => handleSignOutSession(session.id)}
                                                            className="text-slate hover:text-red-600 transition cursor-pointer flex-shrink-0"
                                                            aria-label="Sign out session"
                                                        >
                                                            <LogOut className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                </div>
                                            );
                                        })}

                                    </div>
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