<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Coach;
use App\Models\User;
use Auth;
use DB;
use Exception;
use Hash;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Password;
use Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'role' => 'required|string',
            'password' => 'required_if:social,false|string|min:8|confirmed',
            'social' => 'required|boolean',
            'provider' => 'required_if:social,true',
            'provider_id' => 'required_if:social,true',

        ]);


        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        DB::beginTransaction();
        try {

            $user = $request->social ? User::create([
                'name' => $request->name,
                'email' => $request->email,
                'provider' => $request->provider,
                'provider_id' => $request->provider_id,
            ]) : User::create([
                            'name' => $request->name,
                            'email' => $request->email,
                            'password' => $request->password
                        ]);



            $pic = "";
            // if ($request->has('profilePic')) {
            //     $fileName = time() . '_' . $request->profilePic->getClientOriginalName();
            //     $request->profilePic->move(public_path('files/profilePics'), $fileName);
            //     $pic = '/files/profilePics/' . $fileName;
            // }
            if ($request->role === 'coach') {
                Coach::create([
                    'user_id' => $user->id,
                    'timezone' => $request->timezone,
                    'profilePic' => $pic,
                    'newsletter' => $request->newsletter,
                    'referralCode' => $request->referralCode,
                    'preferredContact' => $request->preferredContact,
                    'bio' => $request->bio
                ]);
                $user->assignRole('coach');
            }

            if ($request->role === 'client') {
                Client::create([
                    'user_id' => $user->id,
                    'timezone' => $request->timezone,
                    'profilePic' => $pic,
                    'newsletter' => $request->newsletter,
                    'referralCode' => $request->referralCode,
                    'preferredContact' => $request->preferredContact,
                    'specialty' => $request->specialty,
                    'bio' => $request->bio
                ]);
                $user->assignRole('client');

            }

            if ($request->role === 'admin') {
                $user->assignRole('admin');
            }

            DB::commit();
            return response()->json([
                'message' => 'You have registered successfully',
            ], 201);

        } catch (Exception $ex) {
            DB::rollBack();
            return response()->json(['error' => $ex->getMessage()], 401);

        }

    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255',
            'role' => 'required|string',
            'password' => 'required_if:social,false|string|min:8',
            'social' => 'required|boolean',
            'provider' => 'required_if:social,true',
            'provider_id' => 'required_if:social,true',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        if ($request->social) {
            $user = User::where('provider_id', $request->provider_id)->first();
            if (!$user) {
                return response()->json([
                    'error' => 'Invalid login credentials',
                ], 401);
            }
        }

        $credentials = $request->only('email', 'password');
        if (!Auth::attempt($credentials)) {
            return response()->json([
                'error' => 'Invalid login credentials',
            ], 401);
        }
        $user = Auth::user();

        if (!$user->hasRole($request->role)) {
            Auth::logout();
            return response()->json([
                'error' => 'You do not have the required permissions. Please contact the admin for further assistance.',
            ], 403);
        }
        $token = $user->createToken('authToken')->accessToken;

        if ($request->role === "coach") {
            $user = $user->load("coach");
        }
        if ($request->role === "client") {
            $user = $user->load("client");
        }

        return response()->json([
            'message' => 'Successfully logged in.',
            'user' => $user,
            'token' => $token,
        ], 201);
    }

    public function resetPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|exists:users,email',
            'password' => 'required|string|min:8|confirmed',
            'token' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->save();
            }
        );

        return $status == Password::PASSWORD_RESET
            ? response()->json(['message' => __($status)], 200)
            : response()->json(['message' => __($status)], 500);

    }

    public function updatePassword(Request $request)
    {

    }

    public function forgotPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users,email',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $status = Password::sendResetLink(
            $request->only('email')
        );

        return $status === Password::RESET_LINK_SENT
            ? response()->json(['message' => __($status)], 200)
            : response()->json(['message' => __($status)], 500);
    }
}
