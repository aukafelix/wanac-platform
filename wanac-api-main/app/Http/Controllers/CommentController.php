<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Auth;
use Exception;
use Illuminate\Http\Request;
use Validator;

class CommentController extends Controller
{
    public function create(Request $request){
        $validator = Validator::make($request->all(), [
            'content' => 'required|string',
            'post_id' => 'required|exists:posts,id'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }
        $data = $validator->validated();
        $data['user_id'] = Auth::id();
        Comment::create($data);
        return response()->json([
            'success' => 'Comment created successfully.',
        ], 201);
    }

    public function update(Request $request, Comment $comment){

        $validator = Validator::make($request->all(), [
            'content' => 'required|string',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }
        try {
            $comment->update($validator->validated());
            return response()->json([
                'success' => 'Comment updated successfully.',
            ], 201);
        } catch (Exception $ex) {
            return response()->json([
                'error' => $ex->getMessage()
            ]);
        }
    }

    public function destroy(Comment $comment){

        $comment->delete();

        return response()->json([
            'success' => 'Comment deleted successfully.'
        ]);
    }
}
