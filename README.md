# Weather Travel Planner

Weather Travel Planner is a web application that helps users plan their travel by recommending activities and places to visit based on current weather conditions. The app fetches real-time weather data and suggests outdoor or indoor activities depending on the forecast, and allows users to explore nearby places to visit on a map.

## Features

- **Weather Forecast**: Displays current and forecasted weather data for a specified city.
- **Activity Recommendations**: Recommends outdoor or indoor activities based on weather conditions.
- **Interactive Map**: Displays nearby places to visit on a map, including tourist attractions, parks, and restaurants.
- **Travel Plan**: Allows users to save and view a list of recommended places to visit.

## Live Demo

You can try the app live here: [Weather Travel Planner Live Demo](https://weather-travel-planner-73lv.onrender.com/)

## App Demo
[Watch demo](https://raw.githubusercontent.com/Tshegohtml/weather-travel-planner/main/demo.mp4)

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **Vite**: Modern build tool for faster development.
- **OpenWeather API**: Fetches real-time weather data for cities.
- **Google Maps API**: Provides map integration and nearby places search.
- **SweetAlert2**: Displays alert messages for loading and error handling.
- **Bootstrap**: For responsive UI components.
- **TypeScript**: Static typing for JavaScript to improve developer experience and prevent bugs.

## Installation

To get started with the project locally:

1. Clone this repository:
    ```bash
    git clone https://github.com/Tshegohtml/weather-travel-planner.git
    ```

2. Navigate into the project directory:
    ```bash
    cd weather-travel-planner/frontend
    ```

3. Install the required dependencies:
    ```bash
    npm install
    ```

4. Create a `.env` file at the root of the project and add your API keys:

    ```env
    VITE_WEATHER_API_KEY=your_openweathermap_api_key
    VITE_GOOGLE_API_KEY=your_google_maps_api_key
    ```

5. Run the app locally:
    ```bash
    npm run dev
    ```

6. Open the app in your browser at [http://localhost:5173](http://localhost:5173).

## How It Works

1. **Navbar**: Users can enter a city name in the navbar to fetch weather data and forecast.
2. **Weather Forecast**: Displays current temperature, weather condition, and the next few days' forecast.
3. **Activity Recommendation**: Based on weather data, the app will suggest whether the user should go for outdoor or indoor activities.
4. **Map Integration**: Once a city is selected, the app shows a map with nearby places to visit (tourist attractions, parks, etc.).
5. **Places to Visit**: Users can save recommended places to visit and view them in a horizontal scrolling list with images and descriptions.

## Components

- **App**: The main component that holds the app's state and renders the entire app layout, including Sidebar, Weather, Map, and Places components.
- **Sidebar**: A component that allows users to input the city and fetch weather data. It also provides options to view and select nearby places.
- **DailyCard**: Displays daily weather forecast for the selected city.
- **Map**: Displays a Google Map with markers for places to visit, such as restaurants, parks, and other tourist attractions.
- **Places**: A component that shows the list of places the user wants to visit. Each place has an image, name, address, and description.
- **Header**: A component that provides an introductory message and prompts users to enter a city.

## Usage

- **Search for a city**: Enter a city name in the sidebar to fetch weather data.
- **Get weather-based activity recommendations**: The app will suggest whether it's better to engage in indoor or outdoor activities.
- **Explore nearby places**: View places to visit on the interactive map and save them to your travel plan.
- **Save your travel plan**: Save places to visit in your plan and print, download, or share it.

## Notes

- Ensure to replace the API keys for OpenWeather and Google Maps in the `.env` file with your own.
- This app is optimized for modern browsers that support the `navigator.geolocation` API for detecting user location.

## Contributing

Feel free to open an issue or submit a pull request if you have any improvements or bug fixes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [OpenWeather API](https://openweathermap.org/api) for weather data.
- [Google Maps API](https://developers.google.com/maps/documentation) for map integration and place recommendations.
- [SweetAlert2](https://sweetalert2.github.io/) for displaying interactive alerts.
- [Render](https://render.com) for backend hosting

---

Happy Travel Planning! ✈️🌍
