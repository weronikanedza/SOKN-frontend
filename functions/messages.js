function showAcceptedMessage(text){
    $('#errMessage').html(text).css("color","#6AA730");
    $('#message-box').css("display","block").css("background","#C5F9A7").css("border","1px solid #6AA730");
}

function showMessage(text){
    $('#errMessage').html( text);
    $('#message-box').css("display","block");
}

function showErrorMessage(text){
    $('#errMessage').html(text).css("color","#D52727");
    $('#message-box').css("display","block").css("background","#FFEBE8").css("border","1px solid #D52727");
}