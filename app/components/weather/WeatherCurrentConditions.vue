<template>
  <div class="">
    <div v-if="items.length" class="grid grid-cols-2 gap-3">
      <WeatherCard
        v-for="(item, index) in items"
        :key="index"
        :title="item.title"
        :value="item.value"
        :description="item.description"
        :icon="item.icon"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  items: {
    title: string;
    description: string;
    icon: any;
    value: any;
  }
}>()
</script>

<style scoped lang="postcss">

</style>