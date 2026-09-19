import React, { useMemo, useState } from "react";
import {
    Calendar,
    CheckCircle2,
    ChevronDown,
    Clock,
    Download,
    Minus,
    Search,
    TrendingDown,
    TrendingUp,
    XCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
    Cell,
    Pie,
    PieChart,
    ResponsiveContainer,
} from "recharts";

import SuperAdminSidebar from "../../components/superadmin/SuperAdminSidebar";
import SuperAdminTopbar from "../../components/superadmin/SuperAdminTopbar";

function Appointments() {
    const navigate = useNavigate();

    const [stats] = useState({
        total: { value: 12480, deltaPercent: 5.2 },
        today: { value: 186, note: "Normal volume" },
        completed: { value: 9842, deltaPercent: 2.1 },
        cancelled: { value: 1126, deltaPercent: -1.4 },
    });

    const [searchQuery, setSearchQuery] = useState("");

    const [statusFilter, setStatusFilter] = useState("all");
    const [isStatusOpen, setIsStatusOpen] = useState(false);

    const [companyFilter, setCompanyFilter] = useState("all");
    const [isCompanyOpen, setIsCompanyOpen] = useState(false);

    const [staffFilter, setStaffFilter] = useState("all");
    const [isStaffOpen, setIsStaffOpen] = useState(false);

    const [serviceFilter, setServiceFilter] = useState("all");
    const [isServiceOpen, setIsServiceOpen] = useState(false);

    const [dateRange] = useState({
        start: "2026-08-21",
        end: "2026-08-28",
    });
    const [isDateRangeOpen, setIsDateRangeOpen] = useState(false);

    const [appointments] = useState([
        {
            id: "AP-009821",
            customer: "Hina Malik",
            customerInitials: "HM",
            customerColor: "gold",
            customerSlug: "cu-hina",
            company: "Shifa Clinic",
            companySlug: "shifa-clinic",
            service: "Consultation",
            serviceSlug: "consultation",
            staff: "Dr. Sara Ahmed",
            staffSlug: "sara-ahmed",
            date: "21 Aug 2026",
            dateSortKey: "2026-08-21",
            time: "09:00 AM",
            status: "confirmed",
        },
        {
            id: "AP-009820",
            customer: "John Doe",
            customerInitials: "JD",
            customerColor: "gray",
            customerSlug: "cu-john",
            company: "Elite Fitness",
            companySlug: "elite-fitness",
            service: "Personal Training",
            serviceSlug: "personal-training",
            staff: "Mike Tyson",
            staffSlug: "mike-tyson",
            date: "21 Aug 2026",
            dateSortKey: "2026-08-21",
            time: "10:30 AM",
            status: "completed",
        },
        {
            id: "AP-009819",
            customer: "Ali Khan",
            customerInitials: "AK",
            customerColor: "navy",
            customerSlug: "cu-ali",
            company: "Shifa Clinic",
            companySlug: "shifa-clinic",
            service: "Follow-up",
            serviceSlug: "follow-up",
            staff: "Dr. Sara Ahmed",
            staffSlug: "sara-ahmed",
            date: "21 Aug 2026",
            dateSortKey: "2026-08-21",
            time: "11:15 AM",
            status: "cancelled",
        },
    ]);

    const [totalCount] = useState(12480);
    const [currentPage, setCurrentPage] = useState(1);

    const [statusSummary] = useState({
        completed: 78,
        confirmed: 13,
        cancelled: 9,
        totalLabel: "12.4k",
    });

    const [topCompanies] = useState([
        { name: "Shifa Clinic", count: 4250 },
        { name: "Elite Fitness", count: 3120 },
        { name: "Lumina Spa", count: 2840 },
        { name: "Vertex Consulting", count: 1950 },
    ]);

    const pageSize = 25;

    // TODO: Replace seeded appointments + totalCount with a real fetch per page.

    // ─────────────── Derived list ───────────────

    const filteredAppointments = useMemo(() => {
        const search = searchQuery.trim().toLowerCase();

        return appointments.filter((appointment) => {
            const matchesSearch =
                !search ||
                appointment.id.toLowerCase().includes(search) ||
                appointment.customer.toLowerCase().includes(search) ||
                appointment.company.toLowerCase().includes(search) ||
                appointment.service.toLowerCase().includes(search) ||
                appointment.staff.toLowerCase().includes(search);

            const matchesStatus =
                statusFilter === "all" ||
                appointment.status === statusFilter;

            const matchesCompany =
                companyFilter === "all" ||
                appointment.companySlug === companyFilter;

            const matchesStaff =
                staffFilter === "all" ||
                appointment.staffSlug === staffFilter;

            const matchesService =
                serviceFilter === "all" ||
                appointment.serviceSlug === serviceFilter;

            return (
                matchesSearch &&
                matchesStatus &&
                matchesCompany &&
                matchesStaff &&
                matchesService
            );
        });
    }, [
        appointments,
        searchQuery,
        statusFilter,
        companyFilter,
        staffFilter,
        serviceFilter,
    ]);

    // ─────────────── Handlers ───────────────

    function handleExportAppointments() {
        // TODO: Replace with a server-generated CSV when the API is ready.

        const headers = [
            "Appointment ID",
            "Customer",
            "Company",
            "Service",
            "Staff",
            "Date",
            "Time",
            "Status",
        ];

        const rows = filteredAppointments.map((a) => [
            a.id,
            a.customer,
            a.company,
            a.service,
            a.staff,
            a.date,
            a.time,
            getStatusLabel(a.status),
        ]);

        const csvContent = [headers, ...rows]
            .map((row) => row.map((cell) => `"${cell}"`).join(","))
            .join("\n");

        const blob = new Blob([csvContent], {
            type: "text/csv;charset=utf-8;",
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `appointments-${Date.now()}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    function handleViewAppointmentDetails(appointmentId) {
        navigate(`/superadmin/appointments/${appointmentId}`);
    }

    function handleViewCustomerDetails(customerSlug) {
        navigate(`/superadmin/customers/${customerSlug}`);
    }

    function handlePrevPage() {
        setCurrentPage((page) => Math.max(1, page - 1));

        // TODO: Refetch that page from the API.
    }

    function handleNextPage() {
        setCurrentPage((page) => page + 1);

        // TODO: Refetch that page from the API.
    }

    function handleClearFilters() {
        setSearchQuery("");
        setStatusFilter("all");
        setCompanyFilter("all");
        setStaffFilter("all");
        setServiceFilter("all");
    }

    // ─────────────── Helpers ───────────────

    function getStatusStyles(status) {
        if (status === "confirmed") return "bg-blue-50 text-blue-700";
        if (status === "completed") return "bg-gray/10 text-slate";
        if (status === "cancelled") return "bg-red-50 text-red-600";
        return "bg-gray/10 text-slate";
    }

    function getStatusLabel(status) {
        if (status === "confirmed") return "Confirmed";
        if (status === "completed") return "Completed";
        if (status === "cancelled") return "Cancelled";
        return status;
    }

    function getCustomerBadgeStyles(color) {
        if (color === "gold") return "bg-gold text-navy";
        if (color === "navy") return "bg-navy text-white";
        return "bg-gray/30 text-navy";
    }

    const hasActiveFilters =
        searchQuery ||
        statusFilter !== "all" ||
        companyFilter !== "all" ||
        staffFilter !== "all" ||
        serviceFilter !== "all";

    return (
        <div className="min-h-screen bg-beige flex">

            <SuperAdminSidebar activeItem="Appointments" />

            <div className="flex-1 min-w-0 flex flex-col">

                <SuperAdminTopbar unreadCount={3} />

                <main className="flex-1 px-8 py-6">

                    {/* Header */}
                    <div className="flex justify-between items-start gap-6 flex-wrap mb-6">

                        <div>
                            <h1 className="font-serif text-4xl text-navy">
                                Appointments
                            </h1>

                            <p className="text-sm text-slate mt-1.5">
                                Monitor appointment activity across the TIMEORA platform.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={handleExportAppointments}
                            className="
                                bg-white
                                border-2
                                border-navy
                                text-navy
                                font-bold
                                text-sm
                                px-5
                                py-2.5
                                rounded-lg
                                flex
                                items-center
                                gap-2
                                hover:bg-navy
                                hover:text-white
                                transition
                                cursor-pointer
                                flex-shrink-0
                            "
                        >
                            <Download className="w-4 h-4" />
                            Export Appointments
                        </button>

                    </div>

                    {/* Stat Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">

                        {/* Total Appointments */}
                        <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6">
                            <div className="flex justify-between items-center mb-2.5">
                                <span className="text-xs font-bold uppercase tracking-wide text-slate">
                                    Total Appointments
                                </span>

                                <Calendar className="w-[18px] h-[18px] text-navy" />
                            </div>

                            <p className="text-4xl font-bold text-navy mb-2">
                                {stats.total.value.toLocaleString()}
                            </p>

                            <div className="flex items-center gap-1.5">
                                <TrendingUp className="w-3.5 h-3.5 text-green-600" />
                                <span className="text-sm font-bold text-green-700">
                                    +{stats.total.deltaPercent}% from last month
                                </span>
                            </div>
                        </div>

                        {/* Today */}
                        <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6">
                            <div className="flex justify-between items-center mb-2.5">
                                <span className="text-xs font-bold uppercase tracking-wide text-slate">
                                    Today
                                </span>

                                <Clock className="w-[18px] h-[18px] text-navy" />
                            </div>

                            <p className="text-4xl font-bold text-navy mb-2">
                                {stats.today.value}
                            </p>

                            <div className="flex items-center gap-1.5">
                                <Minus className="w-3.5 h-3.5 text-slate" />
                                <span className="text-sm font-bold text-slate">
                                    {stats.today.note}
                                </span>
                            </div>
                        </div>

                        {/* Completed */}
                        <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6">
                            <div className="flex justify-between items-center mb-2.5">
                                <span className="text-xs font-bold uppercase tracking-wide text-slate">
                                    Completed
                                </span>

                                <CheckCircle2 className="w-[18px] h-[18px] text-navy" />
                            </div>

                            <p className="text-4xl font-bold text-navy mb-2">
                                {stats.completed.value.toLocaleString()}
                            </p>

                            <div className="flex items-center gap-1.5">
                                <TrendingUp className="w-3.5 h-3.5 text-green-600" />
                                <span className="text-sm font-bold text-green-700">
                                    +{stats.completed.deltaPercent}% completion rate
                                </span>
                            </div>
                        </div>

                        {/* Cancelled */}
                        <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6">
                            <div className="flex justify-between items-center mb-2.5">
                                <span className="text-xs font-bold uppercase tracking-wide text-slate">
                                    Cancelled
                                </span>

                                <XCircle className="w-[18px] h-[18px] text-navy" />
                            </div>

                            <p className="text-4xl font-bold text-navy mb-2">
                                {stats.cancelled.value.toLocaleString()}
                            </p>

                            <div className="flex items-center gap-1.5">
                                <TrendingDown className="w-3.5 h-3.5 text-red-600" />
                                <span className="text-sm font-bold text-red-600">
                                    {stats.cancelled.deltaPercent}% from last month
                                </span>
                            </div>
                        </div>

                    </div>

                    {/* Table Card */}
                    <div className="bg-white rounded-xl border border-gray/20 shadow-sm overflow-hidden">

                        {/* Filter Section */}
                        <div className="p-6 border-b border-gray/20">

                            {/* Row 1 */}
                            <div className="flex flex-wrap gap-3 mb-3">

                                {/* Search */}
                                <div className="relative flex-1 max-w-sm">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray pointer-events-none" />

                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(event) =>
                                            setSearchQuery(event.target.value)
                                        }
                                        placeholder="Search appointments..."
                                        className="
                                            w-full
                                            border
                                            border-gray
                                            rounded-lg
                                            pl-9
                                            pr-4
                                            py-2.5
                                            text-sm
                                            text-navy
                                            bg-white
                                            outline-none
                                            focus:border-navy
                                        "
                                    />
                                </div>

                                {/* Status */}
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsStatusOpen(!isStatusOpen);
                                            setIsCompanyOpen(false);
                                            setIsStaffOpen(false);
                                            setIsServiceOpen(false);
                                            setIsDateRangeOpen(false);
                                        }}
                                        className="
                                            bg-white border border-gray rounded-lg px-4 py-2.5
                                            text-sm font-bold text-navy flex items-center gap-1.5 cursor-pointer
                                        "
                                    >
                                        Status:{" "}
                                        {statusFilter === "all"
                                            ? "All"
                                            : getStatusLabel(statusFilter)}
                                        <ChevronDown className="w-3.5 h-3.5 text-slate" />
                                    </button>

                                    {isStatusOpen && (
                                        <div className="absolute left-0 top-full mt-2 z-20 w-40 bg-white border border-gray/20 rounded-lg shadow-lg p-1">
                                            {[
                                                { value: "all", label: "All Status" },
                                                { value: "confirmed", label: "Confirmed" },
                                                { value: "completed", label: "Completed" },
                                                { value: "cancelled", label: "Cancelled" },
                                            ].map((option) => (
                                                <button
                                                    key={option.value}
                                                    type="button"
                                                    onClick={() => {
                                                        setStatusFilter(option.value);
                                                        setIsStatusOpen(false);
                                                    }}
                                                    className="w-full text-left px-3 py-2 rounded-md text-sm text-navy hover:bg-beige cursor-pointer"
                                                >
                                                    {option.label}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Company */}
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsCompanyOpen(!isCompanyOpen);
                                            setIsStatusOpen(false);
                                            setIsStaffOpen(false);
                                            setIsServiceOpen(false);
                                            setIsDateRangeOpen(false);
                                        }}
                                        className="
                                            bg-white border border-gray rounded-lg px-4 py-2.5
                                            text-sm font-bold text-navy flex items-center gap-1.5 cursor-pointer
                                        "
                                    >
                                        Company:{" "}
                                        {companyFilter === "all"
                                            ? "All"
                                            : companyFilter === "shifa-clinic"
                                            ? "Shifa Clinic"
                                            : "Elite Fitness"}
                                        <ChevronDown className="w-3.5 h-3.5 text-slate" />
                                    </button>

                                    {isCompanyOpen && (
                                        <div className="absolute left-0 top-full mt-2 z-20 w-44 bg-white border border-gray/20 rounded-lg shadow-lg p-1">
                                            {[
                                                { value: "all", label: "All Companies" },
                                                { value: "shifa-clinic", label: "Shifa Clinic" },
                                                { value: "elite-fitness", label: "Elite Fitness" },
                                            ].map((option) => (
                                                <button
                                                    key={option.value}
                                                    type="button"
                                                    onClick={() => {
                                                        setCompanyFilter(option.value);
                                                        setIsCompanyOpen(false);
                                                    }}
                                                    className="w-full text-left px-3 py-2 rounded-md text-sm text-navy hover:bg-beige cursor-pointer"
                                                >
                                                    {option.label}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Staff */}
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsStaffOpen(!isStaffOpen);
                                            setIsStatusOpen(false);
                                            setIsCompanyOpen(false);
                                            setIsServiceOpen(false);
                                            setIsDateRangeOpen(false);
                                        }}
                                        className="
                                            bg-white border border-gray rounded-lg px-4 py-2.5
                                            text-sm font-bold text-navy flex items-center gap-1.5 cursor-pointer
                                        "
                                    >
                                        Staff:{" "}
                                        {staffFilter === "all"
                                            ? "All"
                                            : staffFilter === "sara-ahmed"
                                            ? "Dr. Sara Ahmed"
                                            : "Mike Tyson"}
                                        <ChevronDown className="w-3.5 h-3.5 text-slate" />
                                    </button>

                                    {isStaffOpen && (
                                        <div className="absolute left-0 top-full mt-2 z-20 w-48 bg-white border border-gray/20 rounded-lg shadow-lg p-1">
                                            {[
                                                { value: "all", label: "All Staff" },
                                                { value: "sara-ahmed", label: "Dr. Sara Ahmed" },
                                                { value: "mike-tyson", label: "Mike Tyson" },
                                            ].map((option) => (
                                                <button
                                                    key={option.value}
                                                    type="button"
                                                    onClick={() => {
                                                        setStaffFilter(option.value);
                                                        setIsStaffOpen(false);
                                                    }}
                                                    className="w-full text-left px-3 py-2 rounded-md text-sm text-navy hover:bg-beige cursor-pointer"
                                                >
                                                    {option.label}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Service */}
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsServiceOpen(!isServiceOpen);
                                            setIsStatusOpen(false);
                                            setIsCompanyOpen(false);
                                            setIsStaffOpen(false);
                                            setIsDateRangeOpen(false);
                                        }}
                                        className="
                                            bg-white border border-gray rounded-lg px-4 py-2.5
                                            text-sm font-bold text-navy flex items-center gap-1.5 cursor-pointer
                                        "
                                    >
                                        Service:{" "}
                                        {serviceFilter === "all"
                                            ? "All"
                                            : serviceFilter === "personal-training"
                                            ? "Personal Training"
                                            : serviceFilter.charAt(0).toUpperCase() +
                                              serviceFilter.slice(1)}
                                        <ChevronDown className="w-3.5 h-3.5 text-slate" />
                                    </button>

                                    {isServiceOpen && (
                                        <div className="absolute left-0 top-full mt-2 z-20 w-48 bg-white border border-gray/20 rounded-lg shadow-lg p-1">
                                            {[
                                                { value: "all", label: "All Services" },
                                                { value: "consultation", label: "Consultation" },
                                                { value: "follow-up", label: "Follow-up" },
                                                { value: "personal-training", label: "Personal Training" },
                                            ].map((option) => (
                                                <button
                                                    key={option.value}
                                                    type="button"
                                                    onClick={() => {
                                                        setServiceFilter(option.value);
                                                        setIsServiceOpen(false);
                                                    }}
                                                    className="w-full text-left px-3 py-2 rounded-md text-sm text-navy hover:bg-beige cursor-pointer"
                                                >
                                                    {option.label}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Clear filters */}
                                {hasActiveFilters && (
                                    <button
                                        type="button"
                                        onClick={handleClearFilters}
                                        className="
                                            text-sm font-bold text-slate
                                            hover:text-navy transition cursor-pointer
                                            px-2
                                        "
                                    >
                                        Clear filters
                                    </button>
                                )}

                            </div>

                            {/* Row 2 — date range */}
                            <div className="relative inline-block">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsDateRangeOpen(!isDateRangeOpen);
                                        setIsStatusOpen(false);
                                        setIsCompanyOpen(false);
                                        setIsStaffOpen(false);
                                        setIsServiceOpen(false);
                                    }}
                                    className="
                                        bg-white border border-gray rounded-lg px-4 py-2.5
                                        text-sm font-bold text-navy flex items-center gap-2 cursor-pointer
                                    "
                                >
                                    <Calendar className="w-4 h-4" />
                                    Aug 21 - Aug 28, 2026
                                </button>

                                {isDateRangeOpen && (
                                    <div className="absolute left-0 top-full mt-2 z-20 w-64 bg-white border border-gray/20 rounded-lg shadow-lg p-3">
                                        <p className="text-xs font-bold uppercase tracking-wide text-slate mb-2">
                                            Date Range
                                        </p>

                                        <p className="text-sm text-navy">
                                            {dateRange.start} → {dateRange.end}
                                        </p>

                                        {/* TODO: wire an actual date-range picker */}
                                    </div>
                                )}
                            </div>

                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">

                            {/* Header */}
                            <div className="grid grid-cols-[110px_1fr_1.3fr_1fr_120px_110px] px-6 py-3 border-b border-gray/20 text-xs font-bold uppercase tracking-wide text-slate min-w-[900px]">
                                <span>Appointment ID</span>
                                <span>Customer</span>
                                <span>Company / Service</span>
                                <span>Staff</span>
                                <span>Date &amp; Time</span>
                                <span>Status</span>
                            </div>

                            {/* Rows */}
                            {filteredAppointments.length > 0 ? (
                                filteredAppointments.map((appointment) => (
                                    <div
                                        key={appointment.id}
                                        className="
                                            grid grid-cols-[110px_1fr_1.3fr_1fr_120px_110px]
                                            px-6 py-4 border-b border-gray/20 last:border-b-0
                                            hover:bg-beige/20 transition min-w-[900px]
                                        "
                                    >
                                        {/* ID — clickable to appointment details */}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleViewAppointmentDetails(
                                                    appointment.id
                                                )
                                            }
                                            className="
                                                text-sm font-bold text-navy self-center
                                                text-left hover:text-gold transition cursor-pointer
                                            "
                                        >
                                            {appointment.id}
                                        </button>

                                        {/* Customer — clickable to customer details */}
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleViewCustomerDetails(
                                                    appointment.customerSlug
                                                )
                                            }
                                            className="
                                                flex items-center gap-3 min-w-0
                                                text-left cursor-pointer
                                            "
                                        >
                                            <div
                                                className={`
                                                    w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold
                                                    ${getCustomerBadgeStyles(appointment.customerColor)}
                                                `}
                                            >
                                                {appointment.customerInitials}
                                            </div>

                                            <span className="text-sm text-navy truncate hover:text-gold transition">
                                                {appointment.customer}
                                            </span>
                                        </button>

                                        {/* Company / Service */}
                                        <div className="min-w-0 self-center">
                                            <p className="text-sm font-bold text-navy">
                                                {appointment.company}
                                            </p>

                                            <p className="text-xs text-slate">
                                                {appointment.service}
                                            </p>
                                        </div>

                                        {/* Staff */}
                                        <span className="text-sm text-navy self-center">
                                            {appointment.staff}
                                        </span>

                                        {/* Date & Time */}
                                        <div className="self-center">
                                            <p className="text-sm text-navy">
                                                {appointment.date}
                                            </p>

                                            <p className="text-xs text-slate">
                                                {appointment.time}
                                            </p>
                                        </div>

                                        {/* Status */}
                                        <span className="self-center">
                                            <span
                                                className={`
                                                    text-xs font-bold px-3 py-1 rounded
                                                    ${getStatusStyles(appointment.status)}
                                                `}
                                            >
                                                {getStatusLabel(appointment.status)}
                                            </span>
                                        </span>
                                    </div>
                                ))
                            ) : (
                                <div className="px-6 py-16 text-center min-w-[900px]">
                                    <p className="text-sm text-slate">
                                        No appointments match the current filters.
                                    </p>
                                </div>
                            )}

                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 border-t border-gray/20 flex justify-between items-center flex-wrap gap-3">

                            <p className="text-sm text-slate">
                                Showing {filteredAppointments.length > 0 ? 1 : 0} to{" "}
                                {filteredAppointments.length} of{" "}
                                {totalCount.toLocaleString()} entries
                            </p>

                            <div className="flex items-center gap-2">

                                <button
                                    type="button"
                                    disabled={currentPage === 1}
                                    onClick={handlePrevPage}
                                    className="
                                        bg-white border border-gray px-4 py-2 rounded-lg
                                        text-sm font-bold text-navy
                                        disabled:opacity-40 disabled:cursor-not-allowed
                                        hover:bg-beige transition cursor-pointer
                                    "
                                >
                                    Prev
                                </button>

                                <button
                                    type="button"
                                    onClick={handleNextPage}
                                    className="
                                        bg-white border border-gray px-4 py-2 rounded-lg
                                        text-sm font-bold text-navy
                                        hover:bg-beige transition cursor-pointer
                                    "
                                >
                                    Next
                                </button>

                            </div>

                        </div>

                    </div>

                    {/* Bottom Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">

                        {/* Status Summary */}
                        <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6">

                            <h2 className="font-serif text-2xl text-navy">
                                Status Summary
                            </h2>

                            <div className="border-b border-gray/20 my-5"></div>

                            <div className="relative" style={{ width: "100%", height: 260 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={[
                                                { name: "Completed", value: statusSummary.completed, color: "#000C1E" },
                                                { name: "Confirmed", value: statusSummary.confirmed, color: "#FED488" },
                                                { name: "Cancelled", value: statusSummary.cancelled, color: "#C3C6CF" },
                                            ]}
                                            dataKey="value"
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={70}
                                            outerRadius={100}
                                            paddingAngle={2}
                                            stroke="none"
                                        >
                                            {[
                                                { color: "#000C1E" },
                                                { color: "#FED488" },
                                                { color: "#C3C6CF" },
                                            ].map((segment, index) => (
                                                <Cell key={index} fill={segment.color} />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>

                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                    <span className="font-serif text-2xl text-navy">
                                        {statusSummary.totalLabel}
                                    </span>

                                    <span className="text-xs text-slate">
                                        Total
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2 mt-5">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2.5 h-2.5 rounded-full bg-navy" />
                                        <span className="text-sm text-navy">Completed</span>
                                    </div>
                                    <span className="text-sm font-bold text-navy">
                                        {statusSummary.completed}%
                                    </span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2.5 h-2.5 rounded-full bg-gold" />
                                        <span className="text-sm text-navy">Confirmed</span>
                                    </div>
                                    <span className="text-sm font-bold text-navy">
                                        {statusSummary.confirmed}%
                                    </span>
                                </div>

                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2.5 h-2.5 rounded-full bg-gray/40" />
                                        <span className="text-sm text-navy">Cancelled</span>
                                    </div>
                                    <span className="text-sm font-bold text-navy">
                                        {statusSummary.cancelled}%
                                    </span>
                                </div>
                            </div>

                        </div>

                        {/* Top Companies */}
                        <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6">

                            <h2 className="font-serif text-2xl text-navy">
                                Top Companies by Volume
                            </h2>

                            <div className="border-b border-gray/20 my-6"></div>

                            {topCompanies.map((company, index) => {
                                const maxCount = Math.max(
                                    ...topCompanies.map((c) => c.count)
                                );

                                const widthPercent = (company.count / maxCount) * 100;

                                const fillColors = [
                                    "bg-navy",
                                    "bg-gold",
                                    "bg-slate",
                                    "bg-gray/50",
                                ];

                                return (
                                    <div
                                        key={company.name}
                                        className={
                                            index !== topCompanies.length - 1
                                                ? "mb-5"
                                                : ""
                                        }
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-base text-navy">
                                                {company.name}
                                            </span>

                                            <span className="text-base font-bold text-navy">
                                                {company.count.toLocaleString()}
                                            </span>
                                        </div>

                                        <div className="h-2 rounded-full bg-gray/15 overflow-hidden">
                                            <div
                                                className={`h-full rounded-full ${fillColors[index % fillColors.length]}`}
                                                style={{ width: `${widthPercent}%` }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}

                        </div>

                    </div>

                </main>

            </div>

        </div>
    );
}

export default Appointments;