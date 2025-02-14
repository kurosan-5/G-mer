<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    use HasFactory;

    protected $guarded = ['id', 'created_at', 'deleted_at'];

    public function post(){
        return $this->belongsTo(Post::class);
    }
    
    public function user(){
        return $this->belongsTo(User::class);
    }

    public function comment_likes(){
        return $this->hasMany(Comment_Like::class);
    }

}
