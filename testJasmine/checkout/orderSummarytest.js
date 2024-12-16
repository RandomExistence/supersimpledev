import { renderOrderSummaryHTML } from "../../scripts/checkout/orderSummary.js";
import { cart, loadFromStorage } from "../../data/cart.js";
import { loadProductsFromBackend, fetchProductsFromBackend } from "../../data/products.js";



describe('test suite: renderOrderSummary', () => {
  const id1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const id2 = `15b6fc6f-327a-4ec4-896f-486349e85a3d`;

  beforeAll((done) => {
    fetchProductsFromBackend()
    .then(() => {
      done();
    })
  });

  beforeEach(() => {    
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify(
        [
          {
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
            deliveryOptionIndex: 0
          },
          {
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 1,
            deliveryOptionIndex: 2
          }
        ]
      );
    });
    spyOn(localStorage, 'setItem');
    loadFromStorage();

    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-order-summary"></div>
      <div class="js-return-to-home-link"></div>
      <div class="js-payment-summary"></div>
    `;

    
    renderOrderSummaryHTML();
    document.querySelectorAll('.js-delete-quantity-link').forEach((deleteLink) => {
      deleteLink.classList.add(`js-delete-quantity-link-${deleteLink.dataset.productId}`);
    })
  })

  afterEach(() => {
    document.querySelector('.js-test-container').innerHTML = '';
  })
  
  it('how the page looks', () => {
    
    ////////////////////////////////////////////////////////////
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(2);
    expect(
      document.querySelector(`.js-quantity-label-${id1}`).innerHTML
    ).toEqual('2');
    expect(
      document.querySelector(`.js-quantity-label-${id2}`).innerHTML
    ).toContain('1');
  });

  it('delete item', () => {
    
    /////////////////////////////////////////////////////
    document.querySelector(`.js-delete-quantity-link-${id1}`).click();
    document.querySelectorAll('.js-delete-quantity-link').forEach((deleteLink) => {
      deleteLink.classList.add(`js-delete-quantity-link-${deleteLink.dataset.productId}`);
    })
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(1);
    expect(
      document.querySelector(`.js-delete-quantity-link-${id1}`)
    ).toEqual(null);
    expect(
      document.querySelector(`.js-delete-quantity-link-${id2}`)
    ).not.toEqual(null);
    console.log(cart);
    console.log(cart);
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(id2);
    
  });


});