<template>
  <div class="card w-full">
    <div class="flex flex-col gap-2">
      <div class="flex items-center gap-2">
        <component :is="icon" class="w-5 h-5"/>
        <span class="uppercase text-sm opacity-50">{{ title }}</span>
      </div>
      <div>
        <h2 class="text-4xl font-black">{{ value }}</h2>
      </div>
    </div>
    <div>
      <span class="text-sm opacity-50 whitespace-pre-line line-clamp-1">{{ description }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  description: string
  icon: any
  value: any
}>()


</script>


<style scoped lang="postcss">
.card {
  @apply rounded-2xl border border-white/40 bg-white/25 p-4
}
</style>