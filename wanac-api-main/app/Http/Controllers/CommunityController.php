<?php

namespace App\Http\Controllers;

use App\Models\Community;
use Auth;
use Exception;
use Illuminate\Http\Request;
use Validator;

class CommunityController extends Controller
{
    public function index(Request $request){
        $communities = Community::query();

        if ($request->has('search')) {
            $communities->where('name','LIKE','%'.$request->search.'%')->orWhere('description','LIKE','%'.$request->search.'%');
        }

        $communities = $communities->with(
            [
                'user',
                'posts',
                ])->latest()->paginate(10);

        return response()->json([
            'communites' => $communities
        ], 201);
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(),[
            'name' => ['required'],
            'description' => ['required']
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }
        try {
            Community::create([
                'name' => $request->name,
                'description' => $request->description,
                'user_id' => Auth::id()
            ]);

            return response()->json([
                'success' => 'Community created successfully.',
            ], 201);
        } catch (Exception $ex) {
            return response()->json([
                'error' => $ex->getMessage()
            ]);
        }
    }

    public function update(Request $request, Community $community){
        $validator = Validator::make($request->all(),[
            'name' => ['required'],
            'description' => ['required']
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $community->update($validator->validated());
            return response()->json([
                'success' => 'Community updated successfully.',
            ], 201);
        } catch (Exception $ex) {
            return response()->json([
                'error' => $ex->getMessage()
            ]);
        }
    }

    public function show(Community $community)
    {
        $community->load([
            'user',
            'posts.user',
            'posts.comments',
            'posts.comments.user'
        ]);

        return response()->json([
            'community' => $community
        ]);
    }

    public function destroy(Community $community){
        $community->delete();
        return response()->json([
            'success' => 'Community deleted successfully.',
        ], 201);
    }
}
