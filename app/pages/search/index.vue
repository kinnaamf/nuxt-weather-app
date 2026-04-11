<template>
  <div class="flex flex-col gap-8">
    <h3 class="text-3xl font-black mb-4">Weather</h3>
    <div class="flex items-center justify-between h-16 gap-3">
      <div class="bg-white w-full px-10 rounded-[24px] card flex gap-2 items-center h-full"
           :class="{ 'w-full' : !inputCity, 'w-[calc(100%-3rem)]': inputCity }"
          @click="focusInput"
      >
        <SearchIcon class="opacity-30 w-[18px] h-[18px] transition-opacity duration-300" @click="handleSearch"/>
        <input
            type="text"
            placeholder="Search for a city..."
            class="outline-none flex-1 input"
            v-model="inputCity"
            @focus="isFocused = true"
            ref="inputRef"
            @keyup.enter="handleSearch"
        >
        <Transition name="fade" mode="out-in">
          <div
              v-if="inputCity.length !== 0"
              @click="inputCity = ''"
              class="bg-black/50 rounded-full p-1 flex items-center justify-center">
            <CrossIcon class="w-4 h-4"/>
          </div>
        </Transition>
      </div>
      <Transition name="slide-right" mode="out-in">
        <div v-if="isFocused"
             @click="isFocused = false"
             class="card h-16 w-16 bg-white rounded-full flex items-center justify-center aspect-square">
          <CrossIcon class="w-6 h-6"/>
        </div>
      </Transition>
    </div>
    <FavoritesContainer :favoritesList="favorites" />
  </div>
</template>

<script setup lang="ts">
import SearchIcon from "~/ui/icons/SearchIcon.vue";
import CrossIcon from "~/ui/icons/CrossIcon.vue";

const { favorites } = useFavorites();
const inputCity = ref<string>('');
const isFocused = ref<boolean>(false);
const inputRef = ref<HTMLInputElement | null>(null);
const router = useRouter();

const focusInput = () => {
  inputRef.value?.focus()
}

const handleSearch = () => {
  if (!inputCity) return;

  const city = encodeURIComponent(inputCity.value.trim().toLowerCase());
  router.push(`/search/${city}`);
}

</script>


<style scoped lang="postcss">
.card {
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.06);
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .1s;
}

.fade-enter-from, .fade-leave-to  {
  opacity: 0;
}

.fade-enter-to {
  opacity: 1;
}

input {
  font-size: 16px !important;
}
</style>
