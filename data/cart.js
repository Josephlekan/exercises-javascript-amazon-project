export let cart = JSON.parse(localStorage.getItem('cart'));

  if (!cart){
    cart = [{
    productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    productQtyValue: 2,
    deliveryOptionId: '1'
      
}, {
    productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    productQtyValue: 1,
    deliveryOptionId: '2'
}];
  }


export function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}



export function addToCart(productId){
      const productQty = document.querySelector(`.productQty-${productId}`).value;

            const productQtyValue = Number(productQty);

            let matchingItem;

            cart.forEach((item) => {
              if (productId === item.productId){
                matchingItem = item;
              }
            });
  
            if (matchingItem){
              matchingItem.productQtyValue += productQtyValue;
            } else {
              cart.push({
              productId,
              productQtyValue,
              deliveryOptionId: '2'
            });
            
          }
          saveToStorage();
  }

 
 export function removeCart (productId){
           const newCart = [];
            cart.forEach((cartItem) => {
              if(cartItem.productId !== productId){
                newCart.push(cartItem)
              }
           })
           cart = newCart;
          saveToStorage();
  }
            
        
  export function calcualteCartQty(){
                  let cartQuantity = 0; 
                 cart.forEach((cartItem) => {
                  cartQuantity += cartItem.productQtyValue;
                });
                return cartQuantity;
          }

      
    export  function cartMultiple(){
        cart.forEach((cartItem) => {
         const cartProduct = cartItem.productQtyValue;
        });
    }

  export  function updateQuantity(productId, newQuantityValue){
      cart.forEach((cartItem) => {
        if(productId === cartItem.productId){
          cartItem.productQtyValue = Number(newQuantityValue); 
          console.log(cartItem.productQtyValue);
          document.querySelector(`.js-quantity-label-${productId}`).innerHTML = Number(newQuantityValue);
        }
      });
        saveToStorage();
    }

   export function updateDeliveryOption(productId, deliveryOptionId){
      let matchingItem;
      cart.forEach((item) => {
          if (productId === item.productId){
            matchingItem = item;
          }
        });

        matchingItem.deliveryOptionId = deliveryOptionId;
        saveToStorage();
    }