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
                    {/* Content added in next steps */}
                </main>

            </div>

        </div>
    );
}

export default Staff;