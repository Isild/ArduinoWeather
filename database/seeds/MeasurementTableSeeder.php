<?php

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MeasurementTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     * y - rok w którym mają być zaczęte generowane dane,
     * m - miesiąc w którym mają być zaczęte generowane dane,
     * d - dzień w którym mają być zaczęte generowane dane,
     * h - godzina od której mają być generowane dane,
     * min - minuta od której mają być generowane dane,
     * s - sekunda od której mają być generowane dane
     * @return void
     */
    public function run()
    {
        $y = 2019;
        $m = 12;
        $d = 13;
        $h = 15;
        $min = 30;
        $s = 0;
        $temperature = 15;
        $pressuer = 1008;
        $humidity = 80;
        $rainfall = 0;
        $humidity_ground = 20;
        $boolRain = 0;

        for($j=0; $j<1; $j++){
            // od 00:00 do 6:00
            for($i=0; $i<72; $i++){
                if($min >= 60){
                    $min = 0;
                    $h++;
                }
                if($h == 24){
                    $h = 0;
                    $d++;
                }
                if($d == 30){
                    $d = 1;
                    $m++;
                }
                if($m == 13){
                    $m = 1;
                    $y++;
                }
                DB::table('measurement')->insert([
                    'date' => $y . '-' . $m . '-' . $d . ' ' . $h . ":" . $min . ":" . $s,
                    'temperature' => $temperature,
                    'air_pressure' => $pressuer,
                    'air_humidity' => $humidity,
                    'rainfall' => $rainfall,
                    'soil_moisture' => $humidity_ground,
                ]);

                $temperature = $temperature+rand(0,1)/4;
                $pressuer = 1009;
                $humidity = $humidity+rand(0,1)/2;
                if(rand(0,100) == 46) {
                    if($boolRain == 0) {
                        $boolRain = 1;
                    } else {
                        $boolRain = 0;
                    }
                }
                if($boolRain == 1) {
                    if($rainfall <= 600){
                        $rainfall += 10;
                    }
                } else {
                    if($rainfall > 0){
                        $rainfall -= 10;
                    }
                }
                if(rand(0,100) >= 50){
                    $humidity_ground += rand(0,1)/2;
                } else {
                    $humidity_ground -= rand(0,1)/2;
                }
                $min += 5;
            }
            $min=0;

            // od 06:00 do 12:00
            for($i=0; $i<72; $i++){
                if($min == 60){
                    $min = 0;
                    $h++;
                }
                if($h == 24){
                    $h = 0;
                    $d++;
                }
                if($d == 30){
                    $d = 1;
                    $m++;
                }
                if($m == 13){
                    $m = 1;
                    $y++;
                }
                DB::table('measurement')->insert([
                    'date' => $y . '-' . $m . '-' . $d . ' ' . $h . ":" . $min . ":" . $s,
                    'temperature' => $temperature,
                    'air_pressure' => $pressuer,
                    'air_humidity' => $humidity,
                    'rainfall' => $rainfall,
                    'soil_moisture' => $humidity_ground,
                ]);
                $temperature = $temperature+rand(0,1)/4+rand(0,1)/100;
                $pressuer = 1009;
                $humidity = $humidity-rand(0,1)/2;
                if(rand(0,100) == 46) {
                    if($boolRain == 0) {
                        $boolRain = 1;
                    } else {
                        $boolRain = 0;
                    }
                }
                if($boolRain == 1) {
                    if($rainfall <= 600){
                        $rainfall += 10;
                    }
                } else {
                    if($rainfall > 0){
                        $rainfall -= 10;
                    }
                }
                if(rand(0,100) >= 50){
                    $humidity_ground += rand(0,1)/2;
                } else {
                    $humidity_ground -= rand(0,1)/2;
                }
                $min += 5;
            }
            $min=0;

            // od 12:00 do 18:00
            for($i=0; $i<72; $i++){
                if($min == 60){
                    $min = 0;
                    $h++;
                }
                if($h == 24){
                    $h = 0;
                    $d++;
                }
                if($d == 30){
                    $d = 1;
                    $m++;
                }
                if($m == 13){
                    $m = 1;
                    $y++;
                }
                DB::table('measurement')->insert([
                    'date' => $y . '-' . $m . '-' . $d . ' ' . $h . ":" . $min . ":" . $s,
                    'temperature' => $temperature,
                    'air_pressure' => $pressuer,
                    'air_humidity' => $humidity,
                    'rainfall' => $rainfall,
                    'soil_moisture' => $humidity_ground,
                ]);
                $temperature = $temperature-rand(0,1)/4;
                $pressuer = 1008;
                $humidity = 40-rand(0,1)/2;
                if(rand(0,100) == 46) {
                    if($boolRain == 0) {
                        $boolRain = 1;
                    } else {
                        $boolRain = 0;
                    }
                }
                if($boolRain == 1) {
                    if($rainfall <= 600){
                        $rainfall += 10;
                    }
                } else {
                    if($rainfall > 0){
                        $rainfall -= 10;
                    }
                }
                if(rand(0,100) >= 50){
                    $humidity_ground += rand(0,1)/2;
                } else {
                    $humidity_ground -= rand(0,1)/2;
                }
                $min += 5;
            }

            // od 18:00 do 24:00
            for($i=0; $i<72; $i++){
                if($min == 60){
                    $min = 0;
                    $h++;
                }
                if($h == 24){
                    $h = 0;
                    $d++;
                }
                if($d == 30){
                    $d = 1;
                    $m++;
                }
                if($m == 13){
                    $m = 1;
                    $y++;
                }
                DB::table('measurement')->insert([
                    'date' => $y . '-' . $m . '-' . $d . ' ' . $h . ":" . $min . ":" . $s,
                    'temperature' => $temperature,
                    'air_pressure' => $pressuer,
                    'air_humidity' => $humidity,
                    'rainfall' => $rainfall,
                    'soil_moisture' => $humidity_ground,
                ]);
                $temperature = $temperature-rand(0,1)/4-rand(0,1)/100;
                $pressuer = 1007;
                $humidity = 40+rand(0,1)/2;
                if(rand(0,100) == 46) {
                    if($boolRain == 0) {
                        $boolRain = 1;
                    } else {
                        $boolRain = 0;
                    }
                }
                if($boolRain == 1) {
                    if($rainfall <= 600){
                        $rainfall += 10;
                    }
                } else {
                    if($rainfall > 0){
                        $rainfall -= 10;
                    }
                }
                if(rand(0,100) >= 50){
                    $humidity_ground += rand(0,1)/2;
                } else {
                    $humidity_ground -= rand(0,1)/2;
                }
                $min += 5;
            }
        }
    }
}
