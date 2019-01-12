import { Mutation } from 'react-apollo';
import Router from 'next/router';
import { CURRENT_USER_QUERY, SIGNOUT_MUTATION } from '../queries/users';
import toastr from '../../lib/toastr';

const handleSignout = signout => {
  signout();
  toastr.warning('You have signed out');
  Router.push('/');
};

const Signout = () => (
  <Mutation
    mutation={SIGNOUT_MUTATION}
    refetchQueries={[{ query: CURRENT_USER_QUERY }]}
  >
    {signout => <button onClick={() => handleSignout(signout)}>Signout</button>}
  </Mutation>
);

export default Signout;
