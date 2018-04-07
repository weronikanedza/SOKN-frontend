$(document).ready(function(){
    $('#checkform').submit(function() { // loginForm is submitted
        event.preventDefault();
       var email=$('#email').val();     
        if(email.length){ 
            post_data(email);
        }
        else empty_message(email.length);
    });
});

  function post_data(email){
    $.ajax({
        type: "POST",
        headers : {
            "content-type" : "application/json"
        },
        url: "http://localhost:8080/user/checkIfRegistered",
        data: email,
        complete: function(data) {
             if(data.status==200) pos_message(); //check response status
             else err_message();
        }  ,
        dataType: 'application/json'
    });
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
