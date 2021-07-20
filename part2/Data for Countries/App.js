import axios from "axios";
import React, { useState, useEffect } from "react";

const alertOverStr = "Too many matches, specify another filter";
const restCountryStr = "https://restcountries.eu/rest/v2/name/";
const weatherAPI_Key = process.env.REACT_APP_API_KEY;

const Country = (props) => {
  const handleShowClick = () => {
    props.changeFilter(props.country.name);
  };

  return (
    <>
      <p>
        {props.country.name}
        <button onClick={handleShowClick}>Show</button>
      </p>
    </>
  );
};

const Weather = ({ capital }) => {
  const weatherApiStr = `https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${weatherAPI_Key}&units=metric`;
  const [weather, setWeather] = useState("");

  useEffect(() => {
    fetch(weatherApiStr)
      .then((res) => res.json())
      .then(
        (result) => {
          setWeather(result);
        },
        (error) => {
          console.error(error);
        }
      );
  }, [weatherApiStr]);

  if (weather !== "") {
    const weatherIconSrc = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

    return (
      <>
        <h2>Wearther in {capital}</h2>
        <p>
          <strong>temperature:</strong>
          {weather.main.temp} Celcius
        </p>
        <img src={weatherIconSrc} width="100px" alt="weather icon" />
        <p>
          <strong>wind: </strong>
          {weather.wind.speed} m/s direction {weather.wind.deg}
        </p>
      </>
    );
  } else return <></>;
};

const CountryDetail = ({ country }) => {
  return (
    <>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      <ul>
        {" "}
        {country.languages.map((language) => (
          <li key={language.iso639_1}>{language.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt="Country flag" width="100px" />
      <Weather capital={country.capital} />
    </>
  );
};

const Result = (props) => {
  if (props.responses.length > 10) {
    return (
      <>
        <p>{alertOverStr}</p>
      </>
    );
  } else if (props.responses.length > 1) {
    return (
      <>
        {props.responses.map((response) => (
          <Country
            country={response}
            changeFilter={props.changeFilter}
            key={response.alpha2code}
          />
        ))}
      </>
    );
  } else if (props.responses.length === 1) {
    return (
      <>
        <CountryDetail country={props.responses[0]} />
      </>
    );
  } else {
    return <></>;
  }
};

const App = () => {
  const [filter, setFilter] = useState("");
  const [responses, setResponses] = useState("");

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const changeFilter = (newFilter) => {
    setFilter(newFilter);
  };

  useEffect(() => {
    if (filter !== "") {
      axios
        .get(restCountryStr + filter)
        .then((response) => {
          console.log("promise fulfilled");
          setResponses(response.data);
        })
        .catch((error) => {
          setResponses("");
          console.error(error);
        });
    }
  }, [filter]);

  return (
    <>
      <div>
        find countries:
        <input value={filter} onChange={handleFilterChange} id="filter" />
      </div>
      <Result responses={responses} changeFilter={changeFilter} />
    </>
  );
};

export default App;
