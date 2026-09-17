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

    const [companies, setCompanies] = useState([
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
                    {/* Content added in next steps */}
                </main>

            </div>

        </div>
    );
}

export default Companies;