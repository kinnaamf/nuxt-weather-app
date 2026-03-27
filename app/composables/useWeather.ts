export const useWeather = () => {
  const weatherData = useState("weatherData", () => null);
  const { getCoordinates } = useGeolocation();
  const config = useRuntimeConfig()

  const BASE_URL = config.public.baseUrl;
  const API_KEY = config.public.apiKey;

  const latitude = ref();
  const longitude = ref();

  const getUserWeather = async () => {
    await getCoordinates().then((coordinates) => {
      latitude.value = coordinates.latitude;
      longitude.value = coordinates.longitude;
    });
    try {
      weatherData.value = await $fetch(`${ BASE_URL }${ latitude.value },${ longitude.value }?key=${ API_KEY }`);
      console.log(weatherData.value);
    } catch (error) {
      console.error(error);
    }
  }

  return {
    weatherData, getUserWeather
  }
}