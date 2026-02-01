<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Auth;
use Exception;
use Illuminate\Http\Request;
use Validator;

class PostController extends Controller
{
    public function index(){
        $posts = Post::with('user')->latest()->paginate(20);

        return response()->json([
            'posts' => $posts
        ]);
    }

    public function create(Request $request){
        $validator = Validator::make($request->all(), [
            'content' => 'required|string',
            'community_id' => 'required|exists:communities,id',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }
        $data = $validator->validated();
        $data['user_id'] = Auth::id();
        Post::create($data);
        return response()->json([
            'success' => 'Post created successfully.',
        ], 201);
    }

    public function update(Request $request, Post $post){
        $post = Post::find($request->id);

        $validator = Validator::make($request->all(), [
            'content' => 'required|string',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }
        try {
            $post->update($validator->validated());
            return response()->json([
                'success' => 'Post updated successfully.',
            ], 201);
        } catch (Exception $ex) {
            return response()->json([
                'error' => $ex->getMessage()
            ]);
        }

    }

    public function destroy(Post $post){

        $post->delete();

        return response()->json([
            'success' => 'Post deleted successfully.'
        ]);
    }
}
