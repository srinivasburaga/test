import axios from 'axios';

const API_KEY = '15ca787f2d191cf1f09525804a2ce85d';

const WeatherService = {
  fetchWeatherData: async (cityName) => {
    try {
      const geoResponse = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${API_KEY}`);
      const { lat, lon } = geoResponse?.data[0];
      const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
      const response = await axios.get(url);
      const forecastData = extractDailyForecast(response.data.list);
      return forecastData;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      throw error;
    }
  }
};

const extractDailyForecast = (list) => {
  const dailyForecast = {};
  list.forEach(item => {
    const date = item.dt_txt.split(' ')[0];
    if (!dailyForecast[date]) {
      dailyForecast[date] = item;
    }
  });
  return Object.values(dailyForecast);
};

export default WeatherService;
