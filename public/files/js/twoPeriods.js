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
                    labelString: "Temperatura [°C]"
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: "Data"
                }
            }]
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
                borderColor: 'rgb(6,3,1)',
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
                borderColor: 'rgb(255,103,17)',
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
                    labelString: "Wilgotność[%]"
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: "Data"
                }
            }]
        }
    }
});

var chartRain = new Chart(ctxRain, {
    type: 'line',
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
                }
            }]
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
                    labelString: "Wilgotnoś[%]"
                }
            }],
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: "Data"
                }
            }]
        }
    }
});

var clearCharts = function () {
    dadaInterval = [];

    destroyCharts();
    createCharts();
}

var destroyCharts = function () {
    chartTemperatre.clear();
    chartPressure.clear();
    chartHumidity.clear();
    chartRain.clear();
    chartGroundHumidity.clear();

    chartTemperatre.destroy();
    chartPressure.destroy();
    chartHumidity.destroy();
    chartRain.destroy();
    chartGroundHumidity.destroy();
}

var createCharts = function () {
    /* Tworzenie nowych wykresów */
    chartTemperatre = new Chart(ctxTemperature, {
        type: 'line',
        data: {
            labels: dadaInterval,
            datasets: [
                {
                    label: 'Temperatura powietrza',
                    data: dataTemp,
                    borderColor: 'rgba(255, 0, 0, 1)',
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
                        labelString: "Temperatura [°C]"
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "Data"
                    }
                }]
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
                    borderColor: 'rgb(6,3,1)',
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
            }
        }
    });

    chartHumidity = new Chart(ctxHumidity, {
        type: 'line',
        data: {
            labels: dadaInterval,
            datasets: [
                {
                    label: 'Wilgotność powietrza',
                    data: dataHum,
                    borderColor: 'rgb(255,103,17)',
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
                        labelString: "Wilgotność[%]"
                    }
                }],
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "Data"
                    }
                }]
            }
        }
    });

    chartRain = new Chart(ctxRain, {
        type: 'line',
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
                    }
                }]
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
                    }
                }]
            }
        }
    });
}
