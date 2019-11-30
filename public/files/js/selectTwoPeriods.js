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

        $.ajax({
            url: '/measurment/period/' + parameters1,
            type: 'GET',
            data: {},
            dataType: 'JSON'
        })
            .done(function (res) {
                dataAjax=res;

                res.forEach(el => {

                    if(el.date.split(' ')[1].split(':')[0] >= 6 && el.date.split(' ')[1].split(':')[0] <= 18)
                    {
                        srTempDay = parseFloat(srTempDay) + parseFloat(el.temperature);
                        srCisDay += el.air_pressure;
                        srWilgDay += el.air_humidity;
                        srOpDay += el.rainfall;
                        srWilgGDay += el.soil_moisture;
                        countD ++;
                    }
                    else
                    {
                        srTempNight = parseFloat(srTempNight) + parseFloat(el.temperature);
                        srCisNight += el.air_pressure;
                        srWilgNight += el.air_humidity;
                        srOpNight += el.rainfall;
                        srWilgGNight += el.soil_moisture;
                        countN ++;
                    }
                })
                srTempDay /= countD;
                srCisDay /= countD;
                srWilgDay /= countD;
                srOpDay /= countD;
                srWilgGDay /= countD;
                srTempNight /= countN;
                srCisNight /= countN;
                srWilgNight /= countN;
                srOpNight /= countN;
                srWilgGNight /= countN;

                console.log('Średnia     ')
                console.log('---dzień---;')
                console.log('temp       :', parseFloat(srTempDay).toFixed(2))
                console.log('cisnienie  :', parseFloat(srCisDay).toFixed(2))
                console.log('wilgotność :', parseFloat(srWilgDay).toFixed(2))
                console.log('opady      :', parseFloat(srOpDay).toFixed(2))
                console.log('wilg gleby :', parseFloat(srWilgGDay).toFixed(2))
                console.log('----noc----;')
                console.log('temp       :', parseFloat(srTempNight).toFixed(2))
                console.log('cisnienie  :', parseFloat(srCisNight).toFixed(2))
                console.log('wilgotność :', parseFloat(srWilgNight).toFixed(2))
                console.log('opady      :', parseFloat(srOpNight).toFixed(2))
                console.log('wilg gleby :', parseFloat(srWilgGNight).toFixed(2))

                /* Daty */
                $('#data-start-1').html($("#datepicker-start-first").val());
                $('#data-end-1').html($("#datepicker-end-first").val());
                $('#data-start-2').html($("#datepicker-start-second").val());
                $('#data-end-2').html($("#datepicker-end-second").val());

                /* Wartości */
                $('#sTD1').html(parseFloat(srTempDay).toFixed(2));
                $('#sTN1').html(parseFloat(srTempNight).toFixed(2));
                $('#sCD1').html(parseFloat(srCisDay).toFixed(2));
                $('#sCN1').html(parseFloat(srCisNight).toFixed(2));
                $('#sWD1').html(parseFloat(srWilgDay).toFixed(2));
                $('#sWN1').html(parseFloat(srWilgNight).toFixed(2));
                $('#sOD1').html(parseFloat(srOpDay).toFixed(2));
                $('#sON1').html(parseFloat(srOpNight).toFixed(2));
                $('#sWGD1').html(parseFloat(srWilgGDay).toFixed(2));
                $('#sWGN1').html(parseFloat(srWilgGNight).toFixed(2));
                /*$('#').html();
                $('#').html();
                $('#').html();
                $('#').html();
                $('#').html();
                $('#').html();
                $('#').html();
                $('#').html();
                $('#').html();
                $('#').html();*/
            })
            .fail(function () {
                $('.form-message').html( "Wystąpił błąd" );
            });
        lock = false;


        //okres drugi

        $.ajax({
            url: '/measurment/period/' + parameters2,
            type: 'GET',
            data: {},
            dataType: 'JSON'
        })
            .done(function (res) {
                dataAjax=res;

                res.forEach(el => {

                    if(el.date.split(' ')[1].split(':')[0] >= 6 && el.date.split(' ')[1].split(':')[0] <= 18)
                    {
                        srTempDay2 = parseFloat(srTempDay2) + parseFloat(el.temperature);
                        srCisDay2 += el.air_pressure;
                        srWilgDay2 += el.air_humidity;
                        srOpDay2 += el.rainfall;
                        srWilgGDay2 += el.soil_moisture;
                        countD2 ++;
                    }
                    else
                    {
                        srTempNight2 = parseFloat(srTempNight2) + parseFloat(el.temperature);
                        srCisNight2 += el.air_pressure;
                        srWilgNight2 += el.air_humidity;
                        srOpNight2 += el.rainfall;
                        srWilgGNight2 += el.soil_moisture;
                        countN2 ++;
                    }
                })
                srTempDay2 /= countD2;
                srCisDay2 /= countD2;
                srWilgDay2 /= countD2;
                srOpDay2 /= countD2;
                srWilgGDay2 /= countD2;
                srTempNight2 /= countN2;
                srCisNight2 /= countN2;
                srWilgNight2 /= countN2;
                srOpNight2 /= countN2;
                srWilgGNight2 /= countN2;
                /* Wartości */
                $('#sTD2').html(parseFloat(srTempDay2).toFixed(2));
                $('#sTN2').html(parseFloat(srTempNight2).toFixed(2));
                $('#sCD2').html(parseFloat(srCisDay2).toFixed(2));
                $('#sCN2').html(parseFloat(srCisNight2).toFixed(2));
                $('#sWD2').html(parseFloat(srWilgDay2).toFixed(2));
                $('#sWN2').html(parseFloat(srWilgNight2).toFixed(2));
                $('#sOD2').html(parseFloat(srOpDay2).toFixed(2));
                $('#sON2').html(parseFloat(srOpNight2).toFixed(2));
                $('#sWGD2').html(parseFloat(srWilgGDay2).toFixed(2));
                $('#sWGN2').html(parseFloat(srWilgGNight2).toFixed(2));
            })
            .fail(function () {
                $('.form-message').html( "Wystąpił błąd" );
            });
    })
}

