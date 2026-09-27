<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('company_settings', function (Blueprint $table) {
            $table->integer('min_notice_value')->default(2)->after('booking_enabled');
            $table->string('min_notice_unit')->default('Hours')->after('min_notice_value');

            $table->integer('max_window_value')->default(60)->after('min_notice_unit');
            $table->string('max_window_unit')->default('Days')->after('max_window_value');

            $table->boolean('cancellation_policy_enabled')->default(true)->after('max_window_unit');
            $table->integer('cancellation_deadline_value')->default(24)->after('cancellation_policy_enabled');
            $table->string('cancellation_deadline_unit')->default('Hours before')->after('cancellation_deadline_value');

            $table->boolean('rescheduling_policy_enabled')->default(true)->after('cancellation_deadline_unit');
            $table->integer('rescheduling_deadline_value')->default(24)->after('rescheduling_policy_enabled');
            $table->string('rescheduling_deadline_unit')->default('Hours before')->after('rescheduling_deadline_value');
            $table->integer('max_reschedules')->default(2)->after('rescheduling_deadline_unit');

            $table->boolean('same_day_booking')->default(false)->after('max_reschedules');
            $table->boolean('appointment_buffer_enabled')->default(true)->after('same_day_booking');
            $table->integer('appointment_buffer_minutes')->default(15)->after('appointment_buffer_enabled');
        });
    }

    public function down(): void
    {
        Schema::table('company_settings', function (Blueprint $table) {
            $table->dropColumn([
                'min_notice_value',
                'min_notice_unit',
                'max_window_value',
                'max_window_unit',
                'cancellation_policy_enabled',
                'cancellation_deadline_value',
                'cancellation_deadline_unit',
                'rescheduling_policy_enabled',
                'rescheduling_deadline_value',
                'rescheduling_deadline_unit',
                'max_reschedules',
                'same_day_booking',
                'appointment_buffer_enabled',
                'appointment_buffer_minutes',
            ]);
        });
    }
};