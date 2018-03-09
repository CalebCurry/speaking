$(document).ready(function () {
    setTimeout(function(){
        $('#step1').fadeIn(500);
    }, 500);
    setTimeout(function(){
        $('#step2').fadeIn(500);
    }, 2000);
    setTimeout(function(){
        $('#step3').fadeIn(500);
    }, 3500);
    setTimeout(function(){
        $('#prof_pic_step4').fadeIn(500);
    }, 5000);
    setTimeout(function(){
        $('#seq5').fadeIn(500);
    }, 6500);
    setTimeout(function(){
        $('#step6').fadeIn(500);
    }, 8000);
    setTimeout(function(){
        $('#adwindowstep7').fadeIn(500);
    }, 9500);
    setTimeout(function () {
       $('#adbtn').fadeIn(500);
       $('#adtext').hide(500);
       $('#spincontrol').hide(500);
    }, 12500);

});

// to get discount
function get_discount(userid)
{
    var obj = {
        user_id : userid
    };
    dataString = JSON.stringify(obj);
    var userresponse = undefined;
    return $.ajax({
            
                url: 'http://localhost:8000/getdiscount',
                method : 'get',
                dataType: 'json',
                contentType : 'application/json; charset=utf-8',
                data: {
                    user_id : userid
                },
                async : true,
                success: function(response){
                        userresponse = response;
                },
                error: function(jqXHR) {
                    console.log("ajax error " + jqXHR.status);
                }
            });
    var val = JSON.stringify(userresponse);
    var data = JSON.parse(val);
    //return userresponse;   
}



// to get background image

function get_image(userid)
{
    var obj = {
        user_id : userid
    };
    dataString = JSON.stringify(obj);
    var userresponse = undefined;
    return $.ajax({
            
                url: 'http://localhost:8000/getimagecode',
                method : 'get',
                dataType: 'json',
                contentType : 'application/json; charset=utf-8',
                data: {
                    user_id : userid
                },
                async : true,
                success: function(response){
                        userresponse = response;
                },
                error: function(jqXHR) {
                    console.log("ajax error " + jqXHR.status);
                }
            });
    var val = JSON.stringify(userresponse);
    var data = JSON.parse(val);
    //return userresponse;   
}

//for getting background color
function get_background_color(userid)
{
    var obj = {
        user_id : userid
    };
    dataString = JSON.stringify(obj);
    var userresponse = undefined;
    return $.ajax({
            
                url: 'http://localhost:8000/getbackgroundcolor',
                method : 'get',
                dataType: 'json',
                contentType : 'application/json; charset=utf-8',
                data: {
                    user_id : userid
                },
                async : true,
                success: function(response){
                    console.log("in suceess"+response);
                        userresponse = response;
                },
                error: function(jqXHR) {
                    console.log("ajax error " + jqXHR.status);
                }
            });
    var val = JSON.stringify(userresponse);
    var data = JSON.parse(val);
    //return userresponse;   
}

// to get discount
function getinfo(userid)
{
    console.log("enetered get_userdetails of sample.js")
    var obj = {
        user_id : userid
    };
    dataString = JSON.stringify(obj);
    var userresponse = undefined;
    $.ajax({
            
                url: 'http://localhost:8000/getuserdetails',
                method : 'get',
                dataType: 'json',
                contentType : 'application/json; charset=utf-8',
                data: {
                    user_id : userid
                },
                async : false,
                success: function(response){
                        userresponse = response;
                },
                error: function(jqXHR) {
                    console.log("ajax error " + jqXHR.status);
                }
            });
    var val = JSON.stringify(userresponse);
    var data = JSON.parse(val);
    return userresponse;   
}
            