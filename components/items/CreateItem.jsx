import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import formatMoney from '../../lib/formatMoney';
import Form from '../styles/Form';
import { CREATE_ITEM_MUTATION } from '../queries/CreateItem';
import ErrorMessage from '../common/ErrorMessage';
import Router from 'next/router';

class CreateItem extends Component {
  state = {
    title: 'Yoyo',
    description: 'Yo Yo Yo',
    image: 'yo.jpg',
    largeImage: 'big-yo.jpg',
    price: 1000,
  }

  handleChange = e => {
    const getValue = value => (type === 'number' ? parseFloat(value || 0) : value);

    const { name, type, value } = e.target;
    this.setState({ [name]: getValue(value) });
  }

  handleSubmit = async (e, createItem) => {
    e.preventDefault();
    const response = await createItem();
    Router.push({
      pathname: '/item',
      query: { id: response.data.createItem.id }
    })
  }

  render() {
    const { title, description, price } = this.state;
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state}>
        {(createItem, { loading, error }) => (
          <Form onSubmit={e => this.handleSubmit(e, createItem)}>
            <h2>Sell an Item</h2>
            {error && <ErrorMessage error={error} />}
            <fieldset disabled={loading} aria-busy={loading}>
              {loading && <div className="loading">
                <i className="fa fa-2x fa-sun"></i>
              </div>}
              <label htmlFor="title">
                Title
                <input
                  id="title"
                  type="text"
                  placeholder="Enter Title"
                  name="title"
                  value={title}
                  onChange={this.handleChange}
                  required
                  />
              </label>

              <label htmlFor="price">
                Price
                <input
                  id="price"
                  type="number"
                  placeholder="Enter Price"
                  name="price"
                  value={price}
                  onChange={this.handleChange}
                  required
                  />
              </label>

              <label htmlFor="description">
                Description
                <textarea
                  id="description"
                  placeholder="Enter Description"
                  name="description"
                  value={description}
                  onChange={this.handleChange}
                  required
                  />
              </label>

              <button type="submit">Submit</button>
            </fieldset>
          </Form>
        )}
      </Mutation>
    )
  }
}

export default CreateItem;
