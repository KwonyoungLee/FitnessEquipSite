var equipment_name = ""
var equipment_price = ""
var equipment_image = ""

$(document).ready(function(){

	$.ajax({
		 url: '/api/equipment/' + equipment_id,
		 dataType: "json",
		 success: function(data) {

		 	equipment_image = data.image
		 	var image_src = "/images/Equipment/" + equipment_image;

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
		var order_quantity = $("#quantity-input").val();

		var order_details = {
            "item_name" : equipment_name,
            "item_price" : equipment_price,
            "item_quantity" : order_quantity,
            "item_image" : equipment_image
		}

		$.ajax({
			method: 'POST',
			url: '/api/shoppingcart/update/' + username,
			data: order_details,
			success: function(data){
				console.log("Successfully added to cart")
			},
			error: function(){
				console.log("Error inserting order");
			}
		});	
		
	})
})