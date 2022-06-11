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
        $(".lotto-special-num div").empty();
        $(".lotto-special-num span").removeClass("result-active");
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
    if (iCurPrize == 0 || iCurPrize == 3) {
        console.log('ក្រាស់');
        $("#jakepot3").addClass("jakepot").append((iCurPrize == 0 ? 'X5' : 'X3'));
        $(".lotto-special-num #span_result3").addClass("result-active");
    }
    else if (iCurPrize == 1 || iCurPrize == 4) {
        console.log('ស្តើង');
        $("#jakepot1").addClass("jakepot").append((iCurPrize == 1 ? 'X3' : 'X5'));
        $(".lotto-special-num #span_result1").addClass("result-active");
    }
    else if (iCurPrize == 2 || iCurPrize == 5) {
        console.log('ស្មើ');
        $("#jakepot2").addClass("jakepot").append((iCurPrize == 2 ? 'X2' : 'X10'));
        $(".lotto-special-num #span_result2").addClass("result-active");
    }
}