var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

connection.on("ReceiveMessage", function (action, message) {
    if (action == "startGame") {

        clearResult();

        s_oGame.launch(message.tube);
        iCurPrize = message.result;


    }
    else if (action == "startSubGame") {

    }
    else if (action == "newGame") {
        s_oMain.gotoGame(); // reset new game prevent error stuck ball
        GetRecently();
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


function clearResult() {
    $(".lotto-special-num").removeClass("result-active");
    $(".lotto-special-num-result").removeClass("white");
    $(".jak").empty();
}

var totalminute = 0;
var timespent = 0;
function countdown(timeremaining) {

    // console.log("start count:" + timeremaining);

    totalminute = parseInt((timeremaining) / 60);



    var seconds = timeremaining - totalminute * 60;

    if (seconds == 10) {
        clearResult();
        $("#result-date").empty();
    }

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

    $("#result-date").append(
        `<span class="font-style-2">15/06/2022</span>
        <span class="font-style-2"> ឆ្នោតទី 23853</span>
        <span class="font-style-2">21:45:41</span>
        `
    );

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


function GetRecently() {
    $("#lastresult").empty();
    for (let i = 1; i < 11; i++) {
        if (i < 3)
            var r = `<div class="result-small">
                    <div>#${(23832 + i)} 19:45:06</div>
                    <span id="span_result3" class="result-small-active">ស្មើ X${i}</span>
                </div>`;
        else if (i < 7) {
            var r = `<div class="result-small">
                    <div>#${(23832 + i)} 19:45:06</div>
                    <span id="span_result3" class="result-small-active">ស្តើង X${i}</span>
                </div>`;
        }
        else
            var r = `<div class="result-small">
                    <div>#${(23832 + i)} 19:45:06</div>
                    <span id="span_result3" class="result-small-active">ក្រាស់ X${i}</span>
                </div>`;
        document.getElementById("lastresult").innerHTML += r;
    }
}