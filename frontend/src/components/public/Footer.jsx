import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

function Footer() {
    const footerLinks = [
        { label: "Privacy Policy", path: "/privacy" },
        { label: "Terms of Service", path: "/terms" },
        { label: "Cookie Policy", path: "/cookies" },
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
            className="overflow-hidden bg-navy px-4 py-12 text-white sm:px-6 md:px-8"
        >
            <div
                className={`
                    mx-auto flex max-w-7xl flex-col items-start justify-between gap-6
                    transition-all duration-700 ease-out md:flex-row md:items-center
                    ${isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}
                `}
            >
                <div>
                    <Link
                        to="/"
                        className="inline-block font-serif italic text-2xl text-gold transition-transform duration-300 ease-out hover:-translate-y-0.5"
                    >
                        Timeora
                    </Link>

                    <p className="mt-1.5 text-sm text-white/60">
                        Precision scheduling for elite providers.
                        © 2024 Timeora. All rights reserved.
                    </p>
                </div>

                <nav className="flex flex-wrap gap-6">
                    {footerLinks.map((item) => (
                        <Link
                            key={item.label}
                            to={item.path}
                            className="group relative text-sm text-white/60 transition-colors duration-300 hover:text-white"
                        >
                            {item.label}
                            <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 ease-out group-hover:w-full" />
                        </Link>
                    ))}
                </nav>
            </div>
        </footer>
    );
}

export default Footer;