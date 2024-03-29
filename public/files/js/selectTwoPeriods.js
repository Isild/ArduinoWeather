$(document).ready(function() {
    var datapickerStartFirst = $("#datepicker-start-first");
    var datapickerEndFirst = $("#datepicker-end-first");
    var datapickerStartSecond = $("#datepicker-start-second");
    var datapickerEndSecond = $("#datepicker-end-second");
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

    datapickerStartFirst.datepicker({
        dateFormat: 'dd-mm-yy',
    });
    datapickerEndFirst.datepicker({
        dateFormat: 'dd-mm-yy',
    });
    datapickerStartSecond.datepicker({
        dateFormat: 'dd-mm-yy',
    });
    datapickerEndSecond.datepicker({
        dateFormat: 'dd-mm-yy',
    });

    datapickerStartFirst.val(dataString);
    datapickerEndFirst.val(dataString2);
    datapickerStartSecond.val(dataString);
    datapickerEndSecond.val(dataString2);

    $("#show-data-btn").click(function(){
        showData();
    });
})

var init = function () {
    var datapickerStartFirst = $("#datepicker-start-first");
    var datapickerEndFirst = $("#datepicker-end-first");
    var datapickerStartSecond = $("#datepicker-start-second");
    var datapickerEndSecond = $("#datepicker-end-second");
    var data = new Date();
    var day = data.getDay();
    var day2 = day + 1;
    var month = data.getMonth() + 1;
    var year = data.getFullYear();

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

    datapickerStartFirst.datepicker({
        dateFormat: 'dd-mm-yy',
    });
    datapickerEndFirst.datepicker({
        dateFormat: 'dd-mm-yy',
    });
    datapickerStartSecond.datepicker({
        dateFormat: 'dd-mm-yy',
    });
    datapickerEndSecond.datepicker({
        dateFormat: 'dd-mm-yy',
    });

    datapickerStartFirst.val(dataString);
    datapickerEndFirst.val(dataString2);
    datapickerStartSecond.val(dataString);
    datapickerEndSecond.val(dataString2);
}

var showData = function () {
    var vali1 = validateData($("#datepicker-start-first").val(), $("#datepicker-end-first").val());
    var vali2 = validateData($("#datepicker-start-second").val(), $("#datepicker-end-second").val());

    console.log('show data')
    if (vali1 == 1 && vali2 == 1){
        console.log('send request')
        sendRequest();
    }
    else
    {
        $('.form-message').html( "Walidacja nie powiodła się." );
        console.log('no walidacja nie przeszła')
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
            {
                $('.form-message').html( "Wystąpił błąd: data końca jest mniejsza niż data początku okresu(dzień)." );
                return -4;
            }
        }
        else if((dateS.split('-')[2] == dateE.split('-')[2]))
        {
            $('.form-message').html( "Wystąpił błąd: data końca jest mniejsza niż data początku okresu(miesiąc)." );
            return -5;
        }
    }
    else
    {
        $('.form-message').html( "Wystąpił błąd: data końca jest mniejsza niż data początku okresu(rok)." );
        return -3;
    }

    return 1;
}

var sendRequest = function () {
    var dateS = $("#datepicker-start-first").val();
    var dateE = $("#datepicker-end-first").val();
    var dateS2 = $("#datepicker-start-second").val();
    var dateE2 = $("#datepicker-end-second").val();

    getData(dateS.split('-')[0], dateS.split('-')[1], dateS.split('-')[2], dateE.split('-')[0], dateE.split('-')[1], dateE.split('-')[2], dateS2.split('-')[0], dateS2.split('-')[1], dateS2.split('-')[2], dateE2.split('-')[0], dateE2.split('-')[1], dateE2.split('-')[2])
}

