import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import StyledItem from '../styles/Item';
import Title from '../styles/Title';
import PriceTag from '../styles/PriceTag';
import formatMoney from '../../lib/formatMoney';
import DeleteItem from './DeleteItem';
import CurrentUser from '../users/CurrentUser';

class Item extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  }

  render() {
    const { item, page } = this.props;

    return (
      <CurrentUser>
        {({ currentUser, isAdmin }) => {
          const isOwner = currentUser && (item.user.id === currentUser.id);

          return (
            <StyledItem>
              {item.image && <img src={item.image} alt={item.Title} /> }
              <Title>
                <Link href={{
                  pathname: "/item",
                  query: { id: item.id }
                }}>
                  <a>{item.title}</a>
                </Link>
              </Title>
              <PriceTag>{formatMoney(item.price)}</PriceTag>
              <p>{item.description}</p>
              <div className="buttonList">
                {(isOwner || isAdmin) && (
                  <Link href={{
                    pathname: "/update",
                    query: { id: item.id }
                  }}>
                    <a>Edit &nbsp; <i className="fas fa-edit"></i></a>
                  </Link>
                )}
                <button>Add to Cart &nbsp; <i className="fas fa-plus"></i></button>
                {(isOwner || isAdmin) && (
                  <DeleteItem
                    id={item.id}
                    page={page}
                  >
                    Delete &nbsp; <i className="fas fa-trash"></i>
                  </DeleteItem>
                )}
              </div>
            </StyledItem>
          );
        }}
      </CurrentUser>
    )
  }
}

export default Item;
