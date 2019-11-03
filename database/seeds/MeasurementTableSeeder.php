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
        $m = 11;
        $d = 1;
        $h = 11;
        $min = 5;
        $s = 0;

        for($j=0; $j<2; $j++){
            // od 00:00 do 6:00
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
                if($m == 12){
                    $m = 1;
                    $y++;
                }
                DB::table('measurement')->insert([
                    'date' => $y . '-' . $m . '-' . $d . ' ' . $h . ":" . $min . ":" . $s,
                    'temperature' => 0+rand(0,5),
                    'air_pressure' => 1024,
                    'air_humidity' => 50-rand(0,10),
                    'rainfall' => 0,
                    'soil_moisture' => 50-rand(0,10),
                ]);
                $min += 5;
            }
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
                if($m == 12){
                    $m = 1;
                    $y++;
                }
                DB::table('measurement')->insert([
                    'date' => $y . '-' . $m . '-' . $d . ' ' . $h . ":" . $min . ":" . $s,
                    'temperature' => 15+rand(0,5),
                    'air_pressure' => 1024,
                    'air_humidity' => 30-rand(0,10),
                    'rainfall' => 0,
                    'soil_moisture' => 30-rand(0,10),
                ]);
                $min += 5;
            }
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
                if($m == 12){
                    $m = 1;
                    $y++;
                }
                DB::table('measurement')->insert([
                    'date' => $y . '-' . $m . '-' . $d . ' ' . $h . ":" . $min . ":" . $s,
                    'temperature' => 25-rand(0,5),
                    'air_pressure' => 1024,
                    'air_humidity' => 30+rand(0,10),
                    'rainfall' => 0,
                    'soil_moisture' => 30+rand(0,10),
                ]);
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
                if($m == 12){
                    $m = 1;
                    $y++;
                }
                DB::table('measurement')->insert([
                    'date' => $y . '-' . $m . '-' . $d . ' ' . $h . ":" . $min . ":" . $s,
                    'temperature' => 15-rand(0,5),
                    'air_pressure' => 1024,
                    'air_humidity' => 40+rand(0,10),
                    'rainfall' => 1,
                    'soil_moisture' => 40+rand(0,10),
                ]);
                $min += 5;
            }
        }
    }
}
