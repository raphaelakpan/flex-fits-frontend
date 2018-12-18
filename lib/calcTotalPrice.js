export default function calcTotalPrice(cart) {
  return cart.reduce((sum, cartItem) => {
    if (!cartItem.item) return sum;
    return sum + cartItem.quantity * cartItem.item.price;
  }, 0);
}
