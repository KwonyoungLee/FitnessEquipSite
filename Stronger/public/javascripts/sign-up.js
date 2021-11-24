$(document).ready(function(){
	$('#signup_form').submit(function(){
			console.log("in");

				var user = $('#username').val();
				userinfo = {
					"username" : user
				}
			$.ajax({
				url: '/customers/check',
				type: "GET",
				data: userinfo,
				success: function(data){
					if (jQuery.isEmptyObject(data)) {
						console.log("no username exist");
						var fname = $('#fname').val();
						var lname = $('#lname').val();
						var username = $('#username').val();
						var password = $('#password').val();
						var passwordrepeat = $('#confirmpwd').val();
						var dob = $('#dob').val();

						var userinfo = {
							"fname": fname,
							"lname": lname,
							"username" : username,
							"password" : password,
							"date_of_birth" : dob
						}
						$.ajax({
							url: '/customers/signup',
							type: "POST",
							data: userinfo,
							success: function(data){
								console.log("Success");
							},
							error: function(){
								console.log("Error loading");
							}
						});						
					}
					else{
						event.preventDefault();
					}

				},
				error: function(){
					console.log("Error loading customerinformation");
				}
			});
			event.preventDefault();
	});
});

