<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Arduino Weather</title>
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Nunito:200,600" rel="stylesheet">
    <!-- CSS -->
    <link rel="stylesheet" href="/files/styles/DOMstyles.css">
    <link rel="stylesheet" href="/files/styles/navbarStyle.css">
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <link rel="stylesheet" href="/resources/demos/style.css">
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/timepicker/1.3.5/jquery.timepicker.min.css">

    <!-- podanie adresu do jakiś plików bez http czy https umożliwia laravelowi samoczynne dostosowanie zabezpieczeń do zabezpieczeń panujących na serwerze -->
    <script src="//cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js"></script>
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
    <script src="//ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="//code.jquery.com/jquery-1.12.4.js"></script>
    <script src="//code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/timepicker/1.3.5/jquery.timepicker.min.js"></script>
</head>
<body>
@include('navigation.navbar')

<div class="content">
    @include('messages.error')
    @include('messages.message')
</div>

<div class="flex-center position-ref full-height">
    <div id="input" class="container">
        <div class="form-group row">
            <div class="col-sm-6">
                <br><br>
                <label class="col-md-6 text-md-right">Początek przedziału pierwszego</label>
                <div class="col-md-6">
                    <input type="text" id="datepicker-start-first">
                </div>
            </div>
            <div class="col-sm-6">
                <br><br>
                <label class="col-md-6 text-md-right">Początek przedziału drugiego</label>
                <div class="col-md-6">
                    <input type="text" id="datepicker-start-second">
                </div>
            </div>
        </div>

        <div class="form-group row">
            <div class="col-sm-6">
                <label class="col-md-6 text-md-right">Koniec przedziału pierwszego</label>
                <div class="col-md-6">
                    <input type="text" id="datepicker-end-first">
                </div>
            </div>
            <div class="col-sm-6">
                <label class="col-md-6 text-md-right">Koniec przedziału drugiego</label>
                <div class="col-md-6">
                    <input type="text" id="datepicker-end-second">
                </div>
            </div>
        </div>

        <div class="form-group row">
            <label class="col-md-1 text-md-right"> </label>
            <div class="col-md-6">
                <button type="button" class="btn btn-primary" id="show-data-btn">Porównaj</button>
            </div>
        </div>
    </div>
</div>

<div class="container">
    <table class="table table-striped table-bordered table-hover" style="text-align: center;">
        <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col" colspan="2">Okres pierwszy</th>
            <th scope="col" colspan="2">Okres drugi</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <th scope="row">Data</th>
            <td id="data-start-1">-</td>
            <td id="data-end-1">-</td>

            <td id="data-start-2">-</td>
            <td id="data-end-2">-</td>
        </tr>
        <tr>
            <th cope="row">Średnia temperatura dzienna [°C]</th>
            <td id="sTD1" colspan="2">-</td>
            <td id="sTD2" colspan="2">-</td>
        </tr>
        <tr>
            <th scope="row">Średnia temperatura nocna [°C]</th>
            <td id="sTN1" colspan="2">-</td>
            <td id="sTN2" colspan="2">-</td>
        </tr>
        <tr>
            <th scope="row">Średnie ciśnienie dzienne [hPa]</th>
            <td id="sCD1" colspan="2">-</td>
            <td id="sCD2" colspan="2">-</td>
        </tr>
        <tr>
            <th scope="row">Średnie ciśnienie nocne [hPa]</th>
            <td id="sCN1" colspan="2">-</td>
            <td id="sCN2" colspan="2">-</td>
        </tr>
        <tr>
            <th scope="row">Średnia wilgotność dzienna [%]</th>
            <td id="sWD1" colspan="2">-</td>
            <td id="sWD2" colspan="2">-</td>
        </tr>
        <tr>
            <th scope="row">Średnia wilgotność nocna [%]</th>
            <td id="sWN1" colspan="2">-</td>
            <td id="sWN2" colspan="2">-</td>
        </tr>
        <tr>
            <th scope="row">Średnie opady dzienne</th>
            <td id="sOD1" colspan="2">-</td>
            <td id="sOD2" colspan="2">-</td>
        </tr>
        <tr>
            <th scope="row">Średnie opady nocne</th>
            <td id="sON1" colspan="2">-</td>
            <td id="sON2" colspan="2">-</td>
        </tr>
        <tr>
            <th scope="row">Średnia wilg. gleby dzienna [%]</th>
            <td id="sWGD1" colspan="2">-</td>
            <td id="sWGD2" colspan="2">-</td>
        </tr>
        <tr>
            <th scope="row">Średnia wilg. gleby nocna [%]</th>
            <td id="sWGN1" colspan="2">-</td>
            <td id="sWGN2" colspan="2">-</td>
        </tr>
        </tbody>
    </table>
</div>

<script src="/files/js/selectTwoPeriods.js" async></script>
</body>
</html>
