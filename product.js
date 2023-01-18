$(document).ready(function(){
    $('#change').click(function(){
    $('#txt').toggle(500);
    });
});


$(document).ready(function(){

	// Get the current page location using location.href
	// we split base on "=" to convert it to an array
	let arr = location.href.split('=')
	// we get the id of the page 
	let id = arr[1]
	let details = "";

	$('.btn-cart').click(function(){
		// Check if the there is a key "cart" in the localstorage
		let cart = localStorage.getItem('cart')
		let arr = []
		let data = "";

		if(cart != null){
			// this is a key of cart in the localstorage

			// convert the string data in the localstorage using JSON.parse
			arr = JSON.parse(cart)

			// push the new details into the data
			arr.push(details)

			// convert the arr to string using JSON.stringify
			data = JSON.stringify(arr)

			// set the data to the localstorage
			localStorage.setItem('cart',data)

			// indicate the cart count in the DOM
			$('#cart-count').html(arr.length)

		}else{
			// this is no key of cart in the localstorage

			// push the details value into an array
			arr.push(details)

			// convert the arr to string using JSON.stringify
			data = JSON.stringify(arr)

			// set the data to the localstorage
			localStorage.setItem('cart',data)

			// indicate the cart count in the DOM
			$('#cart-count').html(1)
		}
	})

	$.ajax({
		url:`https://studying-easy.codedamn.app:1337/galleries/${id}`,
		type:"GET",
		success:function(res) {
			
			// we store the result in the global variable details
			details = res;

			// set the result to the DOM 
			$('#img').attr("src",res.image)


			// Check if the there is a key "cart" in the localstorage
			let cart = localStorage.getItem('cart')
			let arr = []

			if(cart != null){
				// convert the string data in the localstorage using JSON.parse
				arr = JSON.parse(cart)

				// indicate the cart count in the DOM
				$('#cart-count').html(arr.length)
			}
		},
		error:function(err){
			console.log(err)
		}
	})
})


