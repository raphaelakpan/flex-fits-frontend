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
`;
