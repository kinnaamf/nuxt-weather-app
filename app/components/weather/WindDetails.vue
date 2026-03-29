<template>
  <div class="flex justify-between items-center card">
    <div class="w-2/3">
      <div class="flex items-center gap-2 mb-2">
        <component :is="getWeatherIcon('wind')"/>
        <span class="uppercase">Wind</span>
      </div>
      <div class="flex flex-col gap-1">
        <div class="flex justify-between items-center">
          <h3>Wind speed</h3>
          <span class="opacity-50">{{ Math.round(weatherData.currentConditions.windspeed) }}km/h</span>
        </div>
        <hr class="opacity-30">
        <div class="flex justify-between items-center">
        <h3>Wind gust</h3>
          <span class="opacity-50">{{ Math.round(weatherData.currentConditions.windgust) }}km/h</span>
        </div>
        <hr class="opacity-30">
        <div class="flex justify-between items-center">
        <h3>Wind direction</h3>
          <span class="opacity-50">{{ weatherData?.currentConditions.winddir }}&deg; {{ getWindDirection(wd) }}</span>
        </div>
      </div>
    </div>
    <div class="opacity/50">
      <div class="circle flex items-center justify-center">
        <ArrowIcon :style="{ transform: `rotate(calc(${wd}deg - 90deg))` }"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ArrowIcon from "~/ui/icons/ArrowIcon.vue";

const { getWeatherIcon } = useIcons()
const { weatherData } = useWeather()

const wd = computed(() => { return weatherData.value?.currentConditions.winddir })

const getWindDirection = (winddir: number) => {
  let direction;

  if(winddir < 30 && winddir >= 0) direction = "W"
  if (winddir >= 30 && winddir < 60 ) direction = "SW"
  if (winddir >= 60 && winddir < 120) direction = "S"
  if (winddir >= 120 && winddir < 150) direction = "SE"
  if (winddir >= 150 && winddir < 210) direction = "E"
  if (winddir >= 210 && winddir < 240) direction = "NE"
  if (winddir >= 240 && winddir < 300) direction = "N"
  if (winddir >= 300 && winddir < 360) direction = "NW"

  return direction
}
</script>


<style scoped lang="postcss">
.card {
  @apply border border-white/40 bg-white/25 rounded-3xl py-3 px-4
}

.circle {
  @apply w-[100px] h-[100px] rounded-full border
}
</style>