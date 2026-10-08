<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\RoleController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\StaffController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\CompanyWorkingHoursController;
use App\Http\Controllers\StaffAvailabilityController;
use App\Http\Controllers\HolidayController;
use App\Http\Controllers\BlockedTimeController;
use App\Http\Controllers\AvailabilityExceptionController;
use App\Http\Controllers\AvailabilityController;
use App\Http\Controllers\Customer\AppointmentController;
use App\Http\Controllers\Company\AppointmentController as CompanyAppointmentController;
use App\Http\Controllers\Staff\AppointmentController as StaffAppointmentController;
use App\Http\Controllers\ReceiptController;
use App\Http\Controllers\CompanyDashboardController;
use App\Http\Controllers\StaffDashboardController;
use App\Http\Controllers\CustomerDashboardController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\CompanySettingsController;
use App\Http\Controllers\StaffSettingsController;
use App\Http\Controllers\CustomerSettingsController;
use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminCompanyController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Http\Controllers\Admin\AdminAppointmentController;
use App\Http\Controllers\Admin\AdminReceiptController;
use App\Http\Controllers\Admin\AdminCategoryController;
use App\Http\Controllers\Admin\AdminAnnouncementController;
use App\Http\Controllers\Company\CompanyReportController;
use App\Http\Controllers\Admin\AdminReportController;
use App\Http\Controllers\Admin\AdminProfileController;
use App\Http\Controllers\Admin\AdminSettingsController;

/*
|--------------------------------------------------------------------------
| User endpoint (any authenticated user)
|--------------------------------------------------------------------------
*/
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

/*
|--------------------------------------------------------------------------
| PUBLIC — Staff Invitation (NO auth middleware)
| These MUST be public because staff has no token yet.
|--------------------------------------------------------------------------
*/
Route::prefix('staff')->group(function () {
    Route::get('/verify-invitation', [StaffController::class, 'verifyInvitation']);
    Route::post('/accept-invitation', [StaffController::class, 'acceptInvitation']);
});

/*
|--------------------------------------------------------------------------
| PUBLIC — Auth routes
|--------------------------------------------------------------------------
*/
Route::post('/auth/company/register', [AuthController::class, 'companyRegister']);
Route::post('/auth/company/verify-otp', [AuthController::class, 'companyVerifyOtp']);
Route::post('/auth/company/resend-otp', [AuthController::class, 'companyResendOtp']);

Route::post('/auth/customer/register', [AuthController::class, 'customerRegister']);
Route::post('/auth/customer/verify-otp', [AuthController::class, 'customerVerifyOtp']);
Route::post('/auth/customer/resend-otp', [AuthController::class, 'customerResendOtp']);

Route::post('/auth/login', [AuthController::class, 'login']);

Route::post('/auth/forget-password', [AuthController::class, 'forgetPassword']);
Route::post('/auth/reset-password', [AuthController::class, 'resetPassword']);

/*
|--------------------------------------------------------------------------
| AUTHENTICATED — Common (any logged-in user)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/profile', [AuthController::class, 'profile']);
});

/*
|--------------------------------------------------------------------------
| SUPER ADMIN
|--------------------------------------------------------------------------
*/
Route::middleware(['auth:sanctum', 'super_admin'])->group(function () {
    Route::get('/admin/profile', [AdminProfileController::class, 'show']);
    Route::put('/admin/profile', [AdminProfileController::class, 'update']);
    Route::put('/admin/profile/password', [AdminProfileController::class, 'updatePassword']);

    Route::get('/admin/dashboard', [AdminDashboardController::class, 'index']);

    Route::get('/admin/companies', [AdminCompanyController::class, 'index']);
    Route::get('/admin/companies/{id}', [AdminCompanyController::class, 'show']);

    Route::get('/admin/users', [AdminUserController::class, 'index']);
    Route::get('/admin/users/{id}', [AdminUserController::class, 'show']);

    Route::get('/admin/appointments', [AdminAppointmentController::class, 'index']);
    Route::get('/admin/appointments/{id}', [AdminAppointmentController::class, 'show']);

    Route::get('/admin/receipts', [AdminReceiptController::class, 'index']);
    Route::get('/admin/receipts/{id}', [AdminReceiptController::class, 'show']);
    Route::get('/admin/receipts/{id}/pdf', [AdminReceiptController::class, 'pdf']);

    Route::get('/admin/categories', [AdminCategoryController::class, 'index']);
    Route::post('/admin/categories', [AdminCategoryController::class, 'store']);
    Route::get('/admin/categories/{id}', [AdminCategoryController::class, 'show']);
    Route::put('/admin/categories/{id}', [AdminCategoryController::class, 'update']);
    Route::delete('/admin/categories/{id}', [AdminCategoryController::class, 'destroy']);

    Route::get('/admin/announcements', [AdminAnnouncementController::class, 'index']);
    Route::post('/admin/announcements', [AdminAnnouncementController::class, 'store']);
    Route::get('/admin/announcements/{id}', [AdminAnnouncementController::class, 'show']);
    Route::put('/admin/announcements/{id}', [AdminAnnouncementController::class, 'update']);
    Route::delete('/admin/announcements/{id}', [AdminAnnouncementController::class, 'destroy']);

    Route::get('admin/settings', [AdminSettingsController::class, 'show']);
    Route::put('/admin/settings', [AdminSettingsController::class, 'update']);

    Route::get('/admin/reports/overview', [AdminReportController::class, 'overview']);
    Route::get('/admin/reports/companies', [AdminReportController::class, 'companies']);
    Route::get('/admin/reports/users', [AdminReportController::class, 'users']);
    Route::get('/admin/reports/appointments', [AdminReportController::class, 'appointments']);
    Route::get('/admin/reports/receipts', [AdminReportController::class, 'receipts']);
});

