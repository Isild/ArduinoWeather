/**
 * Skrypt zawierający funkcjie pobierania i updatowania danych.
 */
var intervalUpdate = 5000;
var lastNumber = 0;
var yea = 1996;
var da = 0;
var lock = false;

function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}

function removeData(chart) {
    chart.data.labels.splice(0,1);
    chart.data.datasets[0].data.splice(0,1);
    chart.update();
}

var dataAjax;
//ajax https://kursjs.pl/kurs/jquery/jquery-ajax.php
/* Funkcja pobierająca początkowe dane z 24h do wykresu */
$(document).ready(function () {
    if(lock)
        return;
    lock = true;

    $.ajax({
        url: '/measurmentDay',
        type: 'GET',
        data: {},
        dataType: 'JSON'
    })
        .done(function (res) {
            dataAjax=res;

            res.forEach(el => {
                dataTemp.push(el.temperature);
                dataPress.push(el.air_pressure);
                dataHum.push(el.air_humidity);
                dataRain.push(el.rainfall);
                dataGroHum.push(el.soil_moisture);
                dadaInterval.push(el.date);//*/
                lastNumber = el.number;
            })

            chartTemperatre.update();
            chartPressure.update();
            chartHumidity.update();
            chartRain.update();
            chartGroundHumidity.update();
        })
        .fail(function () {
            $('.form-message').html( "Wystąpił błąd" );
        });
    lock = false;
})

/* Funkcja wrzucająca nową próbkę danych do wykresu. Usówa z wykresu pierwszą daną i wstawia na koniec nową */
$(document).ready(function() {
    if(lock)
        return;
    lock = true;

    setInterval(function () {
        $.ajax({
            url: '/measurment/'+lastNumber,
            type: 'GET',
            data: {},
            dataType: 'JSON'
        })
            .done(function (res) {
                dataAjax=res;
                var tmpLastNumber = 0;

                res.forEach(el => {
                    if(lastNumber < el.number)
                    {
                        removeData(chartTemperatre);
                        addData(chartTemperatre, el.date, el.temperature);

                        removeData(chartPressure);
                        addData(chartPressure, el.date, el.air_pressure);

                        removeData(chartHumidity);
                        addData(chartHumidity, el.date, el.air_humidity);

                        removeData(chartRain);
                        addData(chartRain, el.date, el.rainfall);

                        removeData(chartGroundHumidity);
                        addData(chartGroundHumidity, el.date, el.soil_moisture);

                        tmpLastNumber = el.number;
                    }
                })

                if(tmpLastNumber > 0)
                    lastNumber = tmpLastNumber;

                chartTemperatre.update();
                chartPressure.update();
                chartHumidity.update();
                chartRain.update();
                chartGroundHumidity.update();
            })
            .fail(function () {
                $('.form-message').html( "Wystąpił błąd" );
            });

        lock = false;
    }, 5000)
})
