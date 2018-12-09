import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import Form from '../styles/Form';
import { SIGNUP_MUTATION, CURRENT_USER_QUERY } from '../queries/users';
import Spinner from '../common/Spinner';
import { Center } from '../styles';
import ErrorMessage from '../common/ErrorMessage';

class Signup extends Component {
  state = {
    name: '',
    email: '',
    password: ''
  }

  handleInput = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = async (e, signup) => {
    e.preventDefault();
    try {
      await signup();
      this.resetState();
    } catch { }
  }

  resetState = () => {
    this.setState({
      email: '',
      password: '',
      name: '',
    });
  }

  render() {
    const { name, email, password } = this.state;

    return (
      <Mutation
        mutation={SIGNUP_MUTATION}
        variables={this.state}
        refetchQueries={[
          { query: CURRENT_USER_QUERY }
        ]}
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
              <button>Sign up</button>
            </fieldset>
          </Form>
        );
      }}
      </Mutation>
    )
  }
}

export default Signup;
