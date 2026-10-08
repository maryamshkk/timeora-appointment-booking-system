import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";

const fetchStaffDashboard = async () => {
    const response = await api.get("/staff/dashboard");
    return response.data;
};

export const useStaffDashboard = () => {
    return useQuery({
        queryKey: ["staff", "dashboard"],
        queryFn: fetchStaffDashboard,
        staleTime: 1000 * 60,
    });
};