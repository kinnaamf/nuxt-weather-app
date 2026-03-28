<template>
  <div class="flex items-center gap-4 h-full">
    <div class="flex items-center gap-2">
      <div>
        <LucideSunrise class="opacity-50" :size="16"/>
      </div>
      <div>
        <h4 class="opacity-50 text-xs">Sunrise</h4>
        <h3 class="font-semibold">{{ weatherData?.currentConditions.sunrise.slice(0, -3) }}</h3>
      </div>
    </div>
    <div class="w-px h-8 bg-white opacity-20"></div>
    <div class="flex items-center gap-2">
      <div>
        <LucideSunset class="opacity-50" :size="16"/>
      </div>
      <div>
        <h4 class="opacity-50 text-xs">Sunset</h4>
        <h3 class="font-semibold">{{ weatherData?.currentConditions.sunset.slice(0, -3) }}</h3>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  weatherData?: Weather;
}>()
</script>