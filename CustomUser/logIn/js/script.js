$(document).ready(function(){
    $("#loginForm").submit(function() { // loginForm is submitted
        var user=new Object();
        user.username=$('#email').val();//get values
        user.password= $('#password').val();      
        event.preventDefault();
        
        if(user.username && user.password){ //check if fields are filled
           post_data(user)
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
    
    if(dataObject.user.authorities[0].role=="AUTHOR")
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
            url: "http://localhost:8080/login",
            data: JSON.stringify(user),
            complete: function(data) {
                if(data.status==200) loginAccepted(data); //check response status
                else loginRejected();
            }  ,
            dataType: 'application/json'
        });
    }