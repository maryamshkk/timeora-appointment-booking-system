import React, { useMemo, useState } from "react";
import {
    Plus,
    Users,
    UserCheck,
    CalendarCheck,
    UserMinus,
    Search,
    ChevronDown,
    Mail,
    Phone,
    UserX,
    Loader2,
    AlertCircle,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import StatCard from "../../components/dashboard/StatCard";
import { useStaff } from "../../hooks/company/useStaff";

function capitalizeStatus(status) {
    if (!status) return "Unknown";
    return status.charAt(0).toUpperCase() + status.slice(1);
}

function mapStaff(member) {
    return {
        id: member.id,
        staffId: member.staff_id,
        name: `${member.first_name || ""} ${member.last_name || ""}`.trim(),
        role: member.role?.name || "No role",
        status: capitalizeStatus(member.status),
        isActive: Boolean(member.is_active),
        email: member.account_email || "—",
        phone: member.phone || "—",
        appointmentsToday: 0,
        services: member.services || [],
        availability: member.availability || [],
    };
}

function StaffManagement() {
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [roleFilter, setRoleFilter] = useState("all");

    const {
        data: staffResponse,
        isLoading,
        isError,
        error,
    } = useStaff();

    const staffMembers = useMemo(() => {
        const raw = staffResponse?.data || [];
        return raw.map(mapStaff);
    }, [staffResponse]);

    const roleOptions = useMemo(() => {
        const set = new Set();
        staffMembers.forEach((member) => {
            if (member.role && member.role !== "No role") set.add(member.role);
        });
        return Array.from(set);
    }, [staffMembers]);

    const statusCounts = useMemo(() => {
        const counts = { total: staffMembers.length, active: 0, available: 0, onLeave: 0 };
        staffMembers.forEach((member) => {
            if (member.status === "Active") counts.active += 1;
            if (member.isActive) counts.available += 1;
            if (member.status === "On Leave") counts.onLeave += 1;
        });
        return counts;
    }, [staffMembers]);

    const filteredStaff = useMemo(() => {
        const query = searchQuery.toLowerCase().trim();

        return staffMembers.filter((staff) => {
            const matchesSearch =
                !query ||
                staff.name.toLowerCase().includes(query) ||
                staff.role.toLowerCase().includes(query) ||
                String(staff.staffId || "").toLowerCase().includes(query);

            const matchesStatus =
                statusFilter === "all" || staff.status === statusFilter;

            const matchesRole =
                roleFilter === "all" || staff.role === roleFilter;

            return matchesSearch && matchesStatus && matchesRole;
        });
    }, [staffMembers, searchQuery, statusFilter, roleFilter]);

    return (
        <div className="flex min-h-screen bg-beige">
            <div className="hidden lg:block lg:flex-shrink-0">
                <Sidebar
                    companyName="Shifa Clinic"
                    activeItem="Staff"
                    ctaLabel="Add Staff"
                    ctaPath="/company/staff/add"
                />
            </div>

            {sidebarOpen && (
                <>
                    <button
                        type="button"
                        onClick={() => setSidebarOpen(false)}
                        className="fixed inset-0 z-30 bg-navy/50 lg:hidden"
                        aria-label="Close menu"
                    />

                    <div className="fixed left-0 top-0 z-40 h-screen w-64 overflow-y-auto lg:hidden">
                        <Sidebar
                            companyName="Shifa Clinic"
                            activeItem="Staff"
                            ctaLabel="Add Staff"
                            ctaPath="/company/staff/add"
                        />
                    </div>
                </>
            )}

            <div className="flex min-w-0 flex-1 flex-col">
                <Topbar
                    onMenuClick={() => setSidebarOpen(true)}
                    showBell
                    showHelp
                    profileName="A. Admin"
                    searchPlaceholder="Search..."
                />

                <main className="flex-1 bg-beige px-3 py-4 sm:px-4 sm:py-5 md:px-6 lg:px-8 lg:py-6">
                    <div className="mb-4 flex flex-col gap-3 sm:mb-6 md:flex-row md:items-start md:justify-between">
                        <div>
                            <h1 className="font-serif text-2xl text-navy sm:text-3xl lg:text-4xl">
                                Staff
                            </h1>

                            <p className="mt-1 text-xs text-slate sm:mt-1.5 sm:text-sm">
                                Manage your team, schedules, availability, and
                                appointment workload.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => navigate(`/company/staff/add`)}
                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-navy px-4 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-gold hover:text-navy sm:w-auto sm:px-5 sm:py-3"
                        >
                            <Plus className="h-4 w-4" />
                            Add Staff
                        </button>
                    </div>

                    <div className="mb-4 grid grid-cols-2 gap-3 sm:gap-4 md:mb-6 lg:grid-cols-4">
                        <StatCard
                            label="TOTAL STAFF"
                            value={statusCounts.total}
                            icon={Users}
                        />

                        <StatCard
                            label="ACTIVE"
                            value={statusCounts.active}
                            icon={UserCheck}
                        />

                        <StatCard
                            label="AVAILABLE TODAY"
                            value={statusCounts.available}
                            icon={CalendarCheck}
                        />

                        <StatCard
                            label="ON LEAVE"
                            value={statusCounts.onLeave}
                            icon={UserMinus}
                        />
                    </div>

                    <div className="mb-4 flex flex-col gap-3 sm:mb-6 md:flex-row md:flex-wrap md:items-center md:justify-between">
                        <div className="relative w-full md:max-w-[420px] md:flex-1">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />

                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(event) =>
                                    setSearchQuery(event.target.value)
                                }
                                placeholder="Search by name, role, or staff ID..."
                                className="w-full rounded-lg border border-gray/30 bg-white py-2.5 pl-9 pr-4 text-sm text-navy outline-none placeholder:text-slate/60 focus:border-gold focus:ring-1 focus:ring-gold"
                            />
                        </div>

                        <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-2 md:w-auto md:gap-3">
                            <div className="relative w-full">
                                <select
                                    value={statusFilter}
                                    onChange={(event) =>
                                        setStatusFilter(event.target.value)
                                    }
                                    className="w-full appearance-none rounded-lg border border-gray/30 bg-white px-3 py-2.5 pr-9 text-xs font-bold text-navy outline-none focus:border-gold focus:ring-1 focus:ring-gold sm:px-4 sm:text-sm"
                                >
                                    <option value="all">Status: All</option>
                                    <option value="Active">Status: Active</option>
                                    <option value="Pending">Status: Pending</option>
                                    <option value="Deactivated">Status: Deactivated</option>
                                </select>

                                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate" />
                            </div>

                            <div className="relative w-full">
                                <select
                                    value={roleFilter}
                                    onChange={(event) =>
                                        setRoleFilter(event.target.value)
                                    }
                                    className="w-full appearance-none rounded-lg border border-gray/30 bg-white px-3 py-2.5 pr-9 text-xs font-bold text-navy outline-none focus:border-gold focus:ring-1 focus:ring-gold sm:px-4 sm:text-sm"
                                >
                                    <option value="all">Role: All</option>
                                    {roleOptions.map((role) => (
                                        <option key={role} value={role}>
                                            Role: {role}
                                        </option>
                                    ))}
                                </select>

                                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate" />
                            </div>
                        </div>
                    </div>

                    {isLoading && (
                        <div className="flex items-center justify-center gap-3 rounded-xl border border-gray/20 bg-white py-20">
                            <Loader2 className="h-5 w-5 animate-spin text-navy" />
                            <span className="text-sm text-slate">
                                Loading staff...
                            </span>
                        </div>
                    )}

                    {isError && !isLoading && (
                        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-5 py-4">
                            <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
                            <p className="text-sm text-red-700">
                                {error?.response?.data?.message ||
                                    error?.message ||
                                    "Failed to load staff."}
                            </p>
                        </div>
                    )}

                    {!isLoading && !isError && (
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 xl:grid-cols-3">
                            {filteredStaff.length > 0 ? (
                                filteredStaff.map((staff) => {
                                    const initials = staff.name
                                        .split(" ")
                                        .map((part) => part.charAt(0))
                                        .slice(0, 2)
                                        .join("");

                                    const statusClass =
                                        staff.status === "Active"
                                            ? "bg-green-50 text-green-700"
                                            : staff.status === "Pending"
                                            ? "bg-gold/20 text-amber-700"
                                            : "bg-gray/20 text-slate";

                                    return (
                                        <div
                                            key={staff.id}
                                            onClick={() =>
                                                navigate(`/company/staff/${staff.id}`)
                                            }
                                            className="cursor-pointer rounded-xl border border-gray/20 bg-white p-4 shadow-sm transition hover:shadow-md sm:p-5"
                                        >
                                            <div className="mb-3 flex items-start gap-3">
                                                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray/20 sm:h-14 sm:w-14">
                                                    <span className="text-sm font-bold text-navy">
                                                        {initials}
                                                    </span>
                                                </div>

                                                <div className="min-w-0 flex-1">
                                                    <h3 className="truncate font-serif text-base text-navy sm:text-lg">
                                                        {staff.name}
                                                    </h3>

                                                    <p className="mt-0.5 truncate text-xs text-slate sm:text-sm">
                                                        {staff.role}
                                                    </p>
                                                </div>

                                                <span
                                                    className={`flex-shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold sm:px-2.5 sm:py-1 sm:text-xs ${statusClass}`}
                                                >
                                                    {staff.status}
                                                </span>
                                            </div>

                                            <div className="border-t border-gray/15" />

                                            <div className="mt-3">
                                                <div className="mb-2 flex items-center gap-2 text-xs text-slate sm:text-sm">
                                                    <Mail className="h-3.5 w-3.5 flex-shrink-0" />
                                                    <span className="truncate">
                                                        {staff.email}
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-2 text-xs text-slate sm:text-sm">
                                                    <Phone className="h-3.5 w-3.5 flex-shrink-0" />
                                                    <span>{staff.phone}</span>
                                                </div>
                                            </div>

                                            <div className="mt-3 flex items-center justify-between border-t border-gray/15 pt-3">
                                                <div>
                                                    <p className="text-[10px] text-slate sm:text-xs">
                                                        Today's Appointments
                                                    </p>

                                                    <p className="mt-0.5 text-xs font-bold text-navy sm:text-sm">
                                                        {staff.appointmentsToday} today
                                                    </p>
                                                </div>

                                                <button
                                                    type="button"
                                                    onClick={(event) => {
                                                        event.stopPropagation();
                                                        navigate("/company/calendar");
                                                    }}
                                                    className="text-xs font-bold text-navy hover:underline"
                                                >
                                                    View Schedule
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="col-span-full flex min-h-[240px] flex-col items-center justify-center rounded-xl border border-gray/20 bg-white px-4 sm:min-h-[280px]">
                                    <UserX className="h-8 w-8 text-gray sm:h-10 sm:w-10" />

                                    <p className="mt-4 text-sm font-bold text-slate">
                                        No staff members found
                                    </p>

                                    <p className="mt-1 text-xs text-gray sm:text-sm">
                                        Try adjusting your search or filters.
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default StaffManagement;