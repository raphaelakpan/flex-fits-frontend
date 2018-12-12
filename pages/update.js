import UpdateItem from '../components/items/UpdateItem';
import PleaseSignin from '../components/users/PleaseSignin';

const Update = ({ query }) => {
  return (
    <PleaseSignin>
      <UpdateItem id={query.id} />
    </PleaseSignin>
  )
}

export default Update;
