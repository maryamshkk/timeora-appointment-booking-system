import React, { useMemo, useState } from "react";
import {
    ArrowUpDown,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Plus,
    Search,
    TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import SuperAdminSidebar from "../../components/superadmin/SuperAdminSidebar";
import SuperAdminTopbar from "../../components/superadmin/SuperAdminTopbar";

function Companies() {
    const navigate = useNavigate();

    const [stats] = useState({
        total: 1248,
        totalDeltaPercent: 12,
        active: 1105,
        pending: 42,
        suspended: 18,
    });

    const [searchQuery, setSearchQuery] = useState("");

    const [statusFilter, setStatusFilter] = useState("all");
    const [isStatusOpen, setIsStatusOpen] = useState(false);

    const [categoryFilter, setCategoryFilter] = useState("all");
    const [isCategoryOpen, setIsCategoryOpen] = useState(false);

    const [dateFilter, setDateFilter] = useState("all");
    const [isDateOpen, setIsDateOpen] = useState(false);

    const [sortBy, setSortBy] = useState("newest");
    const [isSortOpen, setIsSortOpen] = useState(false);

    const [companies] = useState([
        {
            id: "CMP-8492",
            name: "Shifa Clinic",
            logoUrl: "",
            category: "Healthcare",
            contactEmail: "info@shifaclinic.com",
            registrationDate: "21 Aug 2026",
            staffCount: 18,
            appointmentCount: 324,
        },
        {
            id: "CMP-8491",
            name: "Elite Fitness",
            logoUrl: "",
            category: "Fitness",
            contactEmail: "hello@elitefitness.com",
            registrationDate: "20 Aug 2026",
            staffCount: 12,
            appointmentCount: 218,
        },
        {
            id: "CMP-8490",
            name: "Urban Wellness",
            logoUrl: "",
            category: "Wellness",
            contactEmail: "contact@urbanwellness.com",
            registrationDate: "19 Aug 2026",
            staffCount: 8,
            appointmentCount: 156,
        },
        {
            id: "CMP-8489",
            name: "Lexington Vanguard",
            logoUrl: "",
            category: "Consulting",
            contactEmail: "partners@lexington.com",
            registrationDate: "18 Aug 2026",
            staffCount: 45,
            appointmentCount: 89,
        },
    ]);

    const [totalCount] = useState(1248);
    const [currentPage, setCurrentPage] = useState(1);

    const pageSize = 25;

    // TODO: Replace seeded companies + totalCount with a real fetch per page.

    function handleAddCompany() {
        // TODO: Navigate to the add-company flow.
    }

    function handlePageChange(page) {
        setCurrentPage(page);

        // TODO: Refetch that page from the API.
    }

    return (
        <div className="min-h-screen bg-beige flex">

            <SuperAdminSidebar activeItem="Companies" />

            <div className="flex-1 min-w-0 flex flex-col">

                <SuperAdminTopbar unreadCount={3} />

                <main className="flex-1 px-8 py-6">

                    {/* Header */}
                    <div className="flex justify-between items-start gap-6 flex-wrap mb-6">

                        <div>
                            <h1 className="font-serif text-4xl text-navy">
                                Companies
                            </h1>

                            <p className="text-sm text-slate mt-1.5">
                                Manage and review companies registered on TIMEORA.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={handleAddCompany}
                            className="
                                bg-navy
                                text-white
                                uppercase
                                tracking-wide
                                font-bold
                                text-sm
                                px-5
                                py-3
                                rounded-lg
                                flex
                                items-center
                                gap-2
                                hover:bg-gold
                                hover:text-navy
                                transition
                                cursor-pointer
                                flex-shrink-0
                            "
                        >
                            <Plus className="w-4 h-4" />
                            Add Company
                        </button>

                    </div>

                    {/* Stat Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">

                        {/* Total */}
                        <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6">

                            <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                Total Companies
                            </p>

                            <p className="text-4xl font-bold text-navy mt-2">
                                {stats.total.toLocaleString()}
                            </p>

                            <div className="flex items-center gap-1.5 mt-1.5">
                                <TrendingUp className="w-3.5 h-3.5 text-green-600" />

                                <span className="text-sm font-bold text-green-600">
                                    +{stats.totalDeltaPercent}% this month
                                </span>
                            </div>

                        </div>

                        {/* Active */}
                        <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6">
                            <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                Active
                            </p>

                            <p className="text-4xl font-bold text-navy mt-2">
                                {stats.active.toLocaleString()}
                            </p>
                        </div>

                        {/* Pending */}
                        <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6">
                            <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                Pending
                            </p>

                            <p className="text-4xl font-bold text-navy mt-2">
                                {stats.pending.toLocaleString()}
                            </p>
                        </div>

                        {/* Suspended */}
                        <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6">
                            <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                Suspended
                            </p>

                            <p className="text-4xl font-bold text-navy mt-2">
                                {stats.suspended.toLocaleString()}
                            </p>
                        </div>

                    </div>

                    {/* Table Card */}
                    <div className="bg-white rounded-xl border border-gray/20 shadow-sm overflow-hidden">

                        {/* Filter Row */}
                        <div className="p-5 border-b border-gray/20 flex justify-between items-center flex-wrap gap-3">

                            {/* Search */}
                            <div className="relative">

                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray pointer-events-none" />

                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(event) =>
                                        setSearchQuery(event.target.value)
                                    }
                                    placeholder="Search companies..."
                                    className="
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
                                        w-72
                                    "
                                />

                            </div>

                            {/* Filters */}
                            <div className="flex gap-3 flex-wrap">

                                {/* Status */}
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsStatusOpen(!isStatusOpen);
                                            setIsCategoryOpen(false);
                                            setIsDateOpen(false);
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
                                        Status
                                        <ChevronDown className="w-3.5 h-3.5 text-slate" />
                                    </button>

                                    {isStatusOpen && (
                                        <div className="absolute right-0 top-full mt-2 z-20 w-40 bg-white border border-gray/20 rounded-lg shadow-lg p-1">
                                            {[
                                                { value: "all", label: "All Status" },
                                                { value: "active", label: "Active" },
                                                { value: "pending", label: "Pending" },
                                                { value: "suspended", label: "Suspended" },
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

                                {/* Category */}
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsCategoryOpen(!isCategoryOpen);
                                            setIsStatusOpen(false);
                                            setIsDateOpen(false);
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
                                        Category
                                        <ChevronDown className="w-3.5 h-3.5 text-slate" />
                                    </button>

                                    {isCategoryOpen && (
                                        <div className="absolute right-0 top-full mt-2 z-20 w-40 bg-white border border-gray/20 rounded-lg shadow-lg p-1">
                                            {[
                                                { value: "all", label: "All Categories" },
                                                { value: "healthcare", label: "Healthcare" },
                                                { value: "fitness", label: "Fitness" },
                                                { value: "wellness", label: "Wellness" },
                                                { value: "consulting", label: "Consulting" },
                                            ].map((option) => (
                                                <button
                                                    key={option.value}
                                                    type="button"
                                                    onClick={() => {
                                                        setCategoryFilter(option.value);
                                                        setIsCategoryOpen(false);
                                                    }}
                                                    className="w-full text-left px-3 py-2 rounded-md text-sm text-navy hover:bg-beige cursor-pointer"
                                                >
                                                    {option.label}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Date */}
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsDateOpen(!isDateOpen);
                                            setIsStatusOpen(false);
                                            setIsCategoryOpen(false);
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
                                        Date
                                        <ChevronDown className="w-3.5 h-3.5 text-slate" />
                                    </button>

                                    {isDateOpen && (
                                        <div className="absolute right-0 top-full mt-2 z-20 w-40 bg-white border border-gray/20 rounded-lg shadow-lg p-1">
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
                                                        setDateFilter(option.value);
                                                        setIsDateOpen(false);
                                                    }}
                                                    className="w-full text-left px-3 py-2 rounded-md text-sm text-navy hover:bg-beige cursor-pointer"
                                                >
                                                    {option.label}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Sort */}
                                <div className="relative">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setIsSortOpen(!isSortOpen);
                                            setIsStatusOpen(false);
                                            setIsCategoryOpen(false);
                                            setIsDateOpen(false);
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
                                        Sort
                                        <ArrowUpDown className="w-3.5 h-3.5 text-slate" />
                                    </button>

                                    {isSortOpen && (
                                        <div className="absolute right-0 top-full mt-2 z-20 w-44 bg-white border border-gray/20 rounded-lg shadow-lg p-1">
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

                        {/* Table */}
                        <div className="overflow-x-auto">

                            {/* Header */}
                            <div className="grid grid-cols-[1fr_120px_1.2fr_130px_80px_80px] px-6 py-3 border-b border-gray/20 text-xs font-bold uppercase tracking-wide text-slate min-w-[900px]">
                                <span>Company</span>
                                <span>Category</span>
                                <span>Contact</span>
                                <span>Registration Date</span>
                                <span className="text-right">Staff</span>
                                <span className="text-right">Appts</span>
                            </div>

                            {/* Rows */}
                            {companies.map((company) => (
                                <div
                                    key={company.id}
                                    onClick={() =>
                                        navigate(`/superadmin/companies/${company.id}`)
                                    }
                                    className="
                                        grid
                                        grid-cols-[1fr_120px_1.2fr_130px_80px_80px]
                                        px-6
                                        py-4
                                        border-b
                                        border-gray/20
                                        last:border-b-0
                                        hover:bg-beige/20
                                        cursor-pointer
                                        transition
                                        min-w-[900px]
                                    "
                                >

                                    {/* Company */}
                                    <div className="flex items-center gap-3 min-w-0">

                                        {company.logoUrl ? (
                                            <img
                                                src={company.logoUrl}
                                                alt={company.name}
                                                className="w-10 h-10 rounded-lg object-cover border border-gray/20 flex-shrink-0"
                                            />
                                        ) : (
                                            <div className="w-10 h-10 rounded-lg bg-beige flex items-center justify-center border border-gray/20 flex-shrink-0">
                                                <span className="font-serif text-sm text-navy">
                                                    {company.name
                                                        .split(" ")
                                                        .map((word) => word.charAt(0))
                                                        .slice(0, 2)
                                                        .join("")
                                                        .toUpperCase()}
                                                </span>
                                            </div>
                                        )}

                                        <div className="min-w-0">
                                            <p className="text-base font-bold text-navy">
                                                {company.name}
                                            </p>

                                            <p className="text-xs text-slate">
                                                ID: {company.id}
                                            </p>
                                        </div>

                                    </div>

                                    {/* Category */}
                                    <span className="text-sm text-slate self-center">
                                        {company.category}
                                    </span>

                                    {/* Contact */}
                                    <span className="text-sm text-slate self-center truncate">
                                        {company.contactEmail}
                                    </span>

                                    {/* Registration Date */}
                                    <span className="text-sm text-navy self-center">
                                        {company.registrationDate}
                                    </span>

                                    {/* Staff */}
                                    <span className="text-sm text-navy text-right self-center">
                                        {company.staffCount}
                                    </span>

                                    {/* Appointments */}
                                    <span className="text-sm text-navy text-right self-center">
                                        {company.appointmentCount}
                                    </span>

                                </div>
                            ))}

                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 border-t border-gray/20 flex justify-between items-center flex-wrap gap-3">

                            <p className="text-sm text-slate">
                                1-{pageSize} of {totalCount.toLocaleString()}
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

                                <button
                                    type="button"
                                    disabled={
                                        currentPage === Math.ceil(totalCount / pageSize)
                                    }
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

export default Companies;