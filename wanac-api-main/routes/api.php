<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\CoachController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\CommunityController;
use App\Http\Controllers\DailyHabitController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\FireTeamController;
use App\Http\Controllers\JournalController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ProgramController;
use App\Http\Controllers\RecordingController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\WholeLifeScoreController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group(['prefix' => 'v1'], function () {
    Route::group(['prefix' => 'auth'], function () {
        Route::post('/register', [AuthController::class, 'register'])->name('auth.register');
        Route::post('/login', [AuthController::class, 'login'])->name('auth.login');
        Route::post('/reset-password', [AuthController::class, 'resetPassword'])->name('password.reset');
        Route::post('/forgot-password', [AuthController::class, 'forgotPassword'])->name('auth.forgot-password');
        Route::post('/update-password', [AuthController::class, 'updatePassword'])->name('auth.update-password')->middleware('auth:api');
    });
    Route::group(['middleware' => 'auth:api'], function () {
        Route::group(['prefix' => 'profile'], function () {
            Route::get('', [ProfileController::class, 'profile'])->name('user.profile');
            Route::get('/update', [ProfileController::class, 'update'])->name('user.profile.update');
        });
        Route::group(['prefix' => 'sessions'], function () {
            Route::get('', [SessionController::class, 'index']);
            Route::post('/add', [SessionController::class, 'store']);
            Route::put('/update/{coachingSession}', [SessionController::class, 'update']);
            Route::get('/{coachingSession}', [SessionController::class, 'show']);
            Route::delete('/delete/{coachingSession}', [SessionController::class, 'delete']);
            Route::post('/notes/add', [SessionController::class, 'addSessionNote']);
            Route::put('/notes/update/{sessionNote}', [SessionController::class, 'updateSessionNote']);
            Route::delete('/notes/delete/{sessionNote}', [SessionController::class, 'deleteSessionNote']);
            Route::post('/resources/add', [SessionController::class, 'addSessionResource']);
            Route::put('/resources/update/{sessionResource}', [SessionController::class, 'updateSessionResource']);
            Route::delete('/resources/delete/{sessionResource}', [SessionController::class, 'deleteSessionResource']);
            Route::post('/members/add', [SessionController::class, 'addMember']);
            Route::delete('/members/delete/{sessionMember}', [SessionController::class, 'deleteMember']);
        });

        Route::group(['prefix' => 'tasks'], function () {
            Route::get('', [TaskController::class, 'index']);
            Route::post('/add', [TaskController::class, 'create']);
            Route::put('/update/{task}', [TaskController::class, 'update']);
            Route::delete('/delete/{task}', [TaskController::class, 'destroy']);
        });

        Route::group(['prefix' => 'communities'], function () {
            Route::get('', [CommunityController::class, 'index']);
            Route::get('/{community}', [CommunityController::class, 'show']);
            Route::post('/add', [CommunityController::class, 'store']);
            Route::put('/update/{community}', [CommunityController::class, 'update']);
            Route::delete('/delete', [CommunityController::class, 'destroy']);

            Route::group(['prefix' => 'posts'], function () {
                Route::post('/add', [PostController::class, 'create']);
                Route::put('/update/{post}', [PostController::class, 'update']);
                Route::delete('/delete/{post}', [PostController::class, 'destroy']);
                Route::post('/comment/add', [CommentController::class, 'create']);
                Route::put('/comment/update/{comment}', [CommentController::class, 'update']);
                Route::delete('/comment/delete/{comment}', [CommentController::class, 'destroy']);
            });
        });

        Route::group(['prefix' => 'daily-habits'], function () {
            Route::get('/today', [DailyHabitController::class, 'showToday']);
            Route::post('/add', [DailyHabitController::class, 'store']);
            Route::put('/update', [DailyHabitController::class, 'update']);
            Route::get('/history', [DailyHabitController::class, 'history']);
        });

        Route::group(['prefix' => 'whole-life-scores'], function () {
            Route::get('', [WholeLifeScoreController::class, 'index']);
            Route::post('/add', [WholeLifeScoreController::class, 'store']);
            Route::put('/update', [WholeLifeScoreController::class, 'update']);
        });


        Route::group(['prefix' => 'journals'], function () {
            Route::get('', [JournalController::class, 'index']);
            Route::post('/add', [JournalController::class, 'store']);
            Route::put('/update/{journal}', [JournalController::class, 'update']);
            Route::delete('/delete/{journal}', [JournalController::class, 'destroy']);
        });

        Route::group(['prefix' => 'events'], function () {
            Route::get('', [EventController::class, 'index']);
            Route::post('/add', [EventController::class, 'store']);
            Route::put('/update/{event}', [EventController::class, 'update']);
            Route::delete('/delete/{event}', [EventController::class, 'destroy']);
        });

        Route::get('clients', [ClientController::class, 'index']);

        Route::group(['prefix' => 'programs'], function () {
            Route::get('', [ProgramController::class, 'index']);
            Route::post('/add', [ProgramController::class,'addProgram']);
            Route::put('/update/{program}', [ProgramController::class,'updateProgram']);
            Route::delete('/delete/{program}', [ProgramController::class, 'deleteProgram']);
            Route::get('/{program}', [ProgramController::class, 'getProgram']);

            Route::post('/cohort/add', [ProgramController::class, 'addCohort']);
            Route::put('/cohort/update/{cohort}', [ProgramController::class, 'updateCohort']);
            Route::delete('/cohort/delete/{cohort}', [ProgramController::class, 'deleteCohort']);
            Route::get('/cohort/{cohort}', [ProgramController::class, 'getCohort']);

            Route::post('/cohort-member/add', [ProgramController::class, 'addCohortMember']);
            Route::delete('/cohort-member/delete/{cohortMember}', [ProgramController::class, 'deleteCohortMember']);

            Route::post('/unit/add', [ProgramController::class, 'addUnit']);
            Route::put('/unit/update/{unit}', [ProgramController::class, 'updateUnit']);
            Route::delete('/unit/delete/{unit}', [ProgramController::class, 'deleteUnit']);

            Route::post('/unit-resource/add', [ProgramController::class, 'addUnitResource']);
            Route::put('/unit-resource/update/{unitResource}', [ProgramController::class, 'updateUnitResource']);
            Route::delete('/unit-resource/delete/{unitResource}', [ProgramController::class, 'deleteUnitResource']);
        });

        Route::get('cohorts',[ProgramController::class, 'getCohorts']);
        Route::get('coaches', [CoachController::class, 'index']);

        Route::group(['prefix' => 'fireteams'], function () {
            Route::get('', [FireteamController::class, 'index']);
            Route::post('/add', [FireteamController::class, 'store']);
            Route::put('/update/{fireteam}', [FireteamController::class, 'update']);
            Route::delete('/delete/{fireteam}', [FireteamController::class, 'destroy']);
            Route::get('/{fireteam}', [FireTeamController::class,'show']);

            Route::post('/member/add', [FireteamController::class, 'addFireTeamMember']);
            Route::delete('/member/delete/{fireteamMember}', [FireteamController::class, 'deleteFireTeamMember']);

            Route::post('/experience/add', [FireTeamController::class, 'addFireTeamExperience']);
            Route::delete('/experience/delete/{fireTeamExperience}', [FireTeamController::class, 'deleteFireTeamExperience']);
            Route::get('/experiences/{fireTeam}', [FireTeamController::class, 'getFireTeamExperiences']);
            Route::put('/experience/update/{fireTeamExperience}', [FireTeamController::class, 'updateFireTeamExperience']);
            Route::get('/members/{fireTeam}', [FireTeamController::class, 'getFireTeamMembers']);

            Route::post('/experience/agenda-step/add', [FireTeamController::class, 'addFireTeamExperienceAgendaStep']);
            Route::delete('/experience/agenda-step/delete/{agendaStep}', [FireTeamController::class, 'deleteFireTeamExperienceAgendaStep']);

            Route::post('/experience/exhibit/add', [FireTeamController::class, 'addFireTeamExperienceExhibit']);
            Route::delete('/experience/exhibit/delete/{agendaStep}', [FireTeamController::class, 'deleteFireTeamExperienceExhibit']);

            Route::post('/objectives/add',[FireTeamController::class,'addObjective']);
            Route::delete('/objectives/delete/{id}', [FireTeamController::class,'deleteObjective']);

            Route::post('/recordings/add', [RecordingController::class, 'store']);
            Route::get('/recordings/{fireTeamId}',[RecordingController::class, 'recordings']);
            Route::get('/recordings/summary/admin/{recordingId}',[RecordingController::class,'adminSummary']);
            Route::get('/recordings/summary/coach/{recordingId}',[RecordingController::class,'coachSummary']);
            Route::get('/recordings/summary/client/{recordingId}/{clientId}',[RecordingController::class,'clientSummary']);
        });

    });
});
