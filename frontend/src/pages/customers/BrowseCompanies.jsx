import React, { useState } from "react";
import {
    Check,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    Dumbbell,
    HeartPulse,
    MapPin,
    PersonStanding,
    Search,
    Sparkles,
    Star,
} from "lucide-react";
import { Link } from "react-router-dom";

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
            imageUrl: "",
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
            imageUrl: "",
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
            imageUrl: "",
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
            imageUrl: "",
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

                            {/* Company Cards */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                                {companies.map((company) => (
                                    <article
                                        key={company.id}
                                        className="bg-white rounded-xl border border-gray/20 shadow-sm overflow-hidden flex flex-col"
                                    >

                                        {/* Image */}
                                        <div className="relative h-40 w-full bg-gray/10">

                                            {company.imageUrl ? (
                                                <img
                                                    src={company.imageUrl}
                                                    alt={company.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-beige flex items-center justify-center">
                                                    <span className="font-serif text-2xl text-navy/30">
                                                        {company.name}
                                                    </span>
                                                </div>
                                            )}

                                            {/* Rating */}
                                            {company.rating && (
                                                <div className="absolute top-3 right-3 bg-white rounded-full px-2.5 py-1 shadow-sm flex items-center gap-1">
                                                    <Star className="w-3 h-3 text-gold fill-gold" />

                                                    <span className="text-xs font-bold text-navy">
                                                        {company.rating}
                                                    </span>
                                                </div>
                                            )}

                                            {/* Logo */}
                                            <div className="absolute bottom-3 left-3 w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center overflow-hidden">

                                                {company.logoUrl ? (
                                                    <img
                                                        src={company.logoUrl}
                                                        alt={`${company.name} logo`}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <span className="font-serif text-sm font-bold text-navy">
                                                        {company.name
                                                            .split(" ")
                                                            .map((word) => word.charAt(0))
                                                            .join("")
                                                            .slice(0, 2)
                                                            .toUpperCase()}
                                                    </span>
                                                )}

                                            </div>

                                        </div>

                                        {/* Content */}
                                        <div className="p-5 flex-1 flex flex-col">

                                            {/* Category + Availability */}
                                            <div className="flex items-center justify-between gap-2 mb-3">

                                                <span className="text-xs font-bold uppercase tracking-wide text-slate">
                                                    {company.category}
                                                </span>

                                                <span className="bg-beige/60 rounded-full px-2.5 py-1 text-xs font-bold text-navy flex items-center gap-1.5 whitespace-nowrap">

                                                    <span
                                                        className={`
                                                            w-1.5
                                                            h-1.5
                                                            rounded-full
                                                            ${
                                                                company.availability === "today"
                                                                    ? "bg-green-500"
                                                                    : "bg-gray/40"
                                                            }
                                                        `}
                                                    />

                                                    {company.availability === "today"
                                                        ? "Available today"
                                                        : "Next week"}

                                                </span>

                                            </div>

                                            {/* Company Name */}
                                            <h3 className="font-serif text-2xl text-navy mb-1.5">
                                                {company.name}
                                            </h3>

                                            {/* Location */}
                                            <div className="flex items-center gap-1.5 mb-3">
                                                <MapPin className="w-3.5 h-3.5 text-slate flex-shrink-0" />

                                                <span className="text-sm text-slate">
                                                    {company.location}
                                                </span>
                                            </div>

                                            {/* Description */}
                                            <p className="text-sm text-slate leading-relaxed line-clamp-2 flex-1 mb-4">
                                                {company.description}
                                            </p>

                                            {/* View Company */}
                                            <Link
                                                to={`/customer/companies/${company.id}`}
                                                className="
                                                    w-full
                                                    text-center
                                                    uppercase
                                                    tracking-wide
                                                    font-bold
                                                    text-sm
                                                    py-2.5
                                                    rounded-lg
                                                    bg-white
                                                    border-2
                                                    border-navy
                                                    text-navy
                                                    hover:bg-navy
                                                    hover:text-white
                                                    transition
                                                "
                                            >
                                                View Company
                                            </Link>

                                        </div>

                                    </article>
                                ))}

                            </div>

                            {/* Pagination */}
                            <div className="flex justify-center items-center gap-2 mt-8">

                                {/* Previous */}
                                <button
                                    type="button"
                                    disabled={currentPage === 1}
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    className="
                                        w-9
                                        h-9
                                        rounded-lg
                                        border
                                        border-gray
                                        flex
                                        items-center
                                        justify-center
                                        text-navy
                                        disabled:opacity-40
                                        disabled:cursor-not-allowed
                                        hover:bg-beige
                                        transition
                                    "
                                    aria-label="Previous page"
                                >
                                    <ChevronLeft className="w-4 h-4" />
                                </button>

                                {/* Page 1 */}
                                <button
                                    type="button"
                                    onClick={() => handlePageChange(1)}
                                    className={`
                                        w-9
                                        h-9
                                        rounded-lg
                                        border
                                        text-sm
                                        font-bold
                                        transition
                                        ${
                                            currentPage === 1
                                                ? "bg-navy text-white border-navy"
                                                : "border-gray text-navy hover:bg-beige"
                                        }
                                    `}
                                >
                                    1
                                </button>

                                {/* Page 2 */}
                                <button
                                    type="button"
                                    onClick={() => handlePageChange(2)}
                                    className={`
                                        w-9
                                        h-9
                                        rounded-lg
                                        border
                                        text-sm
                                        font-bold
                                        transition
                                        ${
                                            currentPage === 2
                                                ? "bg-navy text-white border-navy"
                                                : "border-gray text-navy hover:bg-beige"
                                        }
                                    `}
                                >
                                    2
                                </button>

                                {/* Page 3 */}
                                <button
                                    type="button"
                                    onClick={() => handlePageChange(3)}
                                    className={`
                                        w-9
                                        h-9
                                        rounded-lg
                                        border
                                        text-sm
                                        font-bold
                                        transition
                                        ${
                                            currentPage === 3
                                                ? "bg-navy text-white border-navy"
                                                : "border-gray text-navy hover:bg-beige"
                                        }
                                    `}
                                >
                                    3
                                </button>

                                {/* Ellipsis */}
                                <span className="w-9 h-9 flex items-center justify-center text-sm font-bold text-slate">
                                    …
                                </span>

                                {/* Page 7 */}
                                <button
                                    type="button"
                                    onClick={() => handlePageChange(7)}
                                    className={`
                                        w-9
                                        h-9
                                        rounded-lg
                                        border
                                        text-sm
                                        font-bold
                                        transition
                                        ${
                                            currentPage === 7
                                                ? "bg-navy text-white border-navy"
                                                : "border-gray text-navy hover:bg-beige"
                                        }
                                    `}
                                >
                                    7
                                </button>

                                {/* Next */}
                                <button
                                    type="button"
                                    disabled={currentPage === 7}
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    className="
                                        w-9
                                        h-9
                                        rounded-lg
                                        border
                                        border-gray
                                        flex
                                        items-center
                                        justify-center
                                        text-navy
                                        disabled:opacity-40
                                        disabled:cursor-not-allowed
                                        hover:bg-beige
                                        transition
                                    "
                                    aria-label="Next page"
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>

                            </div>

                        </section>

                    </div>

                </main>
            </div>
        </div>
    );
}

export default BrowseCompanies;