import styled from 'styled-components';

export const StyledCart = styled.div`
  padding: 20px;
  background: ${props => props.theme.offWhite};
  position: fixed;
  height: 100%;
  top: 0;
  right: 0;
  min-width: 500px;
  bottom: 0;
  transform: translateX(105%);
  transition: all 0.3s;
  box-shadow: 0 0 10px 3px rgba(0, 0, 0, 0.2);
  z-index: 5;
  display: grid;
  grid-template-rows: auto 1fr auto;
  ${props => props.open && `transform: translateX(0);`};
  @media (max-width: 500px) {
    min-width: 0;
    width: 250px;
  }
  header {
    border-bottom: 5px solid ${props => props.theme.black};
    margin-bottom: 2rem;
    padding-bottom: 2rem;
  }
  footer {
    border-top: 10px double ${props => props.theme.black};
    margin-top: 2rem;
    padding-top: 2rem;
    display: grid;
    grid-template-columns: auto auto;
    align-items: center;
    font-size: 3rem;
    font-weight: 900;
    p {
      margin: 0;
    }
  }
  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    overflow: scroll;
  }
  .loading {
    position: absolute;
    margin-top: -1.7rem;
  }
  button {
    background: #fff;
    @media (max-width: 500px) {
      padding: 2px 8px;
      font-size: 8px;
      margin-top: 0.5rem;
    }
  }
`;

export const StyledCartItem = styled.li`
  border: 1px solid ${props => props.theme.lightGrey};
  margin-bottom: 1rem;
  display: grid;
  grid-template-columns: auto 1fr;
  padding: 0.5rem;
  background: white;
  .CartItem__image {
    position: relative;
    span {
      font-size: 1rem;
    }
  }
  .CartItem__details {
    margin-left: 1rem;
    h3,
    p {
      margin: 0;
    }
  }
  @media (max-width: 500px) {
    font-size: 80%;
    .CartItem__image {
      img {
        width: 70px;
      }
    }
  }
`;

export const StyledRemoveCartButton = styled.button`
  border: 1px solid ${props => props.theme.lightGrey};
  padding: 5px 15px;
  border-radius: 50px;
  color: #777;
  &:hover {
    color: #000;
    border-color: #000;
  }
  .error {
    position: absolute;
    bottom: 5px;
    color: red;
    left: 11rem;
  }
`;

export const StyledCartCount = styled.div`
  background: ${props => props.theme.primary};
  color: #fff;
  border-radius: 50%;
  padding: 0.5rem;
  min-width: 3rem;
  font-weight: bold;
  font-feature-settings: 'tnum';
  font-variant-numeric: tabular-nums;
  position: absolute;
  top: 2rem;
  right: 0.5rem;
  font-size: 14px;
  @media (max-width: 1300px) {
    top: 0;
    font-size: 0.7rem;
    min-width: 0;
    right: 0.3rem;
    padding: 0.14rem;
  }
`;

export const StyledCartCountAnimation = styled.span`
  .count {
    display: block;
    transition: all 0.5s;
    backface-visibility: hidden;
  }
  .count-enter {
    transform: scale(0);
  }
  .count-exit {
    transform: scale(0);
  }
`;
