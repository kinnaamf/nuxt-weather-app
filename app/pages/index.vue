<script setup lang="ts">
const { latitude, longitude, getUserCoords } = useGeolocation()

onMounted(async () => {
  await getUserCoords()
  console.log(latitude.value, longitude.value)
})
</script>

<template>

</template>

<style scoped lang="postcss">

</style>