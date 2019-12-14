/**
 * Skrypt zawierający funkcjie pobierania i updatowania danych.
 */
var intervalUpdate = 5000;
var lastNumber = 0;
var yea = 1996;
var da = 0;
var lock = false;

/* Funkcja wrzucająca dane do wykresu */
function addData(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}

/* Funkcja usuwająca pierwszy element z tabeli, robi miejsce dla nowej próbki */
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
            dataType: 'JSON',
            success: function (res) {
                /*var dt = new Date();
                var dtChart = new Date(dadaInterval[0]);
                */
                if(res) {
                    dataAjax = res;
                    var tmpLastNumber = 0
                    res.forEach(el => {
                        if (lastNumber < el.number) {
                            /*var dt = new Date();
                            var dtJson = new Date(el.date);
                            var dtChart = new Date(dadaInterval[0])
                            console.log('dt: ', dt, ', ', dtJson, ', chart: ', dadaInterval[0], ', date ', dtChart)
                            if(dtChart >= dtJson){
                                console.log('dtChart większe')
                            } else {
                                console.log('dtJson większe')
                            }
                            if(dt >= dtJson){
                                console.log('dt większe')
                            } else {
                                console.log('dtJson większe')
                            }
                            if(dtChart >= dt){
                                console.log('dtChart większe')
                            } else {
                                console.log('dt większe')
                            }*/

                            dadaInterval.push(el.date);
                            if (chartTemperatre.data.labels.length >= 288)
                                removeData(chartTemperatre);
                            dataTemp.push(el.temperature);

                            if (chartPressure.data.labels.length >= 288)
                                removeData(chartPressure);
                            dataPress.push(el.air_pressure);

                            if (chartHumidity.data.labels.length >= 288)
                                removeData(chartHumidity);
                            dataHum.push(el.air_humidity);

                            if (chartRain.data.labels.length >= 288)
                                removeData(chartRain);
                            dataRain.push(el.rainfall);

                            if (chartGroundHumidity.data.labels.length >= 288)
                                removeData(chartGroundHumidity);
                            dataGroHum.push(el.soil_moisture);

                            tmpLastNumber = el.number;
                        }
                    })

                    if (tmpLastNumber > 0)
                        lastNumber = tmpLastNumber;

                    chartTemperatre.update();
                    chartPressure.update();
                    chartHumidity.update();
                    chartRain.update();
                    chartGroundHumidity.update();
                }
            },
            error:function () {
                $('.form-message').html( "Wystąpił błąd" );
            }
        })
            .done()
            .fail();

        lock = false;
    }, 120000)
})
