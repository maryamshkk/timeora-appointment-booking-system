import React, { useState } from "react";
import {
    Search,
    CalendarCheck,
    Users,
    Scissors,
    Banknote,
    ChevronDown,
    SearchX,
    MessageCircle,
    Mail,
    Phone,
    FileText,
} from "lucide-react";

import Sidebar from "../../components/dashboard/Sidebar";
import Topbar from "../../components/dashboard/Topbar";

const categories = [
    {
        icon: CalendarCheck,
        title: "Appointments & Booking",
        count: "14 articles",
    },
    {
        icon: Users,
        title: "Staff Management",
        count: "9 articles",
    },
    {
        icon: Scissors,
        title: "Services & Pricing",
        count: "7 articles",
    },
    {
        icon: Banknote,
        title: "Payments & Receipts",
        count: "6 articles",
    },
];

const faqs = [
    {
        category: "Appointments & Booking",
        question:
            "How do I create an appointment on behalf of a customer?",
        answer:
            "Go to Appointments → Create Appointment, then select the customer, service, staff member, and an available 1-hour time slot.",
    },
    {
        category: "Appointments & Booking",
        question:
            "Can a customer reschedule their own appointment?",
        answer:
            "Rescheduling follows the same request-based flow as booking — the customer submits a request and the assigned staff member must accept it before the change is confirmed.",
    },
    {
        category: "Staff Management",
        question:
            "How do I invite a new staff member?",
        answer:
            "Navigate to Staff → Add Staff, fill in their details and assigned services, then click Send Invitation. They'll receive an email to set up their account.",
    },
    {
        category: "Services & Pricing",
        question:
            "Can services have different durations?",
        answer:
            "In the current version, all TIMEORA appointments use a fixed 1-hour slot. Variable durations aren't supported yet.",
    },
    {
        category: "Payments & Receipts",
        question:
            "How do I mark a payment as received?",
        answer:
            "Open the appointment's Payment page and click Mark as Paid. TIMEORA currently supports Cash on Reception only.",
    },
    {
        category: "Payments & Receipts",
        question:
            "Can I issue a refund?",
        answer:
            "Refunds aren't supported in the current version of TIMEORA. Cancelled appointments simply have no payment collected.",
    },
];

const popularArticles = [
    "Getting started with TIMEORA",
    "Setting up staff availability",
    "Understanding appointment statuses",
    "How Cash on Reception payments work",
];

