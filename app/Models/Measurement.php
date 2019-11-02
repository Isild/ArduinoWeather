<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Measurement extends Model
{
    /**
     * Name of table
     */
    protected $table = 'measurement';

    /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'id';

    /**
     * The attributes that are get from database.
     *
     * @var array
     */
    protected $fillable = [
        'date', 'temperature', 'air_pressure', 'air_humidity', 'rainfall', 'soil_moisture',
    ];
}
