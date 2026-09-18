import React, { useMemo, useState } from "react";
import {
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    MoreHorizontal,
    ShieldCheck,
    TrendingDown,
    TrendingUp,
    UserPlus,
    Users,
    UserX,
    ArrowUpDown,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import SuperAdminSidebar from "../../components/superadmin/SuperAdminSidebar";
import SuperAdminTopbar from "../../components/superadmin/SuperAdminTopbar";

function Customers() {
    const navigate = useNavigate();

    const [stats] = useState({
        total: { value: 28430, deltaPercent: 5.2 },
        active: { value: 26980, deltaPercent: 4.1 },
        newThisMonth: { value: 1240, deltaPercent: 12.5 },
        inactive: { value: 1450, deltaPercent: -2.1 },
    });

    const [statusFilter, setStatusFilter] = useState("all");
    const [isStatusOpen, setIsStatusOpen] = useState(false);

    const [registrationFilter, setRegistrationFilter] = useState("all");
    const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);

    const [activityFilter, setActivityFilter] = useState("all");
    const [isActivityOpen, setIsActivityOpen] = useState(false);

    const [sortBy, setSortBy] = useState("newest");
    const [isSortOpen, setIsSortOpen] = useState(false);

    const [customers] = useState([
        {
            id: "CU-028430",
            name: "Hina Malik",
            initials: "HM",
            email: "hina@example.com",
            registeredDate: "21 Aug 2026",
            registeredSortKey: "2026-08-21",
            appointmentCount: 8,
            lastActivity: "Today",
            lastActivitySortKey: "2026-08-21",
            status: "active",
        },
        {
            id: "CU-019283",
            name: "Ayesha Khan",
            initials: "AK",
            email: "ayesha@example.com",
            registeredDate: "19 Aug 2026",
            registeredSortKey: "2026-08-19",
            appointmentCount: 3,
            lastActivity: "Yesterday",
            lastActivitySortKey: "2026-08-20",
            status: "active",
        },
        {
            id: "CU-015247",
            name: "Maham Ali",
            initials: "MA",
            email: "maham@example.com",
            registeredDate: "15 Aug 2026",
            registeredSortKey: "2026-08-15",
            appointmentCount: 0,
            lastActivity: "15 Aug 2026",
            lastActivitySortKey: "2026-08-15",
            status: "inactive",
        },
    ]);

    const [openActionMenuId, setOpenActionMenuId] = useState(null);

    const [totalCount] = useState(28430);
    const [currentPage, setCurrentPage] = useState(1);

    const pageSize = 25;

    // TODO: Replace seeded customers + totalCount with a real fetch per page.

    // ─────────────── Derived list ───────────────

    const filteredCustomers = useMemo(() => {
        const filtered = customers.filter((customer) => {
            const matchesStatus =
                statusFilter === "all" || customer.status === statusFilter;

            // Registration / Activity / dates are TODO until API provides precise dates.
            const matchesRegistration = registrationFilter === "all";
            const matchesActivity = activityFilter === "all";

            return matchesStatus && matchesRegistration && matchesActivity;
        });

        // Sorting
        const sorted = [...filtered];

        sorted.sort((a, b) => {
            if (sortBy === "newest") {
                return b.registeredSortKey.localeCompare(a.registeredSortKey);
            }
            if (sortBy === "oldest") {
                return a.registeredSortKey.localeCompare(b.registeredSortKey);
            }
            if (sortBy === "name") {
                return a.name.localeCompare(b.name);
            }
            if (sortBy === "appointments") {
                return b.appointmentCount - a.appointmentCount;
            }
            return 0;
        });

        return sorted;
    }, [
        customers,
        statusFilter,
        registrationFilter,
        activityFilter,
        sortBy,
    ]);

    // ─────────────── Handlers ───────────────

    function handlePageChange(page) {
        setCurrentPage(page);

        // TODO: Refetch that page from the API.
    }

    function handleRowAction(customerId, action) {
        setOpenActionMenuId(null);

        if (action === "view") {
            navigate(`/superadmin/customers/${customerId}`);
            return;
        }

        // TODO: Wire Suspend (PATCH status) and Delete (DELETE with confirmation).
    }

    function getStatusStyles(status) {
        if (status === "active") {
            return "bg-green-50 text-green-700";
        }
        return "bg-gray/10 text-slate";
    }

    function getStatusLabel(value) {
        if (value === "all") return "All";
        if (value === "active") return "Active";
        return "Inactive";
    }

    function getRegistrationLabel(value) {
        if (value === "all") return "All";
        if (value === "week") return "This Week";
        if (value === "month") return "This Month";
        return "This Year";
    }

    function getActivityLabel(value) {
        if (value === "all") return "All";
        if (value === "today") return "Today";
        if (value === "week") return "This Week";
        return "This Month";
    }

    return (
        <div className="min-h-screen bg-beige flex">

            <SuperAdminSidebar activeItem="Customers" />

            <div className="flex-1 min-w-0 flex flex-col">

                <SuperAdminTopbar unreadCount={3} />

                <main className="flex-1 px-8 py-6">

                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="font-serif text-4xl text-navy mb-1.5">
                            Customers
                        </h1>

                        <p className="text-sm text-slate">
                            Manage and review customers registered on TIMEORA.
                        </p>
                    </div>

                    {/* Stat Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">

                        {/* Total Customers */}
                        <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6">

                            <div className="flex justify-between items-center mb-2.5">
                                <span className="text-xs font-bold uppercase tracking-wide text-slate">
                                    Total Customers
                                </span>

                                <Users className="w-[18px] h-[18px] text-navy" />
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="text-4xl font-bold text-navy">
                                    {stats.total.value.toLocaleString()}
                                </span>

                                <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-md bg-blue-50 text-blue-700">
                                    <TrendingUp className="w-3 h-3" />
                                    +{stats.total.deltaPercent}%
                                </span>
                            </div>

                        </div>

                        {/* Active */}
                        <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6">

                            <div className="flex justify-between items-center mb-2.5">
                                <span className="text-xs font-bold uppercase tracking-wide text-slate">
                                    Active
                                </span>

                                <ShieldCheck className="w-[18px] h-[18px] text-navy" />
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="text-4xl font-bold text-navy">
                                    {stats.active.value.toLocaleString()}
                                </span>

                                <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-md bg-blue-50 text-blue-700">
                                    <TrendingUp className="w-3 h-3" />
                                    +{stats.active.deltaPercent}%
                                </span>
                            </div>

                        </div>

                        {/* New This Month */}
                        <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6">

                            <div className="flex justify-between items-center mb-2.5">
                                <span className="text-xs font-bold uppercase tracking-wide text-slate">
                                    New This Month
                                </span>

                                <UserPlus className="w-[18px] h-[18px] text-navy" />
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="text-4xl font-bold text-navy">
                                    {stats.newThisMonth.value.toLocaleString()}
                                </span>

                                <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-md bg-blue-50 text-blue-700">
                                    <TrendingUp className="w-3 h-3" />
                                    +{stats.newThisMonth.deltaPercent}%
                                </span>
                            </div>

                        </div>

                        {/* Inactive */}
                        <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6">

                            <div className="flex justify-between items-center mb-2.5">
                                <span className="text-xs font-bold uppercase tracking-wide text-slate">
                                    Inactive
                                </span>

                                <UserX className="w-[18px] h-[18px] text-navy" />
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="text-4xl font-bold text-navy">
                                    {stats.inactive.value.toLocaleString()}
                                </span>

                                <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-md bg-red-50 text-red-600">
                                    <TrendingDown className="w-3 h-3" />
                                    {stats.inactive.deltaPercent}%
                                </span>
                            </div>

                        </div>

                    </div>

                    {/* Filter Row */}
                    <div className="flex justify-between items-center flex-wrap gap-3 mb-5">

                        {/* Left — dropdowns */}
                        <div className="flex gap-3 flex-wrap">

                            {/* Status */}
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsStatusOpen(!isStatusOpen);
                                        setIsRegistrationOpen(false);
                                        setIsActivityOpen(false);
                                        setIsSortOpen(false);
                                    }}
                                    className="
                                        bg-white
                                        border
                                        border-gray
                                        rounded-lg
                                        px-4
                                        py-2.5
                                        text-sm
                                        font-bold
                                        text-navy
                                        flex
                                        items-center
                                        gap-2
                                        cursor-pointer
                                    "
                                >
                                    Status: {getStatusLabel(statusFilter)}
                                    <ChevronDown className="w-3.5 h-3.5 text-slate" />
                                </button>

                                {isStatusOpen && (
                                    <div className="absolute left-0 top-full mt-2 z-20 w-40 bg-white border border-gray/20 rounded-lg shadow-lg p-1">
                                        {[
                                            { value: "all", label: "All Status" },
                                            { value: "active", label: "Active" },
                                            { value: "inactive", label: "Inactive" },
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

                            {/* Registration */}
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsRegistrationOpen(!isRegistrationOpen);
                                        setIsStatusOpen(false);
                                        setIsActivityOpen(false);
                                        setIsSortOpen(false);
                                    }}
                                    className="
                                        bg-white
                                        border
                                        border-gray
                                        rounded-lg
                                        px-4
                                        py-2.5
                                        text-sm
                                        font-bold
                                        text-navy
                                        flex
                                        items-center
                                        gap-2
                                        cursor-pointer
                                    "
                                >
                                    Registration: {getRegistrationLabel(registrationFilter)}
                                    <ChevronDown className="w-3.5 h-3.5 text-slate" />
                                </button>

                                {isRegistrationOpen && (
                                    <div className="absolute left-0 top-full mt-2 z-20 w-44 bg-white border border-gray/20 rounded-lg shadow-lg p-1">
                                        {[
                                            { value: "all", label: "All Time" },
                                            { value: "week", label: "This Week" },
                                            { value: "month", label: "This Month" },
                                            { value: "year", label: "This Year" },
                                        ].map((option) => (
                                            <button
                                                key={option.value}
                                                type="button"
                                                onClick={() => {
                                                    setRegistrationFilter(option.value);
                                                    setIsRegistrationOpen(false);
                                                }}
                                                className="w-full text-left px-3 py-2 rounded-md text-sm text-navy hover:bg-beige cursor-pointer"
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Activity */}
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsActivityOpen(!isActivityOpen);
                                        setIsStatusOpen(false);
                                        setIsRegistrationOpen(false);
                                        setIsSortOpen(false);
                                    }}
                                    className="
                                        bg-white
                                        border
                                        border-gray
                                        rounded-lg
                                        px-4
                                        py-2.5
                                        text-sm
                                        font-bold
                                        text-navy
                                        flex
                                        items-center
                                        gap-2
                                        cursor-pointer
                                    "
                                >
                                    Activity: {getActivityLabel(activityFilter)}
                                    <ChevronDown className="w-3.5 h-3.5 text-slate" />
                                </button>

                                {isActivityOpen && (
                                    <div className="absolute left-0 top-full mt-2 z-20 w-44 bg-white border border-gray/20 rounded-lg shadow-lg p-1">
                                        {[
                                            { value: "all", label: "All Activity" },
                                            { value: "today", label: "Today" },
                                            { value: "week", label: "This Week" },
                                            { value: "month", label: "This Month" },
                                        ].map((option) => (
                                            <button
                                                key={option.value}
                                                type="button"
                                                onClick={() => {
                                                    setActivityFilter(option.value);
                                                    setIsActivityOpen(false);
                                                }}
                                                className="w-full text-left px-3 py-2 rounded-md text-sm text-navy hover:bg-beige cursor-pointer"
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                        </div>

                        {/* Right — sort */}
                        <div className="flex items-center gap-2">

                            <span className="text-sm text-slate">
                                Sort by:
                            </span>

                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsSortOpen(!isSortOpen);
                                        setIsStatusOpen(false);
                                        setIsRegistrationOpen(false);
                                        setIsActivityOpen(false);
                                    }}
                                    className="
                                        text-sm
                                        font-bold
                                        uppercase
                                        tracking-wide
                                        text-navy
                                        flex
                                        items-center
                                        gap-1.5
                                        cursor-pointer
                                    "
                                >
                                    {sortBy === "newest"
                                        ? "Newest First"
                                        : sortBy === "oldest"
                                        ? "Oldest First"
                                        : sortBy === "name"
                                        ? "Name A–Z"
                                        : "Most Appointments"}

                                    <ArrowUpDown className="w-3.5 h-3.5" />
                                </button>

                                {isSortOpen && (
                                    <div className="absolute right-0 top-full mt-2 z-20 w-48 bg-white border border-gray/20 rounded-lg shadow-lg p-1">
                                        {[
                                            { value: "newest", label: "Newest First" },
                                            { value: "oldest", label: "Oldest First" },
                                            { value: "name", label: "Name A–Z" },
                                            { value: "appointments", label: "Most Appointments" },
                                        ].map((option) => (
                                            <button
                                                key={option.value}
                                                type="button"
                                                onClick={() => {
                                                    setSortBy(option.value);
                                                    setIsSortOpen(false);
                                                }}
                                                className="w-full text-left px-3 py-2 rounded-md text-sm text-navy hover:bg-beige cursor-pointer"
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                        </div>

                    </div>

                    {/* Table Card */}
                    <div className="bg-white rounded-xl border border-gray/20 shadow-sm overflow-hidden">

                        {/* Table */}
                        <div className="overflow-x-auto">

                            {/* Header */}
                            <div className="grid grid-cols-[1fr_1fr_110px_130px_120px_100px_60px] px-6 py-4 border-b border-gray/20 text-xs font-bold uppercase tracking-wide text-slate min-w-[900px]">
                                <span>Customer</span>
                                <span>Contact</span>
                                <span>Registered</span>
                                <span>Appointments</span>
                                <span>Last Activity</span>
                                <span>Status</span>
                                <span></span>
                            </div>

                            {/* Rows */}
                            {filteredCustomers.length > 0 ? (
                                filteredCustomers.map((customer) => (
                                    <div
                                        key={customer.id}
                                        onClick={() =>
                                            navigate(`/superadmin/customers/${customer.id}`)
                                        }
                                        className="
                                            grid
                                            grid-cols-[1fr_1fr_110px_130px_120px_100px_60px]
                                            px-6
                                            py-5
                                            border-b
                                            border-gray/20
                                            last:border-b-0
                                            hover:bg-beige/20
                                            transition
                                            min-w-[900px]
                                            cursor-pointer
                                        "
                                    >

                                        {/* Customer */}
                                        <div className="flex items-center gap-3 min-w-0">

                                            <div className="w-11 h-11 rounded-lg bg-gray/10 border border-gray/20 flex items-center justify-center flex-shrink-0">
                                                <span className="font-serif text-sm font-bold text-navy">
                                                    {customer.initials}
                                                </span>
                                            </div>

                                            <div className="min-w-0">
                                                <p className="text-base font-bold text-navy">
                                                    {customer.name}
                                                </p>

                                                <p className="text-xs text-slate">
                                                    {customer.id}
                                                </p>
                                            </div>

                                        </div>

                                        {/* Contact */}
                                        <span className="text-sm text-slate self-center truncate">
                                            {customer.email}
                                        </span>

                                        {/* Registered */}
                                        <span className="text-sm text-navy self-center">
                                            {customer.registeredDate}
                                        </span>

                                        {/* Appointments */}
                                        <span className="text-base font-bold text-navy self-center">
                                            {customer.appointmentCount}
                                        </span>

                                        {/* Last Activity */}
                                        <span className="text-sm text-slate self-center">
                                            {customer.lastActivity}
                                        </span>

                                        {/* Status */}
                                        <span className="self-center">
                                            <span
                                                className={`
                                                    text-xs
                                                    font-bold
                                                    uppercase
                                                    tracking-wide
                                                    px-2.5
                                                    py-1
                                                    rounded
                                                    ${getStatusStyles(customer.status)}
                                                `}
                                            >
                                                {customer.status}
                                            </span>
                                        </span>

                                        {/* Actions */}
                                        <div
                                            className="relative self-center flex justify-end"
                                            onClick={(event) => event.stopPropagation()}
                                        >

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setOpenActionMenuId(
                                                        openActionMenuId === customer.id
                                                            ? null
                                                            : customer.id
                                                    )
                                                }
                                                aria-label="Row actions"
                                                className="text-slate hover:text-navy transition cursor-pointer"
                                            >
                                                <MoreHorizontal className="w-[18px] h-[18px]" />
                                            </button>

                                            {openActionMenuId === customer.id && (
                                                <div className="absolute right-0 top-full mt-2 z-20 w-48 bg-white border border-gray/20 rounded-lg shadow-lg p-1">

                                                    <button
                                                        type="button"
                                                        onClick={(event) => {
                                                            event.stopPropagation();
                                                            handleRowAction(customer.id, "view");
                                                        }}
                                                        className="w-full text-left px-3 py-2 rounded-md text-sm text-navy hover:bg-beige cursor-pointer"
                                                    >
                                                        View Profile
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={(event) => {
                                                            event.stopPropagation();
                                                            handleRowAction(customer.id, "suspend");
                                                        }}
                                                        className="w-full text-left px-3 py-2 rounded-md text-sm text-navy hover:bg-beige cursor-pointer"
                                                    >
                                                        Suspend Customer
                                                    </button>

                                                    <button
                                                        type="button"
                                                        onClick={(event) => {
                                                            event.stopPropagation();
                                                            handleRowAction(customer.id, "delete");
                                                        }}
                                                        className="w-full text-left px-3 py-2 rounded-md text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                                                    >
                                                        Delete Customer
                                                    </button>

                                                </div>
                                            )}

                                        </div>

                                    </div>
                                ))
                            ) : (
                                <div className="px-6 py-16 text-center min-w-[900px]">
                                    <p className="text-sm text-slate">
                                        No customers match the current filters.
                                    </p>
                                </div>
                            )}

                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 border-t border-gray/20 flex justify-between items-center flex-wrap gap-3">

                            <p className="text-sm text-slate">
                                Showing {filteredCustomers.length > 0 ? 1 : 0}-{filteredCustomers.length} of {totalCount.toLocaleString()} customers
                            </p>

                            <div className="flex items-center gap-2">

                                <button
                                    type="button"
                                    disabled={currentPage === 1}
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    aria-label="Previous page"
                                    className="
                                        w-9
                                        h-9
                                        rounded-lg
                                        border
                                        border-gray
                                        flex
                                        items-center
                                        justify-center
                                        text-navy
                                        disabled:opacity-40
                                        disabled:cursor-not-allowed
                                        hover:bg-beige
                                        transition
                                        cursor-pointer
                                    "
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>

                                {/* Page 1 */}
                                <button
                                    type="button"
                                    onClick={() => handlePageChange(1)}
                                    className={`
                                        w-9
                                        h-9
                                        rounded-lg
                                        border
                                        text-sm
                                        font-bold
                                        transition
                                        cursor-pointer
                                        ${
                                            currentPage === 1
                                                ? "bg-navy text-white border-navy"
                                                : "border-gray text-navy hover:bg-beige"
                                        }
                                    `}
                                >
                                    1
                                </button>

                                {/* Page 2 */}
                                <button
                                    type="button"
                                    onClick={() => handlePageChange(2)}
                                    className={`
                                        w-9
                                        h-9
                                        rounded-lg
                                        border
                                        text-sm
                                        font-bold
                                        transition
                                        cursor-pointer
                                        ${
                                            currentPage === 2
                                                ? "bg-navy text-white border-navy"
                                                : "border-gray text-navy hover:bg-beige"
                                        }
                                    `}
                                >
                                    2
                                </button>

                                {/* Page 3 */}
                                <button
                                    type="button"
                                    onClick={() => handlePageChange(3)}
                                    className={`
                                        w-9
                                        h-9
                                        rounded-lg
                                        border
                                        text-sm
                                        font-bold
                                        transition
                                        cursor-pointer
                                        ${
                                            currentPage === 3
                                                ? "bg-navy text-white border-navy"
                                                : "border-gray text-navy hover:bg-beige"
                                        }
                                    `}
                                >
                                    3
                                </button>

                                {/* Ellipsis */}
                                <span className="w-9 h-9 flex items-center justify-center text-sm font-bold text-slate">
                                    …
                                </span>

                                {/* Last page */}
                                <button
                                    type="button"
                                    onClick={() => handlePageChange(1138)}
                                    className={`
                                        w-9
                                        h-9
                                        rounded-lg
                                        border
                                        text-sm
                                        font-bold
                                        transition
                                        cursor-pointer
                                        ${
                                            currentPage === 1138
                                                ? "bg-navy text-white border-navy"
                                                : "border-gray text-navy hover:bg-beige"
                                        }
                                    `}
                                >
                                    1138
                                </button>

                                <button
                                    type="button"
                                    disabled={currentPage === 1138}
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    aria-label="Next page"
                                    className="
                                        w-9
                                        h-9
                                        rounded-lg
                                        border
                                        border-gray
                                        flex
                                        items-center
                                        justify-center
                                        text-navy
                                        disabled:opacity-40
                                        disabled:cursor-not-allowed
                                        hover:bg-beige
                                        transition
                                        cursor-pointer
                                    "
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>

                            </div>

                        </div>

                    </div>

                </main>

            </div>

        </div>
    );
}

export default Customers;