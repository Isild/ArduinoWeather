<?php

namespace App\Http\Controllers;

use App\Models\Measurement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MeasurementController extends Controller
{
    /**
     * Get data for 24h
     */
    public function get24HMeasurement(){
        return DB::select('
            SELECT date, temperature, air_pressure, air_humidity, rainfall, soil_moisture
            FROM measurement
            WHERE date > DATE_SUB(NOW(), INTERVAL 1 DAY);
        ');
            /*DB::table('measurement')
            ->select('date', 'temperature', 'air_pressure', 'air_humidity', 'rainfall', 'soil_moisture')
            ->whereYear('date', '=', $year)
            ->whereMonth('date', '=', $month)
            ->whereDay('date', '', $day-1)
            ->get();*/
    }
}
