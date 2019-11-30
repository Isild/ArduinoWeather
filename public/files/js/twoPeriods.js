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
                label: 'Temperatura',
                data: dataTemp,
                borderColor: 'rgba(255, 0, 0, 1)',
                borderWidth: 1
            },
            {
                label: 'wilg',
                data: dataHum,
                borderColor: 'rgb(255,108,192)',
                borderWidth: 1
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
                data: dataPress,
                borderColor: 'rgb(6,3,1)',
                borderWidth: 1
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
                data: dataHum,
                borderColor: 'rgb(255,103,17)',
                borderWidth: 1
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
                data: dataRain,
                borderColor: 'rgb(21,34,255)',
                borderWidth: 1
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
                data: dataGroHum,
                borderColor: 'rgb(42,4,255)',
                borderWidth: 1
            }
        ]
    },
    options: {
        responsive: false,
        maintainAspectRatio: false,
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
                    borderWidth: 1
                },
                {
                    label: 'wilg',
                    data: dataHum,
                    borderColor: 'rgb(255,108,192)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: false,
            maintainAspectRatio: false,
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
                    borderColor: 'rgb(255,103,17)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: false,
            maintainAspectRatio: false,
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
        }
    });
}
