
$(document).ready(function () {

            loadreceipt();
    
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

function alertme(title) {
    $("#div_alert_title").html(title);
    $("#div_alert").show();

}

function LoadReprint() {
    setTimeout(function () {
        alertme("");
    }, 3000);
}
function reprint() {
    window.location = window.location.href;
}
function closepopup() {
    window.location = window.location.href + "&back=1";
}

function loadreceipt() {
    var qrcode = getUrlVars()["qrcode"];
    console.log("qrcode:" + qrcode);
    $("#divbettingid").html("លេខសំគាល់ #" + qrcode);

    receipt(qrcode);
    qrcode_img_base64(qrcode);
}

function qrcode_img_base64(qrcode) {
    console.log("qrcode:" + qrcode);
    $.ajax({
        //cache: false,
        async: true,
        type: "get",
        //dataType: "Json",
        contentType: "application/json; charset=utf-8",
        url: "api/QRCode/" + qrcode,
        data: '',
        success: function (data) {

            $("#imgqr").prop("src", "data:image/png;base64," + data);
        },
        error: function (result) {
            console.log(result);
            //return "";
            //$('#loading').hide();
        }
    });
}


function receipt(qrcode) {
  
    var code = qrcode;

    $.ajax({
        //cache: false,
        async: true,
        type: "get",
        //dataType: "Json",
        contentType: "application/json; charset=utf-8",
        url: "api/getbettingreceipt/" + code,
        data: '',
        success: function (dataobj) {
            console.log(dataobj);
            var html = create_receipt(dataobj);

            $("#div_receipt").html(html);
            //LoadReprint();
        },
        error: function (result) {
            console.log(result);
            //$('#loading').hide();
        }
    });


}


function create_receipt(objBetting) {


    var html = "";
    html += '<div style="font-size:xx-large;">';
    html += "<img src='images/CamLotto.png' style='width:100px;'>";
    html += '<span class="logo-title" ><span style="color:black;">CAM</span><span style="color:#c67819"> LOTTO</span> <br></span>';
    html += "</div>";
    html += "<div>ឆ្នោតទី:" + objBetting.gameID + "</div>";
    html += "<div>ម៉ោងចាក់ឆ្នោត:" + objBetting.createdDate + "</div>";


    html += printdetail(objBetting);

    html += "<div style='padding:5px;border-bottom: solid 1px gray;'></div>";
    html += "<div>អ្នកលក់:" + objBetting.createdBy + "</div>";
    return html;
}

function printdetail(objresult) {

    var bettingNumber = objresult.betNumber.split(',');

    var html = "";


    for (var i = 0; i < bettingNumber.length; i++) {
        html += `<div>ចាក់ ${NumberToText(bettingNumber[i])}</div>`;
    }

    html += "<div style='width: 100%;display: inline-block;margin-top: 20px;' >";


    html += "<div>ចំនួនទឹកប្រាក់:<span class='bet-amount'>" + objresult.betAmount + " KHR</span></div>";
    html += "<div>សរុប:<span class='bet-amount'>" + objresult.totalBet + " KHR</span></div>";

    //console.log(html);
    return html;


}


function NumberToText(number) {
    var result = '';
    switch (number) {
        case '1':
            result = 'ស្តើង';
            break;
        case '2':
            result = 'ស្មើ';
            break;
        case '3':
            result = 'ក្រាស់';
            break;
        default:
            result = '';
            break;
    }
    return result;

}


function load_numberlist_html(list) {
    var html = "";
    html += "<span class='div'>ចាក់លេខៈ</div> ";
    for (var i = 0; i < list.length; i++) {
        var number = list[i];
        if (parseInt(number) < 10) {
            html += "<div class='round-number' style='line-height:30px;float:none;display:inline-block;'>0" + number + "</div>";
        } else {
            html += "<div class='round-number' style='line-height:30px;float:none;display:inline-block;'>" + number + "</div>";
        }
        
    }

    return html;
}
