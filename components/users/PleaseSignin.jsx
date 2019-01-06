import CurrentUser from '../users/CurrentUser';
import Signin from '../users/Signin';
import Spinner from '../common/Spinner';
import ErrorMessage from '../common/ErrorMessage';
import { StyledContainer } from '../styles/Page';

const PleaseSignin = props => {
  return (
    <CurrentUser>
      {({ currentUser, loading, error }) => {
        if (loading) return <Spinner />;
        if (error) return <ErrorMessage error={error} />;
        if (!currentUser)
          return (
            <div>
              <StyledContainer>
                <p className="notice">Please Sign in before continuing...</p>
              </StyledContainer>
              <Signin noRedirectOnSignin />
            </div>
          );
        return props.children;
      }}
    </CurrentUser>
  );
};

export default PleaseSignin;
