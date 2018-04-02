$(document).ready(function(){
    $('#submit-btn').click(function() { // loginForm is submitted
        event.preventDefault();
       var email=$('#email').val();     
        if(email.length){ //check if fields are filled
           // post_data(email)
        }else{
            $('#message-box').css("display","block");
        }
    });
});

  function post_data(email){
    $.ajax({
        type: "POST",
        headers : {
            "content-type" : "application/json"
        },
        url: "http://85.255.11.29:8080/login",
        data: JSON.stringify(email),
        complete: function(data, textStatus) {
            if(data.status==200) loginAccepted(data); //check response status
            else loginRejected();
        }  ,
        dataType: 'application/json'
    });
}
