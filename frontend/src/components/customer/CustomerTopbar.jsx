import React from "react";
import { Search, HelpCircle, LayoutGrid } from "lucide-react";

function CustomerTopbar() {
    return (
        <header className="bg-white border-b border-gray/20 px-8 py-3 flex items-center justify-between gap-6 flex-shrink-0">

            {/* Left — Search */}
            <div className="relative w-full max-w-xs">

                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray pointer-events-none" />

                <input
                    type="text"
                    placeholder="Search..."
                    className="
                        w-full
                        bg-white
                        border
                        border-gray
                        rounded-lg
                        pl-9
                        pr-4
                        py-2.5
                        text-sm
                        text-navy
                        outline-none
                        focus:border-navy
                    "
                />

            </div>

            {/* Right — Help + App Switcher + Avatar */}
            <div className="flex items-center gap-5 flex-shrink-0">

                <button
                    type="button"
                    aria-label="Help"
                    className="text-navy hover:text-gold transition"
                >
                    <HelpCircle className="w-5 h-5" />
                </button>

                <button
                    type="button"
                    aria-label="Switch app"
                    className="text-navy hover:text-gold transition"
                >
                    {/* TODO: Define what this menu opens — possibly quick links
                        to other Timeora surfaces (e.g. Staff Portal). */}
                    <LayoutGrid className="w-5 h-5" />
                </button>

                <img
                    src=""
                    alt="Customer avatar"
                    className="w-9 h-9 rounded-full object-cover bg-beige flex-shrink-0"
                />

            </div>

        </header>
    );
}

export default CustomerTopbar;