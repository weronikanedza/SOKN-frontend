$(document).ready(() => {
    $('#passwordForm').submit(() => {
        const email = $('#email').val();

        postData(email);
        //don't refresh on submit
        return false;
    });
});

const postData = body => {
    $('#loadingGif').show();
    $.ajax({
        type: "POST",
        url: `${SERVER_URL}/user/forgotPassword/${body}`,
        dataType: 'application/json',
        complete: response => {
            const responseJson = JSON.parse(response.responseText);
            if (response.status === 200) {
                onSuccess();
            } else {
                let errors = responseJson.errors;
                onFailed(errors);
            }
            $('#loadingGif').hide();
        }
    })
};

const showModal = () => {
    $('#messageModal').modal();
};

const onSuccess = () => {
    showModal();
    let modalContent = $('#modalLabel');
    modalContent.empty();
    modalContent.append(`<strong>Reset hasła</strong>
                    <p>Link został wysłany na adres email.</p>`);
};

const onFailed = errors => {
    let messages = errors.join('\n');
    showModal();
    let modalLabel = $('#modalLabel');
    modalLabel.empty();
    modalLabel.append(`<strong>${messages}</strong>`)
};
