import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import Link from 'next/link';
import Form from '../styles/Form';
import { REQUEST_PASSWORD_RESET_MUTATION } from '../queries/users';
import Spinner from '../common/Spinner';
import { Center } from '../styles';
import ErrorMessage from '../common/ErrorMessage';

class ForgotPassword extends Component {
  state = {
    email: '',
  }

  handleInput = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = async (e, requestPasswordReset) => {
    e.preventDefault();
    try {
      await requestPasswordReset();
      this.resetState();
    } catch { }
  }

  resetState = () => {
    this.setState({ email: '' });
  }

  render() {
    const { email } = this.state;

    return (
      <Mutation
        mutation={REQUEST_PASSWORD_RESET_MUTATION}
        variables={this.state}
      >
      {(requestPasswordReset, { loading, error, called }) => {
        return (
          <Form method="post" onSubmit={e => this.handleSubmit(e, requestPasswordReset)}>
            <Center>
              <h2>Request password reset</h2>
            </Center>
            {loading && <Spinner />}
            {!loading && !error && called && (
              <p className="success"> Check your email address for instructions to reset your Password </p>
            )}
            {error && <ErrorMessage error={error}/>}
            <fieldset disabled={loading} aria-busy={loading}>
              <label htmlFor="email">
                Email
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  placeholder="Enter your email"
                  onChange={this.handleInput}
                  required
                />
              </label>

              <div className="options">
                <button type="submit">Reset Password</button>
                <Link href="/signin">
                  <a>Sign in</a>
                </Link>
              </div>
            </fieldset>
          </Form>
        );
      }}
      </Mutation>
    )
  }
}

export default ForgotPassword;
