<script setup lang="ts">
const { locationData, getCoordinates, getLocation } = useGeolocation()
const { getUserWeather, weatherData } = useWeather()

onMounted(async () => {
  // await getLocation()
  // await getCoordinates().then((coordinates) => {
  //   console.log(coordinates)
  // })
  // console.log(locationData.value)
  await getUserWeather()
})
</script>

<template>

</template>

<style scoped lang="postcss">

</style>