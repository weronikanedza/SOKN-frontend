$(document).ready(function(){
  $("#loginForm").submit(function() { // loginForm is submitted
    var email = $('#email').val(); //get values
    var password = $('#password').val();

    if(email && password){

    }else{
        //pokaż error
    }
  });
});