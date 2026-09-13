import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import useInView from "../../hooks/useInView";

function ContactSection() {
    const [ref, inView] = useInView({ threshold: 0.15 });
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        // TODO: wire to /api/public/contact
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 4000);
        setFormData({ name: "", email: "", message: "" });
    }

    return (
        <section
            id="contact"
            ref={ref}
            className="bg-white px-4 py-16 sm:px-6 sm:py-20 md:px-8 md:py-24"
        >
            <div className="mx-auto max-w-7xl">

                <div
                    className={`mx-auto mb-12 max-w-2xl text-center transition-all duration-500
                        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}
                >
                    <p className="mb-3 text-xs font-bold tracking-[0.2em] text-brown sm:text-sm">
                        CONTACT US
                    </p>

                    <h2 className="font-serif text-2xl text-navy sm:text-3xl md:text-4xl">
                        Questions? We'd love to hear from you.
                    </h2>

                    <p className="mt-4 text-sm leading-relaxed text-slate md:text-base">
                        Reach out and a real person on our team will respond within one business day.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.4fr] lg:gap-12">

                    {/* Contact Info */}
                    <div
                        style={{ transitionDelay: inView ? "120ms" : "0ms" }}
                        className={`flex flex-col gap-5 transition-all duration-500
                            ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                    >
                        {[
                            { icon: Mail, label: "Email", value: "timeorabytiemio@gmail.com" },
                            { icon: Phone, label: "Phone", value: "+92 317 4842792" },
                            { icon: MapPin, label: "Office", value: "Lahore, Pakistan" },
                        ].map((item) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.label}
                                    className="flex items-start gap-4 rounded-xl border border-gray/20 bg-beige/50 p-4"
                                >
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-navy text-gold">
                                        <Icon className="h-5 w-5" />
                                    </div>

                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wide text-slate">
                                            {item.label}
                                        </p>
                                        <p className="mt-1 text-sm font-bold text-navy">
                                            {item.value}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Contact Form */}
                    <form
                        onSubmit={handleSubmit}
                        style={{ transitionDelay: inView ? "240ms" : "0ms" }}
                        className={`rounded-2xl border border-gray/20 bg-beige/40 p-5 sm:p-6 md:p-8 transition-all duration-500
                            ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
                    >
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wide text-navy mb-2">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Jane Doe"
                                    className="w-full rounded-lg border border-gray/40 bg-white px-4 py-3 text-sm text-navy outline-none focus:border-navy focus:ring-2 focus:ring-gold/50"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wide text-navy mb-2">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="jane@example.com"
                                    className="w-full rounded-lg border border-gray/40 bg-white px-4 py-3 text-sm text-navy outline-none focus:border-navy focus:ring-2 focus:ring-gold/50"
                                />
                            </div>
                        </div>

                        <div className="mt-4">
                            <label className="block text-xs font-bold uppercase tracking-wide text-navy mb-2">
                                Message
                            </label>
                            <textarea
                                name="message"
                                rows="5"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                placeholder="Tell us a bit about your business..."
                                className="w-full rounded-lg border border-gray/40 bg-white px-4 py-3 text-sm text-navy outline-none resize-y focus:border-navy focus:ring-2 focus:ring-gold/50"
                            />
                        </div>

                        <button
                            type="submit"
                            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-navy px-6 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-gold hover:text-navy hover:-translate-y-0.5 sm:w-auto"
                        >
                            <Send className="h-4 w-4" />
                            Send Message
                        </button>

                        {submitted && (
                            <p className="mt-3 text-xs font-bold text-green-700">
                                Thanks! We'll get back to you shortly.
                            </p>
                        )}
                    </form>

                </div>
            </div>
        </section>
    );
}

export default ContactSection;