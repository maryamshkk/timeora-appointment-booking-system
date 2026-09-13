import { useEffect, useRef, useState } from "react";
import { Clock, Mail, CheckCircle2, AlertCircle } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import RegistrationSteps from "../../components/common/RegistrationSteps";
import Button from "../../components/common/Button";
import { useAuth } from "../../context/AuthContext";

function VerifyOtp({ email = "", role = "company" }) {
    const navigate = useNavigate();
    const location = useLocation();

    const {
        verifyCompanyOtp,
        resendCompanyOtp,
        verifyCustomerOtp,
        resendCustomerOtp,
        loading,
        error,
        clearError,
    } = useAuth();

    const [otp, setOtp] = useState(Array(6).fill(""));
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
    const [isExpired, setIsExpired] = useState(false);
    const [formError, setFormError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isResending, setIsResending] = useState(false);
    const inputRefs = useRef([]);

    const isCustomer = role === "customer";

    // Email can be passed as a prop or via navigation state
    const targetEmail =
        email ||
        location.state?.adminEmail ||
        location.state?.customerEmail ||
        "";

    // Company ID only applies to the company flow
    const companyId = location.state?.companyId || null;
    const registrationMessage = location.state?.message || "";

    // Role-aware copy
    const eyebrowText = isCustomer
        ? "Customer Account Verification"
        : "Company Account Verification";

    const headingText = isCustomer
        ? "Verify Your Email"
        : "Verify Your Email";

    const descriptionText = isCustomer
        ? "Enter the code below to verify your email and complete your customer registration."
        : "Enter the code below to verify your email and complete your company registration.";

    const backLinkPath = isCustomer
        ? "/register/customer"
        : "/register/company";

    const successRedirect = isCustomer
        ? "/register/customer/account-created"
        : "/register/account-created";

    // Choose the correct API functions based on role
    const verifyOtpFn = isCustomer ? verifyCustomerOtp : verifyCompanyOtp;
    const resendOtpFn = isCustomer ? resendCustomerOtp : resendCompanyOtp;

    // Redirect if no email (user landed here directly)
    useEffect(() => {
        const missingRequired =
            !targetEmail || (!isCustomer && !companyId);

        if (missingRequired) {
            navigate(backLinkPath, {
                replace: true,
                state: {
                    error: "Please complete registration first.",
                },
            });
        }
    }, [targetEmail, companyId, isCustomer, navigate, backLinkPath]);

    // Clear auth context error when component mounts
    useEffect(() => {
        if (clearError) {
            clearError();
        }

        setFormError("");
        setSuccessMessage("");

        setTimeout(() => {
            inputRefs.current[0]?.focus();
        }, 100);
    }, [clearError]);

    function maskEmail(emailAddress) {
        if (!emailAddress || !emailAddress.includes("@")) {
            return emailAddress;
        }

        const [username, domain] = emailAddress.split("@");

        if (username.length <= 2) {
            return `${username[0] || ""}••••@${domain}`;
        }

        const visibleStart = username.slice(0, 2);
        const visibleEnd = username.slice(-1);
        const maskedMiddle = "•".repeat(Math.max(username.length - 3, 1));

        return `${visibleStart}${maskedMiddle}${visibleEnd}@${domain}`;
    }

    function handleChange(index, value) {
        if (!/^\d*$/.test(value)) {
            return;
        }

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setFormError("");

        if (clearError) {
            clearError();
        }

        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    }

    function handleKeyDown(index, event) {
        if (event.key === "Backspace") {
            if (!otp[index] && index > 0) {
                const newOtp = [...otp];
                newOtp[index - 1] = "";
                setOtp(newOtp);
                inputRefs.current[index - 1]?.focus();
            }
        } else if (event.key === "ArrowLeft" && index > 0) {
            inputRefs.current[index - 1]?.focus();
        } else if (event.key === "ArrowRight" && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    }

    function handlePaste(event) {
        event.preventDefault();
        const pastedData = event.clipboardData.getData("text").trim();
        const digits = pastedData.replace(/\D/g, "").slice(0, 6);

        if (digits.length > 0) {
            const newOtp = Array(6).fill("");
            digits.split("").forEach((digit, index) => {
                if (index < 6) {
                    newOtp[index] = digit;
                }
            });

            setOtp(newOtp);
            setFormError("");

            const focusIndex = digits.length < 6 ? digits.length : 5;
            inputRefs.current[focusIndex]?.focus();
        }
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, "0")}:${String(
            remainingSeconds
        ).padStart(2, "0")}`;
    }

    // Countdown timer
    useEffect(() => {
        if (timeLeft <= 0) {
            setIsExpired(true);
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(timer);
                    setIsExpired(true);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft, isExpired]);

    async function handleSubmit(event) {
        event.preventDefault();

        setFormError("");
        setSuccessMessage("");

        if (clearError) {
            clearError();
        }

        const otpCode = otp.join("");

        if (otpCode.length !== 6) {
            setFormError(
                "Please enter the complete 6-digit verification code."
            );
            inputRefs.current[otp.findIndex((digit) => !digit)]?.focus();
            return;
        }

        if (isExpired || timeLeft <= 0) {
            setFormError(
                "Your verification code has expired. Please request a new code."
            );
            return;
        }

        try {
            const payload = isCustomer
                ? { email: targetEmail, otp: otpCode }
                : { email: targetEmail, otp: otpCode, company_id: companyId };

            const response = await verifyOtpFn(payload);

            setSuccessMessage(
                response?.message || "Email verified successfully."
            );

            if (response?.data?.token) {
                localStorage.setItem("authToken", response.data.token);
            }

            setTimeout(() => {
                navigate(successRedirect, {
                    state: {
                        email: targetEmail,
                        message:
                            "Email verified successfully. You can now log in.",
                    },
                });
            }, 1500);
        } catch (err) {
            const errorMessage =
                err?.response?.data?.message ||
                err?.message ||
                error?.message ||
                "Invalid verification code. Please try again.";

            setFormError(errorMessage);

            setOtp(Array(6).fill(""));
            inputRefs.current[0]?.focus();
        }
    }

    async function handleResendOtp() {
        setFormError("");
        setSuccessMessage("");

        if (clearError) {
            clearError();
        }

        setIsResending(true);

        try {
            const payload = isCustomer
                ? { email: targetEmail }
                : { email: targetEmail, company_id: companyId };

            const response = await resendOtpFn(payload);

            setOtp(Array(6).fill(""));
            setTimeLeft(300);
            setIsExpired(false);
            setSuccessMessage(
                response?.message ||
                    "A new verification code has been sent to your email."
            );

            setTimeout(() => {
                inputRefs.current[0]?.focus();
            }, 100);
        } catch (err) {
            const errorMessage =
                err?.response?.data?.message ||
                err?.message ||
                error?.message ||
                "Unable to resend OTP. Please try again.";
            setFormError(errorMessage);
        } finally {
            setIsResending(false);
        }
    }

    // If required info is missing, don't render
    if (!targetEmail || (!isCustomer && !companyId)) {
        return null;
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-beige px-4 py-10">
            <div className="w-full max-w-[540px] rounded-2xl border border-gray/20 bg-white p-6 shadow-xl sm:p-8 md:p-12">
                {/* Step Progress */}
                <RegistrationSteps currentStep={2} />

                {/* Header */}
                <div className="mt-7">
                    {/* Eyebrow */}
                    <div className="mb-3 flex items-center gap-2">
                        <span className="h-1.5 w-1.5 rounded-full bg-gold" />
                        <p className="text-xs font-bold uppercase tracking-wide text-brown">
                            {eyebrowText}
                        </p>
                    </div>

                    {/* Heading */}
                    <h1 className="mb-4 font-serif text-3xl font-bold text-navy md:text-4xl">
                        {headingText}
                    </h1>

                    {/* Description */}
                    <p className="mb-2 text-sm text-slate">
                        We sent a 6-digit verification code to:
                    </p>

                    {/* Email */}
                    <div className="mb-4 flex items-center gap-2 rounded-lg bg-beige/50 px-3 py-2">
                        <Mail className="h-4 w-4 shrink-0 text-brown" />
                        <span className="text-sm font-bold text-navy">
                            {maskEmail(targetEmail)}
                        </span>
                    </div>

                    {/* Instruction */}
                    <p className="text-sm leading-relaxed text-slate">
                        {descriptionText}
                    </p>
                </div>

                {/* Verification Form */}
                <form onSubmit={handleSubmit}>
                    <div className="mt-7">
                        <p className="mb-3 text-xs font-bold uppercase tracking-wide text-navy">
                            Verification Code
                        </p>

                        <div
                            className="flex items-center justify-between gap-2 sm:gap-3"
                            onPaste={handlePaste}
                        >
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(element) => {
                                        inputRefs.current[index] = element;
                                    }}
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]*"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(event) =>
                                        handleChange(index, event.target.value)
                                    }
                                    onKeyDown={(event) =>
                                        handleKeyDown(index, event)
                                    }
                                    onFocus={(event) => event.target.select()}
                                    disabled={isExpired || loading || isResending}
                                    aria-label={`Verification digit ${index + 1}`}
                                    className={`
                                        h-12 w-12
                                        rounded-lg
                                        border-2
                                        text-center
                                        font-serif
                                        text-2xl
                                        font-bold
                                        text-navy
                                        outline-none
                                        transition-all
                                        duration-200
                                        sm:h-16 sm:w-16
                                        ${digit ? "border-navy bg-white" : "border-gray bg-white"}
                                        ${isExpired ? "opacity-50" : ""}
                                        focus:border-navy
                                        focus:ring-2
                                        focus:ring-gold/50
                                        disabled:cursor-not-allowed
                                        disabled:bg-gray/10
                                    `}
                                />
                            ))}
                        </div>

                        {/* Success Message */}
                        {successMessage && (
                            <div className="mt-4 flex items-start gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3">
                                <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600" />
                                <p className="text-sm text-green-700">
                                    {successMessage}
                                </p>
                            </div>
                        )}

                        {/* Error Message */}
                        {(formError || error?.message) && (
                            <div className="mt-4 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                                <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
                                <p className="text-sm text-red-700">
                                    {formError || error?.message}
                                </p>
                            </div>
                        )}

                        {/* Countdown + Resend */}
                        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex items-center gap-2">
                                <Clock
                                    className={`h-4 w-4 ${
                                        isExpired ? "text-red-500" : "text-slate"
                                    }`}
                                />
                                {isExpired ? (
                                    <span className="text-sm font-bold text-red-500">
                                        Code expired
                                    </span>
                                ) : (
                                    <span className="text-sm text-slate">
                                        Code expires in:{" "}
                                        <span className="font-bold text-navy">
                                            {formatTime(timeLeft)}
                                        </span>
                                    </span>
                                )}
                            </div>

                            <button
                                type="button"
                                onClick={handleResendOtp}
                                disabled={loading || isResending}
                                className="text-left text-sm font-bold text-navy hover:underline disabled:cursor-not-allowed disabled:opacity-50 sm:text-right"
                            >
                                {isResending
                                    ? "Sending..."
                                    : "Didn't receive code? Resend OTP"}
                            </button>
                        </div>

                        {/* Verify Button */}
                        <div className="mt-7">
                            <Button
                                type="submit"
                                disabled={
                                    loading ||
                                    isResending ||
                                    isExpired ||
                                    otp.join("").length !== 6
                                }
                                className="w-full"
                            >
                                {loading ? "Verifying..." : "Verify Email"}
                            </Button>
                        </div>
                    </div>
                </form>

                {/* Footer */}
                <div className="mt-8 border-t border-gray/20 pt-6 text-center">
                    <p className="text-sm text-slate">
                        Wrong email address?{" "}
                        <button
                            type="button"
                            onClick={() => navigate(backLinkPath)}
                            className="font-bold text-navy hover:underline"
                        >
                            Back to registration
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default VerifyOtp;