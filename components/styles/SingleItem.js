import styled from 'styled-components';

export const StyledItem = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  box-shadow: ${props => props.theme.boxShadow};
  border-radius: 0.5rem;
  background: #fff;
  margin: 0 5rem 5rem;
  @media (max-width: 500px) {
    margin: 2rem;
  }
  .image {
    position: relative;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .details {
    padding: 2rem 3rem;
    font-size: 2rem;
    border: 1px solid ${props => props.theme.borderColor};
    background: ${props => props.theme.offWhite};
    .title {
      margin: 0;
    }
    .description {
      margin: 3rem 0;
      white-space: pre-wrap;
    }
    @media (max-width: 500px) {
      .title {
        font-size: 2.5rem;
      }
      .description {
        line-height: 1.5;
        font-size: 12px;
        margin: 2rem 0;
      }
    }
  }
`;
