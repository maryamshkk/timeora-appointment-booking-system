import { Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "../pages/LandingPage";

import RoleSelectionPage from "../pages/auth/RoleSelectionPage";
import CompanyRegistration from "../pages/auth/CompanyRegister";
import CustomerRegistration from "../pages/auth/CustomerRegister";
import VerifyOtp from "../pages/auth/VerifyOtp";
import AccountCreated from "../pages/auth/AccountCreated";
import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

// Legal
import PrivacyPolicy from "../pages/legal/PrivacyPolicy";
import TermsOfService from "../pages/legal/TermsOfService";
import CookiePolicy from "../pages/legal/CookiePolicy";

// Company
import CompanyDashboard from "../pages/dashboard/CompanyDashboard";

import AppointmentManagement from "../pages/appointments/AppointmentManagement";
import AppointmentDetails from "../pages/appointments/AppointmentDetails";
import CreateAppointment from "../pages/appointments/CreateAppointment";
import RescheduleAppointment from "../pages/appointments/RescheduleAppointment";
import PaymentCashOnReception from "../pages/appointments/PaymentCasOnReception";
import PaymentReceipt from "../pages/appointments/PaymentReceipt";

import CalenderSchedule from "../pages/calendar/CalendarSchedule";

import StaffManagement from "../pages/staff/StaffManagement";
import AddStaff from "../pages/staff/AddStaff";
import StaffDetails from "../pages/staff/StaffDetails";
import EditStaff from "../pages/staff/EditStaff";

import ServicesManagement from "../pages/services/ServicesManagement";
import AddService from "../pages/services/AddService";

import CustomerManagement from "../pages/customers/CustomerManagement";
import AddCustomer from "../pages/customers/AddCustomers";
import CustomerDetails from "../pages/customers/CustomerDetails";

import AvailabilityManagement from "../pages/availability/AvailabilityManagement";

import Notifications from "../pages/notifications/Notifications";

import Reports from "../pages/reports/Reports";
import AppointmentReport from "../pages/reports/AppointmentReport";
import StaffReport from "../pages/reports/StaffReport";
import ServiceReport from "../pages/reports/ServiceReport";
import CustomerReport from "../pages/reports/CustomerReport";

import HelpCenter from "../pages/help/HelpCenter";

import CompanySettings from "../pages/settings/CompanySettings";
import CompanyProfile from "../pages/settings/CompanyProfile";
import BookingSettings from "../pages/settings/BookingSettings";
import BusinessHours from "../pages/settings/BusinessHours";
import NotificationSettings from "../pages/settings/NotificationSettings";

// Staff Portal
import StaffDashboard from "../pages/staff/StaffDashboard";

import StaffCalendar from "../pages/staff/StaffCalendar";

import StaffAppointments from "../pages/staff/StaffAppointments";
import StaffAppointmentDetails from "../pages/staff/StaffAppointmentDetails";
import StaffRescheduleAppointment from "../pages/staff/StaffRescheduleAppointment";

import StaffCustomers from "../pages/staff/StaffCustomers";
import StaffCustomerDetails from "../pages/staff/StaffCustomerDetails";
import StaffEditCustomer from "../pages/staff/StaffEditCustomer";

import StaffAvailability from "../pages/staff/StaffAvailability";

import StaffReports from "../pages/staff/StaffReports";

import StaffNotifications from "../pages/staff/StaffNotifications";
import StaffSettings from "../pages/staff/StaffSettings";


// customer Dashboard
import CustomerDashboard from "../pages/customers/CustomerDashboard";

import BrowseCompanies from "../pages/customers/BrowseCompanies";

import CustomerCompanyProfile from "../pages/customers/CompanyProfile";

import ChooseService from "../pages/booking/ChooseService";

import ChooseStaff from "../pages/booking/ChooseStaff";

import ChooseDateTime from "../pages/booking/ChooseDateTime";

import ReviewAppointment from "../pages/booking/ReviewAppointment";

import BookingConfirmation from "../pages/booking/BookingConfirmation";

import MyAppointments from "../pages/customers/MyAppointments";
import CustomerAppointmentDetails from "../pages/customers/CustomerAppointmentDetails";
import CustomerRescheduleAppointment from "../pages/customers/RescheduleAppointment";
import CancelAppointment from "../pages/customers/CancelAppointment";
import CustomerPaymentReceipt from "../pages/customers/PaymentReceipt";
import CustomerProfile from "../pages/customers/MyProfile";
import CustomerSettings from "../pages/customers/CustomerSettings";
import CustomerNotifications from "../pages/customers/CustomerNotifications";


// super admin section
import SuperAdminDashboard from "../pages/superadmin/SuperAdminDashboard";
import Companies from "../pages/superadmin/Companies";
import CompanyDetails from "../pages/superadmin/CompanyDetails";
import Customers from "../pages/superadmin/Customers";
import SuperAdminCustomerDetails from "../pages/superadmin/CustomerDetails";
import Staff from "../pages/superadmin/Staff";
import SuperAdminStaffDetails from "../pages/superadmin/StaffDetails";


function AppRoutes() {
    return (
        <Routes>
            {/* Landing page */}
            <Route path="/" element={<LandingPage />} />

            {/* Auth — role selection */}
            <Route path="/roleselection" element={<RoleSelectionPage />} />
            <Route path="/register" element={<RoleSelectionPage />} />

            {/* Company registration flow */}
            <Route path="/register/company" element={<CompanyRegistration />} />
            <Route
                path="/register/verify-otp"
                element={<VerifyOtp role="company" />}
            />
            <Route
                path="/register/account-created"
                element={<AccountCreated />}
            />

            {/* Customer registration flow */}
            <Route path="/register/customer" element={<CustomerRegistration />} />
            <Route
                path="/register/customer/verify"
                element={<VerifyOtp role="customer" />}
            />
            <Route
                path="/register/customer/account-created"
                element={<AccountCreated />}
            />

            {/* Auth — shared */}
            <Route path="/login" element={<Login />} />
            <Route path="/forget-password" element={<ForgotPassword />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />

            {/* Legal */}
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/cookies" element={<CookiePolicy />} />

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
            <Route
                path="/company/appointments/:paymentId/payment"
                element={<PaymentCashOnReception />}
            />
            <Route
                path="/company/appointments/:receiptId/receipt"
                element={<PaymentReceipt />}
            />

            {/* Company — Calendar */}
            <Route path="/company/calendar" element={<CalenderSchedule />} />

            {/* Company — Staff */}
            <Route path="/company/staff" element={<StaffManagement />} />
            <Route path="/company/staff/add" element={<AddStaff />} />
            <Route
                path="/company/staff/:staffId/availability"
                element={<AvailabilityManagement />}
            />
            <Route path="/company/staff/:staffId" element={<StaffDetails />} />
            <Route
                path="/company/staff/:staffId/edit"
                element={<EditStaff />}
            />

            {/* Company — Services */}
            <Route path="/company/services" element={<ServicesManagement />} />
            <Route path="/company/services/add" element={<AddService />} />

            {/* Company — Customers */}
            <Route path="/company/customers" element={<CustomerManagement />} />
            <Route path="/company/customers/new" element={<AddCustomer />} />
            <Route
                path="/company/customers/:customerId"
                element={<CustomerDetails />}
            />

            {/* Company — Availability */}
            <Route
                path="/company/availability"
                element={<AvailabilityManagement />}
            />

            {/* Company — Reports */}
            <Route path="/company/reports" element={<Reports />} />
            <Route
                path="/company/reports/appointments"
                element={<AppointmentReport />}
            />
            <Route path="/company/reports/staff" element={<StaffReport />} />
            <Route path="/company/reports/services" element={<ServiceReport />} />
            <Route
                path="/company/reports/customers"
                element={<CustomerReport />}
            />

            {/* Company — Notifications */}
            <Route path="/company/notifications" element={<Notifications />} />

            {/* Company — Help */}
            <Route path="/company/help" element={<HelpCenter />} />

            {/* Company — Settings */}
            <Route path="/company/settings" element={<CompanySettings />} />
            <Route
                path="/company/settings/profile"
                element={<CompanyProfile />}
            />
            <Route
                path="/company/settings/booking"
                element={<BookingSettings />}
            />
            <Route
                path="/company/settings/hours"
                element={<BusinessHours />}
            />
            <Route
                path="/company/settings/notifications"
                element={<NotificationSettings />}
            />

            {/* Staff Portal — Dashboard */}
            <Route path="/staff/dashboard" element={<StaffDashboard />} />

            {/* Staff Portal — Calendar */}
            <Route path="/staff/calendar" element={<StaffCalendar />} />

            {/* Staff Portal — Appointments */}
            <Route path="/staff/appointments" element={<StaffAppointments />} />
            <Route
                path="/staff/appointments/:appointmentId"
                element={<StaffAppointmentDetails />}
            />
            <Route
                path="/staff/appointments/:appointmentId/reschedule"
                element={<StaffRescheduleAppointment />}
            />

            {/* Staff Portal — Customers */}
            <Route path="/staff/customers" element={<StaffCustomers />} />
            <Route
                path="/staff/customers/:customerId"
                element={<StaffCustomerDetails />}
            />
            <Route
                path="/staff/customers/:customerId/edit"
                element={<StaffEditCustomer />}
            />

            {/* Staff Portal — Availability */}
            <Route path="/staff/availability" element={<StaffAvailability />} />

            {/* Staff Portal — Reports */}
            <Route path="/staff/reports" element={<StaffReports />} />

            {/* Staff Portal — Notifications */}
            <Route
                path="/staff/notifications"
                element={<StaffNotifications />}
            />

            {/* Staff Portal — Settings */}
            <Route path="/staff/settings" element={<StaffSettings />} />




            {/* Customer Dashbaord */}
            <Route
            path="/customer/dashboard"
            element={<CustomerDashboard />}
            />

            {/* browse companies */}
            <Route
            path="/customer/browse"
            element={<BrowseCompanies />}
            />

            {/* choose company profile */}
            <Route path="/customer/companies/:id" 
            element={<CustomerCompanyProfile />} 
            />

            {/* choose service */}
            <Route
            path="/customer/booking/service"
            element={<ChooseService />}
            />

            {/* choose staff */}
            <Route
            path="/customer/booking/staff"
            element={<ChooseStaff />}
            />

             {/* date time */}
            <Route
            path="/customer/booking/datetime"
            element={<ChooseDateTime />}
            />  

            {/* review */}
            <Route
            path="/customer/booking/summary"
            element={<ReviewAppointment />}
            />
            {/* booking confirmation */}
            <Route
            path="/customer/booking/confirmation"
            element={<BookingConfirmation />}
            />
            {/* all appointments */}
            <Route
                path="/customer/appointments"
                element={<MyAppointments />}
            />
            {/* details */}
            <Route
                path="/customer/appointments/:id/detail"
                element={<CustomerAppointmentDetails />} 
                />
            {/* reschedule */}

            <Route
                path="/customer/appointments/:id/reschedule"
                element={<CustomerRescheduleAppointment />} 
                />
            {/* cancel appointment */}

            <Route
                path="/customer/appointments/:id/cancel"
                element={<CancelAppointment />}
            />
            {/* payment */}

            <Route
                path="/customer/receipts"
                element={<CustomerPaymentReceipt />}
            />
            {/* profile */}

            <Route
                path="/customer/profile"
                element={<CustomerProfile />}
            />
            {/* settings */}

            <Route
                path="/customer/settings"
                element={<CustomerSettings />}
            />
            {/* notifications */}
            <Route
                path="/customer/notifications"
                element={<CustomerNotifications />}
            />

            {/* Super Admin dashboard */}
            <Route path="/superadmin/dashboard" element={<SuperAdminDashboard />} />
            <Route path="/superadmin/companies" element={<Companies />} />
            <Route path="/superadmin/companies/:id" element={<CompanyDetails />} />
            <Route path="/superadmin/customers" element={<Customers />} />
            <Route path="/superadmin/customers/:id" element={<SuperAdminCustomerDetails />} />
            <Route path="/superadmin/staff" element={<Staff />} />
            <Route path="/superadmin/staff/:id" element={<SuperAdminStaffDetails />} />








            {/* Fallback */}
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
}

export default AppRoutes;