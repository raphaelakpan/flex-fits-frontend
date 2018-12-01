import React, { Component } from 'react'
import { Query } from 'react-apollo';
import { ALL_ITEMS_QUERY } from '../queries/items';
import { Center, ItemsList } from '../styles/Items';
import Item from './Item';

class Items extends Component {
  render() {
    return (
      <Center>
        <Query query={ALL_ITEMS_QUERY}>
          {({ data, loading, error }) => {
            if (loading) return <p>Loading...</p>;
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
      </Center>
    )
  }
}

export default Items;
