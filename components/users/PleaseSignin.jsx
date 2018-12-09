import User from '../users/User';
import Signin from '../users/Signin';
import Spinner from '../common/Spinner';

const PleaseSignin = props => {
  return (
    <User>
      {({ data: { currentUser }, loading }) => {
        if (loading) return <Spinner />
        if (!currentUser) return (
          <div>
            <h2 className="notice">Please Sign in before continuing...</h2>
            <Signin />
          </div>
        )
        return props.children;
      }}
    </User>
  )
}

export default PleaseSignin;
