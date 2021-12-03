const page_limit = 8;
var number_of_pages;
var current_page = 1;
var number_of_items;

$(document).ready(function(){

	$.ajax({
		url: '/api/equipment/count',
		dataType: "json",
		success: function(data) {

			number_of_items = data;
			number_of_pages = Math.ceil(number_of_items / page_limit);

			$("#pagination-ul").append('<li class="page-item"><a class="page-link" href="#">Prev</a></li>');

			for (let i = 0; i < (Math.ceil(number_of_items / page_limit)); i++) {
				var new_page = $("<li></li>");
				$(new_page).attr("id","pagination-li-" + (i+1));
				$(new_page).attr("class","page-item");
				$(new_page).attr("page-number","" + (i+1) +"");
				$(new_page).html("<a class='page-link' href='#'>" + (i+1) + "</a>");
				
				(function(index){
					new_page.on("click",function(){
						var request_url = "/api/equipment/page/" + (index + 1);
						$.ajax({
							url: request_url,
							dataType: "json",
							success: function(data) {
								current_page = index + 1;
								$("#equipment-card-area").empty();
								$.each(data, function(k,v) {
									var equipment_id = v._id;
									var equipment_name = v.item_name;
									var price = v.price;
									var image_src = v.image;
									var description = v.description;
									var card = '<div class="col">'+
									'<div class="card h-100" style="width: 18rem;">' +
									'<img src="/images/Equipment/'+ image_src + '" class="card-img-top" alt="' + equipment_name + '">' + 
									'<div class="card-body">' +
									'<h5 class="card-title"><a href="/equipment/'+ v._id +'">' + equipment_name + '</a></h5>' +
									'<p class="card-text">$' + price + '</p>' +
									'</div>' +
									'</div>'	+
									'</div>'

									$("#equipment-card-area").append(card)
								})
							},
							error: function() { alert("error loading file");  }
						});
					})
				})(i)

				$("#pagination-ul").append(new_page)
			}

			$("#pagination-ul").append('<li class="page-item"><a class="page-link">Next</a></li>')
		},
		error: function() { alert("error loading file");  }
	});

	$.ajax({
		url: "/api/equipment/page/" + current_page,
		dataType: "json",
		success: function(data) {
			$.each(data, function(k,v) {
				var equipment_id = v._id;
				var equipment_name = v.item_name;
				var price = v.price;
				var image_src = v.image;
				var description = v.description;
				var card = '<div class="col">'+
				'<div class="card h-100" style="width: 18rem;">' +
				'<img src="/images/Equipment/'+ image_src + '" class="card-img-top" alt="' + equipment_name + '">' + 
				'<div class="card-body">' +
				'<h5 class="card-title"><a href="/equipment/'+ v._id +'">' + equipment_name + '</a></h5>' +
				'<p class="card-text">$' + price + '</p>' +
				'</div>' +
				'</div>'	+
				'</div>'

				$("#equipment-card-area").append(card)
			});
		},
		error: function() { alert("error loading file");  }
	});

	$(document).ready(function(){
		if(category.length != 0){
						$.ajax({
							url: '/api/equipment/category/' + category,
							dataType: "json",
							success: function(data) {
								$("#equipment-card-area").empty();
								$("#pagination-ul").empty();
								$("#filter_info").empty();
								$.each(data, function(k,v) {
									var equipment_id = v._id;
									var equipment_name = v.item_name;
									var price = v.price;
									var image_src = v.image;
									var description = v.description;
									var card = '<div class="col">'+
									'<div class="card h-100" style="width: 18rem;">' +
									'<img src="/images/Equipment/'+ image_src + '" class="card-img-top" alt="' + equipment_name + '">' + 
									'<div class="card-body">' +
									'<h5 class="card-title"><a href="/equipment/'+ v._id +'">' + equipment_name + '</a></h5>' +
									'<p class="card-text">$' + price + '</p>' +
									'</div>' +
									'</div>'	+
									'</div>'

									$("#equipment-card-area").append(card)
								})

								var filter_badge = '<div class="col-md-6 mt-3 mb-3 mx-2">' +
								'<h3><span class="badge bg-warning text-dark">Filtered Results By "<span id="filter">' + category +
								'</span>"<button type="button" class="btn-close" aria-label="Close"></button></span><h3>'
								' </div>'

								$("#filter_info").append(filter_badge)

							},error: function(err){

							}
						})
					}
					})



		$("#search_button").on("click",function(event){
			event.preventDefault();
			var search_string = $("#search").val();
			var category = $("#filter").html();
			var exists=false;
			if(search_string.length > 0 && $("#filter").length > 0){
				$.ajax({
					url : "/api/equipment/filter/search/" + search_string + "/" + category,
					dataType: "json",
					success: function(data){
						$("#equipment-card-area").empty();
						$("#pagination-ul").empty();
						$("#filter_info").empty();
						$.each(data, function(k,v) {
							exists=true;
							var equipment_id = v._id;
							var equipment_name = v.item_name;
							var price = v.price;
							var image_src = v.image;
							var description = v.description;
							var card = '<div class="col">'+
							'<div class="card h-100" style="width: 18rem;">' +
							'<img src="/images/Equipment/'+ image_src + '" class="card-img-top" alt="' + equipment_name + '">' + 
							'<div class="card-body">' +
							'<h5 class="card-title"><a href="/equipment/'+ v._id +'">' + equipment_name + '</a></h5>' +
							'<p class="card-text">$' + price + '</p>' +
							'</div>' +
							'</div>'	+
							'</div>'

							$("#equipment-card-area").append(card)

						})
						var filter_search_badge = "";

						if(exists)
						{
							filter_search_badge = '<div class="col-md-6 mt-3 mb-3 mx-2">' +
							'<h3><span class="badge bg-warning text-dark">Showing Results for "' + search_string + '" in category "<span id="filter">' + category +
							'</span>"<button type="button" class="btn-close" aria-label="Close"></button></span><h3>'
							' </div>'
						}
						else
						{
							filter_search_badge = '<div class="col-md-6 mt-3 mb-3 mx-2">' +
							'<h3><span class="badge bg-warning text-dark">No Results for "' + search_string + '" in category "<span id="filter">' + category +
							'</span>"<button type="button" class="btn-close" aria-label="Close"></button></span><h3>'
							' </div>'	
						}

						$("#filter_info").append(filter_search_badge)				
						},error: function(){
						alert("Error searching")
					}
				})
			}
			else if(search_string.length > 0 && $("#filter").length == 0){
				$.ajax({
					url : "/api/equipment/search/" + search_string,
					dataType: "json",
					success: function(data){
						$("#equipment-card-area").empty();
						$("#pagination-ul").empty();
						$("#filter_info").empty();
						$.each(data, function(k,v) {
							exists=true;
							var equipment_id = v._id;
							var equipment_name = v.item_name;
							var price = v.price;
							var image_src = v.image;
							var description = v.description;
							var card = '<div class="col">'+
							'<div class="card h-100" style="width: 18rem;">' +
							'<img src="/images/Equipment/'+ image_src + '" class="card-img-top" alt="' + equipment_name + '">' + 
							'<div class="card-body">' +
							'<h5 class="card-title"><a href="/equipment/'+ v._id +'">' + equipment_name + '</a></h5>' +
							'<p class="card-text">$' + price + '</p>' +
							'</div>' +
							'</div>'	+
							'</div>'

							$("#equipment-card-area").append(card)

						})
						var search_badge = "";

						if(exists)
						{
							search_badge = '<div class="col-md-6 mt-3 mb-3 mx-2">' +
							'<h3><span class="badge bg-warning text-dark">Showing Results for "' + search_string + '"'
							'<button type="button" class="btn-close" aria-label="Close"></button></span><h3>'
							' </div>'
						}
						else
						{
							search_badge = '<div class="col-md-6 mt-3 mb-3 mx-2">' +
							'<h3><span class="badge bg-warning text-dark">No Results for "' + search_string + '"'
							'<button type="button" class="btn-close" aria-label="Close"></button></span><h3>'
							' </div>'	
						}

						$("#filter_info").append(search_badge)
					},
					error: function(){
						alert("Error searching")
					}
				})
			}

		})

});

