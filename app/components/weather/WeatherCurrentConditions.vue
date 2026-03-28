<template>
  <div class="flex flex-col gap-3">
    <div class="flex justify-between w-full gap-3">
      <WeatherCard
          title="Humidity"
          :value="`${Math.round(current.humidity)}%`"
          :description="humidityDescription(current.humidity ?? 0)"
          :icon="getWeatherIcon('drop')"
      />
      <WeatherCard
          title="Wind speed"
          :value="`${Math.round(current?.windspeed)} kmh`"
          :description="windSpeedDescription(current?.windspeed ?? 0)"
          :icon="getWeatherIcon('wind')"
      />
    </div>
    <div class="flex justify-between w-full gap-3">
      <WeatherCard
          title="Uv index"
          :value="`${Math.round(current?.uvindex)}`"
          :description="uvDescription(current?.uvindex ?? 0)"
          :icon="getWeatherIcon('clear-day')"
      />
      <WeatherCard
          title="Pressure"
          :value="`${Math.round(current?.pressure)} hPa`"
          :description="pressureDescription(current?.pressure ?? 0)"
          :icon="getWeatherIcon('pressure')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDescription } from "~/types/useDescription";

const { weatherData } = useWeather()
const { getWeatherIcon } = useIcons()

const {humidityDescription, temperatureDescription,
  dewDescription, snowDescription,
  snowDepthDescription, uvDescription,
  solarDescription, visibilityDescription,
  precipDescription, pressureDescription,
  windSpeedDescription, } = useDescription();

const current = computed(() => weatherData.value?.currentConditions)
</script>

<style scoped lang="postcss">

</style>