import styled, { keyframes } from 'styled-components';

const rotateY = keyframes`
  from {
    transform: rotateY(0deg)
  }
  to {
    transform: rotateY(360deg)
  }
`;

export const Logo = styled.h1`
  font-size: 4rem;
  margin-left: 2rem;
  transform: skew(-5deg);
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: center;
  img {
    animation: ${rotateY} 2s linear infinite;
  }
  @media (max-width: 500px) {
    font-size: 2rem;
    margin: 0 1rem !important;
    img {
      width: 40px;
    }
    a {
      padding: 0 !important;
    }
  }
  a {
    padding: 0.5rem 1rem;
    text-decoration: none;
    background: ${props => props.theme.primary};
    color: white;
    text-transform: uppercase;
  }
  @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
    margin: 1.5rem;
  }
`;

export const StyledHeader = styled.header`
  position: fixed;
  left: 0;
  right: 0;
  z-index: 99;
  background: #fff;
  top: 0;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
  .bar {
    border-bottom: 10px solid ${props => props.theme.black};
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    line-height: 1;
    @media (max-width: 1300px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
    @media (max-width: 500px) {
      border-bottom-width: 5px;
      line-height: 1.5;
    }
  }

  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid ${props => props.theme.lightGrey};
  }
`;
