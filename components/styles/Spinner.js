import styled, { keyframes } from 'styled-components';


const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const StyledSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .fa {
    animation: ${spin} 1s linear infinite;
    color: ${props => props.theme.primary}
  }
`;
