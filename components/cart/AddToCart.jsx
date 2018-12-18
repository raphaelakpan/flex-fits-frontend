import { Mutation } from 'react-apollo';
import { Component } from 'react';
import { ADD_TO_CART_MUTATION} from '../queries/cart';
import { CURRENT_USER_QUERY } from '../queries/users';
import Spinner from '../common/Spinner';

class AddToCart extends Component {
  render() {
    const { itemId } = this.props;

    return (
      <Mutation
        mutation={ADD_TO_CART_MUTATION}
        variables={{ itemId }}
        refetchQueries={[
          { query : CURRENT_USER_QUERY }
        ]}
      >
        {(addToCard, { loading, error }) => (
          <button onClick={addToCard} disabled={loading}>
            {loading ?
            <Spinner /> :
              <span>Add to Cart &nbsp; <i className="fas fa-cart-plus"></i></span>
            }
          </button>
        )}
      </Mutation>
    )
  }
}

export default AddToCart;
