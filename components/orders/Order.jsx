import { Component } from 'react'
import PropTypes from 'prop-types'
import { Query } from 'react-apollo';
import Head from 'next/head';
import { format } from 'date-fns';
import { SINGLE_ORDER_QUERY } from '../queries/orders';
import Spinner from '../common/Spinner';
import ErrorMessage from '../common/ErrorMessage';
import StyledOrder from '../styles/Order';
import formatMoney from '../../lib/formatMoney';

 class Order extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
  }

  static OrderItem = ({ item }) => (
    <div className="order_item">
      <img src={item.image} alt={item.title} width="100" />
      <div className="item__details">
        <h2>{item.title}</h2>
        <div className="details__table">
          <div>Qty: <span className="grey">{item.quantity}</span></div>
          <div>Price: <span className="grey">{formatMoney(item.price)}</span></div>
          <div>Subtotal: <span className="grey">{formatMoney(item.price * item.quantity)}</span></div>
        </div>
        <div className="grey"><em>{item.description}</em></div>
      </div>
    </div>
  );

  render() {
    const { id } = this.props;

    return (
      <Query
        query={SINGLE_ORDER_QUERY}
        variables={{ id }}
      >
        {({ data, loading, error }) => {
          if (loading) return <Spinner />
          if (error) return <ErrorMessage error={error} />
          const { order } = data;
          return (
            <StyledOrder>
              <Head>
                <title>Flex Fits | Order {id} </title>
              </Head>
              <h1 className="centered">Order</h1>
              <p>
                <span>Order ID: </span>
                <span className="grey">{order.id}</span>
              </p>
              <p>
                <span>Charge: </span>
                <span className="grey">{order.charge}</span>
              </p>
              <p>
                <span>Date: </span>
                <span className="grey">{format(order.createdAt, 'd MMMM YYYY, h:mm a')}</span>
              </p>
              <p>
                <span>Item Count: </span>
                <span className="grey">{order.items.length}</span>
              </p>
              <p>
                <span>Total: </span>
                <span className="grey">{formatMoney(order.total)}</span>
              </p>
              <div className="order_items">
                {order.items.map(item =>
                  <Order.OrderItem key={item.id} item={item} />
                )}
              </div>
            </StyledOrder>
          );
        }}
      </Query>
    )
  }
}

export default Order;
