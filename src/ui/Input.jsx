import styled from "styled-components";

const Input = styled.input`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);
  width: 100%;
  max-width: 100%;
  min-width: 0;

  @media (max-width: 37.5em) {
    font-size: 1.3rem;
  }
`;

export default Input;
