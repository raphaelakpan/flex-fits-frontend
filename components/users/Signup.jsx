import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import Form from '../styles/Form';
import { SIGNUP_MUTATION, CURRENT_USER_QUERY } from '../queries/users';
import Spinner from '../common/Spinner';
import { Center } from '../styles';

class Signup extends Component {
  state = {
    user: {
      name: '',
      email: '',
      password: ''
    },
    error: {},
  }

  handleInput = e => {
    const { name, value } = e.target;
    this.setState({
      user: {
        ...this.state.user,
        [name]: value
      }
    });
  }

  handleSubmit = async (e, signup) => {
    e.preventDefault();
    this.resetError();
    try {
      await signup();
      this.resetUser();
    } catch(error) {
      this.handleError(error.message);
    }
  }

  handleError = errorMessage => {
    if (
      errorMessage.match(/unique constraint would be violated on User. Details: Field name = email/)
    ) {
      this.setState({
        error: {
          ...this.state.error,
          email: 'Email has already been registered',
        }
      })
    }
  }

  resetError = () => {
    this.setState({ error: {} });
  }

  resetUser = () => {
    this.setState({
      user: {
        email: '',
        password: '',
        name: '',
      },
    });
  }

  render() {
    const { name, email, password } = this.state.user;
    const { error } = this.state;

    return (
      <Mutation
        mutation={SIGNUP_MUTATION}
        variables={this.state.user}
        refetchQueries={[
          { query: CURRENT_USER_QUERY }
        ]}
      >
      {(signup, { loading }) => {
        return (
          <Form method="post" onSubmit={e => this.handleSubmit(e, signup)}>
            <Center>
              <h2>Signup for a free account!</h2>
            </Center>
            {loading && <Spinner />}
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
                {error.email &&
                  <div className="error">{error.email}</div>
                }
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
