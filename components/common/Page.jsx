import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import { Theme, StyledPage, StyledPageContainer } from '../styles/Page';
import Header from './Header';
import Meta from './Meta';

class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={Theme}>
        <StyledPage>
          <Meta />
          <Header />
          <StyledPageContainer>
            {this.props.children}
          </StyledPageContainer>
        </StyledPage>
      </ThemeProvider>
    )
  }
}

export default Page;
