import { Query, Mutation } from 'react-apollo';
import { StyledCart } from '../styles/Cart';
import Supreme from '../styles/Supreme';
import Button from '../styles/Button';
import CloseButton from '../styles/CloseButton';
import { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION } from '../queries/client';
import CurrentUser from '../users/CurrentUser';
import CartItem from './CartItem';
import calcTotalPrice from '../../lib/calcTotalPrice';
import formatMoney from '../../lib/formatMoney';

const Cart = props => (
  <CurrentUser>
    {({ currentUser, loading }) => {
      if (!currentUser) return null;
      return (
        <Mutation mutation={TOGGLE_CART_MUTATION}>
          {(toggleCart) => (
            <Query query={LOCAL_STATE_QUERY}>
              {({ data: { cartOpen } }) => {
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
                      <Button>Checkout</Button>
                    </footer>
                  </StyledCart>
                );
              }}
            </Query>
          )}
        </Mutation>
      );
    }}
  </CurrentUser>
);

export default Cart;
