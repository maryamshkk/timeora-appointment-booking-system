import React from "react";
import {
    Clock,
    Coffee,
} from "lucide-react";

function DayGrid({
    date,
    appointments = [],
    currentTimeIndicator = null,
}) {
    const gridStartHour = 8;
    const gridEndHour = 18;
    const rowHeight = 90;

    function getTimeInMinutes(time) {
        const [timePart, meridiem] = time.split(" ");
        const [hours, minutes] = timePart.split(":").map(Number);

        let convertedHours = hours;

        if (meridiem === "PM" && hours !== 12) {
            convertedHours += 12;
        }

        if (meridiem === "AM" && hours === 12) {
            convertedHours = 0;
        }

        return convertedHours * 60 + minutes;
    }

    function formatTime(time) {
        return time;
    }

    function getBlockStyle(item) {
        const gridStartMinutes = gridStartHour * 60;

        const startMinutes = getTimeInMinutes(item.start);
        const endMinutes = getTimeInMinutes(item.end);

        const minutesFromStart =
            startMinutes - gridStartMinutes;

        const durationMinutes =
            endMinutes - startMinutes;

        return {
            top: `${(minutesFromStart / 60) * rowHeight}px`,
            height: `${(durationMinutes / 60) * rowHeight}px`,
        };
    }

    function getAppointmentStyle(status) {
        if (status === "arrived") {
            return {
                container:
                    "bg-amber-50 border-l-4 border-l-gold",
                badge:
                    "border-gold text-navy",
            };
        }

        if (status === "pending") {
            return {
                container:
                    "bg-blue-50/70 border-l-4 border-l-blue-400",
                badge:
                    "border-blue-400 text-blue-700",
            };
        }

        return {
            container:
                "bg-indigo-50 border-l-4 border-l-navy",
            badge:
                "border-navy text-navy",
        };
    }

    function formatHour(hour) {
        return new Date(
            2026,
            0,
            1,
            hour
        ).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
        });
    }

    const dayAppointments = appointments.filter(
        (appointment) => appointment.type !== "break"
    );

    const breaks = appointments.filter(
        (appointment) => appointment.type === "break"
    );

    const dayName = date.toLocaleDateString("en-US", {
        weekday: "long",
    });

    const formattedDate = date.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    return (
        <div className="overflow-x-auto">
            <div className="min-w-[760px]">

                {/* Day Heading */}
                <div className="grid grid-cols-[80px_1fr] border-b border-gray/20">
                    <div />

                    <div className="px-4 py-4 border-l border-gray/20">
                        <p className="text-xs uppercase tracking-wide text-slate">
                            {dayName}
                        </p>

                        <p className="font-serif text-xl text-navy mt-1">
                            {formattedDate}
                        </p>
                    </div>
                </div>

                {/* Schedule Grid */}
                <div className="relative">
                    <div
                        className="grid grid-cols-[80px_1fr]"
                        style={{
                            gridTemplateRows: `repeat(${
                                gridEndHour - gridStartHour
                            }, ${rowHeight}px)`,
                        }}
                    >
                        {Array.from(
                            {
                                length:
                                    gridEndHour -
                                    gridStartHour,
                            },
                            (_, index) => {
                                const hour =
                                    gridStartHour + index;

                                const hasAppointment = dayAppointments.some(
                                    (appointment) => {
                                        const start =
                                            getTimeInMinutes(
                                                appointment.start
                                            );

                                        const end =
                                            getTimeInMinutes(
                                                appointment.end
                                            );

                                        return (
                                            start <
                                                (hour + 1) *
                                                    60 &&
                                            end >
                                                hour * 60
                                        );
                                    }
                                );

                                const hasBreak = breaks.some(
                                    (breakItem) => {
                                        const start =
                                            getTimeInMinutes(
                                                breakItem.start
                                            );

                                        const end =
                                            getTimeInMinutes(
                                                breakItem.end
                                            );

                                        return (
                                            start <
                                                (hour + 1) *
                                                    60 &&
                                            end >
                                                hour * 60
                                        );
                                    }
                                );

                                const hasEvent =
                                    hasAppointment ||
                                    hasBreak;

                                return (
                                    <React.Fragment key={hour}>
                                        {/* Time Gutter */}
                                        <div
                                            className={`
                                                pt-2
                                                pr-2
                                                text-right
                                                text-xs
                                                text-slate
                                                border-b
                                                ${
                                                    !hasEvent
                                                        ? "border-dashed"
                                                        : ""
                                                }
                                                border-gray/20
                                            `}
                                        >
                                            {formatHour(hour)}
                                        </div>

                                        {/* Event Column */}
                                        <div
                                            className={`
                                                relative
                                                border-l
                                                border-b
                                                ${
                                                    !hasEvent
                                                        ? "border-dashed"
                                                        : ""
                                                }
                                                border-gray/20
                                            `}
                                        />
                                    </React.Fragment>
                                );
                            }
                        )}
                    </div>

                    {/* Appointment Blocks */}
                    {dayAppointments.map(
                        (appointment, index) => {
                            const statusStyle =
                                getAppointmentStyle(
                                    appointment.status
                                );

                            return (
                                <div
                                    key={`${appointment.customerName}-${index}`}
                                    className={`
                                        absolute
                                        left-[80px]
                                        right-0
                                        px-4
                                        py-3
                                        rounded-md
                                        overflow-hidden
                                        ${statusStyle.container}
                                    `}
                                    style={{
                                        ...getBlockStyle(
                                            appointment
                                        ),
                                        marginLeft: "8px",
                                        marginRight: "8px",
                                    }}
                                >
                                    <div className="flex justify-between items-start gap-4">
                                        {/* Appointment Details */}
                                        <div className="min-w-0">
                                            <p className="text-sm font-bold text-navy truncate">
                                                {
                                                    appointment.customerName
                                                }
                                            </p>

                                            <p className="text-sm text-slate mt-1 truncate">
                                                {
                                                    appointment.service
                                                }
                                            </p>
                                        </div>

                                        {/* Status */}
                                        <span
                                            className={`
                                                shrink-0
                                                bg-white
                                                border
                                                rounded-md
                                                px-2.5
                                                py-1
                                                text-xs
                                                font-bold
                                                capitalize
                                                ${statusStyle.badge}
                                            `}
                                        >
                                            {appointment.status}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-1.5 mt-2">
                                        <Clock className="w-3 h-3 text-slate" />

                                        <span className="text-xs text-slate">
                                            {formatTime(
                                                appointment.start
                                            )}{" "}
                                            -{" "}
                                            {formatTime(
                                                appointment.end
                                            )}
                                        </span>
                                    </div>
                                </div>
                            );
                        }
                    )}

                    {/* Break Blocks */}
                    {breaks.map((breakItem, index) => (
                        <div
                            key={`${breakItem.label}-${index}`}
                            className="
                                absolute
                                left-[80px]
                                right-0
                                bg-gray/10
                                rounded-md
                                flex
                                items-center
                                justify-center
                                gap-2
                                py-3
                                text-sm
                                font-bold
                                text-slate
                                mx-2
                            "
                            style={getBlockStyle(breakItem)}
                        >
                            <Coffee className="w-3.5 h-3.5 text-slate" />

                            <span>
                                {breakItem.label}
                            </span>
                        </div>
                    ))}

                    {/* Current Time Indicator */}
                    {currentTimeIndicator && (
                        <div
                            className="
                                absolute
                                left-[80px]
                                right-0
                                z-30
                                pointer-events-none
                            "
                            style={{
                                top: `${currentTimeIndicator.top}px`,
                            }}
                        >
                            <div className="relative border-t-2 border-gold">
                                <div
                                    className="
                                        absolute
                                        -left-1.5
                                        -top-[5px]
                                        w-2.5
                                        h-2.5
                                        rounded-full
                                        bg-gold
                                    "
                                />
                            </div>
                        </div>
                    )}

                    {/* Current Time Label */}
                    {currentTimeIndicator && (
                        <div
                            className="
                                absolute
                                left-0
                                w-[80px]
                                z-30
                                pointer-events-none
                                text-right
                                pr-2
                                -translate-y-1/2
                            "
                            style={{
                                top: `${currentTimeIndicator.top}px`,
                            }}
                        >
                            <span className="text-xs font-bold text-gold">
                                {currentTimeIndicator.label}
                            </span>
                        </div>
                    )}
                </div>

                {/* Legend */}
                <div className="px-6 py-4 border-t border-gray/20 flex flex-wrap items-center gap-6">
                    <div className="inline-flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-navy" />

                        <span className="text-sm text-slate">
                            Confirmed
                        </span>
                    </div>

                    <div className="inline-flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-400" />

                        <span className="text-sm text-slate">
                            Pending
                        </span>
                    </div>

                    <div className="inline-flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-gold" />

                        <span className="text-sm text-slate">
                            Arrived
                        </span>
                    </div>

                    <div className="inline-flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-gray/30" />

                        <span className="text-sm text-slate">
                            Blocked/Break
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DayGrid;