function HelpCenter() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [expandedFaqIndex, setExpandedFaqIndex] = useState(null);
    const [showContactForm, setShowContactForm] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const filteredFaqs = faqs.filter((faq) => {
        const matchesCategory =
            !selectedCategory ||
            faq.category === selectedCategory;

        const query = searchQuery.trim().toLowerCase();

        const matchesSearch =
            query === "" ||
            faq.question.toLowerCase().includes(query) ||
            faq.answer.toLowerCase().includes(query);

        return matchesCategory && matchesSearch;
    });

    function handleCategoryClick(category) {
        setSelectedCategory(category);
        setExpandedFaqIndex(null);
    }

    function handleBackToCategories() {
        setSelectedCategory(null);
        setExpandedFaqIndex(null);
    }

    function handleFaqToggle(index) {
        setExpandedFaqIndex(
            expandedFaqIndex === index ? null : index
        );
    }

    return (
        <div className="min-h-screen bg-beige flex">

            {/* Desktop Sidebar */}
            <div className="hidden lg:block lg:flex-shrink-0">
                <Sidebar />
            </div>

            {/* Mobile / Tablet Sidebar — overlay drawer */}
            {sidebarOpen && (
                <>
                    <button
                        type="button"
                        onClick={() => setSidebarOpen(false)}
                        className="fixed inset-0 z-30 bg-navy/50 lg:hidden"
                        aria-label="Close menu"
                    />

                    <div className="fixed left-0 top-0 z-40 h-screen w-64 max-w-[80vw] overflow-y-auto lg:hidden">
                        <Sidebar />
                    </div>
                </>
            )}

            {/* Main Area */}
            <div className="flex min-w-0 flex-1 flex-col">

                <Topbar
                    onMenuClick={() => setSidebarOpen(true)}
                    showBell
                    simpleProfileIcon
                    showSearch={false}
                />

                <main className="flex-1 bg-beige px-4 py-6 sm:px-6 md:px-8 md:py-10">

                    {/* Hero Search */}
                    <section className="max-w-[640px] mx-auto text-center mb-8 sm:mb-10">

                        <h1 className="font-serif text-2xl text-navy mb-2 sm:text-3xl md:text-4xl">
                            How can we help?
                        </h1>

                        <p className="text-sm text-slate mb-6">
                            Search our knowledge base or browse categories below.
                        </p>

                        <div className="relative max-w-[560px] mx-auto">

                            <Search
                                size={18}
                                className="
                                    absolute
                                    left-4
                                    sm:left-5
                                    top-1/2
                                    -translate-y-1/2
                                    text-slate
                                    pointer-events-none
                                "
                            />

                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(event) => {
                                    setSearchQuery(event.target.value);
                                    setExpandedFaqIndex(null);
                                }}
                                placeholder="Search for articles, guides, or FAQs..."
                                className="
                                    w-full
                                    bg-white
                                    border
                                    border-gray/30
                                    rounded-xl
                                    pl-11
                                    sm:pl-14
                                    pr-4
                                    sm:pr-5
                                    py-3.5
                                    sm:py-4
                                    text-sm
                                    sm:text-base
                                    text-navy
                                    shadow-sm
                                    outline-none
                                    focus:border-navy
                                    focus:ring-2
                                    focus:ring-gold
                                "
                            />

                        </div>

                    </section>

                    <div className="max-w-[1200px] mx-auto">

                        {/* Category Cards */}
                        <section className="mb-8 sm:mb-10">

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                                {categories.map((category) => {
                                    const Icon = category.icon;

                                    const isSelected =
                                        selectedCategory === category.title;

                                    return (
                                        <button
                                            key={category.title}
                                            type="button"
                                            onClick={() =>
                                                handleCategoryClick(
                                                    category.title
                                                )
                                            }
                                            className={`
                                                bg-white
                                                rounded-xl
                                                border
                                                p-5
                                                sm:p-6
                                                cursor-pointer
                                                transition
                                                flex
                                                flex-col
                                                items-start
                                                text-left
                                                ${
                                                    isSelected
                                                        ? "border-navy shadow-md"
                                                        : "border-gray/20 shadow-sm hover:border-navy/40 hover:shadow-md"
                                                }
                                            `}
                                        >

                                            <div
                                                className="
                                                    w-11
                                                    h-11
                                                    bg-beige
                                                    rounded-lg
                                                    flex
                                                    items-center
                                                    justify-center
                                                    mb-3.5
                                                "
                                            >
                                                <Icon
                                                    size={20}
                                                    className="text-navy"
                                                />
                                            </div>

                                            <h2 className="text-base font-bold text-navy mb-1">
                                                {category.title}
                                            </h2>

                                            <p className="text-xs text-slate">
                                                {category.count}
                                            </p>

                                        </button>
                                    );
                                })}

                            </div>

                        </section>

                        {/* Main Content Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                            {/* FAQ Column */}
                            <section className="lg:col-span-2">

                                <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-5 sm:p-6 md:p-7">

                                    {/* FAQ Header */}
                                    <div className="mb-4">

                                        {selectedCategory && (
                                            <button
                                                type="button"
                                                onClick={
                                                    handleBackToCategories
                                                }
                                                className="
                                                    text-xs
                                                    font-bold
                                                    text-navy
                                                    hover:underline
                                                    mb-2
                                                "
                                            >
                                                ← All Categories
                                            </button>
                                        )}

                                        <h2 className="font-serif text-xl text-navy sm:text-2xl">
                                            {selectedCategory ||
                                                "Frequently Asked Questions"}
                                        </h2>

                                    </div>

                                    <div className="border-b border-gray/20 mb-2" />

                                    {/* FAQ List */}
                                    {filteredFaqs.length > 0 ? (
                                        <div>

                                            {filteredFaqs.map(
                                                (faq, index) => {
                                                    const isExpanded =
                                                        expandedFaqIndex ===
                                                        index;

                                                    return (
                                                        <div
                                                            key={`${faq.category}-${faq.question}`}
                                                            className="
                                                                border-b
                                                                border-gray/10
                                                                last:border-b-0
                                                            "
                                                        >

                                                            {/* Question */}
                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    handleFaqToggle(
                                                                        index
                                                                    )
                                                                }
                                                                className="
                                                                    w-full
                                                                    flex
                                                                    items-start
                                                                    sm:items-center
                                                                    justify-between
                                                                    gap-4
                                                                    py-4
                                                                    text-left
                                                                    cursor-pointer
                                                                "
                                                            >
                                                                <span className="text-sm sm:text-base font-bold text-navy pr-2 sm:pr-4 break-words">
                                                                    {
                                                                        faq.question
                                                                    }
                                                                </span>

                                                                <ChevronDown
                                                                    size={18}
                                                                    className={`
                                                                        text-slate
                                                                        flex-shrink-0
                                                                        mt-0.5
                                                                        sm:mt-0
                                                                        transition-transform
                                                                        ${
                                                                            isExpanded
                                                                                ? "rotate-180"
                                                                                : ""
                                                                        }
                                                                    `}
                                                                />

                                                            </button>

                                                            {/* Answer */}
                                                            {isExpanded && (
                                                                <p className="text-sm text-slate leading-relaxed mt-[-2px] pb-4 pr-4 sm:pr-8">
                                                                    {
                                                                        faq.answer
                                                                    }
                                                                </p>
                                                            )}

                                                        </div>
                                                    );
                                                }
                                            )}

                                        </div>
                                    ) : (
                                        /* Empty State */
                                        <div className="flex flex-col items-center justify-center py-16 text-center">

                                            <SearchX
                                                size={36}
                                                className="text-gray mb-4"
                                            />

                                            <p className="text-slate">
                                                No results found
                                            </p>

                                            <p className="text-sm text-gray mt-1">
                                                Try a different search term or
                                                browse all categories.
                                            </p>

                                        </div>
                                    )}

                                </div>

                            </section>

                            {/* Right Column */}
                            <aside className="lg:col-span-1 flex flex-col gap-6">

                                {/* Still Need Help */}
                                <div className="bg-navy rounded-xl p-5 sm:p-6 md:p-7 text-white">

                                    <h2 className="font-serif text-lg sm:text-xl text-white mb-2.5">
                                        Still need help?
                                    </h2>

                                    <p className="text-sm text-white/70 leading-relaxed mb-5">
                                        Our support team typically responds
                                        within a few hours.
                                    </p>

                                    {/* Contact toggle */}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowContactForm(
                                                (current) => !current
                                            )
                                        }
                                        className="
                                            w-full
                                            inline-flex
                                            items-center
                                            justify-center
                                            gap-2
                                            bg-gold
                                            text-navy
                                            px-4
                                            py-2.5
                                            rounded-lg
                                            text-sm
                                            font-bold
                                            hover:bg-white
                                            transition
                                        "
                                    >
                                        <MessageCircle className="w-4 h-4" />
                                        {showContactForm
                                            ? "Hide Contact"
                                            : "Contact Support"}
                                    </button>

                                    {showContactForm && (
                                        <div className="mt-4 border-t border-white/10 pt-4 space-y-3">

                                            <div>
                                                <label className="block text-[11px] font-bold uppercase tracking-wide text-white/70 mb-1.5">
                                                    Subject
                                                </label>

                                                <input
                                                    type="text"
                                                    placeholder="Brief summary"
                                                    className="
                                                        w-full
                                                        bg-white/10
                                                        border
                                                        border-white/20
                                                        rounded-lg
                                                        px-3
                                                        py-2
                                                        text-sm
                                                        text-white
                                                        placeholder-white/40
                                                        outline-none
                                                        focus:border-gold
                                                    "
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-[11px] font-bold uppercase tracking-wide text-white/70 mb-1.5">
                                                    Message
                                                </label>

                                                <textarea
                                                    rows="3"
                                                    placeholder="Describe your issue"
                                                    className="
                                                        w-full
                                                        bg-white/10
                                                        border
                                                        border-white/20
                                                        rounded-lg
                                                        px-3
                                                        py-2
                                                        text-sm
                                                        text-white
                                                        placeholder-white/40
                                                        outline-none
                                                        resize-y
                                                        focus:border-gold
                                                    "
                                                />
                                            </div>

                                            <button
                                                type="button"
                                                className="
                                                    w-full
                                                    bg-white
                                                    text-navy
                                                    px-4
                                                    py-2.5
                                                    rounded-lg
                                                    text-sm
                                                    font-bold
                                                    hover:bg-gold
                                                    transition
                                                "
                                                // TODO: POST /api/company/support/tickets
                                            >
                                                Send Message
                                            </button>

                                        </div>
                                    )}

                                    <div className="border-t border-white/10 my-4" />

                                    {/* Email */}
                                    <div className="flex items-start gap-2.5 mb-2.5">

                                        <Mail
                                            size={14}
                                            className="text-gold flex-shrink-0 mt-0.5"
                                        />

                                        <span className="text-sm text-white/80 break-all">
                                            timeorabytiemio@gmail.com
                                        </span>

                                    </div>

                                    {/* Phone */}
                                    <div className="flex items-start gap-2.5">

                                        <Phone
                                            size={14}
                                            className="text-gold flex-shrink-0 mt-0.5"
                                        />

                                        <span className="text-sm text-white/80 break-all">
                                            +92 317 4842792
                                        </span>

                                    </div>

                                </div>

                                {/* Popular Articles */}
                                <div className="bg-white rounded-xl border border-gray/20 shadow-sm p-5 sm:p-6">

                                    <h2 className="font-serif text-lg sm:text-xl text-navy mb-3.5">
                                        Popular Articles
                                    </h2>

                                    <div className="border-b border-gray/20 mb-3.5" />

                                    <div>

                                        {popularArticles.map(
                                            (article, index) => (
                                                <button
                                                    key={article}
                                                    type="button"
                                                    className={`
                                                        w-full
                                                        flex
                                                        items-start
                                                        gap-2.5
                                                        text-left
                                                        cursor-pointer
                                                        group
                                                        ${
                                                            index ===
                                                            popularArticles.length -
                                                                1
                                                                ? ""
                                                                : "mb-3.5"
                                                        }
                                                    `}
                                                >

                                                    <FileText
                                                        size={15}
                                                        className="
                                                            text-gray
                                                            mt-0.5
                                                            flex-shrink-0
                                                        "
                                                    />

                                                    <span className="text-sm font-bold text-navy leading-snug group-hover:underline break-words">
                                                        {article}
                                                    </span>

                                                </button>
                                            )
                                        )}

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

export default HelpCenter;