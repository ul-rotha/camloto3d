"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();


connection.on("ReceiveMessage", function (Eventmessage) {

    if (Eventmessage.subject == "start new game") {
        //$("#div_printpopup").hide();
        var objgame = JSON.parse(Eventmessage.message);
        loadgameinfo(objgame.gameid, objgame.createddate);
        s_oMain.gotoGame();
        //$("#div_resultinfo").html("");

        //loadnumbers();
    } else if (Eventmessage.subject == "count down") {
        var objgame = JSON.parse(Eventmessage.message);
        console.log(objgame)
        countdown(objgame.timeremaining, objgame.gameid);

        if (objgame.timeremaining <= 10) {
            
            if (objgame.timeremaining >= 9) {
                clearResult();
                //$("#div_resultinfo").html("");
                
            }
            if (objgame.timeremaining == 2 || objgame.timeremaining == 4 || objgame.timeremaining == 6 || objgame.timeremaining == 8 || objgame.timeremaining == 10) {
                //playeraudio("clear-announce");
                //playaudiofromcontrol("audioplayer_notice");
                
            }


        }


    }
    else if (Eventmessage.subject == "start result") {
        console.log("start result");

        var objresult = JSON.parse(Eventmessage.message);
        $("#result-date").html(
            `<span class="font-style-2">` + objresult.substr(8, 2) + '/' + objresult.substr(5, 2) + '/' + objresult.substr(0, 4) + `</span>
        <span class="font-style-2"> ឆ្នោតទី ` + objresult.GameID + `</span>
        <span class="font-style-2">` + objresult.ResultDate.substr(11, 8) + `</span>
        `
        );
        console.log("Loaded result date");

        //var objresult = JSON.parse(Eventmessage.message);
        //var resultinfo = ""
        //resultinfo += '<span class="font-style-2">' + objresult.ResultDate.substr(8, 2) + '/' + objresult.ResultDate.substr(5, 2) + '/' + objresult.ResultDate.substr(0, 4) + '</span>';
        //resultinfo += '<span class="font-style-2"><span class="gameid" > ឆ្នោតទី ' + objresult.GameID + '</span>&nbsp;' + objresult.ResultDate.substr(11, 8) + '</span>';

        //$("#div_resultinfo").html(resultinfo);
        //$("#div_popup_drawing").show();
        //load_drawing();

    } else if (Eventmessage.subject == "result1") {
        var resultstring = Eventmessage.message;
        //console.log("resultstring1:" + resultstring);
        console.log("test" + resultstring);
        load_result(1, resultstring);
        //playaudiofromcontrol("audioplayer_result");
    } else if (Eventmessage.subject == "result1stop") {
        load_drawing();
    } else if (Eventmessage.subject == "end result") {
        console.log("end result:");
        var jsonresult = Eventmessage.message;
        show_result(jsonresult);
        stop_drawing("");

    } else if (Eventmessage.subject == "end game") {

    } else {

    }


});

function loadgameinfo(gameid, gamedate) {
    console.log("GameDate:")

    var gamedatestr = '<span class="font-style-2">' + gamedate.substr(8, 2) + '/' + gamedate.substr(5, 2) + '/' + gamedate.substr(0, 4) + '</span>';
    var gametime = '<span class="font-style-2">' + gamedate.substr(11, 8) + '</span>';
    var gameinfo = `<table style="width:100%">
						<tr>
							<td>` + gamedatestr + ' ' + gametime + `</td>
							<td style="text-align:right;">` + '<div class="gameid">ឆ្នោតទី ' + gameid + '</div>' + `</td>
						</tr>
					</table>`

        ;
    var html = '';
    html = `<div>
                                        <span class="font-style-2">` + gamedate.substr(8, 2) + '/' + gamedate.substr(5, 2) + '/' + gamedate.substr(0, 4) + `</span>
                                        <span class="font-style-2">` + gamedate.substr(11, 8) + `</span>
                                    </div>
                                    <div class="gameid">ឆ្នោតទី ` + gameid + `</div>`

    $("#div_gameinfo").html(html);
}



