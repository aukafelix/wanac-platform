<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WholeLifeScore extends Model
{
    protected $fillable = [
        'client_id',
        'health',
        'relationship',
        'career',
        'finances',
        'personal_growth',
        'recreation',
        'spirituality',
        'community',
    ];

    public function client(){
        return $this->belongsTo(Client::class);
    }
}
