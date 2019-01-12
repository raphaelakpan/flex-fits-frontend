import { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import Button from '../styles/Button';
import { StyledAccountForm } from '../styles/Account';
import Spinner from '../common/Spinner';
import ErrorMessage from '../common/ErrorMessage';
import { CURRENT_USER_QUERY, UPDATE_USER_MUTATION } from '../queries/users';
import toastr from '../../lib/toastr';

class DisplayInfo extends Component {
  state = { name: '' };

  handleChange = e => {
    this.setState({ name: e.target.value });
  };

  handleSubmit = async (e, updateUser) => {
    e.preventDefault();
    await updateUser();
    toastr.success('Name updated successfully');
  };

  render() {
    const { currentUser } = this.props;
    const { name } = this.state;

    return (
      <div>
        <h2>My Display Info</h2>
        <Mutation
          mutation={UPDATE_USER_MUTATION}
          variables={this.state}
          refetchQueries={[{ query: CURRENT_USER_QUERY }]}
        >
          {(updateUser, { loading, error }) => {
            return (
              <StyledAccountForm
                onSubmit={e => this.handleSubmit(e, updateUser)}
              >
                {loading && <Spinner />}
                {error && <ErrorMessage error={error} />}

                <fieldset disabled={loading}>
                  <label htmlFor="name">
                    <div>Name:</div>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter your name"
                      onChange={this.handleChange}
                      value={name || currentUser.name}
                    />
                  </label>
                  <label htmlFor="email">
                    <div>Email:</div>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      defaultValue={currentUser.email}
                      disabled
                    />
                  </label>
                  <Button disabled={!name || name === currentUser.name}>
                    Update Info
                  </Button>
                </fieldset>
              </StyledAccountForm>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

DisplayInfo.propTypes = {
  currentUser: PropTypes.object.isRequired,
};

export default DisplayInfo;
