<template>
  <div>
    <h3 class="text-3xl font-black mb-4">Search Cities</h3>
    <div class="flex items-center justify-between h-12 gap-3">
      <div class="bg-white w-full px-10 rounded-2xl card flex gap-2 items-center h-full"
           :class="{ 'w-full' : !inputCity, 'w-[calc(100%-3rem)]': inputCity }"
          @click="focusInput"
      >
        <SearchIcon class="opacity-30 w-[18px] h-[18px] transition-opacity duration-300"/>
        <input
            type="text"
            placeholder="Search for a city..."
            class="text-base outline-none flex-1"
            v-model="inputCity"
            @focus="isFocused = true"
            ref="inputRef"
        >
      </div>
      <Transition name="slide-right" mode="out-in">
        <div v-if="isFocused"
             @click="isFocused = false"
             class="card h-12 w-12 bg-white rounded-full flex items-center justify-center aspect-square">
          <CrossIcon class="w-6 h-6"/>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">

import SearchIcon from "~/ui/icons/SearchIcon.vue";
import CrossIcon from "~/ui/icons/CrossIcon.vue";

const inputCity = ref<string>('');

const isFocused = ref<boolean>(false);

const inputRef = ref<HTMLInputElement | null>(null);

const focusInput = () => {
  inputRef.value?.focus()
}
</script>


<style scoped lang="postcss">
.card {
  border: 1px solid #e2e8f0;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.06);
}
</style>