export const useWeather = () => {
  const weatherData = useState("weatherData", () => null);
  const { latitude, longitude, getUserCoords } = useGeolocation();
  const config = useRuntimeConfig()

  const BASE_URL = config.public.baseUrl;
  const API_KEY = config.public.apiKey;

  const getWeatherByCoords = async () => {
    await getUserCoords();
    try {
      weatherData.value = await $fetch(`${ BASE_URL }${ latitude.value },${ longitude.value }?key=${ API_KEY }`);
      console.log(weatherData.value);
    } catch (error) {
      console.error(error);
    }
  }

  return {
    weatherData, getWeatherByCoords
  }
}