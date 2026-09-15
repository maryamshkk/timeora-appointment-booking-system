import React, { useState } from "react";
import {
    ArrowLeft,
    Calendar,
    Clock,
    MapPin,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

import CustomerSidebar from "../../components/customer/CustomerSidebar";
import CustomerTopbar from "../../components/customer/CustomerTopbar";

function CompanyProfile() {
    const { id } = useParams();

    const [company] = useState({
        id: "shifa-clinic",
        name: "Shifa Clinic",
        category: "Healthcare",
        city: "Lahore",
        logoUrl: "",
        coverImageUrl: "",
        isOpenNow: true,

        description: [
            "Shifa Clinic is a premier healthcare facility dedicated to providing exceptional medical services with a focus on patient comfort and advanced clinical excellence. Established with a commitment to holistic care, our institution blends state-of-the-art medical technology with the compassionate touch of highly experienced practitioners.",
            "Our philosophy is rooted in proactive health management, ensuring that every patient receives a personalized, comprehensive care plan in an environment designed to promote healing and peace of mind.",
        ],

        services: [
            {
                id: "consultation",
                name: "Consultation",
                durationMinutes: 30,
            },
            {
                id: "follow-up",
                name: "Follow-up",
                durationMinutes: 30,
            },
            {
                id: "general-checkup",
                name: "General Checkup",
                durationMinutes: 45,
            },
        ],

        staff: [
            {
                id: "sara-ahmed",
                name: "Dr. Sara Ahmed",
                role: "Doctor",
                photoUrl: "",
            },
            {
                id: "ali-khan",
                name: "Ali Khan",
                role: "Consultant",
                photoUrl: "",
            },
        ],

        businessHours: {
            monday: "9:00 AM - 6:00 PM",
            tuesday: "9:00 AM - 6:00 PM",
            wednesday: "9:00 AM - 6:00 PM",
            thursday: "9:00 AM - 6:00 PM",
            friday: "9:00 AM - 6:00 PM",
            saturday: "10:00 AM - 2:00 PM",
            sunday: null,
        },

        nextAvailableSlot: {
            label: "Today · 4:00 PM",
        },
    });

    // TODO: Replace seeded company data with a real API fetch using the route param.
    // The API request will use `id` to load the selected company.

    function handleBookAppointment(serviceId = null) {
        // TODO: Navigate into the booking flow for this company.
        // If serviceId is provided, pass it to ChooseService as the preselected service.
    }

    function handleViewAllServices() {
        // TODO: Navigate to the full services listing for this company.
    }

    return (
        <div className="min-h-screen bg-beige flex">

            {/* Customer Sidebar */}
            <CustomerSidebar activeItem="Browse Companies" />

            {/* Main Portal */}
            <div className="flex-1 min-w-0 flex flex-col">

                {/* Customer Topbar */}
                <CustomerTopbar />

                <main className="flex-1 px-4 py-5 sm:px-6 sm:py-6 md:px-8">

                    <div className="max-w-[1400px] mx-auto">

                        {/* Top Row */}
                        <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">

                            <Link
                                to="/customer/browse"
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    text-xs
                                    font-bold
                                    uppercase
                                    tracking-wide
                                    text-navy
                                    hover:text-gold
                                    transition
                                "
                            >
                                <ArrowLeft className="w-3.5 h-3.5" />
                                Back to Companies
                            </Link>

                            <div className="hidden sm:flex items-center gap-2 text-xs font-bold uppercase tracking-wide">
                                <span className="text-slate">
                                    Browse Companies
                                </span>

                                <span className="text-gray">
                                    /
                                </span>

                                <span className="text-navy">
                                    {company.name}
                                </span>
                            </div>

                        </div>

                        {/* Hero Image */}
                        <div
                            className="
                                relative
                                w-full
                                h-40
                                sm:h-56
                                md:h-64
                                lg:h-72
                                rounded-xl
                                overflow-hidden
                                bg-gray/10
                            "
                        >
                            {company.coverImageUrl ? (
                                <img
                                    src={company.coverImageUrl}
                                    alt={`${company.name} cover`}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray/10 flex items-center justify-center">
                                    <span className="font-serif text-2xl text-gray">
                                        {company.name}
                                    </span>
                                </div>
                            )}

                            {/* Open / Closed Status */}
                            <div
                                className={`
                                    absolute
                                    top-3
                                    right-3
                                    sm:top-4
                                    sm:right-4
                                    rounded-full
                                    px-2.5
                                    py-1
                                    sm:px-3
                                    sm:py-1.5
                                    shadow-sm
                                    flex
                                    items-center
                                    gap-1.5
                                    text-[10px]
                                    sm:text-xs
                                    font-bold
                                    backdrop-blur
                                    ${
                                        company.isOpenNow
                                            ? "bg-white/90 text-navy"
                                            : "bg-white/90 text-slate"
                                    }
                                `}
                            >
                                <span
                                    className={`
                                        w-1.5
                                        h-1.5
                                        rounded-full
                                        ${
                                            company.isOpenNow
                                                ? "bg-green-500"
                                                : "bg-gray"
                                        }
                                    `}
                                />

                                {company.isOpenNow
                                    ? "OPEN NOW"
                                    : "CLOSED"}
                            </div>

                            {/*
                                TODO:
                                Derive isOpenNow from company.businessHours
                                and the current day/time instead of using
                                the seeded boolean.
                            */}
                        </div>

                        {/* Logo + Company Header */}
                        <div className="flex items-end justify-between flex-wrap gap-4 sm:gap-5">

                            {/* Logo */}
                            <div className="bg-white rounded-lg shadow-md border border-gray/20 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 p-3 -mt-12 sm:-mt-14 md:-mt-16 ml-4 sm:ml-6 flex items-center justify-center relative z-10">

                                {company.logoUrl ? (
                                    <img
                                        src={company.logoUrl}
                                        alt={`${company.name} logo`}
                                        className="w-full h-full object-contain rounded-md"
                                    />
                                ) : (
                                    <div className="w-full h-full rounded-md bg-beige flex items-center justify-center">
                                        <span className="font-serif text-xl sm:text-2xl text-navy">
                                            {company.name
                                                .split(" ")
                                                .map((word) =>
                                                    word.charAt(0)
                                                )
                                                .join("")
                                                .slice(0, 2)
                                                .toUpperCase()}
                                        </span>
                                    </div>
                                )}

                            </div>

                            {/* Company Info + Booking */}
                            <div className="flex-1 flex items-end justify-between gap-4 sm:gap-6 flex-wrap pb-1 min-w-0">

                                <div className="min-w-0">
                                    {/* Category + Location */}
                                    <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-slate mb-1.5">

                                        <span>
                                            {company.category}
                                        </span>

                                        <span>·</span>

                                        <MapPin className="w-3 h-3 flex-shrink-0" />

                                        <span>
                                            {company.city}
                                        </span>

                                    </div>

                                    {/* Company Name */}
                                    <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-navy">
                                        {company.name}
                                    </h1>
                                </div>

                                {/* Book Appointment */}
                                <button
                                    type="button"
                                    onClick={() => handleBookAppointment()}
                                    className="
                                        flex
                                        items-center
                                        gap-2
                                        text-sm
                                        font-bold
                                        text-navy
                                        hover:text-gold
                                        transition
                                        whitespace-nowrap
                                        pb-1
                                    "
                                >
                                    <Calendar className="w-4 h-4" />
                                    Book Appointment
                                </button>

                            </div>

                        </div>

                        {/* Main Content */}
                        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 mt-10">

                            {/* Left Column */}
                            <section>

                                {/* About */}
                                <div>
                                    <h2 className="font-serif text-2xl text-navy mb-3">
                                        About {company.name}
                                    </h2>

                                    <div className="flex flex-col gap-3">
                                        {company.description.map((paragraph, index) => (
                                            <p
                                                key={index}
                                                className="text-base text-slate leading-relaxed"
                                            >
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>
                                </div>

                                {/* Services */}
                                <div className="mt-10">

                                    {/* Services Header */}
                                    <div className="flex items-center justify-between gap-4 mb-4">

                                        <h2 className="font-serif text-2xl text-navy">
                                            Services
                                        </h2>

                                        <button
                                            type="button"
                                            onClick={() => handleViewAllServices()}
                                            className="
                                                flex
                                                items-center
                                                gap-1
                                                text-xs
                                                font-bold
                                                uppercase
                                                tracking-wide
                                                text-navy
                                                hover:text-gold
                                                transition
                                                whitespace-nowrap
                                            "
                                        >
                                            View All Services
                                            <span>→</span>
                                        </button>

                                    </div>

                                    {/* Service Rows */}
                                    <div className="flex flex-col gap-3">

                                        {company.services.map((service) => (
                                            <button
                                                type="button"
                                                key={service.id}
                                                onClick={() =>
                                                    handleBookAppointment(service.id)
                                                }
                                                className="
                                                    w-full
                                                    text-left
                                                    border
                                                    border-gray/20
                                                    rounded-lg
                                                    p-5
                                                    bg-white
                                                    cursor-pointer
                                                    transition
                                                    hover:border-navy
                                                "
                                            >
                                                <div className="flex items-center justify-between gap-4">

                                                    <div>
                                                        <h3 className="text-lg font-bold text-navy">
                                                            {service.name}
                                                        </h3>

                                                        <div className="flex items-center gap-1.5 mt-2">
                                                            <Clock className="w-3.5 h-3.5 text-slate" />

                                                            <span className="text-sm text-slate">
                                                                {service.durationMinutes} min
                                                            </span>
                                                        </div>
                                                    </div>

                                                </div>
                                            </button>
                                        ))}

                                    </div>

                                </div>

                                {/* Our Staff */}
                                <div className="mt-10">

                                    <h2 className="font-serif text-2xl text-navy mb-4">
                                        Our Staff
                                    </h2>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

                                        {company.staff.map((member) => (
                                            <div
                                                key={member.id}
                                                className="
                                                    border
                                                    border-gray/20
                                                    rounded-lg
                                                    p-4
                                                    bg-white
                                                    flex
                                                    items-center
                                                    gap-4
                                                "
                                            >

                                                {/* Staff Photo */}
                                                {member.photoUrl ? (
                                                    <img
                                                        src={member.photoUrl}
                                                        alt={member.name}
                                                        className="
                                                            w-16
                                                            h-16
                                                            rounded-lg
                                                            object-cover
                                                            flex-shrink-0
                                                        "
                                                    />
                                                ) : (
                                                    <div
                                                        className="
                                                            w-16
                                                            h-16
                                                            rounded-lg
                                                            bg-beige
                                                            flex
                                                            items-center
                                                            justify-center
                                                            flex-shrink-0
                                                        "
                                                    >
                                                        <span className="font-serif text-lg text-navy">
                                                            {member.name
                                                                .split(" ")
                                                                .map((word) => word.charAt(0))
                                                                .join("")
                                                                .slice(0, 2)
                                                                .toUpperCase()}
                                                        </span>
                                                    </div>
                                                )}

                                                {/* Staff Info */}
                                                <div className="min-w-0">

                                                    <h3 className="text-base font-bold text-navy">
                                                        {member.name}
                                                    </h3>

                                                    <p className="text-xs font-bold uppercase tracking-wide text-slate mt-0.5">
                                                        {member.role}
                                                    </p>

                                                    <Link
                                                        to={`/customer/companies/${company.id}/staff/${member.id}`}
                                                        className="
                                                            inline-block
                                                            text-sm
                                                            font-bold
                                                            text-navy
                                                            hover:text-gold
                                                            transition
                                                            mt-1.5
                                                        "
                                                    >
                                                        View Profile
                                                    </Link>

                                                </div>

                                            </div>
                                        ))}

                                    </div>

                                </div>

                            </section>

                            {/* Right Column */}
                            <aside>
                                <div className="lg:sticky lg:top-6">

                                    {/* Availability */}
                                    <div className="border-l-4 border-navy pl-6 mb-10">

                                        <div className="flex items-center gap-2 mb-4">
                                            <Calendar className="w-5 h-5 text-gold" />

                                            <h2 className="font-serif text-xl text-navy">
                                                Availability
                                            </h2>
                                        </div>

                                        <div className="bg-beige rounded-lg p-4">
                                            <p className="text-[11px] font-bold uppercase tracking-wide text-slate mb-1">
                                                Next Available Slot
                                            </p>

                                            <p className="font-serif text-lg text-navy">
                                                {company.nextAvailableSlot?.label || "No slots available"}
                                            </p>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => handleBookAppointment()}
                                            className="
                                                mt-4
                                                inline-flex
                                                items-center
                                                gap-2
                                                text-sm
                                                font-bold
                                                text-navy
                                                hover:text-gold
                                                transition
                                            "
                                        >
                                            Book Appointment
                                            <ArrowLeft className="w-4 h-4 rotate-180" />
                                        </button>

                                    </div>

                                    {/* Business Hours */}
                                    <div>

                                        <div className="flex items-center gap-2 mb-5">
                                            <Clock className="w-5 h-5 text-gold" />

                                            <h2 className="font-serif text-xl text-navy">
                                                Business Hours
                                            </h2>
                                        </div>

                                        <div className="flex flex-col">

                                            {Object.entries(company.businessHours).map(
                                                ([day, hours]) => {

                                                    const todayKey = new Date()
                                                        .toLocaleDateString("en-US", {
                                                            weekday: "long",
                                                        })
                                                        .toLowerCase();

                                                    const isToday = day === todayKey;

                                                    return (
                                                        <div
                                                            key={day}
                                                            className={`
                                                                flex
                                                                items-center
                                                                justify-between
                                                                py-2.5
                                                                border-b
                                                                border-gray/10
                                                                text-sm
                                                                ${
                                                                    isToday
                                                                        ? "font-bold text-navy"
                                                                        : "text-slate"
                                                                }
                                                            `}
                                                        >
                                                            <span className="capitalize">
                                                                {day}
                                                            </span>

                                                            {hours ? (
                                                                <span>{hours}</span>
                                                            ) : (
                                                                <span className="text-red-600">
                                                                    Closed
                                                                </span>
                                                            )}
                                                        </div>
                                                    );
                                                }
                                            )}

                                        </div>

                                    </div>

                                </div>
                            </aside>

                        </div>

                    </div>

                </main>

            </div>

        </div>
    );
}

export default CompanyProfile;