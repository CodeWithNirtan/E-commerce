


$(document).ready(()=>{
    
    function loadchanges(object) {
        return JSON.parse(localStorage.getItem(object));
    }
    function savechanges(object,key) {
        return localStorage.setItem(key,JSON.stringify(object))
    }
    
    var orderbtn;
    
    var cart = loadchanges("cart");
    if(cart == null)
    {
        cart = [];
    }
    var cart_total = 0;
    
    $.each(cart,(index,item)=>{
        
        cart_total += parseFloat(item.pdtprice*item.qty);
        $("#grand-total").html("$"+cart_total);   
            var tbody = $("#cartitems");
            var tr = `<tr>
            <td data-th="Product">
            <div class="row">
              <div class="col-sm-2 hidden-xs"><img src="../images/${item.img}" alt="..." class="img-responsive" /></div>
              <div class="col-sm-10">
                <h4 class="nomargin">${item.pdtname}</h4>
              </div>
            </div>
            </td>
            <td data-th="Price" class="Price" >$${item.pdtprice}</td>
            <td data-th="Quantity">
            <input type="number" class="form-control text-center qty quantity" max="5" min="1" value="${item.qty}">
            </td>
            <td data-th="Subtotal" class="text-center Subtotal">$${item.pdtprice*item.qty}</td>
            <td class="actions" data-th="">
            <button class="btn btn-danger btn-sm" data-id="${item.id}" ><i class="fa fa-trash-o"></i>Remove</button>
            </td>
            </tr>`; 
            $(tbody).append(tr);

            var removebtns = $(".btn.btn-danger");
            $.each(removebtns,(index,removebtn)=>{
               $(removebtn).on("click",removeitem)
            })
            
            var qty = $(".quantity");
            $.each(qty,(index,qtybtn)=>{
               $(qtybtn).on("change",changesubtotal)
            })
            

    })

  
    function changesubtotal(e) {
        var main_div = e.target.parentElement.parentElement;
        var price = $(main_div).find(".Price").text().replace("$","");
        var id = $(main_div).find(".btn-danger").attr("data-id");
        var qty = e.target.value;
        $(main_div).find(".Subtotal").text("$"+parseFloat(price)*qty);
        cart.forEach((element) => {
            if(element.id == id){
                element.qty = qty;
            }
        });
        savechanges(cart,"cart");
        window.location.reload();
    }

    function removeitem(event){
        
        var main_div = event.target.parentElement.parentElement;
        qty = main_div.getElementsByClassName("qty quantity")[0].value;
        var id = $(event.target).attr("data-id");
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].id == id) {
                event.target.parentElement.parentElement.remove();
                cart_total -= cart[i].pdtprice * qty;
                $("#grand-total").html("$"+cart_total);           
                cart.splice(i, 1);
                savechanges(cart,"cart");
                $(".alert.alert-danger").fadeIn();
                setInterval(() => {
                        $(".alert.alert-danger").fadeOut();
                    }, 1000);
            }
            }
    }


$("#checkout").click(()=>{
    if(localStorage.length != 0)
    {

        $("tbody").remove();
        $("#grand-total").text("");
        localStorage.clear();
        setInterval(() => {
            $(".alert.alert-success").fadeOut();
        }, 1000);
        $(".alert.alert-success").fadeIn();
    }
})


})






