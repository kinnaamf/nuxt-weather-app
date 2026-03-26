<script setup lang="ts">
const { weatherData, getWeatherByCoords } = useWeather();

onMounted(async () => {
  await getWeatherByCoords()
})
</script>

<template>

</template>

<style scoped lang="postcss">

</style>