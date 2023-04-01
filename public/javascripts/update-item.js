$(document).ready(function(){
	$.ajax({
		url: '/api/equipment/' + equipment_id,
		dataType: "json",
		success: function(data) {
			var equipment_id = data._id;
			var equipment_name = data.item_name;
			var equipment_price = data.price;
			var equipment_description = data.description;
			var equipment_category = data.category;
			var equipment_image_name = data.image;
			var equipment_quantity = data.quantity_in_stock;

			$("#equipment_id").attr("value",equipment_id)
			$("#equipment_name").attr("value",equipment_name)
			$("#equipment_price").attr("value",equipment_price)
			$("#equipment_description").text(equipment_description)
			$("#equipment_category").attr("value",equipment_category)
			$("#equipment_quantity").attr("value",equipment_quantity)
			$("#equipment_image").attr("value",equipment_image_name)
		},
		error: function() { alert("error loading file");  }
	});
})