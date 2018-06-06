$(() => {
    $('#article_title').html("Ocena artykułu: " + localStorage.getItem("articleSubject"));
});

$(document).ready(() => {
    $("#grade-form").submit(() => {

        const data = {};
        data.articleId = localStorage.getItem("articleId");
        data.comment = $("#comment").val();
        let grade = $("#grade").val();
        alert(data.comment);
        if (grade == -2)
            showMessage("Nie wybrano oceny dla artykułu.");
        else {
            data.partGrade = grade;
            postParamWithToken(data, "/updateArticleGrade");
            }

        });
});

function completePostBody(response) {
    alert("ive got the response");
    alert(response.status);
    if (response.status == 200) {
        alert("i did it")
        $("#submit").attr("disabled", true);
        showMessage("Ocena została zapisana w bazie.");
    }
    else {
        const err = JSON.parse(response.responseText);
        showMessage(err.errors);
    }
        
}


// dalczego dostaje 0 i nie moge uzyc funkcji do wyswietlania wiadomosci xd