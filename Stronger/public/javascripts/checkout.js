$(document).ready(function () {    

    $("#btn_order").click('submit', function () {

        //Shipping variables
        var s_address = $("#ship_address").val();
        var s_apt = $("#ship_apt").val();
        var s_city = $("#ship_city").val();
        var s_state = $('#ship_state').val();
        var s_zip = $("#ship_zip").val();
        var s_country = $('#ship_country').val();

        //Billing variables
        var b_address = $("#bill_address").val();
        var b_apt = $("#bill_apt").val();
        var b_city = $("#bill_city").val();
        var b_state = $("bill_state").val();
        var b_zip = $("#bill_zip").val();
        var b_country = $('#bill_country').val();

        //order object
        // var order = {
        //     customer_id: ,
        //     customer_username:,
        //     order:,
        //     total_price:,
        //     date: 
        // }

        var customer = {
            billing_address: {
                bill_address: b_address,
                bill_apt: b_apt,
                bill_city: b_city,
                bill_state: b_state,
                bill_zip: b_zip,
                bill_country: b_country,
            },
            shipping_address: {
                ship_address: s_address,
                ship_apt: s_apt,
                ship_zip: s_zip,
                ship_city: s_city,
                ship_state: s_state,
                ship_country: s_country
            }
        }

        console.log(customer);

        //PUT customer object
        // $.ajax({
        //     method: 'PUT',
        //     url:'', //api to update customer url
        //     data: customer,
        //     success: function(customer){ 
                    // addOrders();  
        //         console.log(customer); 
        //          once customer is updated, then call post to put order

        // },
        //     error: function(){
        //         alert("Error updating customer");
        //     },
        // });

    });
        //POST order object
        // function addOrders(){
        // $.ajax({
        //     method: 'POST',
        //     url:'/orders',
        //     data: order,
        //     success: function(order){   
        //         console.log(order);    
        // },
        //     error: function(){
        //         alert("Error adding order");
        //     },
        // });
        // }
});