<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CompanySetting;

class CompanySettingsController extends Controller
{
    // Get settings data
    public function show(Request $request)
    {
        $user = $request->user();
        $company = $user->company;

        if (!$company) {
            return response()->json([
                'message' => 'Company not found.'
            ], 404);
        }

        $settings = CompanySetting::firstOrCreate(
            ['company_id' => $company->id],
            [
                'timezone' => 'Asia/Karachi',

                'booking_enabled' => true,
                'auto_accept_appointments' => false,

                'email_notifications' => true,
                'appointment_reminders' => true,
                'booking_updates' => true,
                'cancellation_updates' => true,

                'min_notice_value' => 2,
                'min_notice_unit' => 'Hours',
                'max_window_value' => 60,
                'max_window_unit' => 'Days',

                'cancellation_policy_enabled' => true,
                'cancellation_deadline_value' => 24,
                'cancellation_deadline_unit' => 'Hours before',

                'rescheduling_policy_enabled' => true,
                'rescheduling_deadline_value' => 24,
                'rescheduling_deadline_unit' => 'Hours before',
                'max_reschedules' => 2,

                'same_day_booking' => false,
                'appointment_buffer_enabled' => true,
                'appointment_buffer_minutes' => 15,

                // Notification preferences default
                'notification_preferences' => [
                    'master_enabled' => true,
                    'events' => [
                        ['id' => 1, 'section' => 'Appointments', 'label' => 'New Appointment', 'inApp' => true, 'email' => true, 'locked' => false],
                        ['id' => 2, 'section' => 'Appointments', 'label' => 'Appointment Cancelled', 'inApp' => true, 'email' => true, 'locked' => false],
                        ['id' => 3, 'section' => 'Appointments', 'label' => 'Appointment Rescheduled', 'inApp' => true, 'email' => true, 'locked' => false],
                        ['id' => 4, 'section' => 'Appointments', 'label' => 'Upcoming Appointment Reminder', 'inApp' => true, 'email' => true, 'locked' => false],
                        ['id' => 5, 'section' => 'Customers', 'label' => 'New Customer Registered', 'inApp' => true, 'email' => true, 'locked' => false],
                        ['id' => 6, 'section' => 'Staff', 'label' => 'Staff Member Added', 'inApp' => true, 'email' => true, 'locked' => false],
                        ['id' => 7, 'section' => 'Staff', 'label' => 'Staff Schedule Changed', 'inApp' => true, 'email' => false, 'locked' => false],
                        ['id' => 8, 'section' => 'Security', 'label' => 'New Login From Unrecognized Device', 'inApp' => true, 'email' => true, 'locked' => true],
                        ['id' => 9, 'section' => 'Security', 'label' => 'Password Changed', 'inApp' => true, 'email' => true, 'locked' => true],
                    ],
                ],
            ]
        );

        return response()->json([
            'message' => 'Company settings retrieved successfully.',
            'settings' => $settings,
        ]);
    }

    // Update settings data
    public function update(Request $request)
    {
        $user = $request->user();
        $company = $user->company;

        if (!$company) {
            return response()->json([
                'message' => 'Company not found.'
            ], 404);
        }

        $validated = $request->validate([
            'timezone' => ['sometimes', 'string', 'max:100'],

            // Booking + auto confirmation
            'booking_enabled' => ['sometimes', 'boolean'],
            'auto_accept_appointments' => ['sometimes', 'boolean'],

            // Notification settings
            'email_notifications' => ['sometimes', 'boolean'],
            'appointment_reminders' => ['sometimes', 'boolean'],
            'booking_updates' => ['sometimes', 'boolean'],
            'cancellation_updates' => ['sometimes', 'boolean'],

            // Booking window
            'min_notice_value' => ['sometimes', 'integer', 'min:0', 'max:365'],
            'min_notice_unit' => ['sometimes', 'string', 'in:Hours,Days'],

            'max_window_value' => ['sometimes', 'integer', 'min:1', 'max:365'],
            'max_window_unit' => ['sometimes', 'string', 'in:Days,Weeks,Months'],

            // Cancellation policy
            'cancellation_policy_enabled' => ['sometimes', 'boolean'],
            'cancellation_deadline_value' => ['sometimes', 'integer', 'min:0', 'max:365'],
            'cancellation_deadline_unit' => ['sometimes', 'string', 'in:Hours before,Days before'],

            // Rescheduling policy
            'rescheduling_policy_enabled' => ['sometimes', 'boolean'],
            'rescheduling_deadline_value' => ['sometimes', 'integer', 'min:0', 'max:365'],
            'rescheduling_deadline_unit' => ['sometimes', 'string', 'in:Hours before,Days before'],
            'max_reschedules' => ['sometimes', 'integer', 'min:0', 'max:10'],

            // Appointment rules
            'same_day_booking' => ['sometimes', 'boolean'],
            'appointment_buffer_enabled' => ['sometimes', 'boolean'],
            'appointment_buffer_minutes' => ['sometimes', 'integer', 'min:0', 'max:120'],

            // Notification preferences
            'notification_preferences' => ['sometimes', 'array'],
            'notification_preferences.master_enabled' => ['sometimes', 'boolean'],
            'notification_preferences.events' => ['sometimes', 'array'],
            'notification_preferences.events.*.id' => ['required', 'integer'],
            'notification_preferences.events.*.section' => ['required', 'string'],
            'notification_preferences.events.*.label' => ['required', 'string'],
            'notification_preferences.events.*.inApp' => ['required', 'boolean'],
            'notification_preferences.events.*.email' => ['required', 'boolean'],
            'notification_preferences.events.*.locked' => ['required', 'boolean'],
        ]);

        $settings = CompanySetting::firstOrCreate(
            ['company_id' => $company->id]
        );

        $settings->update($validated);

        return response()->json([
            'message' => 'Company settings updated successfully.',
            'settings' => $settings->fresh(),
        ]);
    }
}