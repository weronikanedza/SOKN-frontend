document.addEventListener("DOMContentLoaded", function(event) {
    const articleId=sessionStorage.getItem('articleId');
    sessionStorage.removeItem('articleId');
    postDataWithToken(articleId,"/getArticle");
});


function completePostBody(data){
    if(data.status==200 ){  
        var dataObject=JSON.parse(data.responseText)
        $("#comments").html(dataObject.articleGrade.comment);
    }else{
        $("#comments").html("<h3>Wystąpił błąd. Spróbuj ponownie<h3>");
    }
}