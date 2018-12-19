import { Mutation } from 'react-apollo';
import { Component } from 'react';
import toastr from 'toastr';
import { ADD_TO_CART_MUTATION} from '../queries/cart';
import { CURRENT_USER_QUERY } from '../queries/users';
import Spinner from '../common/Spinner';

class AddToCart extends Component {
  handleClick = async addToCart => {
    await addToCart();
    toastr.success('Item added to cart')
  }

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
        {(addToCard, { loading, error, called }) => (
          <button onClick={() => this.handleClick(addToCard)} disabled={loading}>
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
