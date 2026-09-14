import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const fetchServicesList = async () => {
    const response = await api.get("/company/services");
    return response.data;
};

const fetchService = async (id) => {
    const response = await api.get(`/company/services/${id}`);
    return response.data;
};

export const useServices = () => {
    return useQuery({
        queryKey: ["company", "services", "list"],
        queryFn: fetchServicesList,
        staleTime: 1000 * 60 * 5,
    });
};

export const useService = (id) => {
    return useQuery({
        queryKey: ["company", "services", "detail", id],
        queryFn: () => fetchService(id),
        enabled: Boolean(id),
        staleTime: 1000 * 60 * 5,
    });
};

const invalidateServices = (queryClient) => {
    queryClient.invalidateQueries({ queryKey: ["company", "services"] });
};

const createServiceApi = async (payload) => {
    const response = await api.post("/company/services", payload);
    return response.data;
};

export const useCreateService = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: createServiceApi,
        onSuccess: () => {
            invalidateServices(queryClient);
            navigate("/company/services");
        },
        onError: (error) => {
            console.error(
                "Create service failed:",
                error?.response?.data?.message || error.message
            );
        },
    });
};

const updateServiceApi = async ({ id, payload }) => {
    const response = await api.put(`/company/services/${id}`, payload);
    return response.data;
};

export const useUpdateService = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateServiceApi,
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({
                queryKey: ["company", "services", "detail", variables.id],
            });
            invalidateServices(queryClient);
        },
        onError: (error) => {
            console.error(
                "Update service failed:",
                error?.response?.data?.message || error.message
            );
        },
    });
};

const deleteServiceApi = async (id) => {
    const response = await api.delete(`/company/services/${id}`);
    return response.data;
};

export const useDeleteService = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteServiceApi,
        onSuccess: () => invalidateServices(queryClient),
        onError: (error) => {
            console.error(
                "Delete service failed:",
                error?.response?.data?.message || error.message
            );
        },
    });
};