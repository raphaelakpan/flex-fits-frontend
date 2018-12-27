import styled from 'styled-components';

export const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  padding: 2rem 0;
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;
