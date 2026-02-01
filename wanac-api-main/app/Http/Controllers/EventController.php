<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Auth;
use Exception;
use Illuminate\Http\Request;
use Validator;

class EventController extends Controller
{
    public function index(Request $request){
        $events = Event::query();

        if ($request->has('search')) {
            $events->whereLike('title', $request->search);
        }

        $events = $events->with('user')->latest()->paginate(10);

        return response()->json([
            'events' => $events
        ], 201);
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(),[
            'type' => 'required',
            'location' => 'required_if:type,Physical',
            'link' => 'required_if:type,Online',
            'date' => 'required',
            'time' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $data = $validator->validated();
            $data['user|_id'] = Auth::id();

            Event::create($data);
            return response()->json([
                'success' => 'Event created successfully.',
            ], 201);
        } catch (Exception $ex) {
            return response()->json([
                'error' => $ex->getMessage()
            ]);
        }
    }
    public function update(Request $request, Event $event){
        $validator = Validator::make($request->all(),[
            'type' => 'required',
            'location' => 'required_if:type,Physical',
            'link' => 'required_if:type,online',
            'date' => 'required',
            'time' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $event->update($validator->validated());
            return response()->json([
                'success' => 'Event updated successfully.',
            ], 201);
        } catch (Exception $ex) {
            return response()->json([
                'error' => $ex->getMessage()
            ]);
        }
    }

    public function destroy(Event $event){
        $event->delete();
        return response()->json([
            'success' => 'Post deleted successfully.'
        ]);
    }
}


