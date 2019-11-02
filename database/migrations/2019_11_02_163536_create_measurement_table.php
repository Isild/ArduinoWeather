<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
class CreateMeasurementTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('measurement', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->dateTime('date')->useCurrent();//->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->decimal('temperature');
            $table->integer('air_pressure');
            $table->integer('air_humidity');
            $table->integer('rainfall');
            $table->integer('soil_moisture');
        });
    }
    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('measurement');
    }
}
