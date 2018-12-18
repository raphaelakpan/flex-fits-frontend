import { Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import { REMOVE_FROM_CART } from '../queries/cart';
import { CURRENT_USER_QUERY } from '../queries/users';
import { StyledRemoveCartButton } from '../styles/Cart';

const RemoveFromCart = ({ id }) => {
  // gets called once we have a response from the server
  const update = (cache, payload) => {
    const cartItemId = payload.data.removeFromCart.id;
    const data = cache.readQuery({ query: CURRENT_USER_QUERY });
    data.currentUser.cart = data.currentUser.cart.filter(cartItem => cartItem.id !== cartItemId);
    cache.writeQuery({ query: CURRENT_USER_QUERY, data });
  }

  return (
    <Mutation
      mutation={REMOVE_FROM_CART}
      variables={{ id }}
      update={update}
    >
      {(removeFromCart, { loading, error }) => {
        return (
          <StyledRemoveCartButton onClick={() => removeFromCart().catch(() => {})} disabled={loading}>
            Remov{ loading? 'ing...': 'e' }
            {(!loading && error) && (
              <div className="error">There was an error removing this item. Try again!</div>
            )}
          </StyledRemoveCartButton>
        );
      }}
    </Mutation>
  );
}

RemoveFromCart.propTypes = {
  id: PropTypes.string.isRequired,
}

export default RemoveFromCart;
