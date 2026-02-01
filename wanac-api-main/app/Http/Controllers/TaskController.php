<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Auth;
use Exception;
use Illuminate\Http\Request;
use Validator;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $tasks = Task::with('user')
            ->when($request->has('user_id'), function ($query) use ($request) {
                $query->where('user_id', $request->user_id);
            })
            ->when($request->has('status'), function ($query) use ($request) {
                $query->where('status', $request->status);
            })
            ->when($request->has('priority'), function ($query) use ($request) {
                $query->where('priority', $request->priority);
            })
            ->when($request->has('due_date'), function ($query) use ($request) {
                $query->whereDate('due_date', $request->due_date);
            })
            ->latest()
            ->paginate(20);

        return response()->json($tasks);
    }
    public function create(Request $request)
    {

        try {
            $validator = Validator::make($request->all(), [
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'priority' => 'required|in:urgent-important,urgent-not-important,not-urgent-important,not-urgent-not-important',
                'due_date' => 'required|date',
                'status' => 'required|in:pending,in_progress,completed',
            ]);

            if ($validator->fails()) {
                return response()->json([
                    'errors' => $validator->errors(),
                ], 422);
            }
            $data = $validator->validated();
            $data['user_id'] = Auth::user()->id;
            Task::create($data);

            return response()->json([
                'message' => 'Task created successfully.',
            ], 201);
        } catch (Exception $ex) {
            return response()->json([
                'error' => $ex->getMessage()
            ]);
        }


    }

    public function update(Request $request, Task $task)
    {

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'sometimes|in:urgent-important,urgent-not-important,not-urgent-important,not-urgent-not-important',
            'due_date' => 'nullable|date',
            'status' => 'sometimes|in:pending,in_progress,completed',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }
        try {

            $task->update($validator->validated());

            return response()->json([
                'message' => 'Task updated successfully.',
            ]);
        } catch (Exception $ex) {
            return response()->json([
                'error' => $ex->getMessage()
            ]);
        }

    }

    public function destroy(Request $request, Task $task)
    {

        $task->delete();

        return response()->json([
            'success' => 'Task deleted successfully.'
        ]);
    }


}
