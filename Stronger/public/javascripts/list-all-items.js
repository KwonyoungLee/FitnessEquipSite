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
                <div class=col-1>`+ item.deleted +`</div>
                </div>`
                )
                // $("#item_name").append(item.item_name + `<br>`)
                // $("#item_price").append(item.price + `<br>`)
                // $("#item_category").append(item.category + `<br>`)
                // $("#item_image").append(item.image + `<br>`)
                // $("#item_quantity").append(item.quantity_in_stock + `<br>`)
                // $("#item_deleted").append(item.deleted + `<br>`)
            });
    },
        error: function(){
            alert("Error loading equipment");
        },
    });
});