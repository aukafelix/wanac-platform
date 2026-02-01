<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FireTeamMember extends Model
{
    protected $fillable = ['fire_team_id', 'client_id'];

    public function fireTeam()
    {
        return $this->belongsTo(FireTeam::class);
    }
    public function client()
    {
        return $this->belongsTo(Client::class);
    }
}
