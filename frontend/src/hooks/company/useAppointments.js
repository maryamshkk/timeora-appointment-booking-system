import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../services/api";

const fetchAppointments = async () => {
    const response = await api.get("/company/appointments");
    return response.data;
};

const fetchUpcomingAppointments = async ({ limit } = {}) => {
    const params = {};
    if (limit) params.limit = limit;

    const response = await api.get("/company/appointments/upcoming", { params });
    return response.data;
};

const fetchAppointment = async (id) => {
    const response = await api.get(`/company/appointments/${id}`);
    return response.data;
};

const fetchCalendar = async ({ start, end }) => {
    const response = await api.get("/company/calendar", {
        params: { start, end },
    });
    return response.data;
};

export const useAppointments = () => {
    return useQuery({
        queryKey: ["company", "appointments", "list"],
        queryFn: fetchAppointments,
        staleTime: 1000 * 60,
    });
};

export const useUpcomingAppointments = ({ limit } = {}) => {
    return useQuery({
        queryKey: ["company", "appointments", "upcoming", { limit }],
        queryFn: () => fetchUpcomingAppointments({ limit }),
        staleTime: 1000 * 60,
    });
};

export const useAppointment = (id) => {
    return useQuery({
        queryKey: ["company", "appointments", "detail", id],
        queryFn: () => fetchAppointment(id),
        enabled: Boolean(id),
        staleTime: 1000 * 60,
    });
};

export const useCompanyCalendar = ({ start, end }) => {
    return useQuery({
        queryKey: ["company", "appointments", "calendar", { start, end }],
        queryFn: () => fetchCalendar({ start, end }),
        enabled: Boolean(start && end),
        staleTime: 1000 * 60,
    });
};

const invalidateAppointments = (queryClient) => {
    queryClient.invalidateQueries({ queryKey: ["company", "appointments"] });
    queryClient.invalidateQueries({ queryKey: ["company", "dashboard"] });
};

const acceptAppointmentApi = async (id) => {
    const response = await api.put(`/company/appointments/${id}/accept`);
    return response.data;
};

export const useAcceptAppointment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: acceptAppointmentApi,
        onSuccess: () => invalidateAppointments(queryClient),
        onError: (error) => {
            console.error(
                "Accept appointment failed:",
                error?.response?.data?.message || error.message
            );
        },
    });
};

const rejectAppointmentApi = async (id) => {
    const response = await api.put(`/company/appointments/${id}/reject`);
    return response.data;
};

export const useRejectAppointment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: rejectAppointmentApi,
        onSuccess: () => invalidateAppointments(queryClient),
        onError: (error) => {
            console.error(
                "Reject appointment failed:",
                error?.response?.data?.message || error.message
            );
        },
    });
};

const cancelAppointmentApi = async (id) => {
    const response = await api.put(`/company/appointments/${id}/cancel`);
    return response.data;
};

export const useCancelAppointment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: cancelAppointmentApi,
        onSuccess: () => invalidateAppointments(queryClient),
        onError: (error) => {
            console.error(
                "Cancel appointment failed:",
                error?.response?.data?.message || error.message
            );
        },
    });
};

const rescheduleAppointmentApi = async ({ id, appointmentDate, startTime }) => {
    const response = await api.put(`/company/appointments/${id}/reschedule`, {
        appointment_date: appointmentDate,
        start_time: startTime,
    });
    return response.data;
};

export const useRescheduleAppointment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: rescheduleAppointmentApi,
        onSuccess: () => invalidateAppointments(queryClient),
        onError: (error) => {
            console.error(
                "Reschedule appointment failed:",
                error?.response?.data?.message || error.message
            );
        },
    });
};