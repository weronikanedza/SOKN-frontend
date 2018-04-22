function postData(dataToSend,urlEnd){
    $.ajax({
        type: 'POST',
        headers : {
            "content-type" : "application/json"
        },
        url: `${SERVER_URL}/`+urlEnd,
        data: dataToSend,
        complete: function(data) {
            completePostBody(data);
        }  ,
        dataType: 'application/json'
    });
}


