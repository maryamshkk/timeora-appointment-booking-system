import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    Calendar,
    CalendarCheck,
    CheckCircle2,
    ChevronRight,
    Clock,
    Download,
    UserX,
    XCircle,
} from "lucide-react";
import {
    AreaChart, Area, BarChart, Bar,
    CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer,
} from "recharts";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import StatCard from "../../components/dashboard/StatCard";
import api from "../../services/api";

const REFERENCE_TODAY = new Date("2026-08-21T00:00:00");
const toISO = (d) => new Date(d).toISOString().slice(0, 10);

/* Trend + status charts — mock for now, API will replace */
const trendData = [
    { date: "01 Aug", appointments: 12, completed: 10 },
    { date: "05 Aug", appointments: 15, completed: 13 },
    { date: "09 Aug", appointments: 18, completed: 15 },
    { date: "13 Aug", appointments: 22, completed: 19 },
    { date: "17 Aug", appointments: 19, completed: 16 },
    { date: "21 Aug", appointments: 26, completed: 22 },
];

const statusData = [
    { status: "Completed", count: 94 },
    { status: "Pending", count: 15 },
    { status: "Cancelled", count: 12 },
    { status: "No-show", count: 7 },
];

const appointmentData = [
    { date: "21 Aug 2026", time: "09:00 AM", iso: "2026-08-21", id: "#APP-1042", customer: "Eleanor Vance", service: "Initial Consultation", staff: "Dr. Aris Thorne", status: "Completed", payment: "Rs. 15,000" },
    { date: "21 Aug 2026", time: "10:30 AM", iso: "2026-08-21", id: "#APP-1043", customer: "Marcus Sterling", service: "Follow-up Review", staff: "Dr. Sarah Chen", status: "Pending", payment: null },
    { date: "20 Aug 2026", time: "02:15 PM", iso: "2026-08-20", id: "#APP-1040", customer: "Clara Bow", service: "Specialist Therapy", staff: "Dr. Aris Thorne", status: "Completed", payment: "Rs. 32,000" },
    { date: "20 Aug 2026", time: "04:00 PM", iso: "2026-08-20", id: "#APP-1041", customer: "Julian Beck", service: "Standard Checkup", staff: "Dr. James Wilson", status: "Cancelled", payment: null },
    { date: "19 Aug 2026", time: "11:00 AM", iso: "2026-08-19", id: "#APP-1038", customer: "Victoria Page", service: "Initial Consultation", staff: "Dr. Sarah Chen", status: "No-show", payment: "Rs. 5,000", paymentNote: "(Fee)" },
    { date: "18 Aug 2026", time: "09:30 AM", iso: "2026-08-18", id: "#APP-1037", customer: "Daniel Brooks", service: "Standard Checkup", staff: "Dr. James Wilson", status: "Completed", payment: "Rs. 8,000" },
    { date: "18 Aug 2026", time: "01:00 PM", iso: "2026-08-18", id: "#APP-1036", customer: "Amelia Rose", service: "Follow-up Review", staff: "Dr. Sarah Chen", status: "Completed", payment: "Rs. 12,000" },
    { date: "17 Aug 2026", time: "03:30 PM", iso: "2026-08-17", id: "#APP-1035", customer: "Henry Adams", service: "Specialist Therapy", staff: "Dr. Aris Thorne", status: "Cancelled", payment: null },
];

