import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import styled from 'styled-components';
import ConfirmDialog from './ConfirmDialog';
import { DELETE_ITEM_MUTATION, ALL_ITEMS_QUERY } from '../queries/items';


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

  // Manually update the cache on the client to match server
  handleUpdate = (cache, payload) => {
    const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
    data.items = data.items.filter(item => item.id !== payload.data.deleteItem.id);
    cache.writeQuery({ query: ALL_ITEMS_QUERY, data });
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
