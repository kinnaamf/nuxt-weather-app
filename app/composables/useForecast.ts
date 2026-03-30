import type { Weather } from "~/types/weather";

export const useForecast = (weatherData?: Ref<Weather | null>) => {
  const { currentWeather } = useWeather();

  const sourceData = weatherData || currentWeather;

  const weeklyForecast = computed(() => {
    return sourceData.value?.days?.slice(0, 7) || []
  });

  const hourlyForecast = computed(() => {
    if(!sourceData.value?.days?.length) return []

    const today = sourceData.value?.days[0]?.hours || []
    const tomorrow = sourceData.value?.days[1]?.hours || []
    return [...today, ...tomorrow];
  })

  const next24hours = computed(() => {
    if (!hourlyForecast.value?.length) return [];

    const currentHour = new Date().getHours();

    const startIndex = hourlyForecast.value.findIndex((hour) => {
      const hourTime = parseInt(hour.datetime.split(':')[0]);
      return hourTime >= currentHour;
    });

    const start = startIndex !== -1 ? startIndex : 0;

    return hourlyForecast.value.slice(start, start + 24);
  })

  return {
    weeklyForecast,
    hourlyForecast,
    next24hours,
  }
}