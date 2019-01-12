import { Component } from 'react';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import NProgress from 'nprogress';
import StripeCheckout from 'react-stripe-checkout';
import calcTotalPrice from '../../lib/calcTotalPrice';
import ErrorMessage from './ErrorMessage';
import CurrentUser from '../users/CurrentUser';
import { CURRENT_USER_QUERY } from '../queries/users';
import { CREATE_ORDER_MUTATION } from '../queries/orders';
import { TOGGLE_CART_MUTATION } from '../queries/client';

const STRIPE_KEY = 'pk_test_RPCW5etj6G0pNUUkklfuAGAh';
const totalItems = cart => {
  return cart.reduce((sum, cartItem) => sum + cartItem.quantity, 0);
};

class Checkout extends Component {
  handleToken = async (stripeResponse, createOrder, toggleCart) => {
    NProgress.start();
    const response = await createOrder({
      variables: { token: stripeResponse.id },
    }).catch(error => console.log(error));
    Router.push({
      pathname: '/order',
      query: { id: response.data.createOrder.id },
    });
    toggleCart();
  };

  static Composed = ({ children }) => (
    <CurrentUser>
      {({ currentUser }) => {
        if (!currentUser) return null;
        const { cart, email } = currentUser;
        return (
          <Mutation mutation={TOGGLE_CART_MUTATION}>
            {toggleCart => (
              <Mutation
                mutation={CREATE_ORDER_MUTATION}
                refetchQueries={[{ query: CURRENT_USER_QUERY }]}
              >
                {createOrder =>
                  children({
                    cart,
                    email,
                    toggleCart,
                    createOrder,
                  })
                }
              </Mutation>
            )}
          </Mutation>
        );
      }}
    </CurrentUser>
  );

  render() {
    return (
      <Checkout.Composed>
        {({ cart, email, toggleCart, createOrder }) => (
          <StripeCheckout
            name="Flex Fits"
            description={`Order for ${totalItems(cart)} item(s)`}
            amount={calcTotalPrice(cart)}
            image={cart.length ? cart[0].item && cart[0].item.image : null}
            stripeKey={STRIPE_KEY}
            currency="USD"
            email={email}
            token={stripeResponse =>
              this.handleToken(stripeResponse, createOrder, toggleCart)
            }
          >
            {this.props.children}
          </StripeCheckout>
        )}
      </Checkout.Composed>
    );
  }
}

export default Checkout;
