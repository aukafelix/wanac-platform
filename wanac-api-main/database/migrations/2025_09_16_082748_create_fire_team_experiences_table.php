<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('fire_team_experiences', function (Blueprint $table) {
            $table->id();
            $table->foreignId('fire_team_id')->constrained('fire_teams')->onDelete('cascade');
            $table->foreignId('added_by')->constrained('users')->onDelete('cascade');
            $table->foreignId('admin')->nullable();
            $table->longText('experience')->nullable();
            $table->string('title')->nullable();
            $table->string('link')->nullable();
            $table->string('status')->nullable();
            $table->longText('report')->nullable();
            $table->longText('summary')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fire_team_experiences');
    }
};