var getData = function (dS, mS, yS, dE, mE, yE, dS2, mS2, yS2, dE2, mE2, yE2) {
    var parameters1 = yS + '/' + mS + '/' + dS + '/00/00/00/' + yE + '/' + mE + '/' + dE + '/00/00/00/';
    var parameters2 = yS2 + '/' + mS2 + '/' + dS2 + '/00/00/00/' + yE2 + '/' + mE2 + '/' + dE2 + '/00/00/00/';

    let srTempDay = parseFloat('2.3') - parseFloat('2.3');
    let srTempNight = parseFloat('2.3') - parseFloat('2.3');
    var srCisDay = 0;
    var srCisNight = 0;
    var srWilgDay = 0;
    var srWilgNight = 0;
    var srOpDay = 0;
    var srOpNight = 0;
    var srWilgGDay = 0;
    var srWilgGNight = 0;
    var countD = 0;
    var countN = 0;
    let srTempDay2 = parseFloat('2.3') - parseFloat('2.3');
    let srTempNight2 = parseFloat('2.3') - parseFloat('2.3');
    var srCisDay2 = 0;
    var srCisNight2 = 0;
    var srWilgDay2 = 0;
    var srWilgNight2 = 0;
    var srOpDay2 = 0;
    var srOpNight2 = 0;
    var srWilgGDay2 = 0;
    var srWilgGNight2 = 0;
    var countD2 = 0;
    var countN2 = 0;
    var countD2 = 0;
    var countN2 = 0;

    var dataAjax;
    var lock = false;
    $(document).ready(function () {
        if(lock)
            return;
        lock = true;

        /* Daty */
        $('#data-start-1').html($("#datepicker-start-first").val());
        $('#data-end-1').html($("#datepicker-end-first").val());
        $('#data-start-2').html($("#datepicker-start-second").val());
        $('#data-end-2').html($("#datepicker-end-second").val());

        $.ajax({
            url: '/measurment/avg/' + parameters1,
            type: 'GET',
            data: {},
            dataType: 'JSON'
        })
            .done(function (res) {
                dataAjax=res;

                /*
                console.log('Średnia     ')
                console.log('---dzień---;')
                console.log('temp       :', res[0].avg_temperature_day)
                console.log('cisnienie  :', res[0].avg_pressure_day)
                console.log('wilgotność :', res[0].avg_humidity_day)
                console.log('opady      :', res[0].avg_rain_day)
                console.log('wilg gleby :', res[0].avg_ground_humi_day)
                console.log('----noc----;')
                console.log('temp       :', res[0].avg_temperature_night)
                console.log('cisnienie  :', res[0].avg_pressure_night)
                console.log('wilgotność :', res[0].avg_humidity_night)
                console.log('opady      :', res[0].avg_rain_night)
                console.log('wilg gleby :', res[0].avg_ground_humi_night)//*/

                /* Wartości */
                $('#sTD1').html(res[0].avg_temperature_day);
                $('#sTN1').html(res[0].avg_temperature_night);
                $('#sCD1').html(res[0].avg_pressure_day);
                $('#sCN1').html(res[0].avg_pressure_night);
                $('#sWD1').html(res[0].avg_humidity_day);
                $('#sWN1').html(res[0].avg_humidity_night);
                $('#sOD1').html(res[0].avg_rain_day);
                $('#sON1').html(res[0].avg_rain_night);
                $('#sWGD1').html(res[0].avg_ground_humi_day);
                $('#sWGN1').html(res[0].avg_ground_humi_night);
            })
            .fail(function () {
                $('.form-message').html( "Wystąpił błąd" );
            });
        lock = false;


        //okres drugi

        $.ajax({
            url: '/measurment/avg/' + parameters2,
            type: 'GET',
            data: {},
            dataType: 'JSON'
        })
            .done(function (res) {
                dataAjax=res;

                /* Wartości */
                $('#sTD2').html(res[0].avg_temperature_day);
                $('#sTN2').html(res[0].avg_temperature_night);
                $('#sCD2').html(res[0].avg_pressure_day);
                $('#sCN2').html(res[0].avg_pressure_night);
                $('#sWD2').html(res[0].avg_humidity_day);
                $('#sWN2').html(res[0].avg_humidity_night);
                $('#sOD2').html(res[0].avg_rain_day);
                $('#sON2').html(res[0].avg_rain_night);
                $('#sWGD2').html(res[0].avg_ground_humi_day);
                $('#sWGN2').html(res[0].avg_ground_humi_night);
            })
            .fail(function () {
                $('.form-message').html( "Wystąpił błąd" );
            });
    })
}

