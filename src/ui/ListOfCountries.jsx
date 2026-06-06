import { useEffect, useState } from "react";
import styled from "styled-components";

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

function ListOfCountries({ disabled, value, onChange }) {
  const [countries, setCountries] = useState({});

  useEffect(() => {
    async function fetchCountries() {
      const response = await fetch("https://flagcdn.com/en/codes.json");
      const data = await response.json();
      setCountries(data);
    }

    fetchCountries();
  }, []);

  return (
    <StyledSelect
      disabled={disabled}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">-- Choose a country --</option>
      {Object.entries(countries).map(([code, country]) => (
        <option key={code} value={country}>
          {country}
        </option>
      ))}
    </StyledSelect>
  );
}

export default ListOfCountries;
