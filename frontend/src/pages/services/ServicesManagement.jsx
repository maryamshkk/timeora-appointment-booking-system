import React, { useMemo, useState } from "react";
import {
    ChevronDown,
    MoreHorizontal,
    Plus,
    Search,
    Loader2,
    AlertCircle,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import StatCard from "../../components/dashboard/StatCard";
import {
    useServices,
    useDeleteService,
    useUpdateService,
} from "../../hooks/company/useServices";

function getInitials(name) {
    if (!name) return "?";
    return name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
}

function avatarColorFromName(name) {
    const palette = [
        "bg-navy text-white",
        "bg-gold text-navy",
        "bg-slate text-white",
        "bg-gray text-navy",
    ];

    if (!name) return palette[0];

    const hash = name
        .split("")
        .reduce((sum, char) => sum + char.charCodeAt(0), 0);

    return palette[hash % palette.length];
}

function formatDuration(minutes) {
    if (!minutes) return "—";

    if (minutes < 60) return `${minutes} min`;

    const hours = Math.floor(minutes / 60);
    const remaining = minutes % 60;

    return remaining
        ? `${hours} hr ${remaining} min`
        : `${hours} hr`;
}

function formatPrice(price) {
    if (price === null || price === undefined) return "Rs. 0";

    return `Rs. ${Number(price).toLocaleString()}`;
}

function mapService(service) {
    return {
        id: service.id,
        name: service.name,
        code: `SRV-${String(service.id).padStart(3, "0")}`,
        durationMinutes: service.duration || 0,
        durationLabel: formatDuration(service.duration),
        priceLabel: formatPrice(service.price),
        price: service.price,
        status:
            service.status === "active"
                ? "Active"
                : "Inactive",
        staff: (service.staff || []).map((member) => ({
            id: member.id,
            name: `${member.first_name || ""} ${
                member.last_name || ""
            }`.trim(),
            initials: getInitials(
                `${member.first_name || ""} ${member.last_name || ""}`.trim()
            ),
            color: avatarColorFromName(member.first_name),
        })),
        bookings: 0,
    };
}

function ServicesManagement() {
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [openActionMenuId, setOpenActionMenuId] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [staffFilter, setStaffFilter] = useState("all");
    const [activityFilter, setActivityFilter] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);

    const {
        data: servicesResponse,
        isLoading,
        isError,
        error,
    } = useServices();

    const deleteMutation = useDeleteService();
    const updateMutation = useUpdateService();

    const services = useMemo(() => {
        const raw = servicesResponse?.data || [];
        return raw.map(mapService);
    }, [servicesResponse]);

    const statusCounts = useMemo(() => {
        const counts = { total: services.length, active: 0, inactive: 0 };
        services.forEach((service) => {
            if (service.status === "Active") counts.active += 1;
            else counts.inactive += 1;
        });
        return counts;
    }, [services]);

    const filteredServices = useMemo(() => {
        return services.filter((service) => {
            const matchesSearch =
                service.name
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                service.code
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase());

            const matchesStatus =
                statusFilter === "all" ||
                service.status.toLowerCase() === statusFilter;

            const matchesStaff =
                staffFilter === "all" ||
                (staffFilter === "assigned" && service.staff.length > 0) ||
                (staffFilter === "unassigned" && service.staff.length === 0);

            const matchesActivity =
                activityFilter === "all" ||
                (activityFilter === "booked" && service.bookings > 0) ||
                (activityFilter === "empty" && service.bookings === 0);

            return (
                matchesSearch &&
                matchesStatus &&
                matchesStaff &&
                matchesActivity
            );
        });
    }, [
        services,
        searchQuery,
        statusFilter,
        staffFilter,
        activityFilter,
    ]);

    const pageSize = 10;

    const totalServices = filteredServices.length;

    const totalPages = Math.max(
        1,
        Math.ceil(totalServices / pageSize)
    );

    const startIndex = (currentPage - 1) * pageSize;

    const paginatedServices = filteredServices.slice(
        startIndex,
        startIndex + pageSize
    );

    const startItem = totalServices === 0 ? 0 : startIndex + 1;

    const endItem = Math.min(startIndex + pageSize, totalServices);

    function handleDelete(service) {
        setOpenActionMenuId(null);

        const confirmed = window.confirm(
            `Delete the service "${service.name}"? This cannot be undone.`
        );

        if (!confirmed) return;

        deleteMutation.mutate(service.id);
    }

    function handleToggleStatus(service) {
        setOpenActionMenuId(null);

        const nextStatus =
            service.status === "Active" ? "disabled" : "active";

        updateMutation.mutate({
            id: service.id,
            payload: { status: nextStatus },
        });
    }

    return (
        <div className="flex min-h-screen bg-beige">
            <div className="hidden lg:block lg:flex-shrink-0">
                <Sidebar
                    companyName="Shifa Clinic"
                    activeItem="Services"
                    ctaLabel="Add Service"
                    ctaPath="/company/services/add"
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
                            activeItem="Services"
                            ctaLabel="Add Service"
                            ctaPath="/company/services/add"
                        />
                    </div>
                </>
            )}

            <div className="flex min-w-0 flex-1 flex-col">
                <Topbar
                    onMenuClick={() => setSidebarOpen(true)}
                    showBell
                    showHelp
                    showProfileDropdown
                    searchPlaceholder="Search services..."
                />

                <main className="flex-1 bg-beige px-3 py-4 sm:px-4 sm:py-5 md:px-6 lg:px-8 lg:py-6">
                    <div className="mb-4 flex flex-col gap-3 sm:mb-6 md:flex-row md:items-start md:justify-between">
                        <div>
                            <h1 className="font-serif text-2xl text-navy sm:text-3xl lg:text-4xl">
                                Services
                            </h1>

                            <p className="mt-1 text-xs text-slate sm:mt-1.5 sm:text-sm">
                                Manage the services your company offers and the
                                staff assigned to each service.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => navigate("/company/services/add")}
                            className="flex w-full items-center justify-center gap-2 rounded-lg bg-navy px-4 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-gold hover:text-navy sm:w-auto sm:px-5 sm:py-3"
                        >
                            <Plus className="h-4 w-4" />
                            Add Service
                        </button>
                    </div>

                    <div className="mb-4 grid grid-cols-2 gap-3 sm:gap-4 md:mb-6 lg:grid-cols-4">
                        <StatCard value={statusCounts.total} label="TOTAL SERVICES" />
                        <StatCard value={statusCounts.active} label="ACTIVE" />
                        <StatCard value={statusCounts.inactive} label="INACTIVE" />
                        <StatCard value={0} label="TODAY'S APPOINTMENTS" />
                    </div>

                    <div className="rounded-xl border border-gray/20 bg-white p-3 shadow-sm sm:p-4 md:p-6">
                        <div className="mb-4 flex flex-col gap-3 md:mb-6 md:flex-row md:items-center md:gap-4">
                            <div className="relative w-full md:max-w-[360px] md:flex-1">
                                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />

                                <input
                                    type="text"
                                    placeholder="Search services..."
                                    value={searchQuery}
                                    onChange={(event) => {
                                        setSearchQuery(event.target.value);
                                        setCurrentPage(1);
                                    }}
                                    className="h-10 w-full rounded-lg border border-gray/40 bg-white pl-10 pr-4 text-sm text-navy outline-none transition focus:border-navy focus:ring-2 focus:ring-gold sm:h-11"
                                />
                            </div>

                            <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-3 md:w-auto md:gap-3">
                                <div className="relative w-full">
                                    <select
                                        value={statusFilter}
                                        onChange={(event) => {
                                            setStatusFilter(event.target.value);
                                            setCurrentPage(1);
                                        }}
                                        className="h-10 w-full cursor-pointer appearance-none rounded-lg border border-gray/40 bg-white pl-3 pr-9 text-xs font-bold text-navy outline-none transition focus:border-navy focus:ring-2 focus:ring-gold sm:h-11 sm:pl-4 sm:pr-10 sm:text-sm"
                                    >
                                        <option value="all">All Status</option>
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>

                                    <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate sm:right-3" />
                                </div>

                                <div className="relative w-full">
                                    <select
                                        value={staffFilter}
                                        onChange={(event) => {
                                            setStaffFilter(event.target.value);
                                            setCurrentPage(1);
                                        }}
                                        className="h-10 w-full cursor-pointer appearance-none rounded-lg border border-gray/40 bg-white pl-3 pr-9 text-xs font-bold text-navy outline-none transition focus:border-navy focus:ring-2 focus:ring-gold sm:h-11 sm:pl-4 sm:pr-10 sm:text-sm"
                                    >
                                        <option value="all">All Staff</option>
                                        <option value="assigned">Assigned</option>
                                        <option value="unassigned">Unassigned</option>
                                    </select>

                                    <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate sm:right-3" />
                                </div>

                                <div className="relative w-full">
                                    <select
                                        value={activityFilter}
                                        onChange={(event) => {
                                            setActivityFilter(event.target.value);
                                            setCurrentPage(1);
                                        }}
                                        className="h-10 w-full cursor-pointer appearance-none rounded-lg border border-gray/40 bg-white pl-3 pr-9 text-xs font-bold text-navy outline-none transition focus:border-navy focus:ring-2 focus:ring-gold sm:h-11 sm:pl-4 sm:pr-10 sm:text-sm"
                                    >
                                        <option value="all">All Activity</option>
                                        <option value="booked">Has Bookings</option>
                                        <option value="empty">No Bookings</option>
                                    </select>

                                    <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate sm:right-3" />
                                </div>
                            </div>
                        </div>

                        {isLoading && (
                            <div className="flex items-center justify-center gap-3 py-20">
                                <Loader2 className="h-5 w-5 animate-spin text-navy" />
                                <span className="text-sm text-slate">
                                    Loading services...
                                </span>
                            </div>
                        )}

                        {isError && !isLoading && (
                            <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                                <p className="text-sm text-red-700">
                                    {error?.response?.data?.message ||
                                        error?.message ||
                                        "Failed to load services."}
                                </p>
                            </div>
                        )}

                        {!isLoading && !isError && (
                            <div className="-mx-3 overflow-x-auto sm:-mx-4 md:-mx-6">
                                <div className="inline-block min-w-full px-3 sm:px-4 md:px-6">
                                    <table className="w-full min-w-[900px]">
                                        <thead>
                                            <tr className="border-b border-gray/30 text-left">
                                                <th className="px-3 py-3 text-xs font-bold uppercase tracking-wide text-slate md:px-4">
                                                    Service
                                                </th>
                                                <th className="px-3 py-3 text-xs font-bold uppercase tracking-wide text-slate md:px-4">
                                                    Duration
                                                </th>
                                                <th className="px-3 py-3 text-xs font-bold uppercase tracking-wide text-slate md:px-4">
                                                    Price
                                                </th>
                                                <th className="px-3 py-3 text-xs font-bold uppercase tracking-wide text-slate md:px-4">
                                                    Assigned Staff
                                                </th>
                                                <th className="px-3 py-3 text-xs font-bold uppercase tracking-wide text-slate md:px-4">
                                                    Bookings
                                                </th>
                                                <th className="px-3 py-3 text-xs font-bold uppercase tracking-wide text-slate md:px-4">
                                                    Status
                                                </th>
                                                <th className="px-3 py-3 text-xs font-bold uppercase tracking-wide text-slate md:px-4">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>

                                        <tbody>
                                            {paginatedServices.map((service) => (
                                                <tr
                                                    key={service.id}
                                                    className="border-b border-gray/20 last:border-b-0"
                                                >
                                                    <td className="px-3 py-3 md:px-4 md:py-4">
                                                        <div>
                                                            <p className="font-serif text-sm font-bold text-navy">
                                                                {service.name}
                                                            </p>

                                                            <p className="mt-1 text-xs text-slate">
                                                                {service.code}
                                                            </p>
                                                        </div>
                                                    </td>

                                                    <td className="whitespace-nowrap px-3 py-3 text-sm text-slate md:px-4 md:py-4">
                                                        {service.durationLabel}
                                                    </td>

                                                    <td className="whitespace-nowrap px-3 py-3 font-serif text-sm font-bold text-navy md:px-4 md:py-4">
                                                        {service.priceLabel}
                                                    </td>

                                                    <td className="px-3 py-3 md:px-4 md:py-4">
                                                        <div className="flex items-center">
                                                            {service.staff
                                                                .slice(0, 3)
                                                                .map((member, index) => (
                                                                    <div
                                                                        key={member.id}
                                                                        className={`
                                                                            flex h-7 w-7 items-center justify-center
                                                                            rounded-full border-2 border-white
                                                                            text-[10px] font-bold
                                                                            md:h-8 md:w-8
                                                                            ${member.color}
                                                                            ${index > 0 ? "-ml-2" : ""}
                                                                        `}
                                                                        title={member.name}
                                                                    >
                                                                        {member.initials}
                                                                    </div>
                                                                ))}

                                                            {service.staff.length > 3 && (
                                                                <div className="-ml-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-beige text-[10px] font-bold text-navy md:h-8 md:w-8">
                                                                    +{service.staff.length - 3}
                                                                </div>
                                                            )}

                                                            {service.staff.length === 0 && (
                                                                <span className="text-xs italic text-slate">
                                                                    Unassigned
                                                                </span>
                                                            )}
                                                        </div>
                                                    </td>

                                                    <td className="px-3 py-3 font-serif text-sm font-bold text-navy md:px-4 md:py-4">
                                                        {service.bookings}
                                                    </td>

                                                    <td className="px-3 py-3 md:px-4 md:py-4">
                                                        {service.status === "Active" ? (
                                                            <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-green-50 px-2.5 py-1 text-[10px] font-bold text-green-700 md:gap-2 md:px-3 md:py-1.5 md:text-xs">
                                                                <span className="h-1.5 w-1.5 rounded-full bg-green-600" />
                                                                Active
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-gray-100 px-2.5 py-1 text-[10px] font-bold text-slate md:gap-2 md:px-3 md:py-1.5 md:text-xs">
                                                                <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                                                                Inactive
                                                            </span>
                                                        )}
                                                    </td>

                                                    <td className="px-3 py-3 md:px-4 md:py-4">
                                                        <div className="relative">
                                                            <button
                                                                type="button"
                                                                onClick={() => {
                                                                    setOpenActionMenuId(
                                                                        openActionMenuId === service.id
                                                                            ? null
                                                                            : service.id
                                                                    );
                                                                }}
                                                                className="rounded-lg p-2 text-slate transition hover:bg-beige hover:text-navy"
                                                                aria-label="Actions"
                                                            >
                                                                <MoreHorizontal className="h-5 w-5" />
                                                            </button>

                                                            {openActionMenuId === service.id && (
                                                                <div className="absolute right-0 top-10 z-20 w-40 rounded-lg border border-gray/20 bg-white p-1 shadow-lg">
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => {
                                                                            setOpenActionMenuId(null);
                                                                            navigate(
                                                                                `/company/services/${service.id}/edit`
                                                                            );
                                                                        }}
                                                                        className="w-full rounded-md px-3 py-2 text-left text-sm text-navy hover:bg-beige"
                                                                    >
                                                                        Edit
                                                                    </button>

                                                                    <button
                                                                        type="button"
                                                                        onClick={() =>
                                                                            handleToggleStatus(service)
                                                                        }
                                                                        className="w-full rounded-md px-3 py-2 text-left text-sm text-slate hover:bg-beige"
                                                                    >
                                                                        {service.status === "Active"
                                                                            ? "Deactivate"
                                                                            : "Activate"}
                                                                    </button>

                                                                    <button
                                                                        type="button"
                                                                        onClick={() =>
                                                                            handleDelete(service)
                                                                        }
                                                                        className="w-full rounded-md px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                                                                    >
                                                                        Delete
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                    {paginatedServices.length === 0 && (
                                        <div className="py-12 text-center">
                                            <p className="text-sm font-bold text-navy">
                                                No services found
                                            </p>

                                            <p className="mt-1 text-sm text-slate">
                                                Try adjusting your search or filters.
                                            </p>
                                        </div>
                                    )}

                                    <div className="mt-5 flex flex-col gap-3 border-t border-gray/20 pt-4 sm:flex-row sm:items-center sm:justify-between md:mt-6 md:pt-5">
                                        <p className="text-xs text-slate sm:text-sm">
                                            Showing{" "}
                                            <span className="font-bold text-navy">
                                                {startItem}-{endItem}
                                            </span>{" "}
                                            of{" "}
                                            <span className="font-bold text-navy">
                                                {totalServices}
                                            </span>
                                        </p>

                                        <div className="flex items-center justify-center gap-1 sm:justify-end">
                                            <button
                                                type="button"
                                                disabled={currentPage === 1}
                                                onClick={() =>
                                                    setCurrentPage(currentPage - 1)
                                                }
                                                className="rounded-lg px-3 py-2 text-xs font-bold text-slate transition hover:bg-beige hover:text-navy disabled:cursor-not-allowed disabled:opacity-40 sm:text-sm"
                                            >
                                                Previous
                                            </button>

                                            {Array.from(
                                                { length: totalPages },
                                                (_, index) => index + 1
                                            ).map((page) => (
                                                <button
                                                    key={page}
                                                    type="button"
                                                    onClick={() => setCurrentPage(page)}
                                                    className={`
                                                        h-8 min-w-8 rounded-lg px-3 text-xs font-bold transition
                                                        sm:h-9 sm:min-w-9 sm:text-sm
                                                        ${
                                                            currentPage === page
                                                                ? "bg-navy text-white"
                                                                : "text-slate hover:bg-beige hover:text-navy"
                                                        }
                                                    `}
                                                >
                                                    {page}
                                                </button>
                                            ))}

                                            <button
                                                type="button"
                                                disabled={currentPage === totalPages}
                                                onClick={() =>
                                                    setCurrentPage(currentPage + 1)
                                                }
                                                className="rounded-lg px-3 py-2 text-xs font-bold text-slate transition hover:bg-beige hover:text-navy disabled:cursor-not-allowed disabled:opacity-40 sm:text-sm"
                                            >
                                                Next
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default ServicesManagement;