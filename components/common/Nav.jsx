import { Fragment } from 'react';
import Link from 'next/link';
import { StyledNav } from '../styles/Nav';
import User from '../users/User';
import Signout from '../users/Signout';

const Nav = () => (
  <User>
    {({ data: { currentUser } }) => (
      <StyledNav>
      <Link href="/items">
        <a>Shop</a>
      </Link>
      {currentUser && (
        <Fragment>
          <Link href="/sell">
            <a>Sell</a>
          </Link>
          <Link href="/orders">
            <a>Orders</a>
          </Link>
          <Link href="/account">
            <a>Account</a>
          </Link>
          <Signout />
        </Fragment>
      )}
      {!currentUser && (
        <Fragment>
          <Link href="/signup">
            <a>Signup</a>
          </Link>
          <Link href="/signin">
            <a>Signin</a>
          </Link>
        </Fragment>
      )}
    </StyledNav>
    )}
  </User>
)


export default Nav;
