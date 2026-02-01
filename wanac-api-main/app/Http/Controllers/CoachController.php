<?php

namespace App\Http\Controllers;

use App\Models\Coach;
use Illuminate\Http\Request;

class CoachController extends Controller
{
    public function index(Request $request){
        $coaches = Coach::query();
        if ($request->has('search')) {
            $coaches->whereHas('user', function ($query) use ($request) {
                $query->where('name', 'like', '%'.$request->search.'%')
                    ->orWhere('email', 'like', '%'.$request->search.'%');
            }  );

        }
        $coaches = $coaches->with('user')->paginate(20);

        return response()->json([
            'coaches' => $coaches
        ]);

    }
}
