import styled, { injectGlobal } from 'styled-components';
import Theme from './Theme';

export const StyledPage = styled.div`
  background: white;
  color: ${props => props.theme.black};
`;

export const StyledPageContainer = styled.div`
  max-width: ${props => props.theme.maxWidth};
  padding: 2rem;
  margin: 0 auto;
`;

// Global styles for the app
injectGlobal`
  html {
    box-sizing: border-box;
    font-size: 10px;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    padding: 0;
    font-size: 1.5rem;
    line-height: 2;
    font-family: 'Ubuntu', Helvetica, sans-serif
  }

  a {
    text-decoration: none;
    color: ${Theme.black}
  }

  button,
  input[type='submit'] {
    cursor: pointer;
    border: 0;
  }

  .bordered {
    border: 1px solid ${Theme.primary} !important;
    color: ${Theme.primary} !important;
    background: none !important;
  }

  .success {
    color: ${props => props.theme.green};
    border: 1px solid ${props => props.theme.green};
    padding: 1rem;
    background: #fff;
  }

  .notice {
    color: ${Theme.blue};
    border: 1px solid ${Theme.blue};
    padding: 10px 20px;
    margin-bottom: 20px;
    background: rgba(217, 239, 247, 0.5);
    border-radius: 50px;
  }
`;
