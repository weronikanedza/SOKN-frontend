$(document).ready(() => {
    $("#registrationForm").submit(() => {
        const user = {};
        user.firstName = $("#firstName").val();
        user.lastName = $("#lastName").val();
        user.email = $("#email").val();
        user.password = $("#password").val();
        user.matchingPassword = $("#matching-pwd").val();
        user.gender = $("#gender").val();
        user.degree = $("#degree").val();
        user.affiliation = $("#affiliation").val();
        user.city = $("#city").val();
        user.zipCode = $("#zip_code").val();
        user.country = $("#country_selector").val();

        if (user.gender === "Mężczyzna")
            user.gender = "MALE";
        else
            user.gender = "FEMALE";

        event.preventDefault();
        postData(user);
    });
});

function postData(body) {

    $('#loadingGif').show();
    fetch(`${SERVER_URL}/user/register` , {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "content-type": "application/json"
        }
    }).then(response => {
        $('#loadingGif').hide();
        if (response.status === 201) {
            userRegistered();
        } else {
            registrationFailed(response.json());
        }
    });
}

function userRegistered() {
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
                .css("display", "block")
                .css("background", "#FFEBE8");
        });
    });
}