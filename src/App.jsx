import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState();

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  async function fetchdata(city) {
    if (city === "") {
      alert("Enter city name");
    } else {
      const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;
      const options = {
        method: "GET",
        url: "https://weatherapi-com.p.rapidapi.com/current.json",
        params: { q: `${city}` },
        headers: {
          "x-rapidapi-key": apiKey,
          "x-rapidapi-host": "weatherapi-com.p.rapidapi.com",
        },
      };
      if (!apiKey) {
        console.error("API key is missing!");
        return;
      }
      try {
        const response = await axios.request(options);
        const result = response.data;
        setWeather(result);
        console.log(result);
      } catch (error) {
        console.error(error);
      }
    }
  }

  const getweather = () => {
    fetchdata(city);
  };

  return (
    <>
      <div className="container">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleChange}
        />
        <button onClick={getweather}>Get Weather</button>

        {weather && (
          <>
            <div className="details">
              <h2>{weather.location.name}</h2>
              <p>Temperature: {weather.current.temp_c}°C</p>
              <p>wind:{weather.current.wind_kph}/kph</p>
              <p>Humidity:{weather.current.humidity}%</p>
              <p>cloud:{weather.current.cloud}</p>
              <p>"{weather.current.condition.text}"</p>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
