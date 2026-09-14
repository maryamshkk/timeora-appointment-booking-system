import { useQuery } from "@tanstack/react-query";
import api from "../../services/api";

const buildParams = ({ from, to }) => {
    const params = {};
    if (from) params.from = from;
    if (to) params.to = to;
    return params;
};

const fetchOverview = async ({ from, to }) => {
    const response = await api.get("/company/reports/overview", {
        params: buildParams({ from, to }),
    });
    return response.data;
};

const fetchBookings = async ({ from, to }) => {
    const response = await api.get("/company/reports/bookings", {
        params: buildParams({ from, to }),
    });
    return response.data;
};

const fetchCustomers = async ({ from, to }) => {
    const response = await api.get("/company/reports/customers", {
        params: buildParams({ from, to }),
    });
    return response.data;
};

const fetchStaff = async ({ from, to }) => {
    const response = await api.get("/company/reports/staff", {
        params: buildParams({ from, to }),
    });
    return response.data;
};

const fetchPayments = async ({ from, to }) => {
    const response = await api.get("/company/reports/payments", {
        params: buildParams({ from, to }),
    });
    return response.data;
};

export const useReportOverview = ({ from, to } = {}) => {
    return useQuery({
        queryKey: ["company", "reports", "overview", { from, to }],
        queryFn: () => fetchOverview({ from, to }),
        staleTime: 1000 * 60 * 2,
    });
};

export const useBookingReport = ({ from, to } = {}) => {
    return useQuery({
        queryKey: ["company", "reports", "bookings", { from, to }],
        queryFn: () => fetchBookings({ from, to }),
        staleTime: 1000 * 60 * 2,
    });
};

export const useCustomerReport = ({ from, to } = {}) => {
    return useQuery({
        queryKey: ["company", "reports", "customers", { from, to }],
        queryFn: () => fetchCustomers({ from, to }),
        staleTime: 1000 * 60 * 2,
    });
};

export const useStaffReport = ({ from, to } = {}) => {
    return useQuery({
        queryKey: ["company", "reports", "staff", { from, to }],
        queryFn: () => fetchStaff({ from, to }),
        staleTime: 1000 * 60 * 2,
    });
};

export const usePaymentReport = ({ from, to } = {}) => {
    return useQuery({
        queryKey: ["company", "reports", "payments", { from, to }],
        queryFn: () => fetchPayments({ from, to }),
        staleTime: 1000 * 60 * 2,
    });
};