$(document).ready(function() {
    $("#login-form").submit(function(){
		event.preventDefault();
		var username = $("#username").val();
		var password = $("#password").val();

		var userinfo = {

			//Should be the same id with backend function
			username: username,
			password: password

		}

		console.log(userinfo);

		$.ajax({
			method: 'POST',
			url: 'customers/login',
			data: userinfo,
			success: function(data){
				console.log(data);
/*				if(data == null){
					$('#login_result').html("<p>email or password doesn't match. Please try again.</p>");
				}
				else{
					window.location.href = "main.html";
					$(".login").css("display","none");
					$(".user-history").css("display","block");
					$(".logout").css("display","block");					
				}	*/			

			},
			error: function(){
				console.log("Error loading customerinformation");
			}
		});	
	});
});
