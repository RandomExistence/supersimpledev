export let cart;
loadFromStorage();

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart')) ||
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

export let cartQuantity = JSON.parse(localStorage.getItem('cartQuantity')) || 3;


// addToCart function
export function addToCart(productId, addThisMany) {
  let matchingItem;
  cart.forEach((cartItem,index) => {
    if (cartItem.productId === productId) {
      cart[index].quantity += addThisMany;
      matchingItem = cartItem;
    }
  })

  if (!matchingItem) {
    cart.push({
      productId: productId,
      quantity: addThisMany,
      deliveryOptionIndex: 0
    });
  }
  updateCartQuantity();
  localStorage.setItem('cart', JSON.stringify(cart));
  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}

// addToCartEffect Function
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

export function updateCartQuantity() {
  cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  })
  localStorage.setItem('cartQuantity',JSON.stringify(cartQuantity));
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


export function removeItem(productId) {
  cart.forEach((cartItem, index) => {
    if (cartItem.productId === productId) {
      cart.splice(index,1);
    }
  })
  updateCartQuantity();
  localStorage.setItem('cart', JSON.stringify(cart));
}


export function buyAgain(productId, quantity) {
  cart = [
    {
      productId: `${productId}`,
      quantity: quantity,
      deliveryOptionIndex: 0
    }
  ];
  console.log(cart);
  updateCartQuantity();
  localStorage.setItem('cart', JSON.stringify(cart));
}


///////////////

export function loadCartFromBackend(func) {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener('load', () => {
    console.log(xhr.response);
    func();
  });
  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
}