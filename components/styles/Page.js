import styled, { injectGlobal } from 'styled-components';
import Theme from './Theme';

export const StyledPage = styled.div`
  background: ${props => props.theme.offWhite};
  color: ${props => props.theme.black};
  margin-top: 15rem;
  min-height: 90vh;
  padding-top: 3rem;
  @media (max-width: 500px) {
    font-size: 80%;
    margin-top: 10rem;
  }
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

  *[disabled] {
    cursor: not-allowed;
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
    padding: 1rem 2rem;
    margin-bottom: 20px;
    background: rgba(217, 239, 247, 0.5);
    border-radius: 50px;
  }

  @media (max-width: 500px) {
    .notice, .success {
      font-size: 80%;
      padding: 0.5rem 1rem;
    }
  }

  .grey {
    color: #777;
  }

  .centered {
    text-align: center;
  }
`;
