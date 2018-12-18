import { Fragment } from 'react';
import { Mutation } from 'react-apollo';
import Link from 'next/link';
import { StyledNav } from '../styles/Nav';
import CurrentUser from '../users/CurrentUser';
import Signout from '../users/Signout';
import { TOGGLE_CART_MUTATION } from '../queries/client';

const Nav = () => (
  <CurrentUser>
    {({ currentUser }) => (
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
          <Mutation mutation={TOGGLE_CART_MUTATION}>
            {(toggleCart) => (
              <button onClick={toggleCart}>My Cart</button>
            )}
          </Mutation>
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
  </CurrentUser>
)


export default Nav;
