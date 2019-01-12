import React from 'react';
import PropTypes from 'prop-types';
import { StyledError } from '../styles/ErrorMessage';

const ErrorMessage = ({ error, children }) => {
  if (children)
    return (
      <StyledError>
        <div>{children}</div>
      </StyledError>
    );
  if (!error || !error.message) return null;
  if (
    error.networkError &&
    error.networkError.result &&
    error.networkError.result.errors.length
  ) {
    return error.networkError.result.errors.map((error, i) => (
      <StyledError key={i}>
        <div>{error.message.replace('GraphQL error: ', '')}</div>
      </StyledError>
    ));
  }
  return (
    <StyledError>
      <div>{error.message.replace('GraphQL error: ', '')}</div>
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
