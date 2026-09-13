import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("home");

    const location = useLocation();
    const navigate = useNavigate();

    const navLinks = [
        { label: "Home", target: "home" },
        { label: "Features", target: "features" },
        { label: "How It Works", target: "how-it-works" },
        { label: "About", target: "about" },
        { label: "Contact", target: "contact" },
    ];

    useEffect(() => {
        function handleScroll() {
            setIsScrolled(window.scrollY > 8);

            // Determine active section from scroll position
            const sections = ["features", "how-it-works", "about", "contact"];

            const scrollPos = window.scrollY + 140;
            let current = "home";

            for (const id of sections) {
                const el = document.getElementById(id);
                if (el && el.offsetTop <= scrollPos) {
                    current = id;
                }
            }

            setActiveSection(current);
        }

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [location.pathname]);

    function handleNavClick(event, target) {
        event.preventDefault();

        if (location.pathname !== "/") {
            navigate("/", { state: { scrollTo: target } });
            return;
        }

        if (target === "home") {
            window.scrollTo({ top: 0, behavior: "smooth" });
            return;
        }

        const el = document.getElementById(target);
        if (el) {
            const offset = 90;
            const top = el.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top, behavior: "smooth" });
        }
    }

    // If navigated from another page with a scrollTo state, honor it
    useEffect(() => {
        if (location.pathname === "/" && location.state?.scrollTo) {
            const target = location.state.scrollTo;

            setTimeout(() => {
                if (target === "home") {
                    window.scrollTo({ top: 0, behavior: "smooth" });
                    return;
                }
                const el = document.getElementById(target);
                if (el) {
                    const top =
                        el.getBoundingClientRect().top + window.scrollY - 90;
                    window.scrollTo({ top, behavior: "smooth" });
                }
            }, 60);

            // clear state
            navigate("/", { replace: true, state: {} });
        }
    }, [location, navigate]);

    function handleMobileLinkClick(event, target) {
        setIsMobileMenuOpen(false);
        handleNavClick(event, target);
    }

    return (
        <header
            className={`
                sticky top-0 z-40 bg-white/95 backdrop-blur border-b
                transition-all duration-300 ease-out
                ${isScrolled ? "border-gray/20 shadow-[0_4px_16px_-4px_rgba(0,12,30,0.12)]" : "border-transparent shadow-none"}
            `}
        >
            <div
                className={`
                    max-w-7xl mx-auto px-4 sm:px-6 md:px-8
                    transition-all duration-300 ease-out
                    ${isScrolled ? "py-3" : "py-4"}
                `}
            >
                <div className="flex items-center justify-between">

                    <Link
                        to="/"
                        onClick={(event) => handleNavClick(event, "home")}
                        className="font-serif italic text-2xl text-navy transition-transform duration-300 ease-out hover:-translate-y-0.5 inline-block"
                    >
                        Timeora
                    </Link>

                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((item) => {
                            const isActive = activeSection === item.target;

                            return (
                                <a
                                    key={item.label}
                                    href={`#${item.target}`}
                                    onClick={(event) => handleNavClick(event, item.target)}
                                    className={`
                                        relative text-sm font-bold tracking-wide pb-1
                                        transition-colors duration-300 group
                                        ${isActive ? "text-navy" : "text-slate hover:text-navy"}
                                    `}
                                >
                                    {item.label}
                                    <span
                                        className={`
                                            absolute left-0 -bottom-0 h-0.5 bg-gold
                                            transition-all duration-300 ease-out
                                            ${isActive ? "w-full" : "w-0 group-hover:w-full"}
                                        `}
                                    />
                                </a>
                            );
                        })}
                    </nav>

                    <div className="hidden md:flex items-center gap-5">
                        <Link
                            to="/login"
                            className="text-sm font-bold text-navy hover:text-gold transition"
                        >
                            Login
                        </Link>

                        <Link
                            to="/roleselection"
                            className="bg-navy text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-all duration-300 hover:bg-gold hover:text-navy hover:-translate-y-0.5 hover:shadow-[0_6px_18px_-6px_rgba(254,212,136,0.6)]"
                        >
                            Register Your Company
                        </Link>
                    </div>

                    <button
                        type="button"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden text-navy hover:text-gold transition"
                        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                    >
                        <span className="relative block w-6 h-6">
                            <Menu
                                className={`w-6 h-6 absolute inset-0 transition-all duration-200 ease-out ${
                                    isMobileMenuOpen
                                        ? "opacity-0 rotate-90 scale-75"
                                        : "opacity-100 rotate-0 scale-100"
                                }`}
                            />
                            <X
                                className={`w-6 h-6 absolute inset-0 transition-all duration-200 ease-out ${
                                    isMobileMenuOpen
                                        ? "opacity-100 rotate-0 scale-100"
                                        : "opacity-0 -rotate-90 scale-75"
                                }`}
                            />
                        </span>
                    </button>
                </div>

                <div
                    className={`
                        md:hidden overflow-hidden transition-all duration-300 ease-out
                        ${isMobileMenuOpen ? "max-h-[480px] opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"}
                    `}
                >
                    <div className="pt-5 pb-2 border-t border-gray/20">
                        <nav className="flex flex-col gap-1">
                            {navLinks.map((item) => {
                                const isActive = activeSection === item.target;

                                return (
                                    <a
                                        key={item.label}
                                        href={`#${item.target}`}
                                        onClick={(event) => handleMobileLinkClick(event, item.target)}
                                        className={`
                                            px-3 py-3 rounded-lg text-sm font-bold tracking-wide transition
                                            ${
                                                isActive
                                                    ? "bg-beige text-navy"
                                                    : "text-slate hover:bg-beige hover:text-navy"
                                            }
                                        `}
                                    >
                                        {item.label}
                                    </a>
                                );
                            })}

                            <div className="border-t border-gray/20 my-3" />

                            <Link
                                to="/login"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="px-3 py-3 text-sm font-bold text-navy hover:bg-beige rounded-lg transition"
                            >
                                Login
                            </Link>

                            <Link
                                to="/roleselection"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="mt-1 bg-navy text-white px-5 py-3 rounded-lg font-bold text-sm text-center hover:bg-gold hover:text-navy transition"
                            >
                                Register Your Company
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Navbar;