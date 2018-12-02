import React, { Component } from 'react';
import { Mutation, Query } from 'react-apollo';
import Router from 'next/router';
import formatMoney from '../../lib/formatMoney';
import Form from '../styles/Form';
import { UPDATE_ITEM_MUTATION, SINGLE_ITEM_QUERY} from '../queries/items';
import ErrorMessage from '../common/ErrorMessage';
import Spinner from '../common/Spinner';

class UpdateItem extends Component {
  state = {
    item: { },
    uploading: false
  }

  handleChange = e => {
    const getValue = value => (type === 'number' && value ? parseFloat(value) : value);

    const { name, type, value } = e.target;
    this.setState({
      item: {
        ...this.state.item,
        [name]: getValue(value)
      }
    });
  }

  handleFileUpload = async e => {
    const { files } = e.target;
    if (files.length < 1) {
      return this.setState({
        item: {
          ...this.state.item,
          image: "",
          largeImage: "",
        }
      });
    };

    this.toggleUploading();
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'flexfits');

    const response = await fetch('https://api.cloudinary.com/v1_1/raphaelakpan/image/upload', {
      method: 'POST',
      body: data
    });

    const file = await response.json();
    this.setState({
      item: {
        ...this.state.item,
        image: file.secure_url,
        largeImage: file.eager[0].secure_url,
      },
    }, this.toggleUploading);
  }

  handleUpdate = async (e, updateItem) => {
    e.preventDefault();
    const response = await updateItem({
      variables: {
        id: this.props.id,
        ...this.state.item,
      }
    });
    Router.push({
      pathname: '/item',
      query: { id: response.data.updateItem.id }
    });
  }

  toggleUploading = () => {
    this.setState(({ uploading }) => ({ uploading: !uploading }));
  }

  render() {
    const { uploading, item } = this.state;
    const { image } = item;

    return (
      <Query query={SINGLE_ITEM_QUERY} variables={{
        id: this.props.id
      }}>
        {({ data: { item } }, loading) => {
          if (loading) return <Spinner />
          if (!item) return <h4>No Item found for ID: "{this.props.id}"</h4>
          return (
            <Mutation mutation={UPDATE_ITEM_MUTATION}>
              {(updateItem, { loading, error }) => (
                <Form onSubmit={e => this.handleUpdate(e, updateItem)}>
                  <h2>Update Item</h2>
                  {error && <ErrorMessage error={error} />}
                  <fieldset disabled={loading} aria-busy={loading}>
                    {(loading || uploading) && <Spinner />   }

                    <label htmlFor="file">
                      Image
                      <input
                        id="file"
                        type="file"
                        placeholder="Upload an Image"
                        name="file"
                        accept="image/*"
                        onChange={this.handleFileUpload}
                        />
                      {(image || item.image) && <img className="preview" src={image || item.image} alt="Image Preview"/>}
                    </label>

                    <label htmlFor="title">
                      Title
                      <input
                        id="title"
                        type="text"
                        placeholder="Enter Title"
                        name="title"
                        defaultValue={item.title}
                        onChange={this.handleChange}
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
