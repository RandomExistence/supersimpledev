class Cart {
  cartItems;
  #localStorageKey;

  constructor(key) {
    this.localStorageKey = key;
    this.#loadFromStorage();
  }

  cartQuantity = JSON.parse(localStorage.getItem(`cartQuantity-${this.#localStorageKey}`)) || 3;

  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(`cart-${this.#localStorageKey}`)) ||
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
    ];
  }

  addToCart(productId, addThisMany) {
    let matchingItem;
    this.cartItems.forEach((cartItem,index) => {
      if (cartItem.productId === productId) {
        this.cartItems[index].quantity += addThisMany;
        matchingItem = cartItem;
      }
    })
  
    if (!matchingItem) {
      this.cartItems.push({
        productId: productId,
        quantity: addThisMany,
        deliveryOptionIndex: 0
      });
    }
    this.updateCartQuantity();
    localStorage.setItem(`cart-${this.localStorageKey}`, JSON.stringify(this.cartItems));
    //document.querySelector('.js-cart-quantity').innerHTML = this.cartQuantity;
  }

  removeItem(productId) {
    this.cartItems.forEach((cartItem, index) => {
      if (cartItem.productId === productId) {
        this.cartItems.splice(index,1);
      }
    })
    this.updateCartQuantity();
    localStorage.setItem(`cart-${this.#localStorageKey}`, JSON.stringify(this.cartItems));
  }

  updateCartQuantity() {
    this.cartQuantity = 0;
    this.cartItems.forEach((cartItem) => {
      this.cartQuantity += cartItem.quantity;
    })
    localStorage.setItem(`cartQuantity-${this.#localStorageKey}`,JSON.stringify(this.cartQuantity));
  }

}

const normalCart = new Cart('normal');
const businessCart = new Cart('business');
businessCart.addToCart('04701903-bc79-49c6-bc11-1af7e3651358', 2);
console.log(businessCart);
console.log(normalCart);


//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
let addedTimeout;
let previousProduct;
export function addToCartEffect(productId) {
  const thisDiv = document.querySelector(`.js-added-to-cart-${productId}`);
  thisDiv.classList.add(`added-to-cart-visible`);
  if (thisDiv === previousProduct)
  clearTimeout(addedTimeout);
  addedTimeout = setTimeout(() => {
    thisDiv.classList.remove(`added-to-cart-visible`);  
  }, 1500)
  previousProduct = thisDiv;
}


export function modifyCartCheckout(productId, inputQuantity) {
  cart.forEach((cartItem,index) => {
    if (cartItem.productId === productId) {
      cart[index].quantity = inputQuantity;
    }
  })
  updateCartQuantity();
  if (document.querySelector(`.js-cart-item-container-${productId}`).classList.contains(`is-editing`))
  document.querySelector(`.js-cart-item-container-${productId}`).classList.remove('is-editing');
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function updateDeliveryOption(productId, chosenDeliveryOptionIndex) {
  cart.forEach((cartItem, index) => {
    if (cartItem.productId === productId) {
      cart[index].deliveryOptionIndex = chosenDeliveryOptionIndex;
    }
  })
  localStorage.setItem('cart', JSON.stringify(cart));
}
*/
