import React, { Component } from 'react'
import { Query } from 'react-apollo';
import Router from 'next/router';
import { ALL_ITEMS_QUERY } from '../queries/items';
import { ItemsList } from '../styles/Items';
import { Center } from '../styles';
import Item from './Item';
import Pagination from '../common/Pagination';
import Spinner from '../common/Spinner';
import { perPage } from '../../config';

class Items extends Component {
  redirectToPreviousPage = () => {
    Router.push({
      pathname: '/items',
      query: { page: this.props.page - 1 }
    });
  }

  render() {
    const { page } = this.props;

    return (
      <Center>
        <Pagination page={page} />
        <Query
          /** "fetchPolicy="network-only" => so that it doesn't read from cache and ensure updated items
           * We loose caching benefits but we always have up to date info on the page when items are added or deleted
           * A possible fix from Apollo? 🌞
           */
          fetchPolicy="network-only"
          query={ALL_ITEMS_QUERY}
          variables={{
            skip: page * perPage - perPage,
          }}
        >
          {({ data: { items }, loading, error }) => {
            if (loading) return <div style={{ margin: '20rem 0' }}><Spinner /></div>;
            if (error) return <p>ERROR: {error.message}</p>;
            if (items.length === 0 && page > 1) return this.redirectToPreviousPage();
            if (items.length === 0) return (
              <p>No items to display</p>
            );

            return (
              <ItemsList>
                {items.map(item =>
                  <Item
                    item={item}
                    key={item.id}
                    page={page}
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
