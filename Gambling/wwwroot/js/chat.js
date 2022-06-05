var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

connection.on("ReceiveMessage", function (user, message) {
    console.log("hello");
    if (user == "startGame") {
        document.getElementById("secondResult").innerHTML = "";
        StartSpin(message);
    }
    else if (user == "resultSubGame") {
        lotoTimer.stop();
        $(".play").removeClass("lotto-ball-sub-active");
        console.log(".play" + "[key=" + message + "]");
        $(".play" + "[key=" + message + "]").addClass("lotto-ball-sub-active");
    }
    else if (user == "newGame")
    {
        lotoTimer.stop();
        document.getElementById("secondResult").innerHTML = "";
    }
    else if (user == "countDown") {      
        countdown(message);
    }
});

connection.start().then(function () {
    console.log("Stated");
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