function DisplayResult() {


    if (iCurPrize == 0 || iCurPrize == 3) {
        console.log('ក្រាស់');
        $("#div_result3").addClass("result-active");

        $("#div_result3 .jak").addClass("jakepot").append((iCurPrize == 0 ? 'X5' : 'X3'));

        $("#span3").addClass("white");
    }
    else if (iCurPrize == 1 || iCurPrize == 4) {
        console.log('ស្តើង');
        $("#div_result1").addClass("result-active");

        $("#div_result1 .jak").addClass("jakepot").append((iCurPrize == 1 ? 'X3' : 'X5'));

        $("#span1").addClass("white");
    }
    else if (iCurPrize == 2 || iCurPrize == 5) {
        console.log('ស្មើ');
        $("#div_result2").addClass("result-active");

        $("#div_result2 .jak").addClass("jakepot").append((iCurPrize == 2 ? 'X2' : 'X10'));

        $("#span2").addClass("white");
    }


    //if (iCurPrize == 0 || iCurPrize == 3) {
    //    console.log('ក្រាស់');
    //    $("#jakepot3").addClass("jakepot").append((iCurPrize == 0 ? 'X5' : 'X3'));
    //    $(".lotto-special-num #span_result3").addClass("result-active");
    //}
    //else if (iCurPrize == 1 || iCurPrize == 4) {
    //    console.log('ស្តើង');
    //    $("#jakepot1").addClass("jakepot").append((iCurPrize == 1 ? 'X3' : 'X5'));
    //    $(".lotto-special-num #span_result1").addClass("result-active");
    //}
    //else if (iCurPrize == 2 || iCurPrize == 5) {
    //    console.log('ស្មើ');
    //    $("#jakepot2").addClass("jakepot").append((iCurPrize == 2 ? 'X2' : 'X10'));
    //    $(".lotto-special-num #span_result2").addClass("result-active");
    //}
}

connection.start().then(function () {

    $("#div_printpopup").show();
    console.log("hub connected");

    loadnumbers();


    get_latestresult();
    get_currentgame();

    var server = getUrlParameter("server");
    loadnumbers();
 




}).catch(function (err) {
    console.log(err);
});



$(document).ready(function () {

    //checktoken();
    //playeraudio("winning");
});

function getUrlVars() {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}


function checktoken() {
    var token = getUrlVars()["token"];

    $.ajax({
        //cache: false,
        async: false,
        type: "POST",
        //dataType: "Json",
        contentType: "application/json; charset=utf-8",
        url: "api/CheckToken",
        data: '{"TokenID":"' + token + '"}',
        success: function (data) {

            if (data == true) {

                window.location = "login";
            }
        },
        error: function (result) {
            console.log(result);
            //$('#loading').hide();
        }
    });


}

var maxsecond = 305;//360seconds=6mn

function get_latestresult() {
    console.log("get latest result");
    $.ajax({
        //cache: false,
        async: false,
        type: "POST",
        //dataType: "Json",
        contentType: "application/json; charset=utf-8",
        url: "api/LatestResult",
        data: '',
        success: function (data) {
            console.log("LatesResult");
            console.log(data);
            show_latest_result(data)

            console.log(data[0]);
            $("#div_resultinfo").html("");
        },
        error: function (result) {
            console.log(result);
            //return "";
            //$('#loading').hide();
        }
    });
}


function get_currentgame() {
    console.log("get current game");
    $.ajax({
        //cache: false,
        async: false,
        type: "POST",
        //dataType: "Json",
        contentType: "application/json; charset=utf-8",
        url: "api/getCurrentGame",
        data: '',
        success: function (data) {
            console.log(data);
            var objgame = JSON.parse(data);
            loadgameinfo(objgame.GameID, objgame.GameDate);
        },
        error: function (result) {
            console.log(result);
            //return "";
            //$('#loading').hide();
        }
    });
}



function show_result_html(datajson) {
    var data = JSON.parse(datajson);
    console.log("display result on result list");
    console.log(data);

    var html_result = '';
    console.log("result:" + data.Result1);
    var resultint = parseInt(data.Result1);
    if (resultint == 1) {
        console.log('ក្រាស់');
        html_result = '<span class="result-small-active" style="border-radius: 2vh;padding:1vh;">ក្រាស់ X5</span>'

    }
    else if (resultint == 2) {
        console.log('ស្តើង');
        html_result = '<span class="result-small-active" style="border-radius: 2vh;padding:1vh;">ស្តើង X3</span>'
    }
    else if (resultint == 3) {
        console.log('ស្មើ');
        html_result = '<span class="result-small-active" style="border-radius: 2vh;padding:1vh;">ស្មើ X2</span>'
    }
    else if (resultint == 4) {
        html_result = '<span class="result-small-active" style="border-radius: 2vh;padding:1vh;">ក្រាស់ X3</span>'
    }
    else if (resultint == 5) {
        html_result = '<span class="result-small-active" style="border-radius: 2vh;padding:1vh;">ស្តើង X5</span>'
    }
    else if (resultint == 6) {
        console.log('ស្មើ');
        html_result = '<span class="result-small-active" style="border-radius: 2vh;padding:1vh;">ស្មើ X10</span>'
    }

    var html = '';
    var resultdate = data.ResultDate;
    html = `<div class="result-small">
                    <div style='width:8.5vh;height:9vh;float:left;text-align:left;'><div style='font-size:3vh;'>#${(data.GameID)}</div>
                    <div style='font-size:2vh;'>${(resultdate.substr(11, 8))}
                    </div>
                    </div>
                    <div style='width:14vh;height:9vh;float:left;font-size:3vh;padding:2vh 0vh;'>` + html_result + `</div>
            </div>`;

    //html += "<div>";
    //html += "Game #" + data.GameID;
    //html += "</div>";
    //html += "<div>";
    //html += "<span class='round-number-green'>" + data.Result1 + "</span>";;
    //html += "<span class='round-number-green'>" + data.Result2 + "</span>";;
    //html += "<span class='round-number-green'>" + data.Result3 + "</span>";;
    //html += "<span class='round-number-green'>" + data.Result4 + "</span>";;
    //html += "<span class='round-number-green'>" + data.Result5 + "</span>";;
    //html += "</div>"
    var result1;
    result1 = parseInt(data.Result1);
    var result1str;
    result1str = data.Result1;


    console.log(html);





    var prehtml = $("#lastresult").html();
    html = html + prehtml;
    $("#lastresult").html(html);
}
function clientTimer(secondsout) {

    var totalminute = parseInt((maxsecond - secondsout) / 60);
    var seconds = maxsecond - totalminute * 60 - secondsout;
    $("#div_timer").html("Minute:" + totalminute + ";Second:" + seconds);
    //$("#div_timer").html(maxsecond-secondsout);
}


