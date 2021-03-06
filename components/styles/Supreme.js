import styled from 'styled-components';

const Supreme = styled.h3`
  background: ${props => props.theme.primary};
  color: white;
  display: inline-block;
  padding: 4px 5px;
  transform: skew(-3deg);
  margin: 0;
  font-size: 4rem;
  @media (max-width: 500px) {
    font-size: 2rem;
  }
`;

export default Supreme;
