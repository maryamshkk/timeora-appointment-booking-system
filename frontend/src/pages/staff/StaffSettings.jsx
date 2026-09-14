import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    LayoutDashboard,
    Calendar,
    CalendarCheck,
    Clock,
    Users,
    BarChart3,
    Bell,
    Settings,
    Search,
    LogOut,
    ChevronDown,
    ArrowRight,
} from "lucide-react";

function StaffSettings() {
    const [activeTab, setActiveTab] = useState("general");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navItems = [
        { label: "Dashboard", icon: LayoutDashboard, to: "/staff/dashboard" },
        { label: "Calendar", icon: Calendar, to: "/staff/calendar" },
        { label: "Appointments", icon: CalendarCheck, to: "/staff/appointments" },
        { label: "Availability", icon: Clock, to: "/staff/availability" },
        { label: "Customers", icon: Users, to: "/staff/customers" },
        { label: "Reports", icon: BarChart3, to: "/staff/reports" },
        { label: "Notifications", icon: Bell, to: "/staff/notifications" },
        { label: "Settings", icon: Settings, to: "/staff/settings", active: true },
    ];

    const tabs = [
        { key: "general", label: "General" },
        { key: "notifications", label: "Notification Preferences" },
        { key: "calendar", label: "Calendar Preferences" },
        { key: "privacy", label: "Privacy" },
        { key: "security", label: "Security" },
    ];

    return (
        <div className="min-h-screen flex bg-beige">

            {/* Desktop Sidebar */}
            <div className="hidden lg:block lg:flex-shrink-0">
                <Sidebar navItems={navItems} />
            </div>

            {/* Mobile / Tablet Sidebar — overlay drawer */}
            {sidebarOpen && (
                <>
                    <button
                        type="button"
                        onClick={() => setSidebarOpen(false)}
                        className="fixed inset-0 z-30 bg-navy/50 lg:hidden"
                        aria-label="Close menu"
                    />

                    <div className="fixed left-0 top-0 z-40 h-screen w-64 max-w-[80vw] overflow-y-auto lg:hidden">
                        <Sidebar navItems={navItems} />
                    </div>
                </>
            )}

            {/* Main Area */}
            <div className="flex min-w-0 flex-1 flex-col">

                {/* Topbar */}
                <div className="bg-white border-b border-gray/20 px-4 sm:px-6 md:px-8 py-4 flex items-center justify-between">

                    <div className="relative w-full max-w-[280px]">

                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray" />

                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full bg-white border border-gray/20 rounded-lg pl-10 pr-4 py-2 text-sm text-navy outline-none focus:border-navy"
                        />

                    </div>

                    <div className="flex items-center gap-4">

                        <button
                            type="button"
                            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-beige transition"
                        >
                            <Bell className="w-5 h-5 text-navy" />
                        </button>

                        <button
                            type="button"
                            className="w-9 h-9 rounded-full overflow-hidden hover:opacity-80 transition"
                        >
                            <img
                                src="https://i.pravatar.cc/80?img=47"
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </button>

                    </div>

                </div>

                <main className="flex-1 bg-beige px-4 py-6 sm:px-6 md:px-8 md:py-8">

                    {/* Header */}
                    <div className="mb-8">

                        <h1 className="font-serif text-3xl text-navy sm:text-4xl md:text-5xl">
                            Settings
                        </h1>

                    </div>

                    {/* Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-8">

                        {/* Tabs */}
                        <aside>

                            <div className="flex flex-col gap-1">

                                {tabs.map((tab) => {
                                    const isActive = activeTab === tab.key;

                                    return (
                                        <button
                                            key={tab.key}
                                            type="button"
                                            onClick={() => setActiveTab(tab.key)}
                                            className={`
                                                flex items-center justify-between gap-3 px-4 py-3 rounded-lg text-sm font-bold transition text-left
                                                ${
                                                    isActive
                                                        ? "bg-white text-navy shadow-sm border border-gray/20"
                                                        : "text-slate hover:text-navy"
                                                }
                                            `}
                                        >
                                            <span>{tab.label}</span>

                                            {isActive && (
                                                <ArrowRight className="w-4 h-4" />
                                            )}
                                        </button>
                                    );
                                })}

                            </div>

                        </aside>

                        {/* Panel */}
                        <div className="bg-white rounded-lg border border-gray/20 shadow-sm overflow-hidden">

                            {activeTab === "general" && <GeneralPanel />}
                            {activeTab === "notifications" && <NotificationPanel />}
                            {activeTab === "calendar" && <CalendarPanel />}
                            {activeTab === "privacy" && <PrivacyPanel />}
                            {activeTab === "security" && <SecurityPanel />}

                        </div>

                    </div>

                </main>

            </div>

        </div>
    );
}

