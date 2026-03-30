import type { Weather } from "~/types/weather";

export const useWeather = () => {
  const config = useRuntimeConfig();
  const BASE_URL = config.public.baseUrl;
  const API_KEY = config.public.apiKey;

  const { fahrenheitToCelsius } = useConversions();
  const { getCoordinates, getCityCountry } = useGeolocation();

  const currentWeather = useState<Weather | null>("currentWeather", () => null);
  const currentLocation = useState<{ city: string; country: string } | null>("currentLocation", () => null);
  const isLoading = useState<boolean>("weatherLoading", () => false);

  const fetchWeather = async (query: string) => {
    isLoading.value = true;

    try {
      currentWeather.value = await $fetch<Weather>(
        `${ BASE_URL }${ query }?key=${ API_KEY }`
      )

      if (currentWeather.value?.latitude && currentWeather.value?.latitude) {
        currentLocation.value = await getCityCountry(
          currentWeather.value?.latitude,
          currentWeather.value?.longitude
        )
      }

      return currentLocation.value;
    } catch (error) {
      console.log('Weather fetch failed', error);
      currentWeather.value = null;
      currentLocation.value = null;
      return null;
    } finally {
      isLoading.value = false;
    }
  }

  const fetchWeatherByLocation = async () => {
    const coords = await getCoordinates();
    const query = `${coords.latitude},${coords.longitude}`;
    return await fetchWeather(query);
  }

  const fetchWeatherByCity = async (cityName: string) => {
    return await fetchWeather(cityName);
  }

  const currentTempCelsius = computed(() => {
    if (!currentWeather.value?.currentConditions.temp) return null;
    return Math.round(fahrenheitToCelsius(currentWeather.value.currentConditions.temp));
  })

  const feelsLikeCelsius = computed(() => {
    if (!currentWeather.value?.currentConditions.feelslike) return null;
    return Math.round(fahrenheitToCelsius(currentWeather.value.currentConditions.feelslike));
  })

  return {
    currentWeather,
    currentLocation,
    isLoading,

    fetchWeatherByLocation,
    fetchWeatherByCity,

    currentTempCelsius,
    feelsLikeCelsius,
  }
}