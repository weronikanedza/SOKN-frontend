$(document).ready(() => {
    $('#passwordForm').submit(() => {
        const passwordRequest = {};
        passwordRequest.oldPassword = $('#oldPassword').val();
        passwordRequest.password = $('#password').val();
        passwordRequest.matchingPassword = $('#matchingPassword').val();

        postData(passwordRequest);
        //don't refresh on submit
        return false;
    });
});

const postData = body => {
    $('#loadingGif').show();
    $.ajax({
        type: "POST",
        headers: {
            "content-type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        url: `${SERVER_URL}/user/updatePassword`,
        dataType: 'application/json',
        data: JSON.stringify(body),
        complete: response => {
            const responseJson = JSON.parse(response.responseText);
            if (response.status === 200) {
                onSuccessReset();
            } else {
                let errors = responseJson.errors;
                onFailedReset(errors);
            }
            $('#loadingGif').hide();
        }
    })
};

const showModal = () => {
    $('#messageModal').modal();
};

const onSuccessReset = () => {
    showModal();
    let modalLabel = $('#modalLabel');
    modalLabel.empty();
    modalLabel.append(`<strong>Gratulacje!</strong><br>
                    <p>Hasło zostało pomyślnie zmienione.</p>
                    <button id="btnSuccess" class="btn btn-danger"
                    onclick="window.location.replace('../../../index.html')">Strona główna</button>`)
};

const onFailedReset = errors => {
    let messages = errors.join('\n');
    showModal();
    let modalLabel = $('#modalLabel');
    modalLabel.empty();
    modalLabel.append(`<strong>${messages}</strong>`)
};