/* ------------------------------------------------------------------ */
/* Shared Panel Header + Footer                                        */
/* ------------------------------------------------------------------ */
function PanelHeader({ title, subtitle }) {
    return (
        <div className="px-6 sm:px-8 py-6 border-b border-gray/20">
            <h2 className="font-serif text-2xl text-navy">{title}</h2>
            {subtitle && (
                <p className="text-xs text-slate mt-2">{subtitle}</p>
            )}
        </div>
    );
}

function PanelFooter({ onDiscard }) {
    return (
        <div className="flex items-center justify-end gap-3 px-6 sm:px-8 py-5 border-t border-gray/20 bg-beige/30">

            <button
                type="button"
                onClick={onDiscard}
                className="px-5 py-2.5 rounded-lg border border-gray/30 bg-white text-sm font-bold text-slate hover:border-navy hover:text-navy transition"
            >
                Discard
            </button>

            <button
                type="submit"
                className="px-5 py-2.5 rounded-lg bg-navy text-white text-sm font-bold hover:bg-gold hover:text-navy transition"
            >
                Save Changes
            </button>

        </div>
    );
}

/* Reusable styled select */
function SelectField({ label, helper, value, onChange, options, maxWidth }) {
    return (
        <div className={maxWidth ? "max-w-[280px]" : ""}>

            <label className="block text-sm font-bold text-navy mb-2">
                {label}
            </label>

            {helper && (
                <p className="text-xs text-slate mb-3">{helper}</p>
            )}

            <div className="relative">

                <select
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    className="w-full appearance-none bg-white border border-gray/30 rounded-lg px-4 py-3 text-sm text-navy outline-none focus:border-navy pr-10"
                >
                    {options.map((option) => (
                        <option key={option}>{option}</option>
                    ))}
                </select>

                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate pointer-events-none" />

            </div>

        </div>
    );
}

