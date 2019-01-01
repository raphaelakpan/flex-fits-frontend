import styled from 'styled-components';

const PriceTag = styled.span`
  background: ${props => props.theme.primary};
  transform: rotate(3deg);
  color: white;
  font-weight: 600;
  padding: 5px;
  line-height: 1;
  font-size: 3rem;
  display: inline-block;
  position: absolute;
  top: -3px;
  left: -3px;
  @media (max-width: 500px) {
    font-size: 2rem;
  }
`;

export default PriceTag;
