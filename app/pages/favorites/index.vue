<template>
  <div class="mb-4">
    <h3 class="text-3xl font-black mb-1">Favorites</h3>
    <p v-if="favorites.length === 0">No favorite cities</p>
    <p v-else class="opacity-50">{{ favorites.length }} saved cities</p>
  </div>
  <FavoritesList :favoritesList="favorites" />
</template>

<script setup lang="ts">
  const { favorites } = useFavorites();

  onMounted(() => {
    console.log(favorites.value);
  })
</script>

<style scoped lang="postcss">

</style>