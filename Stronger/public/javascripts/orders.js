$(document).ready(function () {
    var dob_string = new Date(user_dob).toDateString()

    $("#name").append(user_firstname + " " + user_lastname);
    $("#username").append(user_username);
    $("#dob").append("<br><b>Date of Birth</b><br> " + dob_string);

    $.ajax({
        method: 'GET',
        url: '/orders?customerid=' + user_id,
        success: function (orders) {
            $.each(orders, function (i, order) {
                console.log(total_price);
                $("#id").append(`<a href="/orderitems?id=` + order._id + `">` + order._id + `</a><br>`);
                $("#date").append(order.date + '<br>');
                $("#total_price").append(`$` + Number(order.total_price).toFixed(2) + '<br>');
            });
        },
        error: function () {
            alert("Error loading orders");
        },
    });

    $.ajax({
        method: 'GET',
        url: '/customers/' + user_username,
        success: function (user) {
            if (user.billing_address != "" && user.billing_address.bill_apt != "") {
                $("#address").append(`<b>Primary Address</b> <br>` + user.billing_address.bill_address + `<br>` +
                    user.billing_address.bill_apt + `<br>` + user.billing_address.bill_city + `, `
                    + user.billing_address.bill_state + ` ` + user.billing_address.bill_zip +
                    `<br>` + user.billing_address.bill_country);
            }
            else if (user.billing_address != ""){
                $("#address").append(`<b>Primary Address</b> <br>` + user.billing_address.bill_address + `<br>` + user.billing_address.bill_city + `, `
                + user.billing_address.bill_state + ` ` + user.billing_address.bill_zip +
                `<br>` + user.billing_address.bill_country);
            }
        },
        error: function () {
            alert("Error finding customer");
        },
    });
});