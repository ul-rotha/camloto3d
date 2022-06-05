var lotoTimer = new Timer();
var current = 0;
var result = 0;

function StartSpin(i) {
    
    s_oGame.spinWheel(i);
}


function addSecondResult(i) {

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