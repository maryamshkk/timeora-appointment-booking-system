import React, { useMemo, useState } from "react";
import {
    Building2,
    Calendar,
    CheckCircle2,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Download,
    PauseCircle,
    TrendingUp,
    Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import SuperAdminSidebar from "../../components/superadmin/SuperAdminSidebar";
import SuperAdminTopbar from "../../components/superadmin/SuperAdminTopbar";

function Staff() {
    const navigate = useNavigate();

    const [stats] = useState({
        total: { value: 3840, deltaPercent: 12 },
        active: 3520,
        inactive: 320,
        companiesWithStaff: 1105,
    });

    const [searchQuery, setSearchQuery] = useState("");

    const [statusFilter, setStatusFilter] = useState("all");
    const [isStatusOpen, setIsStatusOpen] = useState(false);

    const [companyFilter, setCompanyFilter] = useState("all");
    const [isCompanyOpen, setIsCompanyOpen] = useState(false);

    const [roleFilter, setRoleFilter] = useState("all");
    const [isRoleOpen, setIsRoleOpen] = useState(false);

    const [dateFilter, setDateFilter] = useState("all");
    const [isDateOpen, setIsDateOpen] = useState(false);

    const [sortBy, setSortBy] = useState("newest");
    const [isSortOpen, setIsSortOpen] = useState(false);

    const [staffList] = useState([
        {
            id: "ST-003840",
            name: "Dr. Sara Ahmed",
            avatarUrl: "",
            companyName: "Shifa Clinic",
            companyCategory: "Healthcare",
            role: "Doctor",
            email: "sara@shifaclinic.com",
            joinedDate: "21 Aug 2026",
            joinedSortKey: "2026-08-21",
            appointmentCount: 128,
            status: "active",
        },
        {
            id: "ST-003841",
            name: "Ali Khan",
            avatarUrl: "",
            companyName: "Elite Fitness",
            companyCategory: "Fitness",
            role: "Trainer",
            email: "ali@elitefitness.com",
            joinedDate: "19 Aug 2026",
            joinedSortKey: "2026-08-19",
            appointmentCount: 96,
            status: "active",
        },
        {
            id: "ST-003842",
            name: "Maham Raza",
            avatarUrl: "",
            companyName: "Urban Wellness",
            companyCategory: "Wellness",
            role: "Therapist",
            email: "maham@urbanwellness.com",
            joinedDate: "17 Aug 2026",
            joinedSortKey: "2026-08-17",
            appointmentCount: 42,
            status: "inactive",
        },
    ]);

    const [totalCount] = useState(3840);
    const [currentPage, setCurrentPage] = useState(1);

    const pageSize = 25;

    // TODO: Replace seeded staffList + totalCount with a real fetch per page.

    // ─────────────── Derived list ───────────────

    const filteredStaffList = useMemo(() => {
        const search = searchQuery.trim().toLowerCase();

        const filtered = staffList.filter((member) => {
            const matchesSearch =
                !search ||
                member.name.toLowerCase().includes(search) ||
                member.email.toLowerCase().includes(search) ||
                member.id.toLowerCase().includes(search) ||
                member.companyName.toLowerCase().includes(search) ||
                member.role.toLowerCase().includes(search);

            const matchesStatus =
                statusFilter === "all" ||
                member.status === statusFilter;

            const matchesCompany =
                companyFilter === "all" ||
                member.companyName
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .includes(companyFilter.replace(/-/g, " ").split(" ")[0]);

            const matchesRole =
                roleFilter === "all" ||
                member.role.toLowerCase() === roleFilter;

            // Date filter is TODO until the API provides precise dates.
            const matchesDate = dateFilter === "all";

            return (
                matchesSearch &&
                matchesStatus &&
                matchesCompany &&
                matchesRole &&
                matchesDate
            );
        });

        // Sorting
        const sorted = [...filtered];

        sorted.sort((a, b) => {
            if (sortBy === "newest") {
                return b.joinedSortKey.localeCompare(a.joinedSortKey);
            }
            if (sortBy === "oldest") {
                return a.joinedSortKey.localeCompare(b.joinedSortKey);
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
        staffList,
        searchQuery,
        statusFilter,
        companyFilter,
        roleFilter,
        dateFilter,
        sortBy,
    ]);

    // ─────────────── Handlers ───────────────

    function handleExportStaff() {
        // TODO: Generate/download a CSV of the current filtered staff list.
    }

    function handlePageChange(page) {
        setCurrentPage(page);

        // TODO: Refetch that page from the API.
    }

    function getStatusStyles(status) {
        if (status === "active") {
            return "bg-green-50 text-green-700";
        }
        return "bg-gray/10 text-slate";
    }

    return (
        <div className="min-h-screen bg-beige flex">

            <SuperAdminSidebar activeItem="Staff" />

            <div className="flex-1 min-w-0 flex flex-col">

                <SuperAdminTopbar unreadCount={3} />

                <main className="flex-1 px-8 py-6">

                    {/* Header */}
                    <div className="flex justify-between items-start gap-6 flex-wrap mb-6">

                        <div>
                            <h1 className="font-serif text-4xl text-navy">
                                Staff
                            </h1>

                            <p className="text-sm text-slate mt-1.5">
                                Manage and review staff members across TIMEORA.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={handleExportStaff}
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
                            Export Staff
                        </button>

                    </div>

                    {/* Stat Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-6">

                        {/* Total Staff */}
                        <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6">

                            <div className="flex justify-between items-center mb-2.5">
                                <span className="text-xs font-bold uppercase tracking-wide text-slate">
                                    Total Staff
                                </span>

                                <Users className="w-[18px] h-[18px] text-navy" />
                            </div>

                            <div className="flex items-center gap-3">
                                <span className="text-4xl font-bold text-navy">
                                    {stats.total.value.toLocaleString()}
                                </span>

                                <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-md bg-green-50 text-green-700">
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

                                <CheckCircle2 className="w-[18px] h-[18px] text-green-600" />
                            </div>

                            <p className="text-4xl font-bold text-navy">
                                {stats.active.toLocaleString()}
                            </p>

                        </div>

                        {/* Inactive */}
                        <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6">

                            <div className="flex justify-between items-center mb-2.5">
                                <span className="text-xs font-bold uppercase tracking-wide text-slate">
                                    Inactive
                                </span>

                                <PauseCircle className="w-[18px] h-[18px] text-orange-500" />
                            </div>

                            <p className="text-4xl font-bold text-navy">
                                {stats.inactive.toLocaleString()}
                            </p>

                        </div>

                        {/* Companies with Staff */}
                        <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-6">

                            <div className="flex justify-between items-center mb-2.5">
                                <span className="text-xs font-bold uppercase tracking-wide text-slate">
                                    Companies w/ Staff
                                </span>

                                <Building2 className="w-[18px] h-[18px] text-navy" />
                            </div>

                            <p className="text-4xl font-bold text-navy">
                                {stats.companiesWithStaff.toLocaleString()}
                            </p>

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
                                        setIsCompanyOpen(false);
                                        setIsRoleOpen(false);
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
                                    Status:{" "}
                                    {statusFilter === "all"
                                        ? "All"
                                        : statusFilter === "active"
                                        ? "Active"
                                        : "Inactive"}
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

                            {/* Company */}
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsCompanyOpen(!isCompanyOpen);
                                        setIsStatusOpen(false);
                                        setIsRoleOpen(false);
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
                                    Company:{" "}
                                    {companyFilter === "all"
                                        ? "All"
                                        : companyFilter === "shifa-clinic"
                                        ? "Shifa Clinic"
                                        : companyFilter === "elite-fitness"
                                        ? "Elite Fitness"
                                        : "Urban Wellness"}
                                    <ChevronDown className="w-3.5 h-3.5 text-slate" />
                                </button>

                                {isCompanyOpen && (
                                    <div className="absolute left-0 top-full mt-2 z-20 w-44 bg-white border border-gray/20 rounded-lg shadow-lg p-1">
                                        {[
                                            { value: "all", label: "All Companies" },
                                            { value: "shifa-clinic", label: "Shifa Clinic" },
                                            { value: "elite-fitness", label: "Elite Fitness" },
                                            { value: "urban-wellness", label: "Urban Wellness" },
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

                            {/* Role */}
                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsRoleOpen(!isRoleOpen);
                                        setIsStatusOpen(false);
                                        setIsCompanyOpen(false);
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
                                    Role:{" "}
                                    {roleFilter === "all"
                                        ? "All"
                                        : roleFilter.charAt(0).toUpperCase() +
                                          roleFilter.slice(1)}
                                    <ChevronDown className="w-3.5 h-3.5 text-slate" />
                                </button>

                                {isRoleOpen && (
                                    <div className="absolute left-0 top-full mt-2 z-20 w-44 bg-white border border-gray/20 rounded-lg shadow-lg p-1">
                                        {[
                                            { value: "all", label: "All Roles" },
                                            { value: "doctor", label: "Doctor" },
                                            { value: "trainer", label: "Trainer" },
                                            { value: "therapist", label: "Therapist" },
                                        ].map((option) => (
                                            <button
                                                key={option.value}
                                                type="button"
                                                onClick={() => {
                                                    setRoleFilter(option.value);
                                                    setIsRoleOpen(false);
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
                                        setIsCompanyOpen(false);
                                        setIsRoleOpen(false);
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
                                    <Calendar className="w-3.5 h-3.5 text-slate" />
                                    Date:{" "}
                                    {dateFilter === "all"
                                        ? "All"
                                        : dateFilter === "week"
                                        ? "This Week"
                                        : dateFilter === "month"
                                        ? "This Month"
                                        : "This Year"}
                                    <ChevronDown className="w-3.5 h-3.5 text-slate" />
                                </button>

                                {isDateOpen && (
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

                        </div>

                        {/* Right — sort */}
                        <div className="flex items-center gap-2">

                            <div className="relative">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsSortOpen(!isSortOpen);
                                        setIsStatusOpen(false);
                                        setIsCompanyOpen(false);
                                        setIsRoleOpen(false);
                                        setIsDateOpen(false);
                                    }}
                                    className="
                                        text-sm
                                        font-bold
                                        text-navy
                                        flex
                                        items-center
                                        gap-1.5
                                        cursor-pointer
                                    "
                                >
                                    Sort:{" "}
                                    {sortBy === "newest"
                                        ? "Newest Joined"
                                        : sortBy === "oldest"
                                        ? "Oldest Joined"
                                        : sortBy === "name"
                                        ? "Name A–Z"
                                        : "Most Appointments"}

                                    <ChevronDown className="w-3.5 h-3.5" />
                                </button>

                                {isSortOpen && (
                                    <div className="absolute right-0 top-full mt-2 z-20 w-52 bg-white border border-gray/20 rounded-lg shadow-lg p-1">
                                        {[
                                            { value: "newest", label: "Newest Joined" },
                                            { value: "oldest", label: "Oldest Joined" },
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
                            <div className="grid grid-cols-[1.2fr_1fr_100px_1.2fr_100px_80px_90px] px-6 py-4 border-b border-gray/20 text-xs font-bold uppercase tracking-wide text-slate min-w-[1000px]">
                                <span>Staff</span>
                                <span>Company</span>
                                <span>Role</span>
                                <span>Contact</span>
                                <span>Joined</span>
                                <span className="text-right">Appts</span>
                                <span>Status</span>
                            </div>

                            {/* Rows */}
                            {filteredStaffList.length > 0 ? (
                                filteredStaffList.map((member) => (
                                    <div
                                        key={member.id}
                                        onClick={() =>
                                            navigate(`/superadmin/staff/${member.id}`)
                                        }
                                        className="
                                            grid
                                            grid-cols-[1.2fr_1fr_100px_1.2fr_100px_80px_90px]
                                            px-6
                                            py-5
                                            border-b
                                            border-gray/20
                                            last:border-b-0
                                            hover:bg-beige/20
                                            transition
                                            min-w-[1000px]
                                            cursor-pointer
                                        "
                                    >

                                        {/* Staff */}
                                        <div className="flex items-center gap-3 min-w-0">

                                            {member.avatarUrl ? (
                                                <img
                                                    src={member.avatarUrl}
                                                    alt={member.name}
                                                    className="w-11 h-11 rounded-lg object-cover flex-shrink-0"
                                                />
                                            ) : (
                                                <div className="w-11 h-11 rounded-lg bg-beige flex items-center justify-center flex-shrink-0">
                                                    <span className="font-serif text-sm font-bold text-navy">
                                                        {member.name
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
                                                    {member.name}
                                                </p>

                                                <p className="text-xs text-slate">
                                                    {member.id}
                                                </p>
                                            </div>

                                        </div>

                                        {/* Company */}
                                        <div className="min-w-0 self-center">
                                            <p className="text-sm font-bold text-navy">
                                                {member.companyName}
                                            </p>

                                            <p className="text-xs text-slate">
                                                {member.companyCategory}
                                            </p>
                                        </div>

                                        {/* Role */}
                                        <span className="text-sm text-slate self-center">
                                            {member.role}
                                        </span>

                                        {/* Contact */}
                                        <span className="text-sm text-slate self-center truncate">
                                            {member.email}
                                        </span>

                                        {/* Joined */}
                                        <span className="text-sm text-navy self-center">
                                            {member.joinedDate}
                                        </span>

                                        {/* Appointments */}
                                        <span className="text-base font-bold text-navy text-right self-center">
                                            {member.appointmentCount}
                                        </span>

                                        {/* Status */}
                                        <span className="self-center">
                                            <span
                                                className={`
                                                    text-xs
                                                    font-bold
                                                    px-2.5
                                                    py-1
                                                    rounded-full
                                                    ${getStatusStyles(member.status)}
                                                `}
                                            >
                                                {member.status === "active" ? "Active" : "Inactive"}
                                            </span>
                                        </span>

                                    </div>
                                ))
                            ) : (
                                <div className="px-6 py-16 text-center min-w-[1000px]">
                                    <p className="text-sm text-slate">
                                        No staff members match the current filters.
                                    </p>
                                </div>
                            )}

                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 border-t border-gray/20 flex justify-between items-center flex-wrap gap-3">

                            <p className="text-sm text-slate">
                                {filteredStaffList.length}-{filteredStaffList.length} of {totalCount.toLocaleString()}
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
                                    onClick={() => handlePageChange(154)}
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
                                            currentPage === 154
                                                ? "bg-navy text-white border-navy"
                                                : "border-gray text-navy hover:bg-beige"
                                        }
                                    `}
                                >
                                    154
                                </button>

                                <button
                                    type="button"
                                    disabled={currentPage === 154}
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

export default Staff;