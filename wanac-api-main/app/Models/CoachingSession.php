<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CoachingSession extends Model
{
    protected $fillable = ['title','description','session_link','coach_id','session_number','status', 'scheduled_at'];


    public function coach(){
        return $this->belongsTo(Coach::class);
    }

    public function sessionNotes(){
        return $this->hasMany(SessionNote::class);
    }

    public function sessionResources(){
        return $this->hasMany(SessionResource::class);
    }

    public function sessionMembers(){
        return $this->hasMany(SessionMember::class);
    }
}
