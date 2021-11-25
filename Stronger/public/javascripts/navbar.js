$(document).ready(function(){
	$.ajax({
		url: '/api/equipment/categories',
		 dataType: "json",
		 success: function(categories) {
		 	$.each(categories,function(k,category){
		 		$('#categories-dropdown').append('<li><a class="dropdown-item" href="#">' + category + '</a></li>')
		 	})
		 },
		 error: function() { alert("error loading file");  }
     });
})