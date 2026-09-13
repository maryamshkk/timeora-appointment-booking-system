import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function Footer() {
    const footerLinks = [
        { label: "Privacy Policy", path: "/privacy-policy" },
        { label: "Terms of Service", path: "/terms" },
        { label: "Cookie Policy", path: "/cookies" },
        { label: "Accessibility", path: "/accessibility" },
    ];

    const footerRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const node = footerRef.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return (
        <footer
            ref={footerRef}
            className="bg-navy text-white py-12 px-8 overflow-hidden"
        >
            <div
                className={`
                    max-w-7xl mx-auto flex flex-col md:flex-row justify-between
                    items-start md:items-center gap-6
                    transition-all duration-700 ease-out
                    ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                `}
            >
                {/* Brand */}
                <div>
                    <Link
                        to="/"
                        className="
                            font-serif italic text-2xl text-gold inline-block
                            transition-transform duration-300 ease-out
                            hover:-translate-y-0.5
                        "
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
                            className="relative text-sm text-white/60 hover:text-white transition-colors duration-300 group"
                        >
                            {item.label}
                            <span
                                className="
                                    absolute left-0 -bottom-1 h-px w-0 bg-gold
                                    transition-all duration-300 ease-out
                                    group-hover:w-full
                                "
                            />
                        </Link>
                    ))}
                </nav>
            </div>
        </footer>
    );
}

export default Footer;
