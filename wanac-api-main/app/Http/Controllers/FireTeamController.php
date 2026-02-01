<?php

namespace App\Http\Controllers;

use App\Models\FireTeam;
use App\Models\FireTeamExperience;
use App\Models\FireTeamExperienceAgendaStep;
use App\Models\FireTeamExperienceExhibit;
use App\Models\FireTeamExperienceObjective;
use App\Models\FireTeamMember;
use Auth;
use Exception;
use Illuminate\Http\Request;
use Validator;

class FireTeamController extends Controller
{
    public function index(Request $request)
    {
        $fireTeams = FireTeam::query();

        if ($request->has('search')) {
            $fireTeams->where('title', 'like', '%' . $request->search . '%')
                ->orWhereHas('cohort', function ($query) use ($request) {
                    $query->where('name', 'like', '%' . $request->search . '%');
                });
        }
        if ($request->has('cohort_id')) {
            $fireTeams->where('cohort_id', $request->cohort_id);
        }
        $fireTeams = $fireTeams->with('cohort', 'createdBy')->latest()->paginate(10);

        return response()->json([
            'fireTeams' => $fireTeams
        ]);
    }

    public function show($id)
    {
        $fireTeam = FireTeam::with('cohort', 'createdBy', 'members.client.user', 'experiences.exhibits', 'experiences.agendaSteps', 'experiences.objectives')->find($id);
        return response()->json([
            'fireTeam' => $fireTeam
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'cohort_id' => ['required', 'exists:cohorts,id'],
            'title' => ['required', 'string'],
            'description' => ['required', 'string'],
            'date' => ['required', 'date'],
            'time' => ['required'],
            'link' => ['required', 'string'],
        ]);
        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()
            ], 400);
        }

        try {
            $fireTeam = FireTeam::create([
                'cohort_id' => $request->cohort_id,
                'title' => $request->title,
                'description' => $request->description,
                'date' => $request->date,
                'time' => $request->time,
                'created_by' => Auth::id(),
            ]);
            return response()->json([
                'success' => 'Fire team created successfully',
            ], 201);
        } catch (Exception $th) {
            return response()->json([
                'error' => $th->getMessage()
            ], 500);
        }


    }

    public function update(Request $request, FireTeam $fireTeam)
    {
        $validator = Validator::make($request->all(), [
            'cohort_id' => ['required', 'exists:cohorts,id'],
            'title' => ['required', 'string'],
            'description' => ['required', 'string'],
            'date' => ['required', 'date'],
            'time' => ['required'],
        ]);
        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()
            ], 400);
        }

        try {
            $fireTeam->cohort_id = $request->cohort_id;
            $fireTeam->title = $request->title;
            $fireTeam->description = $request->description;
            $fireTeam->date = $request->date;
            $fireTeam->time = $request->time;
            $fireTeam->save();
            return response()->json([
                'success' => 'Fire team updated successfully',
            ], 200);
        } catch (Exception $th) {
            return response()->json([
                'error' => $th->getMessage()
            ], 500);
        }


    }

    public function destroy(FireTeam $fireTeam)
    {
        $fireTeam->delete();
        return response()->json([
            'success' => 'Fire team deleted successfully'
        ]);
    }

    public function addFireTeamMember(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'client_id' => ['required', 'exists:clients,id'],
            'fire_team_id' => ['required', 'exists:fire_teams,id'],
        ]);
        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()
            ], 400);
        }
        //check if member already exists
        $existingMember = FireTeamMember::where('client_id', $request->client_id)
            ->where('fire_team_id', $request->fire_team_id)
            ->first();
        if ($existingMember) {
            return response()->json([
                'error' => 'Member already exists in the fire team'
            ], 400);
        }
        try {
            FireTeamMember::create([
                'fire_team_id' => $request->fire_team_id,
                'client_id' => $request->client_id,
            ]);
            return response()->json([
                'success' => 'Fire team member added successfully',
            ], 201);
        } catch (Exception $th) {
            return response()->json([
                'error' => $th->getMessage()
            ], 500);
        }
    }
    public function deleteFireTeamMember($id)
    {
        $fireTeamMember = FireTeamMember::find($id);
        if (!$fireTeamMember) {
            return response()->json([
                'error' => 'Fire team member not found'
            ], 404);
        }

        $fireTeamMember->delete();
        return response()->json([
            'success' => 'Fire team member removed successfully'
        ]);
    }

    public function addFireTeamExperience(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'fire_team_id' => ['required', 'exists:fire_teams,id'],
            'title' => ['required', 'string'],
            'experience' => ['required', 'string'],
            'link' => ['nullable', 'string'],
            'status' => ['nullable', 'string'],
            'report' => ['nullable', 'string'],
            'summary' => ['nullable', 'string'],
            'admin' => ['nullable', 'integer'],
        ]);
        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()
            ], 400);
        }

        try {
            $fireTeamExperience = FireTeamExperience::create([
                'fire_team_id' => $request->fire_team_id,
                'added_by' => Auth::id(),
                'title' => $request->title,
                'experience' => $request->experience,
                'link' => $request->link,
                'status' => $request->status,
                'report' => $request->report,
                'summary' => $request->summary,
                'admin' => $request->admin,
            ]);
            return response()->json([
                'success' => 'Fire team experience added successfully',
                'fireTeamExperience' => $fireTeamExperience
            ], 201);
        } catch (Exception $th) {
            return response()->json([
                'error' => $th->getMessage()
            ], 500);
        }
    }

    public function deleteFireTeamExperience(Request $request, FireTeamExperience $fireTeamExperience)
    {
        $fireTeamExperience->delete();
        return response()->json([
            'success' => 'Fire team experience removed successfully'
        ]);
    }

    public function updateFireTeamExperience(Request $request, FireTeamExperience $fireTeamExperience)
    {
        $validator = Validator::make($request->all(), [
            'title' => ['required', 'string'],
            'experience' => ['required', 'string'],
            'link' => ['nullable', 'string'],
            'status' => ['nullable', 'string'],
            'report' => ['nullable', 'string'],
            'summary' => ['nullable', 'string'],
            'admin' => ['nullable', 'integer'],

        ]);
        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()
            ], 400);
        }

        try {
            $fireTeamExperience->title = $request->title;
            $fireTeamExperience->experience = $request->experience;
            $fireTeamExperience->link = $request->link;
            $fireTeamExperience->status = $request->status;
            $fireTeamExperience->report = $request->report;
            $fireTeamExperience->summary = $request->summary;
            $fireTeamExperience->admin = $request->admin;
            $fireTeamExperience->save();
            return response()->json([
                'success' => 'Fire team experience updated successfully',
                'fireTeamExperience' => $fireTeamExperience
            ], 200);
        } catch (Exception $th) {
            return response()->json([
                'error' => $th->getMessage()
            ], 500);
        }
    }

    public function getFireTeamExperiences($id)
    {
        $fireTeamExperiences = FireTeamExperience::where('fire_team_id', $id)->with('addedBy')->latest()->get();
        return response()->json([
            'fireTeamExperiences' => $fireTeamExperiences
        ], 200);
    }

    public function getFireTeamMembers($id)
    {
        $fireTeamMembers = FireTeamMember::where('fire_team_id', $id)->with('client')->latest()->get();
        return response()->json([
            'fireTeamMembers' => $fireTeamMembers
        ], 200);
    }

    public function addFireTeamExperienceAgendaStep(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => ['required', 'string'],
            'duration' => ['nullable', 'string'],
            'fire_team_experience_id' => ['required', 'exists:fire_team_experiences,id'],
        ]);
        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()
            ], 400);
        }

        try {
            $agendaStep = FireTeamExperienceAgendaStep::create([
                'fire_team_experience_id' => $request->fire_team_experience_id,
                'title' => $request->title,
                'duration' => $request->duration,
                'added_by' => Auth::id(),
            ]);
            return response()->json([
                'success' => 'Agenda step added successfully',
            ], 201);
        } catch (Exception $th) {
            return response()->json([
                'error' => $th->getMessage()
            ], 500);
        }
    }

    public function deleteFireTeamExperienceAgendaStep($id)
    {
        $agendaStep = FireTeamExperienceAgendaStep::find($id);
        if (!$agendaStep) {
            return response()->json([
                'error' => 'Agenda step not found'
            ], 404);
        }
        $agendaStep->delete();
        return response()->json([
            'success' => 'Agenda step removed successfully'
        ]);
    }

    public function addFireTeamExperienceExhibit(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'fire_team_experience_id' => ['required', 'exists:fire_team_experiences,id'],
            'name' => ['required', 'string'],
            'type' => ['required', 'string'],
            'link' => ['required_if:type,link', 'string'],
        ]);
        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()
            ], 400);
        }
        $url = "";
        if ($request->type !== 'link') {
            if ($request->hasFile('file')) {
                $file = $request->file('file');
                $directory = "exhibits";
                $fileName = time() . '_' . $file->getClientOriginalName();
                $file->move(public_path("files/$directory"), $fileName);
                $url = "files/$directory/$fileName";
            }
        } else {
            $url = $request->link;
        }

        try {
            $exhibit = FireTeamExperienceExhibit::create([
                'fire_team_experience_id' => $request->fire_team_experience_id,
                'name' => $request->name,
                'type' => $request->type,
                'url' => $url,
                'added_by' => Auth::id(),
            ]);
            return response()->json([
                'success' => 'Exhibit added successfully',
            ], 201);
        } catch (Exception $th) {
            return response()->json([
                'error' => $th->getMessage()
            ], 500);
        }
    }

    public function deleteFireTeamExperienceExhibit($id)
    {
        $exhibit = FireTeamExperienceExhibit::find($id);

        if (!$exhibit) {
            return response()->json([
                'error' => 'Exhibit step not found'
            ], 404);
        }
        $exhibit->delete();
        return response()->json([
            'success' => 'Exhibit removed successfully'
        ]);
    }

    public function addObjective(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'fire_team_experience_id' => ['required', 'exists:fire_team_experiences,id'],
            'objective' => ['required', 'string'],

        ]);
        if ($validator->fails()) {
            return response()->json([
                'error' => $validator->errors()
            ], 400);
        }

        try {
            FireTeamExperienceObjective::create([
                'fire_team_experience_id' => $request->fire_team_experience_id,
                'objective' => $request->objective,
            ]);
            return response()->json([
                'success' => 'Objective added successfully',
            ], 201);
        } catch (Exception $th) {
            return response()->json([
                'error' => $th->getMessage()
            ], 500);
        }
    }

    public function deleteObjective($id)
    {
        $record = FireTeamExperienceObjective::find($id);
        if (!$record) {
            return response()->json([
                'error' => 'Objective not found'
            ], 404);
        }
        $record->delete();
        return response()->json([
            'success' => 'Objective removed successfully'
        ]);

    }
}
