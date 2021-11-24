$(document).ready(function(){


	$('input[name=fname]').change(function(){
		var fname = $('#fname').val();
		var fname_pattern = /[a-zA-Z]+$/;
		if(fname == ""){
			$('input#fname').css("border","3px solid red");
			$('p#fname-require').css("color","red");
			$('p#fname-require').html("Enter your name");			
		}
		if(fname.match(fname_pattern)){
			$('input#fname').css("border","3px solid green");
			$('p#fname-require').css("color","green");
			$('p#fname-require').html("Valid name");
		}
		else{
			$('input#fname').css("border","3px solid red");
			$('p#fname-require').css("color","red");
			$('p#fname-require').html("Invalid name");	
		}
	})

	$('input[name=lname]').change(function(){
		var lname = $('#lname').val();
		var lname_pattern = /[a-zA-Z]+$/;
/*		if(fname == ""){
			$('input#lname').css("border","3px solid red");
			$('p#lname-require').css("color","red");
			$('p#lname-require').html("Enter your name");			
		}*/

		if(lname.match(lname_pattern)){
			$('input#lname').css("border","3px solid green");
			$('p#lname-require').css("color","green");
			$('p#lname-require').html("Valid name");
		}
		else{
			$('input#lname').css("border","3px solid red");
			$('p#lname-require').css("color","red");
			$('p#lname-require').html("Invalid name");	
		}
	})

	$('input[name=username]').change(function(){
		var user = $('#username').val();
		var user_pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;		
/*		if(jQuery.isEmptyObject(user)){
			$('input#username').css("border","3px solid red");
			$('p#username-require').css("color","red");
			$('p#username-require').html("Enter your email");			
		}*/
		if(user.match(user_pattern)){		
			userinfo = {
				"username" : user
			}

			$.ajax({
				url: '/customers/' + user,
				type: "GET",
				data: userinfo,
				success: function(data){
					if (!jQuery.isEmptyObject(data)) {
						$('input#username').css("border","3px solid red");
						$('p#username-require').css("color","red");
						$('p#username-require').html("A user with that username already exists");
					}
					else{
						$('input#username').css("border","3px solid green");
						$('p#username-require').css("color","green");
						$('p#username-require').html("Valid username");
					}

				},
				error: function(){
					console.log("Error loading customerinformation");
				}
			});			
		}
		else{
			$('input#username').css("border","3px solid red");
			$('p#username-require').css("color","red");
			$('p#username-require').html("Invalid Username");			
		}
	});

	$('input#password').on('change', function(){
		var password = $('#password').val();
		var pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;

/*		if(password == ""){
			$('input#password').css("border","3px solid red");
			$('p#pwd-require').css("color","red");	
			$('p#passward-require').html("Enter your password");			
		}*/
		if (password.match(pattern)){
			$('input#password').css("border","3px solid green");
			$('p#pwd-require').css("color","green");			
		}
		else{
			$('input#password').css("border","3px solid red");
			$('p#pwd-require').css("color","red");					
		}

	});

	$('input#confirmpwd').change(function(){
		var password = $('#password').val();
		var confirmpwd = $('#confirmpwd').val();
/*		if (confirmpwd == ""){
			$('input#confirmpwd').css("border","3px solid red");
			$('p#confirmpwd-require').css("color","red");
			$('p#confirmpwd-require').html("Enter your repeat password");				
		}*/

		if (confirmpwd === password){
			$('input#confirmpwd').css("border","3px solid green");
			$('p#confirmpwd-require').css("color","green");	
			$('p#confirmpwd-require').html("Password matched");						
		}
		else{
			$('input#confirmpwd').css("border","3px solid red");
			$('p#confirmpwd-require').css("color","red");	
			$('p#confirmpwd-require').html("Password not matched");					
		}

	});	

/*	$('input[name=fname]').blur(function(){
		$(this).removeAttr('style');
		$('p#fname-require').empty();
	})*/
/*	$('input#dob').change(function(e){
		if (dob == ""){
			$('input#dob').css("border","3px solid red");
			$('p#dob-require').css("color","red");
			$('p#dob-require').html("Enter your date of birth");				
		}
		else{
			$('input#dob').css("border","3px solid green");
			$('p#dob-require').css("color","green");
			$('p#dob-require').html("Valid date of birth");			
		}

	});	
*/
});

