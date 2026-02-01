<?php

namespace App\Http\Controllers;

use App\Models\CoachingSession;
use App\Models\SessionMember;
use App\Models\SessionNote;
use App\Models\SessionResource;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Str;
use Validator;

class SessionController extends Controller
{
    public function index(Request $request)
    {
        $sessions = CoachingSession::query();

        if ($request->has('client_id')) {
            $sessions->where('client_id', $request->client_id);
        }

        if ($request->has('coach_id')) {
            $sessions->where('coach_id', $request->coach_id);
        }
        $sessions = $sessions->with('coach.user')->paginate(10);
        return response()->json([
            'sessions' => $sessions
        ]);
    }
    private function generateSessionNumber()
    {
        $prefix = 'SESSION';
        $date = now()->format('Ymd');
        $random = strtoupper(Str::random(6));

        return "{$prefix}-{$date}-{$random}";
    }
    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'scheduled_at' => 'required|date|after:now',
            'title' => 'required',
            'description' =>  'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $meetingCode = Str::slug($request->title, '-') . '-' . Str::random(6);
            $meetingLink = "https://meet.jit.si/{$meetingCode}";

           $session = CoachingSession::create([
                'title' => $request->title,
                'description' => $request->description,
                'session_link' => $meetingLink,
                'coach_id' => Auth::user()->coach->id,
                'scheduled_at' => $request->scheduled_at,
                'session_number' => $this->generateSessionNumber(),
            ]);

            return response()->json([
                'success' => 'Session created successfully',
                'session' => $session
            ]);
        } catch (Exception $ex) {
            return response()->json([
                'error' => $ex->getMessage()
            ]);
        }

    }

    public function update(Request $request, CoachingSession $coachingSession){
        $validator = Validator::make($request->all(), [
            'scheduled_at' => 'required|date|after:now',
            'title' => 'required',
            'description' =>  'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $coachingSession->update($validator->validated());
            return response()->json([
                'success' => 'Session updated successfully'
            ]);

        } catch (Exception $ex) {
            return response()->json([
                'error' => $ex->getMessage()
            ]);
        }
    }

    public function show(CoachingSession $coachingSession){
        $coachingSession->load([
            'coach.user',
            'sessionNotes.user',
            'sessionResources.user',
            'sessionMembers.client.user'
        ]);
        return response()->json([
            'session' => $coachingSession
        ]);
    }
    public function delete(Request $request, CoachingSession $coachingSession){
        $coachingSession->delete();
        return response()->json([
            'success' => 'Session deleted sucessfully'
        ]);
    }

    public function addSessionNote(Request $request){
        $validator = Validator::make($request->all(), [
            'session_id' => 'required|exists:coaching_sessions,id',
            'notes' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            SessionNote::create([
                'user_id' => Auth::user()->id,
                'coaching_session_id' => $request->session_id,
                'note' => $request->notes
            ]);
            return response()->json([
                'success' => 'Note added successfully'
            ]);
        } catch (Exception $ex) {
            return response()->json([
                'error' => $ex->getMessage()
            ]);
        }

    }

    public function updateSessionNote(Request $request, SessionNote $sessionNote){
        $validator = Validator::make($request->all(), [
            'note' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }
        try {
            $sessionNote->update($validator->validated());
            return response()->json([
                'success' => 'Notes updated successfully'
            ]);
        } catch (Exception $ex) {
            return response()->json([
                'error' => $ex->getMessage()
            ]);
        }
    }

    public function deleteSessionNote(SessionNote $sessionNote){
        $sessionNote->delete();
    }
    public function addSessionResource(Request $request){
        $validator = Validator::make($request->all(), [
            'session_id' => 'required|exists:coaching_sessions,id',
            'name' => 'required',
            'description' => 'required',
            'file' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }
        $file_dir = "";
        if ($request->has('file')) {
            $fileName = time() . '_' . $request->file->getClientOriginalName();
            $request->file->move(public_path('files'), $fileName);
            $file_dir = '/files/' . $fileName;
        }
        try {
            SessionResource::create([
                'user_id' => Auth::user()->id,
                'coaching_session_id' => $request->session_id,
                'name' => $request->name,
                'description' => $request->description,
                'file_dir' => $file_dir,
            ]);
            return response()->json([
                'success' => 'Resource added successfully'
            ]);
        } catch (Exception $ex) {
            return response()->json([
                'error' => $ex->getMessage()
            ]);
        }

    }

    public function updateSessionResource(Request $request, SessionResource $sessionResource){
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'description' => 'required',
            'file' => 'required',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }
        $file_dir = "";
        if ($request->has('file')) {
            $fileName = time() . '_' . $request->file->getClientOriginalName();
            $request->file->move(public_path('files'), $fileName);
            $file_dir = '/files/' . $fileName;
        }
        try {
            $sessionResource->update([
                'name' => $request->name,
                'description' => $request->description,
                'file_dir' => $file_dir,
            ]);
            return response()->json([
                'success' => 'Resource updated successfully'
            ]);
        } catch (Exception $ex) {
            return response()->json([
                'error' => $ex->getMessage()
            ]);
        }

    }

    public function deleteSessionResource(SessionResource $sessionResource){
        $sessionResource->delete();
        return response()->json([
            'success' => 'Member removed successfully'
        ]);
    }

    public function addMember(Request $request){
        $validator = Validator::make($request->all(),[
            'session_id' => 'required|exists:coaching_sessions,id',
            'client_id' => 'required|exists:clients,id'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }
        try {
            SessionMember::create([
                'coaching_session_id' => $request->session_id,
                'client_id' => $request->client_id
            ]);
            return response()->json([
                'success' => 'Member added successfully'
            ]);
        } catch (Exception $ex) {
            return response()->json([
                'error' => $ex->getMessage()
            ]);
        }
    }

    public function deleteMember(SessionMember $sessionMember){
        $sessionMember->delete();
        return response()->json([
            'success' => 'Member removed successfully'
        ]);
    }
}
