import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Form = styled.form`
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
  background: rgba(0, 0, 0, 0.02);
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
    border: 1px solid ${props => props.theme.primary};
    width: 250px;
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
    cursor: pointer;
    border-radius: 50px;
    &:hover {
      opacity: 0.8
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
      .fa{
        animation: ${spin} 1s linear infinite;
        color: ${props => props.theme.primary}
      }
    }
  }
`;

export default Form;
