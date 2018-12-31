import Head from 'next/head';
import Link from 'next/link';
import PropTypes from 'prop-types';
import StyledPagination from '../styles/Pagination';

const Pagination = ({ page, perPage, count, pathname, name}) => {
  const pages = Math.ceil(count / perPage);
  if (count < 1 || page >= pages) return null;
  return (
    <StyledPagination>
      <Head>
        <title>Flex Fits - Page {page} of {pages} | {name} </title>
      </Head>
      <Link
        prefetch
        href={{
          pathname,
          query: {page: page - 1}
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
          pathname,
          query: { page: page + 1 }
        }}
      >
        <a className="prev" aria-disabled={page >= pages}>
          Next <i className="far fa-arrow-alt-circle-right"></i>
        </a>
      </Link>
    </StyledPagination>
  );
}

Pagination.propTypes = {
  page: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
  perPage: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  pathname: PropTypes.string.isRequired,
};

export default Pagination;
