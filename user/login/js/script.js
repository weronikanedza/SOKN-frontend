$(document).ready(function(){
    $("#loginForm").submit(function() { // loginForm is submitted
        event.preventDefault();
        const user={
        email:$('#email').val(),//get values
        password:$('#password').val() 
        }    
        postData(JSON.stringify(user),"login")  
    });
  });

  function completePostBody(data){
    if(data.status===200) loginAccepted(data); //check response status
    else (showMessage("Nieprawidłowy email lub hasło"));
  }

  function loginAccepted(data){
    var dataObject=JSON.parse(data.responseText);    
    localStorage.setItem("token",dataObject.token); //save token in local memory

    if(dataObject.user.authorities.length>1)
    window.location.href="../../Reviewer/main/index.html";
    
    if(dataObject.user.authorities[0].role==="AUTHOR")
    window.location.href="../../Author/main/index.html";
    else
    window.location.href="../../Admin/main/index.html";
  }
