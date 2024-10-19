<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Post_Like;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use ZipArchive;
use Str;

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

        //postsの暗号化されたファイルへのリンクを作成。
        foreach ($posts as $post) {
            $post->imageUrl = Storage::url($post->image_path);
            $post->htmlUrl = Storage::url($post->file_path);
        }
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
        try {
            // ZIPファイルを保存
            $zipFile = $request->file('fileInput');
             $fileName = time() . '_' . $zipFile->getClientOriginalName();
            // フォルダ名をランダムな文字列に暗号化
            $randomFolderName = Str::random(40);
            // 解凍先のパスを設定
            $extractPath = storage_path('app/public/unzipped/' . $randomFolderName);

            $zipPath = $zipFile->storeAs('uploads', $randomFolderName);
            $extractRelativePath = 'unzipped/' . $randomFolderName;

            // ファイルを解凍
            $zip = new ZipArchive;
            if ($zip->open(storage_path('app/' . $zipPath)) === TRUE) {
                $extractPath = storage_path('app/public/unzipped/' . pathinfo($randomFolderName, PATHINFO_FILENAME));
                $zip->extractTo($extractPath);
                $zip->close();
                $zipFilePath = storage_path('app/uploads/'.$randomFolderName);
                unlink($zipFilePath);
            } else {
                return response()->json(['error' => 'Failed to open ZIP file'], 500);
            }
            $user = User::where('name', $request->input('auth_user_name'))->first();
            $image_file = $request->file('imageInput');
            $image_path = $image_file->store('uploads/image', 'public');
            $post = new Post;
            $post->user_id = $user->id;
            $post->title = $request->input('title');
            $post->about = $request->input('about');
            $post->description = $request->input('description');
            $post->like = 0;
            $post->image_path = $image_path;
            $post->file_path = $extractRelativePath;
            $post->save();

            return response()->json([
                'message' => 'post created'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'error' => true,
                'message' => $e->getMessage(),
            ], 500);
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
        $post->delete();

        return response()->json([
            'message' => 'post deleted'
        ]);
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
