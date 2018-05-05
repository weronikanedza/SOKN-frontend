$(document).ready(function(){
    getData("/fieldsOfArticles/getAll");
});

function completeGetBody(data){
    if(data.status==200 && JSON.parse(data.responseText).length>0){
        setSelect(data);
    }else if(data.status==200){
        showMessage("Brak dziedzin");
    }else{
        showMessage("Wystąpił błąd. Spróbuj ponownie");
    }
}

function setSelect(data){
    const dataObject=JSON.parse(data.responseText);
    $.each(dataObject, function (i, dataObject) {
        $('#selectpicker1').append($('<option>', {
            value: dataObject.id,
            text: dataObject.field
        }));
    });

    $('#selectpicker2').append($('<option>', {
        value: 0,
        text: "Brak"
    }));
    
    $.each(dataObject, function (i, dataObject) {
        $('#selectpicker2').append($('<option>', {
            value: dataObject.id,
            text: dataObject.field
        }));
    });
    
}

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
            
            // if second field was selected and it's not the same as first then add another filed 
            if($("#selectpicker2").val() != 0 && $("#selectpicker2").val() != $("#selectpicker1").val()){
                user.fieldOfArticles.push({id:$("#selectpicker2").val(),
                    field:$("#selectpicker2").find('option:selected').text()})
            }
            
            event.preventDefault();
            $('#loadingGif').show();
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