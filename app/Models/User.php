<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function post_likes(){
        return $this->belongsToMany(Post::class, 'post_likes', 'user_id', 'post_id');
    }
    
    public function post_isLike($post_id){
        return $this->post_likes()->where('post_id', $post_id)->exists();
    }
    
    public function post_like($post_id){
        if($this->post_isLike($post_id)){
            //いいねしていたらなにもしない
        }else{
            $this->post_likes()->attach($post_id);
        }
    }
    
    public function post_unlike($post_id){
        if($this->post_isLike($post_id)){
            //いいねしていたら消す
            $this->post_likes()->detach($post_id);
        }else{
        }
    }


    
    public function comment_likes(){
        return $this->belongsToMany(Comment::class, 'comment_likes', 'user_id', 'comment_id');
    }
    public function comment_isLike($comment_id){
        return $this->comment_likes()->where('comment_id', $comment_id)->exists();
    }
    
    public function comment_like($comment_id){
        if($this->comment_isLike($comment_id)){
            //いいねしていたらなにもしない
        }else{
            $this->comment_likes()->attach($comment_id);
        }
    }
    
    public function comment_unlike($comment_id){
        if($this->comment_isLike($comment_id)){
            //いいねしていたら消す
            $this->comment_likes()->detach($comment_id);
        }else{
        }
    }

    public function has_comment_likes()
    {
        return $this->hasMany(Comment_Like::class);
    }
    
    public function posts(){
        return $this->hasMany(Post::class);
    }
    public function comments(){
        return $this->hasMany(Comment::class);
    }
}
