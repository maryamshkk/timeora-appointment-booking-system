import React from "react";

function MonthGrid({
    year,
    month,
    dates,
    appointmentsByDate,
    onDayClick,
}) {
    const weekdayNames = [
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
        "Sun",
    ];

    function formatDateKey(date) {
        const currentYear = date.getFullYear();
        const currentMonth = String(date.getMonth() + 1).padStart(2, "0");
        const currentDay = String(date.getDate()).padStart(2, "0");

        return `${currentYear}-${currentMonth}-${currentDay}`;
    }

    function isToday(date) {
        const today = new Date();

        return (
            date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth() &&
            date.getDate() === today.getDate()
        );
    }

    return (
        <div className="overflow-x-auto">
            <div className="min-w-[850px]">

                {/* Weekday Header */}
                <div className="grid grid-cols-7 border-b border-gray/20">
                    {weekdayNames.map((day) => (
                        <div
                            key={day}
                            className="
                                border-r border-gray/20 py-3 text-center
                                text-xs font-bold uppercase tracking-wide text-slate
                                last:border-r-0
                            "
                        >
                            {day}
                        </div>
                    ))}
                </div>

                {/* Month Grid */}
                <div className="grid grid-cols-7">
                    {dates.map((date) => {
                        const dateKey = formatDateKey(date);
                        const appointmentCount =
                            appointmentsByDate[dateKey] || 0;

                        const isCurrentMonth =
                            date.getFullYear() === year &&
                            date.getMonth() === month;

                        const today = isToday(date);

                        const appointmentLabel =
                            appointmentCount === 1
                                ? "Appointment"
                                : "Appointments";

                        return (
                            <button
                                key={dateKey}
                                type="button"
                                onClick={() => onDayClick(date)}
                                className={`
                                    relative min-h-[110px] cursor-pointer
                                    border-b border-r border-gray/20 bg-white
                                    p-2 text-left transition hover:bg-beige/20
                                    ${
                                        today
                                            ? "z-10 rounded-lg border-2 border-gold shadow-sm"
                                            : ""
                                    }
                                `}
                            >
                                {/* Date Number */}
                                <span
                                    className={`
                                        text-sm
                                        ${
                                            isCurrentMonth
                                                ? "text-navy"
                                                : "text-gray/40"
                                        }
                                    `}
                                >
                                    {date.getDate()}
                                </span>

                                {/* Appointment Count */}
                                {appointmentCount > 0 && (
                                    <div className="mt-3">
                                        <span
                                            className="
                                                inline-block rounded-md border border-gray bg-white
                                                px-2 py-1 text-xs text-navy
                                            "
                                        >
                                            {appointmentCount} {appointmentLabel}
                                        </span>
                                    </div>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default MonthGrid;