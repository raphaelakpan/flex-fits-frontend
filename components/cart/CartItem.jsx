import { Fragment } from 'react';
import { StyledCartItem } from '../styles/Cart';
import formatMoney from '../../lib/formatMoney';
import PriceTag from '../styles/PriceTag'
import RemoveFromCart from './RemoveFromCart'

const CartItem = ({ cartItem }) => {
  const { item } = cartItem;
  return (
    <StyledCartItem>
      {item ? (
        <Fragment>
          <div className="CartItem__image">
            <img width="100" src={item.image} alt={item.title} />
            <PriceTag>{formatMoney(item.price)}</PriceTag>
          </div>
          <div className="CartItem__details">
            <h3>{item.title} ({cartItem.quantity})</h3>
            <p>
              {formatMoney(item.price * cartItem.quantity)}
            </p>
            <RemoveFromCart id={cartItem.id} />
          </div>
        </Fragment>
      ) : (
        <div className="CartItem__details">
          <p>This item has been deleted </p>
          <RemoveFromCart id={cartItem.id} />
        </div>
      )}
    </StyledCartItem>
  )
}

export default CartItem;
