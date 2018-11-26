import styled from 'styled-components';

export const Logo = styled.h1`
  font-size: 4rem;
  margin-left: 2rem;
  transform: skew(-5deg);
  a {
    padding: 0.5rem 1rem;
    text-decoration: none;
    background: ${props => props.theme.primary};
    color: white;
    text-transform: uppercase;
  }
  @media(max-width: 1300px) {
    margin: 0;
    text-align: center;
    margin: 1.5rem;
  }
`;

export const StyledHeader = styled.header`
  .bar {
    border-bottom: 10px solid ${props => props.theme.black};
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    line-height: 1;
    @media(max-width: 1300px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }

  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid ${props => props.theme.lightGrey};
  }
`;
