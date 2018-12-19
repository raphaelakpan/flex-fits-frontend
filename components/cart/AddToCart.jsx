import { Mutation } from 'react-apollo';
import { ADD_TO_CART_MUTATION} from '../queries/cart';
import { CURRENT_USER_QUERY } from '../queries/users';
import Spinner from '../common/Spinner';

const AddToCart = ({ itemId}) => (
  <Mutation
    mutation={ADD_TO_CART_MUTATION}
    variables={{ itemId }}
    refetchQueries={[
      { query : CURRENT_USER_QUERY }
    ]}
  >
    {(addToCard, { loading }) => (
      <button onClick={addToCard} disabled={loading}>
        {loading ?
        <Spinner /> :
          <span>Add to Cart &nbsp; <i className="fas fa-cart-plus"></i></span>
        }
      </button>
    )}
  </Mutation>
);

export default AddToCart;
