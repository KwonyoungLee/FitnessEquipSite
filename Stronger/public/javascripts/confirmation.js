$(document).ready(function(){
    var order_id = window.sessionStorage.getItem("order_id");
    $("p").append(order_id);
});