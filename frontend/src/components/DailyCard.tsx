import React from "react";

// Type declaration for the weather data
interface WeatherData {
  list: {
    dt_txt: string;
    main: {
      temp: number;
    };
    weather: {
      icon: string;
      main: string;
    }[]; 
  }[];
  city: {
    name: string;
    country: string;
  };
}

interface DailyCardProps {
  weather: WeatherData | null; // Accept weather data as a prop
  city: string; // Accept city name as a prop
}

const DailyCard: React.FC<DailyCardProps> = ({ weather, city }) => {

  // Get weather icon from OpenWeatherMap
  const getWeatherIcon = (icon: string) => {
    return (
      <img
        src={`https://openweathermap.org/img/wn/${icon}@4x.png`}
        alt="weather icon"
        style={{ width: 35, height: 35 }}
      />
    );
  };

  // Convert date to formatted time
  const getTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayOfWeek = daysOfWeek[date.getDay()];
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${dayOfWeek}, ${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  };

  if (!weather) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <p>No weather data available</p>
      </div>
    );
  }

  return (
    <div>
      {/* Weather display */}
      <h2 className="text-center m-4"><i className="bi bi-geo-alt-fill"></i>{" "}{city} - {weather.city.name}, {weather.city.country}</h2>

      {/* Error message */}
      {weather && !weather.list.length && (
        <div style={{ color: "red", textAlign: "center" }}>
          <p>No weather data available for the selected city.</p>
        </div>
      )}

      {/* Weather display for 3-hour forecast */}
      <p className="mt-4 ms-4">3-Hour Forecast</p>
      <hr />
      <div className="d-flex justify-content-between rounded-5 m-3 p-2 gap-2">
        {weather.list.slice(0, 5).map((forecast, index) => (
          <div
            key={index}
            className="text-center border rounded-5 p-2 mb-3 bg-dark bg-opacity-25 text-white"
            style={{ flexBasis: "calc(33.33% - 10px)" }} // Making the cards responsive
          >
            {/* Weather Icon */}
            <div>{getWeatherIcon(forecast.weather[0].icon)}</div>

            {/* Temperature */}
            <p>{Math.round(forecast.main.temp)}°C</p>

            {/* Time */}
            <p>{getTime(forecast.dt_txt)}</p>

            {/* Description */}
            <p>{forecast.weather[0]?.main || "No description"}</p>
          </div>
        ))}
      </div>

      {/* 5-Day Forecast Section */}
      <p className="mt-4 ms-4">5-Day Forecast</p>
      <hr />
      <div className="d-flex justify-content-between rounded-5 m-3 p-2 gap-2">
        {weather.list
          .filter((_, index) => index % 8 === 0) // Select one entry per day for the 5-day forecast
          .map((forecast, index) => (
            <div
              key={index}
              className="text-center border rounded-5 p-2 mb-3 bg-dark bg-opacity-25 text-white"
              style={{ flexBasis: "calc(19.99% - 10px)" }} // Making the cards responsive
            >
              {/* Weather Icon */}
              <div>{getWeatherIcon(forecast.weather[0].icon)}</div>

              {/* Temperature */}
              <p>{Math.round(forecast.main.temp)}°C</p>

              {/* Date */}
              <p>{getTime(forecast.dt_txt)}</p>

              {/* Description */}
              <p>{forecast.weather[0]?.main || "No description"}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DailyCard;
