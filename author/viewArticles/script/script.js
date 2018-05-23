
$(document).ready(function(){
    getDataAsUser("/article/getAllArticles");
});

function completeGetBody(data){
    if(data.status==200 && JSON.parse(data.responseText).length>0){     
        fillTable(data);
    }else if(data.status==200){
        $("#message").html("<h1>Brak dodanych artykułów</h1>")
        $("pre-scrollable").css("display:none");
    }else{
        $("#message").html("<h1>Wystąpił błąd. Spróbuj ponownie<h1>");
    }
}

function fillTable(data){
    var dataObject=JSON.parse(data.responseText);
    
     for(i=0;i<dataObject.length;i++){
         $("#table").append("<tr><td>"+dataObject[i].subject+"</td><td>"+dataObject[i].fieldOfArticle.field+
        "</td><td>plik</td><td>checkStatus(dataObject[i].gradeStatus)</td><td>uwagi</td></tr>");
    }
 }

 function checkStatus(status){
     if(status>=2) return "zaakceptowany";
     else return "w trakcie";
 }

 function getDataAsUser(urlEnd){
    $.ajax({
        type: 'GET',
        cache: false,
        headers : {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        url: `${SERVER_URL}/`+urlEnd,
        complete: function(data) {
            completeGetBody(data);
        }  ,
        dataType: "application/json"
    });
}
