import { renderOrderSummaryHTML } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { loadCartFromBackend } from '../data/cart.js';
import { fetchProductsFromBackend } from '../data/products.js';

import { displayDate } from './utils/date.js';

displayDate('2024-12-14T07:50:28.497Z');

/* 
new Promise((resolve) => {
  loadProductsFromBackend(() => {
    resolve();
  });
}).then(() => {
  renderOrderSummaryHTML();
  renderPaymentSummary();
});
*/

async function loadPage() {
  console.log('loadPage');

  try {
    //throw 'malicious malware';
    await fetchProductsFromBackend();
    await new Promise((resolve, reject) => {
      //throw 'atrocity awaits';
      loadCartFromBackend(() => {
        //reject("throw doesn't work, I turned to willThrow")
        resolve('VALUE22');
      });
    });
  } catch (error) {
    console.log(error);
  }

  renderOrderSummaryHTML();
  renderPaymentSummary();

  return 'value2'; // this got converted into resolve value
}

loadPage()
.then((value) => {
  console.log('next step');
  console.log(value);
});



/*
Promise.all([
  fetchProductsFromBackend(),
  new Promise((resolve) => {
    loadCartFromBackend(() => {
      resolve('VALUE22');
    })
  })

]).then((value) => {
  console.log(value);
  renderOrderSummaryHTML();
  renderPaymentSummary();
});
*/

/*
new Promise((resolve) => {
  loadProductsFromBackend(() => {
    resolve('value1');
  });
}).then((value) => {
  console.log(value);
  return new Promise((resolve) => {
    loadCartFromBackend(() => {
      resolve();
    });
  });
}).then(() => {
  renderOrderSummaryHTML();
  renderPaymentSummary();
})
*/


////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
loadProductsFromBackend(() => {
  renderOrderSummaryHTML();  
  renderPaymentSummary();
});
*/

/*
loadProductsFromBackend(() => {
  loadCartFromBackend(() => {
    renderOrderSummaryHTML();
    renderPaymentSummary();
  });
});
*/

