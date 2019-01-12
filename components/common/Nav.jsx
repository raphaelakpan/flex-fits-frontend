import { Fragment } from 'react';
import { Mutation } from 'react-apollo';
import Link from 'next/link';
import { StyledNav } from '../styles/Nav';
import CurrentUser from '../users/CurrentUser';
import Signout from '../users/Signout';
import { TOGGLE_CART_MUTATION } from '../queries/client';
import CartCount from '../cart/CartCount';

import { DropDown, DropDownItem } from '../styles/DropDown';

const NavItemDropDown = ({ currentUser, isAdmin }) => (
  <Fragment>
    <div className="ItemWithDropDowm">
      Settings
      <DropDown className="NavDropDown">
        <div className="arrow" />
        <DropDownItem className="no__pointer current_user">
          👋 {currentUser.name} {isAdmin && <small> [admin]</small>}
        </DropDownItem>
        <DropDownItem>
          <i className="fas fa-sun" />
          <Link href="/account">
            <a>Account</a>
          </Link>
        </DropDownItem>
        {isAdmin && (
          <DropDownItem>
            <i className="fas fa-lock" />
            <Link href="/permissions">
              <a>Permissions</a>
            </Link>
          </DropDownItem>
        )}
        <DropDownItem>
          <i className="fas fa-lock" /> <Signout />
        </DropDownItem>
      </DropDown>
    </div>
  </Fragment>
);

const Nav = () => (
  <CurrentUser>
    {({ currentUser, isAdmin }) => (
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
            <Mutation mutation={TOGGLE_CART_MUTATION}>
              {toggleCart => (
                <button onClick={toggleCart}>
                  My Cart
                  <CartCount
                    count={currentUser.cart.reduce(
                      (sum, cartItem) =>
                        sum + (cartItem.item ? cartItem.quantity : 0),
                      0
                    )}
                  />
                </button>
              )}
            </Mutation>
            <NavItemDropDown currentUser={currentUser} isAdmin={isAdmin} />
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
);

export default Nav;
