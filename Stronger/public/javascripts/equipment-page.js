var equipment_name = ""
var equipment_price = ""

$(document).ready(function(){

	$.ajax({
		 url: '/api/equipment/' + equipment_id,
		 dataType: "json",
		 success: function(data) {
		 	var image_src = "/images/Equipment/" + data.image;

		 	equipment_name = data.item_name;
		 	equipment_price = "$" + data.price;

		 	$("#equipment-img").attr("src",image_src);
		 	$("#equipment-img").attr("alt",data.item_name);

			$("#equipment-img").css("width","500px");
			$("#equipment-img").css("height","500px");

		 	$("#equipment-name").text(equipment_name);
		 	$("#equipment-price").text(equipment_price);
		 	$("#equipment-description").text(data.description);

		 },
		 error: function() { alert("error loading file");  }
     });

	$("img").mouseover(function(e){

	})

 	$("#quantity-plus").click(function(){
 		if ($("#quantity-input").val() < 100)
 		{
			$("#quantity-input").val(parseInt($("#quantity-input").val())+ 1)
 		}
	})

	$("#quantity-minus").click(function(){
 		if ($("#quantity-input").val() > 1)
 		{
 			$("#quantity-input").val(parseInt($("#quantity-input").val()) - 1) 
 		}
	})

	$("#add-to-cart-button").click(function(){
		if (user !== undefined)
		{
			var today = new Date();
			var dd = String(today.getDate()).padStart(2, '0');
			var mm = String(today.getMonth() + 1).padStart(2, '0');
			var yyyy = today.getFullYear();

			today = mm + '/' + dd + '/' + yyyy;

			var order_quantity = $("#quantity-input").val();

			var order_details = {
	    		"Customer_id" : "61870f65f26d32303fda29b2",
	    		"Customer_username" : "test_customer@gmail.com",
	    		"Order" : [ 
					{
			            "Equipment_id" : equipment_id,
			            "Equipment_name" : equipment_name,
			            "Equipment_price" : equipment_price,
			            "Quantity" : order_quantity,
		        	}
	    		],
	    		"Total price" : "449.97",
	    		"Date" : today
			}

			$.ajax({
				method: 'POST',
				url: '/orders',
				data: order_details,
				success: function(data){
					console.log("Successfully added to cart")
				},
				error: function(){
					console.log("Error inserting order");
				}
			});	
		}
		else
		{
			alert("Please login before adding to cart")
		}
		
	})
})