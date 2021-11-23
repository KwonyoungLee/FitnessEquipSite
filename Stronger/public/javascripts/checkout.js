$(document).ready(function () {    
    var equipment_items = []
    var tot_price = 0;
    var today = new Date();
    var current_date = (today.getMonth()+1)+'-'+today.getDate() + '-' + today.getFullYear();

    $.ajax({
        method: 'GET',
        url:'/api/shoppingcart/' + user_username,
        success: function(cart){
            console.log(cart);
            console.log(cart.items);
            console.log(cart.items[0].item_image);
            $.each(cart.items, function(i, item){
                var equipment = {
                    equipment_name: item.item_name,
                    equipment_price: item.item_price,
                    equipment_image: item.item_image,
                    quantity: item.item_quantity
                }

                var price = calculateTotal(item.item_price, item.item_quantity)
                tot_price += price;
                var order_card = `<div class="card mb-5">
                <img src="/images/Equipment/` + item.item_image + `" class="card-img-top" />
                <div class="card-body">
                  <h5 class="card-title">` + item.item_name + `</h5>
                  <p class="card-text">
                    <div id="price">` + item.item_price +  `</div>
                    <div id="quantity"> Qty:` + item.item_quantity +  `</div>
                  </p>
                </div>
              </div>`
              $("#items_card").append(order_card)
              equipment_items.push(equipment)
            })
        },

        error: function(){
            alert("Error loading orders");
        },
    });

    $("#btn_order").click('submit', function () {
        console.log(equipment_items);
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

        var order = {
            customer_id: user_id,
            customer_username: user_username,
            order: equipment_items,
            total_price: tot_price,
            date: current_date
        }

        console.log(order);

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

        //POST order object
        $.ajax({
            method: 'POST',
            url:'/orders',
            data: JSON.stringify(order),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(order){   
                console.log(order);    
        },
            error: function(){
                alert("Error adding order");
            },
        });

    });


        function calculateTotal(item_price, quantity){
            return item_price * quantity;
        }
});