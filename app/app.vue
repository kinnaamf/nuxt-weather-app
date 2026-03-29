<template>
  <div class="app-wrapper px-5 py-6 pb-36">
    <NuxtPage class=""/>
  </div>
  <AppNavbar class="navbar-fixed"/>
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

<style scoped lang="postcss">
.navbar-fixed {
  left: 1.25rem;
  right: 1.25rem;
  width: calc(100% - 2.5rem);
  transform: none;
}
</style>
