import CurrentUser from '../users/CurrentUser';
import Signin from '../users/Signin';
import Spinner from '../common/Spinner';
import ErrorMessage from '../common/ErrorMessage';

const PleaseSignin = props => {
  return (
    <CurrentUser>
      {({ currentUser, loading, error }) => {
        if (loading) return <Spinner />
        if (error) return <ErrorMessage error={error} />
        if (!currentUser) return (
          <div>
            <p className="notice">Please Sign in before continuing...</p>
            <Signin />
          </div>
        )
        return props.children;
      }}
    </CurrentUser>
  )
}

export default PleaseSignin;
