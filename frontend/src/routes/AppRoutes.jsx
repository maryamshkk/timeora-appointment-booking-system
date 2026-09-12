import { BrowserRouter, Routes, Route } from "react-router-dom";

import RoleSelectionPage from "../pages/auth/RoleSelectionPage";
import CompanyRegistration from "../pages/auth/CompanyRegister";
import VerifyOtp from "../pages/auth/VerifyOtp";
import AccountCreated from "../pages/auth/AccountCreated";
import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

// Company
import CompanyDashboard from "../pages/dashboard/CompanyDashboard";

import AppointmentManagement from "../pages/appointments/AppointmentManagement";
import AppointmentDetails from "../pages/appointments/AppointmentDetails";
import CreateAppointment from "../pages/appointments/CreateAppointment";
import RescheduleAppointment from "../pages/appointments/RescheduleAppointment";
import PaymentCashOnReception from "../pages/appointments/PaymentCasOnReception";

import CalenderSchedule from "../pages/calendar/CalendarSchedule";

import StaffManagement from "../pages/staff/StaffManagement";
import AddStaff from "../pages/staff/AddStaff";
import StaffDetails from "../pages/staff/StaffDetails";

import ServicesManagement from "../pages/services/ServicesManagement";
import AddService from "../pages/services/AddService";

import CustomerManagement from "../pages/customers/CustomerManagement";
import AddCustomer from "../pages/customers/AddCustomers";
import CustomerDetails from "../pages/customers/CustomerDetails";

import AvailabilityManagement from "../pages/settings/AvailabilityManagement";


function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Auth */}
                <Route path="/" element={<RoleSelectionPage />} />
                <Route path="/register" element={<RoleSelectionPage />} />
                <Route path="/register/company" element={<CompanyRegistration />} />
                <Route path="/register/verify-otp" element={<VerifyOtp />} />
                <Route path="/register/account-created" element={<AccountCreated />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forget-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />

                {/* Company — Dashboard */}
                <Route path="/company/dashboard" element={<CompanyDashboard />} />

                {/* Company — Appointments */}
                <Route path="/company/appointments" element={<AppointmentManagement />} />
                <Route path="/company/appointments/new" element={<CreateAppointment />} />
                <Route
                    path="/company/appointments/:appointmentId/reschedule"
                    element={<RescheduleAppointment />}
                />
                <Route
                    path="/company/appointments/:appointmentId"
                    element={<AppointmentDetails />}
                />
                <Route path="/company/payment"  element={<PaymentCashOnReception />}/> 

                {/* Company — Calendar */}
                <Route path="/company/calendar" element={<CalenderSchedule />} />

                {/* Company — Staff (specific first, then generic) */}
                <Route path="/company/staff" element={<StaffManagement />} />
                <Route path="/company/staff/add" element={<AddStaff />} />
                <Route
                    path="/company/staff/:staffId/availability"
                    element={<AvailabilityManagement />}
                />
                <Route path="/company/staff/:staffId" element={<StaffDetails />} />

                {/* Company — Services */}
                <Route path="/company/services" element={<ServicesManagement />} />
                <Route path="/company/services/add" element={<AddService />} />

                {/* Company — Customers (specific first, then generic) */}
                <Route path="/company/customers" element={<CustomerManagement />} />
                <Route path="/company/customers/new" element={<AddCustomer />} />
                <Route
                    path="/company/customers/:customerId"
                    element={<CustomerDetails />}
                />

                {/* Company — Availability (main) */}
                <Route
                    path="/company/availability"
                    element={<AvailabilityManagement />}
                />

                {/* Fallback */}
                <Route path="*" element={<RoleSelectionPage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;