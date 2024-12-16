import { products } from "../../data/products.js";
import { cart, cartQuantity } from "../../data/cart.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { displayPrice } from '../utils/money.js';
import { addOrder } from "../../data/order.js";


export function renderPaymentSummary() {
  let totalItemPriceCents = 0;
  let totalShippingFeeCents = 0;
  cart.forEach((cartItem) => {
    totalShippingFeeCents += deliveryOptions[cartItem.deliveryOptionIndex].priceCents;
    products.forEach((product) => {
      if (cartItem.productId === product.id) {
        totalItemPriceCents += cartItem.quantity*product.priceCents;
      }
    })
  })
  const totalPriceCent = totalItemPriceCents + totalShippingFeeCents;
  const taxMoney = Math.round(totalPriceCent/10);
  const paymentHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${cartQuantity}):</div>
      <div class="payment-summary-money">$${displayPrice(totalItemPriceCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${displayPrice(totalShippingFeeCents)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${displayPrice(totalPriceCent)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${displayPrice(taxMoney)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${displayPrice(totalPriceCent + taxMoney)}</div>
    </div>

    <button class="place-order-button js-place-order-button button-primary">
      Place your order
    </button>
  `
  document.querySelector('.js-payment-summary').innerHTML = paymentHTML;

  document.querySelector('.js-place-order-button')
    .addEventListener('click', async () => {
      if (cartQuantity === 0) {
        alert('Cannot place an order on an empty cart');
      } else {
        try  {
          const response = await fetch('https://supersimplebackend.dev/orders', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              cart: cart
            })
          });
          const order = await response.json();
          addOrder(order);
          console.log(order);
        } catch(error) {
          console.log(error);
        }
        window.location.href = 'orders.html';
      }
    });
}
