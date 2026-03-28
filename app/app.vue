<template>
  <div class="app-wrapper">
    <NuxtPage class="px-5 py-6"/>
  </div>
</template>

<script setup lang="ts">
useHead({

  meta: [
    {
      name: 'theme-color', content: '#143F70',
    },
  ],
  htmlAttrs: {
    class: 'h-full'
  },
  bodyAttrs: {
    class: 'h-full'
  }
})
</script>
