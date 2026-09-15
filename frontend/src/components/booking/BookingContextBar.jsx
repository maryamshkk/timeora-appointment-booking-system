import React from "react";

function BookingContextBar({ items = [] }) {
    return (
        <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-5 mb-6">
            <div className="flex items-center flex-wrap">

                {items.map((item, index) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={`${item.label}-${index}`}
                            className={`
                                flex
                                items-center
                                gap-2
                                py-1
                                ${
                                    index > 0
                                        ? "border-l border-gray/20 pl-4 ml-4"
                                        : ""
                                }
                            `}
                        >
                            <Icon className="w-4 h-4 text-navy flex-shrink-0" />

                            <span className="text-sm font-bold text-navy whitespace-nowrap">
                                {item.label}
                            </span>
                        </div>
                    );
                })}

            </div>
        </div>
    );
}

export default BookingContextBar;