var totalminute = 0;
var timespent = 0;
function countdown(timeremaining, gameid) {
    console.log("start count:" + timeremaining);

    totalminute = parseInt((timeremaining) / 60);



    var seconds = timeremaining - totalminute * 60;

    if (seconds < 0) {
        $("#div_timer").html("0");

    } else {
        if (seconds < 10) {
            $("#div_timer").html('0' + totalminute + ":0" + seconds + "");
        } else {
            $("#div_timer").html('0' + totalminute + ":" + seconds + "");
        }

        // $("#div_timer").html(timeremaining);
    }

}

function clearResult() {
    $(".lotto-special-num").removeClass("result-active");
    $(".lotto-special-num-result").removeClass("white");
    $(".jak").empty();
}


var result_index = 0;
function load_result(result_index, result) {

    console.log("load result:" + result);
    clearResult();
    console.log("result clear");
    var number = Math.floor(Math.random() * 5);


    s_oGame.launch(number);
    iCurPrize = parseInt(result) - 1;
    console.log("result launched");

}

function show_result(datajson) {
    console.log("show_result");
    var data = JSON.parse(datajson);
    show_result_html(datajson);

    var divs = document.getElementById("lastresult").getElementsByClassName("result-small");


    //$("#div_result_list .recent-item div:last").each(function () {

    //});

    var lastChild = divs[divs.length - 1];
    $(lastChild).remove();

    //end_game(gameid);
}


function show_latest_result(data) {

    var arrlength = data.length;
    for (var i = 0; i < arrlength; i++) {
        console.log(data[i]);
        show_result_html(data[i]);

    }


    //end_game(gameid);
}


//$(document).ready(    
//    clear_result_list
//);



function clear_result_list() {
    $("#div_result_list").html("");

}
function loadnumbers() {
    var html = "";
    for (var i = 1; i < 100; i++) {
        if (i < 10) {
            html += "<div class='round-number' id='span_n0" + i + "'>0" + i + "</div>";

        } else {
            html += "<div class='round-number' id='span_n" + i + "'>" + i + "</div>";

        }
    }



    $("#div_numbers").html(html);
}




var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1)


    var uri_encoded = replaceAll(sPageURL, '%', '%25');
    console.log(uri_encoded);
    var sURLVariables = uri_encoded.split('&'),
        sParameterName,
        i;


    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};


function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
}

function playeraudio(filename) {
    console.log("player audio");
    //let fileUrl = "https://gameaudio.azurewebsites.net/api/Audio?filename=" + filename;
    let fileUrl = "Audio/" + filename + ".wav";
    //$("#audioplayer").append(`<source type="audio/wav" src="${fileUrl}"/>`)
    //$("#audioplayer").get(0).play();
    //var myAudio = new Audio(fileUrl);
    var myAudio = $("#audioplayer");
    myAudio.play();
}
function playaudiofromcontrol(id) {
    $("#" + id).get(0).play();

}



function playeraudioold(filename) {
    console.log("player audio");
    let fileUrl = "https://gameaudio.azurewebsites.net/api/Audio?filename=" + filename;
    $.ajax({
        url: fileUrl,
        type: "GET",
        xhr: function () {
            var xhr = new window.XMLHttpRequest();
            xhr.addEventListener("progress", function (evt) {
                if (evt.lengthComputable) {
                    var percentComplete = evt.loaded / evt.total;
                    if (evt.total > 0) {
                        //$('#percentage').html(Math.round(percentComplete * 100) + "%");
                    }
                }
                //console.log(evt.loaded)
            }, false);
            return xhr;
        },
        xhrFields: { responseType: 'blob' },
        success: (r) => {
            let blob = new Blob([r], { type: 'audio/wav' })
            let src = URL.createObjectURL(blob);
            $("#audioplayer").append(`<source type="audio/wav" src="${src}"/>`)
        },
        error: () => {
            Swal.fire(
                'Error',
                'There was something wrong\nI\'m redirecting you back!',
                'error'
            ).then(() => {
                location.reload()
            })
            //console.log("Error")
        }
    })
}

