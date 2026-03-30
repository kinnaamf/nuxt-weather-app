<template>
  <div class="app-wrapper px-5 py-6 pb-36">
    <NuxtLayout>
      <NuxtPage class=""/>
    </NuxtLayout>
  </div>
  <AppNavbar class="navbar-fixed"/>
</template>

<script setup lang="ts">
import AppNavbar from "~/components/AppNavbar.vue";

const { currentWeather } = useWeather()
const { getWeatherBackground } = useWeatherBackgrounds()

const route = useRoute()

const currentBackground = computed(() => {
  const icon = currentWeather.value?.currentConditions.icon || 'cloudy';
  return getWeatherBackground(icon);
})

const isLightPage = computed(() => {
  return ['/search', '/favorites', "/settings"].includes(route.path)
})

watch([isLightPage, currentBackground], ([light, bg]) => {
  if (import.meta.client) {
    const body = document.body;

    if (light) {
      body.classList.add("light-page");
      body.style.backgroundColor = '#f2f1f7';
    } else {
      body.classList.remove("light-page");
      body.style.backgroundColor = '';
    }

    document.documentElement.style.setProperty('--weather-bg', bg);
  }
}, { immediate: true })

useHead({
  meta: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
    }
  ],
  htmlAttrs: {
    class: 'h-full'
  },
  bodyAttrs: {
    class: computed(() => isLightPage.value ? 'h-full light-page' : 'h-full')
  },
  style: [{
    children: computed(() => `
      body:not(.light-page)::before {
        background: ${ currentBackground.value } !important;
      }
      body.light-page {
        background: #F2F1F7 !important;
      }
      body.light-page::before {
        display: none !important;
      }
    `)
  }]
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
