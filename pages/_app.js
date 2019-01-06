import App, { Container } from 'next/app';
import { ApolloProvider } from 'react-apollo';
import Router from 'next/router';
import Page from '../components/common/Page.jsx';
import withData from '../lib/withData';
import { CURRENT_USER_QUERY } from '../components/queries/users';

const handleHomePageRedirect = async ({ pathname, apolloClient, res }) => {
  const routes = ['/signin', '/signup'];
  if (routes.includes(pathname)) {
    const { data } = await apolloClient.query({
      query: CURRENT_USER_QUERY
    });
    if (data && data.currentUser) {
      if (res) {
        res.writeHead(302, { Location: '/' });
        res.end();
        res.finished = true;
      } else {
        Router.push('/');
      }
    }
  }
};

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }
    // expose the query to the props
    pageProps.query = ctx.query;
    handleHomePageRedirect(ctx);
    return { pageProps };
  }

  render() {
    const { Component, apollo, pageProps } = this.props;

    return (
      <Container>
        <ApolloProvider client={apollo}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </ApolloProvider>
      </Container>
    );
  }
}

export default withData(MyApp);
