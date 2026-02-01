<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FireTeamExperience extends Model
{
    protected $fillable = ['fire_team_id', 'experience','added_by','title','link','status','report','admin','summary'];
    public function fireTeam()
    {
        return $this->belongsTo(FireTeam::class);
    }

    public function addedBy()
    {
        return $this->belongsTo(User::class, 'added_by');
    }

    public function exhibits(){
        return $this->hasMany(FireTeamExperienceExhibit::class);
    }

    public function agendaSteps(){
        return $this->hasMany(FireTeamExperienceAgendaStep::class);
    }

    public function objectives(){
        return $this->hasMany(FireTeamExperienceObjective::class);
    }
}
