import styled from 'styled-components';

export const StyledDialogContainer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(150, 150, 150, 0.8) !important;
  z-index: 99999;
  display: flex;
  justify-content: center;
  align-items: center;
  .dialog {
    background: white;
    padding: 3rem;
    font-size: 2rem;
    transform: skew(-3deg);
    &__wide {
      width: 600px;
    }
  }
  .actions {
    display: grid;
    grid-gap: 1px;
    grid-template-columns: 1fr 1fr;
    .cancel {
      background: ${props => props.theme.lightGrey};
    }
    .yes {
      background: red;
      color: white;
    }
    button {
      border: none;
      padding: 1rem;
      font-size: 2rem;
      margin-top: 2rem;
      border-radius: 50px;
      outline: 0;
    }
  }
`;
