<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'company_id',
        'category_id',
        'description',
        'duration',
        'price',
        'status',
    ];

    protected $hidden = [
        'company',
        'category',
        'staff',
        'appointments',
    ];

    protected $casts = [
        'duration' => 'integer',
        'price'    => 'decimal:2',
    ];

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    public function staff(): BelongsToMany
    {
        return $this->belongsToMany(
            Staff::class,
            'staff_service',
            'service_id',
            'staff_id'
        );
    }

    public function appointments(): HasMany
    {
        return $this->hasMany(Appointment::class, 'service_id');
    }
}