import type { LocationData } from "~/types/locationData";
import type { Coordinates } from "~/types/coordinates";

export const useGeolocation = () => {
  const error = ref<GeolocationPositionError | string | null>(null)
  const loading = ref<boolean>(false)
  const locationData = ref<LocationData | null>(null)

  const getCoordinates = (): Promise<Coordinates> => {
    return new Promise((resolve, reject) => {
      if (!import.meta.client || !navigator.geolocation) {
        reject(new Error("Geolocation is not supported"))
        return
      }

      const cached = localStorage.getItem("coords");

      if (cached) {
        const parsed = JSON.parse(cached);
        resolve(parsed);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }

          localStorage.setItem("coords", JSON.stringify(coords));
          resolve(coords);
        },
        (err) => {
          error.value = err
          reject(err)
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      )
    })
  }

  const getCityCountry = async (latitude: number, longitude: number) => {
    const key = `location_${latitude}_${longitude}`;
    const cached = localStorage.getItem(key);

    if (cached) {
      return JSON.parse(cached);
    }

    const data: any = await $fetch(
      `https://nominatim.openstreetmap.org/reverse`,
      {
        query: {
          format: 'json',
          lat: latitude,
          lon: longitude,
          'accept-language': 'en',
        },
        headers: {
          'User-Agent': 'Nuxt Weather/1.0',
        }
      }
    )

    const result = {
      city: data.address?.city || data.address?.town || data.address?.village || '',
      country: data.address?.country || '',
    }

    localStorage.setItem(key, JSON.stringify(result));

    return result;
  }

  const getLocation = async (): Promise<LocationData | null> => {
    loading.value = true
    error.value = null

    try {
      const coords = await getCoordinates()
      const { city, country } = await getCityCountry(coords.latitude, coords.longitude)

      const result: LocationData = {
        city,
        country,
        coordinates: coords,
      }

      locationData.value = result
      return result
    } catch (err: any) {
      error.value = err.code === 1
        ? 'User declined geolocation usage'
        : err.code === 2
          ? 'Geolocation is not supported'
          : err.code === 3
            ? 'Connection timed out'
            : 'Could not get location'
      return null
    } finally {
      loading.value = false
    }
  }


  return {
    locationData,
    error,
    loading,
    getLocation,
    getCoordinates,
  }
}