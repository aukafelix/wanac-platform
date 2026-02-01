<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    public function index(Request $request){
        $clients  = Client::with('user')->get();

        return response()->json([
            'clients' => $clients
        ]);
    }
}
