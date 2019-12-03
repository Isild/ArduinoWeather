$(document).ready(function() {
    var datapickerStart = $("#datepicker-start");
    var datapickerEnd = $("#datepicker-end");
    var data = new Date();
    var day = data.getDay();
    var day2 = day + 1;
    var month = data.getMonth() + 1;
    var year = data.getFullYear();

    if(day == '0')
    {
        day2++;
        day++;
    }
    if(day < 10)
    {
        day = '0' + day;
    }
    if(day2 < 10)
    {
        day2 = '0' + day2;
    }
    if(month < 10)
    {
        month = '0' + month;
    }

    var dataString = day + '-' + month + '-' + year;
    var dataString2 = day2 + '-' + month + '-' + year;

    datapickerStart.datepicker({
        dateFormat: 'dd-mm-yy',
    });
    datapickerEnd.datepicker({
        dateFormat: 'dd-mm-yy',
    });

    datapickerStart.val(dataString);
    datapickerEnd.val(dataString2);

    $("#show-data-btn").click(function(){
        showData();
    });
})

var initDOM = function () {
    var datapickerStart = $("#datepicker-start");
    var datapickerEnd = $("#datepicker-end");
    var data = new Date();
    var day = data.getDay();
    var day2 = day + 1;
    var month = data.getMonth() + 1;
    var year = data.getFullYear();

    if(day == '0')
        day2++;
    if(day < 10)
    {
        day = '0' + day;
    }
    if(day2 < 10)
    {
        day2 = '0' + day2;
    }
    if(month < 10)
    {
        month = '0' + month;
    }

    var dataString = day + '-' + month + '-' + year;
    var dataString2 = day2 + '-' + month + '-' + year;

    datapickerStart.datepicker({
        dateFormat: 'dd-mm-yy',
    });
    datapickerEnd.datepicker({
        dateFormat: 'dd-mm-yy',
    });

    datapickerStart.val(dataString);
    datapickerEnd.val(dataString2);
}

var showData = function () {
    var vali = validateData($("#datepicker-start").val(), $("#datepicker-end").val());

    if (vali == 1){
        sendRequest();
    }
}

var validateData = function (dateS, dateE) {
    var len1 = dateS.length;
    var len2 = dateE.length;

    if(len1 != 10 || len2 != 10)
        return -1;
    if(dateS.split('-').length != 3 || dateS.split('-').length != 3)
        return -2;
    if(dateS.split('-')[2] <= dateE.split('-')[2])
    {
        if((dateS.split('-')[2] == dateE.split('-')[2]) && dateS.split('-')[1] <= dateE.split('-')[1])
        {
            if((dateS.split('-')[1] == dateE.split('-')[1]) && dateS.split('-')[0] > dateE.split('-')[0])
                return -4;
        }
        else if((dateS.split('-')[2] == dateE.split('-')[2]))
            return -5;
    }
    else
        return -3;

    return 1;
}

var sendRequest = function () {
    //jakiś ajax
    //clearCharts();
    /*
    chart.data.labels.splice(0,1);
    chart.data.datasets[0].data.splice(0,1);
    chart.update();
    */



    var dateS = $("#datepicker-start").val();
    var dateE = $("#datepicker-end").val();

    getData(dateS.split('-')[0], dateS.split('-')[1], dateS.split('-')[2], dateE.split('-')[0], dateE.split('-')[1], dateE.split('-')[2])
}

var getData = function (dS, mS, yS, dE, mE, yE) {
    var parameters = yS + '/' + mS + '/' + dS + '/00/00/00/' + yE + '/' + mE + '/' + dE + '/00/00/00/';

    var dataAjax;
    var lock = false;
    $(document).ready(function () {
        if(lock)
            return;
        lock = true;

        $.ajax({
            url: '/measurment/period/' + parameters,
            type: 'GET',
            data: {},
            dataType: 'JSON'
        })
            .done(function (res) {
                dataAjax=res;
                if(chartTemperatre.data.labels.length != 0){
                    for(i=0; i<chartTemperatre.data.labels.length; i++){
                        chartTemperatre.data.labels.splice(0,1);
                        chartTemperatre.data.datasets[0].data.splice(0,1);
                    }
                }
                if(chartPressure.data.labels.length != 0){
                    for(i=0; i<chartPressure.data.labels.length; i++){
                        chartPressure.data.labels.splice(0,1);
                        chartPressure.data.datasets[0].data.splice(0,1);
                    }
                }
                if(chartHumidity.data.labels.length != 0){
                    for(i=0; i<chartHumidity.data.labels.length; i++){
                        chartHumidity.data.labels.splice(0,1);
                        chartHumidity.data.datasets[0].data.splice(0,1);
                    }
                }
                if(chartRain.data.labels.length != 0){
                    for(i=0; i<chartRain.data.labels.length; i++){
                        chartRain.data.labels.splice(0,1);
                        chartRain.data.datasets[0].data.splice(0,1);
                    }
                }
                if(chartGroundHumidity.data.labels.length != 0){
                    for(i=0; i<chartGroundHumidity.data.labels.length; i++){
                        chartGroundHumidity.data.labels.splice(0,1);
                        chartGroundHumidity.data.datasets[0].data.splice(0,1);
                    }
                }
                if(dadaInterval && dadaInterval.data){
                    for(i=0; i<dadaInterval.data.labels.length; i++){
                        dadaInterval.data.labels.splice(0,1);
                        dadaInterval.data.datasets[0].data.splice(0,1);
                    }
                }

                var number = Math.floor(res.length/1000);
                var count = 0;
                var length = res.length;
                //console.log('resp: number: ', number, ', res.length: ', res.length, ', % ', res.length/200);
                res.forEach(el => {
                    //console.log(el.temperature)
                    if(count%number == 0 && length > 2000 ){
                        dataTemp.push(el.temperature);
                        dataPress.push(el.air_pressure);
                        dataHum.push(el.air_humidity);
                        dataRain.push(el.rainfall);
                        dataGroHum.push(el.soil_moisture);
                        dadaInterval.push(el.date);//*/
                        lastNumber = el.number;
                        count = 0;
                    } else if (length <= 2000){
                        dataTemp.push(el.temperature);
                        dataPress.push(el.air_pressure);
                        dataHum.push(el.air_humidity);
                        dataRain.push(el.rainfall);
                        dataGroHum.push(el.soil_moisture);
                        dadaInterval.push(el.date);//*/
                        lastNumber = el.number;
                    }
                    count++;
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
}

