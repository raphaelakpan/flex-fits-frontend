import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import Link from 'next/link';
import Router from 'next/router';
import toastr from '../../lib/toastr';
import Form from '../styles/Form';
import { SIGN_IN_MUTATION, CURRENT_USER_QUERY } from '../queries/users';
import Spinner from '../common/Spinner';
import { Center } from '../styles';
import ErrorMessage from '../common/ErrorMessage';

class Signin extends Component {
  state = {
    email: '',
    password: '',
  };

  handleInput = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (e, signin, redirectOnSignin) => {
    e.preventDefault();
    try {
      await signin();
      this.resetState();
      toastr.success('Logged in successfully!');
      if (redirectOnSignin) Router.push('/');
    } catch {}
  };

  resetState = () => {
    this.setState({
      email: '',
      password: '',
    });
  };

  render() {
    const { email, password } = this.state;

    return (
      <Mutation
        mutation={SIGN_IN_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signin, { loading, error }) => {
          return (
            <Form
              method="post"
              onSubmit={e =>
                this.handleSubmit(e, signin, !this.props.noRedirectOnSignin)
              }
            >
              <Center>
                <h2>Sign into your account</h2>
              </Center>
              {loading && <Spinner />}
              {error && <ErrorMessage error={error} />}
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
                <label htmlFor="password">
                  Password
                  <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    placeholder="Enter your password"
                    onChange={this.handleInput}
                    required
                  />
                </label>
                <div className="options">
                  <button>Sign in</button>
                  <Link href="/forgot_password">
                    <a>Forgot Password?</a>
                  </Link>
                </div>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default Signin;
