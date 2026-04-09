<template>
    <FavoritesCard
      v-for="(favorite, index) in favoritesList"
      :key="index"
      :favorite="favorite"
    />
</template>

<script setup lang="ts">
  import type { Favorite } from "~/composables/useFavorites";

  const props = defineProps<{
    favoritesList: Favorite[];
  }>()
</script>


<style scoped lang="postcss">

</style>