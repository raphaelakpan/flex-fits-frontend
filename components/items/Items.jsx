import React, { Component } from 'react'
import { Query } from 'react-apollo';
import { ALL_ITEMS_QUERY } from '../queries/items';
import { ItemsList } from '../styles/Items';
import { Center } from '../styles';
import Item from './Item';
import Pagination from '../common/Pagination';
import Spinner from '../common/Spinner';
import { perPage } from '../../config';

class Items extends Component {
  render() {
    const { page } = this.props;

    return (
      <Center>
        <Pagination page={page} />
        <Query
          /** "fetchPolicy="network-only" => so that it doesn't read from cache and ensure updated items
           * We loose caching benefits but we always have up to date info on the page when items are added or deleted
           * A possible fix from NextJS? 🌞
           */
          fetchPolicy="network-only"
          query={ALL_ITEMS_QUERY}
          variables={{
            skip: page * perPage - perPage,
          }}
        >
          {({ data, loading, error }) => {
            if (loading) return <Spinner />;
            if (error) return <p>ERROR: {error.message}</p>;
            return (
              <ItemsList>
                {data.items.map(item =>
                  <Item
                    item={item}
                    key={item.id}
                  />
                )}
              </ItemsList>
            );
          }}
        </Query>
        <Pagination page={page} />
      </Center>
    )
  }
}

export default Items;
