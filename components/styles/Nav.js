import styled from 'styled-components';

export const StyledNav = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  justify-self: end;
  font-size: 2rem;
  .ItemWithDropDowm {
    position: relative;
    &:hover {
      .NavDropDown {
        display: block !important;
      }
    }
  }
  .NavDropDown {
    display: none;
    position: absolute;
    bottom: -7.5rem;
    height: -webkit-fill-available;
    width: 150%;
    left: -7.6rem;
    .arrow {
      width: 2rem;
      height: 2rem;
      background: #000;
      position: absolute;
      top: -1rem;
      transform: rotate(45deg);
      right: 7rem;
      z-index: -1;
    }
    i {
      font-size: 12px;
    }
    .current_user {
      text-transform: none;
      font-style: italic;
      font-size: 14px;
      color: #777;
      line-height: 1.5;
      small {
        margin-left: 0.3rem;
      }
    }
    button,
    a {
      padding: 0.5rem 0;
      margin-left: 1rem;
      &::before {
        content: none;
      }
    }
    @media (max-width: 500px) {
      width: 200%;
      left: -25%;
      top: 160%;
      .arrow {
        width: 1rem;
        height: 1rem;
        top: -0.5rem;
        right: 7.5rem;
      }
      .current_user {
        font-size: 8px;
      }
    }
  }
  a,
  .ItemWithDropDowm,
  button {
    padding: 1rem 3rem;
    display: flex;
    align-items: center;
    position: relative;
    text-transform: uppercase;
    font-size: 1em;
    background: none;
    border: 0;
    @media (max-width: 700px) {
      font-size: 10px;
      padding: 5px 10px;
    }
    &:before {
      content: '';
      width: 1px;
      background: ${props => props.theme.lightGrey};
      height: 100%;
      left: 0;
      position: absolute;
      top: 0;
      bottom: 0;
    }
    &:after {
      height: 2px;
      background: ${props => props.theme.primary};
      content: '';
      width: 0;
      position: absolute;
      transform: translateX(-50%);
      transition: width 0.4s;
      transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
      left: 50%;
      margin-top: 2rem;
    }
    &:hover,
    &:focus {
      outline: none;
      &:after {
        width: calc(100% - 60px);
        @media (max-width: 500px) {
          width: 0;
        }
      }
    }
    @media (max-width: 1300px) {
      &:after {
        margin-top: 1.2rem;
      }
    }
  }
  @media (max-width: 1300px) {
    border-top: 1px solid ${props => props.theme.lightGrey};
    width: 100%;
    justify-content: center;
    font-size: 1.5rem;
  }
`;
