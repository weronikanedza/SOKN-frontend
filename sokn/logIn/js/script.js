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
    var token=JSON.parse(data.responseText).token; 
    localStorage.setItem("token",token); //save token in local memory
    alert("Udało się zalogować")
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
            url: "http://85.255.11.29:8080/login",
            data: JSON.stringify(user),
            complete: function(data, textStatus) {
                if(data.status==200) loginAccepted(data); //check response status
                else loginRejected();
            }  ,
            dataType: 'application/json'
        });
    }