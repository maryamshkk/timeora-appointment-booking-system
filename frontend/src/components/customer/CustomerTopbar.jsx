import React from "react";
import {
    Grid3X3,
    HelpCircle,
    Search,
} from "lucide-react";

function CustomerTopbar() {
    function handleAppSwitcher() {
        // TODO: Open app switcher menu.
    }

    return (
        <header className="h-20 bg-white border-b border-gray/20 px-8 flex items-center justify-between gap-6">

            {/* Search */}
            <div className="relative w-full max-w-xl">
                <Search
                    className="
                        absolute
                        left-3
                        top-1/2
                        -translate-y-1/2
                        w-4
                        h-4
                        text-slate
                    "
                />

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
                        font-serif
                        text-navy
                        outline-none
                        focus:border-navy
                    "
                />
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 flex-shrink-0">

                <button
                    type="button"
                    className="
                        text-slate
                        hover:text-navy
                        transition
                    "
                    aria-label="Help"
                >
                    <HelpCircle className="w-5 h-5" />
                </button>

                <button
                    type="button"
                    onClick={handleAppSwitcher}
                    className="
                        text-slate
                        hover:text-navy
                        transition
                    "
                    aria-label="App switcher"
                >
                    <Grid3X3 className="w-5 h-5" />
                </button>

                <div className="w-9 h-9 rounded-full bg-beige flex items-center justify-center overflow-hidden">
                    <span className="text-sm font-bold text-navy">
                        C
                    </span>
                </div>

            </div>
        </header>
    );
}

export default CustomerTopbar;
