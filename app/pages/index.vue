<script setup lang="ts">
const { locationData, getFullLocation, getCoordinates, getAddressFromCoords } = useGeolocation()

onMounted(async () => {
  await getFullLocation()
  console.log(locationData.value)
})
</script>

<template>

</template>

<style scoped lang="postcss">

</style>