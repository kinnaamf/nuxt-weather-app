<template>
  <div v-if="!weather">No weather data</div>
  <div v-else>
    <NuxtLink :to="`/search/${favorite.city}`">
      <div class="rounded-3xl p-4 text-white shadow-md" :style="{ background: currentBackground }">
        <!-- TOP SECTION -->
        <div class="flex items-center justify-between">
          <div>
            <div>
              <h2 class="text-[1.250rem] font-bold">{{ favorite.city }}</h2>
            </div>
            <div class="flex items-center gap-1 opacity-50">
              <LucideMapPin :size="12"/>
              <span class="text-sm">{{ favorite.country }}, {{ favorite.countryCode }}</span>
            </div>
          </div>
          <div class="p-2 bg-white/20 rounded-full">
            <HeartIcon fill="white" @click.prevent="toggleFavorites(favorite)"/>
          </div>
        </div>
        <!-- TOP SECTION -->

        <!-- MID SECTION -->
        <div class="flex justify-between items-end">
          <div>
            <h2 class="text-[56px]">{{ Math.round(fahrenheitToCelsius(weather.currentConditions.temp)) }}&deg;C</h2>
            <h3>{{ weather.currentConditions.description }}</h3>
            <h3 class="opacity-50 text-sm">H: {{ Math.round(fahrenheitToCelsius(maxTempDay)) }}&deg; - L:
                                           {{ Math.round(fahrenheitToCelsius(minTempDay)) }}&deg;</h3>
          </div>
          <div>
            <component class="align-bottom h-[72px] w-[72px]" :is="getWeatherIcon(weather.currentConditions.icon)"/>
          </div>
        </div>
        <!-- MID SECTION -->

        <hr class="opacity-30 my-3">

        <!-- BOTTOM SECTION -->
        <div class="flex items-center justify-between px-3">
          <template v-for="(data, index) in weatherData" :key="index">
            <div class="flex flex-col items-center text-center">
              <h3 class="opacity-50 uppercase text-xs">{{ data.title }}</h3>
              <h4 class="font-bold text-sm">{{ data.info }}</h4>
            </div>
            <div v-if="index < weatherData.length - 1" class="bg-white/15 w-px h-12"></div>
          </template>
        </div>
        <!-- BOTTOM SECTION -->
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import type { Favorite } from "~/composables/useFavorites";
import type { Weather } from "~/types/weather";
import HeartIcon from "~/ui/icons/HeartIcon.vue";

const props = defineProps<{
  favorite: Favorite
}>()

const { fetchWeatherByCity, maxTempDay, minTempDay } = useWeather();
const { getWeatherBackground } = useWeatherBackgrounds();
const { fahrenheitToCelsius } = useConversions();
const { getWeatherIcon } = useIcons();
const { toggleFavorites } = useFavorites();


const weather = ref<Weather>();
const loading = ref<boolean>(true);
const error = ref<boolean>(false);
const weatherData = ref();

const currentBackground = computed(() => {
  const icon = weather.value?.currentConditions.icon || 'cloudy';
  return getWeatherBackground(icon);
})

onMounted(async () => {
  try {
    const cityName = props.favorite.city

    weather.value = await fetchWeatherByCity(cityName)

    weatherData.value = [
      {
        title: 'Humidity',
        info: `${ Math.round(weather.value?.currentConditions.humidity) }%`
      },
      {
        title: 'Wind',
        info: `${ Math.round(weather.value?.currentConditions.windspeed) } km/h`
      },
      {
        title: 'UV Index',
        info: `${ weather.value?.currentConditions.uvindex }`
      },
      {
        title: 'Precipitation',
        info: `${ Math.round(weather.value?.currentConditions.precip) }mm`
      }
    ]

    console.log(weather.value)
  } catch (err) {
    console.log(err)
    loading.value = false
    error.value = true
  } finally {
    loading.value = false
  }
})


</script>