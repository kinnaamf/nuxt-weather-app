<template>
  <div class="container" v-if="!isLoading && hourlyForecast.length">
    <div class="title mb-2">
      <h3 class="uppercase font-semibold opacity-50">Hourly forecast</h3>
    </div>
    <hr class="rounded-full opacity-50 mb-4"/>
    <HourlyList/>
  </div>
</template>

<script setup lang="ts">
import HourlyList from "~/components/forecast/HourlyList.vue";

const { hourlyForecast, } = useForecast()

const { isLoading } = useWeather()
onMounted(()=>{
  console.log(hourlyForecast.value)
})
</script>

<style scoped lang="postcss">
.container {
  @apply p-4 border rounded-3xl border-white/10 bg-white/25;
}
</style>