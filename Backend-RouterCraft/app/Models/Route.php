<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Route extends Model
{
    use HasFactory;

    protected $fillable = [
        // falta estructurar los campos de la tabla ruta
        'name',
        'description',
        'storage',
        
        'distance',
        'duration',
        'user_id',
    ];
}
