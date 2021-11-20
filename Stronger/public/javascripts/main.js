$(document).ready(function(){
	$.ajax({
		 url: "api/equipment",
		 dataType: "json",
		 success: function(data) {
		 	$.each(data, function(k,v) {
		 		var equipment_id = v._id;
  				var equipment_name = v.item_name;
  				var price = v.price;
  				var image_src = v.image;
  				var description = v.description;
    			var card = '<div class="col-lg-6 mb-4">'+
        						'<div class="card" style="width: 18rem;">' +
  									'<img src="images/Equipment/'+ image_src + '" class="card-img-top" alt="' + equipment_name + '">' + 
  									'<div class="card-body">' +
  										'<h5 class="card-title"><a href="/equipment/'+ v._id +'">' + equipment_name + '</a></h5>' +
    									'<p class="card-text">' + description + '</p>' +
  									'</div>' +
								'</div>'	+
							'</div>'

				$("#equipment-card-area").append(card)
  			});
		 },
		 error: function() { alert("error loading file");  }
     });
})