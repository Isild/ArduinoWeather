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

        $dataMearsurment = DB::select('
            SELECT id AS number, date, temperature, air_pressure, air_humidity, rainfall, soil_moisture
            FROM measurement
            WHERE date > :dateTimeStart
            AND date <= :dateTimeEnd;
        ',[
            'dateTimeStart'=>$dateTimeStart,
            'dateTimeEnd'=>$dateTimeEnd]
        );

        //### to zamienia arraya JSONów na normalnego arraya do edycji
        $dataToReturn = json_decode(json_encode($dataMearsurment), true);/*/
        //$dataToReturn = json_encode($dataMearsurment);//*/
        $temp = array();
        $lengthArr = count($dataMearsurment);
        $promil = round($lengthArr/1000);
        if($lengthArr > 1000){
            //początek
            array_push($temp, [
                'number'=>$dataToReturn[0]['number'],
                'temperature'=>round(($dataToReturn[0]['temperature']+$dataToReturn[1]['temperature'])/2, 2),
                'date'=>$dataToReturn[0]['date'],
                'air_pressure'=>round(($dataToReturn[0]['air_pressure']+$dataToReturn[1]['air_pressure'])/2, 2),
                'air_humidity'=>round(($dataToReturn[0]['air_humidity']+$dataToReturn[1]['air_humidity'])/2, 2),
                'rainfall'=>round(($dataToReturn[0]['rainfall']+$dataToReturn[1]['rainfall'])/2, 2),
                'soil_moisture'=>round(($dataToReturn[0]['soil_moisture']+$dataToReturn[1]['soil_moisture'])/2, 2),
            ]);
            //środkowe wartości
            for($i=1; $i<$lengthArr-1; $i+=$promil){
                array_push($temp, [
                    'number'=>$dataToReturn[$i]['number'],
                    'temperature'=>round(($dataToReturn[$i-1]['temperature']+$dataToReturn[$i]['temperature']+$dataToReturn[$i+1]['temperature'])/3, 2),
                    'date'=>$dataToReturn[$i]['date'],
                    'air_pressure'=>round(($dataToReturn[$i-1]['air_pressure']+$dataToReturn[$i]['air_pressure']+$dataToReturn[$i+1]['air_pressure'])/3, 2),
                    'air_humidity'=>round(($dataToReturn[$i-1]['air_humidity']+$dataToReturn[$i]['air_humidity']+$dataToReturn[$i+1]['air_humidity'])/3, 2),
                    'rainfall'=>round(($dataToReturn[$i-1]['rainfall']+$dataToReturn[$i]['rainfall']+$dataToReturn[$i+1]['rainfall'])/3, 2),
                    'soil_moisture'=>round(($dataToReturn[$i-1]['soil_moisture']+$dataToReturn[$i]['soil_moisture']+$dataToReturn[$i+1]['soil_moisture'])/3, 2)
                ]);
            }
            //koniec
            array_push($temp, [
                'number'=>$dataToReturn[$lengthArr-1]['number'],
                'temperature'=>round(($dataToReturn[$lengthArr-2]['temperature']+$dataToReturn[$lengthArr-1]['temperature'])/2,2),
                'date'=>$dataToReturn[$lengthArr-1]['date'],
                'air_pressure'=>round(($dataToReturn[$lengthArr-2]['air_pressure']+$dataToReturn[$lengthArr-1]['air_pressure'])/2,2),
                'air_humidity'=>round(($dataToReturn[$lengthArr-2]['air_humidity']+$dataToReturn[$lengthArr-1]['air_humidity'])/2,2),
                'rainfall'=>round(($dataToReturn[$lengthArr-2]['rainfall']+$dataToReturn[$lengthArr-1]['rainfall'])/2,2),
                'soil_moisture'=>round(($dataToReturn[$lengthArr-2]['soil_moisture']+$dataToReturn[$lengthArr-1]['soil_moisture'])/2,2)
            ]);
        }
        //return json_encode($temp);
        return $temp;
    }

    /**
     * Function getting data from wether station and put into database
     */
    public function storeData($deviceKeay, $tempC, $hum, $temp, $pres, $humiGr, $rain, $isRain, $isGroundWet){
        $key = 'C9G0WH9D6KB2I4IY';

        if($key === $deviceKeay){
            DB::select('
                INSERT INTO measurement(temperature, air_pressure, air_humidity, rainfall, soil_moisture) 
                VALUES (:temp, :pres, :hum, :rain, :humuGr)
            ',[
                    'hum'=>$hum,
                    'temp'=>$temp,
                    'pres'=>$pres,
                    'humuGr'=>$humiGr,
                    'rain'=>$rain
                ]
            );
            return 1;
        } else {
            return -1;
        }
    }
}
