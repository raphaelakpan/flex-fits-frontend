import styled from 'styled-components';

const StyledTable = styled.table`
  border-spacing: 0;
  width: 100%;
  border: 1px solid ${props => props.theme.offWhite};
  position: relative;
  thead {
    font-size: 10px;
    background: #F9F9F9;
  }
  td,
  th {
    border-bottom: 1px solid ${props => props.theme.offWhite};
    border-right: 1px solid ${props => props.theme.offWhite};
    padding: 10px 5px;
    position: relative;
    &:last-child {
      border-right: none;
      width: 150px;
      button {
        width: 100%;
      }
    }
    label {
      display: block;
    }
  }
  tr {
    &:hover {
      background: ${props => props.theme.offWhite};
    }
  }
  .error {
    position: absolute;
    top: -8rem;
    right: 0;
    transition: all 1s;
    width: auto !important;
  }
  .spinner {
    position: absolute;
    border: 0;
    left: -10rem;
  }
`;

export default StyledTable;
