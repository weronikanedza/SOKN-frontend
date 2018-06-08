document.addEventListener("DOMContentLoaded", function(event) {
    const articleId=sessionStorage.getItem('articleId');
    sessionStorage.removeItem('articleId');
    postDataAsUser(articleId,"article/getArticle");
});


function completePostBody(data){
    if(data.status==200 && JSON.parse(data.responseText).length>0){  
        var dataObject=JSON.parse(data.responseText);
        alert(dataObject[0].articleGrade.id)
        $("#comments").html(dataObject[0].articleGrade.id)
        
    }else if(data.status==200){
        var dataObject=JSON.parse(data.responseText);
        $("#message").html("<h1>Brak dodanych artykułów</h1>")
    }else{
        alert("kos")
        $("#message").html("<h1>Wystąpił błąd. Spróbuj ponownie<h1>");
    }
}