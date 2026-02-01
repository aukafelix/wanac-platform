<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SessionMember extends Model
{
    protected $fillable = ['client_id','coaching_session_id'];

    public function client(){
        return $this->belongsTo(Client::class);
    }

}
