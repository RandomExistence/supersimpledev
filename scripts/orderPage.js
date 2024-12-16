import { orders } from "../data/order.js";
import { products as productDetails , fetchProductsFromBackend } from "../data/products.js";
import { cart , buyAgain , cartQuantity } from "../data/cart.js";
import { displayDate } from "./utils/date.js";
import { displayPrice } from "./utils/money.js";


fetchProductsFromBackend()
.then(() => {
  renderHeaderOrderPage();
  renderBodyOrderPage();
  console.log(orders);
});


function renderHeaderOrderPage() {
  let headerOrderPageHTML = '';
  orders.forEach((order) => {
    headerOrderPageHTML += `
    <div class="order-container">
      <div class="order-header">
        <div class="order-header-left-section">
          <div class="order-date">
            <div class="order-header-label">Order Placed:</div>
            <div>${displayDate(order.orderTime)}</div>
          </div>
          <div class="order-total">
            <div class="order-header-label">Total:</div>
            <div>$${displayPrice(order.totalCostCents)}</div>
          </div>
        </div>
        <div class="order-header-right-section">
          <div class="order-header-label">Order ID:</div>
          <div>${order.id}</div>
        </div>
      </div>

      <div class="order-details-grid js-order-details-grid-${order.id}">
      
      </div>
    </div>
    `;
  });
  document.querySelector('.js-orders-grid').innerHTML = headerOrderPageHTML;
  document.querySelector('.js-cart-quantity').innerHTML = `${cartQuantity}`;
}

function renderBodyOrderPage() {
  orders.forEach((order) => {
    let bodyOrderPage = '';
    order.products.forEach((boughtProduct) => {
      let matchingItem;
      productDetails.forEach((productDetail) => {
        if (productDetail.id === boughtProduct.productId) {
          matchingItem = productDetail;
        }
      });

      bodyOrderPage += `
        <div class="product-image-container">
          <img src=${matchingItem.image}>
        </div>

        <div class="product-details">
          <div class="product-name">
            ${matchingItem.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${displayDate(boughtProduct.estimatedDeliveryTime)}
          </div>
          <div class="product-quantity">
            Quantity: ${boughtProduct.quantity}
          </div>
          <button class="buy-again-button js-buy-again-button button-primary" 
            data-product-id="${matchingItem.id}" data-product-quantity="${boughtProduct.quantity}">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html?orderId=${order.id}&productId=${matchingItem.id}&productQuantity=${boughtProduct.quantity}&arrivalTime=${boughtProduct.estimatedDeliveryTime}">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      </div>
      `;
    });
    document.querySelector(`.js-order-details-grid-${order.id}`).innerHTML = bodyOrderPage;
  });

  document.querySelectorAll('.js-buy-again-button').forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      const productQuantity = Number(button.dataset.productQuantity);
      buyAgain(productId, productQuantity);
      window.location.href = 'checkout.html';
    });
  });
}

