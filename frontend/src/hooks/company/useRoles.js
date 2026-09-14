import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../services/api";

const fetchRoles = async () => {
    const response = await api.get("/company/roles");
    return response.data;
};

export const useRoles = () => {
    return useQuery({
        queryKey: ["company", "roles", "list"],
        queryFn: fetchRoles,
        staleTime: 1000 * 60 * 10,
    });
};

const createRoleApi = async (name) => {
    const response = await api.post("/company/roles", { name });
    return response.data;
};

export const useCreateRole = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createRoleApi,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["company", "roles"],
            });
        },
        onError: (error) => {
            console.error(
                "Create role failed:",
                error?.response?.data?.message || error.message
            );
        },
    });
};