
$(document).ready(function(){
    getData("/article/showAll");
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

