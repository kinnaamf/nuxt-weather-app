<template>
  <div class="flex gap-4 overflow-x-auto">
    <div
        v-for="(hour, index) in next24hours"
        :key="index"
        class="flex flex-col justify-center items-center gap-2"
    >
      <HourlyItem :hour="hour" :index="index"/>
    </div>
  </div>
</template>

<script setup lang="ts">
const { next24hours } = useForecast()
import HourlyItem from "~/components/forecast/HourlyItem.vue";
</script>