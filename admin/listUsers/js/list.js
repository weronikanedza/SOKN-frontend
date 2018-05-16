$(document).ready(function(){

$.ajax({
    type: 'GET',
    url: `${SERVER_URL}/user`,
    dataType: 'application/json',
    complete: data => {
        if (data.status === 200) onSuccess(data);
        else onFailed();
    }
});

const onSuccess = (data) => {

	var dataObject=JSON.parse(data.responseText);
 
	var count = Object.keys(dataObject).length;
	
	 	$(function(){

			var dataObject = JSON.parse(data.responseText);
			var html="";
			html += '<table border="2" width=auto cellspacing="10" cellpadding="5" >';
			html += '<tr align="center" valign="middle" bgcolor=#FEF0D8>';
			html += '<td> <b> Id </b></td>';
			html += '<td> <b> Imie </b></td>';
			html += '<td> <b> Nazwisko </b></td>';
			html += '<td> <b> Płeć </b></td>';
			html += '<td> <b> Stopień </b></td>';
			html += '<td> <b> E-mail </b></td>';
			html += '<td> <b> Stan cywilny </b></td>';
			html += '<td> <b> Miasto </b></td>';
			html += '<td> <b> Kraj </b></td>';
			html += '<td> <b> Stan </b></td>';
			html += '<td> <b> Role </b></td>';
			html += '<td> <b> Dziedziny </b></td>';
			html += '</tr>';
			for (i=0; i<count ; i++){
				html += '<tr>';
			$.each(dataObject[i], function(key, value){
				
				if (key == "authorities")
				{
					var tmp="";
					for (k=0; k<Object.keys(dataObject[i].authorities).length; k++)
					{
						tmp += value[k].role+ ", ";
					}
					
					if (i%2 == 0){
						html += '<td>' + tmp + '</td>';
					}
					else{
						html += '<td bgcolor=#E8E8E8>' + tmp + '</td>';
					}
					
					
				}
				
				if (key == "fieldOfArticles")
				{
					var tmp="";
					for (k=0; k<Object.keys(dataObject[i].fieldOfArticles).length; k++)
					{
						tmp += "&#x2022 " + value[k].field+ "<br/>";
					}
					
					if (i%2 == 0){
						html += '<td>' + tmp + '</td>';
					}
					else{
						html += '<td bgcolor=#E8E8E8>' + tmp + '</td>';
					}
					
					
				}
				if (key != "password" && key != "authorities" && key != "fieldOfArticles" ){
					if (i%2 == 0){
						html += '<td >' + value + '</td>';
					}
					else{
						html += '<td bgcolor=#E8E8E8>' + value + '</td>';
					}
					
				}
			});
				html += '</tr>';

				
			}

			html += '</table>';
			$('#table').html(html);
		});
		
		
		
		
		
};

const onFailed = () => {
    alert("Wystąpił błąd! Spróbuj ponownie pózniej!");
	


};
});