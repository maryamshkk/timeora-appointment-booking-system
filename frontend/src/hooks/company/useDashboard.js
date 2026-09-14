import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";

const fetchCompanyDashboard = async ({ date, start, end } = {}) => {
    const params = {};

    if (date) params.date = date;
    if (start) params.start = start;
    if (end) params.end = end;

    const response = await api.get("/company/dashboard", { params });
    return response.data;
};

export const useCompanyDashboard = ({ date, start, end } = {}) => {
    return useQuery({
        queryKey: ["company", "dashboard", { date, start, end }],
        queryFn: () => fetchCompanyDashboard({ date, start, end }),
        staleTime: 1000 * 60 * 2,
    });
};