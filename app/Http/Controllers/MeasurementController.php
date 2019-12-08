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
            return $temp;
        }
        return $dataMearsurment;
    }

    /**
     * Function returning data form given period of time.
     */
    public function getDataFromPeriodWithoutAverage($yearStart, $monthStart, $dayStart, $hourStart, $minutesStart, $secondsStart, $yearEnd, $monthEnd, $dayEnd, $hourEnd, $minutesEnd, $secondsEnd){
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

    /**
     * Function returning average data form given period of time.
     */
    public function getAverageDatas($yearStart, $monthStart, $dayStart, $hourStart, $minutesStart, $secondsStart, $yearEnd, $monthEnd, $dayEnd, $hourEnd, $minutesEnd, $secondsEnd){
        $data = $this->getDataFromPeriodWithoutAverage($yearStart, $monthStart, $dayStart, $hourStart, $minutesStart, $secondsStart, $yearEnd, $monthEnd, $dayEnd, $hourEnd, $minutesEnd, $secondsEnd);
        $averageData = array();
        $avgTempDay = 0;
        $avgTempNight = 0;
        $avgPresDay = 0;
        $avgPresNight = 0;
        $avgHumDay = 0;
        $avgHumNight = 0;
        $avgRainDay = 0;
        $avgRainNight = 0;
        $avgGroundHumDay = 0;
        $avgGroundHumNight = 0;
        $dntDay = 0;
        $cntNight = 0;

        $dataToReturn = json_decode(json_encode($data), true);
        $lengthArr = count($data);

        for($i=0; $i<$lengthArr; $i++){
            if(($dataToReturn[$i]['date'][11] == 0 && $dataToReturn[$i]['date'][12] >= 8) || ($dataToReturn[$i]['date'][11] == 1 && $dataToReturn[$i]['date'][11] <= 9)){
                $avgTempDay += $dataToReturn[$i]['temperature'];
                $avgPresDay += $dataToReturn[$i]['air_pressure'];
                $avgHumDay += $dataToReturn[$i]['air_humidity'];
                $avgRainDay += $dataToReturn[$i]['rainfall'];
                $avgGroundHumDay += $dataToReturn[$i]['soil_moisture'];
                $dntDay++;
            } else {
                $avgTempNight += $dataToReturn[$i]['temperature'];
                $avgPresNight += $dataToReturn[$i]['air_pressure'];
                $avgHumNight += $dataToReturn[$i]['air_humidity'];
                $avgRainNight += $dataToReturn[$i]['rainfall'];
                $avgGroundHumNight += $dataToReturn[$i]['soil_moisture'];
                $cntNight++;
            }

        }

        //return [$avgTempDay, $lengthArr-1, ($avgTempDay /$lengthArr)];

        $avgTempDay /= $dntDay;
        $avgPresDay /= $dntDay;
        $avgHumDay /= $dntDay;
        $avgRainDay /= $dntDay;
        $avgGroundHumDay /= $dntDay;
        $avgTempNight /= $cntNight;
        $avgPresNight /= $cntNight;
        $avgHumNight /= $cntNight;
        $avgRainNight /= $cntNight;
        $avgGroundHumNight /= $cntNight;

        array_push($averageData, [
            'avg_temperature_day'=>round($avgTempDay,2),
            'avg_temperature_night'=>round($avgTempNight,2),
            'avg_pressure_day'=>round($avgPresDay,2),
            'avg_pressure_night'=>round($avgPresNight,2),
            'avg_humidity_day'=>round($avgHumDay,2),
            'avg_humidity_night'=>round($avgHumNight,2),
            'avg_rain_day'=>round($avgRainDay,2),
            'avg_rain_night'=>round($avgRainNight,2),
            'avg_ground_humi_day'=>round($avgGroundHumDay,2),
            'avg_ground_humi_night'=>round($avgGroundHumNight,2)
        ]);

        return $averageData;
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
