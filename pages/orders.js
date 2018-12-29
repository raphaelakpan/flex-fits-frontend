import Orders from '../components/orders/Orders';
import PleaseSignin from '../components/users/PleaseSignin';

const OrdersPage = props => {
  return (
    <PleaseSignin>
      <Orders page={parseInt(props.query.page) || 1} />
    </PleaseSignin>
  )
}

export default OrdersPage;
