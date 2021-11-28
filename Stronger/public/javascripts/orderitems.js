$(document).ready(function(){
    var queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    $.ajax({
        method: 'GET',
        url:'/orders/' + urlParams.get('id'),
        success: function(order){
            $("h2").append(order._id);
            $("#date").append(order.date);
            // console.log(order.order);
            // console.log(order.order[0]);
            $.each(order.order, function(i, o){
                console.log(o);
                var order_card = `<div class="card mb-5">
                <img src="/images/equipment/` + o.equipment_image + `" class="card-img-top" />
                <div class="card-body">
                  <h5 class="card-title">` + o.equipment_name + `</h5>
                  <p class="card-text">
                    <div id="price"> $` + o.equipment_price +  `</div>
                    <div id="quantity"> Qty:` + o.quantity +  `</div>
                  </p>
                </div>
              </div>`
              $("#item_card").append(order_card);
                // $("#equipment_image").attr("src", order.order[i].equipment);
                // $(".card-title").append(order.order[i].equipment_name);
                // $("#price").append("$" + order.order[i].equipment_price);
                // $("#quantity").append(order.order[i].quantity);
            });
            $("#total").append("$" + Number(order.total_price).toFixed(2));
    },
        error: function(){
            alert("Error loading orders");
        },
    });

});