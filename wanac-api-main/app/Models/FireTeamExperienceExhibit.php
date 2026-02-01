<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FireTeamExperienceExhibit extends Model
{
    protected $fillable = [
        'fire_team_experience_id',
        'name',
        'type',
        'url',
        'added_by',
    ];
}
