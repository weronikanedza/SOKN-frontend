$(document).ready(() => {
    $("#addAuthority").submit(() => {
        let data = {};
        data.email = $("#email").val();
        data.fieldObligatory = $("#selectorpicker1").find('option:selected').text();
        
        if($("#selectpicker2").val() != 0 && $("#selectpicker2").val() != $("#selectpicker1").val())
            data.fieldAdditional = $("#selectorpicker1").find('option:selected').text();
        
        event.preventDefault();
        $('#loadingGif').show();
        $('#message-box').css("display", "none");
        $('#submitBtn').attr("disabled", true);
        postParamWithToken(data, "user/addReviewerAuthority");
    })
});

function  completePostBody(data){
    $('#loadingGif').hide();
    switch (data.status) {
        case 200:
            showMessageBox("Uprawnienia zostały dodane.", "#C5F9A7", "#6AA730");
            break;
        case 400:
            jsonData = JSON.parse(data.responseText);
            showMessageBox(jsonData.errors, "#FFEBE8", "#D52727");
            break;
        default:
            showMessageBox("Pojawił się nieoczekiwany błąd. Spróbuj ponownie później.", "#FFEBE8", "#D52727");
            break;
        
    }

    $('#submitBtn').attr("disabled", false);
}

function showMessageBox(message, backgroundColor, textColor) {
    $('#message').html(message).css("color", textColor);
    $('#message-box').css("display","block")
        .css("background", backgroundColor)
        .css("border", "1px solid"+ textColor)
        .css("margin", "30px");
}