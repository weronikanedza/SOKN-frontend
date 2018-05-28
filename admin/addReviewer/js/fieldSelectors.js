$(document).ready(() => getData("/fieldsOfArticles/getAll"));

function completeGetBody(data){
    if(data.status==200 && JSON.parse(data.responseText).length>0){
        addFieldsToSelects(data);
    }else if(data.status==200){
        showMessage("Brak dziedzin");
    }else{
        showMessage("Wystąpił błąd. Spróbuj ponownie");
    }
}

function setSelect(selector, dataObject){

    $.each(dataObject, function (i, dataObject) {
        $(selector).append($('<option>', {
            value: dataObject.id,
            text: dataObject.field
        }));
    });
}

function addFieldsToSelects(data){
    const dataObject=JSON.parse(data.responseText);

    setSelect('#selectpicker1', dataObject);

    //second field is optional so second select need  empty field
    $('#selectpicker2').append($('<option>', {
        value: 0,
        text: "Brak"
    }));

    setSelect('#selectpicker2', dataObject);
}