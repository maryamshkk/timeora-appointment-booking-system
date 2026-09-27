import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../services/api";

const fetchCompanyProfile = async () => {
    const response = await api.get("/company/profile");
    return response.data;
};

export const useCompanyProfile = () => {
    return useQuery({
        queryKey: ["company", "profile"],
        queryFn: fetchCompanyProfile,
        staleTime: 1000 * 60 * 5,
    });
};

const updateCompanyProfileApi = async (payload) => {
    const isFormData = payload instanceof FormData;

    const response = await api.post("/company/profile", payload, {
        headers: isFormData
            ? { "Content-Type": "multipart/form-data" }
            : { "Content-Type": "application/json" },
        params: isFormData ? { _method: "PUT" } : undefined,
    });

    return response.data;
};

export const useUpdateCompanyProfile = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateCompanyProfileApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["company", "profile"] });
        },
        onError: (error) => {
            console.error(
                "Update company profile failed:",
                error?.response?.data?.message || error.message
            );
        },
    });
};