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