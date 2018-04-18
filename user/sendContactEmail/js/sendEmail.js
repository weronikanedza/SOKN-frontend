$(document).ready(function(){
    $("#checkform").submit(function() { // loginForm is submitted
        var mail=new Object();
        mail.email=$('#email').val();//get values
        mail.name= $('#subject').val();  
		mail.text= $('#message').val();  		
        event.preventDefault();
        
        if(mail.email && mail.name){ //check if fields are filled
           post_data(mail)
        }else{
            loginEmptyFields();
        }
    });
  });

  function loginAccepted(data){
    var dataObject=JSON.parse(data.responseText);    
    localStorage.setItem("token",dataObject.token); //save token in local memory

    if(dataObject.user.authorities.length>1)
    window.location.href="../../Reviewer/mainPageReviewer/index.html";
    
    if(dataObject.user.authorities[0].role==="AUTHOR")
    window.location.href="../../Author/mainPageAuthor/index.html";
    else
    window.location.href="../../Admin/mainPageAdmin/index.html";
  }

  function loginRejected(){
    $('#errMessage').html( " Nieprawidłowo podany email lub hasło");
    $('#message-box').css("display","block");
    }

    function loginEmptyFields(){
        $('#errMessage').html( "Uzupełnij wszystkie pola");
        $('#message-box').css("display","block");
    }

    function post_data(user){
        $.ajax({
            type: "POST",
            headers : {
                "content-type" : "application/json"
            },
            url: `${SERVER_URL}/user/sendContactEmail`,
            data: JSON.stringify(user),
            complete: function(data) {
                if(data.status===200) loginAccepted(data); //check response status
                else loginRejected();
            }  ,
            dataType: 'application/json'
        });
    }