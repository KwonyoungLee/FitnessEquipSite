
$(document).ready(function(){
	$.ajax({
		 url: '/api/equipment/' + equipment_id,
		 dataType: "json",
		 success: function(data) {
		 	var image_src = "/images/Equipment/" + data.image;
		 	//var equipment_desc = "Description: "  + data.description;
		 	var equipment_price = "$" + data.price;
		 	$("#equipment-img").attr("src",image_src);
		 	$("#equipment-img").attr("alt",data.item_name);

			$("#equipment-img").css("width","500px");
			$("#equipment-img").css("height","500px");

		 	$("#equipment-name").text(data.item_name);
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
 		if ($("#quantity-input").val() > 0)
 		{
 			$("#quantity-input").val(parseInt($("#quantity-input").val()) - 1) 
 		}
	})
})