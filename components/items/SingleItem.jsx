import React, { Component } from 'react';
import { Query } from 'react-apollo';
import Head from 'next/head';
import { SINGLE_ITEM_QUERY } from '../queries/items';
import { StyledItem } from '../styles/SingleItem';
import PriceTag from '../styles/PriceTag';
import formatMoney from '../../lib/formatMoney';
import AddToCart from '../cart/AddToCart';
import Supreme from '../styles/Supreme';

class SingleItem extends Component {
  render() {
    return (
      <Query
        query={SINGLE_ITEM_QUERY}
        variables={{
          id: this.props.id
        }}
      >
        {({ data: { item } }, loading, error) => {
          return (
            <StyledItem>
              <Head>
                <title>Flex Fits | {item.title}</title>
              </Head>

              <div className="image">
                <img src={item.largeImage} alt={item.title} />
                <PriceTag>{formatMoney(item.price)}</PriceTag>
              </div>
              <div className="details">
                <h1 className="centered">{item.title}</h1>
                <AddToCart className="cart" itemId={item.id} />
                <div className="description grey">{item.description}</div>
              </div>
            </StyledItem>
          );
        }}
      </Query>
    );
  }
}

export default SingleItem;
