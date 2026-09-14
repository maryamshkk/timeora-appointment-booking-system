import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../services/api";

const fetchStaffAvailability = async (staffId) => {
    const response = await api.get(`/company/staff/${staffId}/availability`);
    return response.data;
};

export const useStaffAvailability = (staffId) => {
    return useQuery({
        queryKey: ["company", "staff", staffId, "availability"],
        queryFn: () => fetchStaffAvailability(staffId),
        enabled: Boolean(staffId),
        staleTime: 1000 * 60,
    });
};

const invalidateAvailability = (queryClient, staffId) => {
    queryClient.invalidateQueries({
        queryKey: ["company", "staff", staffId, "availability"],
    });
    queryClient.invalidateQueries({
        queryKey: ["company", "staff", "detail", staffId],
    });
};

const saveAvailabilityApi = async ({ staffId, availability }) => {
    const response = await api.post(
        `/company/staff/${staffId}/availability`,
        { availability }
    );
    return response.data;
};

export const useSaveAvailability = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: saveAvailabilityApi,
        onSuccess: (_, variables) =>
            invalidateAvailability(queryClient, variables.staffId),
        onError: (error) => {
            console.error(
                "Save availability failed:",
                error?.response?.data?.message || error.message
            );
        },
    });
};

const updateAvailabilityAllApi = async ({ staffId, availability }) => {
    const response = await api.put(
        `/company/staff/${staffId}/availability`,
        { availability }
    );
    return response.data;
};

export const useUpdateAvailabilityAll = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateAvailabilityAllApi,
        onSuccess: (_, variables) =>
            invalidateAvailability(queryClient, variables.staffId),
        onError: (error) => {
            console.error(
                "Update availability failed:",
                error?.response?.data?.message || error.message
            );
        },
    });
};

const updateSingleAvailabilityApi = async ({
    staffId,
    availabilityId,
    availability,
}) => {
    const response = await api.put(
        `/company/staff/${staffId}/availability/${availabilityId}`,
        availability
    );
    return response.data;
};

export const useUpdateSingleAvailability = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateSingleAvailabilityApi,
        onSuccess: (_, variables) =>
            invalidateAvailability(queryClient, variables.staffId),
        onError: (error) => {
            console.error(
                "Update availability failed:",
                error?.response?.data?.message || error.message
            );
        },
    });
};

const deleteAvailabilityApi = async ({ staffId, availabilityId }) => {
    const response = await api.delete(
        `/company/staff/${staffId}/availability/${availabilityId}`
    );
    return response.data;
};

export const useDeleteAvailability = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteAvailabilityApi,
        onSuccess: (_, variables) =>
            invalidateAvailability(queryClient, variables.staffId),
        onError: (error) => {
            console.error(
                "Delete availability failed:",
                error?.response?.data?.message || error.message
            );
        },
    });
};