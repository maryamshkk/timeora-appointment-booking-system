import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../services/api";

const fetchNotificationPreferences = async () => {
    const response = await api.get("/company/settings");
    return response.data;
};

export const useNotificationPreferences = () => {
    return useQuery({
        queryKey: ["company", "notification-preferences"],
        queryFn: fetchNotificationPreferences,
        staleTime: 1000 * 60 * 5,
    });
};

const updateNotificationPreferencesApi = async (notificationPreferences) => {
    const response = await api.put("/company/settings", {
        notification_preferences: notificationPreferences,
    });
    return response.data;
};

export const useUpdateNotificationPreferences = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateNotificationPreferencesApi,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["company", "notification-preferences"],
            });
            queryClient.invalidateQueries({
                queryKey: ["company", "settings"],
            });
        },
        onError: (error) => {
            console.error(
                "Update notification preferences failed:",
                error?.response?.data?.message || error.message
            );
        },
    });
};