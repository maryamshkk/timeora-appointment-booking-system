
```
timeora-appointment-booking-system
├─ backend
│  ├─ .editorconfig
│  ├─ .npmrc
│  ├─ 1
│  ├─ app
│  │  ├─ Console
│  │  │  └─ Commands
│  │  │     └─ SendAppointmentReminders.php
│  │  ├─ Http
│  │  │  ├─ Controllers
│  │  │  │  ├─ Admin
│  │  │  │  │  ├─ AdminAnnouncementController.php
│  │  │  │  │  ├─ AdminAppointmentController.php
│  │  │  │  │  ├─ AdminCategoryController.php
│  │  │  │  │  ├─ AdminCompanyController.php
│  │  │  │  │  ├─ AdminDashboardController.php
│  │  │  │  │  ├─ AdminProfileController.php
│  │  │  │  │  ├─ AdminReceiptController.php
│  │  │  │  │  ├─ AdminReportController.php
│  │  │  │  │  ├─ AdminSettingsController.php
│  │  │  │  │  └─ AdminUserController.php
│  │  │  │  ├─ Auth
│  │  │  │  │  └─ AuthController.php
│  │  │  │  ├─ AvailabilityController.php
│  │  │  │  ├─ AvailabilityExceptionController.php
│  │  │  │  ├─ BlockedTimeController.php
│  │  │  │  ├─ Company
│  │  │  │  │  ├─ AppointmentController.php
│  │  │  │  │  └─ CompanyReportController.php
│  │  │  │  ├─ CompanyController.php
│  │  │  │  ├─ CompanyDashboardController.php
│  │  │  │  ├─ CompanySettingsController.php
│  │  │  │  ├─ CompanyWorkingHoursController.php
│  │  │  │  ├─ Controller.php
│  │  │  │  ├─ Customer
│  │  │  │  │  └─ AppointmentController.php
│  │  │  │  ├─ CustomerDashboardController.php
│  │  │  │  ├─ CustomerSettingsController.php
│  │  │  │  ├─ HolidayController.php
│  │  │  │  ├─ NotificationController.php
│  │  │  │  ├─ ReceiptController.php
│  │  │  │  ├─ RoleController.php
│  │  │  │  ├─ ServiceController.php
│  │  │  │  ├─ Staff
│  │  │  │  │  └─ AppointmentController.php
│  │  │  │  ├─ StaffAvailabilityController.php
│  │  │  │  ├─ StaffController.php
│  │  │  │  ├─ StaffDashboardController.php
│  │  │  │  └─ StaffSettingsController.php
│  │  │  └─ Middleware
│  │  │     ├─ RoleMiddleware.php
│  │  │     └─ SuperAdminMiddleware.php
│  │  ├─ Models
│  │  │  ├─ AdminSetting.php
│  │  │  ├─ Announcement.php
│  │  │  ├─ Appointment.php
│  │  │  ├─ AvailabilityException.php
│  │  │  ├─ BlockedTime.php
│  │  │  ├─ BusinessWorkingHour.php
│  │  │  ├─ Category.php
│  │  │  ├─ Company.php
│  │  │  ├─ CompanySetting.php
│  │  │  ├─ Customer.php
│  │  │  ├─ CustomerSetting.php
│  │  │  ├─ Holiday.php
│  │  │  ├─ Otp.php
│  │  │  ├─ Payment.php
│  │  │  ├─ Receipt.php
│  │  │  ├─ Role.php
│  │  │  ├─ Service.php
│  │  │  ├─ Staff.php
│  │  │  ├─ StaffAvailability.php
│  │  │  ├─ StaffSetting.php
│  │  │  ├─ SuperAdmin.php
│  │  │  └─ User.php
│  │  ├─ Notifications
│  │  │  ├─ NotificationType.php
│  │  │  └─ TimeoraNotification.php
│  │  ├─ Providers
│  │  │  └─ AppServiceProvider.php
│  │  └─ Services
│  │     └─ OtpService.php
│  ├─ artisan
│  ├─ bootstrap
│  │  ├─ app.php
│  │  ├─ cache
│  │  └─ providers.php
│  ├─ cascadeOnDelete()
│  ├─ composer.json
│  ├─ composer.lock
│  ├─ config
│  │  ├─ app.php
│  │  ├─ auth.php
│  │  ├─ cache.php
│  │  ├─ cors.php
│  │  ├─ database.php
│  │  ├─ dompdf.php
│  │  ├─ filesystems.php
│  │  ├─ logging.php
│  │  ├─ mail.php
│  │  ├─ queue.php
│  │  ├─ sanctum.php
│  │  ├─ services.php
│  │  └─ session.php
│  ├─ constrained()
│  ├─ database
│  │  ├─ factories
│  │  │  └─ UserFactory.php
│  │  ├─ migrations
│  │  │  ├─ 0001_01_01_000000_create_users_table.php
│  │  │  ├─ 0001_01_01_000001_create_cache_table.php
│  │  │  ├─ 0001_01_01_000002_create_jobs_table.php
│  │  │  ├─ 2026_08_21_174141_create_personal_access_tokens_table.php
│  │  │  ├─ 2026_08_24_121656_create_categories_table.php
│  │  │  ├─ 2026_08_24_130339_create_companies_table.php
│  │  │  ├─ 2026_08_24_140916_create_otps_table.php
│  │  │  ├─ 2026_08_28_114521_create_roles_table.php
│  │  │  ├─ 2026_08_28_114738_create_services_table.php
│  │  │  ├─ 2026_08_28_114856_create_staff_table.php
│  │  │  ├─ 2026_08_28_115019_create_staff_service_table.php
│  │  │  ├─ 2026_08_28_124136_add_bio_to_staff_table.php
│  │  │  ├─ 2026_08_28_201003_add_deleted_at_to_staff_table.php
│  │  │  ├─ 2026_08_28_202841_create_staff_availability_table.php
│  │  │  ├─ 2026_08_29_115557_update_staff_id_unique_constraint.php
│  │  │  ├─ 2026_08_30_103853_add_details_to_services_table.php
│  │  │  ├─ 2026_08_31_105001_create_customers_table.php
│  │  │  ├─ 2026_08_31_122031_create_business_working_hours_table.php
│  │  │  ├─ 2026_08_31_140746_update_staff_availabilities_structure.php
│  │  │  ├─ 2026_08_31_141944_remove_old_columns_from_staff_availability_table.php
│  │  │  ├─ 2026_08_31_145119_fix_staff_availability_unique_constraint.php
│  │  │  ├─ 2026_09_01_110726_create_holidays_table.php
│  │  │  ├─ 2026_09_01_111256_create_blocked_times_table.php
│  │  │  ├─ 2026_09_01_112842_create_availability_exceptions_table.php
│  │  │  ├─ 2026_09_02_115035_create_appointments_table.php
│  │  │  ├─ 2026_09_02_155903_add_details_to_services_table.php.php
│  │  │  ├─ 2026_09_04_060807_create_payments_table.php
│  │  │  ├─ 2026_09_04_072634_rename_payment_received_columns_in_payments_table.php
│  │  │  ├─ 2026_09_04_075734_create_receipts_table.php
│  │  │  ├─ 2026_09_05_110027_create_notifications_table.php
│  │  │  ├─ 2026_09_06_011410_create_company_settings_table.php
│  │  │  ├─ 2026_09_06_112133_create_staff_settings_table.php
│  │  │  ├─ 2026_09_06_120501_create_customer_settings_table.php
│  │  │  ├─ 2026_09_06_124208_create_super_admins_table.php
│  │  │  ├─ 2026_09_06_170228_create_announcements_table.php
│  │  │  └─ 2026_09_06_175200_create_admin_settings_table.php
│  │  └─ seeders
│  │     ├─ CategorySeeder.php
│  │     └─ DatabaseSeeder.php
│  ├─ default(true)
│  ├─ first()
│  ├─ foreignId('customer_id')
│  ├─ id()
│  ├─ notify(
│  ├─ package.json
│  ├─ phpunit.xml
│  ├─ public
│  │  ├─ .htaccess
│  │  ├─ favicon.ico
│  │  ├─ index.php
│  │  └─ robots.txt
│  ├─ README.md
│  ├─ resources
│  │  ├─ css
│  │  │  └─ app.css
│  │  ├─ js
│  │  │  └─ app.js
│  │  └─ views
│  │     ├─ emails
│  │     │  └─ notifications
│  │     │     └─ timeora.blade.php
│  │     ├─ receipts
│  │     │  └─ pdf.blade.php
│  │     └─ welcome.blade.php
│  ├─ routes
│  │  ├─ api.php
│  │  ├─ console.php
│  │  └─ web.php
│  ├─ storage
│  │  ├─ app
│  │  │  ├─ private
│  │  │  └─ public
│  │  └─ framework
│  │     └─ testing
│  ├─ tests
│  │  ├─ Feature
│  │  │  └─ ExampleTest.php
│  │  ├─ TestCase.php
│  │  └─ Unit
│  │     └─ ExampleTest.php
│  ├─ timestamps()
│  ├─ unique('customer_id')
│  ├─ unique(['company_id'
│  └─ vite.config.js
├─ documentation
│  ├─ TIMEORA-Documentation.docx
│  └─ TIMEORA-Documentation.pdf
├─ frontend
│  ├─ eslint.config.js
│  ├─ index.html
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ pnpm-lock.yaml
│  ├─ public
│  │  ├─ favicon.svg
│  │  └─ icons.svg
│  ├─ README.md
│  ├─ src
│  │  ├─ App.css
│  │  ├─ App.jsx
│  │  ├─ assets
│  │  │  ├─ fonts
│  │  │  │  ├─ LibreCaslonText-Bold.ttf
│  │  │  │  ├─ LibreCaslonText-Italic.ttf
│  │  │  │  └─ LibreCaslonText-Regular.ttf
│  │  │  ├─ hero.png
│  │  │  ├─ logo.png
│  │  │  ├─ react.svg
│  │  │  └─ vite.svg
│  │  ├─ components
│  │  │  ├─ common
│  │  │  │  ├─ BackToHome.jsx
│  │  │  │  ├─ Button.jsx
│  │  │  │  ├─ Input.jsx
│  │  │  │  ├─ layouts
│  │  │  │  │  ├─ AuthLayout.jsx
│  │  │  │  │  ├─ Footer.jsx
│  │  │  │  │  └─ Navbar.jsx
│  │  │  │  ├─ Logo.jsx
│  │  │  │  ├─ RegistrationIntro.jsx
│  │  │  │  ├─ RegistrationSteps.jsx
│  │  │  │  └─ ui
│  │  │  │     ├─ Divider.jsx
│  │  │  │     └─ IconBox.jsx
│  │  │  ├─ dashboard
│  │  │  │  ├─ AppointmentsTable.jsx
│  │  │  │  ├─ CalendarScheduleView.jsx
│  │  │  │  ├─ PerformanceChart.jsx
│  │  │  │  ├─ RecentActivity.jsx
│  │  │  │  ├─ ScheduleTimeline.jsx
│  │  │  │  ├─ Sidebar.jsx
│  │  │  │  ├─ StaffOverview.jsx
│  │  │  │  ├─ StatCard.jsx
│  │  │  │  └─ Topbar.jsx
│  │  │  ├─ public
│  │  │  │  ├─ AboutSection.jsx
│  │  │  │  ├─ ContactSection.jsx
│  │  │  │  ├─ DashboardPreviewMock.jsx
│  │  │  │  ├─ Footer.jsx
│  │  │  │  ├─ HowItWorks.jsx
│  │  │  │  ├─ legal
│  │  │  │  │  └─ LegalPage.jsx
│  │  │  │  └─ Navbar.jsx
│  │  │  ├─ settings
│  │  │  │  └─ SettingsNav.jsx
│  │  │  └─ staff
│  │  │     ├─ calendar
│  │  │     │  ├─ DayGrid.jsx
│  │  │     │  └─ MonthGrid.jsx
│  │  │     ├─ StaffSidebar.jsx
│  │  │     └─ StaffTopbar.jsx
│  │  ├─ context
│  │  │  └─ AuthContext.jsx
│  │  ├─ hooks
│  │  │  ├─ authHook.js
│  │  │  └─ useInView.js
│  │  ├─ index.css
│  │  ├─ main.jsx
│  │  ├─ pages
│  │  │  ├─ appointments
│  │  │  │  ├─ AppointmentDetails.jsx
│  │  │  │  ├─ AppointmentManagement.jsx
│  │  │  │  ├─ CreateAppointment.jsx
│  │  │  │  ├─ PaymentCasOnReception.jsx
│  │  │  │  ├─ PaymentReceipt.jsx
│  │  │  │  └─ RescheduleAppointment.jsx
│  │  │  ├─ auth
│  │  │  │  ├─ AccountCreated.jsx
│  │  │  │  ├─ CompanyRegister.jsx
│  │  │  │  ├─ CustomerRegister.jsx
│  │  │  │  ├─ ForgotPassword.jsx
│  │  │  │  ├─ Login.jsx
│  │  │  │  ├─ ResetPassword.jsx
│  │  │  │  ├─ RoleSelectionPage.jsx
│  │  │  │  └─ VerifyOtp.jsx
│  │  │  ├─ availability
│  │  │  │  └─ AvailabilityManagement.jsx
│  │  │  ├─ calendar
│  │  │  │  └─ CalendarSchedule.jsx
│  │  │  ├─ customers
│  │  │  │  ├─ AddCustomers.jsx
│  │  │  │  ├─ CustomerDetails.jsx
│  │  │  │  └─ CustomerManagement.jsx
│  │  │  ├─ dashboard
│  │  │  │  └─ CompanyDashboard.jsx
│  │  │  ├─ help
│  │  │  │  └─ HelpCenter.jsx
│  │  │  ├─ LandingPage.jsx
│  │  │  ├─ legal
│  │  │  │  ├─ CookiePolicy.jsx
│  │  │  │  ├─ PrivacyPolicy.jsx
│  │  │  │  └─ TermsOfService.jsx
│  │  │  ├─ notifications
│  │  │  │  └─ Notifications.jsx
│  │  │  ├─ reports
│  │  │  │  ├─ AppointmentReport.jsx
│  │  │  │  ├─ CustomerReport.jsx
│  │  │  │  ├─ Reports.jsx
│  │  │  │  ├─ ServiceReport.jsx
│  │  │  │  └─ StaffReport.jsx
│  │  │  ├─ services
│  │  │  │  ├─ AddService.jsx
│  │  │  │  └─ ServicesManagement.jsx
│  │  │  ├─ settings
│  │  │  │  ├─ BookingSettings.jsx
│  │  │  │  ├─ BusinessHours.jsx
│  │  │  │  ├─ CompanyProfile.jsx
│  │  │  │  ├─ CompanySettings.jsx
│  │  │  │  └─ NotificationSettings.jsx
│  │  │  └─ staff
│  │  │     ├─ AddStaff.jsx
│  │  │     ├─ EditStaff.jsx
│  │  │     ├─ StaffAppointmentDetails.jsx
│  │  │     ├─ StaffAppointments.jsx
│  │  │     ├─ StaffAvailability.jsx
│  │  │     ├─ StaffCalendar.jsx
│  │  │     ├─ StaffCustomerDetails.jsx
│  │  │     ├─ StaffCustomers.jsx
│  │  │     ├─ StaffDashboard.jsx
│  │  │     ├─ StaffDetails.jsx
│  │  │     ├─ StaffEditCustomer.jsx
│  │  │     ├─ StaffManagement.jsx
│  │  │     ├─ StaffNotifications.jsx
│  │  │     ├─ StaffReports.jsx
│  │  │     ├─ StaffRescheduleAppointment.jsx
│  │  │     └─ StaffSettings.jsx
│  │  ├─ routes
│  │  │  └─ AppRoutes.jsx
│  │  ├─ services
│  │  │  ├─ api.js
│  │  │  └─ authService.js
│  │  └─ utils
│  └─ vite.config.js
└─ README.md

```