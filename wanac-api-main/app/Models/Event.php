<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    protected $fillable = ['user_id','type','location','location','link','date','time','status'];


    public function user(){
        return $this->belongsTo(User::class);
    }
}
