import { Query } from 'react-apollo';
import PropTypes from 'prop-types';
import { CURRENT_USER_QUERY } from '../queries/users';

const CurrentUser = props => (
  <Query {...props} query={CURRENT_USER_QUERY}>
    {({ data: { currentUser }, loading, error  }) => {
      const isAdmin = currentUser && currentUser.permissions.includes("ADMIN");
      return props.children({ currentUser, isAdmin, loading, error });
    }}
  </Query>
);

CurrentUser.propTypes = {
  children: PropTypes.func.isRequired,
}

export default CurrentUser;
