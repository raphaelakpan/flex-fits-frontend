import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';
import { Logo, StyledHeader } from '../styles/Header';
import Nav from './Nav';
import Cart from '../cart/Cart';

Router.onRouteChangeStart = () => {
  NProgress.start();
}
Router.onRouteChangeComplete = () => {
  NProgress.done();
}
Router.onRouteChangeError = () => {
  NProgress.done();
}

const Header = () => (
  <StyledHeader>
    <div className="bar">
      <Logo>
        <Link href="/">
          <a> Flex Fits </a>
        </Link>
      </Logo>
      <Nav />
    </div>
    <div className="sub-bar">
      <p>Search</p>
    </div>
    <Cart />
  </StyledHeader>
)

export default Header;
