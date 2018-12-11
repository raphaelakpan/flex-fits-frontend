import Permissions from '../components/users/Permissions';
import PleaseSignin from '../components/users/PleaseSignin';

const PermissionsPage = () => {
  return (
    <PleaseSignin>
      <Permissions />
    </PleaseSignin>
  )
}

export default PermissionsPage;
