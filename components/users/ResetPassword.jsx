import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import Form from '../styles/Form';
import { RESET_PASSWORD_MUTATION, CURRENT_USER_QUERY } from '../queries/users';
import Spinner from '../common/Spinner';
import { Center } from '../styles';

class ForgotPassword extends Component {
  state = {
    user: {
      password: '',
      confirmPassword: ''
    },
    errors: {},
  }

  handleInput = e => {
    const { name, value } = e.target;
    this.setState({
      user: {
        ...this.state.user,
        [name]: value,
      }
    });
  }

  handleSubmit = async (e, resetPassword) => {
    e.preventDefault();
    if (!this.validPasswords()) return;
    this.resetError();
    try {
      await resetPassword({
        variables: {
          ...this.state.user,
          resetToken: this.props.resetToken,
        }
      });
      this.resetUser();
    } catch(error) {
      this.handleError(error.message);
    }
  }

  validPasswords = () => {
    const { password, confirmPassword } = this.state.user;
    if (password !== confirmPassword) {
      this.setState({
        errors: {
          password: "Passwords do not match!"
        }
      });
      return false
    }
    return true;
  }

  handleError = errorMessage => {
    if (
      errorMessage.match(/Invalid or expired token/)
    ) {
      this.setState({
        errors: {
          message: 'Invalid or expired token. Please reset your password token again',
        }
      });
    }
  }

  resetError = () => {
    this.setState({ errors: {} });
  }

  resetUser = () => {
    this.setState({
      user: {
        password: '',
        confirmPassword: ''
      },
    });
  }

  render() {
    const { password, confirmPassword } = this.state.user;
    const { errors } = this.state;

    return (
      <Mutation
        mutation={RESET_PASSWORD_MUTATION}
        variables={this.state.user}
        refetchQueries={[
          { query: CURRENT_USER_QUERY}
        ]}
      >
      {(resetPassword, { loading, error, called }) => {
        if (!this.props.resetToken) return null;

        return (
          <Form method="post" onSubmit={e => this.handleSubmit(e, resetPassword)}>
            <Center>
              <h2>Reset your password</h2>
            </Center>
            {loading && <Spinner />}
            {!loading && !error && called && (
              <p className="success"> Your Password has been successfully reset </p>
            )}
            {errors.message && (
              <p className="error">{errors.message}</p>
            )}
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
                {errors.password &&
                  <div className="error">{errors.password}</div>
                }
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
                {errors.confirmPassword &&
                  <div className="error">{errors.confirmPassword}</div>
                }
              </label>

              <button type="submit">Submit</button>
            </fieldset>
          </Form>
        );
      }}
      </Mutation>
    )
  }
}

export default ForgotPassword;
