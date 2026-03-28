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

  const hourlyForecast = computed(() => {
    if(!weatherData.value?.days?.length) return []
    return weatherData.value?.days[0]?.hours || []
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

  const formatTime = (timeString: string, index: number) => {
    const hour = parseInt(timeString.split(':')[0]);
    const currentHour = new Date().getHours();

    if (index === 0) return 'Now';

    return hour.toString().padStart(2, '0');
  }

  return {
    weeklyForecast,
    hourlyForecast,
    formatDate,
    formatTime,
    next24hours,
  }
}