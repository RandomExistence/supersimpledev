import { cart, cartQuantity, modifyCartCheckout, updateDeliveryOption, removeItem } from '../../data/cart.js';
import { products } from '../../data/products.js';
import { displayPrice } from '../utils/money.js';
import { deliveryOptions } from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';


let checkoutHTML = '';
export function renderOrderSummaryHTML() {
  checkoutHTML = '';
  cart.forEach((cartItem) => {

    let matchingItem;
    products.forEach((product) => {
      if (cartItem.productId === product.id) {
        matchingItem = product;
      }
    });
    const today = dayjs();
    let deliveryDate;
    deliveryDate = today;
    deliveryOptions.forEach((deliveryOption, index) => {
      if (index === cartItem.deliveryOptionIndex) {
        for (let i = 0; i < deliveryOption.deliveryTime; ++i) {
          if (deliveryDate.format('dddd') === 'Saturday' || deliveryDate.format('dddd') === 'Sunday')
            --i; 
          deliveryDate = deliveryDate.add(1,'day');
        }
        if (deliveryDate.format('dddd') === 'Saturday') deliveryDate = deliveryDate.add(2,'day');
        else if (deliveryDate.format('dddd') === 'Sunday') deliveryDate = deliveryDate.add(1,'day');
      }
    })
  
    checkoutHTML +=`
    <div class="cart-item-container js-cart-item-container-${cartItem.productId} js-cart-item-container">
      <div class="delivery-date js-delivery-date-${cartItem.productId}">
        Delivery date: ${deliveryDate.format('dddd, MMMM D')}
      </div>
      <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingItem.image}">
  
      <div class="cart-item-details">
        <div class="product-name">
          ${matchingItem.name}
        </div>
        <div class="product-price">
          $${matchingItem.getPrice()}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label js-quantity-label-${cartItem.productId}">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link js-update-quantity-link link-primary" data-product-id="${cartItem.productId}">
            Update
          </span>
          <input class="update-quantity-input js-update-quantity-input js-update-quantity-input-${cartItem.productId}" data-product-id="${cartItem.productId}" value=${cartItem.quantity}>
          <span class="save-quantity-span js-save-quantity-span link-primary" data-product-id="${cartItem.productId}">Save</span>
          <span class="delete-quantity-link js-delete-quantity-link link-primary" data-product-id="${cartItem.productId}">
            Delete
          </span>
        </div>
      </div>
      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        ${deliveryOptionHTMLGenerator(cartItem)}
      </div>
    </div>
    </div>
    `;
  });
  
  document.querySelector('.js-order-summary').innerHTML = checkoutHTML;
  document.querySelector('.js-return-to-home-link').innerHTML = `${cartQuantity} items`;
  
  document.querySelectorAll('.js-update-quantity-link').forEach((link) => {
    const productId = link.dataset.productId;
    link.addEventListener('click', () => {
      document.querySelector(`.js-cart-item-container-${productId}`).classList.add('is-editing');
    });
  });
  
  document.querySelectorAll('.js-save-quantity-span').forEach((saveLink) => {
    const productId = saveLink.dataset.productId;
    saveLink.addEventListener('click', () => {
      console.log('how about click')
      const inputQuantity = Number(document.querySelector(`.js-update-quantity-input-${productId}`).value);
      console.log('clicked');
      if (inputQuantity === 0) {
        removeItem(productId);
      }
      else if (inputQuantity > 0) {
        modifyCartCheckout(productId, inputQuantity);
      }
      renderOrderSummaryHTML();
      renderPaymentSummary();
    })
  });
  
  document.querySelectorAll('.js-delete-quantity-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeItem(productId);
      renderOrderSummaryHTML();
      renderPaymentSummary();
    });
  });
  
  document.querySelectorAll('.js-delivery-option-input').forEach((input) => {
    input.addEventListener('click',  () => {
      const productId = input.dataset.productId;
      const chosenDeliveryOptionIndex = Number(input.dataset.radioIndex);
      updateDeliveryOption(productId, chosenDeliveryOptionIndex);
      renderOrderSummaryHTML();
      renderPaymentSummary();
    })
  })

  document.body.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      document.querySelectorAll('.js-update-quantity-input').forEach((input) => {
        const productId = input.dataset.productId;
        if (Number(input.value) === 0) {
          removeItem(productId);
        }
        else if (Number(input.value) > 0) {
         modifyCartCheckout(productId, Number(input.value));
        }
      })
      renderOrderSummaryHTML();
      renderPaymentSummary();
    }
  })
}

function deliveryOptionHTMLGenerator(cartItem) {
  let deliveryOptionHTML = '';
  const today = dayjs();
  deliveryOptions.forEach((deliveryOption, index) => {
    let deliveryDate = today;
    for (let i = 0; i < deliveryOption.deliveryTime; ++i) {
      if (deliveryDate.format('dddd') === 'Saturday' || deliveryDate.format('dddd') === 'Sunday')
        --i;
      deliveryDate = deliveryDate.add(1,'day');
    }
    if (deliveryDate.format('dddd') === 'Saturday') deliveryDate = deliveryDate.add(2,'day');
    else if (deliveryDate.format('dddd') === 'Sunday') deliveryDate = deliveryDate.add(1,'day');
    const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${displayPrice(deliveryOption.priceCents)}`;
    let isCheck = cartItem.deliveryOptionIndex === index ? 'checked' : '';
    deliveryOptionHTML += ` 
      <div class="delivery-option">
        <input type="radio"
          ${isCheck}
          class="delivery-option-input js-delivery-option-input"
          name="delivery-option-${cartItem.productId}" 
          data-product-id="${cartItem.productId}" 
          data-radio-index="${index}">
        <div>
          <div class="delivery-option-date">
            ${deliveryDate.format('dddd, MMMM D')}
          </div>
          <div class="delivery-option-price">
            ${priceString} - Shipping
          </div>
        </div>
      </div>`
  })
  return deliveryOptionHTML;
}
