$(document).ready(function(){
    $('#checkform').submit(function() { // loginForm is submitted
        event.preventDefault();
        const email=$('#email').val();     
        postData(email,"user/checkIfRegistered");
    });
});

function completePostBody(data){
    if(data.status==200) accepted();
    else errMessage();
}

function accepted(){
    $('#message').html('Email został wysłany').css("color","#6AA730");
    $('#message-box').css("display","block").css("background","#C5F9A7").css("border","1px solid #6AA730");
}

function errMessage(){
    $('#message').html('Email nie został wysłany.Spróbuj ponownie').css("color","#D52727");
        $('#message-box').css("display","block").css("background","#FFEBE8")
        .css("border","1px solid #D52727").css("height");
}
