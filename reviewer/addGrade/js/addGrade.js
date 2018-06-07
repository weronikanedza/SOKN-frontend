$(() => {
    $('#article_title').html("Ocena artykułu: " + localStorage.getItem("articleSubject"));
});

function showGreenMessage(text){
    $('#errMessage').html(text).css("color","#6AA730");
    $('#message-box').css("display","block").css("background","#C5F9A7").css("border","1px solid #6AA730");
}

$(document).ready(() => {
    $("#grade-form").submit(() => {

        const data = {};
        data.articleId = localStorage.getItem("articleId");
        data.comment = $("#comment").val();
        let grade = $("#grade").val();

        event.preventDefault();

        if (grade == -2)
            showErrorMessage("Nie wybrano oceny dla artykułu.");
        else {
            data.partGrade = grade;
            postParamWithToken(data, "/updateArticleGrade");
            }

        });
});

function completePostBody(response) {
    if (response.status == 200) {
        $("#submit").attr("disabled", true);
        showMessage("Ocena została zapisana w bazie.");
    }
    if (response.status == 500) {
        $("#submit").attr("disabled", true);
        showErrorMessage("Błąd serwera, spróbuj ponownie pożniej");
    }
    else {
        const err = JSON.parse(response.responseText);
        showErrorMessage(err.errors);
    }
        
}

