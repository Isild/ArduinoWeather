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
    clearCharts();

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
}

