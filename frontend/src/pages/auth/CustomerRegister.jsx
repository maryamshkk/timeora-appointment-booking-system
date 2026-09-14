import React, { useState } from "react";
import { ArrowRight, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";

import RegistrationIntro from "../../components/common/RegistrationIntro";
import RegistrationSteps from "../../components/common/RegistrationSteps";
import { useCustomerRegister } from "../../hooks/authHook";

function CustomerRegistration() {
    const {
        mutate: registerCustomer,
        isPending,
        error,
        reset,
    } = useCustomerRegister();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({});

    const passwordsMatch =
        formData.confirmPassword === "" ||
        formData.password === formData.confirmPassword;

    function handleChange(event) {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));

        setErrors((previous) => ({
            ...previous,
            [name]: "",
        }));
    }

    function validate() {
        const validationErrors = {};

        if (!formData.fullName.trim()) {
            validationErrors.fullName = "Full name is required.";
        }

        if (!formData.email.trim()) {
            validationErrors.email = "Email address is required.";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
        ) {
            validationErrors.email = "Please enter a valid email address.";
        }

        if (!formData.password) {
            validationErrors.password = "Password is required.";
        } else if (formData.password.length < 8) {
            validationErrors.password =
                "Password must be at least 8 characters.";
        }

        if (!formData.confirmPassword) {
            validationErrors.confirmPassword =
                "Please confirm your password.";
        } else if (formData.password !== formData.confirmPassword) {
            validationErrors.confirmPassword = "Passwords do not match.";
        }

        return validationErrors;
    }

    function handleSubmit(event) {
        event.preventDefault();

        reset();

        const validationErrors = validate();

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        registerCustomer(formData);
    }

    const hasValidationErrors =
        !formData.fullName.trim() ||
        !formData.email.trim() ||
        !formData.password ||
        formData.password.length < 8 ||
        !formData.confirmPassword ||
        !passwordsMatch;

    const apiErrorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "";

    return (
        <div className="min-h-screen bg-beige px-3 py-6 sm:px-4 sm:py-8 md:px-6 md:py-10 lg:px-10">
            <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-6 md:flex-row md:items-start md:gap-8 lg:gap-10">

                <RegistrationIntro
                    heading="Book appointments, manage your visits, and stay on schedule with TIMEORA."
                    description="Create your customer account to book appointments, view your visit history, and manage your schedule in one place."
                />

                <div className="w-full max-w-[640px] md:w-[58%] md:max-w-none md:flex-shrink-0">

                    <Link
                        to="/register"
                        className="
                            inline-flex
                            items-center
                            text-xs
                            font-bold
                            tracking-wide
                            text-navy
                            hover:text-gold
                            transition
                            mb-5
                        "
                    >
                        ← BACK TO ROLE SELECTION
                    </Link>

                    <div className="bg-white rounded-xl shadow-sm border border-gray/20 p-4 sm:p-6 md:p-8 lg:p-10">

                        <RegistrationSteps currentStep={1} />

                        <h1 className="mt-4 font-serif text-xl text-navy sm:text-2xl md:text-3xl">
                            Register as Customer
                        </h1>

                        <div className="border-b border-gray/20 mt-4 mb-4" />

                        <p className="text-sm text-slate mb-6">
                            Create your account to start booking appointments
                            with TIMEORA.
                        </p>

                        <form onSubmit={handleSubmit}>

                            <div className="mb-5">
                                <label
                                    htmlFor="fullName"
                                    className="block text-xs font-bold uppercase tracking-wide text-navy mb-2"
                                >
                                    FULL NAME
                                </label>

                                <input
                                    id="fullName"
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    placeholder="Jane Doe"
                                    className="
                                        w-full
                                        border
                                        border-gray
                                        rounded-lg
                                        px-4
                                        py-3
                                        text-sm
                                        text-navy
                                        outline-none
                                        focus:border-navy
                                        focus:ring-2
                                        focus:ring-gold
                                    "
                                />

                                {errors.fullName && (
                                    <p className="text-xs text-red-600 mt-1.5">
                                        {errors.fullName}
                                    </p>
                                )}
                            </div>

                            <div className="mb-5">
                                <label
                                    htmlFor="email"
                                    className="block text-xs font-bold uppercase tracking-wide text-navy mb-2"
                                >
                                    EMAIL ADDRESS
                                </label>

                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="name@example.com"
                                    className="
                                        w-full
                                        border
                                        border-gray
                                        rounded-lg
                                        px-4
                                        py-3
                                        text-sm
                                        text-navy
                                        outline-none
                                        focus:border-navy
                                        focus:ring-2
                                        focus:ring-gold
                                    "
                                />

                                {errors.email && (
                                    <p className="text-xs text-red-600 mt-1.5">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div className="mb-5">
                                <label
                                    htmlFor="password"
                                    className="block text-xs font-bold uppercase tracking-wide text-navy mb-2"
                                >
                                    PASSWORD
                                </label>

                                <div className="relative">
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="
                                            w-full
                                            border
                                            border-gray
                                            rounded-lg
                                            px-4
                                            py-3
                                            pr-11
                                            text-sm
                                            text-navy
                                            outline-none
                                            focus:border-navy
                                            focus:ring-2
                                            focus:ring-gold
                                        "
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="
                                            absolute
                                            right-3
                                            top-1/2
                                            -translate-y-1/2
                                            text-brown
                                            hover:text-navy
                                            cursor-pointer
                                        "
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-4 h-4" />
                                        ) : (
                                            <Eye className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>

                                <p className="text-xs text-slate mt-1.5">
                                    Must be at least 8 characters.
                                </p>

                                {errors.password && (
                                    <p className="text-xs text-red-600 mt-1.5">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            <div className="mb-6">
                                <label
                                    htmlFor="confirmPassword"
                                    className="block text-xs font-bold uppercase tracking-wide text-navy mb-2"
                                >
                                    CONFIRM PASSWORD
                                </label>

                                <div className="relative">
                                    <input
                                        id="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className="
                                            w-full
                                            border
                                            border-gray
                                            rounded-lg
                                            px-4
                                            py-3
                                            pr-11
                                            text-sm
                                            text-navy
                                            outline-none
                                            focus:border-navy
                                            focus:ring-2
                                            focus:ring-gold
                                        "
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmPassword(!showConfirmPassword)
                                        }
                                        className="
                                            absolute
                                            right-3
                                            top-1/2
                                            -translate-y-1/2
                                            text-brown
                                            hover:text-navy
                                            cursor-pointer
                                        "
                                        aria-label={
                                            showConfirmPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="w-4 h-4" />
                                        ) : (
                                            <Eye className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>

                                {!passwordsMatch && formData.confirmPassword && (
                                    <p className="text-xs text-red-600 mt-1.5">
                                        Passwords do not match.
                                    </p>
                                )}

                                {errors.confirmPassword && passwordsMatch && (
                                    <p className="text-xs text-red-600 mt-1.5">
                                        {errors.confirmPassword}
                                    </p>
                                )}
                            </div>

                            {apiErrorMessage && (
                                <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3">
                                    <p className="text-xs text-red-700">
                                        {apiErrorMessage}
                                    </p>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isPending || hasValidationErrors}
                                className="
                                    w-full
                                    py-4
                                    rounded-lg
                                    bg-navy
                                    text-white
                                    uppercase
                                    tracking-wide
                                    font-bold
                                    text-sm
                                    flex
                                    items-center
                                    justify-center
                                    gap-2
                                    hover:bg-gold
                                    hover:text-navy
                                    transition
                                    disabled:opacity-50
                                    disabled:cursor-not-allowed
                                    disabled:hover:bg-navy
                                    disabled:hover:text-white
                                "
                            >
                                {isPending ? "REGISTERING..." : "REGISTER"}

                                {!isPending && (
                                    <ArrowRight className="w-4 h-4" />
                                )}
                            </button>

                        </form>

                        <p className="text-sm text-slate text-center mt-5">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="text-brown font-bold hover:underline"
                            >
                                Login
                            </Link>
                        </p>

                    </div>

                    <p className="text-xs text-brown text-center mt-5">
                        Privacy Policy
                        <span className="mx-2 text-brown/60">·</span>
                        Terms &amp; Conditions
                    </p>

                </div>

            </div>
        </div>
    );
}

export default CustomerRegistration;