import React, { useEffect, useState } from "react";
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
} from "lucide-react";

import api from "../../services/api";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import StatCard from "../../components/dashboard/StatCard";

const activityData = [
    {
        date: "21 Aug",
        time: "09:00 AM",
        id: "#APP-1042",
        customer: "Eleanor Vance",
        service: "Initial Consultation",
        staff: "Dr. Aris Thorne",
        status: "Completed",
        payment: "Rs. 15,000",
        iso: "2026-08-21",
    },
    {
        date: "21 Aug",
        time: "10:30 AM",
        id: "#APP-1043",
        customer: "Marcus Sterling",
        service: "Follow-up Review",
        staff: "Dr. Sarah Chen",
        status: "Pending",
        payment: null,
        iso: "2026-08-21",
    },
    {
        date: "20 Aug",
        time: "02:15 PM",
        id: "#APP-1040",
        customer: "Clara Bow",
        service: "Specialist Therapy",
        staff: "Dr. Aris Thorne",
        status: "Completed",
        payment: "Rs. 32,000",
        iso: "2026-08-20",
    },
    {
        date: "20 Aug",
        time: "04:00 PM",
        id: "#APP-1041",
        customer: "Julian Beck",
        service: "Standard Checkup",
        staff: "Dr. James Wilson",
        status: "Cancelled",
        payment: null,
        iso: "2026-08-20",
    },
    {
        date: "19 Aug",
        time: "11:00 AM",
        id: "#APP-1038",
        customer: "Victoria Page",
        service: "Initial Consultation",
        staff: "Dr. Sarah Chen",
        status: "No-show",
        payment: "Rs. 5,000",
        paymentNote: "(Fee)",
        iso: "2026-08-19",
    },
];

// Reference "today" — mock data Aug 2026 ka hai, to reference bhi wahi rakha
const REFERENCE_TODAY = new Date("2026-08-21T00:00:00");

function formatDate(date) {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = d.toLocaleString("en-US", { month: "short" });
    return `${day} ${month}`;
}

function toISODate(date) {
    const d = new Date(date);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
}

