<template>
  <div class="main-container">
    <WeatherLocationData :locationData="locationData"/>

    <WeatherCurrent
        :currentTempCelsius="currentTempCelsius"
        :weatherData="weatherData"
        :feelsLikeCelsius="feelsLikeCelsius"
        :currentIcon="currentIcon"
    />
    <WeatherSunInfo :weatherData="weatherData"/>

    <div class="flex flex-col gap-6">
      <ForecastWeekly/>
      <ForecastHourly/>
      <WeatherCurrentConditions :items="firstItems"/>
      <WindDetails/>
      <WeatherCurrentConditions :items="secondItems"/>

    </div>
  </div>
</template>

<script setup lang="ts">
import WeatherLocationData from "~/components/weather/WeatherLocationData.vue";
import WindDetails from "~/components/weather/WindDetails.vue";
import { useDescription } from "~/types/useDescription";

const { locationData, getLocation } = useGeolocation()
const { getUserWeather, weatherData, currentTempCelsius, feelsLikeCelsius } = useWeather()
const { getWeatherIcon } = useIcons()
const { fahrenheitToCelsius } = useConversions()

onMounted(async () => {
  await getLocation()

  await getUserWeather()
})

definePageMeta({
  layout: false
})

const currentIcon = computed(() => {
  const icon = weatherData.value?.currentConditions.icon ?? 'cloudy';
  return getWeatherIcon(icon);
})

const {
  humidityDescription, temperatureDescription,
  dewDescription, snowDescription,
  snowDepthDescription, uvDescription,
  solarDescription, visibilityDescription,
  precipDescription, pressureDescription,
  windSpeedDescription, cloudDescription
} = useDescription();

const current = computed(() => weatherData.value?.currentConditions)

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
</style>