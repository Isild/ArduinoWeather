/**
 * Skrypt odpowiedzialny za generowanie wykresów z danymi.
 */

/* Połączenie wykresów z elementami */
var ctxTemperature = document.getElementById("temperature");
var ctxPressure = document.getElementById("pressure");
var ctxHumidity = document.getElementById("humidity");
var ctxRain = document.getElementById("rain");
var ctxGroundHumidity = document.getElementById("groundHumidity");

/* Dane do wykresów */
var dataTemp = [];
var dataPress = [];
var dataHum = [];
var dataRain = [];
var dataGroHum = [];
var dadaInterval = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];

/* Tworzenie nowych wykresów */
var chartTemperatre = new Chart(ctxTemperature, {
    type: 'line',
    data: {
        labels: dadaInterval,
        datasets: [
            {
                label: 'Temperatura',
                data: dataTemp
            }
        ]
    },
    options: {
        responsive: false,
        maintainAspectRatio: false,
    }
});

var chartPressure = new Chart(ctxPressure, {
    type: 'line',
    data: {
        labels: dadaInterval,
        datasets: [
            {
                label: 'Ciśnienie',
                data: dataPress
            }
        ]
    },
    options: {
        responsive: false,
        maintainAspectRatio: false,
    }
});

var chartHumidity = new Chart(ctxHumidity, {
    type: 'line',
    data: {
        labels: dadaInterval,
        datasets: [
            {
                label: 'Wilgotność',
                data: dataHum
            }
        ]
    },
    options: {
        responsive: false,
        maintainAspectRatio: false,
    }
});

var chartRain = new Chart(ctxRain, {
    type: 'line',
    data: {
        labels: dadaInterval,
        datasets: [
            {
                label: 'Opady',
                data: dataRain
            }
        ]
    },
    options: {
        responsive: false,
        maintainAspectRatio: false,
    }
});

var chartGroundHumidity = new Chart(ctxGroundHumidity, {
    type: 'line',
    data: {
        labels: dadaInterval,
        datasets: [
            {
                label: 'Wilgotoność gleby',
                data: dataGroHum
            }
        ]
    },
    options: {
        responsive: false,
        maintainAspectRatio: false,
    }
});