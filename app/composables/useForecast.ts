export const useForecast = () => {
  const { weatherData } = useWeather();

  const weeklyForecast = computed(() => {
    return weatherData.value?.days?.slice(0, 7) || []
  });

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const formatDate = (dateString: string, index: number) => {
    if (index === 0) return 'Today';

    const date = new Date(dateString);
    const dayIndex = date.getDay();

    return weekDays[dayIndex];
  }

  return {
    weeklyForecast,
    formatDate,
  }
}