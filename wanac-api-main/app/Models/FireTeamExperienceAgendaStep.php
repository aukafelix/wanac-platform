<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FireTeamExperienceAgendaStep extends Model
{
    protected $fillable = [
        'fire_team_experience_id',
        'title',
        'duration',
        'added_by',
    ];
}
