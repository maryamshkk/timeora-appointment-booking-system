<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CompanySetting extends Model
{
    protected $fillable = [
        'company_id',
        'timezone',

        // Notifications
        'email_notifications',
        'appointment_reminders',
        'booking_updates',
        'cancellation_updates',

        // Booking rules
        'booking_enabled',
        'auto_accept_appointments',

        // Booking window
        'min_notice_value',
        'min_notice_unit',
        'max_window_value',
        'max_window_unit',

        // Cancellation policy
        'cancellation_policy_enabled',
        'cancellation_deadline_value',
        'cancellation_deadline_unit',

        // Rescheduling policy
        'rescheduling_policy_enabled',
        'rescheduling_deadline_value',
        'rescheduling_deadline_unit',
        'max_reschedules',

        // Appointment rules
        'same_day_booking',
        'appointment_buffer_enabled',
        'appointment_buffer_minutes',
          
        'notification_preferences',    // ← ADD
    ];

    protected $casts = [
        // Booleans
        'booking_enabled' => 'boolean',
        'auto_accept_appointments' => 'boolean',
        'email_notifications' => 'boolean',
        'appointment_reminders' => 'boolean',
        'booking_updates' => 'boolean',
        'cancellation_updates' => 'boolean',
        'cancellation_policy_enabled' => 'boolean',
        'rescheduling_policy_enabled' => 'boolean',
        'same_day_booking' => 'boolean',
        'appointment_buffer_enabled' => 'boolean',

        // Integers
        'min_notice_value' => 'integer',
        'max_window_value' => 'integer',
        'cancellation_deadline_value' => 'integer',
        'rescheduling_deadline_value' => 'integer',
        'max_reschedules' => 'integer',
        'appointment_buffer_minutes' => 'integer',
        
        'notification_preferences' => 'array', 
    ];


    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }
}