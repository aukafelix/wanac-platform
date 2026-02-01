<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SessionResource extends Model
{
    protected $fillable = ['user_id', 'coaching_session_id','name','description','file_dir'];
    public function user(){
        return $this->belongsTo(User::class);
    }

    public function session(){
        return $this->belongsTo(CoachingSession::class);
    }

}
