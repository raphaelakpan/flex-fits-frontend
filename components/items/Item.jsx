import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import StyledItem from '../styles/Item';
import Title from '../styles/Title';
import PriceTag from '../styles/PriceTag';
import formatMoney from '../../lib/formatMoney';
import DeleteItem from './DeleteItem';

class Item extends Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  }

  render() {
    const { item } = this.props;

    return (
      <div>
        <StyledItem>
          {item.image && <img src={item.image} alt={item.Title} /> }
          <Title>
            <Link href={{
              pathname: "/items",
              query: { id: item.id }
            }}>
              <a>{item.title}</a>
            </Link>
          </Title>
          <PriceTag>{formatMoney(item.price)}</PriceTag>
          <p>{item.description}</p>
          <div className="buttonList">
            <Link href={{
              pathname: "/update",
              query: { id: item.id }
            }}>
              <a>Edit &nbsp; <i className="fas fa-edit"></i></a>
            </Link>
            <button>Add to Cart &nbsp; <i className="fas fa-plus"></i></button>
            <DeleteItem id={item.id}>
              Delete &nbsp; <i className="fas fa-trash"></i>
            </DeleteItem>
          </div>
        </StyledItem>
      </div>
    )
  }
}

export default Item;
