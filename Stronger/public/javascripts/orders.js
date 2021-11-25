$(document).ready(function(){

    $.ajax({
        method: 'GET',
        url:'/orders?customerid=' + user_id,
        success: function(orders){
            $.each(orders, function(i, order){
                console.log(total_price);
                $("#id").append(`<a href="/orderitems?id=` + order._id + `">` + order._id +  `</a><br>`);
                $("#date").append(order.date + '<br>');
                $("#total_price").append(`$` + order.total_price + '<br>');
        });
    },
        error: function(){
            alert("Error loading orders");
        },
    });

    $.ajax({
        method: 'GET',
        url:'/customers/' + user_username,
        success: function(user){
            $("#address").append(`Address: <br>` + user.billing_address.bill_address + `<br>` + 
            user.billing_address.bill_apt + `<br>` + user.billing_address.bill_city + `, `
            + user.billing_address.bill_state + ` ` + user.billing_address.bill_zip +
            `<br>` + user.billing_address.bill_country);
    },
        error: function(){
            alert("Error finding customer");
        },
    });
});