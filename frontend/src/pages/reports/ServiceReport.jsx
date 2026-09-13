import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    Calendar,
    CalendarCheck,
    CheckCircle2,
    ChevronDown,
    ChevronRight,
    Clock,
    Download,
    Scissors,
    XCircle,
} from "lucide-react";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import StatCard from "../../components/dashboard/StatCard";
import api from "../../services/api";

const mockServiceData = [
    {
        serviceId: "SRV-0001",
        name: "Initial Consultation",
        category: "Consultation",
        bookings: 42,
        completed: 35,
        cancelled: 4,
        noShow: 3,
        duration: "60 min",
        revenue: "Rs. 210,000",
    },
    {
        serviceId: "SRV-0002",
        name: "Specialist Therapy",
        category: "Therapy",
        bookings: 31,
        completed: 27,
        cancelled: 2,
        noShow: 2,
        duration: "90 min",
        revenue: "Rs. 320,000",
    },
    {
        serviceId: "SRV-0003",
        name: "Standard Checkup",
        category: "General",
        bookings: 25,
        completed: 21,
        cancelled: 3,
        noShow: 1,
        duration: "30 min",
        revenue: "Rs. 125,000",
    },
    {
        serviceId: "SRV-0004",
        name: "Follow-up Review",
        category: "Consultation",
        bookings: 22,
        completed: 19,
        cancelled: 2,
        noShow: 1,
        duration: "45 min",
        revenue: "Rs. 132,000",
    },
    {
        serviceId: "SRV-0005",
        name: "Wellness Assessment",
        category: "Wellness",
        bookings: 18,
        completed: 15,
        cancelled: 2,
        noShow: 1,
        duration: "60 min",
        revenue: "Rs. 108,000",
    },
    {
        serviceId: "SRV-0006",
        name: "Physical Therapy",
        category: "Therapy",
        bookings: 15,
        completed: 12,
        cancelled: 2,
        noShow: 1,
        duration: "60 min",
        revenue: "Rs. 90,000",
    },
    {
        serviceId: "SRV-0007",
        name: "Health Screening",
        category: "Screening",
        bookings: 11,
        completed: 9,
        cancelled: 1,
        noShow: 1,
        duration: "45 min",
        revenue: "Rs. 66,000",
    },
    {
        serviceId: "SRV-0008",
        name: "Nutrition Consultation",
        category: "Wellness",
        bookings: 9,
        completed: 8,
        cancelled: 1,
        noShow: 0,
        duration: "45 min",
        revenue: "Rs. 54,000",
    },
];

