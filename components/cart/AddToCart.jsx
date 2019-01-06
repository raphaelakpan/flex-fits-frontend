import { Mutation } from 'react-apollo';
import toastr from '../../lib/toastr';
import { ADD_TO_CART_MUTATION } from '../queries/cart';
import { CURRENT_USER_QUERY } from '../queries/users';
import Spinner from '../common/Spinner';
import Button from '../styles/Button';

const AddToCart = ({ itemId, className, custom }) => {
  const AddButton = ({ children, ...props }) =>
    custom ? (
      <button {...props}>{children}</button>
    ) : (
      <Button {...props}>{children}</Button>
    );

  return (
    <Mutation
      mutation={ADD_TO_CART_MUTATION}
      variables={{ itemId }}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
      {(addToCard, { loading }) => (
        <AddButton
          onClick={async () => {
            await addToCard();
            toastr.success('Item added to cart successfully!');
          }}
          disabled={loading}
          className={className}
        >
          {loading ? (
            <Spinner alt={!custom} />
          ) : (
            <span>
              Add to Cart &nbsp; <i className="fas fa-cart-plus" />
            </span>
          )}
        </AddButton>
      )}
    </Mutation>
  );
};

export default AddToCart;
