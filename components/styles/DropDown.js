import styled, { keyframes } from 'styled-components';

const DropDown = styled.div`
  position: absolute;
  width: 100%;
  z-index: 2;
  border: 1px solid ${props => props.theme.lightGrey};
  @media (max-width: 500px) {
    font-size: 1rem;
    top: 2.8rem;
  }
`;

const DropDownItem = styled.div`
  border-bottom: 1px solid ${props => props.theme.lightGrey};
  background: white;
  padding: 1rem;
  transition: all 0.2s;
  ${props => (props.highlighted ? 'padding-left: 2rem;' : null)};
  display: flex;
  align-items: center;
  border-left: 10px solid ${props => (props.highlighted ? props.theme.primary : 'white')};
  ${props => props.className !== 'no__pointer' ? 'cursor: pointer;' : null }
  img {
    margin-right: 10px;
  }
  .loading {
    margin: 0 auto;
  }
  .results {
    border: 1px solid ${props => props.theme.borderColor};
    padding: 0.5rem 2rem;
    background: ${props => props.theme.offWhite};
    margin: auto;
    border-radius: 5rem;
  }
  @media (max-width: 500px) {
    padding: 0.5rem;
    .results {
      padding: 0.2rem 1rem;
    }
  }
`;

const glow = keyframes`
  from {
    box-shadow: 0 0 0px yellow;
  }

  to {
    box-shadow: 0 0 10px 1px yellow;
  }
`;

const SearchStyles = styled.div`
  position: relative;
  width: 700px;
  margin: 0.5rem auto;
  input {
    width: 100%;
    padding: 10px;
    border: 0;
    font-size: 2rem;
    border-radius: 0.5rem;
    border: 1px solid ${props => props.theme.lightGrey};
    outline: none;
    padding: 1rem 1.5rem;
    background: ${props => props.theme.offWhite};
    &.loading {
      animation: ${glow} 0.5s ease-in-out infinite alternate;
    }
  }
  .search__icon {
    position: absolute;
    font-size: 2.5rem;
    color: #afafaf;
    right: 1rem;
    top: 1rem;
  }
  @media (max-width: 500px) {
    width: 90%;
    input {
      padding: 0.5rem;
      font-size: 1rem;
    }
    .search__icon {
      font-size: 1.1rem;
      top: 0.5rem;
      right: 0.5rem;
    }
  }
`;

export { DropDown, DropDownItem, SearchStyles };
