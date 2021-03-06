function postData(dataToSend, urlEnd) {
    $.ajax({
        type: 'POST',
        headers: {
            "content-type": "application/json"
        },
        url: `${SERVER_URL}/` + urlEnd,
        data: dataToSend,
        complete: function (data) {
            completePostBody(data);
        },
        dataType: "application/json"
    });
}

function postParamWithToken(dataToSend, urlEnd) {
    $.ajax({
        type: 'POST',
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        url: `${SERVER_URL}/` + urlEnd,
        data: dataToSend,
        complete: function (data) {
            completePostBody(data);
        },
        dataType: "application/json"
    });
}

function postDataWithToken(dataToSend, urlEnd) {
    $.ajax({
        type: 'POST',
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
            "content-type": "application/json"
        },
        url: `${SERVER_URL}/` + urlEnd,
        data: dataToSend,
        complete: function (data) {
            completePostBody(data);
        },
        dataType: "application/json"
    });
}

function postDataWithFile(dataToSend, urlEnd) {
    $.ajax({
        type: 'POST',
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        url: `${SERVER_URL}/` + urlEnd,
        data: dataToSend,
        processData: false,
        contentType: false,
        complete: function (data) {
            completePostBody(data);
        }
    });
}

function getData(urlEnd) {
    $.ajax({
        type: "GET",
        cache: false,
        url: `${SERVER_URL}/` + urlEnd,
        complete: function (data) {
            completeGetBody(data);
        },
        dataType: "application/json"
    });
}

function getDataWithToken(urlEnd) {
    $.ajax({
        type: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        cache: false,
        url: `${SERVER_URL}/` + urlEnd,
        complete: function (data) {
            completeGetBody(data);
        },
        dataType: "application/json"
    });
}