function Reports() {
    const [periodFilter, setPeriodFilter] = useState("month");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [dateRange, setDateRange] = useState({
        start: "2026-08-01",
        end: "2026-08-21",
    });

    const [staffFilter, setStaffFilter] = useState("all");
    const [serviceFilter, setServiceFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);

    const [reportSummary, setReportSummary] = useState(null);
    const [activity, setActivity] = useState(activityData);
    const [loading, setLoading] = useState(false);

    const statCards = [
        {
            label: "TOTAL APPTS",
            value: reportSummary?.total_appointments ?? 128,
            icon: CalendarDays,
            iconBg: "bg-gray/10",
            iconColor: "text-slate",
        },
        {
            label: "COMPLETED",
            value: reportSummary?.completed ?? 94,
            icon: CheckCircle2,
            iconBg: "bg-green-50",
            iconColor: "text-green-600",
        },
        {
            label: "CANCELLED",
            value: reportSummary?.cancelled ?? 12,
            icon: XCircle,
            iconBg: "bg-red-50",
            iconColor: "text-red-500",
        },
        {
            label: "NO-SHOW",
            value: reportSummary?.no_show ?? 7,
            icon: UserX,
            iconBg: "bg-gold/15",
            iconColor: "text-amber-600",
        },
        {
            label: "PENDING",
            value: reportSummary?.pending ?? 15,
            icon: Clock,
            iconBg: "bg-gray/10",
            iconColor: "text-slate",
        },
    ];

    const reportCategories = [
        {
            title: "Appointment Report",
            description:
                "Detailed breakdown of all scheduled, completed, and missed appointments.",
            metric: "128 Entries",
            path: "/company/reports/appointments",
        },
        {
            title: "Staff Report",
            description:
                "Performance metrics, hours logged, and revenue generated per staff member.",
            metric: "8 Active",
            path: "/company/reports/staff",
        },
        {
            title: "Service Report",
            description:
                "Popularity and revenue analysis of individual services offered.",
            metric: "24 Services",
            path: "/company/reports/services",
        },
        {
            title: "Customer Report",
            description:
                "Client retention, new acquisitions, and individual lifetime value.",
            metric: "312 Clients",
            path: "/company/reports/customers",
        },
    ];

    useEffect(() => {
        async function fetchReports() {
            setLoading(true);

            try {
                const params = {
                    period: periodFilter,
                    start_date: dateRange.start,
                    end_date: dateRange.end,
                    staff: staffFilter !== "all" ? staffFilter : undefined,
                    service: serviceFilter !== "all" ? serviceFilter : undefined,
                    status: statusFilter !== "all" ? statusFilter : undefined,
                    page: currentPage,
                };

                const [summaryResponse, activityResponse] = await Promise.all([
                    api.get("/company/reports/summary", { params }),
                    api.get("/company/reports/activity", { params }),
                ]);

                setReportSummary(summaryResponse.data);
                setActivity(activityResponse.data.data || []);
            } catch (error) {
                // TODO: keep mock data as fallback until backend is connected
            } finally {
                setLoading(false);
            }
        }

        // TODO: enable when backend report APIs are ready
        // fetchReports();
    }, [
        periodFilter,
        dateRange.start,
        dateRange.end,
        staffFilter,
        serviceFilter,
        statusFilter,
        currentPage,
    ]);

    // Period filter — reference date ke hisaab se range nikalo
    function getPeriodRange() {
        const today = new Date(REFERENCE_TODAY);

        if (periodFilter === "today") {
            const iso = toISODate(today);
            return { start: iso, end: iso };
        }

        if (periodFilter === "week") {
            // Last 7 days including today
            const start = new Date(today);
            start.setDate(start.getDate() - 6);

            return {
                start: toISODate(start),
                end: toISODate(today),
            };
        }

        // month → current month
        const start = new Date(today.getFullYear(), today.getMonth(), 1);
        const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);

        return {
            start: toISODate(start),
            end: toISODate(end),
        };
    }

    const periodRange = getPeriodRange();

    const filteredActivity = activity.filter((item) => {
        const matchesStaff =
            staffFilter === "all" || item.staff === staffFilter;

        const matchesService =
            serviceFilter === "all" || item.service === serviceFilter;

        const matchesStatus =
            statusFilter === "all" || item.status === statusFilter;

        // Period match
        const matchesPeriod =
            item.iso >= periodRange.start && item.iso <= periodRange.end;

        // Date range match
        const matchesDateRange =
            item.iso >= dateRange.start && item.iso <= dateRange.end;

        return (
            matchesStaff &&
            matchesService &&
            matchesStatus &&
            matchesPeriod &&
            matchesDateRange
        );
    });

    function handleStartDateChange(event) {
        setDateRange((prev) => ({ ...prev, start: event.target.value }));
        setCurrentPage(1);
    }

    function handleEndDateChange(event) {
        setDateRange((prev) => ({ ...prev, end: event.target.value }));
        setCurrentPage(1);
    }

    async function handleExport(event) {
        event.preventDefault();

        try {
            const response = await api.get(
                "/company/reports/export?format=csv",
                {
                    responseType: "blob",
                }
            );

            const url = window.URL.createObjectURL(
                new Blob([response.data])
            );

            const link = document.createElement("a");

            link.href = url;
            link.setAttribute("download", "timeora-reports.csv");

            document.body.appendChild(link);
            link.click();
            link.remove();

            window.URL.revokeObjectURL(url);
        } catch (error) {
            // TODO: show reusable error notification
        }
    }

    return (
        <div className="min-h-screen flex bg-beige">

            {/* Desktop Sidebar */}
            <div className="hidden lg:block lg:flex-shrink-0">
                <Sidebar
                    companyName="Shifa Clinic"
                    activeItem="Reports"
                />
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
                        <Sidebar
                            companyName="Shifa Clinic"
                            activeItem="Reports"
                        />
                    </div>
                </>
            )}

            {/* Main Area */}
            <div className="flex min-w-0 flex-1 flex-col">

                {/* Topbar */}
                <Topbar
                    onMenuClick={() => setSidebarOpen(true)}
                    showBell
                    simpleProfileIcon
                    searchPlaceholder="Search..."
                />

                <main className="flex-1 bg-beige px-4 py-5 sm:px-6 md:px-8 md:py-6">

                    {/* Breadcrumb */}
                    <div className="flex flex-wrap items-center gap-2 mb-2">

                        <span className="text-xs font-bold uppercase tracking-wide text-slate">
                            Reports &amp; Analytics
                        </span>

                        <ChevronRight className="w-3 h-3 text-gray" />

                        <span className="text-xs text-navy">
                            Reports
                        </span>

                    </div>

                    {/* Header */}
                    <div className="flex flex-col gap-5 mb-6 lg:flex-row lg:items-start lg:justify-between">

                        {/* Heading */}
                        <div>
                            <h1 className="font-serif text-2xl text-navy sm:text-3xl md:text-4xl">
                                Reports
                            </h1>

                            <p className="text-sm text-slate mt-1.5 max-w-[440px]">
                                Review your company's appointment and operational
                                performance.
                            </p>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:flex-col lg:items-end">

                            {/* Date Range — real date pickers */}
                            <div className="bg-white border border-gray/30 rounded-lg px-3 py-2 flex items-center gap-2 text-sm font-bold text-navy hover:border-navy transition">

                                <Calendar className="w-4 h-4 shrink-0 text-slate" />

                                <input
                                    type="date"
                                    value={dateRange.start}
                                    max={dateRange.end}
                                    onChange={handleStartDateChange}
                                    className="bg-transparent text-xs font-bold text-navy outline-none w-[110px]"
                                />

                                <span className="text-slate">—</span>

                                <input
                                    type="date"
                                    value={dateRange.end}
                                    min={dateRange.start}
                                    onChange={handleEndDateChange}
                                    className="bg-transparent text-xs font-bold text-navy outline-none w-[110px]"
                                />

                            </div>

                            {/* Export */}
                            <button
                                type="button"
                                onClick={handleExport}
                                className="bg-navy text-white px-5 py-2.5 rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:bg-gold hover:text-navy transition"
                            >
                                <Download className="w-4 h-4" />
                                Export
                            </button>

                        </div>

                    </div>

                    {/* Period Filter */}
                    <div className="flex items-center gap-6 border-b border-gray/20 pb-3 mb-6 overflow-x-auto">

                        {[
                            { key: "today", label: "Today" },
                            { key: "week", label: "This Week" },
                            { key: "month", label: "Monthly" },
                        ].map((period) => {
                            const isActive = periodFilter === period.key;

                            return (
                                <button
                                    key={period.key}
                                    type="button"
                                    onClick={() => {
                                        setPeriodFilter(period.key);
                                        setCurrentPage(1);
                                    }}
                                    className={`
                                        text-sm
                                        font-bold
                                        whitespace-nowrap
                                        pb-3
                                        -mb-3
                                        border-b-2
                                        transition
                                        ${
                                            isActive
                                                ? "text-navy border-navy"
                                                : "text-slate border-transparent hover:text-navy"
                                        }
                                    `}
                                >
                                    {period.label}
                                </button>
                            );
                        })}

                    </div>

                    {/* Statistics */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">

                        {statCards.map((card) => (
                            <StatCard
                                key={card.label}
                                label={card.label}
                                value={card.value}
                                icon={card.icon}
                                iconBg={card.iconBg}
                                iconColor={card.iconColor}
                            />
                        ))}

                    </div>

                    {/* Report Categories */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">

                        {reportCategories.map((report) => (
                            <div
                                key={report.title}
                                className="bg-white rounded-xl border border-gray/20 shadow-sm p-5 sm:p-6 flex flex-col"
                            >
                                <h2 className="font-serif text-lg text-navy sm:text-xl">
                                    {report.title}
                                </h2>

                                <div className="border-b border-gray/20 my-4" />

                                <p className="text-sm text-slate leading-relaxed flex-grow">
                                    {report.description}
                                </p>

                                <div className="flex items-center justify-between mt-6 gap-4">

                                    <span className="text-xs font-bold uppercase tracking-wide text-slate">
                                        {report.metric}
                                    </span>

                                    <Link
                                        to={report.path}
                                        className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-navy hover:text-gold transition whitespace-nowrap"
                                    >
                                        View
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>

                                </div>
                            </div>
                        ))}

                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white rounded-xl border border-gray/20 shadow-sm overflow-hidden">

                        {/* Header */}
                        <div className="p-5 sm:p-6 border-b border-gray/20">
                            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                                <h2 className="font-serif text-lg text-navy sm:text-xl">
                                    Recent Activity
                                </h2>

                                <div className="flex flex-wrap gap-3">

                                    <select
                                        value={staffFilter}
                                        onChange={(event) => {
                                            setStaffFilter(event.target.value);
                                            setCurrentPage(1);
                                        }}
                                        className="h-9 rounded-lg border border-gray/30 bg-white px-3 text-xs font-bold text-navy outline-none focus:border-navy"
                                    >
                                        <option value="all">All Staff</option>
                                        <option value="Dr. Aris Thorne">Dr. Aris Thorne</option>
                                        <option value="Dr. Sarah Chen">Dr. Sarah Chen</option>
                                        <option value="Dr. James Wilson">Dr. James Wilson</option>
                                    </select>

                                    <select
                                        value={serviceFilter}
                                        onChange={(event) => {
                                            setServiceFilter(event.target.value);
                                            setCurrentPage(1);
                                        }}
                                        className="h-9 rounded-lg border border-gray/30 bg-white px-3 text-xs font-bold text-navy outline-none focus:border-navy"
                                    >
                                        <option value="all">All Services</option>
                                        <option value="Initial Consultation">
                                            Initial Consultation
                                        </option>
                                        <option value="Follow-up Review">
                                            Follow-up Review
                                        </option>
                                        <option value="Specialist Therapy">
                                            Specialist Therapy
                                        </option>
                                        <option value="Standard Checkup">
                                            Standard Checkup
                                        </option>
                                    </select>

                                    <select
                                        value={statusFilter}
                                        onChange={(event) => {
                                            setStatusFilter(event.target.value);
                                            setCurrentPage(1);
                                        }}
                                        className="h-9 rounded-lg border border-gray/30 bg-white px-3 text-xs font-bold text-navy outline-none focus:border-navy"
                                    >
                                        <option value="all">All Status</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Pending">Pending</option>
                                        <option value="Cancelled">Cancelled</option>
                                        <option value="No-show">No-show</option>
                                    </select>

                                </div>
                            </div>
                        </div>

                        {/* Loading */}
                        {loading && (
                            <div className="px-6 py-3 border-b border-gray/20 bg-beige/30">
                                <p className="text-xs font-bold text-slate">
                                    Loading report data...
                                </p>
                            </div>
                        )}

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[1000px]">

                                <thead>
                                    <tr className="bg-beige/50">
                                        <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">
                                            Date
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">
                                            ID
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">
                                            Customer
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">
                                            Service
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">
                                            Staff
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">
                                            Status
                                        </th>
                                        <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">
                                            Payment
                                        </th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-gray/10">
                                    {filteredActivity.length === 0 ? (
                                        <tr>
                                            <td
                                                colSpan={7}
                                                className="px-6 py-10 text-center text-sm text-slate"
                                            >
                                                No activity found for the selected filters.
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredActivity.map((item) => (
                                            <tr key={item.id} className="hover:bg-beige/30 transition">

                                                <td className="px-6 py-4">
                                                    <div>
                                                        <p className="text-sm font-bold text-navy">
                                                            {item.date}
                                                        </p>
                                                        <p className="text-xs text-slate mt-0.5">
                                                            {item.time}
                                                        </p>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4 text-sm font-bold text-navy">
                                                    {item.id}
                                                </td>

                                                <td className="px-6 py-4 text-sm text-navy">
                                                    {item.customer}
                                                </td>

                                                <td className="px-6 py-4 text-sm text-slate">
                                                    {item.service}
                                                </td>

                                                <td className="px-6 py-4 text-sm text-slate">
                                                    {item.staff}
                                                </td>

                                                <td className="px-6 py-4">
                                                    <span
                                                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-bold uppercase ${
                                                            item.status === "Completed"
                                                                ? "bg-green-50 text-green-700"
                                                                : item.status === "Pending"
                                                                ? "bg-blue-50 text-blue-700"
                                                                : item.status === "Cancelled"
                                                                ? "bg-red-50 text-red-600"
                                                                : "bg-gold/15 text-amber-700"
                                                        }`}
                                                    >
                                                        {item.status}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-4">
                                                    {item.payment ? (
                                                        <div>
                                                            <p className="text-sm font-bold text-navy">
                                                                {item.payment}
                                                            </p>

                                                            {item.paymentNote && (
                                                                <p className="text-xs text-gray mt-0.5">
                                                                    {item.paymentNote}
                                                                </p>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <span className="text-sm text-gray">
                                                            —
                                                        </span>
                                                    )}
                                                </td>

                                            </tr>
                                        ))
                                    )}
                                </tbody>

                            </table>
                        </div>

                        {/* Pagination */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-5 sm:px-6 py-4 border-t border-gray/20">

                            <p className="text-xs text-slate">
                                Showing 1 to {filteredActivity.length} of{" "}
                                {reportSummary?.total_appointments ?? 128} entries
                            </p>

                            <div className="flex items-center gap-1 flex-wrap">

                                <button
                                    type="button"
                                    disabled={currentPage === 1}
                                    onClick={() =>
                                        setCurrentPage((page) => Math.max(1, page - 1))
                                    }
                                    className="px-3 py-1.5 rounded-md text-xs font-bold text-slate hover:bg-beige disabled:opacity-40 disabled:cursor-not-allowed transition"
                                >
                                    Prev
                                </button>

                                {[1, 2, 3].map((page) => (
                                    <button
                                        key={page}
                                        type="button"
                                        onClick={() => setCurrentPage(page)}
                                        className={`w-8 h-8 rounded-md text-xs font-bold transition ${
                                            currentPage === page
                                                ? "bg-navy text-white"
                                                : "text-slate hover:bg-beige"
                                        }`}
                                    >
                                        {page}
                                    </button>
                                ))}

                                <span className="px-2 text-xs text-slate">
                                    ...
                                </span>

                                <button
                                    type="button"
                                    onClick={() => setCurrentPage((page) => page + 1)}
                                    className="px-3 py-1.5 rounded-md text-xs font-bold text-slate hover:bg-beige transition"
                                >
                                    Next
                                </button>

                            </div>

                        </div>

                    </div>

                </main>
            </div>
        </div>
    );
}

export default Reports;