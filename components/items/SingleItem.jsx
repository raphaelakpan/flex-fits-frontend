import React, { Component } from 'react';
import { Query } from 'react-apollo';
import Head from 'next/head';
import { SINGLE_ITEM_QUERY } from '../queries/items';
import { StyledItem } from '../styles/SingleItem';
import PriceTag from '../styles/PriceTag';
import formatMoney from '../../lib/formatMoney';
import AddToCart from '../cart/AddToCart';
import CurrentUser from '../users/CurrentUser';
import Spinner from '../common/Spinner';
import { StyledContainer } from '../styles/Page';

class SingleItem extends Component {
  render() {
    return (
      <CurrentUser>
        {({ currentUser }) => (
          <Query
            query={SINGLE_ITEM_QUERY}
            variables={{
              id: this.props.id,
            }}
          >
            {({ data: { item } }, loading) => {
              if (loading) return <Spinner />;
              if (!item) {
                return (
                  <StyledContainer>
                    No Item was found for ID: <strong>{this.props.id}</strong>
                  </StyledContainer>
                );
              }

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
                    <h1 className="centered title">{item.title}</h1>
                    {currentUser && <AddToCart itemId={item.id} />}
                    <div className="description grey">{item.description}</div>
                  </div>
                </StyledItem>
              );
            }}
          </Query>
        )}
      </CurrentUser>
    );
  }
}

export default SingleItem;
