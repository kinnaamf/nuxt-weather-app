<template>
  <span :class="index == 0 ? 'font-bold' : 'font-medium opacity-60'">{{ getTime(hour.datetime, index) }}</span>
  <component :is="getWeatherIcon(hour.icon)" />
  <span>{{ Math.round(fahrenheitToCelsius(hour.temp)) }}</span>
</template>

<script setup lang="ts">
import { getTime } from "~/utils/time"

defineProps<{
  hour: any
  index: number
}>()

const { getWeatherIcon } = useIcons()
const { fahrenheitToCelsius } = useConversions()
</script>