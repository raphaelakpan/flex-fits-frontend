import Orders from '../components/orders/Orders';
import PleaseSignin from '../components/users/PleaseSignin';

const OrdersPage = props => {
  return (
    <PleaseSignin>
      <Orders />
    </PleaseSignin>
  )
}

export default OrdersPage;
