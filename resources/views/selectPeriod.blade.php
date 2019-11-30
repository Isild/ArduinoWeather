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
            <br><br>
            <label class="col-md-2 text-md-right">Początek przedziału</label>
            <div class="col-md-6">
                <input type="text" id="datepicker-start">
            </div>
        </div>

        <div class="form-group row">
            <label class="col-md-2 text-md-right">Koniec przedziału</label>
            <div class="col-md-6">
                <input type="text" id="datepicker-end">
            </div>
        </div>

        <div class="form-group row">
            <label class="col-md-2 text-md-right"> </label>
            <div class="col-md-6">
                <button type="button" id="show-data-btn">Wyświetl dane</button>
            </div>
        </div>
    </div>
    <div id="diagrams">
        <center>
            <div class="row">
                <div class="col-sm-6">
                    <canvas id="temperature" width="700" height="500">Twoja przeglądarka nie obsługuje wyświetlania wykresów.</canvas>
                </div>
                <div class="col-sm-6">
                    <canvas id="pressure" width="700" height="500">Twoja przeglądarka nie obsługuje wyświetlania wykresów.</canvas>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-6">
                    <canvas id="humidity" width="700" height="500">Twoja przeglądarka nie obsługuje wyświetlania wykresów.</canvas>
                </div>
                <div class="col-sm-6">
                    <canvas id="rain" width="700" height="500">Twoja przeglądarka nie obsługuje wyświetlania wykresów.</canvas>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-6">
                    <canvas id="groundHumidity" width="700" height="500">Twoja przeglądarka nie obsługuje wyświetlania wykresów.</canvas>
                </div>
            </div>
        </center>
    </div>


</div>

<script src="/files/js/viewCharts.js" async></script> <!-- async mówi, żeby skrypt był wykonany asynchronicznie, uzupełnianie danych wywoływać funkcją sprawdzającą czy dokument został wczytany -->
<script src="/files/js/selectPeriod.js" async></script>
</body>
</html>
