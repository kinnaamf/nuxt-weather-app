<template>
  <div class="app-wrapper px-5 py-6">
    <NuxtPage class=""/>
    <AppNavbar/>
  </div>
</template>

<script setup lang="ts">
import AppNavbar from "~/components/AppNavbar.vue";

useHead({
  meta: [

  ],
  htmlAttrs: {
    class: 'h-full'
  },
  bodyAttrs: {
    class: 'h-full'
  }
})
</script>
