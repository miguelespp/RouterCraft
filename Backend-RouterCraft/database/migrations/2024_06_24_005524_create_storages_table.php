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
        Schema::create('storages', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('name')->nullable();
            $table->integer('latitude');
            $table->integer('longitude');
            $table->unsignedBigInteger('operation_id');
            $table->foreign('operation_id')->references('id')->on('operations')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('storages');
    }
};
