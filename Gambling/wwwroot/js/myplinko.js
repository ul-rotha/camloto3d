var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

connection.on("ReceiveMessage", function (action, message) {
    if (action == "startGame") {
        console.log(message);


        s_oGame.launch(message.tube);
        iCurPrize = message.result;


    }
    else if (action == "startSubGame") {
       
    }
    else if (action == "newGame") {
        document.getElementById("secondResult").innerHTML = "";
    }
    else if (action == "countDown") {
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

   // console.log("start count:" + timeremaining);

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


function DisplayResult() {
    console.log(iCurPrize);
}