import { useEffect, useState } from "react";

function WeatherWidget({ city }) {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!city) return;

    fetch(`http://localhost:8080/api/weather/${city}`)
      .then(res => {
        if (!res.ok) throw new Error("Weather error");
        return res.json();
      })
      .then(data => {
        setWeather(data);
        setError(false);
      })
      .catch(() => setError(true));
  }, [city]);

  return (
    <div className="card">
      <h3>🌦️ Weather</h3>

      {error && <p>Weather not available</p>}

      {!error && !weather && <p>Loading weather...</p>}

      {weather && (
        <>
          <p>
            <strong>{weather.city}</strong>
          </p>
          <p>
            {weather.temperature}°C — {weather.description}
          </p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt="weather"
          />
        </>
      )}
    </div>
  );
}

export default WeatherWidget;
