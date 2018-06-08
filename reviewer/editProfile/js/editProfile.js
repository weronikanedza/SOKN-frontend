let userFullData;
let shouldLogOut = false;

$(() => {
    getDataWithToken("/user/getUserByEmail");
});

function completeGetBody(response) {
    
    if (response.status == 200) {
        fillUserForm(JSON.parse(response.responseText));
    }else if (response.status == 500) {
        $("#submit").attr("disabled", true);
        showErrorMessage("Błąd serwera, spróbuj ponownie pożniej");
    } else {
        $("#submit").attr("disabled", true);
        const err = JSON.parse(response.responseText);
        showErrorMessage(err.errors);
        
    }
}

function fillUserForm(user) {
    userFullData = user;
    $("#firstName").val(user.firstName);
    $("#lastName").val(user.lastName);
    $("#email").val(user.email);
    $("#degree").val(user.degree);
    $("#city").val(user.city);
    $("#zip_code").val(user.zipCode);
    $("#country_selector").val(user.country);
    
    if (user.gender === "MALE") 
        $("#gender").val("Mężczyzna");
    else
        $("#gender").val("Kobieta");
    
    if (user.affiliation === "Zonaty / Zamezna")
        $("#affiliation").val("Żonaty / Zamężna");
    else
        $("#affiliation").val(user.affiliation);
}

$(document).ready(() => {
    $("#user-form").submit(() => {
        
        if(userFullData.email != $("#email").val())
            shouldLogOut = true;
        
        userFullData.firstName = $("#firstName").val();
        userFullData.lastName = $("#lastName").val();
        userFullData.email = $("#email").val();
        userFullData.matchingPassword = userFullData.password;
        userFullData.gender = $("#gender").val();
        userFullData.degree = $("#degree").val();
        userFullData.affiliation = $("#affiliation").val();
        userFullData.city = $("#city").val();
        userFullData.zipCode = $("#zip_code").val();
        userFullData.country = $("#country_selector").val();
        
        if (userFullData.gender === "Mężczyzna")
            userFullData.gender = "MALE";
        else
            userFullData.gender = "FEMALE";
        
        if (userFullData.affiliation === "Żonaty / Zamężna")
            userFullData.affiliation = "Zonaty / Zamezna";
        
        event.preventDefault();
        $('#loadingGif').show();
        $('#message-box').css("display", "none");
        postDataWithToken(JSON.stringify(userFullData), "/user/update");
    });
});

function completePostBody(data) {
    $('#loadingGif').hide();
    if (data.status == 200) {
        showAcceptedMessage("Dane zostały zaktualizowane");
        if (shouldLogOut) {
            localStorage.removeItem('token')
            $('#messageModal').modal();
        }
    }
    else {
        jsonData = JSON.parse(data.responseText);
        showErrorMessage(jsonData.errors);
    }
}