/*
|--------------------------------------------------------------------------
| COMPANY ADMIN
|--------------------------------------------------------------------------
*/
Route::middleware(['auth:sanctum', 'role:company_admin'])->group(function () {

    Route::get('/company/dashboard', [CompanyDashboardController::class, 'index']);

    Route::get('/company/profile', [CompanyController::class, 'show']);
    Route::put('/company/profile', [CompanyController::class, 'update']);

    Route::get('/company/roles', [RoleController::class, 'index']);
    Route::post('/company/roles', [RoleController::class, 'store']);

    Route::get('/company/services', [ServiceController::class, 'index']);
    Route::post('/company/services', [ServiceController::class, 'store']);
    Route::get('/company/services/{service}', [ServiceController::class, 'show']);
    Route::put('/company/services/{service}', [ServiceController::class, 'update']);
    Route::delete('/company/services/{service}', [ServiceController::class, 'destroy']);

    Route::get('company/staff', [StaffController::class, 'index']);
    Route::post('company/staff', [StaffController::class, 'store']);
    Route::get('company/staff/{id}', [StaffController::class, 'show']);
    Route::put('company/staff/{id}', [StaffController::class, 'update']);
    Route::put('company/staff/{id}/restore', [StaffController::class, 'restore']);
    Route::delete('company/staff/{id}', [StaffController::class, 'destroy']);

    Route::post('/company/staff/invite', [StaffController::class, 'invite']);

    Route::get('/company/working-hours', [CompanyWorkingHoursController::class, 'index']);
    Route::put('/company/working-hours', [CompanyWorkingHoursController::class, 'update']);

    Route::get('/company/staff/{staffId}/availability', [StaffAvailabilityController::class, 'index']);
    Route::post('/company/staff/{staffId}/availability', [StaffAvailabilityController::class, 'store']);
    Route::put('/company/staff/{staffId}/availability/{availabilityId}', [StaffAvailabilityController::class, 'update']);
    Route::put('/company/staff/{staffId}/availability', [StaffAvailabilityController::class, 'updateAll']);
    Route::delete('/company/staff/{staffId}/availability/{availabilityId}', [StaffAvailabilityController::class, 'destroy']);

    Route::get('company/holidays', [HolidayController::class, 'index']);
    Route::post('company/holidays', [HolidayController::class, 'store']);
    Route::put('company/holidays/{holidayId}', [HolidayController::class, 'update']);
    Route::delete('company/holidays/{holidayId}', [HolidayController::class, 'destroy']);

    Route::get('/staff/{staffId}/blocked-times', [BlockedTimeController::class, 'index']);
    Route::post('/staff/{staffId}/blocked-times', [BlockedTimeController::class, 'store']);
    Route::put('/staff/{staffId}/blocked-times/{blockedTimeId}', [BlockedTimeController::class, 'update']);
    Route::delete('/staff/{staffId}/blocked-times/{blockedTimeId}', [BlockedTimeController::class, 'destroy']);

    Route::get('/company/customers', [CompanyAppointmentController::class, 'customers']);
    Route::post('/company/appointments', [CompanyAppointmentController::class, 'store']);


    Route::get('/availability', [AvailabilityController::class, 'index']);

    Route::get("/company/appointments/upcoming", [CompanyAppointmentController::class, 'upcoming']);
    Route::get("/company/appointments", [CompanyAppointmentController::class, 'index']);
    Route::get("/company/appointments/{id}", [CompanyAppointmentController::class, 'show']);
    Route::put("/company/appointments/{id}/accept", [CompanyAppointmentController::class, 'accept']);
    Route::put("/company/appointments/{id}/reject", [CompanyAppointmentController::class, 'reject']);
    Route::put("/company/appointments/{id}/cancel", [CompanyAppointmentController::class, 'cancel']);
    Route::put('company/appointments/{id}/reschedule', [CompanyAppointmentController::class, 'reschedule']);

    Route::get('/company/calendar', [CompanyAppointmentController::class, 'calendar']);

    Route::get('/company/settings', [CompanySettingsController::class, 'show']);
    Route::put('/company/settings', [CompanySettingsController::class, 'update']);

    Route::get('/company/reports/overview', [CompanyReportController::class, 'overview']);
    Route::get('/company/reports/bookings', [CompanyReportController::class, 'bookings']);
    Route::get('/company/reports/customers', [CompanyReportController::class, 'customers']);
    Route::get('/company/reports/staff', [CompanyReportController::class, 'staff']);
    Route::get('/company/reports/payments', [CompanyReportController::class, 'payments']);
    Route::get('/company/reports/appointments', [CompanyReportController::class, 'appointments']);
    Route::get('/company/reports/services', [CompanyReportController::class, 'services']);
});

