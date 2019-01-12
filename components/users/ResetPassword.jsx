import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import Form from '../styles/Form';
import { RESET_PASSWORD_MUTATION, CURRENT_USER_QUERY } from '../queries/users';
import Spinner from '../common/Spinner';
import { Center } from '../styles';
import ErrorMessage from '../common/ErrorMessage';
import toastr from '../../lib/toastr';

class ForgotPassword extends Component {
  state = {
    password: '',
    confirmPassword: '',
  };

  handleInput = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (e, resetPassword) => {
    e.preventDefault();
    await resetPassword({
      variables: {
        ...this.state.user,
        resetToken: this.props.resetToken,
      },
    });
    this.resetState();
    toastr.success('Your password has been successfully reset');
    Router.push('/');
  };

  resetState = () => {
    this.setState({
      password: '',
      confirmPassword: '',
    });
  };

  render() {
    const { password, confirmPassword } = this.state;

    return (
      <Mutation
        mutation={RESET_PASSWORD_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(resetPassword, { loading, error, called }) => {
          if (!this.props.resetToken) return null;

          return (
            <Form
              method="post"
              onSubmit={e => this.handleSubmit(e, resetPassword)}
            >
              <Center>
                <h2>Reset your password</h2>
              </Center>
              {loading && <Spinner />}
              {error && <ErrorMessage error={error} />}
              <fieldset disabled={loading} aria-busy={loading}>
                <label htmlFor="password">
                  New Password
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    placeholder="Enter your new Password"
                    onChange={this.handleInput}
                    required
                  />
                </label>

                <label htmlFor="confirmPassword">
                  Confirm new Password
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={confirmPassword}
                    placeholder="Confirm new Password"
                    onChange={this.handleInput}
                    required
                  />
                </label>

                <button type="submit">Submit</button>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default ForgotPassword;
