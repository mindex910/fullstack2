import { useEffect, useState } from "react";
import getCountries from "./services/countries";

const Countries = ({ searchCountries }) => {
  if (searchCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }
  if (searchCountries.length === 1) {
    return (
      <div>
        <div>
          <h1>{searchCountries[0].name.common}</h1>
          <p>
            Capital {searchCountries[0].capital} <br></br>
            Area {searchCountries[0].area}
          </p>
        </div>
        <div>
          <h2>Languages</h2>
          <ul>
            {Object.values(searchCountries[0].languages).map(
              (language, index) => (
                <li key={index}>{language}</li>
              )
            )}
          </ul>
          <img src={searchCountries[0].flags.png} width="150" />
        </div>
      </div>
    );
  }
  return searchCountries.map((country) => (
    <div key={country.name.common}>{country.name.common}</div>
  ));
};

const App = () => {
  const [newFilter, setNewFilter] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    console.log("getting countries");
    getCountries.getAll().then((response) => {
      console.log("fulfilled");
      setCountries(response.data);
    });
  }, []);

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const searchCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(newFilter.toLowerCase())
  );

  return (
    <div>
      find countries <input onChange={handleFilterChange} />
      <Countries searchCountries={searchCountries} />
    </div>
  );
};

export default App;
