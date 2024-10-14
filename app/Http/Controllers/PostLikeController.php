<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

use Auth;

class PostLikeController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            'post_id' => 'required|exists:posts,id'
        ]);
        $user = User::where('name', $request->auth_user_name)->first();
        $user->post_like($request->post_id);
        return response()->json(['message' => 'liked']);
    }
    
    /**
     * Remove the specified resource from storage.
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        //
        $user = User::where('name', $request->auth_user_name)->first();
        $user->post_unlike($request->post_id);
        return response()->json(['message' => 'unliked']);
    }
}
