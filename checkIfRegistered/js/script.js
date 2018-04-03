$(document).ready(function(){
    $('#checkform').submit(function() { // loginForm is submitted
        event.preventDefault();
       var email=$('#email').val();     
        if(email.length){ 
            post_data(email);
        }
        show_message(email.length);
    });
});

  function post_data(email){
    $.ajax({
        type: "POST",
        headers : {
            "content-type" : "application/json"
        },
        url: "http://localhost:8080/checkIfRegistered",
        data: email,
        complete: function(data) {
            // if(data.status==200) alert("Jest w bazie"); //check response status
            // else alert("nie ma w bazie");
        }  ,
        dataType: 'application/json'
    });
}

function show_message(length){
    if(length){
        $('#message').html('Email został wysłany').css("color","#6AA730");
        $('#message-box').css("display","block").css("background","#C5F9A7").css("border","1px solid #6AA730");
    }else{
        $('#message').html('Wypełnij pole').css("color","#D52727");
        $('#message-box').css("display","block").css("background","#FFEBE8")
        .css("border","1px solid #D52727");
    }
}
