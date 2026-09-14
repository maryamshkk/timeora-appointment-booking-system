import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
    Calendar,
    CalendarDays,
    CheckCircle2,
    ChevronDown,
    ChevronRight,
    Clock,
    Download,
    UserX,
    XCircle,
    ArrowRight,
    Loader2,
    AlertCircle,
} from "lucide-react";
import {
    AreaChart, Area, BarChart, Bar,
    CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import StatCard from "../../components/dashboard/StatCard";
import { useReportOverview } from "../../hooks/company/useReports";

const activityData = [
    { date: "21 Aug", time: "09:00 AM", id: "#APP-1042", customer: "Eleanor Vance", service: "Initial Consultation", staff: "Dr. Aris Thorne", status: "Completed", payment: "Rs. 15,000", iso: "2026-08-21" },
    { date: "21 Aug", time: "10:30 AM", id: "#APP-1043", customer: "Marcus Sterling", service: "Follow-up Review", staff: "Dr. Sarah Chen", status: "Pending", payment: null, iso: "2026-08-21" },
    { date: "20 Aug", time: "02:15 PM", id: "#APP-1040", customer: "Clara Bow", service: "Specialist Therapy", staff: "Dr. Aris Thorne", status: "Completed", payment: "Rs. 32,000", iso: "2026-08-20" },
    { date: "20 Aug", time: "04:00 PM", id: "#APP-1041", customer: "Julian Beck", service: "Standard Checkup", staff: "Dr. James Wilson", status: "Cancelled", payment: null, iso: "2026-08-20" },
    { date: "19 Aug", time: "11:00 AM", id: "#APP-1038", customer: "Victoria Page", service: "Initial Consultation", staff: "Dr. Sarah Chen", status: "No-show", payment: "Rs. 5,000", paymentNote: "(Fee)", iso: "2026-08-19" },
];

const trendData = [
    { date: "01 Aug", appointments: 12, completed: 10 },
    { date: "05 Aug", appointments: 15, completed: 13 },
    { date: "09 Aug", appointments: 18, completed: 15 },
    { date: "13 Aug", appointments: 22, completed: 19 },
    { date: "17 Aug", appointments: 19, completed: 16 },
    { date: "21 Aug", appointments: 26, completed: 22 },
];

const busiestDaysData = [
    { day: "Mon", appointments: 18 },
    { day: "Tue", appointments: 22 },
    { day: "Wed", appointments: 25 },
    { day: "Thu", appointments: 28 },
    { day: "Fri", appointments: 32 },
    { day: "Sat", appointments: 15 },
    { day: "Sun", appointments: 4 },
];

const REFERENCE_TODAY = new Date("2026-08-21T00:00:00");

const toISO = (d) => new Date(d).toISOString().slice(0, 10);

function Reports() {
    const [periodFilter, setPeriodFilter] = useState("month");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [dateRange, setDateRange] = useState({ start: "2026-08-01", end: "2026-08-21" });
    const [staffFilter, setStaffFilter] = useState("all");
    const [serviceFilter, setServiceFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);

    const {
        data: overviewResponse,
        isLoading,
        isError,
        error,
    } = useReportOverview({
        from: dateRange.start,
        to: dateRange.end,
    });

    const overview = overviewResponse?.data;

    useEffect(() => {
        const onDown = (e) => !e.target.closest("[data-date-picker]") && setIsDatePickerOpen(false);
        const onEsc = (e) => e.key === "Escape" && setIsDatePickerOpen(false);
        document.addEventListener("mousedown", onDown);
        document.addEventListener("keydown", onEsc);
        return () => {
            document.removeEventListener("mousedown", onDown);
            document.removeEventListener("keydown", onEsc);
        };
    }, []);

    const statCards = useMemo(() => {
        const appointments = overview?.appointments || {};

        return [
            {
                label: "TOTAL APPTS",
                value: appointments.total ?? 0,
                icon: CalendarDays,
                iconBg: "bg-gray/10",
                iconColor: "text-slate",
            },
            {
                label: "COMPLETED",
                value: appointments.completed ?? 0,
                icon: CheckCircle2,
                iconBg: "bg-green-50",
                iconColor: "text-green-600",
            },
            {
                label: "CANCELLED",
                value: appointments.cancelled ?? 0,
                icon: XCircle,
                iconBg: "bg-red-50",
                iconColor: "text-red-500",
            },
            {
                label: "REJECTED",
                value: appointments.rejected ?? 0,
                icon: UserX,
                iconBg: "bg-gold/15",
                iconColor: "text-amber-600",
            },
            {
                label: "PENDING",
                value: appointments.pending ?? 0,
                icon: Clock,
                iconBg: "bg-gray/10",
                iconColor: "text-slate",
            },
        ];
    }, [overview]);

    const reportCategories = [
        { title: "Appointment Report", description: "Detailed breakdown of all scheduled, completed, and missed appointments.", metric: "128 Entries", path: "/company/reports/appointments" },
        { title: "Staff Report", description: "Performance metrics, hours logged, and revenue generated per staff member.", metric: "8 Active", path: "/company/reports/staff" },
        { title: "Service Report", description: "Popularity and revenue analysis of individual services offered.", metric: "24 Services", path: "/company/reports/services" },
        { title: "Customer Report", description: "Client retention, new acquisitions, and individual lifetime value.", metric: "312 Clients", path: "/company/reports/customers" },
    ];

    const getPeriodRange = () => {
        const t = new Date(REFERENCE_TODAY);
        if (periodFilter === "today") return { start: toISO(t), end: toISO(t) };
        if (periodFilter === "week") {
            const s = new Date(t); s.setDate(s.getDate() - 6);
            return { start: toISO(s), end: toISO(t) };
        }
        return { start: toISO(new Date(t.getFullYear(), t.getMonth(), 1)), end: toISO(new Date(t.getFullYear(), t.getMonth() + 1, 0)) };
    };

    const periodRange = getPeriodRange();

    const filteredActivity = activityData.filter((item) =>
        (staffFilter === "all" || item.staff === staffFilter) &&
        (serviceFilter === "all" || item.service === serviceFilter) &&
        (statusFilter === "all" || item.status === statusFilter) &&
        item.iso >= periodRange.start && item.iso <= periodRange.end &&
        item.iso >= dateRange.start && item.iso <= dateRange.end
    );

    function handleExport() {
        // TODO: no export endpoint yet on the backend
    }

    const apiErrorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "";

    return (
        <div className="min-h-screen flex bg-beige">
            <div className="hidden lg:block lg:flex-shrink-0">
                <Sidebar companyName="Shifa Clinic" activeItem="Reports" />
            </div>

            {sidebarOpen && (
                <>
                    <button onClick={() => setSidebarOpen(false)} className="fixed inset-0 z-30 bg-navy/50 lg:hidden" aria-label="Close menu" />
                    <div className="fixed left-0 top-0 z-40 h-screen w-64 max-w-[80vw] overflow-y-auto lg:hidden">
                        <Sidebar companyName="Shifa Clinic" activeItem="Reports" />
                    </div>
                </>
            )}

            <div className="flex min-w-0 flex-1 flex-col">
                <Topbar onMenuClick={() => setSidebarOpen(true)} showBell simpleProfileIcon searchPlaceholder="Search..." />

                <main className="flex-1 bg-beige px-4 py-5 sm:px-6 md:px-8 md:py-6">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-xs font-bold uppercase tracking-wide text-slate">Reports &amp; Analytics</span>
                        <ChevronRight className="w-3 h-3 text-gray" />
                        <span className="text-xs text-navy">Reports</span>
                    </div>

                    <div className="flex flex-col gap-5 mb-6 lg:flex-row lg:items-start lg:justify-between">
                        <div>
                            <h1 className="font-serif text-2xl text-navy sm:text-3xl md:text-4xl">Reports</h1>
                            <p className="text-sm text-slate mt-1.5 max-w-[440px]">Review your company's appointment and operational performance.</p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:flex-col lg:items-end">
                            <div className="relative" data-date-picker>
                                <button onClick={() => setIsDatePickerOpen(!isDatePickerOpen)} className="flex items-center gap-2 rounded-lg border border-gray/30 bg-white px-4 py-2.5 text-sm font-bold text-navy hover:border-navy transition">
                                    <Calendar className="h-4 w-4 shrink-0 text-slate" />
                                    <span className="whitespace-nowrap">{dateRange.start} — {dateRange.end}</span>
                                    <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isDatePickerOpen ? "rotate-180" : ""}`} />
                                </button>

                                {isDatePickerOpen && (
                                    <div className="absolute right-0 top-full z-30 mt-2 w-64 rounded-lg border border-gray/30 bg-white p-4 shadow-lg">
                                        <p className="mb-3 text-xs font-bold uppercase tracking-wide text-slate">Select Date Range</p>
                                        <div className="flex flex-col gap-3">
                                            <input type="date" value={dateRange.start} max={dateRange.end} onChange={(e) => { setDateRange({ ...dateRange, start: e.target.value }); setCurrentPage(1); }} className="h-10 w-full rounded-lg border border-gray/40 px-3 text-sm text-navy outline-none focus:border-navy" />
                                            <input type="date" value={dateRange.end} min={dateRange.start} onChange={(e) => { setDateRange({ ...dateRange, end: e.target.value }); setCurrentPage(1); }} className="h-10 w-full rounded-lg border border-gray/40 px-3 text-sm text-navy outline-none focus:border-navy" />
                                        </div>
                                    </div>
                                )}
                            </div>

                            <button onClick={handleExport} className="flex items-center justify-center gap-2 rounded-lg bg-navy px-5 py-2.5 text-sm font-bold text-white hover:bg-gold hover:text-navy transition">
                                <Download className="h-4 w-4" /> Export
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center gap-6 border-b border-gray/20 pb-3 mb-6 overflow-x-auto">
                        {[{ key: "today", label: "Today" }, { key: "week", label: "This Week" }, { key: "month", label: "Monthly" }].map((p) => (
                            <button key={p.key} onClick={() => { setPeriodFilter(p.key); setCurrentPage(1); }} className={`text-sm font-bold whitespace-nowrap pb-3 -mb-3 border-b-2 transition ${periodFilter === p.key ? "text-navy border-navy" : "text-slate border-transparent hover:text-navy"}`}>
                                {p.label}
                            </button>
                        ))}
                    </div>

                    {isError && !isLoading && (
                        <div className="mb-4 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                            <p className="text-sm text-red-700">
                                {apiErrorMessage || "Failed to load report overview."}
                            </p>
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                        {isLoading ? (
                            <div className="col-span-full flex items-center justify-center gap-3 rounded-xl border border-gray/20 bg-white py-10">
                                <Loader2 className="h-5 w-5 animate-spin text-navy" />
                                <span className="text-sm text-slate">Loading overview...</span>
                            </div>
                        ) : (
                            statCards.map((c) => (
                                <StatCard key={c.label} label={c.label} value={c.value} icon={c.icon} iconBg={c.iconBg} iconColor={c.iconColor} />
                            ))
                        )}
                    </div>

                    <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <div className="rounded-xl border border-gray/20 bg-white p-5 shadow-sm sm:p-6">
                            <h2 className="font-serif text-lg font-bold text-navy mb-1">Appointment Trend</h2>
                            <p className="text-xs text-slate mb-5">Scheduled vs completed</p>

                            <div className="h-[240px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#E4E2DD" />
                                        <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#43474E" }} />
                                        <YAxis axisLine={false} tickLine={false} allowDecimals={false} tick={{ fontSize: 12, fill: "#43474E" }} />
                                        <Tooltip contentStyle={{ borderRadius: 8, border: "1px solid #C3C6CF", fontSize: 12 }} />
                                        <Area type="monotone" dataKey="appointments" stroke="#000C1E" strokeWidth={2} fill="#000C1E" fillOpacity={0.06} name="Appointments" />
                                        <Area type="monotone" dataKey="completed" stroke="#16a34a" strokeWidth={2} fill="#16a34a" fillOpacity={0.05} name="Completed" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="rounded-xl border border-gray/20 bg-white p-5 shadow-sm sm:p-6">
                            <h2 className="font-serif text-lg font-bold text-navy mb-1">Busiest Days</h2>
                            <p className="text-xs text-slate mb-5">Appointments per weekday</p>

                            <div className="h-[240px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={busiestDaysData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#E4E2DD" />
                                        <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#43474E" }} />
                                        <YAxis axisLine={false} tickLine={false} allowDecimals={false} tick={{ fontSize: 12, fill: "#43474E" }} />
                                        <Tooltip cursor={{ fill: "rgba(254,212,136,0.15)" }} contentStyle={{ borderRadius: 8, border: "1px solid #C3C6CF", fontSize: 12 }} />
                                        <Bar dataKey="appointments" fill="#000C1E" radius={[6, 6, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                        {reportCategories.map((r) => (
                            <div key={r.title} className="bg-white rounded-xl border border-gray/20 shadow-sm p-5 sm:p-6 flex flex-col hover:border-navy hover:shadow-md transition">
                                <h2 className="font-serif text-lg text-navy sm:text-xl">{r.title}</h2>
                                <div className="border-b border-gray/20 my-4" />
                                <p className="text-sm text-slate leading-relaxed flex-grow">{r.description}</p>
                                <div className="flex items-center justify-between mt-6 gap-4">
                                    <span className="text-xs font-bold uppercase tracking-wide text-slate">{r.metric}</span>
                                    <Link to={r.path} className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-navy hover:text-gold transition whitespace-nowrap">
                                        View <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-white rounded-xl border border-gray/20 shadow-sm overflow-hidden">
                        <div className="p-5 sm:p-6 border-b border-gray/20">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                <h2 className="font-serif text-lg text-navy sm:text-xl">Recent Activity</h2>
                                <div className="flex flex-wrap gap-3">
                                    <select value={staffFilter} onChange={(e) => { setStaffFilter(e.target.value); setCurrentPage(1); }} className="h-9 rounded-lg border border-gray/30 bg-white px-3 text-xs font-bold text-navy outline-none focus:border-navy">
                                        <option value="all">All Staff</option>
                                        <option>Dr. Aris Thorne</option>
                                        <option>Dr. Sarah Chen</option>
                                        <option>Dr. James Wilson</option>
                                    </select>
                                    <select value={serviceFilter} onChange={(e) => { setServiceFilter(e.target.value); setCurrentPage(1); }} className="h-9 rounded-lg border border-gray/30 bg-white px-3 text-xs font-bold text-navy outline-none focus:border-navy">
                                        <option value="all">All Services</option>
                                        <option>Initial Consultation</option>
                                        <option>Follow-up Review</option>
                                        <option>Specialist Therapy</option>
                                        <option>Standard Checkup</option>
                                    </select>
                                    <select value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }} className="h-9 rounded-lg border border-gray/30 bg-white px-3 text-xs font-bold text-navy outline-none focus:border-navy">
                                        <option value="all">All Status</option>
                                        <option>Completed</option>
                                        <option>Pending</option>
                                        <option>Cancelled</option>
                                        <option>No-show</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[1000px]">
                                <thead>
                                    <tr className="bg-beige/50">
                                        {["Date", "ID", "Customer", "Service", "Staff", "Status", "Payment"].map((h) => (
                                            <th key={h} className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">{h}</th>
                                        ))}
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray/10">
                                    {filteredActivity.length === 0 ? (
                                        <tr>
                                            <td colSpan={7} className="px-6 py-10 text-center text-sm text-slate">No activity found for the selected filters.</td>
                                        </tr>
                                    ) : filteredActivity.map((item) => (
                                        <tr key={item.id} className="hover:bg-beige/30 transition">
                                            <td className="px-6 py-4">
                                                <p className="text-sm font-bold text-navy">{item.date}</p>
                                                <p className="text-xs text-slate mt-0.5">{item.time}</p>
                                            </td>
                                            <td className="px-6 py-4 text-sm font-bold text-navy">{item.id}</td>
                                            <td className="px-6 py-4 text-sm text-navy">{item.customer}</td>
                                            <td className="px-6 py-4 text-sm text-slate">{item.service}</td>
                                            <td className="px-6 py-4 text-sm text-slate">{item.staff}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold uppercase ${
                                                    item.status === "Completed" ? "bg-green-50 text-green-700"
                                                    : item.status === "Pending" ? "bg-blue-50 text-blue-700"
                                                    : item.status === "Cancelled" ? "bg-red-50 text-red-600"
                                                    : "bg-gold/15 text-amber-700"
                                                }`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.payment ? (
                                                    <>
                                                        <p className="text-sm font-bold text-navy">{item.payment}</p>
                                                        {item.paymentNote && <p className="text-xs text-gray mt-0.5">{item.paymentNote}</p>}
                                                    </>
                                                ) : <span className="text-sm text-gray">—</span>}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-5 sm:px-6 py-4 border-t border-gray/20">
                            <p className="text-xs text-slate">Showing 1 to {filteredActivity.length} of {overview?.appointments?.total ?? 0} entries</p>

                            <div className="flex items-center gap-1 flex-wrap">
                                <button disabled={currentPage === 1} onClick={() => setCurrentPage((p) => Math.max(1, p - 1))} className="px-3 py-1.5 rounded-md text-xs font-bold text-slate hover:bg-beige disabled:opacity-40 disabled:cursor-not-allowed transition">Prev</button>
                                {[1, 2, 3].map((p) => (
                                    <button key={p} onClick={() => setCurrentPage(p)} className={`w-8 h-8 rounded-md text-xs font-bold transition ${currentPage === p ? "bg-navy text-white" : "text-slate hover:bg-beige"}`}>{p}</button>
                                ))}
                                <span className="px-2 text-xs text-slate">...</span>
                                <button onClick={() => setCurrentPage((p) => p + 1)} className="px-3 py-1.5 rounded-md text-xs font-bold text-slate hover:bg-beige transition">Next</button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Reports;