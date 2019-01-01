import { StyledSpinner } from '../styles/Spinner';

const Spinner = ({ alt }) => {
  return (
    <StyledSpinner className="loading" alt={alt}>
      <i className="fa fa-2x fa-sun" />
    </StyledSpinner>
  );
};

export default Spinner;
