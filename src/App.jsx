import { useEffect, useState } from "react";
import { BiSearchAlt } from "react-icons/bi";
import "./App.css";
import Loading from "./Loading";

const App = () => {
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [humidity, setHumidity] = useState("");
  const [wind, setWind] = useState("");
  const [search, setSearch] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const searchCity = async (e, value) => {
    if (e !== null) {
      e.preventDefault();
    }
    const valueSearch = value;
    const url = `/.netlify/functions/fetch?city=${valueSearch}`;

    setLoading(true);
    try {
      const response = await fetch(url);
      if(response.status === 200) {
        const info = await response.json();
        const data = await info.body;
        setError(false);
        setCity(data.name);
        setTemperature(parseInt(data.main.temp));
        setImage(
          "https://openweathermap.org/img/wn/" +
            data.weather[0].icon +
            ".png"
        );
        setDescription(data.weather[0].description);
        setHumidity(data.main.humidity);
        setWind(data.wind.speed);
      } else {
        setError(true);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    searchCity(null, "Kosice");
  }, []);

  return (
    <main>
      <div className="overlay"></div>
      <div className="wrapper">
        <h1>Weather App</h1>
        <div className="weather-container">
          <form
            onSubmit={(e) => searchCity(e, search)}
            className="search-container"
          >
            <div className="input-field">
              <input
                type="text"
                className="search-bar"
                spellCheck="false"
                placeholder="search city"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button type="submit" className="search-btn">
              <BiSearchAlt />
            </button>
            {error && <p className="error-message">Wrong input</p>}
          </form>
          {loading ? (
            <Loading />
          ) : (
            <div className="weather">
              <span className="city">{city}</span>
              <p className="temperature">
                <span className="temp">{temperature}</span> °C
              </p>
              <div className="description">
                <img src={image} alt="image" />
                <span>{description}</span>
              </div>
              <p>
                Humidity: <span className="humid">{humidity}</span>%
              </p>
              <p>
                Wind: <span className="wind">{wind}</span> km/h
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default App;
