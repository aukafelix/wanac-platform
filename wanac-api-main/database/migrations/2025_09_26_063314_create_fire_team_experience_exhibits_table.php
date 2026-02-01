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
        Schema::create('fire_team_experience_exhibits', function (Blueprint $table) {
            $table->id();
            $table->foreignId('fire_team_experience_id');
            $table->string('name');
            $table->string('type');
            $table->string('url')->nullable();
            $table->foreignId('added_by');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fire_team_experience_exhibits');
    }
};
