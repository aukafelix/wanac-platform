<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DailyHabit extends Model
{
    protected $fillable = [
        'client_id',
        'exercise',
        'productivity',
        'mood',
        'sleep',
        'nutrition',
    ];
}
