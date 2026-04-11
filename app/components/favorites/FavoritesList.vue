<template>
  <div class="grid grid-cols-1 gap-3">
    <FavoritesCard
        v-for="(favorite, index) in favoritesList"
        :favorite="favorite"
    />
  </div>
</template>

<script setup lang="ts">
import type { Favorite } from "~/composables/useFavorites";

const props = defineProps<{
  favoritesList: Favorite[]
}>()
</script>