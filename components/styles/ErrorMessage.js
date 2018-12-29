import styled from 'styled-components';

export const StyledError = styled.div`
  color: red;
  border: 1px solid red;
  margin-bottom: 15px;
  padding: 1rem 2rem;
  border-radius: 50px;
  background: rgba(255, 0, 0, 0.05);
  @media (max-width: 500px) {
    padding: 0.5rem 1rem;
  }
`;
