import Link from 'next/link';
import { Logo, StyledHeader } from '../styles/Header';
import Nav from './Nav';

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
    <div>
      Cart
    </div>
  </StyledHeader>
)

export default Header;
