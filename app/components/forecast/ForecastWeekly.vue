<template>
  <div class="container mt-8">
    <div class="title mb-2">
      <h3 class="uppercase font-semibold opacity-50">7-day forecast</h3>
    </div>
    <hr class="rounded-full opacity-50 mb-4"/>
    <WeeklyList/>

  </div>
</template>

<script setup lang="ts">
import WeeklyList from "~/components/forecast/WeeklyList.vue";

</script>

<style scoped lang="postcss">
.container {
  @apply p-4 border rounded-3xl border-white/10 bg-white/25;
}
</style>