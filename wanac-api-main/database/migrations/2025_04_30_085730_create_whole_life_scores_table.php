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
        Schema::create('whole_life_scores', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->constrained()->onDelete('cascade');
            $table->unsignedTinyInteger('health');
            $table->unsignedTinyInteger('relationship');
            $table->unsignedTinyInteger('career');
            $table->unsignedTinyInteger('finances');
            $table->unsignedTinyInteger('personal_growth');
            $table->unsignedTinyInteger('recreation');
            $table->unsignedTinyInteger('spirituality');
            $table->unsignedTinyInteger('community');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('whole_life_scores');
    }
};
