$(document).ready(function () {
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
            user.fieldOfArticles = [
                {id:$("#selectpicker1").val(),
                 field:$("#selectpicker1").find('option:selected').text()}
                ]
    
            if (user.gender === "Mezczyzna")
                user.gender = "MALE";
            else
                user.gender = "FEMALE";
            
            if (user.affiliation === Żonaty / Zamężna) 
                user.affiliation = "Zonaty / Zamezna";
            
            
            // if second field was selected and it's not the same as first then add this field 
            if($("#selectpicker2").val() != 0 && $("#selectpicker2").val() != $("#selectpicker1").val()){
                user.fieldOfArticles.push({id:$("#selectpicker2").val(),
                    field:$("#selectpicker2").find('option:selected').text()})
            }
            
            event.preventDefault();
            $('#loadingGif').show();
            $('#message-box').css("display", "none");
            postDataWithToken(JSON.stringify(user), "/user/registerReviewer");
         });
});

function completePostBody(data) {
    $('#loadingGif').hide();
    if (data.status == 201) 
        showMessageBox("Konto zostało pomyślnie utworzone.", "#C5F9A7", "#6AA730");
    else {
        jsonData = JSON.parse(data.responseText);
        showMessageBox(jsonData.errors, "#FFEBE8", "#D52727");
    }
    
}

function showMessageBox(message, backgroundColor, textColor) {
    $('#message').html(message).css("color", textColor);
    $('#message-box').css("display","block")
                    .css("background", backgroundColor)
                    .css("border", "1px solid"+ textColor)
                    .css("margin", "30px");
}