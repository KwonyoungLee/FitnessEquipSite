$(document).ready(function(){
    $.ajax({
        method: 'GET',
        url:'/orders',
        success: function(orders){
            console.log(orders);
            $.each(orders, function(i, order){
                $("#id").append(order._id + '<br>');
                $("#date").append(order.date + '<br>');
                $("#total_price").append(order.total_price + '<br>');

        });
    },
        error: function(){
            alert("Error loading orders");
        },
    });

});