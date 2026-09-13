import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navLinks = [
        { label: "Home", path: "/" },
        { label: "Features", path: "/#features" },
        { label: "How It Works", path: "/#how-it-works" },
        { label: "About", path: "/about" },
        { label: "Contact", path: "/contact" },
    ];

    function handleMobileLinkClick() {
        setIsMobileMenuOpen(false);
    }

    return (
        <header className="sticky top-0 z-40 bg-white border-b border-gray/20">
            <div className="max-w-7xl mx-auto px-8 py-4">

                {/* Desktop / Main Row */}
                <div className="flex items-center justify-between">

                    {/* Logo */}
                    <Link
                        to="/"
                        className="font-serif italic text-2xl text-navy"
                    >
                        Timeora
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((item, index) => (
                            <Link
                                key={item.label}
                                to={item.path}
                                className={`
                                    text-sm
                                    font-bold
                                    tracking-wide
                                    transition
                                    ${
                                        index === 0
                                            ? "text-navy border-b-2 border-gold pb-1"
                                            : "text-slate hover:text-navy"
                                    }
                                `}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center gap-5">
                        <Link
                            to="/login"
                            className="
                                text-sm
                                font-bold
                                text-navy
                                hover:text-gold
                                transition
                            "
                        >
                            Login
                        </Link>

                        <Link
                            to="/register/company"
                            className="
                                bg-navy
                                text-white
                                px-5
                                py-2.5
                                rounded-lg
                                font-bold
                                text-sm
                                hover:bg-gold
                                hover:text-navy
                                transition
                            "
                        >
                            Register Your Company
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        onClick={() =>
                            setIsMobileMenuOpen(!isMobileMenuOpen)
                        }
                        className="
                            md:hidden
                            text-navy
                            hover:text-gold
                            transition
                        "
                        aria-label={
                            isMobileMenuOpen
                                ? "Close menu"
                                : "Open menu"
                        }
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>

                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="md:hidden pt-5 pb-2 border-t border-gray/20 mt-4">
                        <nav className="flex flex-col gap-1">

                            {navLinks.map((item, index) => (
                                <Link
                                    key={item.label}
                                    to={item.path}
                                    onClick={handleMobileLinkClick}
                                    className={`
                                        px-3
                                        py-3
                                        rounded-lg
                                        text-sm
                                        font-bold
                                        tracking-wide
                                        transition
                                        ${
                                            index === 0
                                                ? "bg-beige text-navy"
                                                : "text-slate hover:bg-beige hover:text-navy"
                                        }
                                    `}
                                >
                                    {item.label}
                                </Link>
                            ))}

                            <div className="border-t border-gray/20 my-3" />

                            <Link
                                to="/login"
                                onClick={handleMobileLinkClick}
                                className="
                                    px-3
                                    py-3
                                    text-sm
                                    font-bold
                                    text-navy
                                    hover:bg-beige
                                    rounded-lg
                                    transition
                                "
                            >
                                Login
                            </Link>

                            <Link
                                to="/register/company"
                                onClick={handleMobileLinkClick}
                                className="
                                    mt-1
                                    bg-navy
                                    text-white
                                    px-5
                                    py-3
                                    rounded-lg
                                    font-bold
                                    text-sm
                                    text-center
                                    hover:bg-gold
                                    hover:text-navy
                                    transition
                                "
                            >
                                Register Your Company
                            </Link>

                        </nav>
                    </div>
                )}

            </div>
        </header>
    );
}

export default Navbar;
