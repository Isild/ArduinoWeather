<?php

namespace App\Http\Controllers;

use App\Models\Measurement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MeasurementController extends Controller
{
    /**
     * Function getting data for 24h.
     */
    public function get24HMeasurement(){
        return DB::select('
            SELECT id AS number, date, temperature, air_pressure, air_humidity, rainfall, soil_moisture
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

    /**
     * Function returning data from last data to now.
     */
    public function getLastMeasurment($lastNumber){
        return DB::select('
            SELECT id AS number, date, temperature, air_pressure, air_humidity, rainfall, soil_moisture
            FROM measurement
            WHERE id > :number;
        ', ['number'=>$lastNumber]);
    }

    /**
     * Function returning data form given period of time.
     */
    public function getDataFromPeriod($yearStart, $monthStart, $dayStart, $hourStart, $minutesStart, $secondsStart, $yearEnd, $monthEnd, $dayEnd, $hourEnd, $minutesEnd, $secondsEnd){
        $dateTimeStart = $yearStart . "-" . $monthStart . "-" . $dayStart . " " . $hourStart . ":" . $minutesStart . ":" . $secondsStart;
        $dateTimeEnd = $yearEnd . "-" . $monthEnd . "-" . $dayEnd . " " . $hourEnd . ":" . $minutesEnd . ":" . $secondsEnd;

        return DB::select('
            SELECT id AS number, date, temperature, air_pressure, air_humidity, rainfall, soil_moisture
            FROM measurement
            WHERE date > :dateTimeStart
            AND date <= :dateTimeEnd;
        ',[
            'dateTimeStart'=>$dateTimeStart,
            'dateTimeEnd'=>$dateTimeEnd]
        );
    }
}
