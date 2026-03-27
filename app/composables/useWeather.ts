import type { Weather } from "~/types/weather";

export const useWeather = () => {
  const weatherData = useState<Weather | null>("weatherData", () => {
    if (import.meta.client) {
      const cached = localStorage.getItem("weather");
      return cached ? JSON.parse(cached) : null;
    }
  });

  const { getCoordinates } = useGeolocation();
  const config = useRuntimeConfig()

  const BASE_URL = config.public.baseUrl;
  const API_KEY = config.public.apiKey;

  const latitude = ref();
  const longitude = ref();

  const getUserWeather = async () => {
    if (weatherData.value) return;

    await getCoordinates().then((coordinates) => {
      latitude.value = coordinates.latitude;
      longitude.value = coordinates.longitude;
    });
    try {
      const response = await $fetch<Weather>(`${ BASE_URL }${ latitude.value },${ longitude.value }?key=${ API_KEY }`);
      console.log(weatherData.value);

      weatherData.value = response;

      if (import.meta.client) {
        localStorage.setItem("weather", JSON.stringify(response));
      }
    } catch (error) {
      console.error(error);
    }
  }

  return {
    weatherData, getUserWeather
  }
}