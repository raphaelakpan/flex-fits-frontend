import styled from 'styled-components';

const Form = styled.form`
  box-shadow: ${props => props.theme.boxShadow};
  background: #fff;
  border: 5px solid white;
  padding: 20px;
  font-size: 1.5rem;
  line-height: 1.5;
  font-weight: 600;
  max-width: 600px;
  margin: 0 auto;
  position: relative;
  label {
    display: block;
    margin-bottom: 1rem;
    .price {
      color: ${props => props.theme.primary};
      font-size: 20px;
    }
  }
  input,
  textarea,
  select {
    width: 100%;
    padding: 0.5rem;
    font-size: 1.5rem;
    border: 1px solid ${props => props.theme.lightGrey};
    color: #666;
    margin-top: 0.3rem;
    &:focus {
      outline: 0;
      border-color: ${props => props.theme.primary};
    }
  }
  textarea {
    resize: none;
  }
  .preview {
    display: block;
    margin: 1rem auto;
    border: 1px solid ${props => props.theme.lightGrey};
    width: 70%;
  }
  .error {
    color: red;
    margin: 0.5rem 0;
  }

  button,
  input[type='submit'] {
    width: auto;
    background: ${props => props.theme.primary};
    color: white;
    border: 0;
    font-size: 2rem;
    font-weight: 600;
    padding: 0.5rem 1.5rem;
    border-radius: 50px;
    margin: 1rem 0;
    &:hover {
      opacity: 0.8;
    }
  }
  fieldset {
    border: 0;
    padding: 0;

    &[disabled] {
      opacity: 0.5;
    }
    .loading {
      position: absolute;
      right: 1rem;
      top: 1rem;
    }
  }
  .options {
    display: flex;
    align-items: center;
    justify-content: space-between;
    a {
      color: #009fe0;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  @media (max-width: 500px) {
    font-size: 80%;
    margin: 0 2rem;
    button,
    input[type='submit'],
    input,
    textarea,
    select {
      font-size: 1rem;
    }
  }
`;

export default Form;
