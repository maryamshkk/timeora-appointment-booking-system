import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
    Calendar,
    Inbox,
    CheckCircle2,
    XCircle,
    Search,
    SlidersHorizontal,
    ChevronDown,
    MoreVertical,
    Eye,
    RefreshCw,
} from "lucide-react";

import StaffSidebar from "../../components/staff/StaffSidebar";
import StaffTopbar from "../../components/staff/StaffTopbar";

function StaffAppointments() {
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [stats] = useState({
        today: 8,
        upcoming: 14,
        completed: 34,
        cancelled: 2,
    });

    const [appointments] = useState([
        {
            id: 1,
            date: "21 Aug",
            time: "09:00",
            customer: "Ayesha Khan",
            service: "Consultation",
            duration: "30 min",
            status: "Confirmed",
        },
        {
            id: 2,
            date: "21 Aug",
            time: "10:00",
            customer: "David Miller",
            service: "Follow-up",
            duration: "15 min",
            status: "Pending",
        },
        {
            id: 3,
            date: "20 Aug",
            time: "14:30",
            customer: "Elena Rostova",
            service: "Full Assessment",
            duration: "60 min",
            status: "Completed",
        },
        {
            id: 4,
            date: "20 Aug",
            time: "16:00",
            customer: "James Chen",
            service: "Consultation",
            duration: "30 min",
            status: "Cancelled",
        },
    ]);

    const [openMenuId, setOpenMenuId] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 4;
    const [totalCount] = useState(24);

    const [activeFilter, setActiveFilter] = useState("today");
    const [isCustomRangeOpen, setIsCustomRangeOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [isFiltersOpen, setIsFiltersOpen] = useState(false);

    const [selectedStatus, setSelectedStatus] = useState("");
    const [selectedService, setSelectedService] = useState("");

    const currentStaff = {
        name: "Dr. Sara Ahmed",
        role: "Doctor",
        avatarUrl: "",
        companyName: "Shifa Clinic",
    };

    function handleFilterChange(filter) {
        setActiveFilter(filter);
        setCurrentPage(1);

        if (filter === "custom") {
            setIsCustomRangeOpen(true);
            return;
        }

        setIsCustomRangeOpen(false);
    }

    function handleSearchChange(event) {
        setSearchQuery(event.target.value);
        setCurrentPage(1);
    }

    function getStatusStyle(status) {
        if (status === "Confirmed") {
            return "bg-gray/20 text-navy";
        }

        if (status === "Pending") {
            return "bg-gold/20 text-amber-700";
        }

        if (status === "Completed") {
            return "bg-blue-50 text-blue-700";
        }

        if (status === "Cancelled") {
            return "bg-red-50 text-red-600";
        }

        return "bg-gray/20 text-slate";
    }

    function handleRowAction(appointmentId, action) {
        setOpenMenuId(null);

        // TODO: axios API call for the selected action
        // View Details / Reschedule / Mark Complete / Cancel
    }

    function handlePageChange(page) {
        setCurrentPage(page);

        // TODO: axios API call with the selected page
    }

    /* Close the row-action menu on any outside click or Escape */
    useEffect(() => {
        function handleDocumentClick() {
            setOpenMenuId(null);
        }

        function handleEscape(event) {
            if (event.key === "Escape") {
                setOpenMenuId(null);
            }
        }

        document.addEventListener("click", handleDocumentClick);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("click", handleDocumentClick);
            document.removeEventListener("keydown", handleEscape);
        };
    }, []);

    const startItem =
        totalCount === 0 ? 0 : (currentPage - 1) * pageSize + 1;

    const endItem = Math.min(currentPage * pageSize, totalCount);

    const totalPages = Math.ceil(totalCount / pageSize);

    const filteredAppointments = appointments.filter((appointment) => {
        const searchValue = searchQuery.toLowerCase();

        const matchesSearch =
            appointment.customer.toLowerCase().includes(searchValue) ||
            appointment.service.toLowerCase().includes(searchValue);

        const matchesStatus =
            selectedStatus === "" ||
            appointment.status.toLowerCase() ===
                selectedStatus.toLowerCase();

        const matchesService =
            selectedService === "" ||
            appointment.service === selectedService;

        if (!matchesSearch || !matchesStatus || !matchesService) {
            return false;
        }

        if (activeFilter === "today") {
            return appointment.date === "21 Aug";
        }

        if (activeFilter === "week") {
            return ["20 Aug", "21 Aug"].includes(appointment.date);
        }

        if (activeFilter === "upcoming") {
            return (
                appointment.status === "Confirmed" ||
                appointment.status === "Pending"
            );
        }

        return true;
    });

    return (
        <div className="min-h-screen bg-beige flex">

            {/* Sidebar — desktop always visible, mobile slide-in drawer */}
            <StaffSidebar
                companyName={currentStaff.companyName}
                currentStaff={currentStaff}
                activeItem="Appointments"
                handleSignOut={() => navigate("/login")}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            {/* Main Area */}
            <div className="flex min-w-0 flex-1 flex-col">

                <StaffTopbar
                    avatarUrl={currentStaff.avatarUrl}
                    onMenuClick={() => setSidebarOpen(true)}
                    onSearchClick={() => {}}
                    onNotificationsClick={() => navigate("/staff/notifications")}
                    onSettingsClick={() => navigate("/staff/settings")}
                />

                <main className="flex-1 bg-beige px-4 sm:px-6 lg:px-8 py-6">
                    <div className="mx-auto w-full max-w-7xl">

                        {/* Page Header */}
                        <div className="mb-6 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

                            <div>
                                <h1 className="font-serif text-2xl text-navy sm:text-3xl lg:text-4xl">
                                    My Appointments
                                </h1>

                                <p className="mt-1.5 text-sm text-slate">
                                    View and manage appointments assigned to you.
                                </p>
                            </div>

                            <Link
                                to="/staff/calendar"
                                className="
                                    inline-flex items-center justify-center gap-2
                                    rounded-lg bg-navy px-5 py-3 text-sm font-bold text-white
                                    transition hover:bg-gold hover:text-navy
                                "
                            >
                                <Calendar className="h-4 w-4" />
                                Calendar
                            </Link>

                        </div>

                        {/* Stats */}
                        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">

                            <div className="rounded-xl border border-gray/20 bg-white p-5 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <h2 className="font-serif text-xl text-navy">
                                        Today
                                    </h2>

                                    <Calendar className="h-5 w-5 text-navy" />
                                </div>

                                <div className="my-4 border-b border-gray/30"></div>

                                <p className="text-4xl font-bold text-navy">
                                    {stats.today}
                                </p>
                            </div>

                            <div className="rounded-xl border border-gray/20 bg-white p-5 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <h2 className="font-serif text-xl text-navy">
                                        Upcoming
                                    </h2>

                                    <Inbox className="h-5 w-5 text-gold" />
                                </div>

                                <div className="my-4 border-b border-gray/30"></div>

                                <p className="text-4xl font-bold text-navy">
                                    {stats.upcoming}
                                </p>
                            </div>

                            <div className="rounded-xl border border-gray/20 bg-white p-5 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <h2 className="font-serif text-xl text-navy">
                                        Completed
                                    </h2>

                                    <CheckCircle2 className="h-5 w-5 text-navy" />
                                </div>

                                <div className="my-4 border-b border-gray/30"></div>

                                <p className="text-4xl font-bold text-navy">
                                    {stats.completed}
                                </p>
                            </div>

                            <div className="rounded-xl border border-gray/20 bg-white p-5 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <h2 className="font-serif text-xl text-navy">
                                        Cancelled
                                    </h2>

                                    <XCircle className="h-5 w-5 text-red-500" />
                                </div>

                                <div className="my-4 border-b border-gray/30"></div>

                                <p className="text-4xl font-bold text-navy">
                                    {stats.cancelled}
                                </p>
                            </div>

                        </div>

                        {/* Appointments Card */}
                        <div className="overflow-hidden rounded-xl border border-gray/20 bg-white shadow-sm">

                            {/* Card Header */}
                            <div className="border-b border-gray/20 p-5 md:p-6">

                                <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">

                                    {/* Quick Filters */}
                                    <div className="flex flex-wrap items-center gap-2">

                                        {[
                                            { label: "Today", value: "today" },
                                            { label: "This Week", value: "week" },
                                            { label: "Upcoming", value: "upcoming" },
                                            { label: "Custom Range", value: "custom" },
                                        ].map((filter) => (
                                            <button
                                                key={filter.value}
                                                type="button"
                                                onClick={() =>
                                                    handleFilterChange(filter.value)
                                                }
                                                className={`
                                                    rounded-lg px-4 py-2 text-sm font-bold transition
                                                    ${
                                                        activeFilter === filter.value
                                                            ? "bg-navy text-white"
                                                            : "bg-beige text-slate hover:text-navy"
                                                    }
                                                `}
                                            >
                                                {filter.label}
                                            </button>
                                        ))}

                                    </div>

                                    {/* Search + Filters */}
                                    <div className="flex flex-col gap-3 sm:flex-row">

                                        <div className="relative">
                                            <Search
                                                className="
                                                    absolute left-3 top-1/2 h-4 w-4
                                                    -translate-y-1/2 text-slate
                                                "
                                            />

                                            <input
                                                type="text"
                                                value={searchQuery}
                                                onChange={handleSearchChange}
                                                placeholder="Search appointments..."
                                                className="
                                                    h-10 w-full rounded-lg border border-gray/40
                                                    pl-9 pr-4 font-serif text-sm text-navy
                                                    outline-none focus:border-navy
                                                    sm:w-64
                                                "
                                            />
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setIsFiltersOpen(!isFiltersOpen)
                                            }
                                            className="
                                                flex h-10 items-center justify-center gap-2
                                                rounded-lg border border-gray/40 px-4
                                                text-sm font-bold text-navy transition
                                                hover:bg-beige
                                            "
                                        >
                                            <SlidersHorizontal className="h-4 w-4" />
                                            Filters
                                            <ChevronDown
                                                className={`
                                                    h-4 w-4 transition-transform
                                                    ${isFiltersOpen ? "rotate-180" : ""}
                                                `}
                                            />
                                        </button>

                                    </div>

                                </div>

                                {/* Custom Range */}
                                {isCustomRangeOpen && (
                                    <div className="mt-5 flex flex-col gap-3 sm:flex-row">

                                        <div>
                                            <label className="mb-1.5 block text-xs font-bold text-slate">
                                                From
                                            </label>

                                            <input
                                                type="date"
                                                className="
                                                    h-10 rounded-lg border border-gray/40 px-3
                                                    font-serif text-sm text-navy
                                                    outline-none focus:border-navy
                                                "
                                            />
                                        </div>

                                        <div>
                                            <label className="mb-1.5 block text-xs font-bold text-slate">
                                                To
                                            </label>

                                            <input
                                                type="date"
                                                className="
                                                    h-10 rounded-lg border border-gray/40 px-3
                                                    font-serif text-sm text-navy
                                                    outline-none focus:border-navy
                                                "
                                            />
                                        </div>

                                    </div>
                                )}

                                {/* Additional Filters */}
                                {isFiltersOpen && (
                                    <div className="mt-5 border-t border-gray/20 pt-5">

                                        <div className="flex flex-col gap-4 sm:flex-row">

                                            <div>
                                                <label className="mb-1.5 block text-xs font-bold text-slate">
                                                    Status
                                                </label>

                                                <select
                                                    value={selectedStatus}
                                                    onChange={(event) => {
                                                        setSelectedStatus(
                                                            event.target.value
                                                        );
                                                        setCurrentPage(1);
                                                    }}
                                                    className="
                                                        h-10 min-w-[160px] rounded-lg border border-gray/40
                                                        bg-white px-3 font-serif text-sm text-navy
                                                        outline-none focus:border-navy
                                                    "
                                                >
                                                    <option value="">All Statuses</option>
                                                    <option value="confirmed">Confirmed</option>
                                                    <option value="pending">Pending</option>
                                                    <option value="completed">Completed</option>
                                                    <option value="cancelled">Cancelled</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="mb-1.5 block text-xs font-bold text-slate">
                                                    Service
                                                </label>

                                                <select
                                                    value={selectedService}
                                                    onChange={(event) => {
                                                        setSelectedService(
                                                            event.target.value
                                                        );
                                                        setCurrentPage(1);
                                                    }}
                                                    className="
                                                        h-10 min-w-[180px] rounded-lg border border-gray/40
                                                        bg-white px-3 font-serif text-sm text-navy
                                                        outline-none focus:border-navy
                                                    "
                                                >
                                                    <option value="">All Services</option>
                                                    <option value="Consultation">Consultation</option>
                                                    <option value="Follow-up">Follow-up</option>
                                                    <option value="Full Assessment">Full Assessment</option>
                                                </select>
                                            </div>

                                        </div>

                                        {/* Clear All Filters */}
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setSelectedStatus("");
                                                setSelectedService("");
                                                setSearchQuery("");
                                                setActiveFilter("today");
                                                setIsCustomRangeOpen(false);
                                                setCurrentPage(1);
                                            }}
                                            className="
                                                mt-5 text-sm font-bold text-navy
                                                hover:underline
                                            "
                                        >
                                            Clear all filters
                                        </button>

                                    </div>
                                )}

                            </div>

                            {/* Appointment Table */}
                            <div className="overflow-x-auto">

                                <table className="w-full min-w-[950px]">

                                    <thead>
                                        <tr className="border-b border-gray/20 bg-beige/40">

                                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate">
                                                Date
                                            </th>

                                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate">
                                                Time
                                            </th>

                                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate">
                                                Customer
                                            </th>

                                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate">
                                                Service
                                            </th>

                                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate">
                                                Duration
                                            </th>

                                            <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate">
                                                Status
                                            </th>

                                            <th className="w-12 px-4 py-4"></th>

                                        </tr>
                                    </thead>

                                    <tbody>

                                        {filteredAppointments.map((appointment) => (
                                            <tr
                                                key={appointment.id}
                                                className="border-b border-gray/20 transition last:border-b-0 hover:bg-beige/30"
                                            >

                                                <td className="px-6 py-5">
                                                    <span className="text-sm font-bold text-navy">
                                                        {appointment.date}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-5">
                                                    <span className="text-sm text-slate">
                                                        {appointment.time}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-5">
                                                    <div>
                                                        <p className="text-sm font-bold text-navy">
                                                            {appointment.customer}
                                                        </p>

                                                        <p className="mt-0.5 text-xs text-slate">
                                                            Customer
                                                        </p>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-5">
                                                    <span className="text-sm text-slate">
                                                        {appointment.service}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-5">
                                                    <span className="text-sm text-slate">
                                                        {appointment.duration}
                                                    </span>
                                                </td>

                                                <td className="px-6 py-5">
                                                    <span
                                                        className={`
                                                            inline-flex items-center rounded-full
                                                            px-3 py-1.5 text-xs font-bold
                                                            ${getStatusStyle(appointment.status)}
                                                        `}
                                                    >
                                                        {appointment.status}
                                                    </span>
                                                </td>

                                                <td className="relative px-4 py-5">

                                                    <button
                                                        type="button"
                                                        onClick={(event) => {
                                                            event.stopPropagation();

                                                            setOpenMenuId(
                                                                openMenuId === appointment.id
                                                                    ? null
                                                                    : appointment.id
                                                            );
                                                        }}
                                                        className="
                                                            flex h-8 w-8 items-center justify-center
                                                            rounded-lg text-slate transition
                                                            hover:bg-beige hover:text-navy
                                                        "
                                                    >
                                                        <MoreVertical className="h-4 w-4" />
                                                    </button>

                                                    {openMenuId === appointment.id && (
                                                        <div
                                                            onClick={(event) =>
                                                                event.stopPropagation()
                                                            }
                                                            className="
                                                                absolute right-4 top-14 z-20 w-44
                                                                rounded-xl border border-gray/30
                                                                bg-white p-1.5 shadow-lg
                                                            "
                                                        >

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleRowAction(
                                                                        appointment.id,
                                                                        "view"
                                                                    )
                                                                }
                                                                className="
                                                                    flex w-full items-center gap-3 rounded-lg
                                                                    px-3 py-2.5 text-sm text-navy transition
                                                                    hover:bg-beige
                                                                "
                                                            >
                                                                <Eye className="h-4 w-4" />
                                                                View Details
                                                            </button>

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleRowAction(
                                                                        appointment.id,
                                                                        "reschedule"
                                                                    )
                                                                }
                                                                className="
                                                                    flex w-full items-center gap-3 rounded-lg
                                                                    px-3 py-2.5 text-sm text-navy transition
                                                                    hover:bg-beige
                                                                "
                                                            >
                                                                <RefreshCw className="h-4 w-4" />
                                                                Reschedule
                                                            </button>

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleRowAction(
                                                                        appointment.id,
                                                                        "complete"
                                                                    )
                                                                }
                                                                className="
                                                                    flex w-full items-center gap-3 rounded-lg
                                                                    px-3 py-2.5 text-sm text-navy transition
                                                                    hover:bg-beige
                                                                "
                                                            >
                                                                <CheckCircle2 className="h-4 w-4" />
                                                                Mark Complete
                                                            </button>

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleRowAction(
                                                                        appointment.id,
                                                                        "cancel"
                                                                    )
                                                                }
                                                                className="
                                                                    flex w-full items-center gap-3 rounded-lg
                                                                    px-3 py-2.5 text-sm text-red-600 transition
                                                                    hover:bg-red-50
                                                                "
                                                            >
                                                                <XCircle className="h-4 w-4" />
                                                                Cancel
                                                            </button>

                                                        </div>
                                                    )}

                                                </td>

                                            </tr>
                                        ))}

                                        {/* Empty State */}
                                        {filteredAppointments.length === 0 && (
                                            <tr>
                                                <td
                                                    colSpan="7"
                                                    className="px-6 py-12 text-center"
                                                >
                                                    <div className="flex flex-col items-center">

                                                        <Calendar className="mb-3 h-8 w-8 text-gray/60" />

                                                        <p className="text-sm font-bold text-navy">
                                                            No appointments found
                                                        </p>

                                                        <p className="mt-1 text-xs text-slate">
                                                            Try changing your search or filter.
                                                        </p>

                                                    </div>
                                                </td>
                                            </tr>
                                        )}

                                    </tbody>

                                </table>

                            </div>

                            {/* Pagination */}
                            <div className="border-t border-gray/20 px-5 py-4 md:px-6">

                                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                                    <p className="text-sm text-slate">
                                        Showing{" "}
                                        <span className="font-bold text-navy">
                                            {startItem}-{endItem}
                                        </span>{" "}
                                        of{" "}
                                        <span className="font-bold text-navy">
                                            {totalCount}
                                        </span>{" "}
                                        appointments
                                    </p>

                                    <div className="flex items-center gap-1">

                                        <button
                                            type="button"
                                            disabled={currentPage === 1}
                                            onClick={() =>
                                                handlePageChange(currentPage - 1)
                                            }
                                            className="
                                                flex h-9 w-9 items-center justify-center
                                                rounded-lg border border-gray/30 text-sm
                                                text-slate transition hover:bg-beige
                                                hover:text-navy disabled:cursor-not-allowed
                                                disabled:opacity-40
                                            "
                                        >
                                            <ChevronDown className="h-4 w-4 rotate-90" />
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => handlePageChange(1)}
                                            className={`
                                                h-9 w-9 rounded-lg text-sm font-bold transition
                                                ${
                                                    currentPage === 1
                                                        ? "bg-navy text-white"
                                                        : "text-slate hover:bg-beige hover:text-navy"
                                                }
                                            `}
                                        >
                                            1
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => handlePageChange(2)}
                                            className={`
                                                h-9 w-9 rounded-lg text-sm font-bold transition
                                                ${
                                                    currentPage === 2
                                                        ? "bg-navy text-white"
                                                        : "text-slate hover:bg-beige hover:text-navy"
                                                }
                                            `}
                                        >
                                            2
                                        </button>

                                        <button
                                            type="button"
                                            onClick={() => handlePageChange(3)}
                                            className={`
                                                h-9 w-9 rounded-lg text-sm font-bold transition
                                                ${
                                                    currentPage === 3
                                                        ? "bg-navy text-white"
                                                        : "text-slate hover:bg-beige hover:text-navy"
                                                }
                                            `}
                                        >
                                            3
                                        </button>

                                        {totalPages > 3 && (
                                            <span className="flex h-9 w-9 items-center justify-center text-sm text-slate">
                                                ...
                                            </span>
                                        )}

                                        {totalPages > 3 && (
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    handlePageChange(totalPages)
                                                }
                                                className={`
                                                    h-9 w-9 rounded-lg text-sm font-bold transition
                                                    ${
                                                        currentPage === totalPages
                                                            ? "bg-navy text-white"
                                                            : "text-slate hover:bg-beige hover:text-navy"
                                                    }
                                                `}
                                            >
                                                {totalPages}
                                            </button>
                                        )}

                                        <button
                                            type="button"
                                            disabled={currentPage === totalPages}
                                            onClick={() =>
                                                handlePageChange(currentPage + 1)
                                            }
                                            className="
                                                flex h-9 w-9 items-center justify-center
                                                rounded-lg border border-gray/30 text-sm
                                                text-slate transition hover:bg-beige
                                                hover:text-navy disabled:cursor-not-allowed
                                                disabled:opacity-40
                                            "
                                        >
                                            <ChevronDown className="h-4 w-4 -rotate-90" />
                                        </button>

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

export default StaffAppointments;