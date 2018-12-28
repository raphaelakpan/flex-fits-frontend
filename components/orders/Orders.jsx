import { Component } from 'react'
import { Query } from 'react-apollo';
import { ALL_ORDERS_QUERY } from '../queries/orders';
import { formatDistance} from 'date-fns';
import Link from 'next/link';
import Spinner from '../common/Spinner';
import { StyledOrders } from '../styles/Orders';
import formatMoney from '../../lib/formatMoney';

const count = items => items.reduce((sum, item) => sum + item.quantity, 0);

class Orders extends Component {
  static Order = ({ order }) => (
    <Link href={{
        pathname: '/order',
        query: { id: order.id },
      }}
    >
      <a>
        <div className="Order">
          {order.items.length > 0 && (
            <img src={order.items[0].image} alt={order.items[0].title} />
          )}
          <div className="Order_metadata grey">
            <div>{formatMoney(order.total)} ({count(order.items)} item{count(order.items) > 1 ? 's' : ''})</div>
            <div>{`${formatDistance(order.createdAt, new Date())} ago`}</div>
            <div className="grey"><em>{order.user.email}</em></div>
          </div>
        </div>
      </a>
    </Link>
  );

  render() {
    return (
      <Query query={ALL_ORDERS_QUERY} fetchPolicy="network-only">
        {({ data: { orders }, loading, error }) => {
          if (loading) return <Spinner />
          return (
            <StyledOrders>
              <h1 className="centered"> All Orders</h1>
              {orders.length === 0 && (
                <p>You do not have any orders. Complete your first checkout to see them here 😁</p>
              )}
              {orders.length > 0 && (
                <div className="Orders">
                  {orders.map(order =>
                    <Orders.Order
                      key={order.id}
                      order={order}
                    />
                  )}
                </div>
              )}
            </StyledOrders>
          );
        }}
      </Query>
    );
  }
}

export default Orders;
