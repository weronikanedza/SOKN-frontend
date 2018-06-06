$(() => {
    $('#article_title').html("Ocena artykułu: " + localStorage.getItem("articleSubject"));
});

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
        showAcceptedMessage("Ocena została zapisana w bazie.");
    }
    if (response.status == 500) {
        $("#submit").attr("disabled", true);
        showAcceptedMessage("Błąd serwera, spróbuj ponownie pożniej");
    }
    else {
        const err = JSON.parse(response.responseText);
        showErrorMessage(err.errors);
    }
        
}


// dalczego dostaje 0 i nie moge uzyc funkcji do wyswietlania wiadomosci xd