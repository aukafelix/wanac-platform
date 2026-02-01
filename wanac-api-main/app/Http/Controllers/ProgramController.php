<?php

namespace App\Http\Controllers;

use App\Models\Cohort;
use App\Models\CohortMember;
use App\Models\Program;
use App\Models\Unit;
use App\Models\UnitResource;
use Auth;
use Exception;
use Illuminate\Http\Request;
use Validator;

class ProgramController extends Controller
{
    public function index()
    {
        $programs = Program::with(
            'units',
            'cohorts.cohortMembers',
            )->get();
        return response()->json([
            'programs' => $programs
        ]);
    }

    public function getProgram(Program $program)
    {
        return response()->json([
            'program' => $program
        ]);
    }

    public function addProgram(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }
        try {
            $program = Program::create([
                'title' => $request->title,
                'added_by' => auth()->id(),
                'description' => $request->description,
            ]);

            return response()->json([
                'success' => 'Program added successfully.'
            ], 201);
        } catch (Exception $ex) {
            return response()->json([
                'error' => $ex->getMessage()
            ]);
        }
    }
    public function deleteProgram(Program $program)
    {
        $program->delete();
        return response()->json([
            'success' => 'Program deleted successfully.'
        ]);
    }
    public function updateProgram(Request $request, Program $program)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'required|string',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }
        $program->update([
            'title' => $request->title,
            'description' => $request->description,
        ]);
        return response()->json([
            'success' => 'Program updated successfully.'
        ]);
    }



    public function addCohort(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'program_id' => 'required|exists:programs,id',
            'name' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }
        try {
            $cohort = Cohort::create([
                'program_id' => $request->program_id,
                'name' => $request->name,
                'start_date' => $request->start_date,
                'end_date' => $request->end_date,
                'added_by' => Auth::id(),
            ]);

            return response()->json([
                'success' => 'Cohort added successfully.'
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ]);
        }


    }

    public function updateCohort(Request $request, Cohort $cohort)
    {
        $validator = Validator::make($request->all(), [
            'program_id' => 'required|exists:programs,id',
            'name' => 'required|string|max:255',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after:start_date',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }
        $cohort->update([
            'program_id' => $request->program_id,
            'name' => $request->name,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
        ]);
        return response()->json([
            'success' => 'Cohort updated successfully.'
        ]);
    }

    public function deleteCohort(Cohort $cohort)
    {
        $cohort->delete();
        return response()->json([
            'success' => 'Cohort deleted successfully.'
        ]);
    }

    public function addCohortMember(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'cohort_id' => 'required|exists:cohorts,id',
            'client_id' => 'required|exists:clients,id',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }
        try {
            $cohortMember = CohortMember::create([
                'cohort_id' => $request->cohort_id,
                'client_id' => $request->client_id,
            ]);

            return response()->json([
                'success' => 'Cohort member added successfully.'
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ]);
        }
    }

    public function deleteCohortMember(CohortMember $cohortMember)
    {
        $cohortMember->delete();
        return response()->json([
            'success' => 'Cohort member deleted successfully.'
        ]);
    }

    public function addUnit(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'program_id' => 'required|exists:programs,id',
            'name' => 'required|string|max:255',
            'description' => 'required|string',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }
        try {
            $unit = Unit::create([
                'program_id' => $request->program_id,
                'name' => $request->name,
                'added_by' => Auth::id(),
                'description' => $request->description,
            ]);

            return response()->json([
                'success' => 'Unit added successfully.'
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'error' => $e->getMessage()
            ]);
        }
    }
    public function updateUnit(Request $request, Unit $unit)
    {
        $validator = Validator::make($request->all(), [
            'program_id' => 'required|exists:programs,id',
            'name' => 'required|string|max:255',
            'description' => 'required|string',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }
        $unit->update([
            'program_id' => $request->program_id,
            'name' => $request->name,
            'description' => $request->description,
        ]);
        return response()->json([
            'success' => 'Unit updated successfully.'
        ]);
    }

    public function deleteUnit(Unit $unit)
    {
        $unit->delete();
        return response()->json([
            'success' => 'Unit deleted successfully.'
        ]);
    }

    public function addUnitResource(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'unit_id' => 'required|exists:units,id',
            'name' => 'required|string|max:255',

            'description' => 'required|string',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            if ($request->hasFile('file')) {
                $file = $request->file('file');
                $extension = $file->getClientOriginalExtension();
                $fileName = time() . '.' . $extension;
                $file->move(public_path('uploads/resources/unit'), $fileName);
                $dir = '/uploads/resources/unit/' . $fileName;
            }
            UnitResource::create([
                'unit_id' => $request->unit_id,
                'name' => $request->name,
                'description' => $request->description,
                'added_by' => Auth::id(),
                'dir' => $dir,
            ]);
            return response()->json([
                'success' => 'Unit resource added successfully.'
            ]);
        } catch (Exception $ex) {
            return response()->json([
                'error' => $ex->getMessage()
            ]);
        }



    }

    public function updateUnitResource(Request $request, UnitResource $unitResource)
    {
        $validator = Validator::make($request->all(), [
            'unit_id' => 'required|exists:units,id',
            'name' => 'required|string|max:255',
            'description' => 'required|string',
            'added_by' => 'required|exists:users,id',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            if ($request->hasFile('file')) {
                $file = $request->file('file');
                $extension = $file->getClientOriginalExtension();
                $fileName = time() . '.' . $extension;
                $file->move(public_path('uploads/resources/unit'), $fileName);
                $dir = '/uploads/resources/unit/' . $fileName;
            }

            $unitResource->update([
                'unit_id' => $request->unit_id,
                'name' => $request->name,
                'description' => $request->description,
                'dir' => $dir,
            ]);
            return response()->json([
                'success' => 'Unit resource updated successfully.'
            ]);
        } catch (Exception $ex) {
            return response()->json([
                'error' => $ex->getMessage()
            ]);
        }


    }


    public function deleteUnitResource(UnitResource $unitResource)
    {
        $unitResource->delete();
        return response()->json([
            'success' => 'Unit resource deleted successfully.'
        ]);
    }

    public function getCohorts(){
        $cohorts = Cohort::with('program')->get();
        return response()->json($cohorts);
    }


}
