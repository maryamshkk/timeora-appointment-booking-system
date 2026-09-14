import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const loginApi = async ({ email, password, rememberMe }) => {
    const response = await api.post("/auth/login", {
        email,
        password,
        remember_me: rememberMe,
    });
    return response.data;
};

export const useLogin = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: loginApi,

        onSuccess: (response) => {
            const { data } = response;

            if (data?.token) {
                localStorage.setItem("token", data.token);
            }

            const user =
                data?.user || data?.staff || data?.super_admin || null;

            if (user) {
                localStorage.setItem("user", JSON.stringify(user));
                queryClient.setQueryData(["auth", "me"], user);
            }

            if (data?.company) {
                navigate("/company/dashboard");
            } else if (data?.staff) {
                navigate("/staff/dashboard");
            } else if (data?.super_admin) {
                navigate("/super-admin/dashboard");
            } else {
                navigate("/");
            }
        },

        onError: (error) => {
            console.error(
                "Login failed:",
                error?.response?.data?.message || error.message
            );
        },
    });
};

export const useAuth = () => {
    return useQuery({
        queryKey: ["auth", "me"],
        queryFn: () => {
            const raw = localStorage.getItem("user");
            return raw ? JSON.parse(raw) : null;
        },
        initialData: () => {
            const raw = localStorage.getItem("user");
            return raw ? JSON.parse(raw) : null;
        },
        staleTime: Infinity,
    });
};

export const useLogout = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        queryClient.clear();
        navigate("/login");
    };
};

const companyRegisterApi = async (formData) => {
    const payload = {
        company_name: formData.companyName,
        business_email: formData.businessEmail,
        phone_number: `${formData.countryCode}${formData.phone}`.trim(),
        business_type: Number(formData.businessType),
        full_name: formData.fullName,
        admin_email: formData.adminEmail,
        password: formData.password,
        confirm_password: formData.confirmPassword,
        terms_accepted: formData.agreedToTerms ? true : false,
    };

    const response = await api.post("/auth/company/register", payload);
    return response.data;
};

export const useCompanyRegister = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: companyRegisterApi,

        onSuccess: (response) => {
            navigate("/register/verify-otp", {
                state: {
                    companyId: response?.data?.company_id,
                    adminEmail: response?.data?.admin_email,
                },
            });
        },

        onError: (error) => {
            console.error(
                "Company registration failed:",
                error?.response?.data?.message || error.message
            );
        },
    });
};

const customerRegisterApi = async (formData) => {
    const payload = {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone || null,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
    };

    const response = await api.post("/auth/customer/register", payload);
    return response.data;
};

export const useCustomerRegister = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: customerRegisterApi,

        onSuccess: (response) => {
            navigate("/register/customer/verify", {
                state: {
                    customerEmail: response?.data?.customer_email,
                },
            });
        },

        onError: (error) => {
            console.error(
                "Customer registration failed:",
                error?.response?.data?.message || error.message
            );
        },
    });
};

const companyVerifyOtpApi = async ({ email, otp, company_id }) => {
    const response = await api.post("/auth/company/verify-otp", {
        email,
        otp,
        company_id,
    });
    return response.data;
};

export const useCompanyVerifyOtp = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: companyVerifyOtpApi,

        onSuccess: (response) => {
            const { data } = response;

            if (data?.token) {
                localStorage.setItem("token", data.token);
            }

            const user = data?.company_admin || null;
            if (user) {
                localStorage.setItem("user", JSON.stringify(user));
                queryClient.setQueryData(["auth", "me"], user);
            }

            navigate("/register/account-created", {
                state: {
                    email: data?.company_admin?.email || "",
                    companyName: data?.company?.name || "",
                    companyId: data?.company?.id || null,
                },
            });
        },

        onError: (error) => {
            console.error(
                "OTP verification failed:",
                error?.response?.data?.message || error.message
            );
        },
    });
};

const companyResendOtpApi = async ({ email, company_id }) => {
    const response = await api.post("/auth/company/resend-otp", {
        email,
        company_id,
    });
    return response.data;
};

export const useCompanyResendOtp = () => {
    return useMutation({
        mutationFn: companyResendOtpApi,

        onError: (error) => {
            console.error(
                "Resend OTP failed:",
                error?.response?.data?.message || error.message
            );
        },
    });
};

const customerVerifyOtpApi = async ({ email, otp }) => {
    const response = await api.post("/auth/customer/verify-otp", {
        email,
        otp,
    });
    return response.data;
};

export const useCustomerVerifyOtp = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: customerVerifyOtpApi,

        onSuccess: (response) => {
            const { data } = response;

            if (data?.token) {
                localStorage.setItem("token", data.token);
            }

            const user = data?.customer || null;
            if (user) {
                localStorage.setItem("user", JSON.stringify(user));
                queryClient.setQueryData(["auth", "me"], user);
            }

            navigate("/register/customer/account-created", {
                state: {
                    email: data?.customer?.email || "",
                },
            });
        },

        onError: (error) => {
            console.error(
                "Customer OTP verification failed:",
                error?.response?.data?.message || error.message
            );
        },
    });
};

const customerResendOtpApi = async ({ email }) => {
    const response = await api.post("/auth/customer/resend-otp", {
        email,
    });
    return response.data;
};

export const useCustomerResendOtp = () => {
    return useMutation({
        mutationFn: customerResendOtpApi,

        onError: (error) => {
            console.error(
                "Customer resend OTP failed:",
                error?.response?.data?.message || error.message
            );
        },
    });
};

const forgotPasswordApi = async ({ email }) => {
    const response = await api.post("/auth/forget-password", { email });
    return response.data;
};

export const useForgotPassword = () => {
    return useMutation({
        mutationFn: forgotPasswordApi,

        onError: (error) => {
            console.error(
                "Forgot password failed:",
                error?.response?.data?.message || error.message
            );
        },
    });
};

const resetPasswordApi = async ({ email, otp, password, passwordConfirmation }) => {
    const response = await api.post("/auth/reset-password", {
        email,
        otp,
        password,
        password_confirmation: passwordConfirmation,
    });
    return response.data;
};

export const useResetPassword = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: resetPasswordApi,

        onSuccess: (response) => {
            navigate("/login", {
                state: {
                    message:
                        response?.message ||
                        "Password reset successful. Please log in with your new password.",
                },
            });
        },

        onError: (error) => {
            console.error(
                "Reset password failed:",
                error?.response?.data?.message || error.message
            );
        },
    });
};

const logoutApi = async () => {
    const response = await api.post("/auth/logout");
    return response.data;
};

export const useServerLogout = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: logoutApi,

        onSettled: () => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            queryClient.clear();
            navigate("/login");
        },
    });
};