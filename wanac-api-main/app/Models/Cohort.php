<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cohort extends Model
{
    protected $fillable = ['added_by','name','status','program_id','description','start_date','end_date'];

    public function program(){
        return $this->belongsTo(Program::class);
    }

    public function cohortMembers(){
        return $this->hasMany(CohortMember::class);
    }
}
