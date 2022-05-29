var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

//Disable the send button until connection is established.
//document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (user, message) {
    console.log(user);
    if (user == "startGame") {
        StartGame();
    }
    else if (user == "mainResult") {
        mainTimer.stop();
        $(".main").removeClass("lotto-ball-active");
        var id = "#mainResult" + message;
        result = message;
        $(id).addClass("lotto-ball-active");
    }
    else if (user == "subPlay") {
        StartSubGame();
    }
    else if (user == "subResult") {
        subTimer.stop();
        var id = "sub-play" + message;
        
        $("." + id).removeClass("lotto-ball-sub-active");
        console.log("." + id + "[key=" + message + "]");
        $("." + id + "[key=" + message + "]").addClass("lotto-ball-sub-active");
    }
    else if (user == "countdown") {
        $(".main").removeClass("lotto-ball-active");
        $(".sub-play1").removeClass("lotto-ball-sub-active");
        $(".sub-play2").removeClass("lotto-ball-sub-active");
        $(".sub-play3").removeClass("lotto-ball-sub-active");
        countdown(message);
    }
});

connection.start().then(function () {
    console.log("Stated");
    //document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});



var totalminute = 0;
var timespent = 0;
function countdown(timeremaining) {

    console.log("start count:" + timeremaining);

    totalminute = parseInt((timeremaining) / 60);



    var seconds = timeremaining - totalminute * 60;

    if (seconds < 0) {
        $("#countdown").html("0");

    } else {
        if (seconds < 10) {
            $("#countdown").html('0' + totalminute + ":0" + seconds + "");
        } else {
            $("#countdown").html('0' + totalminute + ":" + seconds + "");
        }

        // $("#div_timer").html(timeremaining);
    }

}