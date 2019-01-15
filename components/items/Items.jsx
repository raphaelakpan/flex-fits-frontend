import React, { Component } from 'react';
import { Query } from 'react-apollo';
import Router from 'next/router';
import { ALL_ITEMS_QUERY } from '../queries/Items';
import { ItemsList } from '../styles/Items';
import { Center } from '../styles';
import Item from './Item';
import Pagination from '../Pagination/Items';
import Spinner from '../common/Spinner';
import { perPage } from '../../config';
import { StyledContainer } from '../styles/Page';

class Items extends Component {
  render() {
    const { page } = this.props;

    return (
      <StyledContainer>
        <Center>
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
              if (loading)
                return (
                  <div style={{ margin: '20rem 0' }}>
                    <Spinner />
                  </div>
                );
              if (error) return <p>ERROR: {error.message}</p>;
              if (items.length === 0 && page > 1) {
                Router.push('/');
                return <p>Page not found! Redirecting...</p>;
              }
              if (items.length === 0) return <p>No items to display</p>;

              return (
                <ItemsList>
                  {items.map(item => (
                    <Item item={item} key={item.id} page={page} />
                  ))}
                </ItemsList>
              );
            }}
          </Query>
          <Pagination page={page} />
        </Center>
      </StyledContainer>
    );
  }
}

export default Items;