function AppointmentReport() {
    const [periodFilter, setPeriodFilter] = useState("month");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [dateRange, setDateRange] = useState({ start: "2026-08-01", end: "2026-08-21" });
    const [staffFilter, setStaffFilter] = useState("all");
    const [serviceFilter, setServiceFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [reportSummary] = useState(null);
    const [appointments] = useState(appointmentData);
    const [loading] = useState(false);

    /* API — commented, mock chalta rahega */
    useEffect(() => {
        // TODO: enable when backend ready
        // async function fetchAppointmentReport() {
        //     setLoading(true);
        //     try {
        //         const params = { period: periodFilter, start_date: dateRange.start, end_date: dateRange.end, page: currentPage };
        //         const [s, a] = await Promise.all([
        //             api.get("/company/reports/appointments/summary", { params }),
        //             api.get("/company/reports/appointments", { params }),
        //         ]);
        //         setReportSummary(s.data);
        //         setAppointments(a.data.data || []);
        //     } catch {} finally { setLoading(false); }
        // }
        // fetchAppointmentReport();
    }, [periodFilter, dateRange.start, dateRange.end, staffFilter, serviceFilter, statusFilter, currentPage]);

    const statCards = [
        { label: "TOTAL APPOINTMENTS", value: reportSummary?.total_appointments ?? 128, icon: CalendarCheck, iconBg: "bg-gray/10", iconColor: "text-slate" },
        { label: "COMPLETED", value: reportSummary?.completed ?? 94, icon: CheckCircle2, iconBg: "bg-green-50", iconColor: "text-green-600" },
        { label: "CANCELLED", value: reportSummary?.cancelled ?? 12, icon: XCircle, iconBg: "bg-red-50", iconColor: "text-red-500" },
        { label: "NO-SHOW", value: reportSummary?.no_show ?? 7, icon: UserX, iconBg: "bg-gold/15", iconColor: "text-amber-600" },
        { label: "PENDING", value: reportSummary?.pending ?? 15, icon: Clock, iconBg: "bg-gray/10", iconColor: "text-slate" },
    ];

    /* Period range */
    const getPeriodRange = () => {
        const t = new Date(REFERENCE_TODAY);
        if (periodFilter === "today") return { start: toISO(t), end: toISO(t) };
        if (periodFilter === "week") {
            const s = new Date(t); s.setDate(s.getDate() - 6);
            return { start: toISO(s), end: toISO(t) };
        }
        return {
            start: toISO(new Date(t.getFullYear(), t.getMonth(), 1)),
            end: toISO(new Date(t.getFullYear(), t.getMonth() + 1, 0)),
        };
    };

    const periodRange = getPeriodRange();

    const filteredAppointments = appointments.filter((a) =>
        (staffFilter === "all" || a.staff === staffFilter) &&
        (serviceFilter === "all" || a.service === serviceFilter) &&
        (statusFilter === "all" || a.status === statusFilter) &&
        a.iso >= periodRange.start && a.iso <= periodRange.end &&
        a.iso >= dateRange.start && a.iso <= dateRange.end
    );

    const handleExport = async () => {
        // TODO: axios GET /api/company/reports/appointments/export?format=csv
    };

    const getStatusStyle = (status) => {
        if (status === "Completed") return "bg-green-50 text-green-700";
        if (status === "Pending") return "bg-blue-50 text-blue-700";
        if (status === "Cancelled") return "bg-red-50 text-red-600";
        if (status === "No-show") return "bg-gold/15 text-amber-700";
        return "bg-gray/10 text-slate";
    };

    const statusColors = {
        Completed: "#16a34a",
        Pending: "#3b82f6",
        Cancelled: "#ef4444",
        "No-show": "#d97706",
    };

    return (
        <div className="min-h-screen flex bg-beige">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block lg:flex-shrink-0">
                <Sidebar companyName="Shifa Clinic" activeItem="Reports" />
            </div>

            {/* Mobile Sidebar */}
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
                    {/* Breadcrumb */}
                    <div className="flex flex-wrap items-center gap-2 mb-5">
                        <Link to="/company/reports" className="text-xs font-bold uppercase tracking-wide text-slate hover:text-navy transition">Reports &amp; Analytics</Link>
                        <ChevronRight className="w-3 h-3 text-gray" />
                        <span className="text-xs text-navy">Appointment Report</span>
                    </div>

                    {/* Header */}
                    <div className="flex flex-col gap-5 mb-6 lg:flex-row lg:items-start lg:justify-between">
                        <div>


                            <h1 className="font-serif text-2xl text-navy sm:text-3xl md:text-4xl">Appointment Report</h1>

                            <p className="text-sm text-slate mt-1.5 max-w-[520px]">Detailed overview of scheduled, completed, cancelled, and missed appointments.</p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                            {/* Date pickers */}
                            <div className="bg-white border border-gray/30 rounded-lg px-3 py-2 flex items-center gap-2 text-sm font-bold text-navy hover:border-navy transition">
                                <Calendar className="w-4 h-4 shrink-0 text-slate" />
                                <input type="date" value={dateRange.start} max={dateRange.end} onChange={(e) => { setDateRange({ ...dateRange, start: e.target.value }); setCurrentPage(1); }} className="bg-transparent text-xs font-bold text-navy outline-none w-[110px]" />
                                <span className="text-slate">—</span>
                                <input type="date" value={dateRange.end} min={dateRange.start} onChange={(e) => { setDateRange({ ...dateRange, end: e.target.value }); setCurrentPage(1); }} className="bg-transparent text-xs font-bold text-navy outline-none w-[110px]" />
                            </div>

                            {/* Export */}
                            <button onClick={handleExport} className="bg-navy text-white px-5 py-2.5 rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:bg-gold hover:text-navy transition">
                                <Download className="w-4 h-4" /> Export
                            </button>
                        </div>
                    </div>

                    {/* Period Filters */}
                    <div className="flex items-center gap-6 border-b border-gray/20 pb-3 mb-6 overflow-x-auto">
                        {[{ key: "today", label: "Today" }, { key: "week", label: "This Week" }, { key: "month", label: "Monthly" }].map((p) => (
                            <button key={p.key} onClick={() => { setPeriodFilter(p.key); setCurrentPage(1); }} className={`text-sm font-bold whitespace-nowrap pb-3 -mb-3 border-b-2 transition ${periodFilter === p.key ? "text-navy border-navy" : "text-slate border-transparent hover:text-navy"}`}>
                                {p.label}
                            </button>
                        ))}
                    </div>

                    {/* Stat Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
                        {statCards.map((c) => (
                            <StatCard key={c.label} label={c.label} value={c.value} icon={c.icon} iconBg={c.iconBg} iconColor={c.iconColor} />
                        ))}
                    </div>

                    {/* Charts Row */}
                    <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* Trend */}
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

                        {/* Status Breakdown */}
                        <div className="rounded-xl border border-gray/20 bg-white p-5 shadow-sm sm:p-6">
                            <h2 className="font-serif text-lg font-bold text-navy mb-1">Status Breakdown</h2>
                            <p className="text-xs text-slate mb-5">Appointments by status</p>

                            <div className="h-[240px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={statusData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#E4E2DD" />
                                        <XAxis dataKey="status" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#43474E" }} />
                                        <YAxis axisLine={false} tickLine={false} allowDecimals={false} tick={{ fontSize: 12, fill: "#43474E" }} />
                                        <Tooltip cursor={{ fill: "rgba(254,212,136,0.15)" }} contentStyle={{ borderRadius: 8, border: "1px solid #C3C6CF", fontSize: 12 }} />
                                        <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                                            {statusData.map((entry) => (
                                                <Bar key={entry.status} dataKey="count" fill={statusColors[entry.status]} />
                                            ))}
                                        </Bar>
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>

                    {/* Main Table */}
                    <div className="bg-white rounded-xl border border-gray/20 shadow-sm overflow-hidden">
                        <div className="p-5 sm:p-6 border-b border-gray/20">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                <div>
                                    <h2 className="font-serif text-lg text-navy sm:text-xl">Appointment Details</h2>
                                    <p className="text-xs text-slate mt-1">All appointments within the selected reporting period.</p>
                                </div>

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

                        {loading && (
                            <div className="px-6 py-3 border-b border-gray/20 bg-beige/30">
                                <p className="text-xs font-bold text-slate">Loading appointment report...</p>
                            </div>
                        )}

                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[1100px]">
                                <thead>
                                    <tr className="bg-beige/50">
                                        {["Date", "Appointment ID", "Customer", "Service", "Staff", "Status", "Payment"].map((h) => (
                                            <th key={h} className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">{h}</th>
                                        ))}
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray/10">
                                    {filteredAppointments.length > 0 ? (
                                        filteredAppointments.map((a) => (
                                            <tr key={a.id} className="hover:bg-beige/30 transition">
                                                <td className="px-6 py-4">
                                                    <p className="text-sm font-bold text-navy">{a.date}</p>
                                                    <p className="text-xs text-slate mt-0.5">{a.time}</p>
                                                </td>
                                                <td className="px-6 py-4 text-sm font-bold text-navy">{a.id}</td>
                                                <td className="px-6 py-4 text-sm font-bold text-navy">{a.customer}</td>
                                                <td className="px-6 py-4 text-sm text-slate">{a.service}</td>
                                                <td className="px-6 py-4 text-sm text-slate">{a.staff}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold uppercase ${getStatusStyle(a.status)}`}>{a.status}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {a.payment ? (
                                                        <>
                                                            <p className="text-sm font-bold text-navy">{a.payment}</p>
                                                            {a.paymentNote && <p className="text-xs text-gray mt-0.5">{a.paymentNote}</p>}
                                                        </>
                                                    ) : <span className="text-sm text-gray">—</span>}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7" className="px-6 py-12 text-center">
                                                <p className="text-sm font-bold text-navy">No appointments found.</p>
                                                <p className="text-xs text-slate mt-1">Try changing your filters.</p>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-5 sm:px-6 py-4 border-t border-gray/20">
                            <p className="text-xs text-slate">Showing 1 to {filteredAppointments.length} of {reportSummary?.total_appointments ?? 128} entries</p>

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

export default AppointmentReport;