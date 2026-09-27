import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../services/api";

const fetchCompanySettings = async () => {
    const response = await api.get("/company/settings");
    return response.data;
};

export const useCompanySettings = () => {
    return useQuery({
        queryKey: ["company", "settings"],
        queryFn: fetchCompanySettings,
        staleTime: 1000 * 60 * 5,
    });
};

const updateCompanySettingsApi = async (payload) => {
    const response = await api.put("/company/settings", payload);
    return response.data;
};

export const useUpdateCompanySettings = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateCompanySettingsApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["company", "settings"] });
        },
        onError: (error) => {
            console.error(
                "Update company settings failed:",
                error?.response?.data?.message || error.message
            );
        },
    });
};