<template>
  <div class="flex justify-between items-center mb-7">
    <div>
      <h2 class="text-[5.625rem]">{{ currentTempCelsius }}<span class="text-4xl">&deg;C</span></h2>
      <h3 class="opacity-70 text-xl">Partly cloudly{{ currentWeather?.currentConditions.description }}</h3>
      <h4 class="opacity-50">Feels like {{ feelsLikeCelsius }}&deg;C</h4>
    </div>
    <div>
      <component
          :is="currentIcon"
          class="w-[100px] h-[100px]"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    currentTempCelsius: any;
    currentWeather?: any;
    feelsLikeCelsius: any;
    currentIcon: any;
  }>()
</script>