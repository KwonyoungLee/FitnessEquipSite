$(document).ready(function(){
	$('#signup-form').submit(function(event){
		event.preventDefault();
		var fname = $('#fname').val();
		var lname = $('#lname').val();
		var username = $('#username').val();
		var password = $('#password').val();
		var passwordrepeat = $('#confirmpwd').val();
		var dob = $('#dob').val();

		console.log(password);
		console.log(passwordrepeat);
		var userdata = {

			username: username,
			password: password,
			fname: fname,
			lname: lname,
			dob: dob

		}

		console.log(userdata);
		if(password != passwordrepeat){
			$('#signup_result').html("password does NOT match");
		}
		else{

			$.ajax({
				url: 'customers/signup',
				type: "POST",
				data: userdata,
				success: function(data){
					console.log(data);
				},
				error: function(){
					console.log("Error loading customerinformation");
				}
			});
		}
	});
});

