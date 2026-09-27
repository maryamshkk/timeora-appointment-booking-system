import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../services/api";

const fetchWorkingHours = async () => {
    const response = await api.get("/company/working-hours");
    return response.data;
};

export const useCompanyWorkingHours = () => {
    return useQuery({
        queryKey: ["company", "working-hours"],
        queryFn: fetchWorkingHours,
        staleTime: 1000 * 60 * 5,
    });
};

const updateWorkingHoursApi = async (workingHours) => {
    const payload = {
        working_hours: workingHours.map((day) => ({
            day_of_week: day.day_of_week,
            is_open: Boolean(day.is_open),
            opening_time: day.is_open ? day.opening_time || null : null,
            closing_time: day.is_open ? day.closing_time || null : null,
        })),
    };

    const response = await api.put("/company/working-hours", payload);
    return response.data;
};

export const useUpdateWorkingHours = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateWorkingHoursApi,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["company", "working-hours"],
            });
        },
        onError: (error) => {
            console.error(
                "Update working hours failed:",
                error?.response?.data?.message || error.message
            );
        },
    });
};