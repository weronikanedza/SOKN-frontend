function showAcceptedMessage(text){
    $('#errMessage').html(text).css("color","#6AA730");
    $('#message-box').css("display","block").css("background","#C5F9A7").css("border","1px solid #6AA730");
}
function showMessage(text){
    $('#errMessage').html( text);
    $('#message-box').css("display","block");
}
function responseAction(data,text){
    switch(data.status){
        case 200 :
            showAcceptedMessage(text);
            $('#submit').attr("disabled", true);
            break;
        case 406 :
            const err=JSON.parse(data.responseText);
            showMessage(err.errors);
            break;
        default:
            showMessage("Wystąpiły błędy.Spróbuj ponownie poźniej");
            break;
    }
}