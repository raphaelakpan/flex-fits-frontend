import React, { Component } from 'react';
import { ThemeProvider } from 'styled-components';
import { StyledPage } from '../styles/Page';
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
          {this.props.children}
        </StyledPage>
      </ThemeProvider>
    );
  }
}

export default Page;
