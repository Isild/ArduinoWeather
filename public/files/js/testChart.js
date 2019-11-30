console.log("Załączono test.js");
var years = [1500,1600,1700,1750,1800,1850,1900,1950,1999,2050];
// For drawing the lines
var africa = [86,114,106,106,107,111,133,221,783,2478];
var asia = [282,350,411,502,635,809,947,1402,3700,5267];
var europe = [168,170,178,190,203,276,408,547,675,734];
var latinAmerica = [40,20,10,16,24,38,74,167,508,784];
var northAmerica = [6,3,2,2,7,26,82,172,312,433];

var ctxTemperature = document.getElementById("temperature");
var ctxPressure = document.getElementById("pressure");
var ctxHumidity = document.getElementById("humidity");
var ctxRain = document.getElementById("rain");
var ctxGroundHumidity = document.getElementById("groundHumidity");

var chartTemperatre = new Chart(ctxTemperature, {
    type: 'line',
    data: {
        labels: years,
        datasets: [
            {
                label: 'Temperatura',
                data: africa
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
        labels: years,
        datasets: [
            {
                label: 'Ciśnienie',
                data: asia
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
        labels: years,
        datasets: [
            {
                label: 'Wilgotność',
                data: europe
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
        labels: years,
        datasets: [
            {
                label: 'Opady',
                data: latinAmerica
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
        labels: years,
        datasets: [
            {
                label: 'Wilgotoność gleby',
                data: northAmerica
            }
        ]
    },
    options: {
        responsive: false,
        maintainAspectRatio: false,
    }
});

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

var yea = 2100;
var da = 500;

$(document).ready(function() {

})
