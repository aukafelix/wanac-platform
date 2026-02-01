<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FireTeam extends Model
{
    protected $fillable = ['cohort_id', 'title', 'created_by', 'description', 'date', 'time'];

    public function cohort()
    {
        return $this->belongsTo(Cohort::class);
    }

    public function createdBy()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function members()
    {
        return $this->hasMany(FireTeamMember::class);
    }
     public function experiences()
    {
        return $this->hasMany(FireTeamExperience::class);
    }
}
