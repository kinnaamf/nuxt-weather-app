<template>
  <span :class="index == 0 ? 'font-bold' : 'font-medium opacity-60'">{{ formatTime(hour.datetime, index) }}</span>
  <component :is="getWeatherIcon(hour.icon)" />
  <span>{{ Math.round(fahrenheitToCelsius(hour.temp)) }}</span>
</template>

<script setup lang="ts">

defineProps<{
  hour: any
  index: number
}>()

const { formatTime, next24hours } = useForecast()
const { getWeatherIcon } = useIcons()
const { fahrenheitToCelsius } = useConversions()
</script>