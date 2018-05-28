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
                 <td>${article.gradeStatus}</td>
                 <td><button class="btn" onclick="downloadFile('${article.pathFile}')">Pobierz</button></td>
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
    let lastIndex = fullName.lastIndexOf('/');
    const fileName = fullName.substring(lastIndex + 1);

    const request = new XMLHttpRequest();
    request.open('GET', `${SERVER_URL}/reviewer/article/${fileName}`, true);
    request.setRequestHeader('Authorization', `Bearer ${localStorage.getItem('token')}`);
    request.responseType = 'blob';
    request.onload = event => {
        const blob = request.response;
        const link = document.createElement('a');

        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        link.click();

        document.removeChild(link);
    };

    request.send();
};