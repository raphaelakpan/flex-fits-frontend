import ResetPassword from '../components/users/ResetPassword';

const ResetPasswordPage = props => {
  return (
    <ResetPassword resetToken={props.query.resetToken} />
  );
}

export default ResetPasswordPage;
