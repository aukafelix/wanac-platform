<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Program extends Model
{
    protected $fillable = ['added_by','title','description'];

    public function units(){
        return $this->hasMany(Unit::class);
    }

    public function cohorts(){
        return $this->hasMany(Cohort::class);
    }
}
