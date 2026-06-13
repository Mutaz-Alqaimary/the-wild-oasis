import styled from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: minmax(14rem, 0.7fr) minmax(0, 1fr);
  gap: 2.4rem;
  padding: 1.2rem 0;
  min-width: 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(> button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }

  & > * {
    min-width: 0;
  }

  @media (max-width: 62em) {
    gap: 1.2rem 1.6rem;

    & > span:last-child {
      grid-column: 2;
    }
  }

  @media (max-width: 37.5em) {
    grid-template-columns: 1fr;
    align-items: stretch;
    gap: 0.8rem;
    padding: 1rem 0;

    &:has(> button) {
      align-items: stretch;
      flex-direction: column;
    }

    & > span:last-child {
      grid-column: 1;
    }
  }
`;

const Label = styled.label`
  font-weight: 500;
  line-height: 1.35;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);

  @media (max-width: 37.5em) {
    font-size: 1.2rem;
  }
`;

function FormRow({ label, error, children }) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children?.props?.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
