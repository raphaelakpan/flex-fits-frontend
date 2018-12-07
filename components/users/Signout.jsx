import { Mutation } from 'react-apollo';
import { CURRENT_USER_QUERY, SIGNOUT_MUTATION } from '../queries/users';

const Signout = props => (
  <Mutation
    mutation={SIGNOUT_MUTATION}
    refetchQueries={[
      { query: CURRENT_USER_QUERY }
    ]}
  >
  {(signout) => (
    <button onClick={signout}>Signout</button>
  )}
  </Mutation>
)

export default Signout;
