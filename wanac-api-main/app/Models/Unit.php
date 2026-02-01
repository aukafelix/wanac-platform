<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Unit extends Model
{
    protected $fillable = ['added_by','program_id','coach_id','title','description'];

    public function program(){
        return $this->belongsTo(Program::class);
    }

    public function coach(){
        return $this->belongsTo(Coach::class);
    }
}
