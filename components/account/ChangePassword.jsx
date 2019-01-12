import { Component } from 'react';
import { StyledAccountForm } from '../styles/Account';
import { Mutation } from 'react-apollo';
import Button from '../styles/Button';
import Spinner from '../common/Spinner';
import ErrorMessage from '../common/ErrorMessage';
import { UPDATE_USER_MUTATION } from '../queries/users';
import toastr from '../../lib/toastr';

class ChangePassword extends Component {
  state = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    passwordMatchError: false,
  };

  handleInput = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (e, updateUser) => {
    e.preventDefault();
    this.setState({ passwordMatchError: false });
    const { newPassword, confirmPassword } = this.state;
    if (newPassword !== confirmPassword)
      return this.setState({ passwordMatchError: true });
    await updateUser();
    this.resetState();
    toastr.success('Password succesfully updated');
  };

  resetState = () => {
    this.setState({
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      passwordMatchError: false,
    });
  };

  render() {
    const {
      currentPassword,
      newPassword,
      confirmPassword,
      passwordMatchError,
    } = this.state;

    return (
      <Mutation mutation={UPDATE_USER_MUTATION} variables={this.state}>
        {(updateUser, { loading, error }) => (
          <div>
            <h2>Change your Password</h2>
            <StyledAccountForm onSubmit={e => this.handleSubmit(e, updateUser)}>
              {loading && <Spinner />}
              {error && <ErrorMessage error={error} />}
              {passwordMatchError && (
                <ErrorMessage>New passwords not not match</ErrorMessage>
              )}
              <fieldset disabled={loading}>
                <label htmlFor="Password">
                  <div>Current Password:</div>
                  <input
                    type="password"
                    name="currentPassword"
                    id="Password"
                    placeholder="Enter your current Password"
                    value={currentPassword}
                    onChange={this.handleInput}
                    required
                  />
                </label>
                <label htmlFor="NewPassword">
                  <div>New Password:</div>
                  <input
                    type="password"
                    name="newPassword"
                    id="NewPassword"
                    placeholder="Enter your new Password"
                    value={newPassword}
                    onChange={this.handleInput}
                    required
                  />
                </label>
                <label htmlFor="NewPassword">
                  <div>Confirm Password:</div>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="ConfirmPassword"
                    placeholder="Confirm your new Password"
                    value={confirmPassword}
                    onChange={this.handleInput}
                    required
                  />
                </label>
                <Button>Update Password</Button>
              </fieldset>
            </StyledAccountForm>
          </div>
        )}
      </Mutation>
    );
  }
}

export default ChangePassword;
