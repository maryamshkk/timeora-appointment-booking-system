import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    Calendar,
    CalendarCheck,
    CheckCircle2,
    ChevronDown,
    ChevronRight,
    Clock,
    Download,
    Users,
    XCircle,
} from "lucide-react";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import StatCard from "../../components/dashboard/StatCard";
import api from "../../services/api";

function StaffReport() {

    const [periodFilter, setPeriodFilter] = useState("month");

    const [dateRange, setDateRange] = useState({
        start: "2026-08-01",
        end: "2026-08-21",
    });

    const [staffFilter, setStaffFilter] = useState("all");

    const [currentPage, setCurrentPage] = useState(1);

    const [reportSummary, setReportSummary] = useState(null);
    const [staffData, setStaffData] = useState([]);
    const [loading, setLoading] = useState(false);

    const mockStaffData = [
        {
            staffId: "STF-0001",
            name: "Dr. Aris Thorne",
            role: "Senior Specialist",
            appointments: 32,
            completed: 27,
            cancelled: 3,
            noShow: 2,
            hours: "142h",
            revenue: "Rs. 145,000",
        },
        {
            staffId: "STF-0002",
            name: "Dr. Sarah Chen",
            role: "Consultant",
            appointments: 28,
            completed: 23,
            cancelled: 3,
            noShow: 2,
            hours: "128h",
            revenue: "Rs. 118,000",
        },
        {
            staffId: "STF-0003",
            name: "Dr. James Wilson",
            role: "General Physician",
            appointments: 19,
            completed: 16,
            cancelled: 2,
            noShow: 1,
            hours: "96h",
            revenue: "Rs. 92,000",
        },
        {
            staffId: "STF-0004",
            name: "Dr. Emily Carter",
            role: "Therapist",
            appointments: 24,
            completed: 21,
            cancelled: 2,
            noShow: 1,
            hours: "112h",
            revenue: "Rs. 86,000",
        },
        {
            staffId: "STF-0005",
            name: "Dr. Michael Reed",
            role: "Consultant",
            appointments: 15,
            completed: 11,
            cancelled: 2,
            noShow: 2,
            hours: "78h",
            revenue: "Rs. 64,000",
        },
        {
            staffId: "STF-0006",
            name: "Dr. Olivia Martin",
            role: "Specialist",
            appointments: 10,
            completed: 8,
            cancelled: 1,
            noShow: 1,
            hours: "54h",
            revenue: "Rs. 51,000",
        },
        {
            staffId: "STF-0007",
            name: "Dr. Daniel Scott",
            role: "Therapist",
            appointments: 8,
            completed: 6,
            cancelled: 1,
            noShow: 1,
            hours: "42h",
            revenue: "Rs. 38,000",
        },
        {
            staffId: "STF-0008",
            name: "Dr. Sophia Blake",
            role: "Consultant",
            appointments: 7,
            completed: 5,
            cancelled: 1,
            noShow: 1,
            hours: "36h",
            revenue: "Rs. 31,000",
        },
    ];

    useEffect(() => {
        setStaffData(mockStaffData);
    }, []);

    useEffect(() => {
        async function fetchStaffReport() {
            setLoading(true);

            try {
                const params = {
                    period: periodFilter,
                    start_date: dateRange.start,
                    end_date: dateRange.end,
                    staff:
                        staffFilter !== "all"
                            ? staffFilter
                            : undefined,
                    page: currentPage,
                };

                /*
                const [summaryResponse, staffResponse] =
                    await Promise.all([
                        api.get("/company/reports/staff/summary", {
                            params,
                        }),
                        api.get("/company/reports/staff", {
                            params,
                        }),
                    ]);

                setReportSummary(summaryResponse.data);

                setStaffData(
                    staffResponse.data.data || []
                );
                */
            } catch (error) {
                // TODO: show reusable error notification
            } finally {
                setLoading(false);
            }
        }

        // Enable when backend staff report APIs are ready.
        // fetchStaffReport();
    }, [
        periodFilter,
        dateRange.start,
        dateRange.end,
        staffFilter,
        currentPage,
    ]);

    const filteredStaff = staffData.filter((member) => {
        if (staffFilter === "all") {
            return true;
        }

        return member.name === staffFilter;
    });

    const statCards = [
        {
            label: "TOTAL STAFF",
            value: reportSummary?.total_staff ?? 8,
            icon: Users,
            iconBg: "bg-gray/10",
            iconColor: "text-slate",
        },
        {
            label: "ACTIVE STAFF",
            value: reportSummary?.active_staff ?? 8,
            icon: CheckCircle2,
            iconBg: "bg-green-50",
            iconColor: "text-green-600",
        },
        {
            label: "TOTAL APPOINTMENTS",
            value: reportSummary?.total_appointments ?? 143,
            icon: CalendarCheck,
            iconBg: "bg-gray/10",
            iconColor: "text-slate",
        },
        {
            label: "COMPLETED",
            value: reportSummary?.completed ?? 117,
            icon: CheckCircle2,
            iconBg: "bg-green-50",
            iconColor: "text-green-600",
        },
        {
            label: "TOTAL HOURS",
            value: reportSummary?.total_hours ?? "688h",
            icon: Clock,
            iconBg: "bg-gold/15",
            iconColor: "text-amber-600",
        },
    ];

    async function handleExport(event) {
        event.preventDefault();

        try {
            const response = await api.get(
                "/company/reports/staff/export?format=csv",
                {
                    responseType: "blob",
                    params: {
                        start_date: dateRange.start,
                        end_date: dateRange.end,
                        staff:
                            staffFilter !== "all"
                                ? staffFilter
                                : undefined,
                    },
                }
            );

            const url = window.URL.createObjectURL(
                new Blob([response.data])
            );

            const link = document.createElement("a");

            link.href = url;

            link.setAttribute(
                "download",
                "timeora-staff-report.csv"
            );

            document.body.appendChild(link);

            link.click();

            link.remove();

            window.URL.revokeObjectURL(url);
        } catch (error) {
            // TODO: show reusable error notification
        }
    }

    function getCompletionRate(member) {
        if (!member.appointments) {
            return 0;
        }

        return Math.round(
            (member.completed / member.appointments) * 100
        );
    }

    return (
        <div className="min-h-screen flex bg-beige">

            <Sidebar
                companyName="Shifa Clinic"
                activeItem="Reports"
            />

            <div className="flex-1 min-w-0">

                <Topbar
                    showBell
                    simpleProfileIcon
                    searchPlaceholder="Search..."
                />

                <main className="bg-beige px-4 sm:px-6 lg:px-8 py-6">

                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 mb-5">

                        <Link
                            to="/reports"
                            className="text-xs font-bold uppercase tracking-wide text-slate hover:text-navy transition"
                        >
                            Reports & Analytics
                        </Link>

                        <ChevronRight className="w-3 h-3 text-gray" />

                        <span className="text-xs text-navy">
                            Staff Report
                        </span>

                    </div>

                    {/* Header */}
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 mb-6">

                        <div>

                            <Link
                                to="/reports"
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate hover:text-navy transition mb-3"
                            >
                                <ArrowLeft className="w-3.5 h-3.5" />
                                Back to Reports
                            </Link>

                            <h1 className="font-serif text-4xl text-navy">
                                Staff Report
                            </h1>

                            <p className="text-sm text-slate mt-1.5 max-w-[520px]">
                                Review staff performance, working hours,
                                appointments, and revenue generated.
                            </p>

                        </div>

                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">

                            <button
                                type="button"
                                className="bg-white border border-gray/30 rounded-lg px-4 py-2.5 flex items-center justify-center gap-2 text-sm font-bold text-navy hover:border-navy transition"
                            >
                                <Calendar className="w-4 h-4" />

                                <span>
                                    {dateRange.start} — {dateRange.end}
                                </span>

                                <ChevronDown className="w-3.5 h-3.5" />
                            </button>

                            <button
                                type="button"
                                onClick={handleExport}
                                className="bg-navy text-white px-5 py-2.5 rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:bg-gold hover:text-navy transition"
                            >
                                <Download className="w-4 h-4" />
                                Export
                            </button>

                        </div>

                    </div>

                    {/* Period Filter */}
                    <div className="flex items-center gap-6 border-b border-gray/20 pb-3 mb-6 overflow-x-auto">

                        {[
                            {
                                key: "today",
                                label: "Today",
                            },
                            {
                                key: "week",
                                label: "This Week",
                            },
                            {
                                key: "month",
                                label: "Monthly",
                            },
                        ].map((period) => {

                            const isActive =
                                periodFilter === period.key;

                            return (
                                <button
                                    key={period.key}
                                    type="button"
                                    onClick={() => {
                                        setPeriodFilter(
                                            period.key
                                        );
                                        setCurrentPage(1);
                                    }}
                                    className={`
                                        text-sm
                                        font-bold
                                        whitespace-nowrap
                                        pb-3
                                        -mb-3
                                        border-b-2
                                        transition
                                        ${
                                            isActive
                                                ? "text-navy border-navy"
                                                : "text-slate border-transparent hover:text-navy"
                                        }
                                    `}
                                >
                                    {period.label}
                                </button>
                            );
                        })}

                    </div>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">

                        {statCards.map((card) => (
                            <StatCard
                                key={card.label}
                                label={card.label}
                                value={card.value}
                                icon={card.icon}
                                iconBg={card.iconBg}
                                iconColor={card.iconColor}
                            />
                        ))}

                    </div>

                    {/* Staff Performance */}
                    <div className="bg-white rounded-xl border border-gray/20 shadow-sm overflow-hidden">

                        {/* Header */}
                        <div className="p-6 border-b border-gray/20">

                            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                                <div>
                                    <h2 className="font-serif text-xl text-navy">
                                        Staff Performance
                                    </h2>

                                    <p className="text-xs text-slate mt-1">
                                        Detailed performance breakdown for
                                        each staff member.
                                    </p>
                                </div>

                                <select
                                    value={staffFilter}
                                    onChange={(event) => {
                                        setStaffFilter(
                                            event.target.value
                                        );
                                        setCurrentPage(1);
                                    }}
                                    className="h-9 w-full sm:w-auto rounded-lg border border-gray/30 bg-white px-3 text-xs font-bold text-navy outline-none focus:border-navy"
                                >
                                    <option value="all">
                                        All Staff
                                    </option>

                                    {mockStaffData.map((member) => (
                                        <option
                                            key={member.staffId}
                                            value={member.name}
                                        >
                                            {member.name}
                                        </option>
                                    ))}
                                </select>

                            </div>

                        </div>

                        {/* Loading */}
                        {loading && (
                            <div className="px-6 py-3 border-b border-gray/20 bg-beige/30">
                                <p className="text-xs font-bold text-slate">
                                    Loading staff report...
                                </p>
                            </div>
                        )}

                        {/* Table */}
                        <div className="overflow-x-auto">

                            <table className="w-full min-w-[1100px]">

                                <thead>

                                    <tr className="bg-beige/50">

                                        <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">
                                            Staff
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">
                                            Appointments
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">
                                            Completed
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">
                                            Cancelled
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">
                                            No-show
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">
                                            Completion
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">
                                            Hours
                                        </th>

                                        <th className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate">
                                            Revenue
                                        </th>

                                    </tr>

                                </thead>

                                <tbody className="divide-y divide-gray/10">

                                    {filteredStaff.length > 0 ? (
                                        filteredStaff.map((member) => (
                                            <tr
                                                key={member.staffId}
                                                className="hover:bg-beige/30 transition"
                                            >

                                                {/* Staff */}
                                                <td className="px-6 py-4">

                                                    <p className="text-sm font-bold text-navy">
                                                        {member.name}
                                                    </p>

                                                    <p className="text-xs text-slate mt-0.5">
                                                        {member.role}
                                                    </p>

                                                    <p className="text-[11px] text-gray mt-0.5">
                                                        {member.staffId}
                                                    </p>

                                                </td>

                                                {/* Appointments */}
                                                <td className="px-6 py-4 text-sm font-bold text-navy">
                                                    {member.appointments}
                                                </td>

                                                {/* Completed */}
                                                <td className="px-6 py-4">

                                                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-green-700">
                                                        <CheckCircle2 className="w-4 h-4" />
                                                        {member.completed}
                                                    </span>

                                                </td>

                                                {/* Cancelled */}
                                                <td className="px-6 py-4">

                                                    <span className="inline-flex items-center gap-1.5 text-sm font-bold text-red-600">
                                                        <XCircle className="w-4 h-4" />
                                                        {member.cancelled}
                                                    </span>

                                                </td>

                                                {/* No Show */}
                                                <td className="px-6 py-4 text-sm font-bold text-amber-700">
                                                    {member.noShow}
                                                </td>

                                                {/* Completion Rate */}
                                                <td className="px-6 py-4">

                                                    <div className="w-28">

                                                        <div className="flex items-center justify-between mb-1">

                                                            <span className="text-xs font-bold text-navy">
                                                                {getCompletionRate(
                                                                    member
                                                                )}%
                                                            </span>

                                                        </div>

                                                        <div className="h-1.5 bg-beige rounded-full overflow-hidden">

                                                            <div
                                                                className="h-full bg-navy rounded-full"
                                                                style={{
                                                                    width: `${getCompletionRate(
                                                                        member
                                                                    )}%`,
                                                                }}
                                                            />

                                                        </div>

                                                    </div>

                                                </td>

                                                {/* Hours */}
                                                <td className="px-6 py-4">

                                                    <span className="inline-flex items-center gap-1.5 text-sm text-slate">
                                                        <Clock className="w-4 h-4" />
                                                        {member.hours}
                                                    </span>

                                                </td>

                                                {/* Revenue */}
                                                <td className="px-6 py-4 text-sm font-bold text-navy">
                                                    {member.revenue}
                                                </td>

                                            </tr>
                                        ))
                                    ) : (
                                        <tr>

                                            <td
                                                colSpan="8"
                                                className="px-6 py-12 text-center"
                                            >
                                                <p className="text-sm font-bold text-navy">
                                                    No staff data found.
                                                </p>

                                                <p className="text-xs text-slate mt-1">
                                                    Try changing the selected
                                                    staff member.
                                                </p>
                                            </td>

                                        </tr>
                                    )}

                                </tbody>

                            </table>

                        </div>

                        {/* Footer */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-6 py-4 border-t border-gray/20">

                            <p className="text-xs text-slate">
                                Showing 1 to {filteredStaff.length} of{" "}
                                {reportSummary?.total_staff ?? 8} staff
                            </p>

                            <div className="flex items-center gap-1">

                                <button
                                    type="button"
                                    disabled={currentPage === 1}
                                    onClick={() =>
                                        setCurrentPage((page) =>
                                            Math.max(
                                                1,
                                                page - 1
                                            )
                                        )
                                    }
                                    className="px-3 py-1.5 rounded-md text-xs font-bold text-slate hover:bg-beige disabled:opacity-40 disabled:cursor-not-allowed transition"
                                >
                                    Prev
                                </button>

                                {[1, 2, 3].map((page) => (
                                    <button
                                        key={page}
                                        type="button"
                                        onClick={() =>
                                            setCurrentPage(page)
                                        }
                                        className={`
                                            w-8
                                            h-8
                                            rounded-md
                                            text-xs
                                            font-bold
                                            transition
                                            ${
                                                currentPage === page
                                                    ? "bg-navy text-white"
                                                    : "text-slate hover:bg-beige"
                                            }
                                        `}
                                    >
                                        {page}
                                    </button>
                                ))}

                                <span className="px-2 text-xs text-slate">
                                    ...
                                </span>

                                <button
                                    type="button"
                                    onClick={() =>
                                        setCurrentPage(
                                            (page) => page + 1
                                        )
                                    }
                                    className="px-3 py-1.5 rounded-md text-xs font-bold text-slate hover:bg-beige transition"
                                >
                                    Next
                                </button>

                            </div>

                        </div>

                    </div>

                </main>

            </div>

        </div>
    );
}

export default StaffReport;