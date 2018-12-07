import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import Form from '../styles/Form';
import { SIGN_IN_MUTATION, CURRENT_USER_QUERY } from '../queries/users';
import Spinner from '../common/Spinner';
import { Center } from '../styles';

class Signin extends Component {
  state = {
    user: {
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
        [name]: value,
      }
    });
  }

  handleSubmit = async (e, signin) => {
    e.preventDefault();
    this.resetError();
    try {
      await signin();
      this.resetUser();
    } catch(error) {
      this.handleError(error.message);
    }
  }

  handleError = errorMessage => {
    if (
      errorMessage.match(/Invalid Password!/)
    ) {
      this.setState({
        error: {
          ...this.state.error,
          password: 'Password is invalid!',
        }
      })
    }

    if (
      errorMessage.match(/Email does not exist/)
    ) {
      this.setState({
        error: {
          ...this.state.error,
          email: 'Email was not found!',
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
      },
    });
  }

  render() {
    const { email, password } = this.state.user;
    const { error } = this.state;

    return (
      <Mutation
        mutation={SIGN_IN_MUTATION}
        variables={this.state.user}
        refetchQueries={[
          { query: CURRENT_USER_QUERY }
        ]}
      >
      {(signin, { loading }) => {
        return (
          <Form method="post" onSubmit={e => this.handleSubmit(e, signin)}>
            <Center>
              <h2>Sign into your account</h2>
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
                {error.password &&
                  <div className="error">{error.password}</div>
                }
              </label>
              <button>Sign in</button>
            </fieldset>
          </Form>
        );
      }}
      </Mutation>
    )
  }
}

export default Signin;
