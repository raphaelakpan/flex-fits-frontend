import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import { StyledPage, StyledPageContainer } from '../styles/Page';
import Theme from '../styles/Theme';
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
