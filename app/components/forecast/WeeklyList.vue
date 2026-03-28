<template>
  <div>
    <div
        v-for="(day, index) in weeklyForecast"
        :key="day.datetime"
        class="flex flex-col gap-4 justify-center"
    >
      <WeeklyItem :day="day" :index="index" />
      <hr v-if="index !== 6" class="opacity-10 rounded-full mb-4">
    </div>
  </div>
</template>

<script setup lang="ts">
import WeeklyItem from "~/components/forecast/WeeklyItem.vue";

const { weeklyForecast } = useForecast()

</script>

<style scoped lang="postcss">

</style>