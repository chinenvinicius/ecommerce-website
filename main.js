let cartIcon = document.querySelector('#cart-icon');
let cart = document.querySelector('.cart');
let closeCart = document.querySelector('#close-cart');


cartIcon.onclick = () => {
    cart.classList.toggle('active');
}
closeCart.onclick = () => {
    cart.classList.remove('active');
}


if(document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
}else{
     ready();
}

function ready(){
    let removeCartButtons =  document.getElementsByClassName('cart-remove');
   
    for(let i = 0; i < removeCartButtons.length; i++ ){
        let button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);

    }
    let quantityInputs = document.getElementsByClassName('cart-quantity');

    for(let i = 0; i < quantityInputs.length; i++ ){
      let input = quantityInputs[i];
      input.addEventListener('change', quantityInputsChanged);

    }
    let addCart = document.getElementsByClassName('add-cart');
    console.log(addCart);


    for(let i = 0; i < addCart.length; i++ ){
      let button =  addCart[i];
      button.addEventListener('click', addCartClicked);
    }
    //購入ボタン
    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked);

}
function buyButtonClicked() {
    alert('ご注文完了しました');
    let cartContent = document.getElementsByClassName('cart-content')[0];
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild);

    }
   document.getElementsByClassName('total-price')[0].innerText = '$0';
   
}

function addCartClicked(e){
    let button = e.target;
    let shopProducts = button.parentElement;
    let title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    let price = shopProducts.getElementsByClassName('price')[0].innerText;
    let productImg = shopProducts.getElementsByClassName('product-img')[0].src;
    addProductToCart(title, price, productImg);
    udpdatetotal();
}

function addProductToCart(title, price, productImg){
    let cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    let cartItems =  document.getElementsByClassName('cart-content')[0];
    let cartItemNames = cartItems.getElementsByClassName('cart-product-title');
    cart.classList.add('active');

    for(let i = 0; i < cartItemNames.length; i++ ){

             if(cartItemNames[i].innerText == title){
                alert('すでに商品が追加されています');
                return;
             }

      }

      let cartBoxContent =  `
      <img class="cart-img" src="${productImg}" alt="">
      <div class="detail-box">
          <div class="cart-product-title">${title}</div>
          <div class="cart-price">${price}</div>
          <input type="number" value="1" class="cart-quantity">
      </div>
      <i class="fa-solid fa-trash cart-remove"></i>
      
      
      `;
      cartShopBox.innerHTML = cartBoxContent;
      cartItems.append(cartShopBox);
      cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click',removeCartItem);
      cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change',quantityInputsChanged);
      //remove item
      
    }

function removeCartItem(event) {
    let buttonClicked = event.target;
    buttonClicked.parentElement.remove();
    udpdatetotal();
}

function quantityInputsChanged(e) {
 let input = e.target;
 if(isNaN(input.value) || input.value <= 0 ){
    input.value = 1;
 };
 udpdatetotal();
}

//update content


function udpdatetotal(){
    let cartContent = document.getElementsByClassName('cart-content')[0];
    let cartBoxes = cartContent.getElementsByClassName('cart-box');
    console.log(cartBoxes);
    let total = 0;
    for(var i = 0; i < cartBoxes.length; i++){
        let cartBox =  cartBoxes[i]
        let priceElement = cartBox.getElementsByClassName('cart-price')[0];
        let quantityElement =  cartBox.getElementsByClassName('cart-quantity')[0];
        let price = parseFloat(priceElement.innerText.replace('$',""));
        let quantity =  quantityElement.value;
    
        total = total + price * quantity;

        total = Math.round(total * 100 ) / 100;

        document.getElementsByClassName('total-price')[0].innerText = '$' + total;

    }
}