/* Reusable toggle row */
function ToggleRow({ label, description, checked, onChange }) {
    return (
        <div className="flex items-start justify-between gap-4 px-4 sm:px-5 py-4 hover:bg-beige/30 transition">

            <div className="min-w-0">
                <p className="text-sm font-bold text-navy">{label}</p>
                <p className="text-xs text-slate mt-1">{description}</p>
            </div>

            <button
                type="button"
                role="switch"
                aria-checked={checked}
                onClick={onChange}
                className={`relative shrink-0 w-11 h-6 rounded-full transition ${
                    checked ? "bg-navy" : "bg-gray/40"
                }`}
            >
                <span
                    className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition ${
                        checked ? "left-[22px]" : "left-0.5"
                    }`}
                />
            </button>

        </div>
    );
}

/* ------------------------------------------------------------------ */
/* 1. General Panel                                                    */
/* ------------------------------------------------------------------ */
function GeneralPanel() {
    const defaults = {
        language: "English (US)",
        timezone: "Asia/Karachi",
        dateFormat: "DD/MM/YYYY",
        timeFormat: "12-hour (AM/PM)",
        startPage: "Dashboard",
    };

    const [form, setForm] = useState(defaults);

    const set = (key, value) =>
        setForm((prev) => ({ ...prev, [key]: value }));

    return (
        <form onSubmit={(e) => e.preventDefault()}>

            <PanelHeader
                title="General Settings"
                subtitle="Manage your language, timezone and formatting preferences."
            />

            <div className="px-6 sm:px-8 py-8 flex flex-col gap-8">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SelectField
                        label="Language"
                        value={form.language}
                        onChange={(v) => set("language", v)}
                        options={["English (US)", "English (UK)", "Urdu", "Arabic"]}
                    />
                    <SelectField
                        label="Timezone"
                        value={form.timezone}
                        onChange={(v) => set("timezone", v)}
                        options={["Asia/Karachi", "Asia/Dubai", "Asia/Kolkata", "Europe/London", "America/New_York"]}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SelectField
                        label="Date Format"
                        value={form.dateFormat}
                        onChange={(v) => set("dateFormat", v)}
                        options={["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD"]}
                    />
                    <SelectField
                        label="Time Format"
                        value={form.timeFormat}
                        onChange={(v) => set("timeFormat", v)}
                        options={["12-hour (AM/PM)", "24-hour"]}
                    />
                </div>

                <SelectField
                    label="Start Page"
                    helper="Select which page loads when you log into the Staff Portal."
                    value={form.startPage}
                    onChange={(v) => set("startPage", v)}
                    options={["Dashboard", "Calendar", "Appointments", "Notifications"]}
                    maxWidth
                />

            </div>

            <PanelFooter onDiscard={() => setForm(defaults)} />

        </form>
    );
}

/* ------------------------------------------------------------------ */
/* 2. Notification Preferences Panel                                   */
/* ------------------------------------------------------------------ */
function NotificationPanel() {
    const defaults = {
        emailNew: true,
        emailCancel: true,
        emailReschedule: true,
        emailReminders: true,
        emailDaily: false,

        appNew: true,
        appCancel: true,
        appReschedule: true,
        appReminders: true,
        appSystem: false,

        timing: "30 minutes before",
    };

    const [prefs, setPrefs] = useState(defaults);

    const emailItems = [
        ["emailNew", "New appointment bookings", "When a customer books a new appointment."],
        ["emailCancel", "Appointment cancellations", "When an appointment is cancelled."],
        ["emailReschedule", "Appointment reschedules", "When an appointment is rescheduled."],
        ["emailReminders", "Upcoming reminders", "Before your scheduled appointments."],
        ["emailDaily", "Daily schedule summary", "A summary of your day each morning."],
    ];

    const appItems = [
        ["appNew", "New appointment bookings", "When a customer books a new appointment."],
        ["appCancel", "Appointment cancellations", "When an appointment is cancelled."],
        ["appReschedule", "Appointment reschedules", "When an appointment is rescheduled."],
        ["appReminders", "Upcoming reminders", "Before your scheduled appointments."],
        ["appSystem", "System updates", "Portal updates and maintenance notices."],
    ];

    const toggle = (key) =>
        setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));

    const Section = ({ title, subtitle, items }) => (
        <section>
            <h3 className="text-sm font-bold text-navy">{title}</h3>
            <p className="text-xs text-slate mt-1 mb-4">{subtitle}</p>

            <div className="divide-y divide-gray/10 border border-gray/20 rounded-lg overflow-hidden">
                {items.map(([key, label, desc]) => (
                    <ToggleRow
                        key={key}
                        label={label}
                        description={desc}
                        checked={prefs[key]}
                        onChange={() => toggle(key)}
                    />
                ))}
            </div>
        </section>
    );

    return (
        <form onSubmit={(e) => e.preventDefault()}>

            <PanelHeader
                title="Notification Preferences"
                subtitle="Choose how and when you want to be notified."
            />

            <div className="px-6 sm:px-8 py-8 flex flex-col gap-8">

                <Section
                    title="Email Notifications"
                    subtitle="Sent to your registered email address."
                    items={emailItems}
                />

                <Section
                    title="In-App Notifications"
                    subtitle="Shown inside the Staff Portal."
                    items={appItems}
                />

                <SelectField
                    label="Reminder Timing"
                    helper="How far in advance should reminders be sent?"
                    value={prefs.timing}
                    onChange={(v) => setPrefs((p) => ({ ...p, timing: v }))}
                    options={["15 minutes before", "30 minutes before", "1 hour before", "2 hours before", "1 day before"]}
                    maxWidth
                />

            </div>

            <PanelFooter onDiscard={() => setPrefs(defaults)} />

        </form>
    );
}

/* ------------------------------------------------------------------ */
/* 3. Calendar Preferences Panel                                       */
/* ------------------------------------------------------------------ */
function CalendarPanel() {
    const defaults = {
        defaultView: "Week",
        weekStart: "Monday",
        workingHoursStart: "09:00",
        workingHoursEnd: "18:00",
        slotDuration: "30 minutes",
        showWeekends: true,
        bufferTime: "10 minutes",
    };

    const [prefs, setPrefs] = useState(defaults);

    const set = (key, value) =>
        setPrefs((prev) => ({ ...prev, [key]: value }));

    const toggle = (key) =>
        setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));

    return (
        <form onSubmit={(e) => e.preventDefault()}>

            <PanelHeader
                title="Calendar Preferences"
                subtitle="Customize how your calendar looks and behaves."
            />

            <div className="px-6 sm:px-8 py-8 flex flex-col gap-8">

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SelectField
                        label="Default View"
                        value={prefs.defaultView}
                        onChange={(v) => set("defaultView", v)}
                        options={["Day", "Week", "Month"]}
                    />
                    <SelectField
                        label="Week Starts On"
                        value={prefs.weekStart}
                        onChange={(v) => set("weekStart", v)}
                        options={["Monday", "Sunday", "Saturday"]}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-bold text-navy mb-2">
                            Working Hours Start
                        </label>
                        <input
                            type="time"
                            value={prefs.workingHoursStart}
                            onChange={(e) => set("workingHoursStart", e.target.value)}
                            className="w-full bg-white border border-gray/30 rounded-lg px-4 py-3 text-sm text-navy outline-none focus:border-navy"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-navy mb-2">
                            Working Hours End
                        </label>
                        <input
                            type="time"
                            value={prefs.workingHoursEnd}
                            onChange={(e) => set("workingHoursEnd", e.target.value)}
                            className="w-full bg-white border border-gray/30 rounded-lg px-4 py-3 text-sm text-navy outline-none focus:border-navy"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SelectField
                        label="Slot Duration"
                        value={prefs.slotDuration}
                        onChange={(v) => set("slotDuration", v)}
                        options={["15 minutes", "30 minutes", "45 minutes", "60 minutes"]}
                    />
                    <SelectField
                        label="Buffer Time Between Appointments"
                        value={prefs.bufferTime}
                        onChange={(v) => set("bufferTime", v)}
                        options={["None", "5 minutes", "10 minutes", "15 minutes", "30 minutes"]}
                    />
                </div>

                <section>
                    <h3 className="text-sm font-bold text-navy">Display</h3>
                    <p className="text-xs text-slate mt-1 mb-4">
                        Control what shows on your calendar.
                    </p>

                    <div className="divide-y divide-gray/10 border border-gray/20 rounded-lg overflow-hidden">
                        <ToggleRow
                            label="Show weekends"
                            description="Display Saturday and Sunday columns in week view."
                            checked={prefs.showWeekends}
                            onChange={() => toggle("showWeekends")}
                        />
                    </div>
                </section>

            </div>

            <PanelFooter onDiscard={() => setPrefs(defaults)} />

        </form>
    );
}

/* ------------------------------------------------------------------ */
/* 4. Privacy Panel                                                    */
/* ------------------------------------------------------------------ */
function PrivacyPanel() {
    const defaults = {
        profileVisible: true,
        showEmail: false,
        showPhone: false,
        allowCustomerMessages: true,
        shareAvailability: true,
    };

    const [prefs, setPrefs] = useState(defaults);

    const toggle = (key) =>
        setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));

    const items = [
        ["profileVisible", "Public profile visibility", "Allow customers to see your basic profile information."],
        ["showEmail", "Show email address", "Display your email address on your public profile."],
        ["showPhone", "Show phone number", "Display your phone number on your public profile."],
        ["allowCustomerMessages", "Allow customer messages", "Let customers send you direct messages through the portal."],
        ["shareAvailability", "Share availability", "Allow customers to see your available slots when booking."],
    ];

    return (
        <form onSubmit={(e) => e.preventDefault()}>

            <PanelHeader
                title="Privacy"
                subtitle="Control what information is visible to customers."
            />

            <div className="px-6 sm:px-8 py-8 flex flex-col gap-6">

                <div className="divide-y divide-gray/10 border border-gray/20 rounded-lg overflow-hidden">
                    {items.map(([key, label, desc]) => (
                        <ToggleRow
                            key={key}
                            label={label}
                            description={desc}
                            checked={prefs[key]}
                            onChange={() => toggle(key)}
                        />
                    ))}
                </div>

                <div className="bg-gold/10 border border-gold/40 rounded-lg px-4 sm:px-5 py-4">
                    <p className="text-xs text-amber-800 leading-relaxed">
                        <strong>Note:</strong> Your name and role are always visible to customers you've had appointments with.
                    </p>
                </div>

            </div>

            <PanelFooter onDiscard={() => setPrefs(defaults)} />

        </form>
    );
}

/* ------------------------------------------------------------------ */
/* 5. Security Panel                                                   */
/* ------------------------------------------------------------------ */
function SecurityPanel() {
    const [form, setForm] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [twoFA, setTwoFA] = useState(false);
    const [loginAlerts, setLoginAlerts] = useState(true);

    const set = (key, value) =>
        setForm((prev) => ({ ...prev, [key]: value }));

    const handleDiscard = () =>
        setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });

    const sessions = [
        { device: "Chrome · Windows", location: "Karachi, PK", time: "Active now", current: true },
        { device: "Safari · iPhone", location: "Karachi, PK", time: "2 hours ago", current: false },
        { device: "Firefox · MacOS", location: "Lahore, PK", time: "Yesterday", current: false },
    ];

    return (
        <form onSubmit={(e) => e.preventDefault()}>

            <PanelHeader
                title="Security"
                subtitle="Manage your password, two-factor authentication and active sessions."
            />

            <div className="px-6 sm:px-8 py-8 flex flex-col gap-10">

                {/* Change Password */}
                <section>
                    <h3 className="text-sm font-bold text-navy">Change Password</h3>
                    <p className="text-xs text-slate mt-1 mb-4">
                        Use at least 8 characters with a mix of letters, numbers, and symbols.
                    </p>

                    <div className="flex flex-col gap-4 max-w-[420px]">

                        <div>
                            <label className="block text-sm font-bold text-navy mb-2">
                                Current Password
                            </label>
                            <input
                                type="password"
                                value={form.currentPassword}
                                onChange={(e) => set("currentPassword", e.target.value)}
                                className="w-full bg-white border border-gray/30 rounded-lg px-4 py-3 text-sm text-navy outline-none focus:border-navy"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-navy mb-2">
                                New Password
                            </label>
                            <input
                                type="password"
                                value={form.newPassword}
                                onChange={(e) => set("newPassword", e.target.value)}
                                className="w-full bg-white border border-gray/30 rounded-lg px-4 py-3 text-sm text-navy outline-none focus:border-navy"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-navy mb-2">
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                value={form.confirmPassword}
                                onChange={(e) => set("confirmPassword", e.target.value)}
                                className="w-full bg-white border border-gray/30 rounded-lg px-4 py-3 text-sm text-navy outline-none focus:border-navy"
                            />
                        </div>

                    </div>
                </section>

                {/* Two-Factor + Alerts */}
                <section>
                    <h3 className="text-sm font-bold text-navy">Authentication</h3>
                    <p className="text-xs text-slate mt-1 mb-4">
                        Add extra protection to your account.
                    </p>

                    <div className="divide-y divide-gray/10 border border-gray/20 rounded-lg overflow-hidden">
                        <ToggleRow
                            label="Two-factor authentication"
                            description="Require a verification code from your phone when logging in."
                            checked={twoFA}
                            onChange={() => setTwoFA((v) => !v)}
                        />
                        <ToggleRow
                            label="Login alerts"
                            description="Send an email whenever a new device logs into your account."
                            checked={loginAlerts}
                            onChange={() => setLoginAlerts((v) => !v)}
                        />
                    </div>
                </section>

                {/* Active Sessions */}
                <section>
                    <h3 className="text-sm font-bold text-navy">Active Sessions</h3>
                    <p className="text-xs text-slate mt-1 mb-4">
                        Devices currently signed into your account.
                    </p>

                    <div className="divide-y divide-gray/10 border border-gray/20 rounded-lg overflow-hidden">

                        {sessions.map((session, idx) => (
                            <div
                                key={idx}
                                className="flex items-center justify-between gap-4 px-4 sm:px-5 py-4 hover:bg-beige/30 transition"
                            >
                                <div>
                                    <p className="text-sm font-bold text-navy">
                                        {session.device}
                                        {session.current && (
                                            <span className="ml-2 text-[10px] font-bold uppercase bg-green-50 text-green-700 px-2 py-0.5 rounded-full">
                                                Current
                                            </span>
                                        )}
                                    </p>
                                    <p className="text-xs text-slate mt-1">
                                        {session.location} · {session.time}
                                    </p>
                                </div>

                                {!session.current && (
                                    <button
                                        type="button"
                                        className="text-xs font-bold text-red-600 hover:text-red-700 transition"
                                    >
                                        Revoke
                                    </button>
                                )}
                            </div>
                        ))}

                    </div>
                </section>

            </div>

            <PanelFooter onDiscard={handleDiscard} />

        </form>
    );
}

/* ------------------------------------------------------------------ */
/* Inline Sidebar component (Timeora Staff Portal)                     */
/* ------------------------------------------------------------------ */
function Sidebar({ navItems }) {
    return (
        <div className="w-64 h-full bg-navy flex flex-col">

            {/* Brand */}
            <div className="px-6 pt-8 pb-8 text-center">

                <h2 className="font-serif text-2xl text-gold">
                    Timeora
                </h2>

                <p className="text-[10px] tracking-[0.2em] text-white/60 mt-1 uppercase">
                    Staff Portal
                </p>

            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 flex flex-col gap-1 overflow-y-auto">

                {navItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.label}
                            to={item.to}
                            className={`
                                relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold transition
                                ${
                                    item.active
                                        ? "bg-white/10 text-gold"
                                        : "text-white/70 hover:bg-white/5 hover:text-white"
                                }
                            `}
                        >
                            {item.active && (
                                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r bg-gold" />
                            )}

                            <Icon className="w-4 h-4 shrink-0" />
                            {item.label}
                        </Link>
                    );
                })}

            </nav>

            {/* Logout */}
            <div className="px-3 py-4 border-t border-white/10">

                <button
                    type="button"
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-bold text-white/70 hover:bg-white/5 hover:text-white transition"
                >
                    <LogOut className="w-4 h-4 shrink-0" />
                    Logout
                </button>

            </div>

        </div>
    );
}

export default StaffSettings;