<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Recording extends Model
{
    protected $fillable = ['fire_team_id','file_dir','transcription','summary','coach_summary','client_summary'];

}
