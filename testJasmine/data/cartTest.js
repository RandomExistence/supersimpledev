import { cart , addToCart , loadFromStorage } from "../../data/cart.js";

describe('Add to cart', () => {
  beforeAll(() => {
    document.querySelector('.js-test-container').innerHTML = `
    <div class="js-cart-quantity"></div>
  `;
    spyOn(localStorage, 'setItem');
  })

  afterAll(() => {
    document.querySelector('.js-test-container').innerHTML = ``
  })
  
  it('add one new product', () => {
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });
    
    console.log(localStorage.getItem('cart'));
    loadFromStorage();
    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6",1);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify(cart));
    expect(cart[0].id).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(1);
  });

  it('add one existing product', () => {
    
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([
        {
          id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1
        }
      ]);
    });

    console.log(localStorage.getItem('cart'));
    loadFromStorage();
    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6",1);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(4);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify(cart));
    expect(cart[0].id).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(2);
  })
})