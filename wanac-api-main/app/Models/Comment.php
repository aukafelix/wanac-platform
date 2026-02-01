<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    protected $fillable = ['user_id','post_id','content'];

    public function user(){
        $this->belongsTo(User::class);
    }

    public function post(){
        $this->belongsTo(Post::class);
    }
}
