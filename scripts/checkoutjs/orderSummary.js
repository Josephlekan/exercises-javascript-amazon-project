import {calcualteCartQty, cart, removeCart, updateQuantity,
  updateDeliveryOption
} from "../../data/cart.js";
import {products, getProduct} from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOption} from "../../data/deliveryOptions.js"
import { renderPaymentSummary } from "./paymentSummary.js";

    //saveToStorage();
  const today = (dayjs());
  const deliveryDate = today.add(7, 'days');
  console.log(deliveryDate.format('dddd, MMMM D'));


  export function renderCheckOutSummary(){
  
  let checkOutSummary = '';

      cart.forEach((cartItem) => {
        const productId = cartItem.productId;
        const matchingProducts = getProduct(productId);
        const deliveryOptionId = cartItem.deliveryOptionId;
        let deliveryOptions;

        deliveryOption.forEach((delivery) =>{
          if(delivery.id === deliveryOptionId){
            deliveryOptions = delivery;
          }
        });

        const today = dayjs();
        const deliveryDate = today.add(
          deliveryOptions.deliveryDays, 
          'days'
        );
        const dateString = deliveryDate.format('dddd, MMMM D');
      

      checkOutSummary +=

      ` <div class="cart-item-container 
          js-cart-item-container-${matchingProducts.id} ">
                <div class="delivery-date">
                  Delivery date: ${dateString}
                </div>

                <div class="cart-item-details-grid">
                  <img class="product-image"
                    src="${matchingProducts.image}">

                  <div class="cart-item-details">
                    <div class="product-name">
                      ${matchingProducts.name}
                    </div>
                    <div class="product-price">
                    $${formatCurrency(matchingProducts.priceCents)}
                    </div>
                    <div class="product-quantity">
                      <span>
                        Quantity: <span class="quantity-label js-quantity-label-${matchingProducts.id}">${cartItem.productQtyValue}</span>
                      </span>
                      <span class="update-quantity-link js-update-link link-primary"
                        data-product-id = "${matchingProducts.id}">
                        Update
                      </span> 
                      <input class="quantity-input js-quantity-input-${matchingProducts.id}">
                      <span class="save-quantity-link js-save-link link-primary"
                        data-product-id = "${matchingProducts.id}">Save</span>
                      <span class="delete-quantity-link js-delete-quantity-link link-primary"
                        data-product-id = "${matchingProducts.id}">
                        Delete
                      </span>
                    </div>
                  </div>

                  <div class="delivery-options">
                    ${deliveryOptionsHTML(matchingProducts, cartItem)}
                  </div>
                </div>
              </div>
      `
    });

        document.querySelector('.js-order-summary')
         .innerHTML = checkOutSummary;


      // saveToStorage();
      function deliveryOptionsHTML(matchingProducts, cartItem){

          let html = '';
          deliveryOption.forEach((deliveryOptionss) => {
            const today = dayjs();
            const deliveryDate = today.add(
              deliveryOptionss.deliveryDays, 
              'days'
            );
            const dateString = deliveryDate.format('dddd, MMMM D');
            const deliveryPrice = deliveryOptionss.priceCent === 0
            ? 'Free -'
            : `$${formatCurrency(deliveryOptionss.priceCent)} -`

            const isChecked = deliveryOptionss.id === cartItem.deliveryOptionId;

          html += 
                    `
                      <div class="delivery-option js-delivery-option"
                        data-product-id = "${matchingProducts.id}"
                        data-delivery-option-id = "${deliveryOptionss.id}">
                                <input type="radio"
                                  ${(isChecked ? 'checked' : '')}
                                  class="delivery-option-input"
                                  name="${matchingProducts.id}">
                                <div>
                                  <div class="delivery-option-date">
                                    ${dateString};
                                  </div>
                                  <div class="delivery-option-price">
                                    ${deliveryPrice} Shipping
                                  </div>
                                </div>
                              </div>
                    `
          });
          return html;
      }
          


        document.querySelectorAll('.js-delete-quantity-link')
            .forEach((link) => {
              link.addEventListener('click', () => {
                const productId = link.dataset.productId;    
                const container =  document.querySelector(`.js-cart-item-container-${productId}`);
                  container.remove();
                  removeCart(productId);
                  updateCartQty();   
                }); 
            });

            document.querySelectorAll('.js-update-link')
              .forEach((updateLink) => {
                updateLink.addEventListener('click', () => {
                const productId = updateLink.dataset.productId;
                const newQuantity = document.querySelector(`.js-quantity-input-${productId}`);
                const oldQuantity = document.querySelector(`.js-quantity-label-${productId}`);
                newQuantity.value = Number(oldQuantity.innerHTML);
                document.querySelector(`.js-cart-item-container-${productId}`)
                    .classList.add('is-editing-quantity');
                });
              });


            document.querySelectorAll('.js-save-link')
              .forEach((saveLink) => {
                saveLink.addEventListener('click', () => {
                const productId = saveLink.dataset.productId;
                document.querySelector(`.js-cart-item-container-${productId}`)
                  .classList.remove('is-editing-quantity');
                let newQuantity = document.querySelector(`.js-quantity-input-${productId}`);
                let oldQuantity = document.querySelector(`.js-quantity-label-${productId}`);
                let oldQuantityValue = Number(oldQuantity.innerHTML);
                let newQuantityValue = newQuantity.value;
                document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantityValue;
                if(newQuantity.value < 1){
                  newQuantityValue = oldQuantityValue;
                  document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantityValue;
                  alert(`Cart can't be empty`);
                  return;
                }

                if(!Number(newQuantity.value)){
                  newQuantityValue = oldQuantityValue;
                  document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantityValue;
                  alert(`Cart can only contain numbers`);
                  return;
                }
                updateQuantity(productId, newQuantityValue);
                updateCartQty();
                });
              });
            
            
            updateCartQty();
          
            
            function updateCartQty(){
              const cartQuantity = calcualteCartQty();
              document.querySelector('.js-cartQty').innerHTML = `${cartQuantity} items`; 
            }

          document.querySelectorAll('.js-delivery-option')
              .forEach((element) => {
                element.addEventListener('click', () => {
                const {productId, deliveryOptionId} = element.dataset;
                updateDeliveryOption(productId, deliveryOptionId);
                renderCheckOutSummary();
              });
            });
          }

      renderCheckOutSummary();
    