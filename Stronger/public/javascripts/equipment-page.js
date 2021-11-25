var equipment_name = ""
var equipment_price = ""
var equipment_image = ""
var image_src = ""

$(document).ready(function(){

	$.ajax({
		 url: '/api/equipment/' + equipment_id,
		 dataType: "json",
		 success: function(data) {

		 	equipment_image = data.image
		 	image_src = "/images/Equipment/" + equipment_image;

		 	equipment_name = data.item_name;
		 	equipment_price = data.price;

		 	$("#equipment-img").attr("src",image_src);
		 	$("#equipment-img").attr("alt",data.item_name);

			$("#equipment-img").css("width","500px");
			$("#equipment-img").css("height","500px");

		 	$("#equipment-name").text(equipment_name);
		 	$("#equipment-price").text("$" + data.price);
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
				
				$("#modal-image").attr("src",image_src)
				$("#modal-image").attr("alt",equipment_name)
				$("#modal-image").attr("width","100px")
				$("#modal-image").attr("height","100px")
				$("#modal-item-name").text(equipment_name)
				$("#modal-item-quantity").text("Quantity: " + order_quantity)
				$("#add-to-cart-success-modal").css("display","block")
				$("#add-to-cart-success-modal").toggleClass("show")
			},
			error: function(){
				console.log("Error inserting order");
			}
		});	
		
	})

	$("#modal-close").click(function(){
		$("#add-to-cart-success-modal").css("display","none")
		$("#add-to-cart-success-modal").toggleClass("show")
	})
})