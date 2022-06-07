var lotoTimer = null;
var current = 0;
var result = 0;

function StartSpin(i) {
    
    s_oGame.spinWheel(i);
}


function addSecondResult(i) {

    //var result = '';
    //if (i == 0)
    //    result = "ក្រាស់";
    //else if (i == 1)
    //    result = "ស្មើ";
    //else if (i == 2)
    //    result = "ស្តើង";

    //var showResult = '<div class="main lotto-ball"><span class="lotto-text-inner-ball">' + result + '</span></div>';
    //document.getElementById("result").innerHTML = showResult;

    var arr = arrResult[i];
    var arrDiv = '';
    for (let i = 0; i < arr.length; i++) {
        arrDiv += '<div class="play lotto-ball-sub mb-2" key=' + (i + 1) + '><span class="lotto-text-inner-ball-sub">' + arr[i] + '</span></div>';

    }

    document.getElementById("secondResult").innerHTML += arrDiv;
    StartSubGame();
}


function StartSubGame() {
    current = 0;
    result = 0;
    lotoTimer = new Timer(function () {
        RandomValue();
    }, 90);
}



function RandomValue() {
    var arrPlayButton = $(".play");
    if (arrPlayButton.length > 0) {
        arrPlayButton.removeClass("lotto-ball-sub-active");
        arrPlayButton.eq(current).addClass("lotto-ball-sub-active");

        current = current + 1;
        if (current == arrPlayButton.length)
            current = 0;
    }
}


function getRecent() {
    for (let i = 0; i < 10; i++) {
        var r = `<div class="row">
                    <div class="col-10">#18594 14:55:57</div>
                    <div class="col-2"><a href="#" class="text-warning text-decoration-none">>></a></div>
                </div>
                <div class="row latest">
                    <span>ស្តើង</span>
                    <span>x10</span>
                </div>`;
        document.getElementById("recent").innerHTML += r;
    }
}