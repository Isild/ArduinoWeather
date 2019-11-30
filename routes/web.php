<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::get('/laravel', function () {
    return view('welcome');
});

Route::get('/', function () {
    return view('dashboard');
});

Route::get('/about', function () {
    return view('about');
});

Route::get('/contact', function () {
    return view('contact');
});
/* Routes for getting data of measurments. */
Route::get('/measurmentDay', 'MeasurementController@get24HMeasurement')->name('get24HMeasurement');
Route::get('/measurment/{lastNumber}', 'MeasurementController@getLastMeasurment')->name('getLastMeasurment');
Route::get('/measurment/period/{yearStart}/{monthStart}/{dayStart}/{hourStart}/{minutesStart}/{secondsStart}/{yearEnd}/{monthEnd}/{dayEnd}/{hourEnd}/{minutesEnd}/{secondsEnd}', 'MeasurementController@getDataFromPeriod')->name('getDataFromPeriod');

/* Routes to managment users */
Route::get('/user', 'UserController@getUsers')->name('getUsers');
Route::get('/user/{id}', 'UserController@getUser')->name('getUser');
Route::post('/user/{name}/{password}/{email}', 'UserController@createUser')->name('createUser');
Route::post('/user/{id}', 'UserController@editUser')->name('editUser');
Route::delete('/user/{id}', 'UserController@removeUser')->name('removeUser');

/* Routes to login, registration and logout */
Route::get('/logout', '\App\Http\Controllers\Auth\LoginController@logout');
Auth::routes();

/* Route to view one period */
Route::get('/period', function () {
    return view('selectPeriod');
});
/* Route to view two periods */
Route::get('/compare', function () {
    return view('comparePeriods');
});
/* */
Route::get('/home', 'HomeController@index')->name('home');
