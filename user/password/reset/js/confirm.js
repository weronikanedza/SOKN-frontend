const userId = queryParam('id');
const token = queryParam('token');

$.ajax({
    type: "GET",
    url: `${SERVER_URL}/user/changePassword/${userId}/${token}`,
    dataType: 'application/json',
    complete: response => {
        const responseJson = JSON.parse(response.responseText);
        if (response.status !== 202) {
            let errors = responseJson.errors;
            onFailedActivation(errors);
        }
        $('#loadingGif').hide();
    }
});

const onFailedActivation = errors => {
    $('#messageModal').modal({backdrop: 'static', keyboard: false});

    let messages = errors.join('\n');
    let modalLabel = $('#modalLabel');
    modalLabel.empty();
    modalLabel.append(`<strong>${messages}</strong>`)
};


$(document).ready(() => {
    $('#passwordForm').submit(() => {
        const passwordBody = { };
        passwordBody.password = $('#password').val();
        passwordBody.matchingPassword = $('#matchingPassword').val();
        passwordBody.userId = userId;

        postData(passwordBody);
        //don't refresh on submit
        return false;
    });
});

const postData = body => {
    $('#loadingGif').show();
    $.ajax({
        type: "POST",
        headers: {
            "content-type": "application/json"
        },
        url: `${SERVER_URL}/user/resetPassword`,
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

const onSuccessReset = () => {
    showModal();
    let modalLabel = $('#modalLabel');
    modalLabel.empty();
    modalLabel.append(`<strong>Gratulacje!</strong><br>
                    <p>Hasło zostało pomyślnie zmienione.</p>`)
};

const onFailedReset = errors => {
    let messages = errors.join('\n');
    showModal();
    let modalLabel = $('#modalLabel');
    modalLabel.empty();
    modalLabel.append(`<strong>${messages}</strong>`)
};

const showModal = () => $('#messageModal').modal();