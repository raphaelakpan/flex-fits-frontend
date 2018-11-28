import React from 'react';
import PropTypes from 'prop-types';
import { StyledError } from '../styles/ErrorMessage';

const ErrorMessage = ({ error }) => {
  if (!error || !error.message) return null;
  if (error.networkError && error.networkError.result && error.networkError.result.errors.length) {
    return error.networkError.result.errors.map((error, i) => (
      <StyledError key={i}>
        <p data-test="graphql-error">
          <strong>Shoot!</strong>
          {error.message.replace('GraphQL error: ', '')}
        </p>
      </StyledError>
    ));
  }
  return (
    <StyledError>
      <p data-test="graphql-error">
        <strong>Shoot!</strong>
        {error.message.replace('GraphQL error: ', '')}
      </p>
    </StyledError>
  );
};

ErrorMessage.defaultProps = {
  error: {},
};

ErrorMessage.propTypes = {
  error: PropTypes.object,
};

export default ErrorMessage;
