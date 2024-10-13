<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

use Illuminate\Http\Request;

class CommentLikeController extends Controller
{
    //
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $user = User::where('name', $request->auth_user_name)->first();
        $user->comment_like($request->comment_id);
        return response()->json(['message' => "liked"]);
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
        $user->comment_unlike($request->comment_id);
        return response()->json(['message' => 'unliked']);
    }
}
