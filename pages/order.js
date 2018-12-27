import Order from '../components/orders/Order';
import PleaseSignin from '../components/users/PleaseSignin';

const OrderPage = props => {
  return (
    <PleaseSignin>
      <Order id={props.query.id} />
    </PleaseSignin>
  )
}

export default OrderPage;
