import styled from 'styled-components';

export const StyledAccount = styled.div`
  padding: 2rem;
  background: #fff;
  border: 1px solid ${props => props.theme.borderColor};
  box-shadow: ${props => props.theme.boxShadow};
  h2 {
    margin: 0 0 2rem 0;
  }
  .panel {
    display: flex;
    min-height: 400px;
    margin-top: 3rem;
    .left-panel {
      align-self: end;
      ul {
        background: #000;
        color: #fff;
        border: 1px solid green;
        margin: 0;
        list-style: none;
        padding: 0;
        border-radius: 10px;
        font-size: 16px;
        li {
          padding: 0.7rem 2rem;
          cursor: pointer;
          &:first-child {
            border-radius: 10px 10px 0 0;
          }
          &:last-child {
            border-radius: 0 0 10px 10px;
          }
          &.active,
          &:hover {
            background: #444;
          }
        }
      }
    }
    .main-panel {
      padding: 0 2rem;
      flex-grow: 2;
      margin-left: 1rem;
    }
  }
  @media (max-width: 500px) {
    h1 {
      font-size: 2rem;
      margin: 0;
    }
    h2 {
      margin: 0 0 0.5rem 0;
      font-size: 1.5rem;
    }
    .panel {
      margin-top: 1rem;
      flex-direction: column;
      .left-panel {
        align-self: center;
        margin-bottom: 2rem;
        ul {
          font-size: 12px;
          display: flex;
          li {
            padding: 0.5rem 1rem;
            &:first-child {
              border-radius: 10px 0 0 10px;
            }
            &:last-child {
              border-radius: 0 10px 10px 0;
            }
          }
        }
      }
      .main-panel {
        margin: 0;
      }
    }
  }
`;

export const StyledAccountForm = styled.form`
  fieldset {
    padding: 0;
    border: none;
    display: flex;
    label {
      margin: 1rem 0 2rem 0;
      display: flex;
      align-items: center;
      div {
        width: 25%;
        text-align: right;
        margin-right: 1rem;
      }
      input {
        padding: 1rem;
        border: 1px solid ${props => props.theme.borderColor};
        width: 100%;
        font-size: 1.5rem;
        color: #777;
        outline: none;
        &:focus {
          border: 1px solid ${props => props.theme.lightGrey};
          background: ${props => props.theme.offWhite};
        }
      }
    }
    @media (max-width: 500px) {
      label {
        flex-direction: column;
        align-items: flex-start;
        margin: 1rem 0;
        div {
          text-align: left;
          width: 100%;
        }
        input {
          padding: 0.8rem;
          font-size: 1rem;
        }
      }
    }
  }
  button {
    margin-top: 4rem;
    @media (max-width: 500px) {
      margin-top: 2rem;
    }
  }
`;
