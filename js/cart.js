document.querySelector(".badge").textContent = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")).length : 0;

const itemsList = document.querySelector("[items-list]");
const cartItem = document.querySelector("[cart-item]");

let cartItems = localStorage.getItem("cart");

if(cartItems && cartItems != "[]"){

	cartItems = JSON.parse(localStorage.getItem("cart"));

	var totalPrice = 0;
	
	cartItems.forEach(item => {

		let element = cartItem.content.cloneNode(true).children[0];

		element.querySelector(".name").textContent = item.title;

		element.querySelector(".count").textContent = item.count;

		element.querySelector(".price").textContent = item.price;

		element.querySelector(".multi-price").textContent = parseFloat(item.price.toFixed(2) * item.count);

		totalPrice += item.price * item.count;

		itemsList.append(element);

		element.querySelector(".btn-count").addEventListener("click", event => {

			handleProduct(event, item, element);
		})



	})

	var totalPriceInPage = document.createElement("tr");
	var tableElement = document.createElement("td");
	let buyButton = document.createElement("button");


	buyButton.textContent = "BUY";
	buyButton.classList.add("buy-button");

	let backToShopButton = document.createElement("a");
	backToShopButton.textContent = "Back to Shop";
	backToShopButton.classList.add("buy-button");
	backToShopButton.style.textDecoration = "none";
    backToShopButton.style.display = "table-cell";
    backToShopButton.href= "./index.html";
	

	let backToShopCell = tableElement.cloneNode(true);
	backToShopCell.colSpan = "2";
	backToShopCell.style.textAlign = "left";
	backToShopCell.style.borderBottom = "none";
	backToShopCell.style.padding = "30px 0 10px 0"; 
	backToShopCell.append(backToShopButton);




	let tdButton = tableElement.cloneNode(true);
	tdButton.colSpan = "2";
	tdButton.style.textAlign = "center";
	tdButton.style.borderBottom = "none";
	tdButton.style.padding = "30px 0 10px 0";
	tdButton.append(buyButton);

	tableElement.textContent = parseFloat(totalPrice.toFixed(2));
	tableElement.colSpan = "2";
	tableElement.classList.add("total-price");

	totalPriceInPage.append(backToShopCell);
	totalPriceInPage.append(tdButton);
	totalPriceInPage.append(tableElement);
	itemsList.append(totalPriceInPage);


}else{
	backToHome()
}
function handleProduct(event, item, element){


	if (event.target.classList.contains("plus")){

		item.count++;

		element.querySelector(".count").textContent = item.count;

		element.querySelector(".multi-price").textContent = parseFloat(item.price.toFixed(2) * item.count);

		totalPrice += item.price;

		tableElement.textContent = parseFloat(totalPrice.toFixed(2))

	}else if(event.target.classList.contains("minus")){

		item.count--;

		element.querySelector(".count").textContent = item.count;

		element.querySelector(".multi-price").textContent = parseFloat(item.price.toFixed(2) * item.count);

		totalPrice -= item.price;

		tableElement.textContent = parseFloat(totalPrice.toFixed(2));

		if(element.querySelector(".count").textContent < 1){

			element.remove();

			cartItems = cartItems.filter(e => e.id !== item.id);
		}
	}
	localStorage.setItem('cart',JSON.stringify(cartItems));

	document.querySelector(".badge").textContent = cartItems.length;

	if(!cartItems.length){
		
		backToHome();
	}
}
function backToHome(){

	document.querySelector(".table").remove();
	
	var backButton = document.createElement("a");

	backButton.textContent = "Back to Shop";

	backButton.classList.add("buy-button");

	backButton.style.textAlign = "center";

	backButton.style.textDecoration = "none";

	backButton.href= "./index.html";

	let h2 = document.createElement("h2");

	h2.textContent = "Cart is empty!"

	h2.style.textAlign = "center";

	h2.style.marginBottom = "1.5em";

	let tableBlock = document.getElementById('block');

	tableBlock.append(h2);

	tableBlock.append(backButton);



}