$(document).ready(function(){

    $.ajax({
        method: 'GET',
        url:'/orders?customerid=' + user_id,
        success: function(orders){
            $.each(orders, function(i, order){
                $("#id").append(`<a href="/orderitems?id=` + order._id + `">` + order._id +  `</a><br>`);
                $("#date").append(order.date + '<br>');
                $("#total_price").append(order.total_price + '<br>');
                // $("#total_price").append(window.sessionStorage.getItem('test123') + '<br>');
                // console.log(window.sessionStorage.getItem('test123'));
                // window.sessionStorage.setItem('test123', $("#quantity-input").val());
        });
    },
        error: function(){
            alert("Error loading orders");
        },
    });

});