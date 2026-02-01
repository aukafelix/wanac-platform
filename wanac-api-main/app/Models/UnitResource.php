<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class UnitResource extends Model
{
    protected $fillable = ['added_by','unit_id','name','dir','description'];
}
