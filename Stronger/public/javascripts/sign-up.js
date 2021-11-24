$(document).ready(function(){
	$('#signup_form').submit(function(e){

		var user = $('#username').val();
		userinfo = {
			"username" : user
		}
		$.ajax({
			url: '/customers/' + user,
			type: "GET",
			data: userinfo,
			success: function(data){
				if (!jQuery.isEmptyObject(data)) {
					console.log("A user with that username already exists")
					e.preventDefault();
				}
				else{
					event.preventDefault();
				}

			},
			error: function(){
				console.log("Error loading customerinformation");
			}
		});
	});
});

