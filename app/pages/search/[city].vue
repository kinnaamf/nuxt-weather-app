<template>
  <div class="main-container">
    <div v-if="isLoading">Loading...</div>

    <template v-else-if="currentWeather">
      <div class="flex justify-between items-center">
        <div
            class="button-container"
            @click="$router.push('/search')"
        >
          <CrossIcon/>
        </div>
        <div>
          <WeatherLocationData :locationData="currentLocation"/>
        </div>
        <div
            class="button-container"
            @click="toggleFavorites(currentLocation); console.log(favorites)"
            ref="favoriteLocation"
        >
          <HeartIcon :class="isFavorite(currentLocation) ? 'fill-white' : 'fill-transparent'"/>
        </div>
      </div>

      <WeatherCurrent
          :currentTempCelsius="currentTempCelsius"
          :currentWeather="currentWeather"
          :feelsLikeCelsius="feelsLikeCelsius"
          :currentIcon="currentIcon"
      />
      <WeatherSunInfo :currentWeather="currentWeather"/>

      <div class="flex flex-col gap-6">
        <ForecastWeekly :currentWeather="currentWeather"/>
        <ForecastHourly :currentWeather="currentWeather"/>
        <WeatherCurrentConditions :items="firstItems"/>
        <WindDetails :currentWeather="currentWeather"/>
        <WeatherCurrentConditions :items="secondItems"/>
      </div>
    </template>
    <div v-else>
      <h3>City not found</h3>
    </div>
  </div>
</template>

<script setup lang="ts">
import WeatherLocationData from "~/components/weather/WeatherLocationData.vue";
import WindDetails from "~/components/weather/WindDetails.vue";
import CrossIcon from "~/ui/icons/CrossIcon.vue";
import HeartIcon from "~/ui/icons/HeartIcon.vue";
import { useFavorites } from "~/composables/useFavorites";

const route = useRoute();

const { currentWeather, isLoading, currentTempCelsius, feelsLikeCelsius, fetchWeatherByCity } = useWeather();
const { fahrenheitToCelsius } = useConversions();
const { getWeatherIcon } = useIcons();
const { getCityCountry } = useGeolocation();
const { toggleFavorites, isFavorite, favorites } = useFavorites();
const {
  humidityDescription, temperatureDescription,
  dewDescription, snowDescription,
  snowDepthDescription, uvDescription,
  solarDescription, visibilityDescription,
  precipDescription, pressureDescription,
  windSpeedDescription, cloudDescription
} = useDescription();

const cityName = decodeURIComponent(route.params.city as string);
console.log('City from URL: ', cityName);

const currentLocation = reactive({
  city: '',
  country: ''
});

onMounted(async () => {
  await fetchWeatherByCity(cityName);
  const loc = await getCityCountry(currentWeather.value?.latitude, currentWeather.value?.longitude)
  Object.assign(currentLocation, loc);
})

watch(() => route.params.city, async (newCity) => {
  if (!newCity) return

  const decodedCity = decodeURIComponent(newCity as string);
  await getWeatherIcon(newCity)
  await fetchWeatherByCity(decodedCity);
}, { immediate: true })

const currentIcon = computed(() => {
  const icon = currentWeather.value?.currentConditions.icon ?? 'cloudy';
  return getWeatherIcon(icon);
})

const current = computed(() => currentWeather.value?.currentConditions)

const firstItems = computed(() => {
  const currentValue = current.value
  if (!currentValue) return [];
  return [
    {
      title: "Humidity",
      value: `${ Math.round(currentValue.humidity) }%`,
      description: humidityDescription(currentValue.humidity ?? 0),
      icon: getWeatherIcon("drop"),
    },
    {
      title: "Wind speed",
      value: `${ Math.round(currentValue.windspeed) } kmh`,
      description: windSpeedDescription(currentValue.windspeed ?? 0),
      icon: getWeatherIcon("wind"),
    },
    {
      title: "UV index",
      value: `${ Math.round(currentValue.uvindex) }`,
      description: uvDescription(currentValue.uvindex ?? 0),
      icon: getWeatherIcon("clear-day"),
    },
    {
      title: "Pressure",
      value: `${ Math.round(currentValue.pressure) } hPa`,
      description: pressureDescription(currentValue.pressure ?? 0),
      icon: getWeatherIcon("pressure"),
    },
  ]
});

const secondItems = computed(() => {
  const currentValue = current.value
  if (!currentValue) return [];
  return [
    {
      title: "Visibility",
      value: `${ Math.round(currentValue.visibility) }%`,
      description: visibilityDescription(currentValue.visibility ?? 0),
      icon: getWeatherIcon("visibility"),
    },
    {
      title: "Precipitation",
      value: `${ Math.round(currentValue.precip) } mm`,
      description: precipDescription(currentValue.precip ?? 0),
      icon: getWeatherIcon("drop"),
    },
    {
      title: "Cloud cover",
      value: `${ Math.round(currentValue.cloudcover) }`,
      description: cloudDescription(currentValue.cloudcover ?? 0),
      icon: getWeatherIcon("cloud"),
    },
    {
      title: "Dew point",
      value: `${ Math.round(fahrenheitToCelsius(currentValue.dew)) }°C `,
      description: dewDescription(currentValue.dew ?? 0),
      icon: getWeatherIcon("thermometer"),
    },
  ]
});

</script>

<style scoped lang="postcss">
.main-container {
  @apply min-h-screen;
}

.button-container {
  @apply bg-white/25 border border-white/10 rounded-full p-4
}
</style>