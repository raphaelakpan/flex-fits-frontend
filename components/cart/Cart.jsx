import { Query, Mutation } from 'react-apollo';
import { adopt } from 'react-adopt';
import { StyledCart } from '../styles/Cart';
import Supreme from '../styles/Supreme';
import Button from '../styles/Button';
import CloseButton from '../styles/CloseButton';
import { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION } from '../queries/client';
import CurrentUser from '../users/CurrentUser';
import CartItem from './CartItem';
import calcTotalPrice from '../../lib/calcTotalPrice';
import formatMoney from '../../lib/formatMoney';
import Checkout from '../common/Checkout';

const Composed = adopt({
  user: ({ render }) => <CurrentUser>{render}</CurrentUser>,
  toggleCart: ({ render }) => <Mutation mutation={TOGGLE_CART_MUTATION}>{render}</Mutation>,
  localState: ({ render }) => <Query query={LOCAL_STATE_QUERY}>{render}</Query>,
});

const Cart = () => (
  <Composed>
    {({ user, toggleCart, localState }) => {
      const { currentUser } = user;
      const { cartOpen } = localState.data;

      if (!currentUser) return null;
      return (
        <StyledCart open={cartOpen}>
          <header>
            <CloseButton onClick={toggleCart}><i className="far fa-times-circle"></i></CloseButton>
            <Supreme> <i className="fas fa-cart-plus"></i> </Supreme>
            <p>
              You have {currentUser.cart.length} item(s) in your cart
            </p>
          </header>
          <ul>
            {currentUser.cart.length === 0 &&
              <li>Add an item to your cart 🌝</li>
            }
            {currentUser.cart.map(cartItem =>
              <CartItem cartItem={cartItem} key={cartItem.id} />
            )}
          </ul>
          <footer>
            <p>
              {formatMoney(
                calcTotalPrice(currentUser.cart)
              )}
            </p>
            {currentUser.cart.length > 0 && (
              <Checkout>
                <Button style={{ width: "100%" }}>Checkout</Button>
              </Checkout>
            )}
          </footer>
        </StyledCart>
      );
    }}
  </Composed>
);

export default Cart;
