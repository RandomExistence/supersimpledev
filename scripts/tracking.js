import { products as productDetails , fetchProductsFromBackend } from '../data/products.js';
import { orders } from '../data/order.js';
import { displayDate } from './utils/date.js';
import { cartQuantity } from '../data/cart.js';

fetchProductsFromBackend()
.then(() => {
  console.log('test');
  renderTrackingTML();
});

let trackingHTML = '';
function renderTrackingTML() {
  const url = new URL(window.location.href);
  const trackedOrderId = url.searchParams.get('orderId');
  const trackedProductId = url.searchParams.get('productId');
  const trackedProductQuantity = url.searchParams.get('productQuantity');
  const trackProductArrivalTime = url.searchParams.get('arrivalTime');

  let matchingItem;
  productDetails.forEach((productDetail) => {
    if (productDetail.id === trackedProductId) {
      matchingItem = productDetail;
    }
  });

  let matchingOrder;
  orders.forEach((order) => {
    if (order.id === trackedOrderId) {
      matchingOrder = order;
    }
  });
  console.log(trackedProductId);
  console.log(matchingItem);
  console.log(matchingOrder);

  const orderedTime = matchingOrder.orderTime;

  trackingHTML = `
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>

    <div class="delivery-date">
      Arriving on ${displayDate(trackProductArrivalTime)}
    </div>

    <div class="product-info">
      ${matchingItem.name}
    </div>

    <div class="product-info">
      Quantity: ${trackedProductQuantity}
    </div>

    <img class="product-image" src=${matchingItem.image}>

    <div class="progress-labels-container">
      <div class="progress-label">
        Preparing
      </div>
      <div class="progress-label current-status">
        Shipped
      </div>
      <div class="progress-label">
        Delivered
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar"></div>
    </div>
    `;

  document.querySelector('.js-order-tracking').innerHTML = trackingHTML;
  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}