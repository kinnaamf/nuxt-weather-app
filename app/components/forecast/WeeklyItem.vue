<template>
  <div class="flex items-center justify-between">
    <div class="flex items-center">
      <span class="opacity-75 font-semibold text-xl w-12">{{ getWeekDay(day.datetime, index) }}</span>
      <component
          :is="getWeatherIcon(day.icon)"
          class="w-5 h-5 ml-8"
      />
      <span class="text-sm opacity-50 ml-6">{{ day.conditions.split(',')[0] }}</span>
    </div>
    <div class="flex items-center justify-between">
      <span class="opacity-50 text-lg w-4 mr-4">{{ Math.round(fahrenheitToCelsius(day.tempmin)) }}&deg;</span>
      <div class="bg-white/25 rounded-full h-1 w-24 flex justify-center">
        <div
            class="h-full bg-gradient-to-r from-blue-400 via-yellow-200 to-orange-400 rounded-full"
            :style="getRangeStyle(day)"
        ></div>
      </div>
      <span class="font-bold text-lg ml-2">{{ Math.round(fahrenheitToCelsius(day.tempmax)) }}&deg;</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Forecast } from "~/types/forecast"
import { getWeekDay } from "~/utils/date"

defineProps<{
  day: Forecast,
  index: number
}>()

const { getWeatherIcon } = useIcons()
const { weeklyForecast } = useForecast()
const { fahrenheitToCelsius } = useConversions()

const overallMin = computed(() => {
  if (!weeklyForecast.value.length) return 0;
  return Math.min(...weeklyForecast.value.map(d => fahrenheitToCelsius(d.tempmin)))
})

const overallMax = computed(() => {
  if (!weeklyForecast.value.length) return 100;
  return Math.max(...weeklyForecast.value.map(d => fahrenheitToCelsius(d.tempmax)))
})

const getRangeStyle = (day: Forecast) => {
  const min = fahrenheitToCelsius(day.tempmin);
  const max = fahrenheitToCelsius(day.tempmax);

  const range = overallMax.value - overallMin.value;

  const startPercent = ((min - overallMin.value) / range) * 100;
  const widthPercent = ((max - min) / range) * 100;

  return {
    left: `${startPercent}%`,
    width: `${widthPercent}%`,
  }
}
</script>
