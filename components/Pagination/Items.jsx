import { Query } from 'react-apollo';
import { ITEMS_PAGINATION_QUERY } from '../queries/items';
import { perPage } from '../../config';
import Pagination from './index';

const ItemsPagination = ({ page }) => (
  <Query query={ITEMS_PAGINATION_QUERY} fetchPolicy="network-only">
    {({ data, loading }) => {
      if (loading) return null;
      return (
        <Pagination
          name="Items"
          page={page}
          pathname="/items"
          count={data.itemsConnection.aggregate.count}
          perPage={perPage}
        />
      );
    }}
  </Query>
);

export default ItemsPagination;
