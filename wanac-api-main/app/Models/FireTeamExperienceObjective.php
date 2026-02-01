<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FireTeamExperienceObjective extends Model
{
    protected $fillable = ['objective', 'fire_team_experience_id','added_by'];

    public function fireTeamExperience(){

        return $this->belongsTo(FireTeamExperience::class);
    }
}
