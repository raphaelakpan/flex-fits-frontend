import { Query } from 'react-apollo';
import { ORDERS_PAGINATION_QUERY } from '../queries/orders';
import Pagination from './index';
import { perPage } from '../orders/Orders';

const OrdersPagination = ({ page }) => (
  <Query query={ORDERS_PAGINATION_QUERY} fetchPolicy="network-only">
    {({ data, loading }) => {
      if (loading) return null;
      return (
        <Pagination
          name="Orders"
          page={page}
          pathname="/orders"
          count={data.ordersConnection.aggregate.count}
          perPage={perPage}
        />
      )
    }}
  </Query>
);

export default OrdersPagination;
