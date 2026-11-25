 import { cart, calcualteCartQty } from "../../data/cart.js";
 import { getProduct, products } from "../../data/products.js";
 import { getDeliveryId } from "../../data/deliveryOptions.js";
import {formatCurrency} from "../utils/money.js";
 
 export function renderPaymentSummary(){
   const cartQuantity = calcualteCartQty();
   let productPriceCent = 0;
   let shippingCost = 0;
    cart.forEach((cartItem) => {
      const product = getProduct(cartItem.productId);
      productPriceCent += product.priceCents * cartItem.productQtyValue;
      const deliveryOptionId = getDeliveryId(cartItem.deliveryOptionId);
      shippingCost += deliveryOptionId.priceCent;
    });
    const totalBeforeTax = productPriceCent + shippingCost;
    const totalTax = totalBeforeTax * 0.1;
    const totalCost = totalBeforeTax + totalTax;
    console.log(productPriceCent);
    console.log(shippingCost);



    const paymentHtml = `
      <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cartQuantity}):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCent)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingCost)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(totalTax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCost)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
    `
    document.querySelector('.js-payment-summary').innerHTML = paymentHtml;
 }

