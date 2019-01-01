import styled, { keyframes } from 'styled-components';

const zoom = keyframes`
  50% {
    transform: scale(0.1);
  }
  100% {
    transform: translateX(1);
  }
`;

const Button = styled.button`
  background: ${props => props.theme.primary};
  color: white;
  font-weight: 500;
  border: 0;
  border-radius: 0;
  text-transform: uppercase;
  font-size: 1.5rem;
  padding: 0.8rem 1.5rem;
  transform: skew(-2deg);
  display: inline-block;
  transition: all 1s;
  border-radius: 50px;
  &[disabled] {
    opacity: 0.5;
    animation: ${zoom} 1s linear infinite;
  }
`;

export default Button;
