import gql from 'graphql-tag';

export const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER_MUTATION($token: String!) {
    createOrder(token: $token) {
      id
      charge
      total
      items {
        id
        title
        image
      }
    }
  }
`;

export const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    order(id: $id) {
      id
      total
      charge
      createdAt
      user {
        id
        email
      }
      items {
        id
        title
        description
        price
        quantity
        image
        soldBy {
          id
          name
        }
        originalItem {
          id
        }
      }
    }
  }
`;

export const ALL_ORDERS_QUERY = gql`
  query ALL_ORDERS_QUERY($skip: Int = 0, $first: Int = 8) {
    orders(skip: $skip, first: $first, orderBy: createdAt_DESC) {
      id
      total
      charge
      createdAt
      user {
        id
        email
      }
      items {
        id
        image
        title
        quantity
      }
    }
  }
`;

export const ORDERS_PAGINATION_QUERY = gql`
  query ORDERS_PAGINATION_QUERY {
    ordersConnection {
      aggregate {
        count
      }
    }
  }
`;
