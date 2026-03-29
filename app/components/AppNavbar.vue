<template>
  <nav class="navbar">
    <ul class="flex justify-center items-center gap-9">
      <li v-for="(link, index) in links">
        <NuxtLink
            :to="link.to"
            class="flex flex-col items-center gap-2"
            v-slot="{ isActive }">
          <div
              class="p-2 rounded-xl transition-all duration-300"
              :class="{ active: isActive ? 'bg-white/30 backdrop-blur' : '' }"
          >
            <component :is="link.icon" class="w-8 h-8"/>
          </div>
          <span class="">{{ link.text }}</span>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import HouseIcon from "~/ui/icons/HouseIcon.vue";
import SearchIcon from "~/ui/icons/SearchIcon.vue";
import HeartIcon from "~/ui/icons/HeartIcon.vue";
import GearIcon from "~/ui/icons/GearIcon.vue";

const links = [
  { to: '/', text: 'Home', icon: HouseIcon },
  { to: '/search', text: 'Search', icon: SearchIcon },
  { to: '/favorites', text: 'Favorites', icon: HeartIcon },
  { to: '/settings', text: 'Settings', icon: GearIcon },
]
</script>

<style scoped lang="postcss">
.navbar {
  @apply border border-white/10 py-3
  rounded-3xl fixed bottom-4 backdrop-blur-md;
  background: rgba(51, 51, 51, 0.50);
}

.active {
  @apply bg-white/30
}
</style>