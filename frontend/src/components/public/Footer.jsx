import React from "react";
import { Link } from "react-router-dom";

function Footer() {
    const footerLinks = [
        { label: "Privacy Policy", path: "/privacy-policy" },
        { label: "Terms of Service", path: "/terms" },
        { label: "Cookie Policy", path: "/cookies" },
        { label: "Accessibility", path: "/accessibility" },
    ];

    return (
        <footer className="bg-navy text-white py-12 px-8">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6">

                {/* Brand */}
                <div>
                    <Link
                        to="/"
                        className="font-serif italic text-2xl text-gold"
                    >
                        Timeora
                    </Link>

                    <p className="text-sm text-white/60 mt-1.5">
                        Precision scheduling for elite providers.
                        © 2024 Timeora. All rights reserved.
                    </p>
                </div>

                {/* Footer Links */}
                <nav className="flex flex-wrap gap-6">
                    {footerLinks.map((item) => (
                        <Link
                            key={item.label}
                            to={item.path}
                            className="
                                text-sm
                                text-white/60
                                hover:text-white
                                transition
                            "
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

            </div>
        </footer>
    );
}

export default Footer;
