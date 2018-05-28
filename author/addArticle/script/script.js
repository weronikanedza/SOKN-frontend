
$(document).ready(function(){
    getData("/fieldsOfArticles/getAll");
});

function completeGetBody(data){
    if(data.status==200 && JSON.parse(data.responseText).length>0){
        setSelect(data);
        readyToPost();
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

function readyToPost(){
    $("#addArticleForm").submit(function() {
        event.preventDefault();
        if(checkData()){
            postDataAsUser(prepareData(),"article/uploadArticle");
        }
    });
}

function completePostBody(data){
    responseAction(data,"Artykuł został dodany");
}

function prepareData(){
    const formData=new FormData();
    formData.append('file',$('input[name="file"]').get(0).files[0]);
    formData.append('subject',$('#subject').val());
    formData.append('fieldOfArticle',$('#selectpicker').val());
    return formData;
}

function checkData(){
    if(!$('input[name="file"]').val()){
        showMessage("Brak pliku");
        return false;
    }

    if($('#subject').text().length>50){
        showMessage("Temat artykułu może zawierać maksymalnie 50 znaków");
        return false;
    }

    return true;
}

function responseAction(data,text){
    switch(data.status){
        case 200 :
            showAcceptedMessage(text);
            $('#submit').attr("disabled", true);
            break;
        case 406 :
            const err=JSON.parse(data.responseText);
            showMessage(err.errors);
            break;
        default:
            showMessage("Wystąpiły błędy.Spróbuj ponownie poźniej");
            break;
    }
}
