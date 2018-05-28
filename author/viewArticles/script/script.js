
 document.addEventListener("DOMContentLoaded", function(event) {
    getDataAsUser("/article/getAllArticles");
});

function completeGetBody(data){
    if(data.status==200 && JSON.parse(data.responseText).length>0){  
        $("#scrollTable").css('display','block');   
        fillTable(data);
    }else if(data.status==200){
        $("#message").html("<h1>Brak dodanych artykułów</h1>")
    }else{
        $("#message").html("<h1>Wystąpił błąd. Spróbuj ponownie<h1>");
    }
}

function fillTable(data){
    var dataObject=JSON.parse(data.responseText);
    
     for(i=0;i<dataObject.length;i++){
         $("#table").append("<tr><td id="+dataObject[i].id+">"+dataObject[i].subject+"</td><td>"+dataObject[i].fieldOfArticle.field+
        "</td><td>"+checkStatus(dataObject[i].articleGrade)+"</td><td><button class='btn-warning' onclick='getComments($(this))'>uwagi</button></td>"+
        "<td><button class='btn-danger' onclick ='removeUser($(this))'>remove</button></td></tr>");
    }
 }

 function getComments(chosenRow){
    const cells = chosenRow.closest("tr").children("td"); //get table row
    sessionStorage.setItem('articleId',cells.eq(0).attr('id'));
    window.location.href="comments.html";
 }
 function removeUser(chosenRow){
    const cells = chosenRow.closest("tr").children("td"); //get table row
    if(confirm("Czy chcesz usunąć artykuł?")){
    postDataWithToken($(cells.eq(0)).attr('id'),"article/removeArticle");
    location.reload();
    }
  }

 function checkStatus(grade){
    let sum=grade.positive+grade.negative+grade.neutral;
    console.log(sum);
    if(sum===3 && grade.positive==2) return "zaakceptowany";
    else if(sum<3) return "w trakcie oceny";
     else return "odrzucony";
 }

 function getDataAsUser(urlEnd){
    $.ajax({
        type: 'GET',
        cache: false,
        headers : {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        url: `${SERVER_URL}/`+urlEnd,
        complete: function(data) {
            completeGetBody(data);
        }  ,
        dataType: "application/json"
    });
}


