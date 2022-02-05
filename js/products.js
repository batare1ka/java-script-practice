"use strict"

const stars = [
'<div class="bi-star-fill"></div>',
'<div class="bi-star-fill"></div>',
'<div class="bi-star-fill"></div>',
'<div class="bi-star-fill"></div>',
'<div class="bi-star-fill"></div>'
];

async function fetchProducts() {
	
	let products = localStorage.getItem('products');
	
	if(!products){
		const response = await fetch('https://fakestoreapi.com/products');

		const result = await response.json();

		products = result.map(product =>{
			return {
				id: product.id,
				title: product.title,
				image: product.image,
				price: parseFloat(product.price.toFixed(2)),
				stars: Math.round(product.rating.rate),
				count: 1
			}
		})

		localStorage.setItem('products', JSON.stringify(products));
	}else{
		products = JSON.parse(products);
	}
	
	
	return products;
}
const productTemplate = document.querySelector("[product-template]");
const productsList = document.querySelector("[products-list]");
let cartIcon = document.querySelector(".badge");
cartIcon.textContent = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")).length : 0;

function addToCard(product) {

	let cart = localStorage.getItem("cart");

	if(!cart){

		localStorage.setItem('cart',JSON.stringify([product]));
		cart = localStorage.getItem("cart");

	}else{

		let prevProducts = JSON.parse(cart);

		let productExistsInArray = prevProducts.some(element => element.id === product.id);

		if(productExistsInArray){
			prevProducts.forEach(element => {
				element.id === product.id ? element.count++ : ''; 
			})
		}else{
			prevProducts.push(product);
		}
		

		localStorage.setItem('cart',JSON.stringify(prevProducts));
		
		cart = localStorage.getItem("cart");
	}
	cart = JSON.parse(cart);
	cartIcon.textContent = cart.length
	
	
}


fetchProducts().then(products => {

	products.forEach( product => {

		let element = productTemplate.content.cloneNode(true).children[0];

		element.querySelector("img").src = product.image

		element.querySelector("h5").textContent = product.title

		element.querySelector("div .d-flex").innerHTML = stars.slice(0,product.stars).join('')

		element.querySelector("div .text-center").innerHTML += "$" + product.price
		console.log(typeof product.price)

		element.querySelector("div .btn").addEventListener("click", (event)=>{

			addToCard(product);

		})
		productsList.append(element);

		
	})
	
});