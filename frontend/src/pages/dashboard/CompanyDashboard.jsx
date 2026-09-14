import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    CalendarDays,
    Clock,
    CheckCircle2,
    XCircle,
    Plus,
    UserPlus,
    FilePlus2,
    Loader2,
    AlertCircle,
} from "lucide-react";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";
import StatCard from "../../components/dashboard/StatCard";
import AppointmentsTable from "../../components/dashboard/AppointmentsTable";
import PerformanceChart from "../../components/dashboard/PerformanceChart";
import ScheduleTimeline from "../../components/dashboard/ScheduleTimeline";
import StaffOverview from "../../components/dashboard/StaffOverview";
import RecentActivity from "../../components/dashboard/RecentActivity";
import { useCompanyDashboard } from "../../hooks/company/useDashboard";
import { useAuth } from "../../hooks/authHook";

function CompanyDashboard({ companyName = "Shifa Clinic" }) {
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const { data: authUser } = useAuth();

    const profileName =
        authUser?.name ||
        authUser?.full_name ||
        "Admin";

    const {
        data: dashboardResponse,
        isLoading,
        isError,
        error,
    } = useCompanyDashboard();

    const dashboard = dashboardResponse?.data;

    const stats = dashboard?.statistics || {};

    const appointments = stats?.today_appointments || [];
    const upcomingAppointments = dashboard?.upcoming_appointments || [];
    const recentActivity = dashboard?.recent_activity || [];

    const todayAppointmentsCount = Array.isArray(stats?.today_appointments)
        ? stats.today_appointments.length
        : stats?.today_appointments_count || 0;

    const upcomingCount = upcomingAppointments.length;
    const completedCount = stats?.completed_appointments || 0;
    const cancelledCount = stats?.cancelled_appointments || 0;

    const performanceData = (() => {
        const map = {};

        recentActivity.forEach((appointment) => {
            if (!appointment?.appointment_date) return;

            const day = new Date(appointment.appointment_date).toLocaleDateString(
                "en-US",
                { weekday: "short" }
            );

            map[day] = (map[day] || 0) + 1;
        });

        const order = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

        return order.map((day) => ({
            day,
            appointments: map[day] || 0,
        }));
    })();

    const scheduleData = upcomingAppointments.map((appointment) => ({
        time: appointment.start_time || "",
        title:
            appointment.service?.name ||
            appointment.service_name ||
            `Appointment #${appointment.id}`,
        subtitle:
            appointment.staff?.name ||
            appointment.staff_name ||
            appointment.status,
        status: appointment.status,
    }));

    function getGreeting() {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        if (hour < 18) return "Good afternoon";
        return "Good evening";
    }

    function getCurrentDate() {
        return new Date().toLocaleDateString("en-US", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    }

    if (isLoading) {
        return (
            <div className="flex min-h-screen bg-beige">
                <div className="hidden lg:block lg:flex-shrink-0">
                    <Sidebar
                        companyName={companyName}
                        activeItem="Dashboard"
                        ctaLabel="Book Appointment"
                        ctaPath="/company/appointments/new"
                    />
                </div>

                <div className="flex flex-1 items-center justify-center">
                    <div className="flex items-center gap-3 text-navy">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span className="font-serif text-sm">
                            Loading dashboard...
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex min-h-screen bg-beige">
                <div className="hidden lg:block lg:flex-shrink-0">
                    <Sidebar
                        companyName={companyName}
                        activeItem="Dashboard"
                        ctaLabel="Book Appointment"
                        ctaPath="/company/appointments/new"
                    />
                </div>

                <div className="flex flex-1 items-center justify-center px-6">
                    <div className="flex max-w-md items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                        <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
                        <div>
                            <p className="font-serif text-sm text-red-700">
                                {error?.response?.data?.message ||
                                    error?.message ||
                                    "Failed to load dashboard."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-beige">
            <div className="hidden lg:block lg:flex-shrink-0">
                <Sidebar
                    companyName={companyName}
                    activeItem="Dashboard"
                    ctaLabel="Book Appointment"
                    ctaPath="/company/appointments/new"
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
                            companyName={companyName}
                            activeItem="Dashboard"
                            ctaLabel="Book Appointment"
                            ctaPath="/company/appointments/new"
                        />
                    </div>
                </>
            )}

            <div className="flex min-w-0 flex-1 flex-col">
                <Topbar
                    onMenuClick={() => setSidebarOpen(true)}
                    profileName={profileName}
                    showBell
                    showHelp
                    showSupportText
                />

                <main className="px-3 py-4 sm:px-5 sm:py-5 md:px-6 lg:px-8 lg:py-6">
                    <div className="mb-5 flex flex-col gap-4 sm:mb-6 md:mb-7 xl:flex-row xl:items-center xl:justify-between">
                        <div>
                            <p className="mb-1 text-xs text-slate sm:text-sm">
                                {getCurrentDate()}
                            </p>

                            <h1 className="font-serif text-xl text-navy sm:text-2xl lg:text-3xl">
                                {getGreeting()}, {profileName}
                            </h1>

                            <p className="mt-1 text-xs text-slate sm:text-sm">
                                Here's what's happening at {companyName} today.
                            </p>
                        </div>

                        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-3">
                            <button
                                type="button"
                                onClick={() => navigate("/company/appointments/new")}
                                className="flex w-full items-center justify-center gap-2 rounded-lg bg-navy px-4 py-2.5 text-sm font-bold text-white transition hover:bg-gold hover:text-navy sm:w-auto"
                            >
                                <Plus className="w-4 h-4" />
                                New Appointment
                            </button>

                            <button
                                type="button"
                                onClick={() => navigate("/company/staff/add")}
                                className="flex w-full items-center justify-center gap-2 rounded-lg border border-navy bg-white px-4 py-2.5 text-sm font-bold text-navy transition hover:bg-navy hover:text-white sm:w-auto"
                            >
                                <UserPlus className="w-4 h-4" />
                                Add Staff
                            </button>

                            <button
                                type="button"
                                onClick={() => navigate("/company/services/add")}
                                className="flex w-full items-center justify-center gap-2 rounded-lg border border-navy bg-white px-4 py-2.5 text-sm font-bold text-navy transition hover:bg-navy hover:text-white sm:w-auto"
                            >
                                <FilePlus2 className="w-4 h-4" />
                                Add Service
                            </button>
                        </div>
                    </div>

                    <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:mb-6 xl:grid-cols-4">
                        <StatCard
                            label="TODAY'S APPOINTMENTS"
                            value={todayAppointmentsCount}
                            icon={CalendarDays}
                        />
                        <StatCard
                            label="UPCOMING"
                            value={upcomingCount}
                            icon={Clock}
                        />
                        <StatCard
                            label="COMPLETED"
                            value={completedCount}
                            icon={CheckCircle2}
                        />
                        <StatCard
                            label="CANCELLED"
                            value={cancelledCount}
                            icon={XCircle}
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-[minmax(0,1.65fr)_minmax(280px,0.9fr)]">
                        <div className="flex min-w-0 flex-col gap-4 md:gap-6">
                            <AppointmentsTable appointments={appointments} />
                            <PerformanceChart data={performanceData} />
                        </div>

                        <div className="flex min-w-0 flex-col gap-4 md:gap-6">
                            <ScheduleTimeline schedule={scheduleData} />
                            <StaffOverview
                                staff={[
                                    {
                                        name: `${stats?.total_staff || 0} staff`,
                                        appointments: stats?.total_staff || 0,
                                        status: "Active",
                                    },
                                ]}
                            />
                            <RecentActivity
                                activities={recentActivity.map((appointment) => ({
                                    type: appointment.status || "update",
                                    text:
                                        appointment.service?.name ||
                                        appointment.service_name ||
                                        `Appointment #${appointment.id}`,
                                    time: appointment.created_at
                                        ? new Date(
                                              appointment.created_at
                                          ).toLocaleString()
                                        : "",
                                }))}
                            />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default CompanyDashboard;