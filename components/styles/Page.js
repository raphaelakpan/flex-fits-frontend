import styled, { createGlobalStyle } from 'styled-components';
import Theme from './Theme';

export const StyledPage = styled.div`
  background: ${props => props.theme.offWhite};
  color: ${props => props.theme.black};
  margin-top: 15rem;
  padding-top: 5rem;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: scroll;
  @media (max-width: 500px) {
    font-size: 80%;
    margin-top: 10rem;
    padding-top: 3rem;
  }
`;

export const StyledContainer = styled.div`
  max-width: ${props => props.theme.maxWidth};
  padding: 0 2rem 2rem;
  margin: 0 auto;
`;

// Global styles for the app
export const GlobalStyles = createGlobalStyle`
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
    color: ${Theme.green};
    border: 1px solid ${Theme.green};
    padding: 1rem 3rem;
    background: rgba(0, 256, 0, 0.1);
    border-radius: 30px;
    margin-bottom: 1rem;
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
