<?php

namespace App\Http\Controllers;

use App\Jobs\TranscribeRecordingJob;
use App\Models\Recording;
use Exception;
use Illuminate\Http\Request;
use Validator;

class RecordingController extends Controller
{
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            "fire_team_id" => "required|exists:fire_teams,id",
            'file' => 'required|file|mimetypes:audio/webm,audio/wav,audio/mpeg'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $path = $request->file('file')->store('recordings');
            $filename = 'recording_' . Str::uuid() . '.' . $request->file('file')->getClientOriginalExtension();
            $request->file('file')->move(public_path('files/recordings'), $filename);
            $path = 'files/recordings/' . $filename;

           $recording = Recording::create([
                'fire_team_id' => $request->fire_team_id,
                'file_dir' => $path
            ]);

            TranscribeRecordingJob::dispatch($recording);

            return response()->json([
                'message' => 'Recording uploaded successfully.',
                'path' => $path
            ]);
        } catch (Exception $ex) {
            return response()->json([
                'error' => $ex->getMessage()
            ]);
        }


    }

    public function recordings($id)
    {
        $recordings = Recording::where('fire_team_id', $id)->get();
        return response()->json([
            'recordings' => $recordings
        ]);
    }

    public function adminSummary($id)
    {
        $recording = Recording::find($id);
        return response()->json([
            'summary' => $recording->summary  ?? 'No available summary at the moment'
        ]);
    }

    public function coachSummary($id)
    {
        $recording = Recording::find($id);
        return response()->json([
            'summary' => $recording->coach_summary  ?? 'No available summary at the moment'
        ]);
    }

    public function clientSummary($id, $client)
    {
        $recording = Recording::find($id);
        return response()->json([
            'summary' => $recording->client_summary ?? 'No available summary at the moment'
        ]);
    }


}
