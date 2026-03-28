import type { Weather } from "~/types/weather";

export const useWeather = () => {
  const weatherData = useState<Weather | null>("weatherData", () => {
    if (import.meta.client) {
      const cached = localStorage.getItem("weather");
      return cached ? JSON.parse(cached) : null;
    }

    return {
      currentConditions: {
        cloudcover: 0,
        conditions: '',
        description: '',
        feelslike: 0,
        humidity: 0,
        icon: '',
        precip: 0,
        pressure: 0,
        snow: 0,
        sunrise: '',
        sunset: '',
        temp: 0,
        uvindex: 0,
        visibility: 0,
        winddir: 0,
        windgust: 0,
        windspeed: 0,
      },
      description: '',
      forecast: null,
      hourlyForecast: null,
    };
  });

  const { fahrenheitToCelsius } = useConversions()
  const { getCoordinates } = useGeolocation();
  const config = useRuntimeConfig()

  const BASE_URL = config.public.baseUrl;
  const API_KEY = config.public.apiKey;

  const latitude = ref();
  const longitude = ref();

  const isLoading = ref<boolean>(false);

  const getUserWeather = async () => {
    isLoading.value = true;

    const cachedCoords = import.meta.client && localStorage.getItem("coords");

    if (cachedCoords) {
      const parsed = JSON.parse(cachedCoords);
      latitude.value = parsed.latitude;
      longitude.value = parsed.longitude;
    } else {
      const coords = await getCoordinates();
      latitude.value = coords.latitude;
      longitude.value = coords.longitude;
    }

    if (!latitude.value || !longitude.value) {
      console.error("Coordinates not ready or not found");
      return;
    }

    const hasCache = !!weatherData.value;

    if (!hasCache) {
      await getCoordinates().then((coordinates) => {
        latitude.value = coordinates.latitude;
        longitude.value = coordinates.longitude;
      });
    }

    try {
      weatherData.value = await $fetch<Weather>(`${ BASE_URL }${ latitude.value },${ longitude.value }?key=${ API_KEY }`);
      console.log(weatherData.value);

      if (import.meta.client) {
        localStorage.setItem("weather", JSON.stringify(weatherData.value));
      }
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  }

  const currentTempCelsius = computed(() => {
    if (!weatherData.value?.currentConditions.temp) return null;
    return parseInt(fahrenheitToCelsius(weatherData.value.currentConditions.temp));
  })

  const feelsLikeCelsius = computed(() => {
    if (!weatherData.value?.currentConditions.feelslike) return null;
    return parseInt(fahrenheitToCelsius(weatherData.value.currentConditions.feelslike));

  })

  return {
    weatherData, getUserWeather,
    currentTempCelsius, feelsLikeCelsius,
    isLoading
  }
}