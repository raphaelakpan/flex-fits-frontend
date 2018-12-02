import React, { Component } from 'react'
import { Query } from 'react-apollo';
import Head from 'next/head';
import { SINGLE_ITEM_QUERY } from '../queries/items';
import{ StyledItem } from '../styles/SingleItem';
import PriceTag from '../styles/PriceTag';

class SingleItem extends Component {
  render() {
    return (
      <Query query={SINGLE_ITEM_QUERY} variables={{
        id: this.props.id
      }}>
        {({ data: { item }}, loading, error) => {
          return (
            <StyledItem>
              <Head><title>Flex Fits | {item.title}</title></Head>

              <div className="image">
                <img src={item.largeImage} alt={item.title} />
                <PriceTag>$50</PriceTag>
              </div>
              <div className="details">
                <h2 className="center">Viewing <span className="title">{item.title}</span></h2>
              </div>
            </StyledItem>
          )
        }}
      </Query>
    )
  }
}

export default SingleItem;
