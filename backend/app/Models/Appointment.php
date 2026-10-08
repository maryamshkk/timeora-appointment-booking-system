<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Appointment extends Model
{
    protected $fillable = [
        'company_id',
        'customer_id',
        'staff_id',
        'service_id',
        'appointment_date',
        'start_time',
        'end_time',
        'status',
    ];

    /**
     * Hide relationships that can cause circular serialization.
     * They can still be loaded explicitly via ->with([...]) or ->load([...]).
     */
    protected $hidden = [
        'company',
        'customer',
        'staff',
        'service',
        'payment',
        'receipt',
    ];

    protected $casts = [
        'appointment_date' => 'date:Y-m-d',
        'start_time'       => 'string',
        'end_time'         => 'string',
        'created_at'       => 'datetime',
        'updated_at'       => 'datetime',
    ];

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function customer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'customer_id');
    }

    public function staff(): BelongsTo
    {
        return $this->belongsTo(Staff::class);
    }

    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }

    public function payment(): HasOne
    {
        return $this->hasOne(Payment::class);
    }

    public function receipt(): HasOne
    {
        return $this->hasOne(Receipt::class);
    }
}