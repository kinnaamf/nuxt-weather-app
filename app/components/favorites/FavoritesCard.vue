<template>
<div class="py-4 pl-4 pr-6 bg-white rounded-2xl shadow-sm">
  {{ favorite.city }}
</div>
</template>

<script setup lang="ts">
import type { Favorite } from "@/composables/useFavorites";

const props = defineProps<{
  favorite: Favorite;
}>()


</script>


<style scoped lang="postcss">

</style>