/*
|--------------------------------------------------------------------------
| STAFF (auth:staff guard)
|--------------------------------------------------------------------------
*/
Route::middleware('auth:staff')->prefix('staff')->group(function () {
    Route::get('/dashboard', [StaffDashboardController::class, 'index']);

    Route::get('/appointments/upcoming', [StaffAppointmentController::class, 'upcoming']);
    Route::get('/appointments', [StaffAppointmentController::class, 'index']);
    Route::get('/appointments/{id}', [StaffAppointmentController::class, 'show']);
    Route::put('/appointments/{id}/accept', [StaffAppointmentController::class, 'accept']);
    Route::put('/appointments/{id}/reject', [StaffAppointmentController::class, 'reject']);
    Route::put('/appointments/{id}/reschedule', [StaffAppointmentController::class, 'reschedule']);
    Route::put('/appointments/{id}/cancel', [StaffAppointmentController::class, 'cancel']);
    Route::put('/appointments/{id}/complete', [StaffAppointmentController::class, 'complete']);

    Route::get('/calendar', [StaffAppointmentController::class, 'calendar']);

    Route::get('/settings', [StaffSettingsController::class, 'show']);
    Route::put('/settings', [StaffSettingsController::class, 'update']);
});

/*
|--------------------------------------------------------------------------
| CUSTOMER
|--------------------------------------------------------------------------
*/
Route::middleware(['auth:sanctum', 'role:customer'])->group(function () {
    Route::get('/customer/dashboard', [CustomerDashboardController::class, 'index']);

    Route::get('/customer/appointments/upcoming', [AppointmentController::class, 'upcoming']);
    Route::post('/customer/appointments', [AppointmentController::class, 'store']);
    Route::get('/customer/appointments', [AppointmentController::class, 'index']);
    Route::get('/customer/appointments/{id}', [AppointmentController::class, 'singleShow']);
    Route::put('/customer/appointments/{id}', [AppointmentController::class, 'cancel']);
    Route::put('/customer/appointments/{id}/reschedule', [AppointmentController::class, 'reschedule']);

    Route::get('customer/calendar', [AppointmentController::class, 'calendar']);

    Route::get('/customer/settings', [CustomerSettingsController::class, 'show']);
    Route::put('/customer/settings', [CustomerSettingsController::class, 'update']);
});

/*
|--------------------------------------------------------------------------
| PAYMENTS
|--------------------------------------------------------------------------
*/
Route::middleware(['auth:sanctum', 'role:company_admin,staff'])->group(function () {
    Route::get('/appointments/{id}/payment', [AppointmentController::class, 'payment']);
    Route::put('/appointments/{id}/payment/mark-paid', [AppointmentController::class, 'markPaymentPaid']);
});

/*
|--------------------------------------------------------------------------
| RECEIPTS
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/receipts', [ReceiptController::class, 'index']);
    Route::get('/receipts/{id}', [ReceiptController::class, 'show']);
    Route::get('/receipts/{id}/pdf', [ReceiptController::class, 'pdf']);
});

/*
|--------------------------------------------------------------------------
| NOTIFICATIONS
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/company/notifications', [NotificationController::class, 'index']);
    Route::put('/company/notifications/read-all', [NotificationController::class, 'markAllAsRead']);
    Route::put('/company/notifications/{id}/read', [NotificationController::class, 'markAsRead']);

    Route::get('/staff/notifications', [NotificationController::class, 'index']);
    Route::put('/staff/notifications/read-all', [NotificationController::class, 'markAllAsRead']);
    Route::put('/staff/notifications/{id}/read', [NotificationController::class, 'markAsRead']);

    Route::get('/customer/notifications', [NotificationController::class, 'index']);
    Route::put('/customer/notifications/read-all', [NotificationController::class, 'markAllAsRead']);
    Route::put('/customer/notifications/{id}/read', [NotificationController::class, 'markAsRead']);
});