import styled from 'styled-components';

export const StyledOrders = styled.div`
  h1 {
    margin: 0 0 2rem 0;
  }
  .Orders {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 1rem;
    margin-bottom: 3rem;
    @media (max-width: 500px) {
      grid-template-columns: repeat(2, 1fr);
      font-size: 80%;
    }
  }

  .Order {
    background: #fff;
    box-shadow: ${props => props.theme.boxShadow};
    padding: 1rem;
    border-radius: 1rem;
    border: 1px solid ${props => props.theme.borderColor};
    display: grid;
    transition: all 0.5s;
    &:hover {
      border-top: 0.2rem solid ${props => props.theme.primary};
    }
    @media (max-width: 500px) {
      font-size: 80%;
    }
    img {
      width: 50%;
      margin: 0 auto;
      height: 100px;
      object-fit: cover;
    }
    .user {
      text-align: right;
      em {
        text-decoration: underline;
      }
    }
    .Order_metadata {
      display: grid;
      & > * {
        padding-left: 2rem;
        position: relative;
        &::before {
          content: '';
          position: absolute;
          width: 1rem;
          height: 1rem;
          background: ${props => props.theme.primary};
          left: 0;
          transform: rotate(45deg);
          top: 1rem;
        }
        &::after {
          content: '';
          position: absolute;
          width: 1rem;
          height: 1rem;
          background: #fff;
          left: 0;
          top: 1rem;
          border-radius: 50px;
        }
        @media (max-width: 500px) {
          padding-left: 1rem;
          &::before,
          &::after {
            width: 0.5rem;
            height: 0.5rem;
            top: 0.7rem;
          }
        }
      }
    }
  }
`;

export const StyledOrder = styled.div`
  max-width: 700px;
  background: #fff;
  margin: 0 auto 5rem;
  border: 1px solid ${props => props.theme.offWhite};
  box-shadow: ${props => props.theme.boxShadow};
  padding: 2rem;
  h1 {
    margin: 0;
  }
  @media (max-width: 500px) {
    font-size: 70%;
  }
  & > p {
    display: grid;
    grid-template-columns: 1fr 5fr;
    margin: 0;
    border-bottom: 1px solid ${props => props.theme.offWhite};
    span {
      padding: 1rem;
      &:first-child {
        font-weight: 900;
        text-align: right;
      }
    }
  }
  .order_item {
    border: 1px solid ${props => props.theme.borderColor};
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    grid-gap: 2rem;
    margin: 2rem 0;
    padding: 0.5rem;
    @media (max-width: 500px) {
      grid-gap: 1rem;
      img {
        width: 60px;
      }
    }
  }
  .item__details {
    h2 {
      margin: 0;
      &:hover {
        text-decoration: underline;
      }
    }
    span {
      margin-left: 1rem;
    }
    padding: 1rem;
    .details__table {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      @media (max-width: 500px) {
        font-size: 10px;
        span {
          margin-left: 0;
        }
      }
      & > div {
        padding-left: 2rem;
        position: relative;
        @media (max-width: 500px) {
          padding-left: 1rem;
        }
        &::before {
          content: '';
          position: absolute;
          width: 1rem;
          height: 1rem;
          background: ${props => props.theme.primary};
          left: 0;
          transform: rotate(45deg);
          top: 1rem;
        }
        &::after {
          content: '';
          position: absolute;
          width: 1rem;
          height: 1rem;
          background: #fff;
          left: 0;
          top: 1rem;
          border-radius: 50px;
        }
        @media (max-width: 500px) {
          &::before,
          &::after {
            width: 0.5rem;
            height: 0.5rem;
            top: 0.7rem;
          }
        }
      }
    }
  }
`;
