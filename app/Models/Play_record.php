<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Play_record extends Model
{
    use HasFactory;

    protected $guarded = ['id', 'created_at', 'deleted_at'];


    public function post(){
        return $this->belongsTo(Post::class);
    }
    
}
