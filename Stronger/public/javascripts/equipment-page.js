$(document).ready(function(){
	$.ajax({
		 url: "api/equipment",
		 dataType: "json",
		 success: function(data) {
		 	console.log('Successfully retrieved data from api/equipment');
		 	console.log(data);
		 },
		 error: function() { alert("error loading file");  }
     });
})