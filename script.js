function render(data){

      return `<div class="carousel"
      data-flickity='{ "freeScroll": true,"pageDots": false, "wrapAround": true }'>
      <div class="cell1">
          <div class="james">
              <div class="txt">
                  <h4>${data.name}</h4>
                  <div class="none">
                      <p class="vin">${data.title}</p>
                      <P>${data.price} + VAT</P>
                  </div>
              </div>
              <div class="pic">
                  <a href="/product.html" data-id='${data.id}'><img src="${data.img}" alt="" width="220px" height="133px"></a>
              </div>
          </div>
      </div>
    </div>`
  }
  
  
  function setRecord(info){
    
     for(let i=0;i<info.length;i++){
          let item = info[i];
          let result = render(item)
          
          $('.row').append(result)
          
        }
  }
  
  // wait for the page to load before running the code
  $(document).ready(function(){
     
     // show our loader
    $('.load').show();
  
    // we make an ajax request to the https://fakestoreapi.com/products to display the data
    $.ajax({
      type:"GET",
      url:"https://studying-easy.codedamn.app:1337/sliders/",
      success:function(info){
        
        // on success hide the loader
         $('.load').hide();
    
        // loop through the arr "info" 
         for(let i=0;i<info.length;i++){
  
          // get each object in the "info" array
          let item = info[i];
  
          // pass the item to the render function to populate the data
          let result = render(item)     
  
          // append the result to the DOM   
          $('.row').append(result)
          
        }
  
        // After the data on the page has been populated,
        // We display the number of item in cart
  
        // Check the localstorage to see if there is a "cart" key
        let cart  = localStorage.getItem('cart')
        let arr = []
  
        // if the key is not null or empty in the localstorage
        if(cart != null){
  
          // convert the string data in the localstorage using JSON.parse
          arr = JSON.parse(cart)
  
          // indicate the cart count in the DOM
          $('#cart-count').html(arr.length)
        }
        
      },
      error:function(err){
         $('.load').hide();
        console.log(err)
      }
    })
    
    // bind a click event to all the btn-preview
    
    $(document).on('click','.pic',function(){
  
      // We get the data attribute of the current button
      let attrib = $(this).attr('data-id')
  
      // transfer to a new page and concatenate the attribute 
      // using query string
      // Example http://localhost?a=123
  
      location.href = `product.html?id=${attrib}`
    })
    
  })
  
  
  