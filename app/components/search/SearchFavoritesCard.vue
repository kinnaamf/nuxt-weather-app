<template>
  <ClientOnly>
    <div>
      <div v-if="loading" class="py-4 pl-4 pr-6 bg-white rounded-2xl shadow-sm">
        <div class="animate-pulse">Loading...</div>
      </div>
      <div v-else-if="error" class="py-4 pl-4 pr-6 bg-white rounded-2xl shadow-sm border border-red-200">
        <span class="text-red-500">{{ error }}</span>
      </div>
      <div v-else-if="weather" class="py-4 pl-4 pr-6 bg-white rounded-2xl shadow-sm">
        <NuxtLink :to="`search/${favorite.city}`">
          <div class="flex items-center justify-between gap-4">

            <div class="flex items-center gap-3">
              <div class="w-12 h-12 flex items-center justify-center rounded-2xl" :style="{ background: currentBackground }">
                <component :is="getWeatherIcon(weather.currentConditions.icon)"
                           stroke="white"
                />
              </div>

              <div class="flex flex-col gap-px">
                <h4 class="font-semibold text-lg">{{ favorite.city }}</h4>
                <div class="opacity-60 flex items-center gap-2">
                  <LucideMapPin :size="14"/>
                  <h3 class="text-sm">{{ favorite.country }}, {{ favorite.countryCode }}</h3>
                </div>
                <h4 class="opacity-50 text-sm">{{ weather.currentConditions.conditions }}</h4>
              </div>
            </div>

            <div class="text-right flex items-center gap-2">
              <div>
                <div class="text-xl font-bold">{{ Math.round(fahrenheitToCelsius(weather.currentConditions.temp)) }}&deg;C</div>
                <div class="text-sm text-black opacity-50 flex items-center gap-2">
                  <h2>H: {{ Math.round(fahrenheitToCelsius(maxTempDay)) }}</h2>
                  <h2>L: {{ Math.round(fahrenheitToCelsius(minTempDay)) }}</h2>
                </div>
              </div>
              <div>
                <LucideHeart :size="20" fill="pink" @click="console.log(favorite)"/>
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
      <div v-else class="py-4 pl-4 pr-6 bg-white rounded-2xl shadow-sm">
        {{ favorite.city }} - no data
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import type { Favorite } from "~/composables/useFavorites";
import type { Weather } from "~/types/weather";
import HeartIcon from "~/ui/icons/HeartIcon.vue";

const props = defineProps<{
  favorite: Favorite;
}>();

const { fetchWeatherByCity, maxTempDay, minTempDay } = useWeather();
const { fahrenheitToCelsius } = useConversions();
const { getCityCountry } = useGeolocation();
const { getWeatherIcon } = useIcons()
const { getWeatherBackground } = useWeatherBackgrounds()
const { toggleFavorites } = useFavorites()


const weather = ref<Weather | null>(null);
const loading = ref(true);
const error = ref<string>('');

const currentBackground = computed(() => {
  const icon = weather.value?.currentConditions.icon || 'cloudy';
  return getWeatherBackground(icon);
})


watch(currentBackground, (val) => {
  console.log('BG:', val);
});
onMounted(async () => {
  try {
    loading.value = true;
    error.value = '';

    const cityName = props.favorite.city;

    // if (!cityName) {
    //   throw new Error('City name is missing');
    // }

    const result = await fetchWeatherByCity(cityName);

    if (!result) {
      throw new Error('No weather data returned');
    }

    weather.value = result;

    const addressDetails = await getCityCountry(weather.value?.latitude, weather.value?.longitude);
    console.log(addressDetails);

    console.log('Weather set to:', weather.value);

  } catch (e) {
    console.error('Error loading weather:', e);
    error.value = e instanceof Error ? e.message : 'Ошибка загрузки погоды';
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped lang="postcss">

</style>