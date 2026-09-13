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
    UserX,
    XCircle,
} from "lucide-react";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import StatCard from "../../components/dashboard/StatCard";
import api from "../../services/api";

function AppointmentReport() {

    const [periodFilter, setPeriodFilter] = useState("month");

    const [dateRange, setDateRange] = useState({
        start: "2026-08-01",
        end: "2026-08-21",
    });

    const [staffFilter, setStaffFilter] = useState("all");
    const [serviceFilter, setServiceFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");

    const [currentPage, setCurrentPage] = useState(1);

    const [reportSummary, setReportSummary] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);

    const appointmentData = [
        {
            date: "21 Aug 2026",
            time: "09:00 AM",
            id: "#APP-1042",
            customer: "Eleanor Vance",
            service: "Initial Consultation",
            staff: "Dr. Aris Thorne",
            status: "Completed",
            payment: "Rs. 15,000",
        },
        {
            date: "21 Aug 2026",
            time: "10:30 AM",
            id: "#APP-1043",
            customer: "Marcus Sterling",
            service: "Follow-up Review",
            staff: "Dr. Sarah Chen",
            status: "Pending",
            payment: null,
        },
        {
            date: "20 Aug 2026",
            time: "02:15 PM",
            id: "#APP-1040",
            customer: "Clara Bow",
            service: "Specialist Therapy",
            staff: "Dr. Aris Thorne",
            status: "Completed",
            payment: "Rs. 32,000",
        },
        {
            date: "20 Aug 2026",
            time: "04:00 PM",
            id: "#APP-1041",
            customer: "Julian Beck",
            service: "Standard Checkup",
            staff: "Dr. James Wilson",
            status: "Cancelled",
            payment: null,
        },
        {
            date: "19 Aug 2026",
            time: "11:00 AM",
            id: "#APP-1038",
            customer: "Victoria Page",
            service: "Initial Consultation",
            staff: "Dr. Sarah Chen",
            status: "No-show",
            payment: "Rs. 5,000",
            paymentNote: "(Fee)",
        },
        {
            date: "18 Aug 2026",
            time: "09:30 AM",
            id: "#APP-1037",
            customer: "Daniel Brooks",
            service: "Standard Checkup",
            staff: "Dr. James Wilson",
            status: "Completed",
            payment: "Rs. 8,000",
        },
        {
            date: "18 Aug 2026",
            time: "01:00 PM",
            id: "#APP-1036",
            customer: "Amelia Rose",
            service: "Follow-up Review",
            staff: "Dr. Sarah Chen",
            status: "Completed",
            payment: "Rs. 12,000",
        },
        {
            date: "17 Aug 2026",
            time: "03:30 PM",
            id: "#APP-1035",
            customer: "Henry Adams",
            service: "Specialist Therapy",
            staff: "Dr. Aris Thorne",
            status: "Cancelled",
            payment: null,
        },
    ];

    useEffect(() => {
        setAppointments(appointmentData);
    }, []);

    useEffect(() => {
        async function fetchAppointmentReport() {
            setLoading(true);

            try {
                const params = {
                    period: periodFilter,
                    start_date: dateRange.start,
                    end_date: dateRange.end,
                    staff:
                        staffFilter !== "all"
                            ? staffFilter
                            : undefined,
                    service:
                        serviceFilter !== "all"
                            ? serviceFilter
                            : undefined,
                    status:
                        statusFilter !== "all"
                            ? statusFilter
                            : undefined,
                    page: currentPage,
                };

                /*
                const [summaryResponse, appointmentResponse] =
                    await Promise.all([
                        api.get("/company/reports/appointments/summary", {
                            params,
                        }),
                        api.get("/company/reports/appointments", {
                            params,
                        }),
                    ]);

                setReportSummary(summaryResponse.data);
                setAppointments(
                    appointmentResponse.data.data || []
                );
                */
            } catch (error) {
                // TODO: show reusable error notification
            } finally {
                setLoading(false);
            }
        }

        // Enable when backend appointment report APIs are ready.
        // fetchAppointmentReport();
    }, [
        periodFilter,
        dateRange.start,
        dateRange.end,
        staffFilter,
        serviceFilter,
        statusFilter,
        currentPage,
    ]);

    const filteredAppointments = appointments.filter((appointment) => {

        const matchesStaff =
            staffFilter === "all" ||
            appointment.staff === staffFilter;

        const matchesService =
            serviceFilter === "all" ||
            appointment.service === serviceFilter;

        const matchesStatus =
            statusFilter === "all" ||
            appointment.status === statusFilter;

        return (
            matchesStaff &&
            matchesService &&
            matchesStatus
        );
    });

    const statCards = [
        {
            label: "TOTAL APPOINTMENTS",
            value: reportSummary?.total_appointments ?? 128,
            icon: CalendarCheck,
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

    async function handleExport(event) {
        event.preventDefault();

        try {
            const response = await api.get(
                "/company/reports/appointments/export?format=csv",
                {
                    responseType: "blob",
                    params: {
                        start_date: dateRange.start,
                        end_date: dateRange.end,
                        staff:
                            staffFilter !== "all"
                                ? staffFilter
                                : undefined,
                        service:
                            serviceFilter !== "all"
                                ? serviceFilter
                                : undefined,
                        status:
                            statusFilter !== "all"
                                ? statusFilter
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
                "timeora-appointment-report.csv"
            );

            document.body.appendChild(link);
            link.click();

            link.remove();

            window.URL.revokeObjectURL(url);
        } catch (error) {
            // TODO: show reusable error notification
        }
    }

    function getStatusStyle(status) {

        if (status === "Completed") {
            return "bg-green-50 text-green-700";
        }

        if (status === "Pending") {
            return "bg-blue-50 text-blue-700";
        }

        if (status === "Cancelled") {
            return "bg-red-50 text-red-600";
        }

        if (status === "No-show") {
            return "bg-gold/15 text-amber-700";
        }

        return "bg-gray/10 text-slate";
    }

    return (
        <div className="min-h-screen flex bg-beige">

            <Sidebar
                companyName="Shifa Clinic"
                activeItem="Reports"
            />

            <div className="flex-1 min-w-0">

                <Topbar
                    showBell
                    simpleProfileIcon
                    searchPlaceholder="Search..."
                />

                <main className="bg-beige px-4 sm:px-6 lg:px-8 py-6">

                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 mb-5">

                        <Link
                            to="/reports"
                            className="text-xs font-bold uppercase tracking-wide text-slate hover:text-navy transition"
                        >
                            Reports & Analytics
                        </Link>

                        <ChevronRight className="w-3 h-3 text-gray" />

                        <span className="text-xs text-navy">
                            Appointment Report
                        </span>

                    </div>

                    {/* Header */}
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 mb-6">

                        <div>

                            <Link
                                to="/reports"
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate hover:text-navy transition mb-3"
                            >
                                <ArrowLeft className="w-3.5 h-3.5" />
                                Back to Reports
                            </Link>

                            <h1 className="font-serif text-4xl text-navy">
                                Appointment Report
                            </h1>

                            <p className="text-sm text-slate mt-1.5 max-w-[520px]">
                                Detailed overview of scheduled, completed,
                                cancelled, and missed appointments.
                            </p>

                        </div>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">

                            {/* Date Range */}
                            <button
                                type="button"
                                className="bg-white border border-gray/30 rounded-lg px-4 py-2.5 flex items-center justify-center gap-2 text-sm font-bold text-navy hover:border-navy transition"
                            >
                                <Calendar className="w-4 h-4" />

                                <span>
                                    {dateRange.start} — {dateRange.end}
                                </span>

                                <ChevronDown className="w-3.5 h-3.5" />
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

                    {/* Period Filters */}
                    <div className="flex items-center gap-6 border-b border-gray/20 pb-3 mb-6 overflow-x-auto">

                        {[
                            {
                                key: "today",
                                label: "Today",
                            },
                            {
                                key: "week",
                                label: "This Week",
                            },
                            {
                                key: "month",
                                label: "Monthly",
                            },
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

                    {/* Main Report */}
                    <div className="bg-white rounded-xl border border-gray/20 shadow-sm overflow-hidden">

                        {/* Report Header */}
                        <div className="p-6 border-b border-gray/20">

                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                                <div>
                                    <h2 className="font-serif text-xl text-navy">
                                        Appointment Details
                                    </h2>

                                    <p className="text-xs text-slate mt-1">
                                        All appointments within the selected
                                        reporting period.
                                    </p>
                                </div>

                                {/* Filters */}
                                <div className="flex flex-wrap gap-3">

                                    {/* Staff */}
                                    <select
                                        value={staffFilter}
                                        onChange={(event) => {
                                            setStaffFilter(
                                                event.target.value
                                            );
                                            setCurrentPage(1);
                                        }}
                                        className="h-9 rounded-lg border border-gray/30 bg-white px-3 text-xs font-bold text-navy outline-none focus:border-navy"
                                    >
                                        <option value="all">
                                            All Staff
                                        </option>

                                        <option value="Dr. Aris Thorne">
                                            Dr. Aris Thorne
                                        </option>

                                        <option value="Dr. Sarah Chen">
                                            Dr. Sarah Chen
                                        </option>

                                        <option value="Dr. James Wilson">
                                            Dr. James Wilson
                                        </option>
                                    </select>

                                    {/* Service */}
                                    <select
                                        value={serviceFilter}
                                        onChange={(event) => {
                                            setServiceFilter(
                                                event.target.value
                                            );
                                            setCurrentPage(1);
                                        }}
                                        className="h-9 rounded-lg border border-gray/30 bg-white px-3 text-xs font-bold text-navy outline-none focus:border-navy"
                                    >
                                        <option value="all">
                                            All Services
                                        </option>

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

                                    {/* Status */}
                                    <select
                                        value={statusFilter}
                                        onChange={(event) => {
                                            setStatusFilter(
                                                event.target.value
                                            );
                                            setCurrentPage(1);
                                        }}
                                        className="h-9 rounded-lg border border-gray/30 bg-white px-3 text-xs font-bold text-navy outline-none focus:border-navy"
                                    >
                                        <option value="all">
                                            All Status
                                        </option>

                                        <option value="Completed">
                                            Completed
                                        </option>

                                        <option value="Pending">
                                            Pending
                                        </option>

                                        <option value="Cancelled">
                                            Cancelled
                                        </option>

                                        <option value="No-show">
                                            No-show
                                        </option>
                                    </select>

                                </div>

                            </div>

                        </div>

                        {/* Loading */}
                        {loading && (
                            <div className="px-6 py-3 border-b border-gray/20 bg-beige/30">
                                <p className="text-xs font-bold text-slate">
                                    Loading appointment report...
                                </p>
                            </div>
                        )}

                        {/* Table */}
                        <div className="overflow-x-auto">

                            <table className="w-full min-w-[1100px]">

                                <thead>

                                    <tr className="bg-beige/50">

                                        <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">
                                            Date
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">
                                            Appointment ID
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

                                    {filteredAppointments.length > 0 ? (
                                        filteredAppointments.map(
                                            (appointment) => (
                                                <tr
                                                    key={appointment.id}
                                                    className="hover:bg-beige/30 transition"
                                                >

                                                    {/* Date */}
                                                    <td className="px-6 py-4">

                                                        <p className="text-sm font-bold text-navy">
                                                            {appointment.date}
                                                        </p>

                                                        <p className="text-xs text-slate mt-0.5">
                                                            {appointment.time}
                                                        </p>

                                                    </td>

                                                    {/* ID */}
                                                    <td className="px-6 py-4 text-sm font-bold text-navy">
                                                        {appointment.id}
                                                    </td>

                                                    {/* Customer */}
                                                    <td className="px-6 py-4">

                                                        <p className="text-sm font-bold text-navy">
                                                            {appointment.customer}
                                                        </p>

                                                    </td>

                                                    {/* Service */}
                                                    <td className="px-6 py-4 text-sm text-slate">
                                                        {appointment.service}
                                                    </td>

                                                    {/* Staff */}
                                                    <td className="px-6 py-4 text-sm text-slate">
                                                        {appointment.staff}
                                                    </td>

                                                    {/* Status */}
                                                    <td className="px-6 py-4">

                                                        <span
                                                            className={`
                                                                inline-flex
                                                                rounded-full
                                                                px-2.5
                                                                py-1
                                                                text-xs
                                                                font-bold
                                                                uppercase
                                                                ${getStatusStyle(
                                                                    appointment.status
                                                                )}
                                                            `}
                                                        >
                                                            {appointment.status}
                                                        </span>

                                                    </td>

                                                    {/* Payment */}
                                                    <td className="px-6 py-4">

                                                        {appointment.payment ? (
                                                            <div>

                                                                <p className="text-sm font-bold text-navy">
                                                                    {
                                                                        appointment.payment
                                                                    }
                                                                </p>

                                                                {appointment.paymentNote && (
                                                                    <p className="text-xs text-gray mt-0.5">
                                                                        {
                                                                            appointment.paymentNote
                                                                        }
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
                                            )
                                        )
                                    ) : (
                                        <tr>
                                            <td
                                                colSpan="7"
                                                className="px-6 py-12 text-center"
                                            >
                                                <p className="text-sm font-bold text-navy">
                                                    No appointments found.
                                                </p>

                                                <p className="text-xs text-slate mt-1">
                                                    Try changing your filters.
                                                </p>
                                            </td>
                                        </tr>
                                    )}

                                </tbody>

                            </table>

                        </div>

                        {/* Pagination */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-6 py-4 border-t border-gray/20">

                            <p className="text-xs text-slate">
                                Showing 1 to {filteredAppointments.length} of{" "}
                                {reportSummary?.total_appointments ?? 128}{" "}
                                entries
                            </p>

                            <div className="flex items-center gap-1">

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
                                        setCurrentPage(
                                            (page) => page + 1
                                        )
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

export default AppointmentReport;