$(document).ready(function(){
    $.ajax({
        method: 'GET',
        url:'/orders?customerid=61870f65f26d32303fda29b2',
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