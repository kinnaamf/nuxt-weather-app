<template>
  <div class="flex items-center gap-1 opacity-70 mb-1">
    <LucideMapPin :size="14"/>
    <span>{{ `${locationData?.city}, ${locationData?.country}` }}</span>
  </div>
  <div>
    <h2 class="text-4xl font-black">{{ locationData?.city }}</h2>
  </div>
</template>

<script setup lang="ts">
import type { LocationData } from "~/types/locationData";

defineProps<{
  locationData: LocationData | null | undefined
}>()
</script>