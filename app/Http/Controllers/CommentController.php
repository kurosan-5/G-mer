<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Comment_Like;
use App\Models\User;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $comments = Comment::with('user')->with('likes.user')->where('post_id', $request->post_id)
            ->withCount('likes')->get();
        $user = User::where('name', $request->auth_user_name)->first();
        $likes = Comment_Like::where('user_id', $user->id)->get();

        return response()->json([
            'comments' => $comments,
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
        $request->validate([
            'content' => 'required|string|max:1024',
            'user_id' => 'required|integer|exists:users,id',
            'post_id' => 'required|integer|exists:posts,id',
        ]);

        $comment = Comment::create([
            'content' => $request['content'],
            'user_id' => $request['user_id'],
            'post_id' => $request['post_id'],
        ]);

        return response()->json([
            'comment' => $comment
        ]);

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function show(Comment $comment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function edit(Comment $comment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Comment $comment)
    {
        //
        try {

            $request->validate([
                'content' => 'required|string|max:1024',
            ]);


            $comment->content = $request->input('content');
            $comment->save();

            return response()->json([
                'message' => 'edited'
            ]);
        } catch (\Exception $e) {
            return response()->json(['errors' => $e]);
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Comment  $comment
     * @return \Illuminate\Http\Response
     */
    public function destroy(Comment $comment)
    {
        //
        $comment->delete();
        return response()->json([
            'message' => 'deleted'
        ]);
    }
}
