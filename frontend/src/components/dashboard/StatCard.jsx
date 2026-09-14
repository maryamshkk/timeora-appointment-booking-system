import React from "react";

function StatCard({
    value,
    label,
    icon: Icon,
    valueColor = "text-navy",
    accentColor = null,
    iconBg = "bg-beige",
    iconColor = "text-navy",
    delta = null,
    deltaColor = "bg-green-50 text-green-700",
}) {
    return (
        <div className="relative overflow-hidden rounded-xl border border-gray/20 bg-white p-5 shadow-sm">

            {accentColor && (
                <div
                    className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl ${accentColor}`}
                />
            )}

            {Icon && (
                <div
                    className={`mb-4 flex h-9 w-9 items-center justify-center rounded-lg ${iconBg}`}
                >
                    <Icon className={`h-[18px] w-[18px] ${iconColor}`} />
                </div>
            )}

            <div className="flex items-center gap-2">
                <p className={`font-serif text-2xl font-bold ${valueColor}`}>
                    {value}
                </p>

                {delta && (
                    <span
                        className={`rounded-full px-2 py-0.5 text-xs font-bold ${deltaColor}`}
                    >
                        {delta}
                    </span>
                )}
            </div>

            <p className="mt-1 text-xs font-bold uppercase tracking-wide text-slate">
                {label}
            </p>

        </div>
    );
}

export default StatCard;