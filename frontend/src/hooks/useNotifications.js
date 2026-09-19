import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";

const createHooks = (role) => {
    const base = `/${role}/notifications`;
    const key = [role, "notifications"];

    const fetchList = async (page = 1) => {
        const res = await api.get(base, { params: { page } });
        return res.data;
    };

    const markReadApi = async (id) => {
        const res = await api.put(`${base}/${id}/read`);
        return res.data;
    };

    const markAllApi = async () => {
        const res = await api.put(`${base}/read-all`);
        return res.data;
    };

    return {
        useList: (page = 1) =>
            useQuery({
                queryKey: [...key, page],
                queryFn: () => fetchList(page),
                staleTime: 30000,
            }),

        useMarkRead: () => {
            const qc = useQueryClient();
            return useMutation({
                mutationFn: markReadApi,
                onSuccess: () => qc.invalidateQueries({ queryKey: key }),
            });
        },

        useMarkAll: () => {
            const qc = useQueryClient();
            return useMutation({
                mutationFn: markAllApi,
                onSuccess: () => qc.invalidateQueries({ queryKey: key }),
            });
        },
    };
};

// Company
const company = createHooks("company");
export const useCompanyNotifications = company.useList;
export const useCompanyMarkRead = company.useMarkRead;
export const useCompanyMarkAll = company.useMarkAll;

// Staff
const staff = createHooks("staff");
export const useStaffNotifications = staff.useList;
export const useStaffMarkRead = staff.useMarkRead;
export const useStaffMarkAll = staff.useMarkAll;

// Customer
const customer = createHooks("customer");
export const useCustomerNotifications = customer.useList;
export const useCustomerMarkRead = customer.useMarkRead;
export const useCustomerMarkAll = customer.useMarkAll;