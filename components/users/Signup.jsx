import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import toastr from '../../lib/toastr';
import Form from '../styles/Form';
import { SIGNUP_MUTATION, CURRENT_USER_QUERY } from '../queries/users';
import Spinner from '../common/Spinner';
import { Center } from '../styles';
import ErrorMessage from '../common/ErrorMessage';

class Signup extends Component {
  state = {
    user: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    passwordMatchError: false,
  };

  handleInput = e => {
    const { name, value } = e.target;
    this.setState({
      user: {
        ...this.state.user,
        [name]: value,
      },
    });
  };

  handleSubmit = async (e, signup) => {
    e.preventDefault();
    const { password, confirmPassword } = this.state.user;
    if (password !== confirmPassword) {
      return this.setState({ passwordMatchError: true });
    }
    this.setState({ passwordMatchError: false });
    try {
      await signup();
      this.resetState();
      toastr.success('Account created successfully!');
      Router.push('/');
    } catch {}
  };

  resetState = () => {
    this.setState({
      user: {
        email: '',
        password: '',
        name: '',
        confirmPassword: '',
      },
    });
  };

  render() {
    const { name, email, password, confirmPassword } = this.state.user;

    return (
      <Mutation
        mutation={SIGNUP_MUTATION}
        variables={this.state.user}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {(signup, { loading, error }) => {
          return (
            <Form method="post" onSubmit={e => this.handleSubmit(e, signup)}>
              <Center>
                <h2>Signup for a free account!</h2>
              </Center>
              {loading && <Spinner />}
              {error && <ErrorMessage error={error} />}
              <fieldset disabled={loading} aria-busy={loading}>
                <label htmlFor="name">
                  Name
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    placeholder="Enter your name"
                    onChange={this.handleInput}
                    required
                  />
                </label>
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
                  {this.state.passwordMatchError && (
                    <div className="error">Passwords do not match!</div>
                  )}
                </label>
                <label htmlFor="confirmPassword">
                  Confirm Password
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={confirmPassword}
                    placeholder="Confirm your password"
                    onChange={this.handleInput}
                    required
                  />
                  {this.state.passwordMatchError && (
                    <div className="error">Passwords do not match!</div>
                  )}
                </label>
                <button>Sign up</button>
              </fieldset>
            </Form>
          );
        }}
      </Mutation>
    );
  }
}

export default Signup;
