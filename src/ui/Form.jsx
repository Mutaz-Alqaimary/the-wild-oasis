import styled, { css } from "styled-components";

const Form = styled.form`
  ${(props) =>
    props.type === "regular" &&
    css`
      padding: 2.4rem 4rem;
      width: 100%;

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);

      @media (max-width: 62em) {
        padding: 2.4rem;
      }

      @media (max-width: 37.5em) {
        padding: 1.6rem;
      }
    `}

  ${(props) =>
    props.type === "modal" &&
    css`
      width: 80rem;

      @media (max-width: 62em) {
        width: min(80rem, calc(100vw - 4rem));
      }

      @media (max-width: 37.5em) {
        width: calc(100vw - 2.8rem);
      }
    `}
    
  overflow: hidden;
  font-size: 1.4rem;
  min-width: 0;
  max-width: 100%;

  @media (max-width: 37.5em) {
    font-size: 1.3rem;
  }
`;

Form.defaultProps = {
  type: "regular",
};

export default Form;
