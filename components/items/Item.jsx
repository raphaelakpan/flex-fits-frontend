import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import Router from 'next/router';
import StyledItem from '../styles/Item';
import Title from '../styles/Title';
import PriceTag from '../styles/PriceTag';
import formatMoney from '../../lib/formatMoney';
import DeleteItem from './DeleteItem';
import CurrentUser from '../users/CurrentUser';
import AddToCart from '../cart/AddToCart';

class Item extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  };

  render() {
    const { item, page } = this.props;

    return (
      <CurrentUser>
        {({ currentUser, isAdmin }) => {
          const isOwner = currentUser && item.user.id === currentUser.id;

          return (
            <StyledItem>
              {item.image && (
                <img
                  src={item.image}
                  alt={item.Title}
                  onClick={() => {
                    Router.push({
                      pathname: '/item',
                      query: { id: item.id },
                    });
                  }}
                />
              )}
              <Title>
                <Link
                  href={{
                    pathname: '/item',
                    query: { id: item.id },
                  }}
                >
                  <a>{item.title}</a>
                </Link>
              </Title>
              <PriceTag>{formatMoney(item.price)}</PriceTag>
              <p className="item_description">
                {item.description.length <= 50
                  ? item.description
                  : item.description.substr(0, 50) + '...'}
              </p>
              <small className="item_soldby">
                Seller: <em className="grey">{item.user.name}</em>
              </small>
              {currentUser && (
                <div className="buttonList">
                  {(isOwner || isAdmin) && (
                    <Link
                      href={{
                        pathname: '/update',
                        query: { id: item.id },
                      }}
                    >
                      <a>
                        Edit &nbsp; <i className="fas fa-edit" />
                      </a>
                    </Link>
                  )}
                  <AddToCart itemId={item.id} custom />
                  {(isOwner || isAdmin) && (
                    <DeleteItem id={item.id} page={page}>
                      Delete &nbsp; <i className="fas fa-trash" />
                    </DeleteItem>
                  )}
                </div>
              )}
            </StyledItem>
          );
        }}
      </CurrentUser>
    );
  }
}

export default Item;
