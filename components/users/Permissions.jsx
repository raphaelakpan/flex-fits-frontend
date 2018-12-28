import { Fragment } from 'react';
import { Query, Mutation } from 'react-apollo';
import PropTypes from 'prop-types';
import { ALL_USERS_QUERY, UPDATE_PERMISSIONS_MUTATION } from '../queries/users';
import ErrorMessage from '../common/ErrorMessage';
import Spinner from '../common/Spinner';
import StyledTable from '../styles/Table';

const PERMISSIONS = [
  'ADMIN',
  'USER',
  'ITEM_CREATE',
  'ITEM_UPDATE',
  'ITEM_DELETE',
];

const Permissions = () => (
  <Query fetchPolicy="network-only" query={ALL_USERS_QUERY}>
    {({ data: { users }, loading, error }) => {
      if (loading) return <Spinner />
      if (error) return <ErrorMessage error={error} />
      return (
        <div>
          <h2>Manage User Permissions</h2>
          <StyledTable>
            <thead>
              <tr>
                <th>NAME</th>
                <th>EMAIL</th>
                {PERMISSIONS.map((permission, index) =>
                  <th key={index}>{permission}</th>
                )}
              </tr>
            </thead>
            <tbody>
              {users.map(user =>
                <UserPermissions
                  user={user}
                  key={user.id}
                />
              )}
            </tbody>
          </StyledTable>
        </div>
      )
    }}
  </Query>
);

class UserPermissions extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      email: PropTypes.string,
      permissions: PropTypes.array,
    }).isRequired,
  }

  state = {
    permissions: this.props.user.permissions,
  }

  handlePermissionChange = (e, updatePermissions) => {
    const { checked, value } = e.target;
    let previousPermissions = [...this.state.permissions];
    let newPermissions = [...previousPermissions];
    if (checked) {
      newPermissions.push(value);
    } else {
      newPermissions = newPermissions.filter(permission => permission !== value);
    }
    this.setState({ permissions: newPermissions }, async () => {
      try { await updatePermissions() }
      catch { this.setState({ permissions: previousPermissions }) }
    });
  }

  render() {
    const { user } = this.props;

    return (
      <Mutation
        mutation={UPDATE_PERMISSIONS_MUTATION}
        variables={{
          permissions: this.state.permissions,
          userId: user.id,
        }}
      >
        {(updatePermissions, { loading, error }) => {
          return (
            <Fragment>
              {!loading && error && <tr><td className="error"><ErrorMessage error={error} /></td></tr>}
              <tr>
                <td>{user.name}</td>
                <td>{user.email}</td>
                {PERMISSIONS.map((permission, index) => (
                  <td key={index}>
                    <label htmlFor={`${user.id}-${permission}`}>
                      <input
                        type="checkbox"
                        id={`${user.id}-${permission}`}
                        checked={this.state.permissions.includes(permission)}
                        value={permission}
                        onChange={e => this.handlePermissionChange(e, updatePermissions)}
                      />
                    </label>
                  </td>
                ))}
                {loading && <td className="spinner"><Spinner /></td>}
              </tr>
            </Fragment>
          );
        }}
      </Mutation>
    )
  }
}

export default Permissions;
