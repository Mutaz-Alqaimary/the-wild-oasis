import { useEffect, useState } from "react";

function GetCodeOfCountry(countryName) {
  const [countries, setCountries] = useState({});
  const [code, setCode] = useState("");

  useEffect(() => {
    async function fetchCountryData() {
      const response = await fetch("https://flagcdn.com/en/codes.json");
      const data = await response.json();
      setCountries(data);
    }

    fetchCountryData();
  }, []);

  useEffect(() => {
    const countryCode = Object.entries(countries)?.find(
      ([, name]) => name === countryName,
    )?.[0];
    setCode(countryCode || "");
    
  }, [countryName, countries]);

  return code;
}

export default GetCodeOfCountry;
