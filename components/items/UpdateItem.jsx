import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import formatMoney from '../../lib/formatMoney';
import Form from '../styles/Form';
import { UPDATE_ITEM_MUTATION, SINGLE_ITEM_QUERY} from '../queries/items';
import ErrorMessage from '../common/ErrorMessage';
import Router from 'next/router';

class UpdateItem extends Component {
  state = { }

  handleChange = e => {
    const getValue = value => (type === 'number' && value ? parseFloat(value) : value);

    const { name, type, value } = e.target;
    this.setState({ [name]: getValue(value) });
  }

  handleUpdate = async (e, updateItem) => {
    e.preventDefault();
    const response = await updateItem({
      variables: {
        id: this.props.id,
        ...this.state,
      }
    });
    Router.push({
      pathname: '/item',
      query: { id: response.data.updateItem.id }
    });
  }

  static Loading() {
    return (
      <div className="loading">
        <i className="fa fa-2x fa-sun"></i>
      </div>
    );
  }

  render() {
    return (
      <Query query={SINGLE_ITEM_QUERY} variables={{
        id: this.props.id
      }}>
        {({ data: { item } }, loading) => {
          if (loading) return <UpdateItem.Loading />
          if (!item) return <h4>No Item found for ID: "{this.props.id}"</h4>
          return (
            <Mutation mutation={UPDATE_ITEM_MUTATION} variables={this.state}>
              {(updateItem, { loading, error }) => (
                <Form onSubmit={e => this.handleUpdate(e, updateItem)}>
                  <h2>Update Item</h2>
                  {error && <ErrorMessage error={error} />}
                  <fieldset disabled={loading} aria-busy={loading}>
                    {loading && <UpdateItem.Loading />   }

                    <label htmlFor="title">
                      Title
                      <input
                        id="title"
                        type="text"
                        placeholder="Enter Title"
                        name="title"
                        defaultValue={item.title}
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
                        defaultValue={item.price}
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
                        defaultValue={item.description}
                        onChange={this.handleChange}
                        required
                        rows="5"
                        />
                    </label>

                    <button type="submit">Sav{loading ? 'ing' : 'e' } Changes</button>
                  </fieldset>
                </Form>
              )}
            </Mutation>
          )
        }}
      </Query>
    )
  }
}

export default UpdateItem;
