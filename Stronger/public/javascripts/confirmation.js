$(document).ready(function(){
    var order_no = window.sessionStorage.getItem("order_no");
    $("p").append(order_no);
});