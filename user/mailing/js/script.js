const messageSubscribed = "Jesteś zapisany do naszego Newslettera.";
const messageUnsubscribed = "Zosatłeś pomyślnie wypisany z Newslettera.";
const messageNotSubscribed = "Nie jesteś jeszcze zapisany do naszego Newslettera.";

//submit subscribe
$(document).ready(function(){
    $('#sub-form').submit(function() {
        var maiingList = {};
        maiingList.email = $('#emailSub').val();
        event.preventDefault();

        if(maiingList.email){
            postData("mailingList/subscribe",maiingList, messageSubscribed);
        }
        else emptyMessage();
    });
});
//submit unbscribe
$(document).ready(function(){
    $('#unsub-form').submit(function() {
        var maiingList = {};
        maiingList.email = $('#emailUnsub').val();
        event.preventDefault();

        if(maiingList.email){
            postData("mailingList/unsubscribe", maiingList, messageUnsubscribed);
        }
        else emptyMessage();
    });
});
//submit check  if subscribed
$(document).ready(function(){
    $('#check-sub-form').submit(function() {
        var maiingList = {};
        maiingList.email = $('#emailCheck').val();
        event.preventDefault();

        if(maiingList.email){
            postData("mailingList/checkIfSubscribe", maiingList, null);
        }
        else emptyMessage();
    });
});

function postData(path, body, message){
        $.ajax({
            type: "POST",
            headers: {"content-type": "application/json"},
            url: ${SERVER_URL} + path,
            dataType: 'application/json',
            data: JSON.stringify(body),
            complete: function (response) {
                responseJson= JSON.parse(response.responseText);
                if (response.status == 200) {
                    if (message == null)
                        checkIfSubMessage(responseJson.message);
                    else
                        postMessage(message);
                }
                else
                    errMessage(responseJson.errors);
            }
        })
}
function postMessage(message){
    $('#message').html(message).css("color", "#6AA730");
    $('#message-box').css("display", "block").css("background", "#C5F9A7").css("border", "1px solid #6AA730");

}
function checkIfSubMessage(message) {
    if(message=="")
        postMessage(messageNotSubscribed);
    else
        postMessage(messageSubscribed);

}
function emptyMessage(){
    $('#message').html('Wypełnij pole Email').css("color","#D52727");
    $('#message-box').css("display","block").css("background","#FFEBE8")
        .css("border","1px solid #D52727");
}
function errMessage(message){
    $('#message').html(message).css("color","#D52727");
    $('#message-box').css("display","block").css("background","#FFEBE8")
        .css("border","1px solid #D52727").css("height");
}
