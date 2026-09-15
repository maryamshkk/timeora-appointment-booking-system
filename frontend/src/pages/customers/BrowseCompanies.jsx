import React, { useState } from "react";
import {
    Check,
    ChevronDown,
    Dumbbell,
    HeartPulse,
    MapPin,
    PersonStanding,
    Search,
    Sparkles,
} from "lucide-react";

import CustomerSidebar from "../../components/customer/CustomerSidebar";
import CustomerTopbar from "../../components/customer/CustomerTopbar";

function BrowseCompanies() {

    const [searchQuery, setSearchQuery] = useState("");

    const [selectedCategory, setSelectedCategory] = useState("healthcare");

    const [filters, setFilters] = useState({
        location: "",
        availableToday: true,
        thisWeek: false,
        weekends: false,
        serviceType: "all",
    });

    const [sortBy, setSortBy] = useState("recommended");

    const [isSortOpen, setIsSortOpen] = useState(false);

    const [companies, setCompanies] = useState([
        {
            id: 1,
            name: "Shifa Clinic",
            category: "Healthcare",
            logoUrl: "",
            rating: 4.9,
            availability: "today",
            location: "Lahore, Gulberg III",
            description:
                "Premium healthcare facility offering specialized consultations.",
        },
        {
            id: 2,
            name: "Aesthetic Dental",
            category: "Healthcare",
            logoUrl: "",
            rating: 4.7,
            availability: "today",
            location: "DHA Phase 5",
            description:
                "Advanced cosmetic and general dentistry providing painless dental care.",
        },
        {
            id: 3,
            name: "Nova Rehab Center",
            category: "Healthcare",
            logoUrl: "",
            rating: null,
            availability: "next-week",
            location: "Johar Town",
            description:
                "Specialized physical therapy and sports injury rehabilitation.",
        },
        {
            id: 4,
            name: "Serenity Spa",
            category: "Wellness",
            logoUrl: "",
            rating: null,
            availability: "today",
            location: "Model Town",
            description:
                "Holistic wellness therapies, massages, and relaxation treatments.",
        },
    ]);

    const [totalCount] = useState(42);

    const [currentPage, setCurrentPage] = useState(1);

    function handleSearch() {
        // TODO: fetch companies matching searchQuery
    }

    function handleSelectCategory(category) {
        setSelectedCategory(category);

        // TODO: refetch companies filtered by category
    }

    function handleFilterChange(field, value) {
        setFilters((previousFilters) => ({
            ...previousFilters,
            [field]: value,
        }));
    }

    function handleApplyFilters() {
        // TODO: fetch companies using the current filters
    }

    function handleClearFilters() {
        setFilters({
            location: "",
            availableToday: true,
            thisWeek: false,
            weekends: false,
            serviceType: "all",
        });
    }

    function handlePageChange(page) {
        setCurrentPage(page);

        // TODO: fetch companies for the selected page
    }

    return (
        <div className="min-h-screen bg-beige flex">

            {/* Customer Sidebar */}
            <CustomerSidebar activeItem="Browse Companies" />

            {/* Main Area */}
            <div className="flex-1 min-w-0 flex flex-col">

                {/* Customer Topbar */}
                <CustomerTopbar />

                {/* Page Content */}
                <main className="flex-1 px-4 py-6 sm:px-6 md:px-8">

                    {/* Header */}
                    <div className="mb-6">
                        <h1 className="font-serif text-4xl md:text-5xl text-navy">
                            Find a Company
                        </h1>

                        <p className="text-sm text-slate mt-1.5">
                            Discover businesses and services that fit your needs.
                        </p>
                    </div>

                    {/* Search Bar */}
                    <div className="bg-white rounded-lg border border-gray/20 shadow-sm flex items-center overflow-hidden mb-7">

                        <Search className="w-[18px] h-[18px] text-gray ml-4 flex-shrink-0" />

                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(event) => setSearchQuery(event.target.value)}
                            placeholder="Search companies, services, or locations..."
                            className="
                                flex-1
                                min-w-0
                                border-none
                                px-3
                                py-4
                                text-sm
                                text-navy
                                bg-transparent
                                outline-none
                            "
                        />

                        <button
                            type="button"
                            onClick={handleSearch}
                            className="
                                bg-navy
                                text-white
                                uppercase
                                tracking-wide
                                font-bold
                                text-sm
                                px-6
                                sm:px-8
                                py-4
                                rounded-r-lg
                                hover:bg-gold
                                hover:text-navy
                                transition
                                flex-shrink-0
                            "
                        >
                            Search
                        </button>

                    </div>

                    {/* Popular Categories */}
                    <div className="mb-7">

                        <p className="text-xs font-bold uppercase tracking-wide text-slate mb-3">
                            Popular Categories
                        </p>

                        <div className="flex gap-4 overflow-x-auto pb-2">

                            {/* Healthcare */}
                            <button
                                type="button"
                                onClick={() => handleSelectCategory("healthcare")}
                                className={`
                                    min-w-[220px]
                                    bg-white
                                    rounded-xl
                                    p-4
                                    flex
                                    items-center
                                    gap-3
                                    text-left
                                    cursor-pointer
                                    transition
                                    ${
                                        selectedCategory === "healthcare"
                                            ? "border-2 border-navy"
                                            : "border border-gray/20"
                                    }
                                `}
                            >
                                <div className="w-11 h-11 rounded-lg bg-beige/60 flex items-center justify-center flex-shrink-0">
                                    <HeartPulse className="w-5 h-5 text-navy" />
                                </div>

                                <div>
                                    <p className="text-base font-bold text-navy">
                                        Healthcare
                                    </p>

                                    <p className="text-xs text-slate mt-0.5">
                                        42 companies
                                    </p>
                                </div>
                            </button>

                            {/* Beauty */}
                            <button
                                type="button"
                                onClick={() => handleSelectCategory("beauty")}
                                className={`
                                    min-w-[220px]
                                    bg-white
                                    rounded-xl
                                    p-4
                                    flex
                                    items-center
                                    gap-3
                                    text-left
                                    cursor-pointer
                                    transition
                                    ${
                                        selectedCategory === "beauty"
                                            ? "border-2 border-navy"
                                            : "border border-gray/20"
                                    }
                                `}
                            >
                                <div className="w-11 h-11 rounded-lg bg-beige/60 flex items-center justify-center flex-shrink-0">
                                    <Sparkles className="w-5 h-5 text-navy" />
                                </div>

                                <div>
                                    <p className="text-base font-bold text-navy">
                                        Beauty
                                    </p>

                                    <p className="text-xs text-slate mt-0.5">
                                        28 companies
                                    </p>
                                </div>
                            </button>

                            {/* Fitness */}
                            <button
                                type="button"
                                onClick={() => handleSelectCategory("fitness")}
                                className={`
                                    min-w-[220px]
                                    bg-white
                                    rounded-xl
                                    p-4
                                    flex
                                    items-center
                                    gap-3
                                    text-left
                                    cursor-pointer
                                    transition
                                    ${
                                        selectedCategory === "fitness"
                                            ? "border-2 border-navy"
                                            : "border border-gray/20"
                                    }
                                `}
                            >
                                <div className="w-11 h-11 rounded-lg bg-beige/60 flex items-center justify-center flex-shrink-0">
                                    <Dumbbell className="w-5 h-5 text-navy" />
                                </div>

                                <div>
                                    <p className="text-base font-bold text-navy">
                                        Fitness
                                    </p>

                                    <p className="text-xs text-slate mt-0.5">
                                        15 companies
                                    </p>
                                </div>
                            </button>

                            {/* Wellness */}
                            <button
                                type="button"
                                onClick={() => handleSelectCategory("wellness")}
                                className={`
                                    min-w-[220px]
                                    bg-white
                                    rounded-xl
                                    p-4
                                    flex
                                    items-center
                                    gap-3
                                    text-left
                                    cursor-pointer
                                    transition
                                    ${
                                        selectedCategory === "wellness"
                                            ? "border-2 border-navy"
                                            : "border border-gray/20"
                                    }
                                `}
                            >
                                <div className="w-11 h-11 rounded-lg bg-beige/60 flex items-center justify-center flex-shrink-0">
                                    <PersonStanding className="w-5 h-5 text-navy" />
                                </div>

                                <div>
                                    <p className="text-base font-bold text-navy">
                                        Wellness
                                    </p>

                                    <p className="text-xs text-slate mt-0.5">
                                        34 companies
                                    </p>
                                </div>
                            </button>

                            {/* Spa & Relaxation */}
                            <button
                                type="button"
                                onClick={() => handleSelectCategory("spa")}
                                className={`
                                    min-w-[220px]
                                    bg-white
                                    rounded-xl
                                    p-4
                                    flex
                                    items-center
                                    gap-3
                                    text-left
                                    cursor-pointer
                                    transition
                                    ${
                                        selectedCategory === "spa"
                                            ? "border-2 border-navy"
                                            : "border border-gray/20"
                                    }
                                `}
                            >
                                <div className="w-11 h-11 rounded-lg bg-beige/60 flex items-center justify-center flex-shrink-0">
                                    <Sparkles className="w-5 h-5 text-navy" />
                                </div>

                                <div>
                                    <p className="text-base font-bold text-navy">
                                        Spa & Relaxation
                                    </p>

                                    <p className="text-xs text-slate mt-0.5">
                                        19 companies
                                    </p>
                                </div>
                            </button>

                        </div>
                    </div>

                    {/* Main Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">

                        {/* Filters */}
                        <aside className="bg-white rounded-xl border border-gray/20 shadow-sm p-6 lg:sticky lg:top-6 lg:self-start">

                            {/* Filter Header */}
                            <div className="flex items-center justify-between mb-5">
                                <h2 className="font-serif text-2xl text-navy">
                                    Filters
                                </h2>

                                <button
                                    type="button"
                                    onClick={handleClearFilters}
                                    className="text-sm font-bold text-slate hover:text-navy transition"
                                >
                                    Clear
                                </button>
                            </div>

                            {/* Location */}
                            <div className="mb-5">

                                <label className="block text-xs font-bold uppercase tracking-wide text-navy mb-2">
                                    Location
                                </label>

                                <div className="relative">
                                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray pointer-events-none" />

                                    <input
                                        type="text"
                                        value={filters.location}
                                        onChange={(event) =>
                                            handleFilterChange(
                                                "location",
                                                event.target.value
                                            )
                                        }
                                        placeholder="e.g. Lahore, Gulberg..."
                                        className="
                                            w-full
                                            border
                                            border-gray
                                            rounded-lg
                                            pl-9
                                            pr-4
                                            py-2.5
                                            text-sm
                                            text-navy
                                            bg-white
                                            outline-none
                                            focus:border-navy
                                        "
                                    />
                                </div>

                            </div>

                            {/* Availability */}
                            <div className="mb-5">

                                <p className="text-xs font-bold uppercase tracking-wide text-navy mb-3">
                                    Availability
                                </p>

                                {/* Available Today */}
                                <label className="flex items-center gap-2.5 mb-2.5 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={filters.availableToday}
                                        onChange={(event) =>
                                            handleFilterChange(
                                                "availableToday",
                                                event.target.checked
                                            )
                                        }
                                        className="sr-only"
                                    />

                                    <span
                                        className={`
                                            w-[18px]
                                            h-[18px]
                                            rounded
                                            border-2
                                            flex
                                            items-center
                                            justify-center
                                            flex-shrink-0
                                            ${
                                                filters.availableToday
                                                    ? "bg-navy border-navy"
                                                    : "border-gray bg-white"
                                            }
                                        `}
                                    >
                                        {filters.availableToday && (
                                            <Check className="w-3 h-3 text-white" />
                                        )}
                                    </span>

                                    <span className="text-sm text-navy">
                                        Available Today
                                    </span>
                                </label>

                                {/* This Week */}
                                <label className="flex items-center gap-2.5 mb-2.5 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={filters.thisWeek}
                                        onChange={(event) =>
                                            handleFilterChange(
                                                "thisWeek",
                                                event.target.checked
                                            )
                                        }
                                        className="sr-only"
                                    />

                                    <span
                                        className={`
                                            w-[18px]
                                            h-[18px]
                                            rounded
                                            border-2
                                            flex
                                            items-center
                                            justify-center
                                            flex-shrink-0
                                            ${
                                                filters.thisWeek
                                                    ? "bg-navy border-navy"
                                                    : "border-gray bg-white"
                                            }
                                        `}
                                    >
                                        {filters.thisWeek && (
                                            <Check className="w-3 h-3 text-white" />
                                        )}
                                    </span>

                                    <span className="text-sm text-navy">
                                        This Week
                                    </span>
                                </label>

                                {/* Weekends */}
                                <label className="flex items-center gap-2.5 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={filters.weekends}
                                        onChange={(event) =>
                                            handleFilterChange(
                                                "weekends",
                                                event.target.checked
                                            )
                                        }
                                        className="sr-only"
                                    />

                                    <span
                                        className={`
                                            w-[18px]
                                            h-[18px]
                                            rounded
                                            border-2
                                            flex
                                            items-center
                                            justify-center
                                            flex-shrink-0
                                            ${
                                                filters.weekends
                                                    ? "bg-navy border-navy"
                                                    : "border-gray bg-white"
                                            }
                                        `}
                                    >
                                        {filters.weekends && (
                                            <Check className="w-3 h-3 text-white" />
                                        )}
                                    </span>

                                    <span className="text-sm text-navy">
                                        Weekends
                                    </span>
                                </label>

                            </div>

                            {/* Service Type */}
                            <div className="mb-5">

                                <label className="block text-xs font-bold uppercase tracking-wide text-navy mb-2">
                                    Service Type
                                </label>

                                <div className="relative">

                                    <select
                                        value={filters.serviceType}
                                        onChange={(event) =>
                                            handleFilterChange(
                                                "serviceType",
                                                event.target.value
                                            )
                                        }
                                        className="
                                            appearance-none
                                            w-full
                                            border
                                            border-gray
                                            rounded-lg
                                            px-4
                                            pr-10
                                            py-2.5
                                            text-sm
                                            text-navy
                                            bg-white
                                            outline-none
                                            focus:border-navy
                                        "
                                    >
                                        <option value="all">
                                            All Services
                                        </option>

                                        <option value="consultation">
                                            Consultation
                                        </option>

                                        <option value="therapy">
                                            Therapy
                                        </option>

                                        <option value="wellness">
                                            Wellness
                                        </option>

                                        <option value="fitness">
                                            Fitness
                                        </option>
                                    </select>

                                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate pointer-events-none" />

                                </div>

                            </div>

                            {/* Divider */}
                            <div className="border-t border-gray/20 my-4" />

                            {/* Apply */}
                            <button
                                type="button"
                                onClick={handleApplyFilters}
                                className="
                                    w-full
                                    bg-navy
                                    text-white
                                    uppercase
                                    tracking-wide
                                    font-bold
                                    text-sm
                                    py-3
                                    rounded-lg
                                    hover:bg-gold
                                    hover:text-navy
                                    transition
                                "
                            >
                                Apply Filters
                            </button>

                        </aside>

                        {/* Results */}
                        <section>

                            {/* Results Header */}
                            <div className="flex items-center justify-between flex-wrap gap-3 mb-5">

                                <h2 className="font-serif text-2xl text-navy">
                                    {totalCount} companies available
                                </h2>

                                {/* Sort */}
                                <div className="flex items-center gap-2">

                                    <span className="text-xs font-bold uppercase tracking-wide text-slate">
                                        Sort By:
                                    </span>

                                    <div className="relative">

                                        <button
                                            type="button"
                                            onClick={() => setIsSortOpen((previous) => !previous)}
                                            className="flex items-center gap-1 text-sm font-bold text-navy"
                                        >
                                            {sortBy === "recommended"
                                                ? "Recommended"
                                                : sortBy === "rating"
                                                    ? "Highest Rated"
                                                    : "Nearest"}

                                            <ChevronDown className="w-3.5 h-3.5" />
                                        </button>

                                        {isSortOpen && (
                                            <div className="absolute right-0 top-full mt-2 w-40 bg-white border border-gray/20 rounded-lg shadow-lg z-20 overflow-hidden">

                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setSortBy("recommended");
                                                        setIsSortOpen(false);
                                                    }}
                                                    className="w-full text-left px-4 py-2.5 text-sm text-navy hover:bg-beige"
                                                >
                                                    Recommended
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setSortBy("rating");
                                                        setIsSortOpen(false);
                                                    }}
                                                    className="w-full text-left px-4 py-2.5 text-sm text-navy hover:bg-beige"
                                                >
                                                    Highest Rated
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        setSortBy("nearest");
                                                        setIsSortOpen(false);
                                                    }}
                                                    className="w-full text-left px-4 py-2.5 text-sm text-navy hover:bg-beige"
                                                >
                                                    Nearest
                                                </button>

                                            </div>
                                        )}

                                    </div>

                                </div>

                            </div>

                            {/* Company Cards will be added next */}

                        </section>

                    </div>

                </main>
            </div>
        </div>
    );
}

export default BrowseCompanies;