import { useState, useEffect, Key } from "react";
import "./App.css";
import DailyCard from "./components/DailyCard";
import Map from "./components/Map";
import Sidebar from "./components/Sidebar";
import Places from "./components/Places";
import Header from "./components/Header";

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
    coord: {
      lat: number;
      lon: number;
    };
  };
}

interface LocationData {
  coords: {
    lat: number;
    lon: number;
  };
}

// Define the shape of the place object
interface Place {
  formatted_address: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  photos: any;
  place_id: Key | null | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  geometry: any;
  name: string;
  address: string;
  imageUrl: string;
  description: string;
}

function App() {
  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [coords, setCoords] = useState<LocationData | null>(null);
  const [placesToVisit, setPlacesToVisit] = useState<Place[]>([]);

  // Fetch weather data based on city name
  const fetchWeatherData = async (city: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`
      );
      
      const data = await response.json();

      if (response.ok) {
        setWeather(data);
      } else {
        setError(data.message || "Failed to fetch weather data");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch weather data when the city changes
  useEffect(() => {
    if (city) {
      fetchWeatherData(city);
    }
  }, [city]);

  useEffect(() => {
    if (weather?.city?.coord) {
      setCoords({ coords: weather.city.coord });
    }
  }, [city, weather]);

  // Function to recommend indoor or outdoor activities based on weather conditions
  const getRecommendedActivity = (weatherData: WeatherData | null) => {
    if (!weatherData || weatherData.list.length === 0)
      return "No data available for activities.";

    // Check the weather condition
    const currentWeather = weatherData.list[0];
    const mainWeather = currentWeather.weather[0]?.main.toLowerCase();

    // Determine activity type
    let activityType: "outdoor" | "indoor" = "outdoor";
    if (
      mainWeather === "clear" ||
      mainWeather === "clouds" ||
      mainWeather === "sunny"
    ) {
      activityType = "outdoor";
    } else if (mainWeather === "rain" || mainWeather === "thunderstorm") {
      activityType = "indoor";
    } else if (currentWeather.main.temp < 10) {
      activityType = "indoor";
    }

    return activityType;
  };

  return (
    <div className="App">
      {/* Sidebar component to update city */}
      <Sidebar setCity={setCity} />

      {/* Header Section with Intro Text */}
      {!city && <Header setCity={setCity} />}

      {/* Display loading or error messages */}
      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Render Map and Weather only if city is selected */}
      {city && (
        <div>
          <div className="d-flex justify-content-between p-2 mb-4">
            {/* Weather and Forecast Component */}
            <div className="col-sm-4 border rounded-5 m-3 p-2 bg-dark bg-opacity-25">
              <div className="forecast">
                <DailyCard weather={weather} />
              </div>
            </div>
            {/* Map Component */}
            <div className="col-sm-7 border rounded-5 m-3 p-2 bg-dark bg-opacity-25">
              {coords && (
                <Map
                  city={city}
                  coords={coords.coords}
                  activityType={getRecommendedActivity(weather)}
                  setPlacesToVisit={setPlacesToVisit}
                />
              )}
            </div>
          </div>

          {/* Places Component to display places to visit */}
          <div className="border rounded-5 m-3 p-2 bg-dark bg-opacity-25 shadow">
            {placesToVisit.length > 0 && (
              <Places placesToVisit={placesToVisit} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
