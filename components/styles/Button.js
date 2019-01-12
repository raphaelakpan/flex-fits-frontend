import styled from 'styled-components';

const Button = styled.button`
  background: ${props => props.theme.primary} !important;
  color: white;
  font-weight: 500;
  border: 0;
  border-radius: 0;
  text-transform: uppercase;
  font-size: 1.5rem;
  padding: 1rem 3rem;
  transform: skew(-2deg);
  display: inline-block;
  transition: all 1s;
  border-radius: 50px;
  @media (max-width: 500px) {
    font-size: 1rem;
    padding: 0.5rem 2rem;
  }
  &[disabled] {
    opacity: 0.5;
  }
`;

export default Button;
