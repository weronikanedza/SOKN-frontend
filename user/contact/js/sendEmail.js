$(document).ready(function(){
    $("#checkform").submit(function() { // checkForm is submitted
        var mail=new Object();
        mail.email=$('#email').val();//get values
        mail.name= $('#subject').val();  
		mail.text= $('#message').val();  		
        event.preventDefault();
        
        if(mail.email && mail.name && mail.text){ //check if fields are filled
           post_data(mail)
        }else{
            EmptyFields();
        }
    });
  });

  function Accepted(data){
      $('#message-box').css("display","block").css("background","#C5F9A7").css("border","1px solid #6AA730");
      $('#message-post').html('Email został wysłany').css("color","#6AA730");
  }

  function Rejected(){
    $('#errMessage').html( "Wystąpił błąd! Spróbuj ponownie za chwilę!");
    $('#message-box').css("display","block");
    }

    function EmptyFields(){
        $('#message-post').html('Wypełnij pole Email').css("color","#D52727");
        $('#message-box').css("display","block").css("background","#FFEBE8")
        .css("border","1px solid #D52727");    
    }

    function post_data(mail){
        $.ajax({
            type: "POST",
            headers : {
                "content-type" : "application/json"
            },
            url: `${SERVER_URL}/user/sendContactEmail`,
            data: JSON.stringify(mail),
            complete: function(data) {
                if(data.status===200) Accepted(data); //check response status
                else Rejected();
            }  ,
            dataType: 'application/json'
        });
    }