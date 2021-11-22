$(document).ready(function(){
    var queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    $.ajax({
        method: 'GET',
        url:'/orders/' + urlParams.get('id'),
        success: function(order){
            $("h2").append(order._id);
            $("#date").append(order.date);
            console.log(order.order);
            console.log(order.order[0]);
            $.each(order.order, function(i, o){
                $("#equipment_image").attr("src", order.order[i].equipment);
                $(".card-title").append(order.order[i].equipment_name);
                $("#price").append("$" + order.order[i].equipment_price);
                $("#quantity").append(order.order[i].quantity);
            });
            $("#total").append("$" + order.total_price);
    },
        error: function(){
            alert("Error loading orders");
        },
    });

});