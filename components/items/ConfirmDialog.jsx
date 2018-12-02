import { StyledDialogContainer } from '../styles/ConfirmDialog';
import Spinner from '../common/Spinner';

const ConfirmDialog = ({ children, loading, toggleDialog, handleAction}) => (
  <StyledDialogContainer>
    <div className="dialog">
      <div className="message">
        {children}
      </div>
      {loading && <Spinner />}
      <div className="actions">
        <button className="cancel" onClick={toggleDialog}>Cancel</button>
        <button className="yes" onClick={handleAction}>Yes</button>
      </div>
    </div>
  </StyledDialogContainer>
);

export default ConfirmDialog;
