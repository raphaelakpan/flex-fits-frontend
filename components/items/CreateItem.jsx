import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import formatMoney from '../../lib/formatMoney';
import Form from '../styles/Form';
import { CREATE_ITEM_MUTATION } from '../queries/items';
import ErrorMessage from '../common/ErrorMessage';
import Spinner from '../common/Spinner';

class CreateItem extends Component {
  state = {
    item: {
      title: '',
      description: '',
      image: '',
      largeImage: '',
      price: 0,
    },
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

  handleSubmit = async (e, createItem) => {
    e.preventDefault();
    const response = await createItem();
    Router.push({
      pathname: '/item',
      query: { id: response.data.createItem.id }
    })
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
      }
    }, this.toggleUploading);
  }

  toggleUploading = () => {
    this.setState(({ uploading }) => ({ uploading: !uploading }));
  }

  render() {
    const { uploading, item } = this.state;
    const { title, description, price, image } = item;
    return (
      <Mutation mutation={CREATE_ITEM_MUTATION} variables={this.state.item}>
        {(createItem, { loading, error }) => (
          <Form onSubmit={e => this.handleSubmit(e, createItem)}>
            <h2>Sell an Item</h2>
            {error && <ErrorMessage error={error} />}
            <fieldset disabled={loading} aria-busy={loading}>
              {(loading || uploading) && <Spinner /> }
              <label htmlFor="file">
                Image
                <input
                  id="file"
                  type="file"
                  placeholder="Upload an Image"
                  name="file"
                  accept="image/*"
                  onChange={this.handleFileUpload}
                  required
                  />
                {image && <img className="preview" src={image} alt="Image Preview"/> }
              </label>

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
                  rows="5"
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
