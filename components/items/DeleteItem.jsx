import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import Router from 'next/router';
import ConfirmDialog from './ConfirmDialog';
import { DELETE_ITEM_MUTATION } from '../queries/items';


const StyledContainer = styled.div`
  display: grid;
  padding: 0 !important;
`;

class DeleteItem extends Component {
  state = {
    showDialog: false,
  }

  toggleDialog = () => {
    this.setState(({ showDialog }) => ({
      showDialog: !showDialog
    }));
  }

  handleUpdate = (cache, payload) => {
    /** This is to reload the page and refetch current items from the server.
     * Removing an item from the cache leaves a hole on the page (due to pagination)
     * When there are items to replace it.
    */
    Router.push({ pathname: '/items' });
    /** Manually update the cache on the client to match server
     * Hopefully would be relevant in the future
    */
    // const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
    // data.items = data.items.filter(item => item.id !== payload.data.deleteItem.id);
    // cache.writeQuery({ query: ALL_ITEMS_QUERY, data });
  }

  render() {
    const { showDialog } = this.state;
    const { id } = this.props;

    return (
      <Mutation
        mutation={DELETE_ITEM_MUTATION}
        variables={{ id }}
        update={this.handleUpdate}
      >
        {(deleteItem, { loading, error }) => {
          return (
            <StyledContainer>
              {showDialog && (
                <ConfirmDialog
                toggleDialog={this.toggleDialog}
                handleAction={deleteItem}
                loading={loading}
                >
                  Are you sure you want to delete this?
                </ConfirmDialog>
              )}

              <button onClick={this.toggleDialog}>
                {this.props.children}
              </button>
            </StyledContainer>
          );
        }}
      </Mutation>
    )
  }
}

export default DeleteItem;
