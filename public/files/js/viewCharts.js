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
var dadaInterval = [];

/* Tworzenie nowych wykresów */
var chartTemperatre = new Chart(ctxTemperature, {
    type: 'line',
    data: {
        labels: dadaInterval,
        datasets: [
            {
                label: 'Temperatura powietrza',
                data: dataTemp,
                borderColor: 'rgba(255, 0, 0, 1)',
                borderWidth: 1,
                fill: false
            }
        ]
    },
    options: {
        responsive: false,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                },
                scaleLabel: {
                    display: true,
                    labelString: "Temperatura [°C]"
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: "Data"
                }
            }]
        },
        elements: {
            point:{
                radius: 0
            }
        }
    }
});

var chartPressure = new Chart(ctxPressure, {
    type: 'line',
    data: {
        labels: dadaInterval,
        datasets: [
            {
                label: 'Ciśnienie',
                data: dataPress,
                borderColor: 'rgb(159,156,39)',
                borderWidth: 1,
            }
        ]
    },
    options: {
        responsive: false,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                },
                scaleLabel: {
                    display: true,
                    labelString: "Ciśnienie [hPa]"
                },
                ticks: {
                    suggestedMin: 995,
                    suggestedMax: 1025
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: "Data"
                }
            }]
        },
        elements: {
            point:{
                radius: 0
            }
        }
    }
});

var chartHumidity = new Chart(ctxHumidity, {
    type: 'line',
    data: {
        labels: dadaInterval,
        datasets: [
            {
                label: 'Wilgotność powietrza',
                data: dataHum,
                borderColor: 'rgb(197,28,255)',
                fillColor : 'rgb(197,28,255)',
                borderWidth: 1,
            }
        ]
    },
    options: {
        responsive: false,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                },
                scaleLabel: {
                    display: true,
                    labelString: "Wilgotność[%]"
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: "Data"
                },
                gridLines: {
                    offsetGridLines: false
                },
                barPercentage: 1.1,
                categoryPercentage: 1.0
            }]
        },
        elements: {
            point:{
                radius: 0
            }
        }
    }
});

var chartRain = new Chart(ctxRain, {
    type: 'bar',
    data: {
        labels: dadaInterval,
        datasets: [
            {
                label: 'Opady',
                data: dataRain,
                borderColor: 'rgb(21,34,255)',
                borderWidth: 1
            }
        ]
    },
    options: {
        responsive: false,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                },
                scaleLabel: {
                    display: true,
                    labelString: "Opady"
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: "Data"
                },
                barPercentage: 1.1,
                categoryPercentage: 1.0
            }]
        },
        elements: {
            point:{
                radius: 0
            }
        }
    }
});

var chartGroundHumidity = new Chart(ctxGroundHumidity, {
    type: 'line',
    data: {
        labels: dadaInterval,
        datasets: [
            {
                label: 'Wilgotoność gleby',
                data: dataGroHum,
                borderColor: 'rgb(42,4,255)',
                borderWidth: 1,
            }
        ]
    },
    options: {
        responsive: false,
        maintainAspectRatio: false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                },
                scaleLabel: {
                    display: true,
                    labelString: "Wilgotnoś[%]"
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: "Data"
                },
                barPercentage: 1.1,
                categoryPercentage: 1.0
            }]
        },
        elements: {
            point:{
                radius: 0
            }
        }
    }
});

var clearCharts = function () {
    dadaInterval = [];
    destroyCharts();
    createCharts();
}

var destroyCharts = function () {
    chartTemperatre.destroy();
    chartPressure.destroy();
    chartHumidity.destroy();
    chartRain.destroy();
    chartGroundHumidity.destroy();
}

var createCharts = function () {
    chartTemperatre = new Chart(ctxTemperature, {
        type: 'line',
        data: {
            labels: dadaInterval,
            datasets: [
                {
                    label: 'Temperatura',
                    data: dataTemp,
                    borderColor: 'rgba(255, 0, 0, 1)',
                    borderWidth: 1,
                    fill: false
                }
            ]
        },
        options: {
            responsive: false,
            maintainAspectRatio: false,
            elements: {
                point:{
                    radius: 0
                }
            }
        }
    });

    chartPressure = new Chart(ctxPressure, {
        type: 'line',
        data: {
            labels: dadaInterval,
            datasets: [
                {
                    label: 'Ciśnienie',
                    data: dataPress,
                    borderColor: 'rgb(159,156,39)',
                    borderWidth: 1,
                }
            ]
        },
        options: {
            responsive: false,
            maintainAspectRatio: false,
            elements: {
                point:{
                    radius: 0
                }
            }
        }
    });

    chartHumidity = new Chart(ctxHumidity, {
        type: 'line',
        data: {
            labels: dadaInterval,
            datasets: [
                {
                    label: 'Wilgotność',
                    data: dataHum,
                    borderColor: 'rgb(197,28,255)',
                    borderWidth: 1,
                    categoryPercentage: 1.0,
                    barPercentage: 1.0
                }
            ]
        },
        options: {
            responsive: false,
            maintainAspectRatio: false,
            elements: {
                point:{
                    radius: 0
                }
            }
        }
    });

    chartRain = new Chart(ctxRain, {
        type: 'bar',
        data: {
            labels: dadaInterval,
            datasets: [
                {
                    label: 'Opady',
                    data: dataRain,
                    borderColor: 'rgb(21,34,255)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: false,
            maintainAspectRatio: false,
            elements: {
                point:{
                    radius: 0
                }
            }
        }
    });

    chartGroundHumidity = new Chart(ctxGroundHumidity, {
        type: 'line',
        data: {
            labels: dadaInterval,
            datasets: [
                {
                    label: 'Wilgotoność gleby',
                    data: dataGroHum,
                    borderColor: 'rgb(42,4,255)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: false,
            maintainAspectRatio: false,
            elements: {
                point:{
                    radius: 0
                }
            }
        }
    });
}
