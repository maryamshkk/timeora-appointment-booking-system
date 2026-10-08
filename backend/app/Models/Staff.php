<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class Staff extends Authenticatable
{
    use HasApiTokens, HasFactory, SoftDeletes, Notifiable;

    protected $fillable = [
        'company_id',
        'staff_id',
        'first_name',
        'last_name',
        'photo_path',
        'role_id',
        'phone',
        'account_email',
        'password_hash',
        'bio',
        'invitation_status',
        'invitation_token',
        'invitation_sent_at',
        'email_verified_at',
        'status',
        'is_active',
    ];

    /**
     * Hide sensitive fields AND back-referencing relations so that
     * serializing a Staff model never recurses through its graph.
     */
    protected $hidden = [
        'password_hash',
        'invitation_token',
        'company',
        'role',
        'services',
        'availability',
        'blockedTimes',
        'availabilityExceptions',
        'appointments',
        'settings',
    ];

    protected $casts = [
        'invitation_sent_at' => 'datetime',
        'email_verified_at'  => 'datetime',
        'is_active'          => 'boolean',
    ];

    public function getAuthPassword()
    {
        return $this->password_hash;
    }

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class);
    }

    public function services(): BelongsToMany
    {
        return $this->belongsToMany(
            Service::class,
            'staff_service'
        )->withTimestamps();
    }

    public function availability(): HasMany
    {
        return $this->hasMany(StaffAvailability::class);
    }

    public function blockedTimes(): HasMany
    {
        return $this->hasMany(BlockedTime::class);
    }

    public function availabilityExceptions(): HasMany
    {
        return $this->hasMany(AvailabilityException::class);
    }

    public function appointments(): HasMany
    {
        return $this->hasMany(Appointment::class, 'staff_id');
    }

    public function settings(): HasOne
    {
        return $this->hasOne(StaffSetting::class);
    }

    public function routeNotificationForMail($notification)
    {
        return $this->account_email;
    }
}