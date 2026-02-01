<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CohortMember extends Model
{
    protected $fillable = ['client_id','cohort_id'];
    public function client(){
        return $this->belongsTo(Client::class);
    }
    public function cohort(){
        return $this->belongsTo(Cohort::class);
    }
}
