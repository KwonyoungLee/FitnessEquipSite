$(document).ready(function(){
    $.ajax({
        method: 'GET',
        url:'/api/equipment',
        success: function(items){
            console.log(items);
            $.each(items, function(i, item){

                $("#items_list").after(`<div class=row>
                <div class=col-4>`+ item.item_name +`</div>
                <div class=col-1>` + item.price + `</div>
                <div class=col-2>`+ item.category +`</div>
                <div class=col-3>`+ item.image +`</div>
                <div class=col-1>`+ item.quantity_in_stock +`</div>
                </div>`
                )
            });
    },
        error: function(){
            alert("Error loading equipment");
        },
    });
});