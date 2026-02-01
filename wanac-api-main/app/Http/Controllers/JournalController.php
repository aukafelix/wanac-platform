<?php

namespace App\Http\Controllers;

use App\Models\Journal;
use Auth;
use Exception;
use Illuminate\Http\Request;
use Validator;

class JournalController extends Controller
{
    // List all journals
    public function index()
    {
        return response()->json(Journal::all());
    }

    // Show single journal
    public function show(Journal $journal)
    {
        return response()->json($journal);
    }

    // Create new journal
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }
        try {

            $data = $validator->validated();
            $data['client_id'] = Auth::user()->client->id;

            Journal::create($data);

            return response()->json([
                'success' => 'Journal created successfully.',
            ], 201);
        } catch (Exception $ex) {
            return response()->json([
                'error' => $ex->getMessage()
            ]);
        }

    }

    // Update journal
    public function update(Request $request, Journal $journal)
    {

        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        try {
            $journal->update($validator->validated());
            return response()->json([
                'success' => 'Journal updated successfully.',
            ], 201);
        } catch (Exception $ex) {
            return response()->json([
                'error' => $ex->getMessage()
            ]);
        }

    }

    // Delete journal
    public function destroy(Journal $journal)
    {

        $journal->delete();

        return response()->json(['success' => 'Journal deleted successfully'], 201);
    }
}
