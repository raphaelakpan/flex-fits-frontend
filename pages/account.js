import Account from '../components/account/Account';
import PleaseSignin from '../components/users/PleaseSignin';

const AccountPage = () => (
  <PleaseSignin>
    <Account />
  </PleaseSignin>
);

export default AccountPage;
