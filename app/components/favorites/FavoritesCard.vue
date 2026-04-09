<template>
  <ClientOnly>
    <div>
      <div v-if="loading" class="py-4 pl-4 pr-6 bg-white rounded-2xl shadow-sm">
        <div class="animate-pulse">Loading...</div>
      </div>
      <div v-else-if="error" class="py-4 pl-4 pr-6 bg-white rounded-2xl shadow-sm border border-red-200">
        <span class="text-red-500">{{ error }}</span>
      </div>
      <div v-else-if="weather?.currentConditions" class="py-4 pl-4 pr-6 bg-white rounded-2xl shadow-sm">
        <div class="flex items-center justify-between gap-4">
          <div class="flex-1">
            <h4 class="font-semibold text-lg">{{ favorite.city }}</h4>
            <div class="opacity-60 flex items-center gap-2">
              <LucideMapPin :size="14"/>
              <h3 class="text-sm opacity-50">{{ favorite.country }}, {{ favorite.countryCode }}</h3>
            </div>
          </div>

          <div class="text-right">
            <div class="text-2xl font-bold">{{ Math.round(fahrenheitToCelsius(weather.currentConditions.temp)) }}&deg;</div>
            <div class="text-sm text-black opacity-50 flex items-center gap-2">
              <h2>H: {{  }}</h2>
              <h2>L:123</h2>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="py-4 pl-4 pr-6 bg-white rounded-2xl shadow-sm">
        {{ favorite.city }} - нет данных
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import type { Favorite } from "~/composables/useFavorites";
import type { Weather } from "~/types/weather";

const props = defineProps<{
  favorite: Favorite;
}>();

const { fetchWeatherByCity } = useWeather();
const { fahrenheitToCelsius } = useConversions();
const { getCityCountry } = useGeolocation();

const weather = ref<Weather | null>(null);
const loading = ref(true);
const error = ref<string>('');

onMounted(async () => {
  try {
    loading.value = true;
    error.value = '';

    const cityName = props.favorite.city;

    if (!cityName) {
      throw new Error('City name is missing');
    }

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