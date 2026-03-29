<template>
  <div class="app-wrapper px-5 py-6 pb-36" :style="{ background: currentBackground }">
    <NuxtPage class=""/>
  </div>
  <AppNavbar class="navbar-fixed"/>
</template>

<script setup lang="ts">
import AppNavbar from "~/components/AppNavbar.vue";

const { weatherData } = useWeather()
const { getWeatherBackground } = useWeatherBackgrounds()

const currentBackground = computed(() => {
  const icon = weatherData.value?.currentConditions.icon || 'cloudy';
  return getWeatherBackground(icon);
})

watch(currentBackground, (newBackground) => {
  if (import.meta.client) {
    document.body.style.setProperty('--weather-bg', newBackground);
  }
}, { immediate: true })

useHead({
  htmlAttrs: {
    class: 'h-full'
  },
  bodyAttrs: {
    class: 'h-full',
  },
  style: [
    {
      children: computed(() => `
      body::before {
        background: ${currentBackground.value}
      }`)
    }
  ]
})
</script>

<style scoped lang="postcss">
.navbar-fixed {
  left: 1.25rem;
  right: 1.25rem;
  width: calc(100% - 2.5rem);
  transform: none;
}
</style>
