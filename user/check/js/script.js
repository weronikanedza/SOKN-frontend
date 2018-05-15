$(document).ready(function(){
    $('#checkform').submit(function() { // loginForm is submitted
        event.preventDefault();
       var email=$('#email').val();     
        if(email.length){ 
            postData(email,"user/checkIfRegistered");
        }
        else empty_message(email.length);
    });
});

function completePostBody(data){
    if(data.status==200) pos_message(); //check response status
    else err_message();
    $('#submit-btn').attr('disabled',true);
}
  
function pos_message(){
    $('#message').html('Email został wysłany').css("color","#6AA730");
    $('#message-box').css("display","block").css("background","#C5F9A7").css("border","1px solid #6AA730");
}
function empty_message(){
        $('#message').html('Wypełnij pole Email').css("color","#D52727");
        $('#message-box').css("display","block").css("background","#FFEBE8")
        .css("border","1px solid #D52727");    
}

function err_message(){
    $('#message').html('Email nie został wysłany.Spróbuj ponownie').css("color","#D52727");
        $('#message-box').css("display","block").css("background","#FFEBE8")
        .css("border","1px solid #D52727").css("height");
}
