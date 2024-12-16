export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
  orders.unshift(order);
  saveOrderToLocalStorage();
}

function saveOrderToLocalStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}