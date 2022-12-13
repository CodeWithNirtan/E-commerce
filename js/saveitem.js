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
    
    orderbtn = $(".bs-card-btn");


    $.each(orderbtn,(index,item)=>{
      $(item).on("click",()=>{

            var product = {};
            var parentElement = item.parentElement.parentElement.parentElement;
            product.id = $(parentElement).attr("pdt-id");
            product.pdtname = $(parentElement).find(".bs-card-title").text();
            product.pdtprice = $(parentElement).find(".price").text().trim().replace("$","");
            product.img = $(parentElement).find(".bs-card-img").attr("data-img");
            product.qty = 1;

           
            $(".alert.alert-success").fadeIn();
            setInterval(() => {
                    $(".alert.alert-success").fadeOut();
                }, 1000);
                cart.push(product);
                savechanges(cart,"cart");



      })
    })
    






});

