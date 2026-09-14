import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const fetchStaffList = async () => {
    const response = await api.get("/company/staff");
    return response.data;
};

const fetchStaffMember = async (id) => {
    const response = await api.get(`/company/staff/${id}`);
    return response.data;
};

export const useStaff = () => {
    return useQuery({
        queryKey: ["company", "staff", "list"],
        queryFn: fetchStaffList,
        staleTime: 1000 * 60,
    });
};

export const useStaffMember = (id) => {
    return useQuery({
        queryKey: ["company", "staff", "detail", id],
        queryFn: () => fetchStaffMember(id),
        enabled: Boolean(id),
        staleTime: 1000 * 60,
    });
};

const invalidateStaff = (queryClient) => {
    queryClient.invalidateQueries({ queryKey: ["company", "staff"] });
};

const createStaffApi = async (formData) => {
    const response = await api.post("/company/staff", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
};

export const useCreateStaff = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: createStaffApi,
        onSuccess: (response) => {
            invalidateStaff(queryClient);
            const newId = response?.data?.id;
            if (newId) {
                navigate(`/company/staff/${newId}`);
            } else {
                navigate("/company/staff");
            }
        },
        onError: (error) => {
            console.error(
                "Create staff failed:",
                error?.response?.data?.message || error.message
            );
        },
    });
};

const updateStaffApi = async ({ id, formData }) => {
    // Use POST with _method=PUT so multipart file uploads work
    formData.append("_method", "PUT");

    const response = await api.post(`/company/staff/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
};

export const useUpdateStaff = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: updateStaffApi,
        onSuccess: (response, variables) => {
            invalidateStaff(queryClient);
            queryClient.invalidateQueries({
                queryKey: ["company", "staff", "detail", variables.id],
            });
            navigate(`/company/staff/${variables.id}`);
        },
        onError: (error) => {
            console.error(
                "Update staff failed:",
                error?.response?.data?.message || error.message
            );
        },
    });
};

const deleteStaffApi = async (id) => {
    const response = await api.delete(`/company/staff/${id}`);
    return response.data;
};

export const useDeleteStaff = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteStaffApi,
        onSuccess: () => invalidateStaff(queryClient),
        onError: (error) => {
            console.error(
                "Delete staff failed:",
                error?.response?.data?.message || error.message
            );
        },
    });
};

const restoreStaffApi = async (id) => {
    const response = await api.put(`/company/staff/${id}/restore`);
    return response.data;
};

export const useRestoreStaff = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: restoreStaffApi,
        onSuccess: () => invalidateStaff(queryClient),
        onError: (error) => {
            console.error(
                "Restore staff failed:",
                error?.response?.data?.message || error.message
            );
        },
    });
};

const inviteStaffApi = async (staffId) => {
    const response = await api.post("/company/staff/invite", {
        staff_id: staffId,
    });
    return response.data;
};

export const useInviteStaff = () => {
    return useMutation({
        mutationFn: inviteStaffApi,
        onError: (error) => {
            console.error(
                "Invite staff failed:",
                error?.response?.data?.message || error.message
            );
        },
    });
};