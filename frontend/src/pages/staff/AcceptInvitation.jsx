import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import {
    Loader2,
    AlertCircle,
    CheckCircle2,
    Eye,
    EyeOff,
    Lock,
} from "lucide-react";
import api from "../../services/api";

function AcceptInvitation() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const token = searchParams.get("token");

    const [status, setStatus] = useState("loading");
    const [error, setError] = useState("");
    const [staffData, setStaffData] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        password: "",
        confirm_password: "",
    });

    useEffect(() => {
        if (!token) {
            setStatus("error");
            setError("No invitation token provided.");
            return;
        }

        api.get("/staff/verify-invitation", { params: { token } })
            .then((res) => {
                setStaffData(res.data.data);
                setStatus("form");
            })
            .catch((err) => {
                setStatus("error");
                setError(
                    err?.response?.data?.message ||
                        "Invalid or expired invitation."
                );
            });
    }, [token]);

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setError("");
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        if (formData.password !== formData.confirm_password) {
            setError("Passwords do not match.");
            return;
        }

        if (formData.password.length < 8) {
            setError("Password must be at least 8 characters.");
            return;
        }

        setIsSubmitting(true);

        try {
            await api.post("/staff/accept-invitation", {
                token,
                password: formData.password,
                confirm_password: formData.confirm_password,
            });

            setStatus("success");
            setTimeout(() => navigate("/login"), 3000);
        } catch (err) {
            setError(
                err?.response?.data?.message || "Failed to set password."
            );
            setIsSubmitting(false);
        }
    }

    return (
        <div className="min-h-screen bg-beige flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-md bg-white rounded-xl border border-gray/20 shadow-sm p-8">
                <div className="text-center mb-6">
                    <h1 className="font-serif italic text-2xl text-navy">
                        Timeora
                    </h1>
                </div>

                {status === "loading" && (
                    <div className="flex flex-col items-center gap-3 py-10">
                        <Loader2 className="h-6 w-6 animate-spin text-navy" />
                        <p className="text-sm text-slate">
                            Verifying invitation...
                        </p>
                    </div>
                )}

                {status === "error" && (
                    <div className="text-center">
                        <AlertCircle className="mx-auto h-10 w-10 text-red-500 mb-3" />
                        <h2 className="font-serif text-xl text-navy mb-2">
                            Invalid Invitation
                        </h2>
                        <p className="text-sm text-red-600 mb-6">{error}</p>
                        <Link
                            to="/login"
                            className="inline-block bg-navy text-white px-6 py-3 rounded-lg font-bold text-sm hover:bg-gold hover:text-navy transition"
                        >
                            Back to Login
                        </Link>
                    </div>
                )}

                {status === "success" && (
                    <div className="text-center">
                        <CheckCircle2 className="mx-auto h-12 w-12 text-green-500 mb-3" />
                        <h2 className="font-serif text-xl text-navy mb-2">
                            Account Activated!
                        </h2>
                        <p className="text-sm text-slate mb-4">
                            Redirecting to login...
                        </p>
                        <Loader2 className="mx-auto h-5 w-5 animate-spin text-navy" />
                    </div>
                )}

                {status === "form" && staffData && (
                    <>
                        <div className="text-center mb-6">
                            <h2 className="font-serif text-2xl text-navy mb-2">
                                Welcome, {staffData.first_name}!
                            </h2>
                            <p className="text-sm text-slate">
                                You've been invited to join{" "}
                                <span className="font-bold text-navy">
                                    {staffData.company}
                                </span>
                            </p>
                        </div>

                        <div className="bg-beige/40 rounded-lg p-4 mb-6 text-sm text-slate">
                            <p className="break-all">
                                <span className="font-bold text-navy">
                                    Email:
                                </span>{" "}
                                {staffData.email}
                            </p>
                        </div>

                        {error && (
                            <div className="mb-4 flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-600" />
                                <p className="text-sm text-red-700">
                                    {error}
                                </p>
                            </div>
                        )}

                        <form
                            onSubmit={handleSubmit}
                            className="flex flex-col gap-4"
                        >
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wide text-navy mb-2">
                                    Set Password
                                </label>
                                <div className="relative">
                                    <Lock className="w-[18px] h-[18px] text-slate absolute top-1/2 left-3.5 -translate-y-1/2 pointer-events-none" />
                                    <input
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        required
                                        disabled={isSubmitting}
                                        className="w-full bg-white border border-gray rounded-lg py-3 pl-11 pr-11 text-sm text-navy placeholder:text-slate outline-none focus:border-navy focus:ring-2 focus:ring-gold transition disabled:opacity-60"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute top-1/2 right-3.5 -translate-y-1/2 cursor-pointer"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-[18px] h-[18px] text-slate" />
                                        ) : (
                                            <Eye className="w-[18px] h-[18px] text-slate" />
                                        )}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-wide text-navy mb-2">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <Lock className="w-[18px] h-[18px] text-slate absolute top-1/2 left-3.5 -translate-y-1/2 pointer-events-none" />
                                    <input
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        name="confirm_password"
                                        value={formData.confirm_password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        required
                                        disabled={isSubmitting}
                                        className="w-full bg-white border border-gray rounded-lg py-3 pl-11 pr-4 text-sm text-navy placeholder:text-slate outline-none focus:border-navy focus:ring-2 focus:ring-gold transition disabled:opacity-60"
                                    />
                                </div>
                            </div>

                            <p className="text-xs text-slate leading-relaxed">
                                Password must be at least 8 characters with
                                uppercase, lowercase, number, and special
                                character.
                            </p>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-navy text-white py-3.5 rounded-lg font-bold text-sm hover:bg-gold hover:text-navy transition flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        Activating Account...
                                    </>
                                ) : (
                                    "Activate Account"
                                )}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
}

export default AcceptInvitation;