function ServiceReport() {
    const [periodFilter, setPeriodFilter] = useState("month");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [dateRange, setDateRange] = useState({
        start: "2026-08-01",
        end: "2026-08-21",
    });

    const [serviceFilter, setServiceFilter] = useState("all");

    const [currentPage, setCurrentPage] = useState(1);

    const [reportSummary, setReportSummary] = useState(null);
    const [serviceData, setServiceData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setServiceData(mockServiceData);
    }, []);

    useEffect(() => {
        async function fetchServiceReport() {
            setLoading(true);

            try {
                const params = {
                    period: periodFilter,
                    start_date: dateRange.start,
                    end_date: dateRange.end,
                    service:
                        serviceFilter !== "all"
                            ? serviceFilter
                            : undefined,
                    page: currentPage,
                };

                /*
                const [summaryResponse, serviceResponse] =
                    await Promise.all([
                        api.get("/company/reports/services/summary", {
                            params,
                        }),
                        api.get("/company/reports/services", {
                            params,
                        }),
                    ]);

                setReportSummary(summaryResponse.data);

                setServiceData(
                    serviceResponse.data.data || []
                );
                */
            } catch (error) {
                // TODO: show reusable error notification
            } finally {
                setLoading(false);
            }
        }

        // Enable when backend service report APIs are ready.
        // fetchServiceReport();
    }, [
        periodFilter,
        dateRange.start,
        dateRange.end,
        serviceFilter,
        currentPage,
    ]);

    const filteredServices = serviceData.filter((service) => {
        if (serviceFilter === "all") {
            return true;
        }

        return service.name === serviceFilter;
    });

    const statCards = [
        {
            label: "TOTAL SERVICES",
            value: reportSummary?.total_services ?? 24,
            icon: Scissors,
            iconBg: "bg-gray/10",
            iconColor: "text-slate",
        },
        {
            label: "TOTAL BOOKINGS",
            value: reportSummary?.total_bookings ?? 173,
            icon: CalendarCheck,
            iconBg: "bg-gray/10",
            iconColor: "text-slate",
        },
        {
            label: "COMPLETED",
            value: reportSummary?.completed ?? 146,
            icon: CheckCircle2,
            iconBg: "bg-green-50",
            iconColor: "text-green-600",
        },
        {
            label: "CANCELLED",
            value: reportSummary?.cancelled ?? 17,
            icon: XCircle,
            iconBg: "bg-red-50",
            iconColor: "text-red-500",
        },
        {
            label: "TOTAL REVENUE",
            value: reportSummary?.revenue ?? "Rs. 1,105,000",
            icon: Clock,
            iconBg: "bg-gold/15",
            iconColor: "text-amber-600",
        },
    ];

    async function handleExport(event) {
        event.preventDefault();

        try {
            const response = await api.get(
                "/company/reports/services/export?format=csv",
                {
                    responseType: "blob",
                    params: {
                        start_date: dateRange.start,
                        end_date: dateRange.end,
                        service:
                            serviceFilter !== "all"
                                ? serviceFilter
                                : undefined,
                    },
                }
            );

            const url = window.URL.createObjectURL(
                new Blob([response.data])
            );

            const link = document.createElement("a");

            link.href = url;

            link.setAttribute(
                "download",
                "timeora-service-report.csv"
            );

            document.body.appendChild(link);

            link.click();

            link.remove();

            window.URL.revokeObjectURL(url);
        } catch (error) {
            // TODO: show reusable error notification
        }
    }

    function getCompletionRate(service) {
        if (!service.bookings) {
            return 0;
        }

        return Math.round(
            (service.completed / service.bookings) * 100
        );
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

                <Topbar
                    onMenuClick={() => setSidebarOpen(true)}
                    showBell
                    simpleProfileIcon
                    searchPlaceholder="Search..."
                />

                <main className="flex-1 bg-beige px-4 py-5 sm:px-6 md:px-8 md:py-6">

                    {/* Breadcrumb */}
                    <div className="flex flex-wrap items-center gap-2 mb-5">

                        <Link
                            to="/reports"
                            className="text-xs font-bold uppercase tracking-wide text-slate hover:text-navy transition"
                        >
                            Reports &amp; Analytics
                        </Link>

                        <ChevronRight className="w-3 h-3 text-gray" />

                        <span className="text-xs text-navy">
                            Service Report
                        </span>

                    </div>

                    {/* Header */}
                    <div className="flex flex-col gap-5 mb-6 lg:flex-row lg:items-start lg:justify-between">

                        <div>
                            <Link
                                to="/reports"
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate hover:text-navy transition mb-3"
                            >
                                <ArrowLeft className="w-3.5 h-3.5" />
                                Back to Reports
                            </Link>

                            <h1 className="font-serif text-2xl text-navy sm:text-3xl md:text-4xl">
                                Service Report
                            </h1>

                            <p className="text-sm text-slate mt-1.5 max-w-[520px]">
                                Analyze service popularity, appointment
                                performance, and revenue generated.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:flex-col lg:items-end">

                            {/* Date Range */}
                            <button
                                type="button"
                                className="bg-white border border-gray/30 rounded-lg px-4 py-2.5 flex items-center justify-center gap-2 text-sm font-bold text-navy hover:border-navy transition"
                            >
                                <Calendar className="w-4 h-4 shrink-0" />

                                <span className="whitespace-nowrap">
                                    {dateRange.start} — {dateRange.end}
                                </span>

                                <ChevronDown className="w-3.5 h-3.5 shrink-0" />
                            </button>

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
                            const isActive =
                                periodFilter === period.key;

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

                    {/* Summary Cards */}
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

                    {/* Service Performance */}
                    <div className="bg-white rounded-xl border border-gray/20 shadow-sm overflow-hidden">

                        {/* Header */}
                        <div className="p-5 sm:p-6 border-b border-gray/20">

                            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                                <div>
                                    <h2 className="font-serif text-lg text-navy sm:text-xl">
                                        Service Performance
                                    </h2>

                                    <p className="text-xs text-slate mt-1">
                                        Detailed performance and revenue
                                        breakdown for each service.
                                    </p>
                                </div>

                                <select
                                    value={serviceFilter}
                                    onChange={(event) => {
                                        setServiceFilter(event.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="h-9 w-full sm:w-auto rounded-lg border border-gray/30 bg-white px-3 text-xs font-bold text-navy outline-none focus:border-navy"
                                >
                                    <option value="all">
                                        All Services
                                    </option>

                                    {mockServiceData.map((service) => (
                                        <option
                                            key={service.serviceId}
                                            value={service.name}
                                        >
                                            {service.name}
                                        </option>
                                    ))}
                                </select>

                            </div>

                        </div>

                        {/* Loading */}
                        {loading && (
                            <div className="px-6 py-3 border-b border-gray/20 bg-beige/30">
                                <p className="text-xs font-bold text-slate">
                                    Loading service report...
                                </p>
                            </div>
                        )}

                        {/* Table */}
                        <div className="overflow-x-auto">

                            <table className="w-full min-w-[1100px]">

                                <thead>

                                    <tr className="bg-beige/50">

                                        <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">
                                            Service
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">
                                            Bookings
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">
                                            Completed
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">
                                            Cancelled
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">
                                            No-show
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">
                                            Completion
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">
                                            Duration
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">
                                            Revenue
                                        </th>

                                    </tr>

                                </thead>

                                <tbody className="divide-y divide-gray/10">

                                    {filteredServices.length > 0 ? (
                                        filteredServices.map((service) => (
                                            <tr
                                                key={service.serviceId}
                                                className="hover:bg-beige/30 transition"
                                            >

                                                {/* Service */}
                                                <td className="px-6 py-4">
                                                    <p className="text-sm font-bold text-navy">
                                                        {service.name}
                                                    </p>

                                                    <p className="text-xs text-slate mt-0.5">
                                                        {service.category}
                                                    </p>

                                                    <p className="text-[11px] text-gray mt-0.5">
                                                        {service.serviceId}
                                                    </p>
                                                </td>

                                                {/* Bookings */}
                                                <td className="px-6 py-4 text-sm font-bold text-navy">
                                                    {service.bookings}
                                                </td>

                                                {/* Completed */}
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-green-700">
                                                        <CheckCircle2 className="w-4 h-4" />
                                                        {service.completed}
                                                    </span>
                                                </td>

                                                {/* Cancelled */}
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-red-600">
                                                        <XCircle className="w-4 h-4" />
                                                        {service.cancelled}
                                                    </span>
                                                </td>

                                                {/* No Show */}
                                                <td className="px-6 py-4 text-sm font-bold text-amber-700">
                                                    {service.noShow}
                                                </td>

                                                {/* Completion */}
                                                <td className="px-6 py-4">
                                                    <div className="w-28">
                                                        <div className="flex items-center justify-between mb-1">
                                                            <span className="text-xs font-bold text-navy">
                                                                {getCompletionRate(service)}%
                                                            </span>
                                                        </div>

                                                        <div className="h-1.5 bg-beige rounded-full overflow-hidden">
                                                            <div
                                                                className="h-full bg-navy rounded-full"
                                                                style={{
                                                                    width: `${getCompletionRate(
                                                                        service
                                                                    )}%`,
                                                                }}
                                                            />
                                                        </div>
                                                    </div>
                                                </td>

                                                {/* Duration */}
                                                <td className="px-6 py-4">
                                                    <span className="inline-flex items-center gap-1.5 text-sm text-slate">
                                                        <Clock className="w-4 h-4" />
                                                        {service.duration}
                                                    </span>
                                                </td>

                                                {/* Revenue */}
                                                <td className="px-6 py-4 text-sm font-bold text-navy">
                                                    {service.revenue}
                                                </td>

                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="8"
                                                className="px-6 py-12 text-center"
                                            >
                                                <p className="text-sm font-bold text-navy">
                                                    No service data found.
                                                </p>

                                                <p className="text-xs text-slate mt-1">
                                                    Try changing the selected
                                                    service.
                                                </p>
                                            </td>
                                        </tr>
                                    )}

                                </tbody>

                            </table>

                        </div>

                        {/* Footer */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-5 sm:px-6 py-4 border-t border-gray/20">

                            <p className="text-xs text-slate">
                                Showing 1 to {filteredServices.length} of{" "}
                                {reportSummary?.total_services ?? 24}{" "}
                                services
                            </p>

                            <div className="flex items-center gap-1 flex-wrap">

                                <button
                                    type="button"
                                    disabled={currentPage === 1}
                                    onClick={() =>
                                        setCurrentPage((page) =>
                                            Math.max(1, page - 1)
                                        )
                                    }
                                    className="px-3 py-1.5 rounded-md text-xs font-bold text-slate hover:bg-beige disabled:opacity-40 disabled:cursor-not-allowed transition"
                                >
                                    Prev
                                </button>

                                {[1, 2, 3].map((page) => (
                                    <button
                                        key={page}
                                        type="button"
                                        onClick={() =>
                                            setCurrentPage(page)
                                        }
                                        className={`
                                            w-8
                                            h-8
                                            rounded-md
                                            text-xs
                                            font-bold
                                            transition
                                            ${
                                                currentPage === page
                                                    ? "bg-navy text-white"
                                                    : "text-slate hover:bg-beige"
                                            }
                                        `}
                                    >
                                        {page}
                                    </button>
                                ))}

                                <span className="px-2 text-xs text-slate">
                                    ...
                                </span>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setCurrentPage((page) => page + 1)
                                    }
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

export default ServiceReport;