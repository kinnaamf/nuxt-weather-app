<template>
  <div class="main-container">
    <WeatherLocationData :locationData="locationData" />

    <WeatherCurrent
        :currentTempCelsius="currentTempCelsius"
        :weatherData="weatherData"
        :feelsLikeCelsius="feelsLikeCelsius"
        :currentIcon="currentIcon"
    />
    <WeatherSunInfo :weatherData="weatherData"/>

    <div class="flex flex-col gap-6">
      <ForecastWeekly />
      <ForecastHourly />
      <WeatherCurrentConditions/>
      <WindDetails/>
    </div>
  </div>
</template>

<script setup lang="ts">
import WeatherLocationData from "~/components/weather/WeatherLocationData.vue";
import WindDetails from "~/components/weather/WindDetails.vue";

const { locationData, getLocation } = useGeolocation()
const { getUserWeather, weatherData, currentTempCelsius, feelsLikeCelsius } = useWeather()
const { getWeatherIcon } = useIcons()


onMounted(async () => {
  await getLocation()

  await getUserWeather()
})

const currentIcon = computed(() => {
  const icon = weatherData.value?.currentConditions.icon ?? 'cloudy';
  return getWeatherIcon(icon);
})
</script>

<style scoped lang="postcss">
  .main-container {
    @apply min-h-screen;
  }
</style>