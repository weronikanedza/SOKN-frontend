let articles;

$(document).ready(() => {
    $.ajax({
        type: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        url: `${SERVER_URL}/reviewer/article`,
        accept: 'application/json',
        complete: response => {
            const responseJson = JSON.parse(response.responseText);
            if (response.status === 200) {
                onSuccessRetrieve(responseJson);
            } else {
                let errors = responseJson.errors;
                onFailedRequest(errors);
            }
        }
    })
});

const onSuccessRetrieve = response => {
    articles = response;

    let counter = 0;
    response.forEach(article => {

            $("#table-body").append(
                `<tr>
                 <th scope="row">${++counter}</th>
                 <td>${article.subject}</td>
                 <td>${article.fieldOfArticle.field}</td>
                 <td>${article.user.firstName}</td>
                 <td><button class="btn" onclick="downloadFile('${article.pathFile.substring(article.pathFile.lastIndexOf('\\') + 1)}')">Pobierz</button></td>
                 <td><button class="btn" onclick="switchToAddGrade('${article.id}', '${article.subject}')">Wystaw</button></td>
             </tr>`
            );
        }
    )
};

const onFailedRequest = errors => {
    let messages = errors.join('\n');
    showMessage(messages)
};

const downloadFile = fullName => {
    //let lastIndex = fullName.lastIndexOf('\\');
    //const fileName = fullName.substring(lastIndex + 1);

    const request = new XMLHttpRequest();
    request.open('GET', `${SERVER_URL}/reviewer/article/${fullName}`, true);
    request.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
    request.responseType = 'blob';
    request.onload = event => {
        const blob = request.response;
        const link = document.createElement('a');

        link.href = window.URL.createObjectURL(blob);
        link.download = fullName;
        link.click();

        document.removeChild(link);
    };

    request.send();
};

const switchToAddGrade = (id, subject) =>{
    //localStorage.removeItem("articleId");
    //localStorage.removeItem("articleSubject");
    
    localStorage.setItem("articleId", id);
    localStorage.setItem("articleSubject", subject);
    window.location.href="../addGrade/addGrade.html";
};