import styled from 'styled-components';

export const StyledItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 1rem;
  box-shadow: ${props => props.theme.boxShadow};
  min-height: 800px;
  border: 1px solid ${props => props.theme.borderColor};
  border-radius: 0.5rem;
  background: #fff;
  .image {
    position: relative;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .center {
    text-align: center
  }
  .details {
    padding: 2rem;
    font-size: 2rem;
    border: 1px solid ${props => props.theme.borderColor};
    background: ${props => props.theme.offWhite};
    .title {
      color: ${props => props.theme.primary}
    }
  }
`;
