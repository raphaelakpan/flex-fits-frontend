import styled from 'styled-components';

const CloseButton = styled.button`
  font-size: 3rem;
  border: 0;
  position: absolute;
  z-index: 2;
  right: 10px;
  top: 10px;
  padding: 5px;
  border: 1px solid ${props => props.theme.lightGrey};
  border-radius: 0.5rem;
  &:hover {
    background: ${props => props.theme.lightGrey};
  }
`;

export default CloseButton;
