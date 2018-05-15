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
			for (i=0; i<count ; i++){
			html += '<table border="2" align="center" width:auto>';
			$.each(dataObject[i], function(key, value){
				html += '<tr>';
				if (key == "authorities")
				{
					html += '<td> <b>' + key.toUpperCase(); + '</b></td>';
					var tmp="";
					for (k=0; k<Object.keys(dataObject[i].authorities).length; k++)
					{
						tmp += value[k].role+ ", ";
					}
					html += '<td>' + tmp + '</td>';
					
				}
				if (key != "password" && key != "authorities" ){
					html += '<td><b> ' + key.toUpperCase(); + '</b></td>';
					html += '<td>' + value + '</td>';
				}

				
				html += '</tr>';
			
			});
				html += '</table>';
				html += '<br/>';
				
			}


			$('#table').html(html);
		});
		
		
		
		
		
};

const onFailed = () => {
    alert("BBB");
	


};
});