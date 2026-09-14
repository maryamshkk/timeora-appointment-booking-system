import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    Users,
    Search,
    ChevronDown,
    MoreVertical,
    Eye,
    Phone,
    Calendar,
    UserCheck,
} from "lucide-react";

import StaffSidebar from "../../components/staff/StaffSidebar";
import StaffTopbar from "../../components/staff/StaffTopbar";

function StaffCustomers() {
    const navigate = useNavigate();

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [stats] = useState({
        total: 48,
        new: 6,
        returning: 32,
        active: 41,
    });

    /* TODO: axios GET /api/staff/customers */
    const [customers] = useState([
        {
            id: "CUS-20260819-1024",
            name: "Hina Malik",
            email: "hina@example.com",
            phone: "+92 300 1234567",
            since: "August 2026",
            totalAppointments: 12,
            lastVisit: "21 Aug 2026",
            status: "Returning",
        },
        {
            id: "CUS-20260615-0912",
            name: "Ayesha Khan",
            email: "ayesha@example.com",
            phone: "+92 321 4567890",
            since: "June 2026",
            totalAppointments: 8,
            lastVisit: "20 Aug 2026",
            status: "Returning",
        },
        {
            id: "CUS-20260801-0845",
            name: "David Miller",
            email: "david@example.com",
            phone: "+92 333 9876543",
            since: "August 2026",
            totalAppointments: 3,
            lastVisit: "21 Aug 2026",
            status: "New",
        },
        {
            id: "CUS-20260720-0721",
            name: "Elena Rostova",
            email: "elena@example.com",
            phone: "+92 300 5551122",
            since: "July 2026",
            totalAppointments: 14,
            lastVisit: "20 Aug 2026",
            status: "Returning",
        },
        {
            id: "CUS-20260505-0630",
            name: "James Chen",
            email: "james@example.com",
            phone: "+92 345 1112233",
            since: "May 2026",
            totalAppointments: 6,
            lastVisit: "20 Aug 2026",
            status: "Returning",
        },
    ]);

    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [openMenuId, setOpenMenuId] = useState(null);

    const currentStaff = {
        name: "Dr. Sara Ahmed",
        role: "Doctor",
        avatarUrl: "",
        companyName: "Shifa Clinic",
    };

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

    function getInitials(name) {
        return name
            .split(" ")
            .map((word) => word.charAt(0))
            .slice(0, 2)
            .join("")
            .toUpperCase();
    }

    function getStatusStyle(status) {
        if (status === "New") {
            return "bg-gold/20 text-navy";
        }

        if (status === "Returning") {
            return "bg-green-50 text-green-700";
        }

        return "bg-gray/20 text-slate";
    }

    function handleRowAction(customerId, action) {
        setOpenMenuId(null);

        if (action === "view") {
            navigate(`/staff/customers/${customerId}`);
            return;
        }

        // TODO: axios calls for other actions
    }

    function handleSignOut() {
        navigate("/login");
    }

    const filteredCustomers = customers.filter((customer) => {
        const query = searchQuery.trim().toLowerCase();

        const matchesSearch =
            query === "" ||
            customer.name.toLowerCase().includes(query) ||
            customer.email.toLowerCase().includes(query) ||
            customer.phone.toLowerCase().includes(query);

        const matchesStatus =
            statusFilter === "all" ||
            customer.status.toLowerCase() === statusFilter.toLowerCase();

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="min-h-screen bg-beige flex">

            {/* Sidebar — desktop always visible, mobile slide-in drawer */}
            <StaffSidebar
                companyName={currentStaff.companyName}
                currentStaff={currentStaff}
                activeItem="Customers"
                handleSignOut={handleSignOut}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />

            {/* Main Area */}
            <div className="flex min-w-0 flex-1 flex-col">

                <StaffTopbar
                    avatarUrl={currentStaff.avatarUrl}
                    onMenuClick={() => setSidebarOpen(true)}
                    onSearchClick={() => {}}
                    onNotificationsClick={() =>
                        navigate("/staff/notifications")
                    }
                    onSettingsClick={() => navigate("/staff/settings")}
                />

                <main className="flex-1 bg-beige px-4 py-6 sm:px-6 md:px-8">
                    <div className="mx-auto w-full max-w-7xl">

                        {/* Page Header */}
                        <div className="mb-6">
                            <h1 className="font-serif text-2xl text-navy sm:text-3xl lg:text-4xl">
                                Customers
                            </h1>

                            <p className="mt-1.5 text-sm text-slate">
                                View customers who have appointments with you.
                            </p>
                        </div>

                        {/* Stats */}
                        <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">

                            <div className="rounded-xl border border-gray/20 bg-white p-5 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <h2 className="font-serif text-xl text-navy">
                                        Total
                                    </h2>

                                    <Users className="h-5 w-5 text-navy" />
                                </div>

                                <div className="my-4 border-b border-gray/30"></div>

                                <p className="text-4xl font-bold text-navy">
                                    {stats.total}
                                </p>
                            </div>

                            <div className="rounded-xl border border-gray/20 bg-white p-5 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <h2 className="font-serif text-xl text-navy">
                                        New
                                    </h2>

                                    <UserCheck className="h-5 w-5 text-gold" />
                                </div>

                                <div className="my-4 border-b border-gray/30"></div>

                                <p className="text-4xl font-bold text-navy">
                                    {stats.new}
                                </p>
                            </div>

                            <div className="rounded-xl border border-gray/20 bg-white p-5 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <h2 className="font-serif text-xl text-navy">
                                        Returning
                                    </h2>

                                    <Calendar className="h-5 w-5 text-navy" />
                                </div>

                                <div className="my-4 border-b border-gray/30"></div>

                                <p className="text-4xl font-bold text-navy">
                                    {stats.returning}
                                </p>
                            </div>

                            <div className="rounded-xl border border-gray/20 bg-white p-5 shadow-sm">
                                <div className="flex items-center justify-between">
                                    <h2 className="font-serif text-xl text-navy">
                                        Active
                                    </h2>

                                    <UserCheck className="h-5 w-5 text-green-600" />
                                </div>

                                <div className="my-4 border-b border-gray/30"></div>

                                <p className="text-4xl font-bold text-navy">
                                    {stats.active}
                                </p>
                            </div>

                        </div>

                        {/* Customers Card */}
                        <div className="overflow-hidden rounded-xl border border-gray/20 bg-white shadow-sm">

                            {/* Card Header — Search + Filter */}
                            <div className="border-b border-gray/20 p-5 md:p-6">

                                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                                    <h2 className="font-serif text-lg font-bold text-navy sm:text-xl">
                                        All Customers
                                    </h2>

                                    <div className="flex flex-col gap-3 sm:flex-row">

                                        {/* Search */}
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
                                                onChange={(event) =>
                                                    setSearchQuery(event.target.value)
                                                }
                                                placeholder="Search customers..."
                                                className="
                                                    h-10 w-full rounded-lg border border-gray/40
                                                    pl-9 pr-4 font-serif text-sm text-navy
                                                    outline-none focus:border-navy
                                                    sm:w-64
                                                "
                                            />
                                        </div>

                                        {/* Status Filter */}
                                        <div className="relative">
                                            <select
                                                value={statusFilter}
                                                onChange={(event) =>
                                                    setStatusFilter(event.target.value)
                                                }
                                                className="
                                                    h-10 w-full appearance-none rounded-lg
                                                    border border-gray/40 bg-white pl-3
                                                    pr-9 font-serif text-sm text-navy
                                                    outline-none focus:border-navy
                                                    sm:w-auto
                                                "
                                            >
                                                <option value="all">All Statuses</option>
                                                <option value="new">New</option>
                                                <option value="returning">Returning</option>
                                            </select>

                                            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate" />
                                        </div>

                                    </div>

                                </div>

                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto">
                                <div className="min-w-[900px]">

                                    {/* Header */}
                                    <div className="grid grid-cols-[2fr_1fr_1fr_1fr_120px_48px] items-center border-b border-gray/20 bg-beige/40 px-6 py-3">

                                        <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                            Customer
                                        </p>

                                        <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                            Contact
                                        </p>

                                        <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                            Appointments
                                        </p>

                                        <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                            Last Visit
                                        </p>

                                        <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                            Status
                                        </p>

                                        <span></span>

                                    </div>

                                    {/* Rows */}
                                    {filteredCustomers.map((customer) => (
                                        <div
                                            key={customer.id}
                                            className="
                                                grid grid-cols-[2fr_1fr_1fr_1fr_120px_48px]
                                                items-center border-b border-gray/20
                                                px-6 py-4 transition last:border-b-0
                                                hover:bg-beige/30
                                            "
                                        >

                                            {/* Customer */}
                                            <div className="flex min-w-0 items-center gap-3">

                                                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-navy">
                                                    <span className="text-xs font-bold text-white">
                                                        {getInitials(customer.name)}
                                                    </span>
                                                </div>

                                                <div className="min-w-0">
                                                    <p className="truncate text-sm font-bold text-navy">
                                                        {customer.name}
                                                    </p>

                                                    <p className="mt-0.5 truncate text-xs text-slate">
                                                        {customer.email}
                                                    </p>
                                                </div>

                                            </div>

                                            {/* Contact */}
                                            <div className="min-w-0">
                                                <p className="truncate text-sm text-slate">
                                                    {customer.phone}
                                                </p>
                                            </div>

                                            {/* Appointments */}
                                            <div>
                                                <p className="text-sm font-bold text-navy">
                                                    {customer.totalAppointments}
                                                </p>
                                            </div>

                                            {/* Last Visit */}
                                            <div>
                                                <p className="text-sm text-slate">
                                                    {customer.lastVisit}
                                                </p>
                                            </div>

                                            {/* Status */}
                                            <div>
                                                <span
                                                    className={`
                                                        inline-flex items-center rounded-full
                                                        px-3 py-1 text-xs font-bold
                                                        ${getStatusStyle(customer.status)}
                                                    `}
                                                >
                                                    {customer.status}
                                                </span>
                                            </div>

                                            {/* Actions */}
                                            <div className="relative flex justify-end">

                                                <button
                                                    type="button"
                                                    onClick={(event) => {
                                                        event.stopPropagation();

                                                        setOpenMenuId(
                                                            openMenuId === customer.id
                                                                ? null
                                                                : customer.id
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

                                                {openMenuId === customer.id && (
                                                    <div
                                                        onClick={(event) =>
                                                            event.stopPropagation()
                                                        }
                                                        className="
                                                            absolute right-0 top-10 z-20 w-44
                                                            rounded-xl border border-gray/30
                                                            bg-white p-1.5 shadow-lg
                                                        "
                                                    >

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleRowAction(
                                                                    customer.id,
                                                                    "view"
                                                                )
                                                            }
                                                            className="
                                                                flex w-full items-center gap-3
                                                                rounded-lg px-3 py-2.5 text-sm
                                                                text-navy transition hover:bg-beige
                                                            "
                                                        >
                                                            <Eye className="h-4 w-4" />
                                                            View Details
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                handleRowAction(
                                                                    customer.id,
                                                                    "call"
                                                                )
                                                            }
                                                            className="
                                                                flex w-full items-center gap-3
                                                                rounded-lg px-3 py-2.5 text-sm
                                                                text-navy transition hover:bg-beige
                                                            "
                                                        >
                                                            <Phone className="h-4 w-4" />
                                                            Call Customer
                                                        </button>

                                                    </div>
                                                )}

                                            </div>

                                        </div>
                                    ))}

                                    {/* Empty State */}
                                    {filteredCustomers.length === 0 && (
                                        <div className="flex flex-col items-center px-6 py-16 text-center">

                                            <Users className="mb-3 h-8 w-8 text-gray/60" />

                                            <p className="text-sm font-bold text-navy">
                                                No customers found
                                            </p>

                                            <p className="mt-1 text-xs text-slate">
                                                Try changing your search or filter.
                                            </p>

                                        </div>
                                    )}

                                </div>
                            </div>

                            {/* Footer */}
                            <div className="border-t border-gray/20 px-6 py-4">

                                <p className="text-sm text-slate">
                                    Showing{" "}
                                    <span className="font-bold text-navy">
                                        {filteredCustomers.length}
                                    </span>{" "}
                                    of{" "}
                                    <span className="font-bold text-navy">
                                        {customers.length}
                                    </span>{" "}
                                    customers
                                </p>

                            </div>

                        </div>

                    </div>
                </main>

            </div>

        </div>
    );
}

export default StaffCustomers;