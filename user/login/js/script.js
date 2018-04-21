$(document).ready(function () {
    $("#loginForm").submit(function () { // loginForm is submitted
        var user = new Object();
        user.email = $('#email').val();//get values
        user.password = $('#password').val();
        event.preventDefault();

        if (user.email && user.password) { //check if fields are filled
            post_data(user)
        } else {
            loginEmptyFields();
        }
    });
});

function loginAccepted(data) {
    let dataObject = JSON.parse(data.responseText);
    localStorage.setItem("token", dataObject.token); //save token in local memory

    let authorities = dataObject.user.authorities;

    if (authorities.find(a => a.role === 'REVIEWER'))
        window.location.replace("../../../reviewer/main/index.html");

    else if (authorities.find(a => a.role === "AUTHOR"))
        window.location.replace("../../../author/main/index.html");

    else if (authorities.find(a => a.role === "ADMIN"))
        window.location.replace("../../../admin/main/index.html");
}

function loginRejected() {
    $('#errMessage').html(" Nieprawidłowo podany email lub hasło");
    $('#message-box').css("display", "block");
}

function loginEmptyFields() {
    $('#errMessage').html("Uzupełnij wszystkie pola");
    $('#message-box').css("display", "block");
}

function post_data(user) {
    $.ajax({
        type: "POST",
        headers: {
            "content-type": "application/json"
        },
        url: `${SERVER_URL}/login`,
        data: JSON.stringify(user),
        complete: function (data) {
            if (data.status === 200) loginAccepted(data); //check response status
            else loginRejected();
        },
        dataType: 'application/json'
    });
}