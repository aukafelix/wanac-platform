<?php

namespace App\Http\Controllers;

use App\Models\WholeLifeScore;
use Auth;
use Exception;
use Illuminate\Http\Request;
use Validator;

class WholeLifeScoreController extends Controller
{
    public function index(){
        $scores = WholeLifeScore::where('client_id', Auth::user()->client->id)->get();
        return response()->json($scores);
    }

    public function store(Request $request){
        try {
            $validator = Validator::make(
                $request->all(),
                [
                    'health' => 'required|integer|between:1,10',
                    'relationship' => 'required|integer|between:1,10',
                    'career' => 'required|integer|between:1,10',
                    'finances' => 'required|integer|between:1,10',
                    'personal_growth' => 'required|integer|between:1,10',
                    'recreation' => 'required|integer|between:1,10',
                    'spirituality' => 'required|integer|between:1,10',
                    'community' => 'required|integer|between:1,10',
                ]
                );
                if ($validator->fails()) {
                    return response()->json([
                        'errors' => $validator->errors(),
                    ], 422);
                }

                $score = WholeLifeScore::create([
                    'client_id' => Auth::user()->client->id,
                    ...$validator->validated(),
                ]);

                return response()->json([
                    'success' => 'Whole life score created successfully'
                ], 201);
        } catch (Exception $ex) {
            return response()->json([
                'error' => $ex->getMessage()
            ]);
        }
    }

    public function update(Request $request){
        try {
            $validator = Validator::make(
                $request->all(),
                [
                    'id' => 'required|exists:whole_life_scores,id',
                    'health' => 'required|integer|between:1,10',
                    'relationship' => 'required|integer|between:1,10',
                    'career' => 'required|integer|between:1,10',
                    'finances' => 'required|integer|between:1,10',
                    'personal_growth' => 'required|integer|between:1,10',
                    'recreation' => 'required|integer|between:1,10',
                    'spirituality' => 'required|integer|between:1,10',
                    'community' => 'required|integer|between:1,10',
                ]
                );
                if ($validator->fails()) {
                    return response()->json([
                        'errors' => $validator->errors(),
                    ], 422);
                }

                $score = WholeLifeScore::find($request->id);
                if (!$score) {
                    return response()->json([
                        'error' => 'Whole life score not found'
                    ], 404);
                }
                $score->update($validator->validated());
                return response()->json([
                    'success' => 'Whole life score update successfully'
                ]);
        } catch (Exception $ex) {
            return response()->json([
                'error' => $ex->getMessage()
            ]);
        }
    }


}
