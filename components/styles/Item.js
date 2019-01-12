import styled from 'styled-components';

const StyledItem = styled.div`
  background: white;
  border: 1px solid ${props => props.theme.offWhite};
  box-shadow: ${props => props.theme.boxShadow};
  position: relative;
  display: flex;
  flex-direction: column;
  &:hover {
    transform: scale(1.05);
  }
  @media (max-width: 500px) {
    font-size: 80%;
  }
  img {
    width: 100%;
    height: 400px;
    object-fit: contain;
    margin-top: 2rem;
    cursor: pointer;
    @media (max-width: 500px) {
      height: inherit;
    }
  }
  .item_description {
    line-height: 2;
    font-weight: 300;
    flex-grow: 1;
    padding: 0 3rem;
    font-size: 1.5rem;
    color: #777;
    margin-bottom: 0;
    @media (max-width: 500px) {
      line-height: 1.5;
      font-size: 1rem;
    }
  }
  .item_soldby {
    text-align: right;
    padding: 0 2rem 1rem 0;
  }
  .buttonList {
    display: grid;
    width: 100%;
    border-top: 1px solid ${props => props.theme.lightGrey};
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 1px;
    background: ${props => props.theme.lightGrey};
    @media (max-width: 500px) {
      grid-template-columns: repeat(auto-fit, minmax(60px, 1fr));
    }
    & > * {
      background: white;
      border: 0;
      font-size: 1rem;
      padding: 1rem;
      @media (max-width: 500px) {
        font-size: 0.8rem;
      }
    }
  }
`;

export default StyledItem;
