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
        if($('input[name="file"]').val()){
            postDataWithFile(prepareData(),"article/uploadArticle");
        }else{
            showMessage("Nie wybrano pliku");
        }
    });
}

function completePostBody(data){
    alert(data.status);
    $('#submit').attr("disabled", true);
}

function prepareData(){
    const formData=new FormData();
    formData.append('file',$('input[name="file"]').get(0).files[0]);
    formData.append('subject',$('#subject').val());
    formData.append('fieldOfArticle',$('#selectpicker').val());
    return formData;
}