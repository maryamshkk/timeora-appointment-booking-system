import React, { useState } from "react";
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

import SuperAdminSidebar from "../../components/superadmin/SuperAdminSidebar";
import SuperAdminTopbar from "../../components/superadmin/SuperAdminTopbar";

function Staff() {
    const [stats] = useState({
        total: { value: 3840, deltaPercent: 12 },
        active: 3520,
        inactive: 320,
        companiesWithStaff: 1105,
    });

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
            appointmentCount: 42,
            status: "inactive",
        },
    ]);

    const [totalCount] = useState(3840);
    const [currentPage, setCurrentPage] = useState(1);

    const pageSize = 25;

    // TODO: Replace seeded staffList + totalCount with a real fetch per page.

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

    {/* Filter row added next */}

</main>

            </div>

        </div>
    );
}

export default Staff;