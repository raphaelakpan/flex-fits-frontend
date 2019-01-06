import { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import Head from 'next/head';
import Link from 'next/link';
import { format } from 'date-fns';
import { SINGLE_ORDER_QUERY } from '../queries/orders';
import Spinner from '../common/Spinner';
import ErrorMessage from '../common/ErrorMessage';
import { StyledOrder } from '../styles/Orders';
import formatMoney from '../../lib/formatMoney';

class Order extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
  };

  static OrderItem = ({ item }) => (
    <div className="order_item grey">
      <img src={item.image} alt={item.title} width="100" />
      <div className="item__details">
        {item.originalItem ? (
          <Link
            href={{
              pathname: '/item',
              query: { id: item.originalItem.id },
            }}
          >
            <a>
              <h2>{item.title}</h2>
            </a>
          </Link>
        ) : (
          <h2>{item.title}</h2>
        )}
        <div className="details__table">
          <div>
            Qty: <span>{item.quantity}</span>
          </div>
          <div>
            Price: <span>{formatMoney(item.price)}</span>
          </div>
          <div>
            Subtotal: <span>{formatMoney(item.price * item.quantity)}</span>
          </div>
        </div>
        {item.soldBy && (
          <small>
            Sold by: <em>{item.soldBy.name}</em>
          </small>
        )}
        <div>
          <em>
            {item.description.length <= 70
              ? item.description
              : item.description.substr(0, 70) + '...'}
          </em>
        </div>
      </div>
    </div>
  );

  render() {
    const { id } = this.props;

    return (
      <Query query={SINGLE_ORDER_QUERY} variables={{ id }}>
        {({ data, loading, error }) => {
          if (loading) return <Spinner />;
          if (error) return <ErrorMessage error={error} />;
          const { order } = data;
          return (
            <StyledOrder>
              <Head>
                <title>Flex Fits | Order {id} </title>
              </Head>
              {!order && (
                <div>
                  No Order found for id <strong>{id}</strong>
                </div>
              )}
              {order && (
                <Fragment>
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
                    <span className="grey">
                      {format(order.createdAt, 'd MMMM YYYY, h:mm a')}
                    </span>
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
                    {order.items.map(item => (
                      <Order.OrderItem key={item.id} item={item} />
                    ))}
                  </div>
                </Fragment>
              )}
            </StyledOrder>
          );
        }}
      </Query>
    );
  }
}

export default Order;
