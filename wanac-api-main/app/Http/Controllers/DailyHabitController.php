<?php

namespace App\Http\Controllers;

use App\Models\DailyHabit;
use Auth;
use Exception;
use Illuminate\Http\Request;
use Validator;

class DailyHabitController extends Controller
{
    public function showToday()
    {
        $habit = DailyHabit::where('client_id', Auth::user()->client->id)
            ->whereDate('created_at', today())
            ->first();

        return response()->json($habit);
    }
    public function store(Request $request)
    {
        try {
            $validator = Validator::make(
                $request->all(),
                [
                    'exercise' => 'required|integer|between:1,5',
                    'productivity' => 'required|integer|between:1,5',
                    'mood' => 'required|integer|between:1,5',
                    'sleep' => 'required|integer|between:1,5',
                    'nutrition' => 'required|integer|between:1,5',
                ]
            );
            if ($validator->fails()) {
                return response()->json([
                    'errors' => $validator->errors(),
                ], 422);
            }
            $habit = DailyHabit::create([
                'client_id' => Auth::user()->client->id,
                ...$validator->validated(),
            ]);

            return response()->json([
                'success' => 'Habit created successfully.',
            ], 201);
        } catch (Exception $ex) {
            return response()->json([
                'error' => $ex->getMessage()
            ]);
        }
    }

    public function update(Request $request)
    {


        $validator = Validator::make(
            $request->all(),
            [
                'id' => 'required|exists:daily_habits,id',
                'exercise' => 'required|integer|between:1,5',
                'productivity' => 'required|integer|between:1,5',
                'mood' => 'required|integer|between:1,5',
                'sleep' => 'required|integer|between:1,5',
                'nutrition' => 'required|integer|between:1,5',
            ]
        );
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        $habit = DailyHabit::find($request->id);
        if (!$habit) {
            return response()->json([
                'error' => 'Habit not found.'
            ], 404);
        }

        $habit->update($validator->validated());

        return response()->json([
            'success' => 'Habit updated successfully.',
        ], 201);
    }

    public function history(Request $request)
    {
        $habits = DailyHabit::where('client_id', $request->client_id)
            ->orderBy('created_at', 'desc')
            ->limit(30)
            ->get();

        return response()->json($habits);
    }

}
