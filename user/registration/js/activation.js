$('#redirectBtn').click(() => window.location.href='../../index.html');

$.ajax({
    type: 'GET',
    url: `${SERVER_URL}/user/registrationConfirm/${queryParam('token')}`,
    dataType: 'application/json',
    complete: data => {
        if (data.status === 202) showModal();
        else onFailedActivation();
    }
});

const showModal = () => $('#messageModal').modal({backdrop: 'static', keyboard: false});

const onFailedActivation = () => {
    showModal();
    const modalLabel = $('#modalLabel');
    modalLabel.empty();
    modalLabel.append('<strong>Niestety rejestracja nie powiodła się.</strong>')

};
