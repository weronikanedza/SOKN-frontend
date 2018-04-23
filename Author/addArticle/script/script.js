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
        $('#selectpicker').append($('<option>', { 
            value: dataObject.id,
            text: dataObject.field
        }));
    });
}