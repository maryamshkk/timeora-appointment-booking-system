import React, { useState } from "react";
import {
    AlertTriangle,
    Calendar,
    CheckCircle2,
    ChevronRight,
    Clock,
    IdCard,
    Mail,
    MoreVertical,
    Phone,
    XCircle,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import SuperAdminSidebar from "../../components/superadmin/SuperAdminSidebar";
import SuperAdminTopbar from "../../components/superadmin/SuperAdminTopbar";

function SuperAdminCustomerDetails() {
    const { id } = useParams();

    const [customer] = useState({
        id: "CU-028430",
        name: "Hina Malik",
        avatarUrl: "",
        email: "hina@example.com",
        phone: "+92 300 1234567",
        status: "active",
        registeredDate: "21 Aug 2026",
        lastActivity: "20 Aug 2026",

        stats: {
            total: 8,
            completed: 5,
            cancelled: 1,
            upcoming: 2,
        },

        attentionIssues: [],

        companyActivity: [
            { name: "Shifa Clinic", appointmentCount: 8 },
            { name: "Elite Wellness", appointmentCount: 3 },
            { name: "Urban Fitness", appointmentCount: 2 },
        ],

        activityTrend: [
            { month: "Sep", value: 1 },
            { month: "Oct", value: 0.3 },
            { month: "Nov", value: 2 },
            { month: "Dec", value: 1 },
            { month: "Jan", value: 2.7 },
            { month: "Feb", value: 1.5 },
            { month: "Mar", value: 1 },
            { month: "Apr", value: 4 },
            { month: "May", value: 1.8 },
            { month: "Jun", value: 2.8 },
            { month: "Jul", value: 1.2 },
            { month: "Aug", value: 5 },
        ],

        appointmentHistory: [
            {
                date: "21 Aug 2026",
                time: "09:00 AM",
                company: "Shifa Clinic",
                service: "Consultation",
                staffName: "Dr. Sara Ahmed",
            },
            {
                date: "18 Aug 2026",
                time: "11:00 AM",
                company: "Elite Wellness",
                service: "Therapy",
                staffName: "Malik Rehman",
            },
        ],
    });

    // TODO: Replace seeded customer with a real fetch keyed by the route param.

    const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

    function handleChangeStatus() {
        // TODO: Open a status-change flow, likely with confirmation
        // since it affects a real customer's account.
    }

    return (
        <div className="min-h-screen bg-beige flex">

            <SuperAdminSidebar activeItem="Customers" />

            <div className="flex-1 min-w-0 flex flex-col">

                <SuperAdminTopbar unreadCount={3} />

                <main className="flex-1 px-8 py-6">
                    {/* Content added in next steps */}
                </main>

            </div>

        </div>
    );
}

export default SuperAdminCustomerDetails;