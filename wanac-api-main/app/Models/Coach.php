<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Coach extends Model
{

    protected $fillable = ['user_id','timezone','profilePic','newsletter','referralCode','preferredContact','speciality','bio'];

    public function user(){
        return $this->belongsTo(User::class);
    }
}
