const URL = "http://localhost:8080/user/register";

$(document).ready(() => {
    $("#registration-form").submit(() => {
        const user = {};
        user.firstName = $("#firstName").val();
        user.lastName = $("#lastName").val();
        user.gender = $("#gender").val();
        user.email = $("#email").val();
        user.degree = $("#degree").val();
        user.password = $("#password").val();
        user.matchingPassword = $("#matching-pwd").val();

        if (user.gender === "Mężczyzna")
            user.gender = "MALE";
        else
            user.gender = "FEMALE";

        event.preventDefault();
        postData(user);
    });
});

function postData(body) {

    fetch(URL, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "content-type": "application/json"
        }
    }).then(response => {
        if (response.status === 201) {
            userRegistered(response.json());
        } else {
            registrationFailed(response.json());
        }
    });
}

function userRegistered(response) {
    $("#message-box")
        .html(`<span id="response-message">Potwierdź rejestrację poprzez kliknięcie w link wysłany na Twój adres email!</span>`)
        .css("display", "block")
        .css("background", "#AAFFBA");
}

function registrationFailed(response) {
    response.then(data => {
        data.errors.forEach(element => {
            $("#message-box")
                .html(`<span id="response-message">${element}</span>`)
                .append('<br>')
                .css("display", "block")
                .css("background", "#FFEBE8");
        });
    });
}