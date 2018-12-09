import { Query } from 'react-apollo';
import Head from 'next/head';
import Link from 'next/link';
import { PAGINATION_QUERY } from '../queries/items';
import StyledPagination from '../styles/Pagination';
import { perPage } from '../../config';

const Pagination = (props) => {
  return (
    <Query query={PAGINATION_QUERY} fetchPolicy="network-only" >
        {({ data }) => {
          const { count } = data.itemsConnection.aggregate;
          const pages = Math.ceil(count / perPage);
          const page = props.page;
          if (count < 1) return null;
          return (
              <StyledPagination>
                <Head>
                  <title>Flex Fits - Page {page} of {pages} </title>
                </Head>
                <Link
                  prefetch
                  href={{
                    pathname: '/items',
                    query: { page: page - 1 }
                  }}
                >
                  <a className="prev" aria-disabled={page <= 1}>
                    <i className="far fa-arrow-alt-circle-left"></i> Prev
                  </a>
                </Link>
                <p> Page {page} of {pages} </p>
                <Link
                  prefetch
                  href={{
                    pathname: '/items',
                    query: { page: page + 1 }
                  }}
                >
                  <a className="prev" aria-disabled={page >= pages}>
                    Next <i className="far fa-arrow-alt-circle-right"></i>
                  </a>
                </Link>
              </StyledPagination>
          );
        }}
      </Query>
  )
}

export default Pagination;
