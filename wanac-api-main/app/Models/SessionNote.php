<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SessionNote extends Model
{
    protected $fillable = ['user_id', 'coaching_session_id','note','ai_summary'];

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function session(){
        return $this->belongsTo(CoachingSession::class);
    }
}
