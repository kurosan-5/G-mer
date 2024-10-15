<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Post_Like;
use App\Models\User;
use Illuminate\Http\Request;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $posts = Post::withCount('comments')->with('likes.user')
            ->withCount('likes')->get();
        $user = User::where('name', $request->auth_user_name)->first();
        $likes = Post_Like::where('user_id', $user->id)->get();
        return response()->json([
            'posts' => $posts,
            'likes' => $likes,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        return response();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try{
            $post = new Post;
            $post->title = $request->title;
            $post->about = $request->about;
            $post->description = $request->description;
            $post->like = 0;
            $post->image_path = $request->imagePath;
            $post->file_path = $request->filePath;
            $post->save();
            return response()->json([
                'message' => 'post created'
            ]);
        }catch(\Exception $e){
            return response()->json([
                'error' => $e
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function show(Post $post)
    {
        return response();
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function edit(Post $post)
    {
        return response();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Post $post)
    {
        return response();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Post  $post
     * @return \Illuminate\Http\Response
     */
    public function destroy(Post $post)
    {
        return response();
    }

    public function get_user(Request $request)
    {
        $post_user = User::find($request->post_user_id);
        $login_user_id = User::where('name', $request->login_user_name)->first();
        return response()->json([
            'post_user' => $post_user,
            'login_user_id' => $login_user_id,
        ]);
    }

}
