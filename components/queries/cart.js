import gql from 'graphql-tag';

export const ADD_TO_CART_MUTATION = gql`
  mutation ADD_TO_CART_MUTATION($itemId: ID!) {
    addToCart(itemId: $itemId) {
      id
      quantity
    }
  }
`;

export const REMOVE_FROM_CART = gql`
  mutation REMOVE_FROM_CART($id: ID!) {
    removeFromCart(id: $id) {
      id
    }
  }
`;
