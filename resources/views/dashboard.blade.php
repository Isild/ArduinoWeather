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

    <!-- podanie adresu do jakiś plików bez http czy https umożliwia laravelowi samoczynne dostosowanie zabezpieczeń do zabezpieczeń panujących na serwerze -->
    <script src="//cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.min.js"></script>
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
    <script src="//ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
    <script src="//maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
</head>
<body>
    @include('navigation.navbar')

    <div class="content">
        @include('messages.error')
        @include('messages.message')
    </div>

    <div class="flex-center position-ref full-height">
        <div id="diagrams">
            <center>
                <div class="row">
                    <div class="col-sm-12">
                        <canvas id="temperature" width="1500%" height="350">Twoja przeglądarka nie obsługuje wyświetlania wykresów.</canvas>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <canvas id="pressure" width="1500%" height="350">Twoja przeglądarka nie obsługuje wyświetlania wykresów.</canvas>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <canvas id="humidity" width="1500%" height="350">Twoja przeglądarka nie obsługuje wyświetlania wykresów.</canvas>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <canvas id="rain" width="1500%" height="350">Twoja przeglądarka nie obsługuje wyświetlania wykresów.</canvas>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-12">
                        <canvas id="groundHumidity" width="1500%" height="350">Twoja przeglądarka nie obsługuje wyświetlania wykresów.</canvas>
                    </div>
                </div>
            </center>
        </div>


    </div>

    <script src="/files/js/viewCharts.js" async></script> <!-- async mówi, żeby skrypt był wykonany asynchronicznie, uzupełnianie danych wywoływać funkcją sprawdzającą czy dokument został wczytany -->
    <script src="/files/js/dataUpdate.js" async></script>
</body>
</html>
