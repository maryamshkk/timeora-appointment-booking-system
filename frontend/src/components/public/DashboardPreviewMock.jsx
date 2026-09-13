import React from "react";
import {
    Calendar,
    Users,
    Settings,
} from "lucide-react";

function DashboardPreviewMock({ compact = false }) {
    return (
        <div
            aria-hidden="true"
            className={`
                bg-white
                rounded-xl
                shadow-lg
                border
                border-gray/20
                overflow-hidden
                w-full
                ${compact ? "max-w-[760px]" : "max-w-[720px]"}
            `}
        >
            {/* Browser Chrome */}
            <div className="bg-beige/60 px-4 py-3 flex items-center gap-2 border-b border-gray/20">
                <span className="w-3 h-3 rounded-full bg-gray/40" />
                <span className="w-3 h-3 rounded-full bg-gray/40" />
                <span className="w-3 h-3 rounded-full bg-gray/40" />
            </div>

            {/* Dashboard Body */}
            <div className="flex min-h-[360px]">

                {/* Mini Sidebar */}
                <div className="w-14 bg-navy py-6 flex flex-col items-center gap-6 flex-shrink-0">
                    <Calendar className="w-[18px] h-[18px] text-gold" />
                    <Users className="w-[18px] h-[18px] text-white/70" />
                    <Settings className="w-[18px] h-[18px] text-white/70" />
                </div>

                {/* Main Preview */}
                <div className="flex-1 bg-white p-6 min-w-0">

                    {/* Header */}
                    <div className="flex justify-between items-start gap-4">
                        <div>
                            <h3 className="font-serif text-xl text-navy">
                                Today's Overview
                            </h3>

                            <p className="text-sm text-slate mt-1">
                                Tuesday, Oct 24
                            </p>
                        </div>

                        <span className="bg-gold text-navy text-xs font-bold px-3 py-1.5 rounded-full whitespace-nowrap">
                            4 NEW BOOKINGS
                        </span>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4 mt-4">

                        <div className="border border-gray/20 rounded-lg p-4">
                            <p className="text-xs text-slate uppercase tracking-wide">
                                Appointments
                            </p>

                            <p className="text-2xl font-bold text-navy mt-1">
                                12
                            </p>
                        </div>

                        <div className="border border-gray/20 rounded-lg p-4">
                            <p className="text-xs text-slate uppercase tracking-wide">
                                Revenue
                            </p>

                            <p className="text-2xl font-bold text-navy mt-1">
                                $1,240
                            </p>
                        </div>

                    </div>

                    {/* Upcoming */}
                    <div className="border border-gray/20 rounded-lg mt-4 overflow-hidden">

                        <div className="px-4 py-3 border-b border-gray/20">
                            <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                Upcoming
                            </p>
                        </div>

                        {/* Appointment 1 */}
                        <div className="px-4 py-3 flex justify-between items-start gap-4 border-b border-gray/20">
                            <div>
                                <p className="text-sm font-bold text-navy">
                                    Sarah Ahmed
                                </p>

                                <p className="text-xs text-slate mt-0.5">
                                    Consultation
                                </p>
                            </div>

                            <p className="text-sm font-bold text-navy whitespace-nowrap">
                                10:00 AM
                            </p>
                        </div>

                        {/* Appointment 2 */}
                        <div className="px-4 py-3 flex justify-between items-start gap-4 border-b border-gray/20">
                            <div>
                                <p className="text-sm font-bold text-navy">
                                    Michael Chen
                                </p>

                                <p className="text-xs text-slate mt-0.5">
                                    Follow-up
                                </p>
                            </div>

                            <p className="text-sm font-bold text-navy whitespace-nowrap">
                                11:30 AM
                            </p>
                        </div>

                        {/* Appointment 3 */}
                        <div className="px-4 py-3 flex justify-between items-start gap-4">
                            <div>
                                <p className="text-sm font-bold text-navy">
                                    Emma Davis
                                </p>

                                <p className="text-xs text-slate mt-0.5">
                                    Initial Review
                                </p>
                            </div>

                            <p className="text-sm font-bold text-navy whitespace-nowrap">
                                1:15 PM
                            </p>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    );
}

export default DashboardPreviewMock;
