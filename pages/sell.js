import CreateItem from '../components/items/CreateItem';
import PleaseSignin from '../components/users/PleaseSignin';

const Sell = props => {
  return (
    <PleaseSignin>
      <CreateItem />
    </PleaseSignin>
  )
}

export default Sell;
